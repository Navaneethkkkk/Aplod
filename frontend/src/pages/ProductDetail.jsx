import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, ShoppingBag } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';

function normalizeProduct(product) {
  if (!product) return null;

  const images = product.images?.length ? product.images : product.imageUrl ? [product.imageUrl] : product.coverImage ? [product.coverImage] : [];

  return {
    id: product._id || product.id,
    title: product.name || product.title,
    subtitle: product.category?.name || product.subtitle || 'Premium accessory',
    description: product.description || 'Premium protection with a polished everyday finish.',
    price: product.price || 0,
    images,
  };
}

function ProductDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(() => normalizeProduct(state?.product));
  const [activeImage, setActiveImage] = useState(product?.images?.[0] || '');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product?.images?.length) return;

    api
      .getProduct(id)
      .then((data) => {
        const nextProduct = normalizeProduct(data);
        setProduct(nextProduct);
        setActiveImage(nextProduct?.images?.[0] || '');
      })
      .catch(() => {});
  }, [id, product?.images?.length]);

  const gallery = useMemo(() => {
    if (product?.images?.length) return product.images.slice(0, 4);
    return [];
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;

    const savedCart = JSON.parse(localStorage.getItem('aplodCart') || '[]');
    const existingIndex = savedCart.findIndex((item) => item.id === product.id);
    const nextCart = [...savedCart];

    if (existingIndex > -1) {
      nextCart[existingIndex].quantity += 1;
    } else {
      nextCart.push({
        id: product.id,
        title: product.title,
        subtitle: product.subtitle,
        price: product.price,
        image: gallery[0] || '',
        quantity: 1,
      });
    }

    localStorage.setItem('aplodCart', JSON.stringify(nextCart));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl font-black uppercase tracking-wide text-neutral-900">Product not found</h1>
          <button onClick={() => navigate('/')} className="mt-5 rounded-xl bg-black px-5 py-3 text-xs font-bold uppercase tracking-wide text-white">
            Back to store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111111]">
      <header className="sticky top-0 z-30 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-neutral-700 hover:text-black">
            <ArrowLeft size={16} />
            Back
          </button>
          <span className="text-xl font-black tracking-widest">APLOD</span>
          <div className="w-16" />
        </div>
      </header>

      {added && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <Check size={16} />
          <span className="text-xs font-bold uppercase tracking-wide">Added to cart</span>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] gap-10">
        <section>
          <div className="bg-white border border-neutral-200 rounded-2xl min-h-[420px] lg:min-h-[620px] flex items-center justify-center p-6">
            {activeImage ? (
              <img src={activeImage} alt={product.title} className="max-h-[560px] w-full object-contain" />
            ) : (
              <div className="h-80 w-44 rounded-[34px] border-[10px] border-neutral-900 bg-neutral-100 shadow-2xl" />
            )}
          </div>

          {gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mt-4">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setActiveImage(image)}
                  className={`h-24 sm:h-32 rounded-xl bg-white border p-2 ${activeImage === image ? 'border-black' : 'border-neutral-200'}`}
                >
                  <img src={image} alt={`${product.title} photo ${index + 1}`} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="lg:sticky lg:top-28 h-fit">
          <p className="text-xs font-black uppercase tracking-widest text-neutral-400">{product.subtitle}</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-neutral-950">{product.title}</h1>
          <p className="mt-5 text-sm leading-7 text-neutral-500">{product.description}</p>

          <div className="mt-8 border-y border-neutral-200 py-6">
            <span className="text-3xl font-black text-neutral-950">₹{Number(product.price || 0).toLocaleString('en-IN')}</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-black hover:bg-neutral-800 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <ShoppingBag size={16} />
            Add to Cart
          </button>
        </section>
      </main>
    </div>
  );
}

export default ProductDetail;
