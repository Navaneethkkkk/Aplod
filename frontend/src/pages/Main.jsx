import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  User,
  Star,
  X,
  Plus,
  Minus,
  Trash2,
  Check,
  MessageCircle,
  Shield,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { api } from '../api';

function Main() {
  const navigate = useNavigate();
  // Available iPhone Models
  const MODELS = [
    { id: '16-pro-max', name: 'iPhone 16 Pro Max' },
    { id: '16-pro', name: 'iPhone 16 Pro' },
    { id: '16', name: 'iPhone 16' },
    { id: '15-pro-max', name: 'iPhone 15 Pro Max' },
    { id: '15-pro', name: 'iPhone 15 Pro' },
  ];

  // Navigation categories
  const [activeCategory, setActiveCategory] = useState('cases'); // 'cases', 'protectors', 'charging'

  // Custom interactive cart state
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedProducts, setSavedProducts] = useState([]);

  // Floating WhatsApp Support
  const [whatsappActive, setWhatsappActive] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Hey there! Need help finding the perfect case for your iPhone? 📱' },
  ]);

  // Selected device global setting (for the customizer/checkout)
  const [globalSelectedModel, setGlobalSelectedModel] = useState(MODELS[0]);

  // Alert Toast
  const [toast, setToast] = useState({ show: false, message: '' });

  // Real-time custom state for color swatches per card (indexed by card ID)
  const [selectedColors, setSelectedColors] = useState({
    'c-1': { id: 'brown', name: 'Saddle Brown', hex: '#a66e46', secondary: '#835331' },
    'c-2': {
      id: 'crystal-clear',
      name: 'Optically Clear',
      hex: 'rgba(255, 255, 255, 0.25)',
      secondary: 'rgba(255, 255, 255, 0.45)',
      isClear: true,
    },
    'c-3': { id: 'midnight', name: 'Midnight Navy', hex: '#1c2430', secondary: '#0e141c' },
    'c-4': { id: 'black-bumper', name: 'Matte Black', hex: '#2c2d30', secondary: '#111111' },
  });

  // Raw Product Data conforming precisely to the CASEGEAR screenshot styles
  const productsData = {
    cases: [
      {
        id: 'c-1',
        title: 'Modern Leatherite Case Cover',
        subtitle: 'For iPhone 16 Pro Max',
        rating: 4.9,
        reviewsCount: 136,
        price: 1699,
        mrp: 1999,
        type: 'leather',
        colors: [
          { id: 'brown', name: 'Saddle Brown', hex: '#a66e46', secondary: '#835331' },
          { id: 'charcoal', name: 'Charcoal Black', hex: '#2c2d30', secondary: '#191a1c' },
        ],
      },
      {
        id: 'c-2',
        title: 'Super Crystal Case Cover',
        subtitle: 'For iPhone 16',
        rating: 4.6,
        reviewsCount: 721,
        price: 1499,
        mrp: 2999,
        type: 'clear',
        colors: [
          {
            id: 'crystal-clear',
            name: 'Optically Clear',
            hex: 'rgba(255, 255, 255, 0.25)',
            secondary: 'rgba(255, 255, 255, 0.45)',
            isClear: true,
          },
        ],
      },
      {
        id: 'c-3',
        title: 'Silicone Snap Fit Case Cover',
        subtitle: 'For iPhone 16 Pro Max',
        rating: 4.6,
        reviewsCount: 400,
        price: 1299,
        mrp: 1999,
        type: 'silicone',
        colors: [
          { id: 'midnight', name: 'Midnight Navy', hex: '#1c2430', secondary: '#0e141c' },
          { id: 'ocean-blue', name: 'Ocean Blue', hex: '#3d4a5c', secondary: '#2a3543' },
          { id: 'gray', name: 'Stone Gray', hex: '#8a8279', secondary: '#6a635a' },
        ],
      },
      {
        id: 'c-4',
        title: 'Grip Armour Case Cover',
        subtitle: 'For iPhone 16',
        rating: 4.6,
        reviewsCount: 200,
        price: 1199,
        mrp: 1999,
        type: 'armour',
        colors: [
          { id: 'black-bumper', name: 'Matte Black Bumper', hex: '#2c2d30', secondary: '#111111' },
          { id: 'titanium-bumper', name: 'Natural Titanium Bumper', hex: '#a8a29e', secondary: '#78716c' },
        ],
      },
    ],
    protectors: [
      {
        id: 'p-1',
        title: 'Ultra-Tough Tempered Glass',
        subtitle: 'For iPhone 16 Pro Max',
        rating: 4.8,
        reviewsCount: 89,
        price: 799,
        mrp: 1299,
        type: 'protector',
        colors: [{ id: 'clear', name: 'HD Clear', hex: '#e2e8f0', secondary: '#94a3b8' }],
      },
      {
        id: 'p-2',
        title: 'Anti-Glare Privacy Screen Guard',
        subtitle: 'For iPhone 16 Pro',
        rating: 4.7,
        reviewsCount: 142,
        price: 899,
        mrp: 1499,
        type: 'protector',
        colors: [{ id: 'privacy', name: 'Matte Privacy', hex: '#1e293b', secondary: '#0f172a' }],
      },
    ],
    charging: [
      {
        id: 'ch-1',
        title: 'MagSafe 15W Rapid Wireless Charger',
        subtitle: 'High-grade Aluminium base',
        rating: 4.9,
        reviewsCount: 310,
        price: 2499,
        mrp: 3999,
        type: 'charger',
        colors: [
          { id: 'silver', name: 'Sleek Silver', hex: '#e2e8f0', secondary: '#cbd5e1' },
          { id: 'space-gray', name: 'Space Gray', hex: '#4b5563', secondary: '#1f2937' },
        ],
      },
      {
        id: 'ch-2',
        title: '65W GaN Triple-Port Travel Adaptor',
        subtitle: 'Super fast charging hub',
        rating: 4.8,
        reviewsCount: 195,
        price: 1999,
        mrp: 2999,
        type: 'charger',
        colors: [
          { id: 'pure-white', name: 'Classic White', hex: '#ffffff', secondary: '#f1f5f9' },
          { id: 'midnight-black', name: 'Midnight Black', hex: '#111827', secondary: '#030712' },
        ],
      },
    ],
  };

  useEffect(() => {
    const normalizeSavedProducts = (products) =>
      products
        .filter((product) => product.status !== 'Draft')
        .map((product) => {
          const categoryText = `${product.category?.name || ''} ${product.category?.slug || ''}`.toLowerCase();
          const categoryKey = categoryText.includes('screen') || categoryText.includes('protector')
            ? 'protectors'
            : categoryText.includes('charg')
              ? 'charging'
              : 'cases';
          const images = product.images?.length ? product.images : product.imageUrl ? [product.imageUrl] : [];

          return {
            id: product._id,
            title: product.name,
            subtitle: product.category?.name || 'Premium accessory',
            rating: 4.8,
            reviewsCount: 0,
            price: product.price || 0,
            mrp: null,
            type: 'uploaded',
            categoryKey,
            coverImage: images[0] || '',
            images,
            description: product.description,
            colors: [{ id: 'default', name: 'Default', hex: '#111111', secondary: '#333333' }],
          };
        });

    const localProducts = JSON.parse(localStorage.getItem('aplodProducts') || '[]');
    if (localProducts.length) {
      setSavedProducts(normalizeSavedProducts(localProducts));
    }

    api
      .getProducts()
      .then((products) => {
        setSavedProducts(normalizeSavedProducts([...localProducts, ...products]));
      })
      .catch(() => setSavedProducts(normalizeSavedProducts(localProducts)));
  }, []);

  const triggerToast = (message) => {
    setToast({ show: true, message });
    window.setTimeout(() => setToast({ show: false, message: '' }), 3500);
  };

  const handleColorChange = (productId, colorObj) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: colorObj }));
  };

  const handleAddToCart = (product, e) => {
    if (e) e.stopPropagation();
    const chosenColor = selectedColors[product.id] || product.colors[0];
    const cartId = `${product.id}-${chosenColor.id}-${globalSelectedModel.id}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartId === cartId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prevCart,
        {
          cartId,
          id: product.id,
          title: product.title,
          subtitle: `Fits ${globalSelectedModel.name}`,
          color: chosenColor,
          price: product.price,
          quantity: 1,
          type: product.type,
        },
      ];
    });

    triggerToast(`Added ${product.title} (${chosenColor.name}) to your cart!`);
  };

  const updateQuantity = (cartId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.cartId === cartId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const handleRemoveFromCart = (cartId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
    triggerToast('Item removed from cart.');
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const sendSupportMessage = (e) => {
    e.preventDefault();
    if (!whatsappMessage.trim()) return;

    const userMsg = whatsappMessage;
    setChatHistory((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setWhatsappMessage('');

    window.setTimeout(() => {
      let replyText =
        'Awesome! One of our CaseGear specialists will get back to you shortly. We can also help you track orders or recommend a case size!';

      if (userMsg.toLowerCase().includes('price') || userMsg.toLowerCase().includes('offer')) {
        replyText =
          'Currently we are offering FREE Express Shipping all over India! Also, apply checkout code CG10 for an additional mock 10% off.';
      } else if (userMsg.toLowerCase().includes('iphone 16') || userMsg.toLowerCase().includes('size')) {
        replyText =
          'All of our covers are specifically crafted for the brand new iPhone 16 lineup with tactile aluminum button covers and clean camera bumps.';
      }

      setChatHistory((prev) => [...prev, { sender: 'bot', text: replyText }]);
    }, 1000);
  };

  const filteredProducts = useMemo(() => {
    const uploadedItems = savedProducts.filter((product) => product.categoryKey === activeCategory);
    const categoryItems = [...uploadedItems, ...(productsData[activeCategory] || [])];
    if (!searchQuery.trim()) return categoryItems;
    const q = searchQuery.toLowerCase();
    return categoryItems.filter((p) => p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q));
  }, [activeCategory, savedProducts, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111111] font-sans antialiased selection:bg-black selection:text-white">
      {toast.show && (
        <div className="fixed bottom-24 left-6 z-50 bg-[#111111] text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in-up border border-neutral-800">
          <div className="bg-white text-black rounded-full p-0.5">
            <Check size={14} strokeWidth={3} />
          </div>
          <span className="text-xs font-semibold tracking-wide">{toast.message}</span>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white border-b border-neutral-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <a href="#" className="text-xl sm:text-2xl font-black tracking-widest text-[#111111] hover:opacity-85 transition">
                APLOD
              </a>
            </div>

            {/* <nav className="hidden md:flex space-x-10 text-sm font-bold tracking-wider">
              <a href="#explore" className="text-[#111111] hover:text-neutral-500 transition">
                TECH
              </a>
              <a href="#explore" className="text-[#111111] hover:text-neutral-500 transition">
                PRODUCTS
              </a>
              <a href="#features" className="text-[#111111] hover:text-neutral-500 transition">
                BUNDLE
              </a>
              <a href="#support" className="text-[#111111] hover:text-neutral-500 transition">
                SUPPORT
              </a>
            </nav> */}

            <div className="flex items-center space-x-4">
              <div className="relative">
                {searchOpen ? (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-neutral-200 rounded-full py-1.5 px-3 flex items-center space-x-2 shadow-md w-64 animate-fade-in">
                    <input
                      type="text"
                      placeholder="Search covers, models..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="text-xs bg-transparent focus:outline-none w-full"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                    >
                      <X size={14} className="text-neutral-400 hover:text-black" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-neutral-800 hover:text-black transition"
                    title="Search"
                  >
                    <Search size={20} strokeWidth={2} />
                  </button>
                )}
              </div>

              <button
                onClick={() => triggerToast('Customer Profile simulation: You are logged in as a Guest User.')}
                className="p-2 text-neutral-800 hover:text-black transition hidden sm:inline-block"
                title="Account"
              >
                <User size={20} strokeWidth={2} />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-neutral-800 hover:text-black transition"
                title="Shopping Bag"
              >
                <ShoppingBag size={20} strokeWidth={2} />
                {cart.length > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-neutral-50 border-b border-neutral-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
          
          
            
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-neutral-400 font-medium">Change Device:</span>
            <select
              value={globalSelectedModel.id}
              onChange={(e) => {
                const found = MODELS.find((m) => m.id === e.target.value);
                if (found) {
                  setGlobalSelectedModel(found);
                  triggerToast(`Pricing & sizes adjusted to ${found.name}`);
                }
              }}
              className="text-xs bg-white border border-neutral-200 rounded px-2 py-1 font-semibold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-black"
            >
              {MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <main id="explore" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#f4f4f4] p-1.5 rounded-full border border-neutral-200/40">
            <button
              onClick={() => {
                setActiveCategory('cases');
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                activeCategory === 'cases'
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Phone Cases
            </button>
            <button
              onClick={() => {
                setActiveCategory('protectors');
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                activeCategory === 'protectors'
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Screen Protectors
            </button>
            <button
              onClick={() => {
                setActiveCategory('charging');
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                activeCategory === 'charging'
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Charging Essentials
            </button>
          </div>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row justify-between items-baseline border-b border-neutral-100 pb-4">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-wider text-neutral-950">
              {activeCategory === 'cases' && 'iPhone Premium Case Covers'}
              {activeCategory === 'protectors' && 'Diamond Hard Screen Defense'}
              {activeCategory === 'charging' && 'MagSafe Power Supplies'}
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              {activeCategory === 'cases' && 'Constructed from military-grade materials with premium finishes.'}
              {activeCategory === 'protectors' && '9H scratch hardness with edge-to-edge optical clarity.'}
              {activeCategory === 'charging' && 'Optimal wireless alignment at blazing speed.'}
            </p>
          </div>
          <div className="text-xs font-semibold text-neutral-400 mt-2 sm:mt-0">Showing {filteredProducts.length} items</div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-neutral-100">
            <span className="text-3xl">🔍</span>
            <h3 className="text-base font-bold mt-2">No matching items found</h3>
            <p className="text-xs text-neutral-400 mt-1">Try resetting your search filter or selecting another tab.</p>
            <button onClick={() => setSearchQuery('')} className="mt-4 bg-black text-white text-xs font-bold px-4 py-2 rounded-lg">
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const activeColor = selectedColors[product.id] || product.colors[0];
              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/store-product/${product.id}`, { state: { product } })}
                  className="bg-white rounded-[24px] p-5 flex flex-col justify-between border border-neutral-200/60 shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer"
                >
                  <div className="bg-[#f5f5f7] rounded-[20px] h-72 flex items-center justify-center p-6 relative overflow-hidden group-hover:bg-[#f0f0f2] transition duration-300">
                    <div className="w-full h-full max-h-[220px] transition-all duration-500 transform group-hover:scale-105">
                      {product.coverImage && (
                        <img
                          src={product.coverImage}
                          alt={product.title}
                          className="h-full w-full object-contain"
                        />
                      )}

                      {product.type === 'leather' && (
                        <svg viewBox="0 0 160 320" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
                          <rect x="15" y="15" width="130" height="290" rx="26" fill={activeColor.hex} stroke={activeColor.secondary} strokeWidth="1.5" />
                          <filter id="leather-noise-card">
                            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
                            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.12 0" />
                            <feComposite operator="in" in2="SourceGraphic" />
                          </filter>
                          <rect x="15" y="15" width="130" height="290" rx="26" fill={activeColor.hex} filter="url(#leather-noise-card)" mixBlendMode="overlay" />
                          <rect x="25" y="25" width="46" height="46" rx="10" fill={activeColor.secondary} />
                          <circle cx="38" cy="38" r="7" fill="#111" />
                          <circle cx="38" cy="58" r="7" fill="#111" />
                          <circle cx="58" cy="48" r="7" fill="#111" />
                          <path d="M14 80 L16 110" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                        </svg>
                      )}

                      {product.type === 'clear' && (
                        <svg viewBox="0 0 160 320" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                              <stop offset="45%" stopColor="rgba(255, 255, 255, 0.0)" />
                              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.25)" />
                            </linearGradient>
                          </defs>
                          <rect x="18" y="18" width="124" height="284" rx="22" fill="#dfdbd7" />
                          <rect x="15" y="15" width="130" height="290" rx="26" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                          <rect x="15" y="15" width="130" height="290" rx="26" fill="url(#shine)" />
                          <rect x="25" y="25" width="46" height="46" rx="10" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
                          <circle cx="38" cy="38" r="6" fill="#111" />
                          <circle cx="38" cy="58" r="6" fill="#111" />
                          <circle cx="58" cy="48" r="6" fill="#111" />
                          <circle cx="80" cy="160" r="28" fill="none" stroke="#ffffff" strokeWidth="3" />
                          <path d="M80,188 L80,206" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      )}

                      {product.type === 'silicone' && (
                        <svg viewBox="0 0 160 320" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
                          <rect x="15" y="15" width="130" height="290" rx="26" fill={activeColor.hex} stroke={activeColor.secondary} strokeWidth="1" />
                          <rect x="25" y="25" width="46" height="46" rx="10" fill={activeColor.secondary} />
                          <circle cx="38" cy="38" r="7" fill="#1a1a1a" />
                          <circle cx="38" cy="58" r="7" fill="#1a1a1a" />
                          <circle cx="58" cy="48" r="7" fill="#1a1a1a" />
                        </svg>
                      )}

                      {product.type === 'armour' && (
                        <svg viewBox="0 0 160 320" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
                          <rect x="15" y="15" width="130" height="290" rx="26" fill="rgba(240,240,245,0.7)" />
                          <circle cx="80" cy="150" r="16" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="3" />
                          <rect x="14" y="14" width="132" height="292" rx="26" fill="none" stroke={activeColor.secondary} strokeWidth="4.5" />
                          <rect x="12" y="32" width="6" height="15" rx="1.5" fill="#333" />
                          <rect x="142" y="32" width="6" height="15" rx="1.5" fill="#333" />
                          <rect x="12" y="260" width="6" height="15" rx="1.5" fill="#333" />
                          <rect x="142" y="260" width="6" height="15" rx="1.5" fill="#333" />
                        </svg>
                      )}

                      {(product.type === 'protector' || product.type === 'charger') && (
                        <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
                          {product.type === 'protector' ? (
                            <div className="relative w-20 h-36 bg-neutral-200 rounded-lg border-2 border-dashed border-neutral-400/50 flex items-center justify-center overflow-hidden">
                              <div className="absolute inset-x-2 inset-y-6 bg-cyan-100/40 rounded border border-cyan-400 flex items-center justify-center">
                                <span className="text-[10px] text-cyan-600 font-bold">HD GLASS</span>
                              </div>
                            </div>
                          ) : (
                            <div className="relative w-24 h-24 bg-white rounded-full border-2 border-neutral-200 shadow-xs flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full border border-neutral-100 bg-neutral-50 flex items-center justify-center">
                                <span className="text-xl">⚡</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-xs text-[10px] font-bold text-neutral-800 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-200">
                      View details
                    </div>
                  </div>

                  <div className="mt-4 flex-grow">
                    <h3 className="font-bold text-base text-[#111111] tracking-tight group-hover:text-neutral-600 transition duration-150">
                      {product.title}
                    </h3>

                    <p className="text-xs text-neutral-400 font-semibold mt-1">
                      {product.type === 'protector' || product.type === 'charger' ? product.subtitle : `For ${globalSelectedModel.name}`}
                    </p>

                    <div className="mt-2.5 inline-flex items-center space-x-1.5 border border-neutral-200 bg-white rounded-md px-2 py-0.5 text-xs text-neutral-500 font-medium">
                      <span className="font-bold text-neutral-800 flex items-center">
                        {product.rating} <Star size={11} className="ml-1 fill-amber-400 text-amber-400" />
                      </span>
                      <span className="text-neutral-300">|</span>
                      <span>{product.reviewsCount} Reviews</span>
                    </div>

                    <div className="mt-3.5 flex items-center space-x-2">
                      {product.colors.map((color) => {
                        const isSelected = activeColor.id === color.id;
                        return (
                          <button
                            key={color.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleColorChange(product.id, color);
                            }}
                            className={`w-5.5 h-5.5 rounded-full border focus:outline-none transition-all duration-200 ${
                              isSelected ? 'ring-2 ring-black ring-offset-2 scale-110' : 'border-neutral-300 hover:scale-105'
                            }`}
                            style={{
                              backgroundColor: color.hex,
                              backgroundImage: color.isClear ? 'linear-gradient(135deg, #ffffff 30%, #cbd5e1 100%)' : 'none',
                            }}
                            title={color.name}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-5 border-t border-neutral-100 pt-4">
                    <div className="flex items-baseline space-x-2 mb-3.5">
                      <span className="text-lg font-black text-neutral-900">₹{product.price.toLocaleString('en-IN')}</span>
                      {product.mrp && (
                        <span className="text-xs text-neutral-400 line-through">MRP ₹{product.mrp.toLocaleString('en-IN')}</span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-full bg-[#1c1d1f] hover:bg-[#111111] text-white text-xs font-bold tracking-wider uppercase py-3 px-4 rounded-xl transition duration-200 active:scale-98 flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag size={14} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <section id="features" className="bg-white border-t border-neutral-200 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-black tracking-widest text-neutral-400 uppercase">THE CASEGEAR PROMISE</span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-neutral-900 mt-2">
              Uncompromising protection, daily.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#f9f9fb] rounded-2xl border border-neutral-100 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
                <Shield size={24} />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-wide text-neutral-800">Military Standard Grade</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                We drop test our covers thousands of hours at heights surpassing traditional consumer regulatory standards.
              </p>
            </div>

            <div className="p-6 bg-[#f9f9fb] rounded-2xl border border-neutral-100 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
                <Truck size={24} />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-wide text-neutral-800">Free Express Delivery</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Enjoy hassle-free insured shipping across all regions of India with lightning-fast tracking integration.
              </p>
            </div>

            <div className="p-6 bg-[#f9f9fb] rounded-2xl border border-neutral-100 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
                <RotateCcw size={24} />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-wide text-neutral-800">Easy Returns & Exchanges</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Didn't fit your exact phone model? Simply start a free return query within 7 days for prompt support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating shopping bag */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-black hover:bg-neutral-800 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 relative"
          title="Open Bag"
        >
          <ShoppingBag size={24} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-extrabold h-5.5 w-5.5 rounded-full flex items-center justify-center animate-pulse border-2 border-black">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* WhatsApp button (simulation) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setWhatsappActive(!whatsappActive)}
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 border-4 border-white"
          title="WhatsApp Help Chat"
        >
          <MessageCircle size={26} strokeWidth={2.2} />
        </button>
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            <div
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            />
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md transform transition duration-500">
                <div className="flex h-full flex-col bg-white shadow-2xl">
                  <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
                    <h3 className="text-base font-black uppercase tracking-wider text-neutral-900 flex items-center space-x-2">
                      <ShoppingBag size={18} />
                      <span>Your Shopping Cart</span>
                    </h3>
                    <button onClick={() => setIsCartOpen(false)} className="text-neutral-400 hover:text-black p-1 transition">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <span className="text-4xl mb-3">🛍️</span>
                        <h4 className="text-sm font-bold text-neutral-800 uppercase tracking-wide">Your bag is empty</h4>
                        <p className="text-xs text-neutral-400 mt-1 max-w-xs leading-relaxed">
                          Pick from our beautiful, rugged case covers to begin your protective experience.
                        </p>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.cartId} className="flex gap-4 p-4 rounded-xl bg-[#f9f9fb] border border-neutral-200/50 relative">
                          <div className="w-16 h-20 bg-white rounded-lg border border-neutral-150 p-1 shrink-0 flex items-center justify-center">
                            <svg viewBox="0 0 160 320" className="h-full w-auto">
                              <rect x="10" y="10" width="140" height="300" rx="20" fill={item.color.hex} />
                            </svg>
                          </div>

                          <div className="flex-grow flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h4 className="font-bold text-xs text-neutral-900 leading-snug">{item.title}</h4>
                                <span className="font-bold text-xs text-neutral-900">
                                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                </span>
                              </div>
                              <p className="text-[10px] text-neutral-400 font-semibold mt-0.5">{item.subtitle}</p>
                              <div className="flex items-center space-x-1.5 mt-1">
                                <span
                                  className="inline-block w-2.5 h-2.5 rounded-full border border-neutral-300"
                                  style={{ backgroundColor: item.color.hex }}
                                />
                                <span className="text-[10px] text-neutral-400 font-medium">{item.color.name}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center border border-neutral-200 rounded-md bg-white">
                                <button onClick={() => updateQuantity(item.cartId, -1)} className="p-1.5 hover:bg-neutral-100 text-neutral-500 transition">
                                  <Minus size={10} />
                                </button>
                                <span className="px-2.5 text-xs font-bold text-neutral-800">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.cartId, 1)} className="p-1.5 hover:bg-neutral-100 text-neutral-500 transition">
                                  <Plus size={10} />
                                </button>
                              </div>

                              <button
                                onClick={() => handleRemoveFromCart(item.cartId)}
                                className="text-neutral-400 hover:text-red-600 transition p-1"
                                title="Remove"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="border-t border-neutral-150 px-6 py-6 bg-neutral-50">
                      <div className="space-y-2 mb-6 text-xs">
                        <div className="flex justify-between text-neutral-400">
                          <span>Subtotal</span>
                          <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-neutral-400">
                          <span>Express Insured Shipping</span>
                          <span className="text-emerald-600 font-black tracking-wide">FREE</span>
                        </div>
                        <div className="border-t border-neutral-200 pt-2.5 flex justify-between text-sm font-black text-neutral-900 uppercase tracking-wide">
                          <span>Total</span>
                          <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          triggerToast('Secure checkout complete! Thank you for simulating with CaseGear.');
                          setCart([]);
                          setIsCartOpen(false);
                        }}
                        className="w-full bg-black hover:bg-neutral-800 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition duration-150"
                      >
                        Secure Checkout (₹{cartSubtotal.toLocaleString('en-IN')})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer id="support" className="bg-[#111111] text-neutral-400 text-xs py-16 mt-24 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-extrabold tracking-widest text-base mb-4">CASEGEAR</h4>
              <p className="text-neutral-500 leading-relaxed pr-4">
                Premium armor, covers, tempered shields, and charging essentials for your brand-new iPhone lineups.
              </p>
            </div>
            <div>
              <h5 className="text-white font-bold uppercase tracking-wider mb-4">Device Support</h5>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className="hover:text-white transition">
                    iPhone 16 Series
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    iPhone 15 Series
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold uppercase tracking-wider mb-4">Customer Care</h5>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Track Your Order
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    7-Day Free Return Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold uppercase tracking-wider mb-4">Our Environment</h5>
              <p className="text-neutral-500 leading-relaxed">
                Our raw plastic packaging utilizes strictly FSC-certified cardboard envelopes.
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-600 text-[11px]">
            <p>© 2026 CASEGEAR India Private Limited. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
              <a href="#" className="hover:underline">
                Corporate Address
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Main;

