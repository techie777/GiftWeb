'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Trash2, Plus, Minus, MapPin, ChevronRight, ChevronLeft, ShoppingBag, 
  WalletCards, BadgeIndianRupee, CreditCard, Gift, Sparkles, ShieldCheck, 
  Clock, CheckCircle, Tag, Truck, Check, AlertCircle, Phone 
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { db } from '../lib/db';

export const LUXURY_ADDONS = [
  { id: 'addon_ferrero', name: 'Ferrero Rocher Deluxe (16 Pcs)', price: 449, emoji: '🍫', img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200&auto=format&fit=crop&q=80', desc: 'Golden hazelnut artisan chocolates' },
  { id: 'addon_teddy', name: 'Artisan Hug Plush Teddy', price: 199, emoji: '🧸', img: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=200&auto=format&fit=crop&q=80', desc: 'Soft & cuddly huggable companion' },
  { id: 'addon_sparkler', name: 'Golden Sparkler Candle', price: 99, emoji: '🕯️', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&auto=format&fit=crop&q=80', desc: 'Dazzling celebration sparkler' },
  { id: 'addon_card', name: 'Gold-Embossed Keepsake Card', price: 129, emoji: '💌', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=200&auto=format&fit=crop&q=80', desc: 'Thick textured card in envelope' },
  { id: 'addon_hardbox', name: 'Luxury Satin Gift Packaging', price: 199, emoji: '🎀', img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&auto=format&fit=crop&q=80', desc: 'Rigid magnetic luxury box with ribbon' }
];

export default function Cart({ isOpen, onClose, cart, setCart, onCheckout, user, onRequireAuth }) {
  const [step, setStep] = useState('cart'); // 'cart' | 'address' | 'payment' | 'otp' | 'success'
  const [otpValue, setOtpValue] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [pendingOrderData, setPendingOrderData] = useState(null);
  const [placedOrderId, setPlacedOrderId] = useState(null);
  const [pendingProceedToAddress, setPendingProceedToAddress] = useState(false);
  const [productMap, setProductMap] = useState({});
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const scrollContainerRef = useRef(null);
  const [areas, setAreas] = useState([]);
  const [societies, setSocieties] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [settings, setSettings] = useState({ minCartValue: 0, deliveryFeeEnabled: true, deliveryFeeAmount: 30, freeDeliveryAbove: 299 });
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponCodeError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressError, setAddressError] = useState('');
  const [isCustomArea, setIsCustomArea] = useState(false);
  
  // Gifting vs Self Order toggle
  const [isGiftOrder, setIsGiftOrder] = useState(true);
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderAltPhone, setSenderAltPhone] = useState('');
  const [showAltPhoneInput, setShowAltPhoneInput] = useState(false);
  const [officialPhone, setOfficialPhone] = useState('');
  const [isEditingSenderPhone, setIsEditingSenderPhone] = useState(false);
  const [giftCardMessage, setGiftCardMessage] = useState('');
  const [isSurpriseDelivery, setIsSurpriseDelivery] = useState(true);

  // Toggle luxury add-on in cart
  const toggleAddon = (addon) => {
    const existing = cart.find(item => item.id === addon.id || item.addonId === addon.id);
    if (existing) {
      setCart(prev => prev.filter(item => item.id !== addon.id && item.addonId !== addon.id));
    } else {
      setCart(prev => [
        ...prev,
        {
          id: addon.id,
          addonId: addon.id,
          key: `${addon.id}_${Date.now()}`,
          name: addon.name,
          title: addon.name,
          price: addon.price,
          qty: 1,
          img: addon.img,
          emoji: addon.emoji,
          isAddon: true,
          deliveryDate: cart[0]?.deliveryDate || 'Today'
        }
      ]);
    }
  };

  const currentUser = user || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('giftportal_user') || 'null') : null);

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: 'Indore',
    area: '',
    society: ''
  });

  // Ensure scroll container resets to top on every step change (specifically for payment review)
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }, 40);
    return () => clearTimeout(timer);
  }, [step]);

  // Load product catalog to map item images if missing on item
  useEffect(() => {
    db.getProducts().then(prods => {
      const map = {};
      (prods || []).forEach(p => { if (p && p.id) map[String(p.id)] = p; });
      setProductMap(map);
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      setStep('cart');
      setOtpValue(['', '', '', '']);
      setOtpError('');
      setIsVerifying(false);
      setPendingOrderData(null);
      setPlacedOrderId(null);
      setPendingProceedToAddress(false);
      db.getAreas().then(setAreas);
      db.getSocieties().then(setSocieties);
      db.getCoupons().then(setCoupons);
      db.getSettings().then(setSettings);
      
      const currentUser = user || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('giftportal_user') || 'null') : null);
      if (currentUser) {
        setSenderName(currentUser.name || currentUser.username || '');
        
        // Auto-detect and resolve official / saved sender phone
        const username = currentUser.username;
        let resolvedPhone = currentUser.phone || currentUser.mobile || '';
        if (!resolvedPhone && typeof window !== 'undefined') {
          if (username) {
            resolvedPhone = localStorage.getItem(`giftportal_sender_phone_${username}`) || '';
            if (!resolvedPhone) {
              try {
                const storedUser = JSON.parse(localStorage.getItem(`user_${username}`) || 'null');
                if (storedUser?.phone) resolvedPhone = storedUser.phone;
              } catch (e) {}
            }
          }
          if (!resolvedPhone) {
            resolvedPhone = localStorage.getItem('giftportal_sender_phone') || '';
          }
        }
        const cleanPhone = (resolvedPhone || '').replace(/\D/g, '').slice(0, 10);
        if (cleanPhone) {
          setSenderPhone(cleanPhone);
          setOfficialPhone(cleanPhone);
        }

        // Auto-detect saved alternate phone
        let resolvedAlt = '';
        if (typeof window !== 'undefined') {
          if (username) resolvedAlt = localStorage.getItem(`giftportal_sender_alt_phone_${username}`) || '';
          if (!resolvedAlt) resolvedAlt = localStorage.getItem('giftportal_sender_alt_phone') || '';
        }
        const cleanAlt = (resolvedAlt || '').replace(/\D/g, '').slice(0, 10);
        if (cleanAlt) {
          setSenderAltPhone(cleanAlt);
          setShowAltPhoneInput(true);
        }

        db.getAddresses(currentUser.username).then(addrs => {
          setUserAddresses(addrs || []);
          const defaultAddr = addrs?.find(a => a.isDefault) || addrs?.[0];
          if (defaultAddr) {
            setSelectedAddressId(defaultAddr.id);
            setAddress({
              name: defaultAddr.name || '',
              phone: defaultAddr.phone || cleanPhone || '',
              street: defaultAddr.street || '',
              city: defaultAddr.city || 'Indore',
              area: defaultAddr.area || '',
              society: defaultAddr.society || ''
            });
          }
        });
      }
    }
  }, [isOpen, user]);

  // When user logs in via AuthModal while Cart is open
  useEffect(() => {
    const currentUser = user || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('giftportal_user') || 'null') : null);
    if (currentUser) {
      setSenderName(currentUser.name || currentUser.username || '');
      
      const username = currentUser.username;
      let resolvedPhone = currentUser.phone || currentUser.mobile || '';
      if (!resolvedPhone && typeof window !== 'undefined') {
        if (username) {
          resolvedPhone = localStorage.getItem(`giftportal_sender_phone_${username}`) || '';
          if (!resolvedPhone) {
            try {
              const storedUser = JSON.parse(localStorage.getItem(`user_${username}`) || 'null');
              if (storedUser?.phone) resolvedPhone = storedUser.phone;
            } catch (e) {}
          }
        }
        if (!resolvedPhone) {
          resolvedPhone = localStorage.getItem('giftportal_sender_phone') || '';
        }
      }
      const cleanPhone = (resolvedPhone || '').replace(/\D/g, '').slice(0, 10);
      if (cleanPhone) {
        setSenderPhone(cleanPhone);
        setOfficialPhone(cleanPhone);
      }

      let resolvedAlt = '';
      if (typeof window !== 'undefined') {
        if (username) resolvedAlt = localStorage.getItem(`giftportal_sender_alt_phone_${username}`) || '';
        if (!resolvedAlt) resolvedAlt = localStorage.getItem('giftportal_sender_alt_phone') || '';
      }
      const cleanAlt = (resolvedAlt || '').replace(/\D/g, '').slice(0, 10);
      if (cleanAlt) {
        setSenderAltPhone(cleanAlt);
        setShowAltPhoneInput(true);
      }

      db.getAddresses(currentUser.username).then(addrs => {
        setUserAddresses(addrs || []);
        const defaultAddr = addrs?.find(a => a.isDefault) || addrs?.[0];
        if (defaultAddr && !address.name) {
          setSelectedAddressId(defaultAddr.id);
          setAddress({
            name: defaultAddr.name || '',
            phone: defaultAddr.phone || cleanPhone || '',
            street: defaultAddr.street || '',
            city: defaultAddr.city || 'Indore',
            area: defaultAddr.area || '',
            society: defaultAddr.society || ''
          });
        }
      });
      if (pendingProceedToAddress) {
        setStep('address');
        setPendingProceedToAddress(false);
      }
    }
  }, [user, pendingProceedToAddress]);

  const handleSelectAddress = (addr) => {
    setSelectedAddressId(addr.id);
    setAddress({
      name: addr.name || '',
      phone: addr.phone || '',
      street: addr.street || '',
      city: addr.city || 'Indore',
      area: addr.area || '',
      society: addr.society || ''
    });
    setAddressError('');
  };

  const subtotal = cart.reduce((total, item) => total + (item.price + (item.slotFee || 0)) * item.qty, 0);
  const discount = appliedCoupon ? Number(appliedCoupon.discount) : 0;
  const deliveryFee = settings.deliveryFeeEnabled
    ? (subtotal >= Number(settings.freeDeliveryAbove) ? 0 : Number(settings.deliveryFeeAmount))
    : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);
  const freeShippingGap = Math.max(0, Number(settings.freeDeliveryAbove) - subtotal);

  const handleApplyCoupon = () => {
    setCouponCodeError('');
    if (!couponCode.trim()) return;
    const coupon = coupons.find(c => c.code.trim().toUpperCase() === couponCode.trim().toUpperCase() && !c.isPaused);
    if (!coupon) {
      setCouponCodeError('Invalid or expired coupon code');
      setAppliedCoupon(null);
      return;
    }
    if (subtotal < Number(coupon.minAmount)) {
      setCouponCodeError(`Min. order value for ${coupon.code} is ₹${coupon.minAmount}`);
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon(coupon);
    setCouponCodeError('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponCodeError('');
  };

  const updateQty = (key, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.key === key
            ? { ...item, qty: Math.max(0, item.qty + delta) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const handleValidateAddress = () => {
    if (isGiftOrder) {
      if (!senderName.trim()) {
        setAddressError('Please enter your name (Sender / Purchaser)');
        return false;
      }
      if (!senderPhone.trim() || senderPhone.trim().length < 10) {
        setAddressError('Please enter your valid 10-digit mobile number');
        return false;
      }
    }

    if (!address.name.trim()) {
      setAddressError(isGiftOrder ? 'Please enter the gift recipient full name' : 'Please enter your full name');
      return false;
    }
    if (!address.phone.trim() || address.phone.trim().length < 10) {
      setAddressError(isGiftOrder ? 'Please enter recipient 10-digit mobile number for delivery' : 'Please enter your 10-digit mobile number');
      return false;
    }
    if (!address.street.trim()) {
      setAddressError('Please enter street or apartment details');
      return false;
    }
    if (!address.city?.trim()) {
      setAddressError('Please enter delivery city name (e.g. Indore)');
      return false;
    }
    if (!address.area.trim()) {
      setAddressError('Please select or enter a delivery area / locality');
      return false;
    }
    setAddressError('');
    return true;
  };

  const handleFinalOrderSubmit = () => {
    if (cart.length === 0) return;
    if (!handleValidateAddress()) {
      setStep('address');
      return;
    }

    const sender = {
      name: isGiftOrder ? senderName.trim() : address.name.trim(),
      mobile: isGiftOrder ? senderPhone.trim() : address.phone.trim(),
      altMobile: isGiftOrder ? (senderAltPhone.trim() || '') : '',
      email: ''
    };

    // Persist sender mobile numbers to localStorage and user profile for future auto-prefill
    if (sender.mobile && typeof window !== 'undefined') {
      try {
        localStorage.setItem('giftportal_sender_phone', sender.mobile);
        const username = currentUser?.username;
        if (username) {
          localStorage.setItem(`giftportal_sender_phone_${username}`, sender.mobile);
          if (senderAltPhone.trim()) {
            localStorage.setItem(`giftportal_sender_alt_phone_${username}`, senderAltPhone.trim());
          }
          const rawUser = localStorage.getItem('giftportal_user');
          if (rawUser) {
            const uObj = JSON.parse(rawUser);
            uObj.phone = sender.mobile;
            localStorage.setItem('giftportal_user', JSON.stringify(uObj));
          }
          const rawNamed = localStorage.getItem(`user_${username}`);
          if (rawNamed) {
            const nObj = JSON.parse(rawNamed);
            nObj.phone = sender.mobile;
            localStorage.setItem(`user_${username}`, JSON.stringify(nObj));
          }
        }
      } catch (e) {}
    }

    const cleanCity = (address.city || 'Indore').trim();
    const isIndore = cleanCity.toLowerCase().includes('indore');
    const deliveryZone = isIndore ? 'indore' : 'other_city';
    const deliveryType = isIndore ? 'local' : 'courier';

    const recipient = {
      name: address.name.trim(),
      mobile: address.phone.trim(),
      street: address.street.trim(),
      area: address.area.trim(),
      city: cleanCity,
      state: isIndore ? 'Madhya Pradesh' : 'India',
      society: address.society.trim(),
      landmark: address.society.trim(),
      cardMessage: isGiftOrder ? giftCardMessage.trim() : '',
      deliveryDate: cart[0]?.deliveryDate || 'Today',
      deliverySlot: cart[0]?.slotLabel || (isIndore ? 'Standard Delivery' : 'Courier Dispatch'),
      isSurpriseDelivery: Boolean(isSurpriseDelivery)
    };

    const orderData = {
      isSurpriseDelivery: Boolean(isSurpriseDelivery),
      isSurprise: Boolean(isSurpriseDelivery),
      cart,
      subtotal,
      discount,
      deliveryFee,
      total,
      couponCode: appliedCoupon?.code || '',
      paymentMethod,
      orderType: isGiftOrder ? 'gift' : 'self',
      isGift: isGiftOrder,
      deliveryZone,
      isLocalDelivery: isIndore,
      deliveryType,
      sender,
      recipient,
      customerName: sender.name,
      customerMobile: sender.mobile + (sender.altMobile ? ` / ${sender.altMobile}` : ''),
      address: {
        name: recipient.name,
        phone: recipient.mobile,
        street: recipient.street,
        city: recipient.city,
        area: recipient.area,
        society: recipient.society
      },
      cardMessage: recipient.cardMessage,
      createdAt: new Date().toISOString()
    };

    // Auto-save address to "My Addresses" for the user so next time it is in the dropdown
    const currentUser = user || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('giftportal_user') || 'null') : null);
    if (currentUser?.username && recipient.street) {
      const existing = (userAddresses || []).find(a => 
        a.street?.trim().toLowerCase() === recipient.street.trim().toLowerCase() &&
        a.name?.trim().toLowerCase() === recipient.name.trim().toLowerCase()
      );
      if (!existing) {
        db.saveAddress(currentUser.username, {
          name: recipient.name,
          phone: recipient.mobile,
          street: recipient.street,
          city: recipient.city,
          area: recipient.area,
          society: recipient.society
        }).then(updatedAddrs => {
          if (Array.isArray(updatedAddrs)) {
            setUserAddresses(updatedAddrs);
          }
        }).catch(console.error);
      }
    }

    // Store order data and go to OTP step instead of directly submitting
    setPendingOrderData(orderData);
    setOtpValue(['', '', '', '']);
    setOtpError('');
    setStep('otp');
  };

  const handleProceedToDelivery = () => {
    const currentUser = user || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('giftportal_user') || 'null') : null);
    if (!currentUser) {
      setPendingProceedToAddress(true);
      if (onRequireAuth) {
        onRequireAuth();
      }
      return;
    }
    setStep('address');
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otpValue.join('');
    if (enteredOtp.length < 4) {
      setOtpError('Please enter the 4-digit OTP sent to your mobile.');
      return;
    }
    setIsVerifying(true);
    setOtpError('');
    // Simulate OTP verification delay
    await new Promise(r => setTimeout(r, 1000));
    setIsVerifying(false);
    
    // Place the actual order
    if (pendingOrderData) {
      try {
        const savedOrder = await onCheckout(pendingOrderData, true); // pass flag to skip auto-navigate
        setPlacedOrderId(savedOrder?.id || Date.now());
      } catch (err) {
        console.error('Order checkout error:', err);
        setPlacedOrderId(Date.now());
      }
    } else {
      setPlacedOrderId(Date.now());
    }
    setStep('success');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[400] overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Right-Side Dialogue / Slide-Over Sheet */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="absolute inset-y-0 right-0 w-full sm:max-w-md md:max-w-lg bg-white shadow-[-24px_0_60px_rgba(0,0,0,0.3)] flex flex-col border-l border-rose-100/80 font-sans z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 md:p-6 border-b border-rose-100/80 bg-gradient-to-r from-rose-50/70 to-amber-50/40 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {step !== 'cart' && step !== 'success' && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setStep(step === 'payment' ? 'address' : step === 'otp' ? 'payment' : 'cart')}
                      className="p-2 rounded-xl bg-white text-slate-700 hover:text-rose-700 shadow-sm border border-rose-100 transition-colors"
                      aria-label="Back to previous step"
                    >
                      <ChevronLeft size={18} />
                    </motion.button>
                  )}
                  <div>
                    <h3 className="font-serif font-extrabold text-xl md:text-2xl text-slate-900 tracking-tight leading-none">
                      {step === 'cart' && 'Your Gift Box'}
                      {step === 'address' && 'Delivery Destination'}
                      {step === 'payment' && 'Payment & Review'}
                      {step === 'otp' && 'Order Verification'}
                      {step === 'success' && 'Order Confirmed! 🎉'}
                    </h3>
                    {step !== 'success' && step !== 'otp' ? (
                      <p className="text-[10px] font-black text-rose-700 uppercase tracking-widest mt-1 flex items-center gap-1">
                        <Gift size={11} /> {cart.length} unique gift package{cart.length === 1 ? '' : 's'}
                      </p>
                    ) : step === 'success' ? (
                      <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mt-1 flex items-center gap-1">
                        <CheckCircle size={11} /> Live Order Tracking Active
                      </p>
                    ) : (
                      <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mt-1 flex items-center gap-1">
                        <Clock size={11} /> Final Step: SMS OTP
                      </p>
                    )}
                  </div>
                </div>

                <motion.button 
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose} 
                  className="p-2.5 bg-white rounded-2xl shadow-sm border border-rose-100 text-slate-400 hover:text-rose-700 transition-colors"
                  aria-label="Close cart"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Step indicator bar */}
              {cart.length > 0 && step !== 'otp' && step !== 'success' && (
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider">
                  {/* Step 1: Bag */}
                  <span className={`px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    step === 'cart' 
                      ? 'bg-rose-700 text-white shadow-sm' 
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {step !== 'cart' && <Check size={10} className="text-emerald-600" />}
                    1. Bag
                  </span>
                  <ChevronRight size={12} className="text-slate-400" />
                  {/* Step 2: Address */}
                  <span className={`px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    step === 'address' 
                      ? 'bg-rose-700 text-white shadow-sm' 
                      : step === 'payment'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                  }`}>
                    {step === 'payment' && <Check size={10} className="text-emerald-600" />}
                    2. Address
                  </span>
                  <ChevronRight size={12} className="text-slate-400" />
                  {/* Step 3: Payment */}
                  <span className={`px-2.5 py-1 rounded-full ${
                    step === 'payment' ? 'bg-rose-700 text-white shadow-sm' : 'bg-rose-100 text-rose-800'
                  }`}>
                    3. Payment
                  </span>
                </div>
              )}
            </div>

            {/* Scrollable Content Body */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5 no-scrollbar">
              
              {/* EMPTY STATE - only when not in success or otp step */}
              {cart.length === 0 && step !== 'success' && step !== 'otp' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-5 py-16">
                  <div className="w-24 h-24 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-400 shadow-inner border border-rose-100">
                    <ShoppingBag size={40} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-serif font-bold text-xl text-slate-900">Your gift box is empty</p>
                    <p className="text-xs font-semibold text-slate-400">Discover handcrafted flowers, gourmet hampers & luxury surprises.</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="bg-rose-700 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-900/20"
                  >
                    Explore Curated Gifts
                  </motion.button>
                </div>
              ) : (
                <>
                  {/* STEP 1: CART ITEMS */}
                  {step === 'cart' && (
                    <div className="space-y-4">
                      {/* Free delivery milestone */}
                      {settings.deliveryFeeEnabled && (
                        <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3.5 flex items-center gap-3">
                          <Truck size={18} className="text-amber-600 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-amber-950">
                              {freeShippingGap > 0 
                                ? `Add ₹${freeShippingGap} more for FREE Express Delivery!` 
                                : '🎉 You unlocked FREE Express Delivery on this order!'}
                            </p>
                            <div className="w-full bg-amber-200/60 h-1.5 rounded-full mt-1.5 overflow-hidden">
                              <div 
                                className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                                style={{ width: `${Math.min(100, (subtotal / Number(settings.freeDeliveryAbove)) * 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Guaranteed Same-Day Delivery Urgency Strip */}
                      <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-300 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-2 text-xs text-amber-950 font-bold shadow-2xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0" />
                          <span className="truncate">
                            ⚡ Order in next <strong>38 mins</strong> for Guaranteed Same-Day Delivery!
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-amber-600 text-white font-black text-[9px] uppercase tracking-wider shrink-0 shadow-xs">
                          Indore Express
                        </span>
                      </div>

                      {/* Items List */}
                      <div className="space-y-3">
                        {cart.map((item) => (
                          <motion.div 
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            key={item.key} 
                            className="p-4 bg-slate-50/70 rounded-3xl border border-slate-200/80 hover:border-rose-200 transition-all shadow-sm space-y-3"
                          >
                            <div className="flex items-start gap-3.5">
                              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-200/60 shrink-0 overflow-hidden relative">
                                {(() => {
                                  const imgUrl = item.personalization?.photoUrl || item.img || item.image || productMap[String(item.id)]?.img;
                                  if (imgUrl) {
                                    return <img src={imgUrl} alt={item.name} className="w-full h-full object-cover" />;
                                  }
                                  return <span className="text-3xl">{item.emoji || '🎁'}</span>;
                                })()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-serif font-bold text-slate-900 text-sm tracking-tight truncate">{item.name}</h4>
                                <p className="text-[10px] font-bold text-rose-700 uppercase tracking-wider mt-0.5">{item.variantLabel}</p>
                                
                                <div className="flex items-center justify-between mt-2">
                                  <div>
                                    <span className="text-base font-extrabold text-slate-900 tracking-tight">
                                      ₹{(item.price + (item.slotFee || 0)) * item.qty}
                                    </span>
                                    {item.slotFee > 0 && (
                                      <span className="text-[9px] text-amber-700 ml-1.5 font-bold">(+₹{item.slotFee * item.qty} slot)</span>
                                    )}
                                  </div>

                                  {/* Qty Controls */}
                                  <div className="flex items-center bg-white rounded-xl border border-slate-200 p-0.5 shadow-sm">
                                    <button 
                                      onClick={() => updateQty(item.key, -1)} 
                                      className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-rose-700 transition-colors"
                                      aria-label="Decrease quantity"
                                    >
                                      {item.qty === 1 ? <Trash2 size={12} className="text-rose-600" /> : <Minus size={12} />}
                                    </button>
                                    <span className="w-6 text-center text-xs font-black text-slate-800">{item.qty}</span>
                                    <button 
                                      onClick={() => updateQty(item.key, 1)} 
                                      className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-rose-700 transition-colors"
                                      aria-label="Increase quantity"
                                    >
                                      <Plus size={12} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Delivery & Personalization Chips */}
                            {(item.pincode || item.slotLabel || item.personalization?.customName || item.personalization?.cardMessage) && (
                              <div className="bg-white rounded-2xl p-2.5 border border-slate-200/70 space-y-1 text-[10px] font-bold text-slate-600">
                                {item.pincode && (
                                  <div className="flex items-center gap-1.5 text-rose-800">
                                    <MapPin size={11} className="text-rose-600 shrink-0" />
                                    <span>Deliver to <strong>{item.pincode} ({item.city || 'Metro'})</strong> · {item.deliveryDate || 'Today'}</span>
                                  </div>
                                )}
                                {item.slotLabel && (
                                  <div className="flex items-center gap-1.5 text-amber-900">
                                    <Clock size={11} className="text-amber-600 shrink-0" />
                                    <span>Slot: <strong>{item.slotLabel}</strong></span>
                                  </div>
                                )}
                                {item.personalization?.customName && (
                                  <div className="text-slate-700 truncate">
                                    <span>✏️ Engraved: <strong>"{item.personalization.customName}"</strong></span>
                                  </div>
                                )}
                                {item.personalization?.cardMessage && (
                                  <div className="text-slate-700 line-clamp-1 italic">
                                    <span>💌 Card: "{item.personalization.cardMessage}"</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>

                      {/* LUXURY GIFTING ADD-ONS TRAY (AOV MULTIPLIER) */}
                      <div className="bg-gradient-to-br from-rose-50/70 via-pink-50/40 to-amber-50/50 p-4 rounded-3xl border border-rose-200/80 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-slate-900">
                            <Sparkles size={15} className="text-rose-600" />
                            <h4 className="text-xs font-black uppercase tracking-wider">
                              Make It Extra Special ✨
                            </h4>
                          </div>
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-full">
                            Popular Add-Ons
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Frequently paired together for the perfect unboxing experience:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {LUXURY_ADDONS.map((addon) => {
                            const isAdded = cart.some(item => item.id === addon.id || item.addonId === addon.id);
                            return (
                              <div
                                key={addon.id}
                                className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all ${
                                  isAdded
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
                                    : 'bg-white border-slate-200/80 hover:border-rose-300 text-slate-800'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 flex items-center justify-center text-lg">
                                    <img src={addon.img} alt={addon.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-black truncate">{addon.name}</p>
                                    <p className="text-[11px] font-mono font-bold text-slate-700">₹{addon.price}</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => toggleAddon(addon)}
                                  className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                                    isAdded
                                      ? 'bg-emerald-600 text-white hover:bg-rose-600'
                                      : 'bg-slate-900 text-white hover:bg-rose-700 shadow-2xs'
                                  }`}
                                >
                                  {isAdded ? '✓ Added' : '+ Add'}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Coupon Section */}
                      <div className="bg-rose-50/50 rounded-2xl p-3.5 border border-rose-100 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 flex items-center gap-1.5">
                            <Tag size={12} className="text-rose-700" /> Apply Luxury Coupon
                          </label>
                          {appliedCoupon && (
                            <button
                              onClick={handleRemoveCoupon}
                              className="text-[10px] font-bold text-rose-600 hover:underline uppercase tracking-wider"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        {appliedCoupon ? (
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold">
                            <span className="flex items-center gap-1.5">
                              <Check size={14} className="text-emerald-600" />
                              <strong>{appliedCoupon.code}</strong> applied (-₹{appliedCoupon.discount})
                            </span>
                            <span className="text-[10px] bg-emerald-200/80 px-2 py-0.5 rounded-full font-extrabold text-emerald-900">SAVINGS</span>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                              placeholder="Enter coupon (e.g. LUXE50)"
                              className="flex-1 bg-white border border-rose-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 uppercase placeholder:normal-case outline-none focus:border-rose-600"
                            />
                            <button
                              onClick={handleApplyCoupon}
                              className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-rose-800 transition-colors"
                            >
                              Apply
                            </button>
                          </div>
                        )}

                        {couponError && (
                          <p className="text-[10px] font-bold text-rose-600">{couponError}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: DELIVERY ADDRESS & ORDER CLASSIFICATION */}
                  {step === 'address' && (
                    <div className="space-y-5">
                      {/* Gifting vs Self-Order Toggle */}
                      <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1.5 border border-slate-200 shadow-inner">
                        <button
                          type="button"
                          onClick={() => setIsGiftOrder(true)}
                          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            isGiftOrder 
                              ? 'bg-gradient-to-r from-rose-700 to-rose-800 text-white shadow-md' 
                              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                          }`}
                        >
                          <Gift size={14} className={isGiftOrder ? 'text-amber-300' : 'text-rose-600'} />
                          <span>🎁 Gifting for Others</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsGiftOrder(false)}
                          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            !isGiftOrder 
                              ? 'bg-slate-900 text-white shadow-md' 
                              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                          }`}
                        >
                          <ShoppingBag size={14} className={!isGiftOrder ? 'text-amber-400' : 'text-slate-500'} />
                          <span>🛍️ For Myself</span>
                        </button>
                      </div>

                      {/* Saved Addresses Dropdown Selection */}
                      {userAddresses.length > 0 && (
                        <div className="bg-gradient-to-r from-rose-50/80 to-amber-50/50 p-3.5 rounded-2xl border-2 border-rose-200/80 space-y-1.5 shadow-2xs">
                          <label className="text-[11px] font-black uppercase tracking-wider text-rose-950 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <MapPin size={13} className="text-rose-600" /> Choose Saved Address
                            </span>
                            <span className="text-[9px] font-bold text-rose-700 bg-white px-2 py-0.5 rounded-full border border-rose-200 shadow-2xs">
                              {userAddresses.length} saved
                            </span>
                          </label>
                          <select
                            value={selectedAddressId || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === 'new') {
                                setSelectedAddressId('new');
                                setAddress({ name: '', phone: '', street: '', city: 'Indore', area: '', society: '' });
                                setIsCustomArea(false);
                              } else if (val) {
                                const found = userAddresses.find(a => String(a.id) === String(val));
                                if (found) handleSelectAddress(found);
                              }
                            }}
                            className="w-full bg-white border-2 border-rose-300 hover:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 shadow-xs cursor-pointer transition-all"
                          >
                            <option value="">-- Select a saved destination --</option>
                            {userAddresses.map((addr) => (
                              <option key={addr.id} value={addr.id}>
                                📍 {addr.name} ({addr.phone}) • {addr.street}, {addr.area}
                              </option>
                            ))}
                            <option value="new">➕ Enter a New Address</option>
                          </select>
                        </div>
                      )}

                      {/* Sender Details if Gifting */}
                      {isGiftOrder && (
                        <div className="bg-purple-50/70 p-4 rounded-2xl border-2 border-purple-200/80 space-y-3.5 shadow-2xs">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-purple-950">
                              <Sparkles size={14} className="text-purple-600" />
                              <h4 className="text-[11px] font-black uppercase tracking-wider">
                                Sender Information (You)
                              </h4>
                            </div>
                            <span className="text-[9px] font-bold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-full border border-purple-200/60">
                              Auto-Saved For Next Time
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-700 uppercase block">Your Full Name</label>
                              <input
                                type="text"
                                value={senderName}
                                onChange={(e) => setSenderName(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full bg-white border-2 border-slate-300 hover:border-purple-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 outline-none shadow-xs transition-all"
                              />
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center justify-between flex-wrap gap-1">
                                <label className="text-[10px] font-bold text-slate-700 uppercase flex items-center gap-1.5">
                                  <span>Your Mobile Number</span>
                                  {senderPhone && officialPhone && senderPhone === officialPhone && (
                                    <span className="text-[8.5px] font-black uppercase text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded border border-emerald-300 inline-flex items-center gap-1">
                                      <Check size={9} className="stroke-[3]" />
                                      <span>Official Sign-up No. (Default)</span>
                                    </span>
                                  )}
                                </label>
                                {senderPhone && (
                                  <button
                                    type="button"
                                    onClick={() => setIsEditingSenderPhone(!isEditingSenderPhone)}
                                    className="text-[9.5px] font-bold text-purple-700 hover:text-purple-900 hover:underline cursor-pointer"
                                  >
                                    {isEditingSenderPhone ? 'Lock / Done' : 'Change Number'}
                                  </button>
                                )}
                              </div>
                              <div className="relative">
                                <input
                                  type="tel"
                                  maxLength={10}
                                  value={senderPhone}
                                  onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    setSenderPhone(val);
                                    try {
                                      localStorage.setItem('giftportal_sender_phone', val);
                                      const u = currentUser?.username;
                                      if (u) {
                                        localStorage.setItem(`giftportal_sender_phone_${u}`, val);
                                      }
                                    } catch (err) {}
                                  }}
                                  placeholder="10-digit mobile number"
                                  className={`w-full bg-white border-2 ${
                                    senderPhone && officialPhone && senderPhone === officialPhone && !isEditingSenderPhone
                                      ? 'border-emerald-300 focus:border-emerald-600 focus:ring-emerald-500/20'
                                      : 'border-slate-300 hover:border-purple-300 focus:border-purple-600 focus:ring-purple-500/20'
                                  } rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none shadow-xs transition-all`}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Option to add 1 more optional alternate contact number */}
                          <div className="pt-0.5">
                            {!showAltPhoneInput && !senderAltPhone ? (
                              <button
                                type="button"
                                onClick={() => setShowAltPhoneInput(true)}
                                className="text-[10.5px] font-bold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1.5 hover:underline cursor-pointer transition-colors"
                              >
                                <Plus size={12} className="stroke-[3]" />
                                <span>Add 1 More Number (Optional Field)</span>
                              </button>
                            ) : (
                              <div className="p-3 bg-white/95 rounded-xl border border-purple-200/90 space-y-1.5 shadow-2xs animate-in fade-in duration-200">
                                <div className="flex items-center justify-between">
                                  <label className="text-[10px] font-bold text-slate-700 uppercase flex items-center gap-1.5">
                                    <Phone size={10} className="text-purple-600 shrink-0" />
                                    <span>Alternate / Secondary Mobile (Optional)</span>
                                  </label>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setShowAltPhoneInput(false);
                                      setSenderAltPhone('');
                                      try {
                                        localStorage.removeItem('giftportal_sender_alt_phone');
                                        const u = currentUser?.username;
                                        if (u) localStorage.removeItem(`giftportal_sender_alt_phone_${u}`);
                                      } catch (err) {}
                                    }}
                                    className="text-[9.5px] font-bold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer"
                                  >
                                    Remove
                                  </button>
                                </div>
                                <input
                                  type="tel"
                                  maxLength={10}
                                  value={senderAltPhone}
                                  onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    setSenderAltPhone(val);
                                    try {
                                      localStorage.setItem('giftportal_sender_alt_phone', val);
                                      const u = currentUser?.username;
                                      if (u) localStorage.setItem(`giftportal_sender_alt_phone_${u}`, val);
                                    } catch (err) {}
                                  }}
                                  placeholder="Optional 10-digit backup mobile number"
                                  className="w-full bg-slate-50 border border-slate-200 hover:border-purple-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:border-purple-600 focus:bg-white outline-none transition-all"
                                />
                                <p className="text-[9.5px] text-slate-500 font-medium">
                                  Default official sign-up number ({senderPhone || 'primary'}) remains selected by default for OTP and notifications.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Destination / Recipient Details */}
                      <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-200/90 shadow-xs space-y-3.5">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <label className="text-[11px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                            <MapPin size={13} className="text-rose-600" />
                            <span>{isGiftOrder ? 'Recipient & Delivery Destination' : 'Your Delivery Address'}</span>
                          </label>
                          <span className="text-[9px] font-bold text-slate-400 uppercase">Required Fields *</span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-700 uppercase block">
                              {isGiftOrder ? 'Recipient Full Name *' : 'Full Name *'}
                            </label>
                            <input
                              type="text"
                              value={address.name}
                              onChange={(e) => setAddress({ ...address, name: e.target.value })}
                              placeholder={isGiftOrder ? 'e.g. Ananya Roy' : 'Your Full Name'}
                              className="w-full bg-white border-2 border-slate-300 hover:border-slate-400 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 outline-none shadow-xs transition-all"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-700 uppercase block">
                              {isGiftOrder ? 'Recipient Mobile (For OTP) *' : 'Mobile Number *'}
                            </label>
                            <input
                              type="tel"
                              maxLength={10}
                              value={address.phone}
                              onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, '') })}
                              placeholder="10-digit mobile number"
                              className="w-full bg-white border-2 border-slate-300 hover:border-slate-400 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 outline-none shadow-xs transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-700 uppercase block">House / Flat / Street Address *</label>
                          <textarea
                            rows={2}
                            value={address.street}
                            onChange={(e) => setAddress({ ...address, street: e.target.value })}
                            placeholder="Flat/House number, building name, street, landmark"
                            className="w-full bg-white border-2 border-slate-300 hover:border-slate-400 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 outline-none shadow-xs transition-all resize-none"
                          />
                        </div>

                        {/* City, Area and Society Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* City Name Input with user edit ability */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <label className="text-[10px] font-bold text-slate-700 uppercase block">City *</label>
                              <span className="text-[9px] font-bold text-rose-700">Hub: Indore</span>
                            </div>
                            <input
                              type="text"
                              value={address.city !== undefined ? address.city : 'Indore'}
                              onChange={(e) => setAddress({ ...address, city: e.target.value })}
                              placeholder="Enter City name (e.g. Indore)"
                              className="w-full bg-white border-2 border-slate-300 hover:border-slate-400 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 outline-none shadow-xs transition-all"
                            />
                          </div>

                          {/* Area / Locality */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <label className="text-[10px] font-bold text-slate-700 uppercase block">Area / Locality *</label>
                              <button
                                type="button"
                                onClick={() => setIsCustomArea(!isCustomArea)}
                                className="text-[9px] font-bold text-rose-700 hover:underline cursor-pointer"
                              >
                                {isCustomArea ? 'Select from list' : '+ Type custom area'}
                              </button>
                            </div>
                            {isCustomArea || areas.length === 0 ? (
                              <input
                                type="text"
                                value={address.area}
                                onChange={(e) => setAddress({ ...address, area: e.target.value })}
                                placeholder="Enter Area / Locality (e.g. Vijay Nagar)"
                                className="w-full bg-white border-2 border-slate-300 hover:border-slate-400 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 outline-none shadow-xs transition-all"
                              />
                            ) : (
                              <select
                                value={address.area}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (val === '__custom__') {
                                    setIsCustomArea(true);
                                    setAddress({ ...address, area: '' });
                                  } else {
                                    setAddress({ ...address, area: val });
                                  }
                                }}
                                className="w-full bg-white border-2 border-slate-300 hover:border-slate-400 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 outline-none shadow-xs transition-all cursor-pointer"
                              >
                                <option value="">Select Delivery Area</option>
                                {areas.map((a, idx) => {
                                  const areaVal = a.area || a.name || '';
                                  const areaLabel = a.city ? `${a.city} • ${areaVal}` : areaVal;
                                  return (
                                    <option key={a.id || `${areaVal}-${idx}`} value={areaVal}>
                                      {areaLabel}
                                    </option>
                                  );
                                })}
                                <option value="__custom__">➕ Other / Enter Custom Area...</option>
                              </select>
                            )}
                          </div>
                        </div>

                        {/* Dynamic Delivery Logistics Mode Banner */}
                        {(() => {
                          const currentCity = (address.city || 'Indore').trim();
                          const isIndore = currentCity.toLowerCase().includes('indore');

                          return (
                            <div className={`p-3.5 rounded-2xl border text-xs flex items-start gap-3 transition-all ${
                              isIndore
                                ? 'bg-emerald-50/90 border-emerald-200/90 text-emerald-950 shadow-2xs'
                                : 'bg-indigo-50/90 border-indigo-200/90 text-indigo-950 shadow-2xs'
                            }`}>
                              <div className={`p-2 rounded-xl shrink-0 ${isIndore ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white'}`}>
                                {isIndore ? <Truck size={16} /> : <Gift size={16} />}
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-black uppercase tracking-wider text-[11px]">
                                    {isIndore ? '⚡ Indore Local Express Delivery' : `📦 Domestic Courier Shipment to ${currentCity || 'Other City'}`}
                                  </span>
                                  <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full ${isIndore ? 'bg-emerald-200/70 text-emerald-900 border border-emerald-300' : 'bg-indigo-200/70 text-indigo-900 border border-indigo-300'}`}>
                                    {isIndore ? '1-2 Days (90% Same-Day)' : 'Shipped via Courier'}
                                  </span>
                                </div>
                                <p className="text-[11px] leading-relaxed text-slate-600 font-medium">
                                  {isIndore
                                    ? 'Personally delivered to doorstep by our concierge or local delivery partner (Ola / Uber / Rapido). Most Indore orders deliver same-day!'
                                    : `Your gift will be packed by our partner workshop and dispatched via premier courier partner with live tracking ID provided upon dispatch.`}
                                </p>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Complimentary Gift Card Message if Gifting */}
                        {isGiftOrder && (
                          <div className="space-y-1 pt-1">
                            <label className="text-[10px] font-bold text-purple-800 uppercase flex items-center gap-1">
                              <span>💌 Complimentary Handwritten Greeting Card Note</span>
                            </label>
                            <textarea
                              rows={2}
                              value={giftCardMessage}
                              onChange={(e) => setGiftCardMessage(e.target.value)}
                              placeholder="Wishing you a wonderful birthday / congratulations! With love..."
                              className="w-full bg-purple-50/50 border-2 border-purple-200 hover:border-purple-300 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 outline-none shadow-xs transition-all resize-none"
                            />
                          </div>
                        )}

                        {/* 100% SECRET SURPRISE DELIVERY (STEALTH MODE) TOGGLE */}
                        {isGiftOrder && (
                          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50/60 to-purple-50 border-2 border-purple-300/90 flex items-start gap-3 shadow-2xs">
                            <input
                              type="checkbox"
                              id="stealth-surprise-checkbox"
                              checked={isSurpriseDelivery}
                              onChange={(e) => setIsSurpriseDelivery(e.target.checked)}
                              className="mt-1 w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-purple-300 cursor-pointer"
                            />
                            <label htmlFor="stealth-surprise-checkbox" className="cursor-pointer space-y-0.5">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-black text-purple-950 flex items-center gap-1">
                                  🤫 Keep it a 100% Secret Surprise
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white font-black text-[9px] uppercase tracking-wider">
                                  Stealth Delivery
                                </span>
                              </div>
                              <p className="text-[11px] text-purple-800 font-medium leading-relaxed">
                                Our delivery driver will <strong>NOT call the recipient beforehand</strong> or reveal sender identity/contents until handed over directly at the doorstep!
                              </p>
                            </label>
                          </div>
                        )}

                        {addressError && (
                          <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2.5 rounded-xl border-2 border-rose-300 flex items-center gap-1.5 animate-shake">
                            <AlertCircle size={14} /> {addressError}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: PAYMENT & CONFIRMATION */}
                  {step === 'payment' && (
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 block">
                          Select Payment Method
                        </label>
                        
                        <div className="space-y-2">
                          {[
                            { id: 'UPI', name: 'Instant UPI (Google Pay, PhonePe, Paytm)', desc: 'Zero transaction fee, instant receipt', icon: WalletCards, badge: 'RECOMMENDED' },
                            { id: 'Card', name: 'Credit / Debit Card / NetBanking', desc: 'Visa, MasterCard, Amex & RuPay', icon: CreditCard },
                            { id: 'COD', name: 'Cash on Delivery (Pay at Doorstep)', desc: 'Pay cash or scan QR upon gift delivery', icon: BadgeIndianRupee }
                          ].map((pm) => {
                            const isSelected = paymentMethod === pm.id;
                            return (
                              <div
                                key={pm.id}
                                onClick={() => setPaymentMethod(pm.id)}
                                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                                  isSelected 
                                    ? 'border-rose-600 bg-rose-50/70 shadow-sm' 
                                    : 'border-slate-200 bg-white hover:border-slate-300'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-rose-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                    <pm.icon size={18} />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="text-xs font-bold text-slate-900">{pm.name}</p>
                                      {pm.badge && (
                                        <span className="text-[8px] bg-amber-400 text-slate-950 font-extrabold px-1.5 py-0.5 rounded">
                                          {pm.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-medium">{pm.desc}</p>
                                  </div>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-rose-600 bg-rose-600' : 'border-slate-300'}`}>
                                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Recipient summary recap */}
                      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Delivering To:</p>
                        <p className="font-bold text-slate-900">{address.name} · {address.phone}</p>
                        <p className="text-slate-600 text-[11px] line-clamp-1">{address.street}, {address.area}{address.city ? `, ${address.city}` : ''}</p>
                      </div>

                      {/* Trust guarantee banner */}
                      <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-200/80 flex items-center gap-2.5 text-emerald-900 text-xs">
                        <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                        <span className="font-semibold text-[11px]">100% Satisfaction & Replacement Guarantee on all luxury deliveries.</span>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: OTP VERIFICATION */}
                  {step === 'otp' && (
                    <div className="flex flex-col items-center justify-center py-8 space-y-6">
                      {/* Icon */}
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 flex items-center justify-center text-4xl shadow-md">
                        📱
                      </div>
                      <div className="text-center space-y-2 max-w-xs">
                        <h3 className="font-serif font-bold text-xl text-slate-900">Verify Your Order</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          A 4-digit OTP has been sent to your registered mobile number ending in <strong>**{(address.phone || senderPhone || '').slice(-2)}</strong>. Enter it below to confirm your order.
                        </p>
                        <p className="text-[10px] text-rose-700 font-bold bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100 inline-block">
                          💡 Demo: Enter any 4 digits to proceed
                        </p>
                      </div>

                      {/* 4-box OTP input */}
                      <div className="flex items-center gap-3">
                        {otpValue.map((digit, idx) => (
                          <input
                            key={idx}
                            ref={otpRefs[idx]}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              const newOtp = [...otpValue];
                              newOtp[idx] = val;
                              setOtpValue(newOtp);
                              setOtpError('');
                              if (val && idx < 3) otpRefs[idx + 1].current?.focus();
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Backspace' && !otpValue[idx] && idx > 0) {
                                otpRefs[idx - 1].current?.focus();
                              }
                            }}
                            className={`w-14 h-16 text-center text-2xl font-extrabold border-2 rounded-2xl outline-none transition-all ${
                              otpError
                                ? 'border-rose-500 bg-rose-50 text-rose-700'
                                : digit
                                  ? 'border-rose-600 bg-rose-50/70 text-slate-900'
                                  : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-rose-400'
                            }`}
                          />
                        ))}
                      </div>

                      {otpError && (
                        <p className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                          <AlertCircle size={14} /> {otpError}
                        </p>
                      )}

                      {/* Verify button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleVerifyOtp}
                        disabled={isVerifying || otpValue.join('').length < 4}
                        className="w-full max-w-xs bg-gradient-to-r from-emerald-700 to-emerald-600 disabled:from-slate-300 disabled:to-slate-300 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed"
                      >
                        {isVerifying ? (
                          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Verifying OTP...</>
                        ) : (
                          <><ShieldCheck size={16} /> Confirm & Place Order</>
                        )}
                      </motion.button>

                      <button
                        onClick={() => { setStep('payment'); setOtpValue(['','','','']); setOtpError(''); }}
                        className="text-[11px] text-slate-400 font-semibold hover:text-slate-600 underline underline-offset-2 cursor-pointer"
                      >
                        ← Back to Payment
                      </button>
                    </div>
                  )}

                  {/* STEP 5: SUCCESS CONFIRMATION */}
                  {step === 'success' && (
                    <div className="flex flex-col items-center justify-center py-8 space-y-6 text-center">
                      {/* Animated tick */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-500/30"
                      >
                        <Check size={48} className="text-white" strokeWidth={3} />
                      </motion.div>

                      <div className="space-y-2">
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="font-serif font-bold text-2xl text-slate-900"
                        >
                          Order Confirmed! 🎉
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.45 }}
                          className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto"
                        >
                          Your luxury gift is being prepared with love. Express delivery is on its way!
                        </motion.p>
                        {placedOrderId && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-[10px] font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100 inline-block"
                          >
                            Order ID: #{String(placedOrderId).slice(-6).toUpperCase()}
                          </motion.p>
                        )}
                      </div>

                      {/* Action buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="w-full space-y-3 max-w-xs"
                      >
                        <button
                          onClick={() => {
                            onClose();
                            if (typeof window !== 'undefined') {
                              window.location.href = '/';
                            }
                          }}
                          className="w-full bg-gradient-to-r from-rose-800 to-rose-700 text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg cursor-pointer hover:from-rose-900 hover:to-rose-800 transition-all flex items-center justify-center gap-2"
                        >
                          🏠 Return to Home
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            if (typeof window !== 'undefined') {
                              window.location.href = '/?tab=orders&view=orders';
                            }
                          }}
                          className="w-full border-2 border-slate-200 bg-white text-slate-800 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest cursor-pointer hover:border-slate-400 transition-all flex items-center justify-center gap-2"
                        >
                          📦 View Order Summary
                        </button>
                      </motion.div>
                    </div>
                  )}

                  {/* IN-SCROLL DETAILED PRICE BREAKDOWN (User scrolls to see full breakdown) */}
                  {step !== 'success' && step !== 'otp' && (
                    <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/90 space-y-2.5 mt-4">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Order Price Breakdown</p>
                        <span className="text-[9px] font-bold text-slate-400">All Taxes Included</span>
                      </div>
                      <div className="space-y-1.5 text-xs font-bold">
                        <div className="flex justify-between text-slate-600">
                          <span>Items Subtotal</span>
                          <span className="text-slate-900">₹{subtotal}</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-emerald-600">
                            <span>Promotional Discount</span>
                            <span>-₹{discount}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-slate-600">
                          <span>Express Delivery Fee</span>
                          <span className={deliveryFee === 0 ? 'text-emerald-700 font-extrabold' : 'text-slate-900'}>
                            {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-slate-200/80 flex justify-between items-baseline">
                          <div>
                            <span className="font-serif font-extrabold text-sm text-slate-900 tracking-tight">Total Amount</span>
                            <p className="text-[9px] text-slate-400 font-medium">Inclusive of signature packaging</p>
                          </div>
                          <span className="font-serif font-extrabold text-xl text-rose-700 tracking-tight">₹{total}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

            </div>

            {/* COMPACT FLOATING ACTION BAR — only ~60px, never squashes inputs */}
            {step !== 'otp' && step !== 'success' && cart.length > 0 && (
              <div className="p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t border-rose-100 flex items-center justify-between gap-3 shrink-0 shadow-lg">
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">Payable Amount</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif font-extrabold text-2xl text-rose-700 leading-none">₹{total}</span>
                    <span className="text-[9px] font-bold text-emerald-700">
                      {deliveryFee === 0 ? '· Free Delivery' : ''}
                    </span>
                  </div>
                </div>

                <div className="flex-1 max-w-[220px] sm:max-w-xs">
                  {step === 'cart' && (
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleProceedToDelivery}
                      className="w-full bg-gradient-to-r from-rose-800 via-rose-700 to-rose-900 hover:from-rose-900 text-white py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 border border-rose-600/30 cursor-pointer"
                    >
                      <span className="truncate">{!user && (typeof window !== 'undefined' && !localStorage.getItem('giftportal_user')) ? 'Sign In & Proceed' : 'Proceed to Delivery'}</span>
                      <ChevronRight size={14} className="shrink-0" />
                    </motion.button>
                  )}

                  {step === 'address' && (
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (handleValidateAddress()) {
                          setStep('payment');
                          if (scrollContainerRef.current) {
                            scrollContainerRef.current.scrollTop = 0;
                          }
                        }
                      }}
                      className="w-full bg-gradient-to-r from-rose-800 via-rose-700 to-rose-900 hover:from-rose-900 text-white py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 border border-rose-600/30 cursor-pointer"
                    >
                      <span>Payment Review</span>
                      <ChevronRight size={14} className="shrink-0" />
                    </motion.button>
                  )}

                  {step === 'payment' && (
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleFinalOrderSubmit}
                      className="w-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-800 hover:from-emerald-800 text-white py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 border border-emerald-500/30 cursor-pointer"
                    >
                      <Gift size={14} className="text-amber-300 shrink-0" />
                      <span>Place Order</span>
                    </motion.button>
                  )}
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
