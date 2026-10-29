'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Cart from '../../../components/Cart';
import AddonModal from '../../../components/AddonModal';
import AuthModal from '../../../components/AuthModal';
import { db } from '../../../lib/db';
import {
  Star, Heart, MapPin, Calendar, Clock, Upload, Type, MessageSquare,
  ShieldCheck, Truck, Sparkles, Plus, CheckCircle, ArrowLeft, Gift, ChevronRight, Lock, Award
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id;

  // Instantaneous zero-delay synchronous initialization from preloaded product cache
  const [product, setProduct] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.__PRELOADED_PRODUCT && String(window.__PRELOADED_PRODUCT.id) === String(productId)) {
        return window.__PRELOADED_PRODUCT;
      }
      try {
        const stored = sessionStorage.getItem('giftportal_active_product');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && String(parsed.id) === String(productId)) {
            return parsed;
          }
        }
      } catch (e) {}
    }
    return null;
  });
  const [loading, setLoading] = useState(!product);
  const [settings, setSettings] = useState(null);
  const [selectedTypeIdx, setSelectedTypeIdx] = useState(0);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  // Delivery & Personalization State
  const [pincode, setPincode] = useState('452010');
  const [pincodeResult, setPincodeResult] = useState({
    serviceable: true,
    pincode: '452010',
    city: 'Indore',
    state: 'Madhya Pradesh',
    area: 'Vijay Nagar / Scheme 54',
    message: '⚡ Express 2-Hour & Midnight Delivery available in Indore (Vijay Nagar)'
  });
  const [isCheckingPin, setIsCheckingPin] = useState(false);
  const [selectedDate, setSelectedDate] = useState('today');
  const [customDate, setCustomDate] = useState('');
  const datePickerRef = useRef(null);
  const [selectedSlot, setSelectedSlot] = useState('standard');
  const [customName, setCustomName] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);

  // Date range limits
  const todayStr = new Date().toISOString().split('T')[0];
  const maxDateObj = new Date();
  maxDateObj.setDate(maxDateObj.getDate() + 60);
  const maxDateStr = maxDateObj.toISOString().split('T')[0];

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const [y, m, d] = dateStr.split('-');
      const dt = new Date(Number(y), Number(m) - 1, Number(d));
      return dt.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
    } catch (e) {
      return dateStr;
    }
  };

  const getDeliveryDateLabel = () => {
    if (selectedDate === 'today') return 'Today (Same Day)';
    if (selectedDate === 'tomorrow') return 'Tomorrow';
    if (selectedDate === 'pick_date' && customDate) {
      try {
        const [y, m, d] = customDate.split('-');
        const dt = new Date(Number(y), Number(m) - 1, Number(d));
        return dt.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
      } catch (e) {
        return customDate;
      }
    }
    return 'Scheduled Delivery';
  };

  // Cart & Modals State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Cross-sell Addon state
  const [pendingMainItem, setPendingMainItem] = useState(null);
  const [isAddonModalOpen, setIsAddonModalOpen] = useState(false);

  useEffect(() => {
    async function loadProductData() {
      if (!productId) return;
      if (!product) setLoading(true);
      const prod = await db.getProductById(productId);
      if (prod) setProduct(prod);

      const st = await db.getSettings();
      setSettings(st);

      const allProds = await db.getProducts();
      const activeProd = prod || product;
      if (activeProd) {
        const related = allProds.filter(p => p.id !== activeProd.id && (p.cat === activeProd.cat || p.cat === 'personalized')).slice(0, 4);
        setRelatedProducts(related);
      }

      const currentUser = JSON.parse(localStorage.getItem('giftportal_user'));
      if (currentUser) {
        setUser(currentUser);
        const favs = await db.getFavourites(currentUser.username);
        setFavourites(favs);
      }
      setLoading(false);
    }
    loadProductData();
  }, [productId]);

  // Auto-dismiss toast after 2.5s
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const standardFee = settings?.deliveryFeeAmount !== undefined ? Number(settings.deliveryFeeAmount) : 0;
  const expressFee = settings?.expressDeliveryFee !== undefined ? Number(settings.expressDeliveryFee) : 99;
  const fixedFee = settings?.fixedSlotDeliveryFee !== undefined ? Number(settings.fixedSlotDeliveryFee) : 149;
  const midnightFee = settings?.midnightDeliveryFee !== undefined ? Number(settings.midnightDeliveryFee) : 249;

  const deliverySlots = [
    { id: 'standard', name: 'Standard Delivery', time: '9:00 AM - 9:00 PM', price: standardFee, badge: standardFee === 0 ? 'FREE' : `+₹${standardFee}` },
    { id: 'express', name: '⚡ Express 2-Hour Delivery', time: 'Within 120 mins', price: expressFee, badge: 'POPULAR' },
    { id: 'fixed', name: '⏱️ Fixed Time Slot', time: 'Select 2-hr window', price: fixedFee, badge: 'PRECISE' },
    { id: 'midnight', name: '🌙 Midnight Surprise', time: '11:00 PM - 11:59 PM', price: midnightFee, badge: 'SPECIAL' }
  ];

  const handleCheckPincode = async () => {
    setIsCheckingPin(true);
    const res = await db.checkPincode(pincode);
    setPincodeResult(res);
    setIsCheckingPin(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const currentType = product?.types?.[selectedTypeIdx] || product?.types?.[0];
  const currentVariant = currentType?.variants?.[selectedVariantIdx] || currentType?.variants?.[0] || { price: product?.price || 899, original: product?.original || 1299, label: 'Standard' };
  const slotFee = deliverySlots.find(s => s.id === selectedSlot)?.price || 0;
  const isFav = product ? favourites.some(f => f.id === product.id) : false;

  const isSoldOut = Boolean(product?.isSoldOut || (product?.stock !== undefined && Number(product.stock) <= 0));
  const stockCount = product?.stock !== undefined ? Number(product.stock) : 50;
  const isLowStock = !isSoldOut && stockCount <= 10;

  const handleInitiateAddGift = () => {
    if (!product || isSoldOut) return;
    const itemKey = `${product.id}-${currentType?.label || 'Std'}-${currentVariant.label}-${selectedSlot}`;
    const mainItem = {
      key: itemKey,
      id: product.id,
      name: `${product.name} (${currentType?.label || 'Signature'})`,
      price: currentVariant.price,
      variantLabel: currentVariant.label,
      emoji: product.emoji,
      img: product.img,
      image: product.img,
      qty: 1,
      pincode: pincodeResult?.pincode || pincode || '400703',
      city: pincodeResult?.city || 'Navi Mumbai',
      deliveryDate: getDeliveryDateLabel(),
      slotId: selectedSlot,
      slotLabel: deliverySlots.find(s => s.id === selectedSlot)?.name || 'Standard Delivery',
      slotFee: slotFee,
      personalization: {
        customName: customName.trim() || undefined,
        cardMessage: cardMessage.trim() || undefined,
        photoUrl: photoPreview || undefined
      }
    };
    setPendingMainItem(mainItem);
    setIsAddonModalOpen(true);
  };

  const handleConfirmAddons = useCallback((selectedAddons) => {
    if (!pendingMainItem) return;
    setCart((prev) => {
      let updated = [...prev];
      const existingMain = updated.find(i => i.key === pendingMainItem.key);
      if (existingMain) {
        updated = updated.map(i => i.key === pendingMainItem.key ? { ...i, qty: i.qty + 1 } : i);
      } else {
        updated.push(pendingMainItem);
      }

      selectedAddons.forEach(addon => {
        const addonKey = `addon-${addon.id}-${pendingMainItem.id}`;
        const existingAddon = updated.find(i => i.key === addonKey);
        if (existingAddon) {
          updated = updated.map(i => i.key === addonKey ? { ...i, qty: i.qty + 1 } : i);
        } else {
          updated.push({
            key: addonKey,
            id: addon.id,
            name: `${addon.name} (Add-on)`,
            price: addon.price,
            variantLabel: 'Add-on Pack',
            emoji: addon.emoji,
            img: addon.img || addon.image,
            image: addon.img || addon.image,
            qty: 1
          });
        }
      });

      return updated;
    });

    // Directly open Cart drawer showing added items without cluttering with toast
    setIsAddonModalOpen(false);
    setPendingMainItem(null);
    setIsCartOpen(true);
  }, [pendingMainItem]);

  const handleCheckout = async (orderData, skipNavigate = false) => {
    const currentUser = user || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('giftportal_user') || 'null') : null);
    if (!currentUser) {
      setIsAuthOpen(true);
      return null;
    }
    const orderToSave = { ...orderData, customerUsername: currentUser.username };
    const savedOrder = await db.saveOrder(orderToSave);
    setCart([]);
    if (!skipNavigate) {
      setIsCartOpen(false);
      setToastMessage(`🎉 Luxury Order #${savedOrder.id} placed successfully! Tracking active.`);
      setShowToast(true);
      setTimeout(() => {
        router.push('/?tab=orders');
      }, 1200);
    }
    return savedOrder;
  };

  const handleToggleFavourite = async () => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    const updatedFavs = await db.toggleFavourite(user.username, product);
    setFavourites(updatedFavs);
    const nowFav = updatedFavs.some(f => f.id === product.id);
    setToastMessage(nowFav ? 'Saved to your Wishlist!' : 'Removed from Wishlist.');
    setShowToast(true);
  };

  const cartQty = cart.reduce((sum, item) => sum + item.qty, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-rose-200 border-t-rose-600 animate-spin" />
        <p className="font-serif font-bold text-lg text-slate-900">Preparing Luxury Product Page...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center text-3xl">🎁</div>
        <h2 className="font-serif font-bold text-2xl text-slate-900">Product Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm">The gift item you are looking for might have been moved or is currently sold out.</p>
        <Link href="/" className="bg-rose-700 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans flex flex-col justify-between selection:bg-rose-100 selection:text-rose-900">
      <div>
        {/* Header */}
        <Header
          cartQty={cartQty}
          onOpenCart={() => setIsCartOpen(true)}
          user={user}
          onOpenAuth={() => setIsAuthOpen(true)}
          onLogout={() => {
            setUser(null);
            localStorage.removeItem('giftportal_user');
          }}
          onTabChange={(tab) => router.push(`/?tab=orders&view=${tab}`)}
        />

        {/* Breadcrumb Bar */}
        <div className="bg-white border-b border-rose-100/60 px-4 sm:px-6 md:px-12 py-2.5 sm:py-3 text-xs text-slate-500 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
          <Link href="/" className="hover:text-rose-700 font-medium shrink-0">Home</Link>
          <ChevronRight size={12} className="text-slate-400 shrink-0" />
          <span className="capitalize font-medium shrink-0">{product.cat}</span>
          <ChevronRight size={12} className="text-slate-400 shrink-0" />
          <span className="font-bold text-slate-900 truncate">{product.name}</span>
        </div>

        {/* Product Detail Main Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-start">
            
            {/* LEFT COLUMN: Gallery & Trust Badges (6 cols) */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              
              {/* Main Image Container */}
              <div className="relative aspect-[4/3] sm:aspect-square lg:aspect-[4/5] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl border border-rose-100/80 bg-white group">
                <img
                  src={photoPreview || product.img}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Image Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    ✨ {product.tag || 'Special Edition'}
                  </span>
                  <span className="bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-md flex items-center gap-1">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    {product.rating || '4.9'} ({product.reviewsCount || 480}+ Reviews)
                  </span>
                </div>

                <button
                  onClick={handleToggleFavourite}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${
                    isFav ? 'bg-rose-600 text-white' : 'bg-white/80 hover:bg-white text-slate-700'
                  }`}
                >
                  <Heart size={18} className={isFav ? 'fill-current' : ''} />
                </button>

                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-white flex items-center justify-between text-xs">
                  <span className="font-semibold text-rose-200">⚡ Hyper-Local Delivery</span>
                  <span className="font-bold text-amber-300">Same-Day & Midnight Slots</span>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="grid grid-cols-3 gap-3 bg-white p-5 rounded-3xl border border-rose-100 shadow-sm text-center">
                <div className="space-y-1">
                  <Truck size={20} className="text-rose-600 mx-auto" />
                  <p className="text-[11px] font-bold text-slate-900">Express 2-Hr</p>
                  <p className="text-[9px] text-slate-400">Available in 100+ cities</p>
                </div>
                <div className="space-y-1 border-x border-rose-100 px-2">
                  <ShieldCheck size={20} className="text-amber-500 mx-auto" />
                  <p className="text-[11px] font-bold text-slate-900">Fresh Replacement</p>
                  <p className="text-[9px] text-slate-400">100% Quality Guaranteed</p>
                </div>
                <div className="space-y-1">
                  <Award size={20} className="text-emerald-600 mx-auto" />
                  <p className="text-[11px] font-bold text-slate-900">Luxe Packaging</p>
                  <p className="text-[9px] text-slate-400">Includes Free Printed Card</p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Configuration Studio & CTAs (7 cols) */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* Product Header Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100">
                    {product.cat} COLLECTION
                  </span>
                  {isSoldOut ? (
                    <span className="text-xs text-rose-700 font-extrabold bg-rose-100 px-2.5 py-0.5 rounded-md border border-rose-200">
                      Sold Out / Out of Stock
                    </span>
                  ) : isLowStock ? (
                    <span className="text-xs text-amber-800 font-extrabold bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-200 animate-pulse">
                      Only {stockCount} Left in Stock
                    </span>
                  ) : (
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-md">
                      In Stock &bull; Ready for Today
                    </span>
                  )}
                </div>

                <h1 className="font-serif font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900 leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2 sm:gap-3 pt-1 flex-wrap">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">{product.rating || '4.9'} / 5.0</span>
                  <span className="text-xs text-slate-400 font-medium">({product.reviewsCount || 480} Reviews)</span>
                </div>

                {/* Occasion & Recipient Classification Tags */}
                {((product.occasions && product.occasions.length > 0) || (product.recipients && product.recipients.length > 0) || product.occasion || product.recipient) && (
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    {(Array.isArray(product.occasions) ? product.occasions : (Array.isArray(product.occasion) ? product.occasion : (product.occasion ? [product.occasion] : []))).map((occ, i) => (
                      <span key={`occ-${i}`} className="bg-rose-50 text-rose-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-rose-100 flex items-center gap-1 capitalize">
                        <Sparkles size={11} className="text-rose-600" />
                        <span>{occ}</span>
                      </span>
                    ))}
                    {(Array.isArray(product.recipients) ? product.recipients : (Array.isArray(product.recipient) ? product.recipient : (product.recipient ? [product.recipient] : []))).map((rec, i) => (
                      <span key={`rec-${i}`} className="bg-slate-100 text-slate-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-slate-200 flex items-center gap-1 capitalize">
                        <span>{rec}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Price Display */}
                <div className="flex items-baseline gap-2.5 sm:gap-3 pt-2">
                  <span className="font-serif font-extrabold text-3xl sm:text-4xl text-rose-700">₹{currentVariant.price}</span>
                  <span className="text-sm sm:text-base text-slate-400 line-through font-semibold">₹{currentVariant.original}</span>
                  <span className="bg-amber-400 text-slate-950 text-[10px] sm:text-xs font-extrabold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg uppercase">
                    {Math.round((1 - currentVariant.price / currentVariant.original) * 100)}% OFF
                  </span>
                </div>
              </div>

              {/* Type / Variant Selector */}
              {product.types && product.types.length > 0 && (
                <div className="space-y-3 bg-white p-5 rounded-3xl border border-rose-100 shadow-sm">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    Choose Gift Option & Size:
                  </label>
                  
                  <div className="space-y-3">
                    {product.types.map((typeObj, typeIdx) => (
                      <div key={typeIdx} className="space-y-2">
                        <p className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">{typeObj.label}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {typeObj.variants.map((v, vIdx) => {
                            const isSelected = selectedTypeIdx === typeIdx && selectedVariantIdx === vIdx;
                            return (
                              <button
                                key={vIdx}
                                onClick={() => {
                                  setSelectedTypeIdx(typeIdx);
                                  setSelectedVariantIdx(vIdx);
                                }}
                                className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'border-rose-600 bg-rose-50/70 shadow-sm'
                                    : 'border-rose-100 hover:border-rose-300 bg-white'
                                }`}
                              >
                                <div>
                                  <p className="text-xs font-bold text-slate-900">{v.label}</p>
                                  <p className="text-xs font-extrabold text-rose-700 mt-0.5">₹{v.price}</p>
                                </div>
                                {isSelected && <CheckCircle size={16} className="text-rose-600" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 1. Pincode & Delivery Slot Engine */}
              <div className="bg-rose-50/70 border border-rose-200/80 rounded-3xl p-6 space-y-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-rose-900">
                    <MapPin size={18} className="text-rose-600" />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider">Check Delivery & Time Slots</h3>
                  </div>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                    Hyper-local Service
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit Pincode (e.g. 400703)"
                    className="flex-1 bg-white border border-rose-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-rose-600 shadow-sm"
                  />
                  <button
                    onClick={handleCheckPincode}
                    disabled={isCheckingPin}
                    className="bg-rose-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-rose-800 transition-colors shadow-md"
                  >
                    {isCheckingPin ? 'Checking...' : 'Check Pin'}
                  </button>
                </div>

                {pincodeResult && (
                  <div className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                    pincodeResult.serviceable ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-red-50 border border-red-200 text-red-900'
                  }`}>
                    <CheckCircle size={16} className={pincodeResult.serviceable ? 'text-emerald-600' : 'text-red-600'} />
                    <span>{pincodeResult.message}</span>
                  </div>
                )}

                {/* Date Picker */}
                <div className="space-y-2 pt-2 border-t border-rose-200/60">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-extrabold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar size={14} className="text-rose-600" /> Select Delivery Date:
                    </label>
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/70">
                      {getDeliveryDateLabel()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDate('today')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedDate === 'today'
                          ? 'bg-rose-700 text-white shadow-md'
                          : 'bg-white text-slate-700 border border-rose-200/60 hover:border-rose-400'
                      }`}
                    >
                      Today (Same Day)
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedDate('tomorrow')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedDate === 'tomorrow'
                          ? 'bg-rose-700 text-white shadow-md'
                          : 'bg-white text-slate-700 border border-rose-200/60 hover:border-rose-400'
                      }`}
                    >
                      Tomorrow
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDate('pick_date');
                        if (!customDate) {
                          const defaultFuture = new Date();
                          defaultFuture.setDate(defaultFuture.getDate() + 2);
                          setCustomDate(defaultFuture.toISOString().split('T')[0]);
                        }
                        setTimeout(() => {
                          datePickerRef.current?.showPicker?.();
                        }, 50);
                      }}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        selectedDate === 'pick_date'
                          ? 'bg-rose-700 text-white shadow-md'
                          : 'bg-white text-slate-700 border border-rose-200/60 hover:border-rose-400'
                      }`}
                    >
                      <Calendar size={13} className={selectedDate === 'pick_date' ? 'text-white' : 'text-rose-600'} />
                      <span className="truncate">
                        {selectedDate === 'pick_date' && customDate ? formatDisplayDate(customDate) : 'Pick Date'}
                      </span>
                    </button>
                  </div>

                  {/* Custom Date Picker Dropdown */}
                  {selectedDate === 'pick_date' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-rose-50/70 p-3.5 rounded-2xl border border-rose-200 space-y-2 mt-2"
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-extrabold text-slate-800 flex items-center gap-1.5">
                          <Calendar size={13} className="text-rose-600" />
                          <span>Select Desired Delivery Date:</span>
                        </label>
                        {customDate && (
                          <span className="text-[10px] font-extrabold text-rose-800 bg-white px-2.5 py-0.5 rounded-full border border-rose-200 shadow-2xs">
                            {getDeliveryDateLabel()}
                          </span>
                        )}
                      </div>
                      <div className="relative flex items-center">
                        <input
                          ref={datePickerRef}
                          type="date"
                          min={todayStr}
                          max={maxDateStr}
                          value={customDate}
                          onChange={(e) => {
                            setCustomDate(e.target.value);
                            setSelectedDate('pick_date');
                          }}
                          className="w-full bg-white border border-rose-200/90 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 shadow-2xs focus:outline-none focus:border-rose-600 cursor-pointer"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium pt-0.5">
                        <span>✨ Guaranteed hand-delivery on selected date</span>
                        <span>Available up to 60 days ahead</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Time Slot Picker */}
                <div className="space-y-2 pt-2 border-t border-rose-200/60">
                  <label className="text-[11px] font-extrabold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock size={14} className="text-rose-600" /> Select Delivery Slot:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {deliverySlots.map((slot) => (
                      <div
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot.id)}
                        className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                          selectedSlot === slot.id
                            ? 'border-rose-600 bg-white shadow-md'
                            : 'border-rose-200/60 bg-white/80 hover:border-rose-300'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-900">{slot.name}</p>
                          <p className="text-[10px] text-slate-500 font-medium">{slot.time}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          slot.price === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {slot.price === 0 ? 'FREE' : `+₹${slot.price}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Personalization Studio (If Supported) */}
              {product.supportsPersonalization && (
                <div className="bg-amber-50/60 border border-amber-200 rounded-3xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2 text-amber-900">
                    <Sparkles size={18} className="text-amber-600" />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider">Personalization Studio</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <Type size={14} className="text-amber-600" /> Engraving Name / Custom Text:
                      </label>
                      <input
                        type="text"
                        maxLength={30}
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="e.g. Simran & Rahul (Max 30 chars)"
                        className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-amber-500 shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <MessageSquare size={14} className="text-amber-600" /> Printed Greeting Card Message:
                      </label>
                      <textarea
                        rows={2}
                        value={cardMessage}
                        onChange={(e) => setCardMessage(e.target.value)}
                        placeholder="Write your personal gift card message..."
                        className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-amber-500 shadow-sm"
                      />
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        <span className="text-[9px] font-bold text-amber-800 uppercase tracking-wider">Templates:</span>
                        {[
                          '🎉 Happy Birthday! Wishing endless joy!',
                          '💖 Happy Anniversary to my love!',
                          '✨ Congratulations on your success!'
                        ].map((txt, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCardMessage(txt)}
                            className="text-[9px] bg-white border border-amber-200 text-amber-900 font-bold px-2 py-1 rounded-lg hover:bg-amber-100"
                          >
                            {txt.slice(0, 24)}...
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <Upload size={14} className="text-amber-600" /> Photo Upload for Printing (Optional):
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="flex-1 cursor-pointer bg-white border-2 border-dashed border-amber-300 rounded-2xl p-3 flex items-center justify-center gap-2 hover:border-amber-500 transition-colors shadow-sm">
                          <Upload size={16} className="text-amber-600" />
                          <span className="text-xs font-bold text-amber-900">
                            {photoPreview ? 'Change Selected Photo' : 'Upload High-Res Photo'}
                          </span>
                          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                        </label>
                        {photoPreview && (
                          <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-amber-400 shadow-md shrink-0">
                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Action CTAs */}
              <div className="space-y-3 pt-2">
                <motion.button
                  whileHover={!isSoldOut ? { scale: 1.02 } : {}}
                  whileTap={!isSoldOut ? { scale: 0.98 } : {}}
                  onClick={!isSoldOut ? handleInitiateAddGift : undefined}
                  disabled={isSoldOut}
                  className={`w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 sm:gap-3 shadow-xl transition-all border ${
                    isSoldOut
                      ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 hover:from-rose-800 hover:to-rose-900 text-white shadow-rose-900/20 border-rose-500/40 cursor-pointer'
                  }`}
                >
                  <Gift size={17} className={isSoldOut ? 'text-slate-400' : 'text-amber-300'} />
                  <span>{isSoldOut ? 'Sold Out - Currently Unavailable' : `Add Gift to Bag (₹${currentVariant.price + slotFee})`}</span>
                </motion.button>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] sm:text-xs text-slate-500 font-semibold px-1 gap-1.5">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle size={14} /> Guaranteed Delivery Slot Registered
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Lock size={12} /> 256-bit SSL Secure Checkout
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Related / Complementary Gifts Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-10 border-t border-rose-100/80 space-y-6">
              <div>
                <h3 className="font-serif font-bold text-2xl text-slate-900">You May Also Like</h3>
                <p className="text-xs text-slate-500">Complementary gift hampers and keepsakes popular with buyers</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/product/${rel.id}`}
                    className="bg-white rounded-3xl overflow-hidden border border-rose-100/80 shadow-sm hover:shadow-card-hover transition-all duration-300 p-4 space-y-3 group"
                  >
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-rose-50">
                      <img src={rel.img} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-sm text-slate-900 group-hover:text-rose-700 line-clamp-1">{rel.name}</p>
                      <p className="text-xs font-bold text-rose-700 mt-1">₹{rel.types?.[0]?.variants?.[0]?.price || 599}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
        onCheckout={handleCheckout}
        user={user}
        onRequireAuth={() => setIsAuthOpen(true)}
      />

      {/* Addon Modal */}
      <AddonModal
        isOpen={isAddonModalOpen}
        onClose={() => setIsAddonModalOpen(false)}
        mainItem={pendingMainItem}
        onConfirmAddons={handleConfirmAddons}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(userData) => {
          setUser(userData);
          if (typeof window !== 'undefined') {
            localStorage.setItem('giftportal_user', JSON.stringify(userData));
          }
        }}
      />

      {/* Toast - Never show while cart/checkout is open */}
      {!isCartOpen && showToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[1000] animate-pop-in">
          <div className="bg-slate-950 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-rose-700/50">
            <Gift size={18} className="text-amber-400" />
            <span className="text-xs font-bold">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
