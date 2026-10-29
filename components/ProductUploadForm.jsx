'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, Plus, Trash2, Image as ImageIcon, Sparkles, CheckCircle2, 
  Upload, X, HelpCircle, Layers, Tag, ShieldCheck, AlertCircle, Camera, Type,
  Building, ShoppingBag, ArrowRight, ArrowLeft, Info, Check, Eye, ChevronRight,
  Sparkle, Star, Clock, Truck, FileText
} from 'lucide-react';
import { db } from '../lib/db';

const CATEGORY_OPTIONS = [
  { id: 'flowers', name: 'Flowers & Bouquets', emoji: '🌸', desc: 'Fresh blooms, roses, orchids & arrangements' },
  { id: 'cakes', name: 'Cakes & Bakery', emoji: '🍰', desc: 'Custom cakes, pastries, gourmet bakes' },
  { id: 'hampers', name: 'Gift Hampers', emoji: '🎁', desc: 'Curated gift baskets & festival hampers' },
  { id: 'chocolates', name: 'Artisan Chocolates', emoji: '🍫', desc: 'Belgian truffles, bars & sweet boxes' },
  { id: 'personalized', name: 'Personalized Gifts', emoji: '✨', desc: 'Custom engraved plaques, frames, mugs' },
  { id: 'plants', name: 'Indoor Plants', emoji: '🌿', desc: 'Bonsai, succulent planters & green decor' }
];

