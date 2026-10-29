'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Star, Gift, Sparkles, MapPin, Calendar, Clock, Upload, Type, MessageSquare, CheckCircle, ShieldCheck, Check } from 'lucide-react';
import { db } from '../lib/db';

export default function ProductPopup({ product, onClose, onAddToCart }) {
  const [pincode, setPincode] = useState('452010');
  const [pincodeResult, setPincodeResult] = useState({
    serviceable: true,
    pincode: '452010',
    city: 'Indore',
    state: 'Madhya Pradesh',
    area: 'Vijay Nagar / Scheme 54',
    message: 'Express & Midnight Delivery available in Indore (Vijay Nagar)'
  });
  const [isCheckingPin, setIsCheckingPin] = useState(false);
  const [selectedDate, setSelectedDate] = useState('today');
  const [customDate, setCustomDate] = useState('');
  const datePickerRef = useRef(null);
  const [selectedSlot, setSelectedSlot] = useState('standard');
  const [customName, setCustomName] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      const st = await db.getSettings();
      setSettings(st);
    }
    loadSettings();
  }, []);

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
        return dt.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
      } catch (e) {
        return customDate;
      }
    }
    return 'Scheduled Delivery';
  };

  if (!product) return null;

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
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const slotFee = deliverySlots.find(s => s.id === selectedSlot)?.price || 0;

  const handleSelectVariant = (variant, typeLabel) => {
    const deliveryMeta = {
      pincode: pincodeResult?.pincode || pincode || '452010',
      city: pincodeResult?.city || 'Indore',
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
    onAddToCart(product, variant, typeLabel, deliveryMeta);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] overflow-hidden">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Right-Side Slide-Over Dialogue / Drawer */}
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="absolute inset-y-0 right-0 w-full sm:max-w-xl md:max-w-2xl bg-white shadow-[-24px_0_60px_rgba(0,0,0,0.3)] flex flex-col border-l border-rose-100/80 font-sans z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image & Title Banner */}
          <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full overflow-hidden shrink-0 bg-slate-950">
            {/* Close button */}
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-black/80 backdrop-blur-md text-white p-2.5 rounded-full transition-colors border border-white/20 shadow-xl"
              aria-label="Close dialogue"
            >
              <X size={20} />
            </motion.button>
            
            <motion.img 
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              src={photoPreview || product.img} 
              alt={product.name}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-7 sm:right-7">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Sparkles size={11} className="fill-current" /> {product.tag || 'Special Selection'}
                </span>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  {product.rating || '4.9'} ({product.reviewsCount || 480}+ Reviews)
                </div>
                <span className="bg-rose-700/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
                  ⚡ Hyper-Local Express
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-extrabold text-white tracking-tight leading-tight">
                {product.name}
              </h3>
              {/* Reference Screenshot 2 Price & Delivery Highlight */}
              <div className="flex items-center gap-3 pt-2">
                <span className="font-sans font-black text-xl sm:text-2xl text-white">
                  ₹ {((product.types?.[0]?.variants?.[0]?.price) || 599).toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-white/80 font-medium bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  Earliest Delivery: <strong className="text-emerald-300 font-extrabold">{product.earliestDelivery || 'Today'}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Scrollable Configuration Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 no-scrollbar">
            {/* Quick Reference Summary Card matching Screenshot 2 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
              <div>
                <p className="text-xs text-slate-500 font-medium">Product Selection</p>
                <p className="text-sm font-bold text-slate-900 line-clamp-1">{product.name}</p>
              </div>
              <div className="text-right">
                <p className="text-base font-black text-slate-900">
                  ₹ {((product.types?.[0]?.variants?.[0]?.price) || 599).toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] font-medium text-slate-500">
                  Earliest Delivery:{' '}
                  <span className="text-[#16a34a] font-bold">
                    {product.earliestDelivery || 'Today'}
                  </span>
                </p>
              </div>
            </div>
            
            {/* 1. Hyper-Local Pincode & Delivery Slot Engine */}
            <div className="bg-rose-50/70 border border-rose-200/80 rounded-3xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-900">
                  <MapPin size={17} className="text-rose-600" />
                  <h4 className="text-xs font-black uppercase tracking-wider">Delivery Availability & Pincode</h4>
                </div>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                  Verified Local
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode (e.g. 452010)"
                  className="flex-1 bg-white border border-rose-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-rose-600 shadow-sm"
                />
                <button
                  onClick={handleCheckPincode}
                  disabled={isCheckingPin}
                  className="bg-rose-700 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-rose-800 transition-colors shadow-md"
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

              {/* Date Selector */}
              {/* Date Picker */}
              <div className="space-y-2 pt-2 border-t border-rose-200/60">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar size={13} className="text-rose-600" /> Select Delivery Date:
                  </label>
                  <span className="text-[9px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200/70">
                    {getDeliveryDateLabel()}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDate('today')}
                    className={`py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
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
                    className={`py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
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
                    className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      selectedDate === 'pick_date'
                        ? 'bg-rose-700 text-white shadow-md'
                        : 'bg-white text-slate-700 border border-rose-200/60 hover:border-rose-400'
                    }`}
                  >
                    <Calendar size={12} className={selectedDate === 'pick_date' ? 'text-white' : 'text-rose-600'} />
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
                    className="bg-rose-50/70 p-3 rounded-2xl border border-rose-200 space-y-2 mt-2"
                  >
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-black text-slate-800 flex items-center gap-1.5">
                        <Calendar size={12} className="text-rose-600" />
                        <span>Scheduled Delivery Date:</span>
                      </label>
                      {customDate && (
                        <span className="text-[9px] font-extrabold text-rose-800 bg-white px-2 py-0.5 rounded-full border border-rose-200 shadow-2xs">
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
                        className="w-full bg-white border border-rose-200/90 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 shadow-2xs focus:outline-none focus:border-rose-600 cursor-pointer"
                      />
                    </div>
                    <p className="text-[9px] text-slate-500 font-medium">
                      ✨ Handcrafted gifts can be scheduled up to 60 days in advance.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Slot Selector */}
              <div className="space-y-2 pt-2 border-t border-rose-200/60">
                <label className="text-[10px] font-black text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock size={13} className="text-rose-600" /> Choose Delivery Slot:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {deliverySlots.map((slot) => (
                    <div
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot.id)}
                      className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        selectedSlot === slot.id
                          ? 'border-rose-600 bg-white shadow-md'
                          : 'border-rose-200/60 bg-white/70 hover:border-rose-300'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900">{slot.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{slot.time}</p>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                        slot.price === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {slot.price === 0 ? 'FREE' : `+₹${slot.price}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Personalization Studio (If supported) */}
            {product.supportsPersonalization && (
              <div className="bg-amber-50/60 border border-amber-200 rounded-3xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-amber-900">
                  <Sparkles size={17} className="text-amber-600" />
                  <h4 className="text-xs font-black uppercase tracking-wider">Personalization Studio</h4>
                </div>

                <div className="space-y-4">
                  {/* Name Engraving */}
                  <div>
                    <label className="text-[10px] font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                      <Type size={13} className="text-amber-600" /> Custom Engraving / Name (Optional):
                    </label>
                    <input
                      type="text"
                      maxLength={30}
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="e.g. Rahul & Simran (Max 30 chars)"
                      className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-amber-500 shadow-sm"
                    />
                    {customName.trim() && (
                      <div className="mt-2 p-3 bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 rounded-2xl border border-amber-400/60 text-center shadow-inner space-y-0.5">
                        <span className="text-[9px] font-black uppercase tracking-widest text-amber-300 flex items-center justify-center gap-1">
                          <Sparkles size={11} className="text-amber-400 animate-spin" /> Live Artisan Engraving Preview
                        </span>
                        <p className="font-serif italic text-base sm:text-lg font-black bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 bg-clip-text text-transparent drop-shadow-sm tracking-wider">
                          "{customName}"
                        </p>
                        <p className="text-[10px] text-amber-200/80 font-medium">
                          Laser-engraved / printed in metallic gold script onto the gift surface
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Free Gift Card Message */}
                  <div>
                    <label className="text-[10px] font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                      <MessageSquare size={13} className="text-amber-600" /> Free Printed Greeting Card Message:
                    </label>
                    <textarea
                      rows={2}
                      value={cardMessage}
                      onChange={(e) => setCardMessage(e.target.value)}
                      placeholder="Write your personal heartfelt message..."
                      className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-amber-500 shadow-sm"
                    />
                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      <span className="text-[9px] font-black text-amber-800 uppercase tracking-wider">Suggestions:</span>
                      {[
                        '🎉 Happy Birthday! Wishing endless joy!',
                        '💖 Happy Anniversary to the best pair!',
                        '✨ Wishing you love, health & success!'
                      ].map((txt, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCardMessage(txt)}
                          className="text-[9px] bg-white border border-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-lg hover:bg-amber-100"
                        >
                          {txt.slice(0, 22)}...
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="text-[10px] font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                      <Upload size={13} className="text-amber-600" /> Photo Upload for Printing (Optional):
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
                        <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-amber-400 shadow-md flex-shrink-0">
                          <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Product Variations & Buy CTAs */}
            {product.types.map((type, typeIdx) => (
              <div key={typeIdx} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-8 bg-rose-700 rounded-full" />
                  <p className="text-[11px] font-black text-slate-900 uppercase tracking-wider">
                    Select {type.label} Size & Edition
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-2.5">
                  {type.variants.map((variant, idx) => (
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      key={idx}
                      className="group flex items-center justify-between p-4 rounded-3xl border-2 border-slate-200 hover:border-rose-600 transition-all cursor-pointer bg-white shadow-sm hover:shadow-md"
                      onClick={() => handleSelectVariant(variant, type.label)}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-2xl border border-rose-100 shrink-0">
                          {product.emoji || '🎁'}
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-slate-900 uppercase tracking-tight">{variant.label}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-base font-extrabold text-rose-700 tracking-tight">₹{variant.price}</span>
                            <span className="text-xs text-slate-400 line-through font-semibold">₹{variant.original}</span>
                            {slotFee > 0 && (
                              <span className="text-[9px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                +₹{slotFee} slot
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        className="bg-gradient-to-r from-rose-800 to-rose-700 text-white px-4 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-rose-900/20 group-hover:from-rose-900 group-hover:to-rose-800 transition-all"
                      >
                        <Plus size={16} />
                        <span>Add Gift</span>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}

            {/* B2B Wholesale Bulk Pricing Tier */}
            {(product.b2bPrice || product.targetMarket === 'b2b' || product.targetMarket === 'both') && (
              <div className="bg-indigo-50/70 border-2 border-indigo-200/80 rounded-3xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🏢</span>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-indigo-950">
                        B2B Wholesale & Bulk Gifting Available
                      </h4>
                      <p className="text-[10px] text-indigo-800 font-semibold">
                        Direct Artisan & Workshop Supply
                      </p>
                    </div>
                  </div>
                  <span className="bg-indigo-900 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full shadow-xs">
                    Verified B2B
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-white/80 p-3 rounded-2xl border border-indigo-100 text-center">
                  <div>
                    <span className="text-[9px] font-bold uppercase text-gray-400 block">Wholesale Rate</span>
                    <span className="text-sm font-black text-indigo-900">₹{product.b2bPrice || product.price}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase text-gray-400 block">Min Order (MOQ)</span>
                    <span className="text-sm font-black text-slate-800">{product.b2bMoq || 10} {product.b2bUnit || 'units'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase text-gray-400 block">Lead Time</span>
                    <span className="text-xs font-black text-slate-800">{product.b2bLeadTime || '2-4 Days'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-indigo-950 pt-1">
                  <span className="font-semibold">Supplier: <strong>{product.vendorName || 'Verified Partner Workshop'}</strong></span>
                  <a
                    href={`https://wa.me/919826011223?text=${encodeURIComponent(`Hi, I would like to inquire about B2B Wholesale / Bulk order for "${product.name}" (ID: ${product.id}). MOQ: ${product.b2bMoq || 10}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-black text-xs text-indigo-900 hover:text-indigo-700 bg-white border border-indigo-200 px-3 py-1.5 rounded-xl shadow-xs"
                  >
                    <span>💬 Inquire Bulk Order</span>
                  </a>
                </div>
              </div>
            )}

            {/* Packaging Guarantee */}
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-600">
              <ShieldCheck size={20} className="text-rose-700 flex-shrink-0" />
              <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed">
                Includes premium satin ribbons, luxury gift wrapping, custom card print & real-time SMS status updates.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
