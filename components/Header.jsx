'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, User, LogOut, ChevronDown, ChevronRight, MapPin, 
  Package, Heart, UserCircle, Gift, Sparkles, Phone, ShieldCheck, 
  Menu, X, LifeBuoy, Search, SlidersHorizontal, Store
} from 'lucide-react';

const TICKERS = [
  '✨ EXPRESS GIFTING · Same-Day & 2-Hour Delivery in 100+ Metro Cities',
  '🌹 HANDCRAFTED LUXURY · Hand-tied Bouquets & Artisan Gourmet Hampers',
  '🌙 MIDNIGHT SURPRISE · Deliver exact at 12:00 AM with Live Photo SMS',
  '🔒 GUARANTEED FRESHNESS · 100% On-Time Delivery & Quality Replacement Guarantee',
];

const MOBILE_CATEGORIES = [
  { id: 'same-day', title: 'Same Day Delivery', subtitle: '⚡ Express in 120 Mins', icon: '🛵' },
  { id: 'cakes', title: 'Cakes & Bakes', subtitle: '🎂 Fresh Handcrafted', icon: '🎂' },
  { id: 'flowers', title: 'Flowers & Blooms', subtitle: '🌹 Fresh Dutch Roses', icon: '💐' },
  { id: 'personalized', title: 'Personalized Gifts', subtitle: '✨ Photo & Engraving', icon: '🖼️' },
  { id: 'hampers', title: 'Gourmet Hampers', subtitle: '🧺 Artisan Luxe Baskets', icon: '🧺' },
  { id: 'plants', title: 'Plants & Bonsai', subtitle: '🪴 Air Purifying Greenery', icon: '🪴' },
  { id: 'international', title: 'International Express', subtitle: '🌐 Worldwide Express', icon: '🌍' },
  { id: 'new-arrivals', title: 'New Arrivals', subtitle: '🎁 Seasonal Drops', icon: '✨' },
  { id: 'festive', title: 'Diwali / Corp. Gifts', subtitle: '🪔 Luxury Celebration', icon: '🪔' },
  { id: 'chocolates', title: 'Artisan Chocolates', subtitle: '🍫 Belgian Truffles', icon: '🍫' },
];

const MOBILE_OCCASIONS = [
  { id: 'birthday', label: '🎂 Birthday Gifts' },
  { id: 'anniversary', label: '💍 Anniversary' },
  { id: 'love', label: '💖 Love & Romance' },
  { id: 'congratulations', label: '🎉 Congratulations' },
];

