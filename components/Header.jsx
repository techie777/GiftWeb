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
        ? 'shadow-md bg-white/98 backdrop-blur-md border-b border-rose-100' 
        : 'shadow-2xs bg-white'
    }`}>
      {/* Top Concierge & Announcement Ticker */}
      <div className="bg-gift-900 text-rose-100 border-b border-rose-900/60 py-1.5 px-4 md:px-8 text-xs flex items-center justify-between font-sans">
        <div className="hidden lg:flex items-center gap-6 text-[11px] font-medium text-rose-200">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            <Phone size={12} className="text-amber-400" /> Concierge: 1800-LUXE-GIFT
          </span>
          <span className="text-rose-700">|</span>
          <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            <ShieldCheck size={12} className="text-emerald-400" /> 100% On-Time Guarantee
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
            className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 text-[11px] font-semibold transition-colors cursor-pointer"
          >
            <span>🤝 Sell with Us</span>
          </button>
          <span className="bg-white/10 text-rose-100 px-2 py-0.5 rounded-full text-[10px]">
            INR ₹
          </span>
        </div>
      </div>

      {/* Main Clean Luxury Header */}
      <nav className="bg-white px-3 sm:px-6 md:px-10 py-3 flex items-center justify-between gap-4 transition-all">
        
        {/* Left Side: Mobile Menu Button + Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            style={{ touchAction: 'manipulation' }}
            className="lg:hidden p-1.5 -ml-1 rounded-xl text-slate-800 hover:text-rose-700 hover:bg-rose-50 active:scale-95 transition-all cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu size={22} className="text-slate-800" />
          </button>

          {/* Brand Logo */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex items-center gap-2.5 group cursor-pointer"
            onClick={() => {
              setIsMobileMenuOpen(false);
              router.push('/');
            }}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-gift-800 to-gift-600 flex items-center justify-center text-white text-base shadow-xs border border-rose-700/30 shrink-0">
              🎁
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none">
                  GiftPortal
                </span>
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md tracking-wider uppercase shadow-2xs">
                  LUXE
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center: Spacious, Integrated Search Bar with Clean Filter Pill */}
        <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg xl:max-w-xl mx-2 lg:mx-6 items-center">
          <div className="relative w-full flex items-center group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors pointer-events-none" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              placeholder="Search flowers, cakes, personalized gifts..."
              className="w-full bg-slate-50/80 hover:bg-slate-100/60 focus:bg-white border border-slate-200/90 focus:border-rose-500 rounded-full py-2.5 pl-10 pr-24 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-rose-500/10 transition-all shadow-2xs"
            />
            
            {/* Integrated Right Controls (Clear & Filters) */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange && onSearchChange('')}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-full transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
              {onOpenFilters && (
                <button
                  type="button"
                  onClick={onOpenFilters}
                  className={`h-7 px-2.5 rounded-full flex items-center gap-1 text-[11px] font-semibold transition-all cursor-pointer ${
                    activeFiltersCount > 0
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                  title="Filter gifts"
                >
                  <SlidersHorizontal size={12} />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: 3 Simplified, Purposeful Action Items */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* 1. Help Desk (Clean, Subtle Link/Button) */}
          <button
            type="button"
            onClick={onOpenSupport}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-rose-700 px-2.5 py-2 rounded-xl hover:bg-rose-50/70 transition-colors cursor-pointer"
            title="Help & Support Desk"
          >
            <LifeBuoy size={16} className="text-slate-500" />
            <span className="hidden lg:inline">Help</span>
          </button>

          {/* 2. User Account / Sign In */}
          {user ? (
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 bg-slate-50 hover:bg-rose-50/60 rounded-full pl-1.5 pr-3 py-1 border border-slate-200/80 transition-all cursor-pointer shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-rose-700 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {user.username?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="text-xs font-semibold text-slate-800 max-w-[90px] truncate hidden sm:inline">
                  {user.username}
                </span>
                <ChevronDown size={13} className={`text-slate-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-[100]"
                  >
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Signed in as</p>
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
                    <div className="h-px bg-slate-100 mx-2 my-1" />
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
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-xl transition-all cursor-pointer"
            >
              <User size={16} className="text-slate-500" />
              <span>Sign In</span>
            </button>
          )}

          {/* 3. My Bag / Cart Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <ShoppingBag size={15} />
            <span className="hidden sm:inline">My Bag</span>
            {cartQty > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center ml-0.5 shadow-xs">
                {cartQty}
              </span>
            )}
          </motion.button>

        </div>
      </nav>

      {/* Mobile Search Bar Strip */}
      <div className="md:hidden px-3.5 py-2 bg-white border-b border-rose-100/80 flex items-center gap-2">
        <div className="relative flex-1 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors" size={15} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search gifts, flowers, cakes..."
            className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-rose-600 rounded-full py-2 pl-9 pr-8 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-rose-500/15 transition-all shadow-2xs"
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
                ? 'bg-rose-600 text-white shadow-rose-600/20'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
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

      {/* Mobile Luxury Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[200] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-950/60"
            />

            {/* Slide-out Panel */}
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
                        <span className="font-heading font-bold text-lg text-slate-900 leading-none">GiftPortal</span>
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

                {/* Vendor Onboarding in Mobile Drawer */}
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