const PRESET_PHOTOS = [
  { label: '🌸 Fresh Dutch Roses', url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=700' },
  { label: '🍰 Belgian Chocolate Cake', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700' },
  { label: '🎁 Luxury Royal Hamper', url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=700' },
  { label: '✨ Custom Engraved Plaque', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=700' },
  { label: '🌿 Zen Green Bonsai', url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=700' },
  { label: '🍫 Artisan Truffle Box', url: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=700' }
];

const TITLE_SUGGESTIONS = [
  'Crimson Red Rose Velvet Bouquet',
  'Belgian Dark Chocolate Truffle Cake',
  'Royal Festive Celebration Hamper',
  'Custom Laser-Engraved Wooden Frame',
  'Exotic Purple Orchid Glass Vase'
];

export default function ProductUploadForm({ 
  isOpen, 
  onClose, 
  currentUser, // admin or vendor
  productToEdit = null, // if provided, edit mode
  onSuccess,
  categories = [],
  vendors = []
}) {
  const isVendor = currentUser?.type === 'vendor';
  const isEditing = Boolean(productToEdit);

  // Wizard Step: 1, 2, 3, 4
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);

  // Product Form State
  const [name, setName] = useState('');
  const [cat, setCat] = useState('flowers');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [stock, setStock] = useState('50');
  const [img, setImg] = useState('');
  const [emoji, setEmoji] = useState('🌸');
  const [desc, setDesc] = useState('');
  const [assignedVendorId, setAssignedVendorId] = useState(isVendor ? currentUser?.id : '');
  
  // B2B & B2C Selling Target
  const [targetMarket, setTargetMarket] = useState('both'); // 'both' | 'b2c' | 'b2b'
  const [b2bPrice, setB2bPrice] = useState('');
  const [b2bMoq, setB2bMoq] = useState('10');
  const [b2bUnit, setB2bUnit] = useState('Pieces');
  const [b2bLeadTime, setB2bLeadTime] = useState('1-2 Days Preparation');

  // Custom Specifications / Key Features
  const [customFields, setCustomFields] = useState([
    { key: 'Care / Storage', value: '' }
  ]);

  // Personalised Gifts Configuration
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [requirePhoto, setRequirePhoto] = useState(false);
  const [requireText, setRequireText] = useState(false);
  const [maxChars, setMaxChars] = useState(30);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showPreviewModalMobile, setShowPreviewModalMobile] = useState(false);

  // Reset or prefill on open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setError('');
      if (productToEdit) {
        // PREFILL FOR EDIT
        setName(productToEdit.name || '');
        setCat(productToEdit.cat || 'flowers');
        const firstPrice = productToEdit.price || productToEdit.types?.[0]?.variants?.[0]?.price || '';
        const firstOrig = productToEdit.original || productToEdit.types?.[0]?.variants?.[0]?.original || '';
        setPrice(String(firstPrice || ''));
        setOriginalPrice(firstOrig ? String(firstOrig) : '');
        setStock(productToEdit.stock !== undefined ? String(productToEdit.stock) : '50');
        setImg(productToEdit.img || '');
        setEmoji(productToEdit.emoji || '🎁');
        setDesc(productToEdit.desc || '');
        setAssignedVendorId(productToEdit.vendorId || (isVendor ? currentUser?.id : ''));
        setTargetMarket(productToEdit.targetMarket || 'both');
        setB2bPrice(productToEdit.b2bPrice ? String(productToEdit.b2bPrice) : (firstPrice ? String(Math.round(firstPrice * 0.65)) : ''));
        setB2bMoq(productToEdit.b2bMoq ? String(productToEdit.b2bMoq) : '10');
        setB2bUnit(productToEdit.b2bUnit || 'Pieces');
        setB2bLeadTime(productToEdit.b2bLeadTime || '1-2 Days Preparation');
        setCustomFields(
          Array.isArray(productToEdit.customFields) && productToEdit.customFields.length > 0 
            ? productToEdit.customFields 
            : [{ key: 'Care / Storage', value: '' }]
        );
        setIsPersonalized(Boolean(productToEdit.personalizationConfig?.isPersonalized));
        setRequirePhoto(Boolean(productToEdit.personalizationConfig?.requirePhoto));
        setRequireText(Boolean(productToEdit.personalizationConfig?.requireText));
        setMaxChars(productToEdit.personalizationConfig?.maxChars || 30);
      } else {
        // RESET FOR NEW
        setName('');
        setCat('flowers');
        setPrice('');
        setOriginalPrice('');
        setStock('50');
        setImg('https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=700');
        setEmoji('🌸');
        setDesc('');
        if (isVendor) {
          setAssignedVendorId(currentUser?.id || '');
        }
        setTargetMarket('both');
        setB2bPrice('');
        setB2bMoq('10');
        setB2bUnit('Pieces');
        setB2bLeadTime('1-2 Days Preparation');
        setCustomFields([{ key: 'Care / Storage', value: '' }]);
        setIsPersonalized(false);
        setRequirePhoto(false);
        setRequireText(false);
      }
    }
  }, [isOpen, productToEdit, currentUser, isVendor]);

  // Handle local file image upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setError('Photo file size should be under 8MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (evt) => {
        setImg(evt.target.result);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  // Step Validation before proceeding
  const handleNextStep = () => {
    setError('');
    if (step === 1) {
      if (!cat) {
        setError('Please select a category for your product.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!name.trim()) {
        setError('Please enter a product title/name.');
        return;
      }
      if (!img.trim()) {
        setError('Please upload or select a product photo.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      const numPrice = Number(price);
      if (!numPrice || numPrice <= 0) {
        setError('Please enter a valid retail price (₹).');
        return;
      }
      if ((targetMarket === 'b2b' || targetMarket === 'both') && (!b2bPrice || Number(b2bPrice) <= 0)) {
        setError('Please enter a wholesale B2B price.');
        return;
      }
      setStep(4);
    }
  };

  const handlePrevStep = () => {
    setError('');
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    setError('');
    const numPrice = Number(price);
    if (!name.trim()) {
      setError('Please enter a product name.');
      setStep(2);
      return;
    }
    if (!numPrice || numPrice <= 0) {
      setError('Please enter a valid price.');
      setStep(3);
      return;
    }

    setIsSubmitting(true);
    try {
      const vendorObj = vendors.find(v => v.id === assignedVendorId) || 
        (isVendor ? { id: currentUser.id, name: currentUser.businessName || currentUser.name } : null);

      const numB2bPrice = Number(b2bPrice) || Math.round(numPrice * 0.65);
      const numB2bMoq = Math.max(1, parseInt(b2bMoq, 10) || 10);

      const payload = {
        name: name.trim(),
        cat,
        price: numPrice,
        original: Number(originalPrice) || Math.round(numPrice * 1.3),
        stock: Math.max(0, parseInt(stock, 10) || 50),
        isSoldOut: parseInt(stock, 10) <= 0,
        img: img.trim() || 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=700',
        emoji: emoji.trim() || '🎁',
        desc: desc.trim() || `${name.trim()} by ${vendorObj?.name || 'Artisan Workshop'}`,
        vendorId: vendorObj?.id || (isVendor ? currentUser?.id : 'vendor-flowers'),
        vendorName: vendorObj?.businessName || vendorObj?.name || (isVendor ? currentUser?.businessName : 'Luxury Partner'),
        targetMarket, // 'both' | 'b2c' | 'b2b'
        b2bPrice: numB2bPrice,
        b2bMoq: numB2bMoq,
        b2bUnit: b2bUnit.trim() || 'Pieces',
        b2bLeadTime: b2bLeadTime.trim() || '1-2 Days Preparation',
        customFields: customFields.filter(f => f.key.trim() && f.value.trim()),
        personalizationConfig: {
          isPersonalized,
          requirePhoto,
          photoPrompt: 'Upload custom high-res photo for printing',
          requireText,
          textPrompt: 'Enter custom name / message',
          maxChars: Number(maxChars) || 30
        },
        rating: productToEdit?.rating || 4.9,
        reviewsCount: productToEdit?.reviewsCount || 12
      };

      let result;
      if (isEditing) {
        result = await db.updateProduct(productToEdit.id, payload, isVendor ? 'vendor' : 'admin');
      } else {
        result = await db.submitProduct(payload, isVendor ? 'vendor' : 'admin');
      }

      if (onSuccess) onSuccess(result);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Could not save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Calculate discount percent
  const discountVal = (originalPrice && price && Number(originalPrice) > Number(price))
    ? Math.round((1 - Number(price) / Number(originalPrice)) * 100)
    : 25;

  return (
    <AnimatePresence>
      {/* Full Page Studio Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[700] w-full h-full min-h-screen bg-slate-900/60 backdrop-blur-xl flex flex-col font-sans select-none overflow-hidden"
      >
        <div className="w-full h-full bg-[#f8fafc] flex flex-col overflow-hidden">
          
          {/* 1. TOP HEADER STUDIO BAR */}
          <header className="relative h-16 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between shrink-0 shadow-xs z-20">
            {/* Top Linear Progress Indicator */}
            <div className="absolute top-0 inset-x-0 h-1 bg-slate-100">
              <div 
                className="h-full bg-slate-900 transition-all duration-300 ease-out" 
                style={{ width: `${(step / 4) * 100}%` }} 
              />
            </div>

            {/* Left: Clean Exit & Title */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                title="Exit Listing Studio"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Exit</span>
              </button>

              <div className="h-5 w-px bg-slate-200" />

              <div>
                <h1 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-none">
                  {isEditing ? `Edit: ${name || 'Product Details'}` : 'New Product Listing'}
                </h1>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                  Step {step} of 4 · {step === 1 ? 'Collection & Audience' : step === 2 ? 'Title & Photos' : step === 3 ? 'Price & Inventory' : 'Review & Publish'}
                </p>
              </div>
            </div>

            {/* Center: Minimalist Step Tracker (Desktop) */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              {[
                { s: 1, name: 'Collection' },
                { s: 2, name: 'Photos & Name' },
                { s: 3, name: 'Price & Stock' },
                { s: 4, name: 'Review' }
              ].map((st, i) => (
                <div key={st.s} className="flex items-center gap-2 lg:gap-3">
                  <button
                    type="button"
                    onClick={() => { if (st.s < step) setStep(st.s); }}
                    disabled={st.s > step}
                    className={`flex items-center gap-1.5 text-xs font-bold transition-all ${
                      step === st.s
                        ? 'text-slate-950 font-black'
                        : step > st.s
                        ? 'text-emerald-700 hover:text-emerald-800 cursor-pointer'
                        : 'text-slate-400 cursor-default'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                      step === st.s
                        ? 'bg-slate-900 text-white shadow-xs'
                        : step > st.s
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {step > st.s ? <Check size={11} className="stroke-[3]" /> : st.s}
                    </span>
                    <span>{st.name}</span>
                  </button>
                  {i < 3 && (
                    <div className={`w-4 lg:w-6 h-0.5 rounded-full transition-colors ${
                      step > st.s ? 'bg-emerald-400' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Right: Clean Status Badge & Close Icon */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Admin Approval Required
              </span>

              <button
                type="button"
                onClick={() => setShowPreviewModalMobile(true)}
                className="lg:hidden flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-2.5 py-1.5 rounded-xl transition-all"
              >
                <Eye size={14} />
                <span>Preview</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer"
                title="Exit Listing Studio"
              >
                <X size={18} />
              </button>
            </div>
          </header>

          {/* 2. MAIN WORKSPACE: 2-COLUMN STUDIO (Wizard Steps on Left, Live Card on Right) */}
          <main className="flex-1 overflow-hidden flex flex-col lg:flex-row">
            
            {/* LEFT / CENTER COLUMN: Step Form Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-12 py-6 sm:py-8 flex justify-center">
              <div className="w-full max-w-2xl space-y-6">
                
                {/* Error Banner */}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-3 shadow-xs"
                  >
                    <AlertCircle size={18} className="text-rose-600 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* ============================================================== */}
                {/* STEP 1: CATEGORY & SELLING CHANNEL */}
                {/* ============================================================== */}
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Step 1 of 4</span>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                        What are you listing today?
                      </h2>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        Select the collection category and who can purchase this item.
                      </p>
                    </div>

                    {/* Category Selection Cards */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                        Select Category (सामान का प्रकार) *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {CATEGORY_OPTIONS.map((c) => {
                          const isSelected = cat === c.id;
                          return (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => {
                                setCat(c.id);
                                if (c.emoji) setEmoji(c.emoji);
                              }}
                              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between h-28 relative ${
                                isSelected 
                                  ? 'bg-rose-50/50 border-rose-600 text-rose-950 shadow-md ring-2 ring-rose-600/20' 
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:shadow-xs'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-2xl">{c.emoji}</span>
                                {isSelected && (
                                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center">
                                    <Check size={12} className="stroke-[3]" />
                                  </span>
                                )}
                              </div>
                              <div>
                                <h4 className="font-black text-xs leading-tight">{c.name}</h4>
                                <p className="text-[9.5px] text-slate-400 font-medium line-clamp-1 mt-0.5">{c.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Selling Audience (B2B, B2C, Both) */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                          Who Can Purchase This Item? (खरीदार कौन होंगे?) *
                        </label>
                        <span className="text-[10px] font-black text-rose-600 uppercase bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                          Flexible Freedom
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Both (Recommended) */}
                        <div
                          onClick={() => setTargetMarket('both')}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                            targetMarket === 'both'
                              ? 'bg-purple-50/70 border-purple-600 text-purple-950 shadow-md ring-2 ring-purple-600/20'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xl">🌐</span>
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-purple-200/80 text-purple-900 rounded-full">
                              Recommended
                            </span>
                          </div>
                          <div>
                            <h4 className="font-black text-xs">Both B2B & B2C</h4>
                            <p className="text-[10px] text-slate-500 font-medium mt-1 leading-snug">
                              Sell to retail gift shoppers at retail price AND wholesale buyers at trade MOQ rates.
                            </p>
                          </div>
                        </div>

                        {/* B2C Retail Only */}
                        <div
                          onClick={() => setTargetMarket('b2c')}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                            targetMarket === 'b2c'
                              ? 'bg-emerald-50/70 border-emerald-600 text-emerald-950 shadow-md ring-2 ring-emerald-600/20'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xl">🛍️</span>
                            {targetMarket === 'b2c' && <Check size={14} className="text-emerald-700 stroke-[3]" />}
                          </div>
                          <div>
                            <h4 className="font-black text-xs">B2C Retail Only</h4>
                            <p className="text-[10px] text-slate-500 font-medium mt-1 leading-snug">
                              Single item gift purchases for consumer marketplace shoppers.
                            </p>
                          </div>
                        </div>

                        {/* B2B Wholesale Only */}
                        <div
                          onClick={() => setTargetMarket('b2b')}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                            targetMarket === 'b2b'
                              ? 'bg-blue-50/70 border-blue-600 text-blue-950 shadow-md ring-2 ring-blue-600/20'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xl">🏢</span>
                            {targetMarket === 'b2b' && <Check size={14} className="text-blue-700 stroke-[3]" />}
                          </div>
                          <div>
                            <h4 className="font-black text-xs">B2B Wholesale Only</h4>
                            <p className="text-[10px] text-slate-500 font-medium mt-1 leading-snug">
                              Sold exclusively in bulk to peer partner workshops and corporate clients.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Admin Assignment (if Admin is uploading) */}
                    {!isVendor && vendors.length > 0 && (
                      <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-wider text-amber-950 block">
                          Assign to Partner Vendor (Admin control)
                        </label>
                        <select
                          value={assignedVendorId}
                          onChange={(e) => setAssignedVendorId(e.target.value)}
                          className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs font-bold text-slate-900 outline-none"
                        >
                          <option value="">-- Platform Master Stock (No Vendor) --</option>
                          {vendors.map(v => (
                            <option key={v.id} value={v.id}>
                              🏬 {v.businessName || v.name} ({v.city || 'Indore'})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ============================================================== */}
                {/* STEP 2: NAME, PHOTOS & SHOWCASE */}
                {/* ============================================================== */}
                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Step 2 of 4</span>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                        Product Title & Photos
                      </h2>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        Give your product an alluring title and high-resolution picture.
                      </p>
                    </div>

                    {/* Product Name Input */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                        Product Title / Name (सामान का नाम) *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Royal Scarlet Rose Bouquet (20 Stems)"
                        className="w-full bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 text-sm font-black text-slate-900 outline-none focus:border-rose-600 transition-all shadow-xs"
                      />
                      
                      {/* Suggestions Chips */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        <span className="text-[10px] font-black uppercase text-slate-400">Ideas:</span>
                        {TITLE_SUGGESTIONS.map((sug, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setName(sug)}
                            className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Photo Upload Box */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                        Product Photo (उत्पाद की फोटो) *
                      </label>

                      <div className="bg-white p-5 rounded-3xl border-2 border-dashed border-slate-300 hover:border-rose-500 transition-all flex flex-col items-center justify-center text-center space-y-3">
                        {img ? (
                          <div className="relative group w-full max-w-xs aspect-video sm:aspect-square rounded-2xl overflow-hidden shadow-md">
                            <img src={img} alt="Product Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-white text-slate-900 px-3 py-1.5 rounded-xl text-xs font-black shadow-md cursor-pointer"
                              >
                                Change Photo
                              </button>
                              <button
                                type="button"
                                onClick={() => setImg('')}
                                className="bg-rose-600 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-md cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                              <Upload size={24} />
                            </div>
                            <div>
                              <p className="text-xs font-black text-slate-800">
                                Click to Upload Photo from Device or Camera
                              </p>
                              <p className="text-[10px] text-slate-400 mt-0.5">
                                JPG, PNG, WEBP (Square 800x800 recommended)
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-sm cursor-pointer"
                            >
                              Choose Photo File
                            </button>
                          </>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>

                      {/* Quick 1-Click Preset Gallery */}
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[10px] font-black uppercase text-slate-400 block">
                          Or Choose from Instant Luxury Presets:
                        </span>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {PRESET_PHOTOS.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setImg(preset.url)}
                              className={`aspect-square rounded-xl overflow-hidden border-2 relative transition-all cursor-pointer group ${
                                img === preset.url ? 'border-rose-600 ring-2 ring-rose-600/30' : 'border-slate-200 hover:border-slate-400'
                              }`}
                            >
                              <img src={preset.url} alt={preset.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                              <span className="absolute bottom-0 inset-x-0 bg-slate-950/70 text-white text-[8px] font-bold p-0.5 truncate text-center">
                                {preset.label.split(' ')[0]}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Short Description */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                        Short Description / Highlights (विवरण)
                      </label>
                      <textarea
                        rows={2}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="e.g. Morning-fresh red roses wrapped in eco-friendly matte paper with satin ribbon bow."
                        className="w-full bg-white border-2 border-slate-200 rounded-2xl p-3 text-xs font-bold text-slate-900 outline-none focus:border-rose-600 transition-all shadow-xs"
                      />
                    </div>
                  </motion.div>
                )}

                {/* ============================================================== */}
                {/* STEP 3: PRICING, INVENTORY & WHOLESALE */}
                {/* ============================================================== */}
                {step === 3 && (
                  <motion.div 
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Step 3 of 4</span>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                        Pricing, Stock & Wholesale
                      </h2>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        Set what customers pay and your bulk wholesale terms.
                      </p>
                    </div>

                    {/* Retail Pricing Card */}
                    <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 space-y-4 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🛍️</span>
                          <h4 className="font-black text-xs uppercase tracking-wider text-slate-800">
                            Retail Customer Price (ग्राहक के लिए कीमत)
                          </h4>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          B2C Price
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-slate-600">
                            Selling Price (₹) *
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-black text-sm text-slate-400">₹</span>
                            <input
                              type="number"
                              value={price}
                              onChange={(e) => {
                                setPrice(e.target.value);
                                if (!b2bPrice && e.target.value) {
                                  setB2bPrice(String(Math.round(Number(e.target.value) * 0.65)));
                                }
                              }}
                              placeholder="899"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-sm font-black text-slate-900 outline-none focus:border-rose-600 focus:bg-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-slate-600">
                            Market MRP / Original (₹)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-black text-sm text-slate-400">₹</span>
                            <input
                              type="number"
                              value={originalPrice}
                              onChange={(e) => setOriginalPrice(e.target.value)}
                              placeholder="1199"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-sm font-bold text-slate-900 outline-none focus:border-rose-600 focus:bg-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-slate-600">
                            Available Stock (स्टॉक)
                          </label>
                          <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            placeholder="50"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-900 outline-none focus:border-rose-600 focus:bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* B2B Wholesale Pricing Card (if Both or B2B) */}
                    {(targetMarket === 'both' || targetMarket === 'b2b') && (
                      <div className="bg-indigo-50/70 p-5 rounded-3xl border-2 border-indigo-200 space-y-4 shadow-xs">
                        <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🏢</span>
                            <h4 className="font-black text-xs uppercase tracking-wider text-indigo-950">
                              Wholesale Rate for Vendors & Bulk Orders (थोक भाव) *
                            </h4>
                          </div>
                          <span className="text-[10px] font-black text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                            V2V Wholesale
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-indigo-900">
                              Wholesale Unit Price (₹) *
                            </label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-black text-sm text-indigo-500">₹</span>
                              <input
                                type="number"
                                value={b2bPrice}
                                onChange={(e) => setB2bPrice(e.target.value)}
                                placeholder="550"
                                className="w-full bg-white border border-indigo-300 rounded-xl pl-8 pr-3 py-2.5 text-sm font-black text-indigo-950 outline-none focus:border-indigo-600"
                              />
                            </div>
                            <span className="text-[9.5px] text-indigo-600 font-semibold block">
                              Suggested: 30-40% below consumer retail price
                            </span>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-indigo-900">
                              Minimum Order Qty (MOQ)
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={b2bMoq}
                              onChange={(e) => setB2bMoq(e.target.value)}
                              placeholder="10"
                              className="w-full bg-white border border-indigo-300 rounded-xl px-3.5 py-2.5 text-sm font-bold text-indigo-950 outline-none focus:border-indigo-600"
                            />
                            <span className="text-[9.5px] text-indigo-600 font-semibold block">
                              Minimum batch other vendors must buy
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-indigo-900">
                              Packaging Unit
                            </label>
                            <input
                              type="text"
                              value={b2bUnit}
                              onChange={(e) => setB2bUnit(e.target.value)}
                              placeholder="Pieces / Trays / Boxes"
                              className="w-full bg-white border border-indigo-300 rounded-xl px-3.5 py-2 text-xs font-bold text-indigo-950 outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-indigo-900">
                              Ready for Dispatch Time
                            </label>
                            <input
                              type="text"
                              value={b2bLeadTime}
                              onChange={(e) => setB2bLeadTime(e.target.value)}
                              placeholder="Same Day / 1-2 Days Preparation"
                              className="w-full bg-white border border-indigo-300 rounded-xl px-3.5 py-2 text-xs font-bold text-indigo-950 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Personalization Toggle */}
                    <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">✨</span>
                          <div>
                            <h4 className="font-black text-xs text-slate-800">
                              Gift Personalization (कस्टम नाम या फोटो)
                            </h4>
                            <p className="text-[10px] text-slate-500 font-medium">
                              Can customers add custom names or upload photos for printing?
                            </p>
                          </div>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isPersonalized}
                            onChange={(e) => setIsPersonalized(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      {isPersonalized && (
                        <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-bold text-slate-700">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={requirePhoto}
                              onChange={(e) => setRequirePhoto(e.target.checked)}
                              className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span>📷 Require Customer Photo Upload</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={requireText}
                              onChange={(e) => setRequireText(e.target.checked)}
                              className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span>✍️ Require Custom Name / Text</span>
                          </label>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ============================================================== */}
                {/* STEP 4: REVIEW & LIVE PREVIEW */}
                {/* ============================================================== */}
                {step === 4 && (
                  <motion.div 
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Step 4 of 4</span>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                        Review & Send for Approval
                      </h2>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        Double-check your listing details before sending to the Admin team.
                      </p>
                    </div>

                    {/* Summary Overview Card */}
                    <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 space-y-4 shadow-sm">
                      <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                        <img src={img || 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=700'} alt={name} className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-100" />
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                            {cat.toUpperCase()}
                          </span>
                          <h3 className="font-black text-base text-slate-900 mt-0.5 leading-tight">{name}</h3>
                          <p className="text-xs text-slate-500 font-medium">
                            Selling Model: <strong className="text-slate-800">{targetMarket === 'both' ? '🌐 B2B & B2C Dual Channel' : targetMarket === 'b2b' ? '🏢 B2B Wholesale Only' : '🛍️ B2C Retail Only'}</strong>
                          </p>
                        </div>
                      </div>

                      {/* Pricing Checklist */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Retail Price</span>
                          <span className="text-lg font-black text-slate-900">₹{price}</span>
                          {originalPrice && <span className="text-[10px] text-slate-400 line-through ml-1">₹{originalPrice}</span>}
                        </div>

                        {(targetMarket === 'both' || targetMarket === 'b2b') && (
                          <div className="bg-indigo-50/70 p-3 rounded-2xl border border-indigo-100">
                            <span className="text-[10px] font-bold uppercase text-indigo-700 block">Wholesale Rate</span>
                            <span className="text-lg font-black text-indigo-950">₹{b2bPrice}</span>
                            <span className="text-[10px] text-indigo-600 block">MOQ: {b2bMoq} {b2bUnit}</span>
                          </div>
                        )}

                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Inventory</span>
                          <span className="text-lg font-black text-slate-900">{stock}</span>
                          <span className="text-[10px] text-slate-500 block">Units in workshop</span>
                        </div>
                      </div>

                      {/* Approval Notice */}
                      <div className="bg-amber-50/80 border border-amber-200/80 p-4 rounded-2xl flex items-start gap-3 text-amber-900 text-xs">
                        <ShieldCheck size={20} className="text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-black uppercase tracking-wider text-[11px]">Admin Approval Protection</h5>
                          <p className="text-amber-800 text-[11px] font-medium mt-0.5 leading-relaxed">
                            {isEditing 
                              ? 'Your updated product details will enter the Admin Review queue. The existing version stays live until the new changes are approved.'
                              : 'Your product will be reviewed by the admin desk for quality verification. Once approved, it will go live immediately on the marketplace and B2B wholesale exchange.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>

            {/* RIGHT COLUMN (DESKTOP): Real-Time Live Card Preview */}
            <aside className="w-96 border-l border-slate-200/80 bg-white p-6 hidden lg:flex flex-col justify-between shrink-0 shadow-xs z-10 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Live Storefront Preview
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Exact Buyer View
                  </span>
                </div>

                {/* THE MOCK PRODUCT CARD (Exact match of marketplace ProductCard) */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col justify-between transition-all">
                  <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                    <img 
                      src={img || 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=700'} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-2 left-2 bg-slate-950/75 backdrop-blur-xs text-amber-300 text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Star size={9} className="fill-amber-400 text-amber-400" />
                      <span>4.9 (12)</span>
                    </div>

                    <span className="absolute top-2 right-2 text-xl bg-white/90 p-1 rounded-xl shadow-xs">
                      {emoji || '🌸'}
                    </span>
                  </div>

                  <div className="p-3.5 space-y-1.5">
                    <span className="text-[9px] font-black uppercase tracking-wider text-rose-600 block">
                      {cat.toUpperCase()} · {isVendor ? (currentUser?.businessName || 'Your Shop') : 'Luxury Partner'}
                    </span>

                    <h4 className="font-sans font-medium text-xs text-slate-800 line-clamp-1">
                      {name || 'Product Title Appears Here'}
                    </h4>

                    {/* Price row */}
                    <div className="flex items-baseline gap-1.5 pt-0.5">
                      <span className="font-sans font-bold text-sm text-slate-900">
                        ₹{price ? Number(price).toLocaleString('en-IN') : '899'}
                      </span>
                      {originalPrice && Number(originalPrice) > Number(price) && (
                        <span className="text-[10px] text-slate-400 line-through">
                          ₹{Number(originalPrice).toLocaleString('en-IN')}
                        </span>
                      )}
                      <span className="text-[8.5px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                        {discountVal}% OFF
                      </span>
                    </div>

                    {/* B2B Wholesale badge */}
                    {(targetMarket === 'both' || targetMarket === 'b2b') && (
                      <div className="pt-1">
                        <span className="text-[8.5px] font-black uppercase text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded block text-center">
                          🏢 B2B: ₹{b2bPrice || Math.round(Number(price || 899) * 0.65)} (MOQ {b2bMoq || 10} {b2bUnit})
                        </span>
                      </div>
                    )}

                    <p className="text-[10px] text-slate-500 font-normal pt-1">
                      Earliest Delivery: <span className="text-[#16a34a] font-bold">Today</span>
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-[10px] text-slate-500 space-y-1">
                  <div className="flex justify-between">
                    <span>Approval Status:</span>
                    <strong className="text-amber-700">Pending Review</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Visibility:</span>
                    <strong className="text-emerald-700">Live upon approval</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 text-center font-medium">
                Changes made here reflect in real-time.
              </div>
            </aside>
          </main>

          {/* 3. STICKY BOTTOM ACTION BAR */}
          <footer className="h-20 bg-white border-t border-slate-200/80 px-4 sm:px-8 flex items-center justify-between shrink-0 shadow-lg z-20">
            <div>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-3 rounded-xl transition-all cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  <span>Previous Step</span>
                </button>
              ) : (
                <span className="text-xs font-bold text-slate-400 hidden sm:inline">
                  Step 1 of 4 · Basic Setup
                </span>
              )}
            </div>

            {/* Mobile step dots */}
            <div className="flex items-center gap-1.5 lg:hidden">
              {[1, 2, 3, 4].map(s => (
                <span
                  key={s}
                  className={`h-2 rounded-full transition-all ${
                    step === s ? 'w-6 bg-slate-900' : 'w-2 bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <div>
              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span>
                    {step === 1 ? 'Next: Photos & Title' : step === 2 ? 'Next: Pricing & Stock' : 'Next: Final Review'}
                  </span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-green-900/20 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles size={16} />
                  <span>{isSubmitting ? 'Submitting...' : isEditing ? 'Save & Submit Changes' : '🚀 Submit Product for Approval'}</span>
                </button>
              )}
            </div>
          </footer>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
