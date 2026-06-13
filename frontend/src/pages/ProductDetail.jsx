import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';

const isVideoMedia = (media) => typeof media === 'string' && media.startsWith('data:video');

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
    if (product?.images?.length) return product.images;
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
      <div className="h-screen bg-[#faf9f6] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <h1 className="text-sm font-semibold uppercase tracking-widest text-neutral-400">Error 404</h1>
          <p className="mt-2 text-2xl font-light tracking-tight text-neutral-900">Product not found</p>
          <button 
            onClick={() => navigate('/')} 
            className="mt-6 w-full rounded-full border border-neutral-900 bg-neutral-900 px-6 py-3 text-xs font-medium tracking-widest uppercase text-white transition-all duration-300 hover:bg-transparent hover:text-neutral-900"
          >
            Back to collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#faf9f6] text-[#1a1a1a] font-sans antialiased selection:bg-neutral-200 flex flex-col overflow-hidden">
      
      {/* Premium Header */}
      <header className="flex-none bg-[#faf9f6]/80 backdrop-blur-md border-b border-neutral-200/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')} 
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back
          </button>
          <span className="text-xl font-light tracking-[0.25em] translate-x-4">APLOD</span>
          <div className="w-16" />
        </div>
      </header>

      {/* Toast Notification */}
      {added && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 border border-neutral-800 animate-fade-in">
          <Check size={14} className="text-emerald-400" />
          <span className="text-xs font-medium uppercase tracking-widest">Added to cart</span>
        </div>
      )}

      {/* Main Container - Adjusted for Single Screen Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-12 py-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 min-h-0">
        
        {/* Left Side: Media Gallery (No Scroll Area) */}
        <section className="flex flex-col gap-4 min-h-0 h-full justify-center">
          {/* Main Showcase Window */}
          <div className="flex-1 bg-white border border-neutral-200/60 rounded-2xl flex items-center justify-center p-6 min-h-0 relative group">
            {isVideoMedia(activeImage) ? (
              <video
                src={activeImage}
                controls
                muted
                className="h-full w-full object-contain max-h-[70vh] p-2 bg-black rounded-xl"
              />
            ) : activeImage ? (
              <img 
                src={activeImage} 
                alt={product.title} 
                className="h-full w-full object-contain mix-blend-multiply max-h-[70vh] p-2" 
              />
            ) : (
              <div className="h-64 w-36 rounded-[28px] border-[6px] border-neutral-900 bg-neutral-50 shadow-xl" />
            )}
          </div>

          {/* Image Thumbnails Strip */}
          {gallery.length > 1 && (
            <div className="flex-none flex justify-center gap-3 pb-2">
              {gallery.map((image, index) => (
                <button
                  key={`${index}-${image.slice(0, 24)}`}
                  onClick={() => setActiveImage(image)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white border p-1.5 flex items-center justify-center overflow-hidden transition-all duration-200 ${
                    activeImage === image 
                      ? 'border-neutral-900 ring-1 ring-neutral-900 scale-95' 
                      : 'border-neutral-200/80 hover:border-neutral-400'
                  }`}
                >
                  {isVideoMedia(image) ? (
                    <video src={image} muted className="h-full w-full object-contain bg-black" />
                  ) : (
                    <img
                      src={image}
                      alt={`${product.title} view ${index + 1}`}
                      className="h-full w-full object-contain mix-blend-multiply"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Right Side: Product Details */}
        <section className="flex flex-col justify-center h-full pr-0 lg:pr-8">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
              {product.subtitle}
            </span>
            
            <h1 className="mt-2 text-2xl sm:text-3xl font-light tracking-tight text-neutral-900 leading-tight">
              {product.title}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-xl font-medium text-neutral-900">
                ₹{Number(product.price || 0).toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-neutral-400 font-normal">Inc. all taxes</span>
            </div>

            <p className="mt-4 text-xs sm:text-sm leading-6 text-neutral-500 font-light max-w-md">
              {product.description}
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-6">
            <button
              onClick={handleAddToCart}
              className="group w-full max-w-md bg-neutral-900 hover:bg-black text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99]"
            >
              <ShoppingBag size={14} className="transition-transform group-hover:scale-110" />
              Add to Bag
            </button>
          </div>

          {/* Minimal Value Propositions */}
          <div className="mt-8 border-t border-neutral-200/50 pt-6 max-w-md grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center p-1">
              <Truck size={14} className="text-neutral-400 mb-1" />
              <h4 className="text-[11px] font-medium text-neutral-800">Free Shipping</h4>
            </div>
            <div className="flex flex-col items-center text-center p-1">
              <RefreshCw size={14} className="text-neutral-400 mb-1" />
              <h4 className="text-[11px] font-medium text-neutral-800">14-day Return</h4>
            </div>
            <div className="flex flex-col items-center text-center p-1">
              <ShieldCheck size={14} className="text-neutral-400 mb-1" />
              <h4 className="text-[11px] font-medium text-neutral-800">100% Genuine</h4>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default ProductDetail;