export default function Header({ 
  cartQty, 
  onOpenCart, 
  user, 
  onOpenAuth, 
  onLogout, 
  onTabChange,
  onCategoryChange,
  onOpenFilters,
  activeFiltersCount = 0,
  onOccasionChange,
  onOpenSupport,
  onOpenVendorOnboarding,
  searchQuery = '',
  onSearchChange
}) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef(null);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 250);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCategoryClick = (catId) => {
    setIsMobileMenuOpen(false);
    if (onCategoryChange) {
      onCategoryChange(catId);
    } else {
      router.push(`/?cat=${catId}`);
    }
  };

  const handleOccasionClick = (occId) => {
    setIsMobileMenuOpen(false);
    if (onOccasionChange) {
      onOccasionChange(occId);
    } else {
      router.push(`/?occ=${occId}`);
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const nowScrolled = window.scrollY > 15;
          if (nowScrolled !== lastScrolled) {
            lastScrolled = nowScrolled;
            setIsScrolled(nowScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'profile', label: 'My Account', icon: UserCircle },
    { id: 'orders', label: 'Order History & Tracking', icon: Package },
    { id: 'address', label: 'Saved Address Book', icon: MapPin },
    { id: 'favourites', label: 'Saved Wishlist', icon: Heart },
    { id: 'support', label: 'Help & Support Desk', icon: LifeBuoy },
  ];

  return (
    <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'shadow-lg bg-white/98 backdrop-blur-md border-b border-rose-200/90' 
        : 'shadow-xs bg-white'
    }`}>
      {/* Top Concierge & Announcement Ticker */}
      <div className="bg-gift-900 text-rose-100 border-b border-rose-900/60 py-2 px-4 md:px-8 text-xs flex items-center justify-between font-sans">
        <div className="hidden lg:flex items-center gap-6 text-[11px] font-medium text-rose-200">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            <Phone size={13} className="text-amber-400" /> Concierge: 1800-LUXE-GIFT
          </span>
          <span className="text-rose-700">|</span>
          <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            <ShieldCheck size={13} className="text-emerald-400" /> 100% On-Time Guarantee
          </span>
        </div>

        {/* Marquee Ticker */}
        <div className="flex-1 overflow-hidden max-w-2xl mx-auto">
          <motion.div
            animate={{ x: [0, -900] }}
            transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {[...TICKERS, ...TICKERS].map((t, i) => (
              <span key={i} className="text-[11px] font-semibold tracking-wider text-rose-100 mx-8 flex items-center gap-2">
                <Sparkles size={11} className="text-amber-400 flex-shrink-0" /> {t}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="hidden md:flex items-center gap-3 text-[11px] font-semibold text-rose-200">
          <button
            type="button"
            onClick={onOpenVendorOnboarding}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            <span>🤝 Sell with Us (B2B &amp; B2C)</span>
          </button>
          <span className="bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/30 text-[10px]">
            INR ₹
          </span>
        </div>
      </div>

      {/* Main Glassmorphic Header */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-rose-100/70 px-3 sm:px-6 md:px-10 py-2.5 sm:py-3.5 flex items-center justify-between transition-all">
        
        {/* Left Side: Hamburger Menu Button (Mobile/Tablet only) + Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            style={{ touchAction: 'manipulation' }}
            className="lg:hidden p-1.5 sm:p-2 -ml-1 sm:-ml-1.5 rounded-xl text-slate-800 hover:text-rose-700 hover:bg-rose-50 active:scale-95 transition-all cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu size={22} className="text-slate-800" />
          </button>

          {/* Brand Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
            onClick={() => {
              setIsMobileMenuOpen(false);
              router.push('/');
            }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-gift-800 to-gift-600 flex items-center justify-center text-white text-base sm:text-xl shadow-md shadow-rose-900/20 group-hover:shadow-rose-900/30 transition-all border border-rose-700/30 shrink-0">
              🎁
            </div>
            <div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <h1 className="font-serif font-extrabold text-lg sm:text-2xl text-slate-900 tracking-tight leading-none">
                  GiftPortal
                </h1>
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full tracking-widest uppercase shadow-sm">
                  LUXE
                </span>
              </div>
              <p className="hidden xs:block text-[8px] sm:text-[9px] font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-rose-700 uppercase mt-0.5">
                Couture Gifting & Hampers
              </p>
            </div>
          </motion.div>
        </div>

        {/* Highlighted Luxury Search Bar (Desktop & Tablet) */}
        <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md xl:max-w-lg mx-3 lg:mx-6 items-center gap-2">
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              placeholder="Search flowers, cakes, personalized gifts..."
              className="w-full bg-rose-50/40 hover:bg-rose-50/70 focus:bg-white border border-rose-200/90 focus:border-rose-600 rounded-full py-2 sm:py-2.5 pl-10 pr-9 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-rose-500/15 transition-all shadow-2xs group-hover:border-rose-300"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange && onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-700 transition-colors p-1 cursor-pointer"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {onOpenFilters && (
            <button
              type="button"
              onClick={onOpenFilters}
              className={`h-9 px-3 rounded-full flex items-center gap-1.5 text-xs font-bold shrink-0 transition-all cursor-pointer ${
                activeFiltersCount > 0
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-sm'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200'
              }`}
              title="Filter & Refine Gifts"
            >
              <SlidersHorizontal size={13} />
              <span className="hidden lg:inline">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Action Controls (Profile & Cart) */}
        <div className="flex items-center gap-2.5 sm:gap-3 md:gap-5 shrink-0">
          {user ? (
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 sm:gap-3 bg-rose-50/70 hover:bg-rose-100/70 rounded-xl sm:rounded-2xl px-2 sm:px-3.5 py-1.5 sm:py-2 border border-rose-200/80 transition-all shadow-sm cursor-pointer"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-gift-700 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                  {user.username?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider leading-none">Account</p>
                  <p className="text-xs font-bold text-slate-900 truncate max-w-[100px] mt-0.5">{user.username}</p>
                </div>
                <ChevronDown size={13} className={`text-slate-500 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* User Dropdown */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    className="absolute top-full right-0 mt-2 w-56 sm:w-60 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-rose-100 p-2 z-[100]"
                  >
                    <div className="px-3.5 py-2.5 border-b border-rose-50 mb-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Signed in as</p>
                      <p className="text-xs font-extrabold text-slate-900 truncate">{user.username}</p>
                    </div>
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.id === 'support') {
                            if (onOpenSupport) onOpenSupport();
                          } else {
                            if (onTabChange) onTabChange(item.id);
                          }
                          setShowDropdown(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <item.icon size={15} className="text-rose-600" />
                        {item.label}
                      </button>
                    ))}
                    <div className="h-px bg-rose-100/60 mx-2 my-1" />
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 sm:gap-2 bg-slate-900 text-white hover:bg-rose-900 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <User size={14} />
              <span>Sign In</span>
            </motion.button>
          )}

          {/* Help & Support Desk Trigger */}
          <button
            type="button"
            onClick={onOpenSupport}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-rose-700 bg-rose-50/70 hover:bg-rose-100/90 px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border border-rose-200/80 transition-all cursor-pointer shadow-2xs"
            title="Help & Support Desk - Raise or view tickets"
          >
            <LifeBuoy size={15} className="text-rose-600" />
            <span>Help Desk</span>
          </button>

          {/* Sell With Us / Vendor Hub Button */}
          <button
            type="button"
            onClick={onOpenVendorOnboarding}
            className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border border-amber-200 transition-all cursor-pointer shadow-2xs"
            title="Become a Partner Seller / Wholesaler"
          >
            <Store size={15} className="text-amber-600" />
            <span>Sell on Luxe</span>
          </button>

          {/* Cart Button Trigger */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenCart}
            className="relative flex items-center gap-1.5 sm:gap-2.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold shadow-md sm:shadow-lg shadow-rose-900/20 transition-all border border-rose-500/40 cursor-pointer"
          >
            <ShoppingBag size={15} />
            <span className="hidden sm:inline tracking-wide font-semibold">My Bag</span>
            <AnimatePresence>
              {cartQty > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="bg-amber-400 text-slate-900 text-[10px] font-extrabold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-md ml-0.5"
                >
                  {cartQty}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Search Bar Strip with Filter Icon */}
      <div className="md:hidden px-3.5 py-2 bg-white/98 border-b border-rose-100/80 flex items-center gap-2">
        <div className="relative flex-1 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors" size={15} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search gifts, flowers, cakes..."
            className="w-full bg-rose-50/40 focus:bg-white border border-rose-200/80 focus:border-rose-600 rounded-full py-2 pl-9 pr-8 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-rose-500/15 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange && onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-700 transition-colors p-0.5 cursor-pointer"
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Small Filter Icon Button Next to Mobile Search Bar */}
        {onOpenFilters && (
          <button
            type="button"
            onClick={onOpenFilters}
            className={`relative w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all shadow-xs cursor-pointer ${
              activeFiltersCount > 0
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-rose-600/20'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200/80'
            }`}
            title="Open Filter & Refine Gifts"
            aria-label="Filter & Refine Gifts"
          >
            <SlidersHorizontal size={14} />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] flex items-center justify-center border border-white shadow-2xs">
                {activeFiltersCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Mobile Luxury Navigation Drawer (Hardware-Accelerated, Zero-Lag) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[200] lg:hidden">
            {/* Backdrop: High-contrast dark scrim without GPU-heavy blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-950/60"
            />

            {/* Slide-out Panel: GPU composited layer for 60-120 FPS buttery smooth sliding */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              className="relative w-[86vw] max-w-[340px] h-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto overscroll-contain font-sans z-10"
            >
              {/* Drawer Top Header & Content */}
              <div>
                <div className="p-4 flex items-center justify-between border-b border-rose-100/80 bg-rose-50/40">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-gift-800 to-gift-600 flex items-center justify-center text-white text-base shadow-sm">
                      🎁
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-serif font-bold text-lg text-slate-900 leading-none">GiftPortal</span>
                        <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                          LUXE
                        </span>
                      </div>
                      <p className="text-[8px] font-bold tracking-widest text-rose-700 uppercase mt-0.5">
                        Couture Gifting
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-xl hover:bg-rose-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Account / Privilège Card */}
                {user ? (
                  <div className="p-4 bg-gradient-to-br from-rose-950 via-rose-900 to-slate-950 text-white rounded-2xl mx-3.5 my-3.5 shadow-md border border-rose-800/40">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-base shadow">
                        {user.username?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] font-extrabold text-amber-300 uppercase tracking-wider">Privilège Member</p>
                        <p className="text-sm font-bold truncate text-white">{user.username}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/15 text-xs font-semibold">
                      <button
                        onClick={() => {
                          onTabChange?.('orders');
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-1.5 text-rose-100 hover:text-amber-300 transition-colors text-left py-1 cursor-pointer"
                      >
                        <Package size={13} className="text-amber-400 shrink-0" />
                        <span>My Orders</span>
                      </button>
                      <button
                        onClick={() => {
                          onTabChange?.('favourites');
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-1.5 text-rose-100 hover:text-amber-300 transition-colors text-left py-1 cursor-pointer"
                      >
                        <Heart size={13} className="text-rose-400 shrink-0" />
                        <span>Wishlist</span>
                      </button>
                      <button
                        onClick={() => {
                          onTabChange?.('address');
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-1.5 text-rose-100 hover:text-amber-300 transition-colors text-left py-1 cursor-pointer"
                      >
                        <MapPin size={13} className="text-amber-400 shrink-0" />
                        <span>Addresses</span>
                      </button>
                      <button
                        onClick={() => {
                          onTabChange?.('profile');
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-1.5 text-rose-100 hover:text-amber-300 transition-colors text-left py-1 cursor-pointer"
                      >
                        <UserCircle size={13} className="text-rose-400 shrink-0" />
                        <span>Account</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-gradient-to-br from-rose-50 to-amber-50/50 border border-rose-100/90 rounded-2xl mx-3.5 my-3.5 space-y-2.5 shadow-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles size={15} className="text-rose-600" />
                      <p className="text-xs font-bold text-slate-900">Welcome to Privilège Club</p>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      Sign in to track orders, save multiple addresses & enjoy bespoke concierge perks.
                    </p>
                    <button
                      onClick={() => {
                        onOpenAuth?.();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-slate-950 hover:bg-rose-900 text-white py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <User size={13} />
                      <span>Sign In / Register</span>
                    </button>
                  </div>
                )}

                {/* Vendor Onboarding Highlight in Mobile Drawer */}
                <div className="mx-3.5 my-2">
                  <button
                    onClick={() => {
                      onOpenVendorOnboarding?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Store size={14} />
                    <span>🤝 Sell with Us (B2B &amp; B2C)</span>
                  </button>
                </div>

                {/* Curated Categories */}
                <div className="px-3.5 py-2 space-y-1">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
                    Curated Classifications
                  </p>
                  <div className="space-y-0.5">
                    {MOBILE_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-700 transition-all text-left cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-base shrink-0">{cat.icon}</span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 group-hover:text-rose-700 truncate">{cat.title}</p>
                            <p className="text-[10px] text-slate-400 font-medium truncate">{cat.subtitle}</p>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-rose-600 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shop By Occasions */}
                <div className="px-3.5 py-2 space-y-1 border-t border-rose-50 mt-1">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
                    Shop By Occasion
                  </p>
                  <div className="grid grid-cols-2 gap-1 px-1">
                    {MOBILE_OCCASIONS.map((occ) => (
                      <button
                        key={occ.id}
                        onClick={() => handleOccasionClick(occ.id)}
                        className="px-2.5 py-2 rounded-lg text-[11px] font-semibold text-slate-700 bg-slate-50 hover:bg-rose-50 hover:text-rose-700 transition-colors text-left truncate cursor-pointer"
                      >
                        {occ.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Drawer Footer Support & Sign Out */}
              <div className="p-4 border-t border-rose-100 bg-slate-50/70 space-y-3">
                <div className="space-y-1.5 text-[11px] text-slate-600">
                  <a href="tel:180058934438" className="flex items-center gap-2 hover:text-rose-700 transition-colors font-semibold">
                    <Phone size={13} className="text-amber-500" />
                    <span>Concierge: 1800-LUXE-GIFT</span>
                  </a>
                  <div className="flex items-center gap-2 text-slate-500 text-[10px]">
                    <ShieldCheck size={13} className="text-emerald-500" />
                    <span>100% Guaranteed On-Time & Fresh</span>
                  </div>
                </div>

                {user && (
                  <button
                    onClick={() => {
                      onLogout?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
