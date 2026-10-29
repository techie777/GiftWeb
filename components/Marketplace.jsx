'use client';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';
import ProductPopup from './ProductPopup';
import Cart from './Cart';
import AuthModal from './AuthModal';
import Footer from './Footer';
import InternationalShipping from './InternationalShipping';
import AdminPanel from './AdminPanel';
import VendorOnboardingModal from './VendorOnboardingModal';
import AddonModal from './AddonModal';
import SupportModal from './SupportModal';
import HeroSlider from './HeroSlider';
import GiftFinderWizard from './GiftFinderWizard';
import MainCategoryStrip from './MainCategoryStrip';
import DedicatedShowcase from './DedicatedShowcase';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { db, DEFAULT_HERO_SLIDES, isIndoreOrder, getOrderLogisticsInfo } from '../lib/db';
import { 
  Search, ShoppingBag, Clock, ChevronRight, ChevronDown, Package, Bell, Star, Key, 
  UserCircle, MapPin, Heart, LogOut, Gift, Sparkles, ShieldCheck, 
  ArrowRight, ArrowLeft, CheckCircle2, CheckCircle, Award, X, Plus, Trash2, Edit, Check, RotateCcw, Truck, Calendar, User,
  SlidersHorizontal, Filter, ArrowUpDown, Zap, Copy, ExternalLink,
  XCircle, MessageCircle, AlertCircle
} from 'lucide-react';

const FLOWER_SUBCATS = [
  { id: 'birthday', name: 'Birthday Flowers', image: '/showcase/flowers/birthday-flowers.png' },
  { id: 'anniversary', name: 'Anniversary Flowers', image: '/showcase/flowers/anniversary-flowers.png' },
  { id: 'roses', name: 'Roses', image: '/showcase/flowers/roses.png' },
  { id: 'orchids', name: 'Orchids', image: '/showcase/flowers/orchids.png' },
  { id: 'lilies', name: 'Lilies', image: '/showcase/flowers/lilies.png' },
  { id: 'sunflowers', name: 'Sunflowers', image: '/showcase/flowers/sunflowers.png' },
  { id: 'gerberas', name: 'Gerberas', image: '/showcase/flowers/gerberas.png' }
];

const CAKE_SUBCATS = [
  { id: 'chocolate', name: 'Dutch Truffle', image: '/showcase/cakes/dutch-truffle.png' },
  { id: 'romantic', name: 'Red Velvet Heart', image: '/showcase/cakes/red-velvet.png' },
  { id: 'black-forest', name: 'Black Forest', image: '/showcase/cakes/black-forest.png' },
  { id: 'cheesecake', name: 'Fruit Cheesecake', image: '/showcase/cakes/cheesecake.png' },
  { id: 'pinata', name: 'Pinata Surprise', image: '/showcase/cakes/pinata-cake.png' },
  { id: 'butterscotch', name: 'Butterscotch Crunch', image: '/showcase/cakes/butterscotch.png' },
  { id: 'kids', name: 'Kids Theme Cakes', image: '/showcase/cakes/kids-cakes.png' }
];

const PERSONALIZED_SUBCATS = [
  { id: 'lamps', name: 'Photo LED Lamps', image: '/showcase/personalized/photo-lamps.png' },
  { id: 'frames', name: 'Wood Photo Frames', image: '/showcase/personalized/photo-frames.png' },
  { id: 'watches', name: 'Engraved Watches', image: '/showcase/personalized/engraved-watches.png' },
  { id: 'drinkware', name: 'Custom Tumblers', image: '/showcase/personalized/custom-drinkware.png' },
  { id: 'keepsakes', name: 'Memory Plaques', image: '/showcase/personalized/memory-plaques.png' },
  { id: 'caricatures', name: 'Caricatures & Art', image: '/showcase/personalized/caricatures.png' },
  { id: 'keychains', name: 'Name Keychains', image: '/showcase/personalized/name-keychains.png' }
];

const HAMPER_SUBCATS = [
  { id: 'gourmet', name: 'Gourmet Hampers', image: '/showcase/hampers/gourmet-hampers.png' },
  { id: 'chocolates', name: 'Belgian Truffles', image: '/showcase/hampers/belgian-truffles.png' },
  { id: 'plush', name: 'Plush Teddies', image: '/showcase/hampers/plush-teddies.png' },
  { id: 'gadgets', name: 'Smart Tech', image: '/showcase/hampers/smart-tech.png' },
  { id: 'balloons', name: 'Balloon Decor', image: '/showcase/hampers/balloon-decor.png' },
  { id: 'spiritual', name: 'Spiritual Idols', image: '/showcase/hampers/spiritual-idols.png' },
  { id: 'fragrance', name: 'Fragrance & Scent', image: '/showcase/hampers/fragrance-sets.png' }
];

const RatingModal = ({ isOpen, onClose, order, username, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (order) {
      setRating(5);
      setFeedback('');
      setSelectedTags([]);
    }
  }, [order?.id]);

  if (!isOpen || !order) return null;

  const compliments = ['🌸 Fresh Flowers', '⚡ On-Time Arrival', '🎀 Luxe Packaging', '💌 Crisp Card Print', '💎 Premium Quality'];

  const toggleTag = (tag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleReviewSubmit = () => {
    const combinedFeedback = selectedTags.length > 0 
      ? `${feedback ? feedback + ' · ' : ''}Highlights: ${selectedTags.join(', ')}` 
      : feedback;
    onSubmit(order.id, username, rating, combinedFeedback);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[450] overflow-hidden">
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
            className="absolute inset-y-0 right-0 w-full sm:max-w-md md:max-w-lg bg-white shadow-[-24px_0_60px_rgba(0,0,0,0.3)] flex flex-col border-l border-rose-100/80 font-sans z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-gift-950 via-gift-900 to-rose-950 p-5 sm:p-6 text-white relative shrink-0">
              <motion.button 
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose} 
                className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 text-rose-100 hover:text-white transition-colors border border-white/10 shadow-lg"
                aria-label="Close dialogue"
              >
                <X size={18} />
              </motion.button>

              <div className="pr-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  Gifting Feedback
                </div>
                <h3 className="font-serif font-extrabold text-2xl text-white tracking-tight leading-tight">
                  Rate Your Experience
                </h3>
                <p className="text-xs text-rose-200 font-medium">
                  Order #{order.id} · Total Paid: <strong className="text-white">₹{order.total}</strong>
                </p>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              
              {/* Star Rating Box */}
              <div className="bg-rose-50/70 border border-rose-200/70 rounded-3xl p-6 text-center space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  How would you rate this gift?
                </p>
                
                <div className="flex items-center justify-center gap-2.5 pt-1">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <motion.button
                      key={v}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setRating(v)}
                      className="p-1 rounded-xl transition-all"
                      aria-label={`Rate ${v} star`}
                    >
                      <Star 
                        size={32} 
                        className={`transition-colors ${
                          v <= rating 
                            ? 'text-amber-400 fill-amber-400 drop-shadow-md' 
                            : 'text-slate-300'
                        }`} 
                      />
                    </motion.button>
                  ))}
                </div>

                <p className="text-sm font-extrabold text-rose-700">
                  {rating === 5 && '🌟 Flawless & Luxurious!'}
                  {rating === 4 && '✨ Great Experience'}
                  {rating === 3 && '👍 Good Service'}
                  {rating === 2 && '⚠️ Needs Improvement'}
                  {rating === 1 && '❌ Disappointing'}
                </p>
              </div>

              {/* Compliments Quick Tags */}
              <div className="space-y-2.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                  What stood out to you?
                </label>
                <div className="flex flex-wrap gap-2">
                  {compliments.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-rose-700 text-white border-rose-700 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-rose-300'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Free Text Review */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                  Detailed Notes / Recipient Reaction (Optional):
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us how the recipient loved the hamper or presentation..."
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-semibold text-slate-900 outline-none focus:border-rose-600 transition-colors shadow-inner"
                />
              </div>

            </div>

            {/* Sticky Action Footer */}
            <div className="p-5 md:p-6 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-4 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-black text-slate-400 hover:text-slate-700 uppercase tracking-wider px-3 py-2 cursor-pointer"
              >
                Cancel
              </button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReviewSubmit}
                className="bg-gradient-to-r from-rose-800 via-rose-700 to-rose-900 hover:from-rose-900 hover:to-rose-950 text-white px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-900/20 transition-all border border-rose-600/30 cursor-pointer"
              >
                Submit Luxury Review
              </motion.button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const AddressModal = ({ isOpen, onClose, address, onSave, areas }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    area: '',
    society: '',
    isDefault: false
  });
  const [err, setErr] = useState('');

  useEffect(() => {
    if (address) {
      setFormData({
        id: address.id,
        name: address.name || '',
        phone: address.phone || '',
        street: address.street || '',
        city: address.city || 'Indore',
        area: address.area || '',
        society: address.society || '',
        isDefault: Boolean(address.isDefault)
      });
    } else {
      setFormData({
        name: '',
        phone: '',
        street: '',
        city: 'Indore',
        area: areas?.[0]?.area || areas?.[0]?.name || '',
        society: '',
        isDefault: false
      });
    }
    setErr('');
  }, [address, isOpen, areas]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErr('Please enter contact / recipient name');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setErr('Please enter a valid 10-digit phone number');
      return;
    }
    if (!formData.street.trim()) {
      setErr('Please enter street or apartment details');
      return;
    }
    if (!formData.city.trim()) {
      setErr('Please enter city name');
      return;
    }
    if (!formData.area.trim()) {
      setErr('Please select or enter area');
      return;
    }
    onSave(formData);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-rose-100 space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar font-sans"
        >
          <div className="flex items-center justify-between border-b border-rose-50 pb-3">
            <h3 className="font-serif font-bold text-xl text-slate-900">
              {formData.id ? 'Edit Saved Address' : 'Add New Address'}
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Recipient / Contact Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Simran Roy"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-rose-600 outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                10-Digit Mobile Number
              </label>
              <input
                type="tel"
                maxLength={10}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                placeholder="e.g. 9876543210"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-rose-600 outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Flat / House / Street Address
              </label>
              <textarea
                rows={2}
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                placeholder="House/Flat number, building name, road"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:border-rose-600 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city || 'Indore'}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Indore"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-rose-600 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Area / Locality
                </label>
                {areas && areas.length > 0 ? (
                  <select
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 text-xs font-bold text-slate-900 focus:border-rose-600 outline-none"
                  >
                    <option value="">Select Area</option>
                    {areas.map((a, idx) => {
                      const areaVal = a.area || a.name || '';
                      const areaLabel = a.city ? `${a.city} · ${areaVal}` : areaVal;
                      return (
                        <option key={a.id || `${areaVal}-${idx}`} value={areaVal}>
                          {areaLabel}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="Area"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 focus:border-rose-600 outline-none"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="defaultAddr"
                checked={formData.isDefault}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                className="rounded text-rose-600 focus:ring-rose-500"
              />
              <label htmlFor="defaultAddr" className="text-xs font-semibold text-slate-700 cursor-pointer">
                Set as default delivery address
              </label>
            </div>

            {err && (
              <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                {err}
              </p>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-rose-700 text-white px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-rose-800 transition-colors shadow-md cursor-pointer"
              >
                Save Address
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const playNotificationSound = () => {
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
  audio.play().catch(e => console.log('Sound blocked by browser'));
};

const CATEGORY_TILES = [
  { id: 'same-day', title: 'Same Day Delivery', subtitle: '⚡ Express in 120 Mins', icon: '🛵', emojiBg: 'from-amber-100 to-rose-100' },
  { id: 'cakes', title: 'Cakes & Bakes', subtitle: '🎂 Fresh Handcrafted', icon: '🎂', emojiBg: 'from-rose-100 to-amber-100' },
  { id: 'flowers', title: 'Flowers & Blooms', subtitle: '🌹 Fresh Dutch Roses', icon: '💐', emojiBg: 'from-pink-100 to-rose-100' },
  { id: 'personalized', title: 'Personalized Gifts', subtitle: '✨ Photo & Engraving', icon: '🖼️', emojiBg: 'from-amber-100 to-orange-100' },
  { id: 'hampers', title: 'Gourmet Hampers', subtitle: '🧺 Artisan Luxe Baskets', icon: '🧺', emojiBg: 'from-orange-100 to-amber-100' },
  { id: 'plants', title: 'Plants & Bonsai', subtitle: '🪴 Air Purifying Greenery', icon: '🪴', emojiBg: 'from-emerald-100 to-teal-100' },
  { id: 'international', title: 'International', subtitle: '🌐 Worldwide Express', icon: '🌍', emojiBg: 'from-blue-100 to-indigo-100' },
  { id: 'new-arrivals', title: 'New Arrivals', subtitle: '🎁 Seasonal Couture Drops', icon: '✨', emojiBg: 'from-purple-100 to-rose-100' },
  { id: 'festive', title: 'Diwali / Corp. Gifts', subtitle: '🪔 Luxury Celebration', icon: '🪔', emojiBg: 'from-amber-100 to-yellow-100' },
  { id: 'chocolates', title: 'Artisan Chocolates', subtitle: '🍫 Belgian Truffle Boxes', icon: '🍫', emojiBg: 'from-amber-100 to-rose-100' },
  { id: 'toys', title: 'Soft Toys & Plush', subtitle: '🧸 Hug-worthy Teddies', icon: '🧸', emojiBg: 'from-pink-100 to-purple-100' },
  { id: 'electronics', title: 'Electronic Items', subtitle: '🎧 Audio & Smart Tech', icon: '🎧', emojiBg: 'from-blue-100 to-slate-100' },
  { id: 'decor', title: 'Balloon Decor', subtitle: '🎈 Celebrations & Parties', icon: '🎈', emojiBg: 'from-emerald-100 to-teal-100' },
  { id: 'kids', title: 'Gifts for Kids', subtitle: '🎮 Games, Toys & Cakes', icon: '🎮', emojiBg: 'from-purple-100 to-blue-100' },
  { id: 'educational', title: 'Educational Gifts', subtitle: '📚 STEM & Learning Kits', icon: '📚', emojiBg: 'from-sky-100 to-indigo-100' },
  { id: 'handcrafted', title: 'Handcrafted Gifts', subtitle: '🕯️ Artisan Keepsakes', icon: '🕯️', emojiBg: 'from-orange-100 to-stone-100' },
  { id: 'spiritual', title: 'Spiritual Gifts', subtitle: '🙏 Auspicious Idols & Diyas', icon: '🙏', emojiBg: 'from-amber-100 to-yellow-100' },
  { id: 'genz', title: 'GenZ Gifts', subtitle: '⚡ Aesthetic & Viral Picks', icon: '⚡', emojiBg: 'from-fuchsia-100 to-pink-100' },
];

export default function Marketplace() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeOccasion, setActiveOccasion] = useState('all');
  const [activeRecipient, setActiveRecipient] = useState('all');
  const [pendingMainItem, setPendingMainItem] = useState(null);
  const [isAddonModalOpen, setIsAddonModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('all'); // 'all', 'under-500', '500-1000', '1000-2500', 'above-2500'
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-asc', 'price-desc', 'rating', 'newest'
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const activeFiltersCount = useMemo(() => {
    return (selectedBudget !== 'all' ? 1 : 0) + 
      (activeOccasion !== 'all' ? 1 : 0) + 
      (activeCategory !== 'all' ? 1 : 0) + 
      (activeRecipient !== 'all' ? 1 : 0) + 
      (sortBy !== 'popular' ? 1 : 0) + 
      (searchQuery ? 1 : 0);
  }, [selectedBudget, activeOccasion, activeCategory, activeRecipient, sortBy, searchQuery]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastKey, setToastKey] = useState(0);
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('shop'); // 'shop' or 'orders'
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersPageSize, setOrdersPageSize] = useState(5);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showVendorOnboarding, setShowVendorOnboarding] = useState(false);
  const [products, setProducts] = useState([]);
  const productMap = useMemo(() => {
    const map = {};
    (products || []).forEach(p => {
      if (p && p.id) map[String(p.id)] = p;
    });
    return map;
  }, [products]);
  const [deals, setDeals] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSelectProduct = useCallback((product) => {
    if (!product) return;
    if (typeof window !== 'undefined') {
      window.__PRELOADED_PRODUCT = product;
      try {
        sessionStorage.setItem('giftportal_active_product', JSON.stringify(product));
      } catch (e) {}
    }
    router.push(`/product/${product.id}`);
  }, [router]);
  const [notifications, setNotifications] = useState([]);
  const [ratingOrder, setRatingOrder] = useState(null);
  const [settings, setSettings] = useState({});
  const [activeProfileTab, setActiveProfileTab] = useState('orders');
  const [favourites, setFavourites] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [heroSlides, setHeroSlides] = useState([]);
  const [productPage, setProductPage] = useState(1);
  const productsPerPage = 100;
  const [activeFlowerSubcat, setActiveFlowerSubcat] = useState(null);
  const [activeCakeSubcat, setActiveCakeSubcat] = useState(null);
  const [activePersonalizedSubcat, setActivePersonalizedSubcat] = useState(null);
  const [activeHamperSubcat, setActiveHamperSubcat] = useState(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef(null);
  const shopRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [heroStats] = useState([
    { label: '1,00,000+', sub: 'Gifts Delivered', emoji: '🚀' },
    { label: '4.9 / 5.0', sub: 'Customer Rating', emoji: '⭐' },
    { label: '120-Min', sub: 'Express Delivery', emoji: '⚡' },
    { label: '100%', sub: 'Freshness Guaranteed', emoji: '🔒' },
  ]);
  const [cutoffTime, setCutoffTime] = useState('');

  useEffect(() => {
    const updateCutoff = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(21, 0, 0, 0); // 9 PM cutoff for same-day
      if (now >= cutoff) {
        cutoff.setDate(cutoff.getDate() + 1);
      }
      const diff = cutoff - now;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCutoffTime(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`);
    };
    updateCutoff();
    const interval = setInterval(updateCutoff, 1000);
    return () => clearInterval(interval);
  }, []);

  const showToastMsg = useCallback((msg) => {
    setToastMessage(msg);
    setToastKey(k => k + 1);
  }, []);

  useEffect(() => {
    const loadData = async (isInitial = false) => {
      const prods = await db.getProducts();
      const dls = await db.getDeals();
      const s = await db.getSettings();
      const ars = await db.getAreas();
      const slides = await db.getHeroSlides();
      setProducts(prods);
      setDeals(dls);
      setSettings(s);
      setAreas(ars);
      setHeroSlides(slides || DEFAULT_HERO_SLIDES);
      
      const currentUser = JSON.parse(localStorage.getItem('giftportal_user'));
      if (currentUser) {
        setUser(currentUser);
        const userOrders = await db.getOrders(currentUser.username);
        setOrders(userOrders);
        const notes = await db.getNotifications(currentUser.username);
        setNotifications(notes);
        const favs = await db.getFavourites(currentUser.username);
        setFavourites(favs);
        const addrs = await db.getAddresses(currentUser.username);
        setAddresses(addrs);
      }

      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const pageParam = params.get('page');
        if (pageParam) {
          const parsed = parseInt(pageParam);
          if (!isNaN(parsed) && parsed >= 1) setProductPage(parsed);
        }
      }

      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get('tab');
        const viewParam = params.get('view');
        const catParam = params.get('cat');
        const occParam = params.get('occ');
        if (tabParam === 'orders') {
          setActiveTab('orders');
          if (viewParam) {
            setActiveProfileTab(viewParam);
          }
        }
        if (catParam) {
          setActiveTab('shop');
          setActiveCategory(catParam);
        }
        if (occParam) {
          setActiveTab('shop');
          setActiveOccasion(occParam);
        }
      }
    };
    loadData(true);

    const handleSync = () => {
      loadData(false);
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('giftportal_sync', handleSync);

    const syncTimer = setInterval(async () => {
      const changed = await db.syncWithServer(false);
      if (changed) {
        loadData(false);
      }
    }, 2500);

    return () => {
      clearInterval(syncTimer);
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('giftportal_sync', handleSync);
    };
  }, []);

  const cartQty = cart.reduce((total, item) => total + item.qty, 0);

  const handleAddToCart = useCallback((product, variant, typeLabel, deliveryMeta = {}) => {
    if (!product) return;
    const itemKey = `${product.id}-${typeLabel}-${variant.label}-${deliveryMeta.slotId || 'std'}`;
    const mainItem = {
      key: itemKey,
      id: product.id,
      name: `${product.name} (${typeLabel})`,
      price: variant.price,
      variantLabel: variant.label,
      emoji: product.emoji,
      img: product.img,
      image: product.img,
      qty: 1,
      pincode: deliveryMeta.pincode,
      city: deliveryMeta.city,
      deliveryDate: deliveryMeta.deliveryDate,
      slotId: deliveryMeta.slotId,
      slotLabel: deliveryMeta.slotLabel,
      slotFee: deliveryMeta.slotFee || 0,
      personalization: deliveryMeta.personalization
    };
    setSelectedProduct(null);
    setPendingMainItem(mainItem);
    setIsAddonModalOpen(true);
  }, []);

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
            variantLabel: 'Add-on Item',
            emoji: addon.emoji,
            img: addon.img || addon.image,
            image: addon.img || addon.image,
            qty: 1
          });
        }
      });

      return updated;
    });

    showToastMsg(`🎁 Added ${pendingMainItem.name} ${selectedAddons.length > 0 ? `+ ${selectedAddons.length} Add-on(s)` : ''} to Bag!`);
    setIsAddonModalOpen(false);
    setPendingMainItem(null);
  }, [pendingMainItem, showToastMsg]);

  const handleCheckout = useCallback(async (orderData, skipNavigate = false) => {
    const currentUser = user || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('giftportal_user') || 'null') : null);
    if (!currentUser) {
      setIsAuthOpen(true);
      return null;
    }
    const orderToSave = { ...orderData, customerUsername: currentUser.username };
    const savedOrder = await db.saveOrder(orderToSave);
    setOrders(prev => [savedOrder, ...prev]);
    setCart([]);
    if (!skipNavigate) {
      setIsCartOpen(false);
      setActiveTab('orders');
      showToastMsg('🎉 Order placed successfully! Live tracking active in "My Orders".');
    }
    return savedOrder;
  }, [user, showToastMsg]);

  const handleSubmitRating = async (orderId, username, rating, feedback) => {
    const updated = await db.saveOrderFeedback(orderId, username, rating, feedback);
    setOrders(updated.filter(o => o.customerUsername === username));
    showToastMsg('✅ Thank you for rating your gift!');
    setRatingOrder(null);
  };

  const handleAuthSuccess = async (userData) => {
    setUser(userData);
    localStorage.setItem('giftportal_user', JSON.stringify(userData));
    const userOrders = await db.getOrders(userData.username);
    setOrders(userOrders);
    const favs = await db.getFavourites(userData.username);
    setFavourites(favs);
    const addrs = await db.getAddresses(userData.username);
    setAddresses(addrs);
    showToastMsg(`Welcome back, ${userData.username}!`);
  };

  const handleLogout = () => {
    setShowSignOutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setUser(null);
    setOrders([]);
    setFavourites([]);
    setAddresses([]);
    localStorage.removeItem('giftportal_user');
    setActiveTab('shop');
    setActiveProfileTab('orders');
    setShowSignOutConfirm(false);
    showToastMsg('Signed out successfully. Looking forward to your next visit!');
  };

  const handleToggleFavourite = async (product) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    const updatedFavs = await db.toggleFavourite(user.username, product);
    setFavourites(updatedFavs);
    const isNowFav = updatedFavs.some(f => f.id === product.id);
    showToastMsg(isNowFav ? `💖 Favourited: "${product.name}"` : `🤍 Removed from Wishlist: "${product.name}"`);
  };

  const handleSaveAddress = async (addressData) => {
    if (!user) return;
    const updated = await db.saveAddress(user.username, addressData);
    setAddresses(updated);
    setIsAddressModalOpen(false);
    setEditingAddress(null);
    showToastMsg(addressData.id ? 'Address updated successfully!' : 'New address saved!');
  };

  const handleDeleteAddress = async (addressId) => {
    if (!user) return;
    const updated = await db.deleteAddress(user.username, addressId);
    setAddresses(updated);
    showToastMsg('Address removed.');
  };

  useEffect(() => {
    const handleNavigateToOrders = () => {
      setIsCartOpen(false);
      setActiveTab('orders');
      setActiveProfileTab('orders');
    };
    window.addEventListener('navigate_to_orders', handleNavigateToOrders);
    return () => window.removeEventListener('navigate_to_orders', handleNavigateToOrders);
  }, []);

  const filteredProducts = useMemo(() => {
    const list = products.filter((product) => {
      const pOccasions = Array.isArray(product.occasions) ? product.occasions : (Array.isArray(product.occasion) ? product.occasion : (product.occasion ? [product.occasion] : []));
      const pRecipients = Array.isArray(product.recipients) ? product.recipients : (Array.isArray(product.recipient) ? product.recipient : (product.recipient ? [product.recipient] : []));

      const matchesCategory = 
        activeCategory === 'all' || 
        product.cat === activeCategory ||
        (activeCategory === 'same-day' && (product.earliestDelivery === 'Today' || product.deliveryDays === 0 || true)) ||
        (activeCategory === 'new-arrivals' && (product.tag?.includes('New') || product.tag?.includes('Limited') || product.rating >= 4.9)) ||
        (activeCategory === 'cakes' && (product.cat === 'cakes' || product.cat === 'chocolates')) ||
        (activeCategory === 'festive' && (product.cat === 'hampers' || product.cat === 'chocolates' || product.cat === 'spiritual')) ||
        (activeCategory === 'international' && (product.cat === 'hampers' || product.cat === 'flowers' || product.cat === 'personalized')) ||
        (activeCategory === 'toys' && (product.cat === 'toys' || product.cat === 'educational')) ||
        (activeCategory === 'kids' && (product.cat === 'toys' || product.cat === 'educational' || pRecipients.includes('kids'))) ||
        (activeCategory === 'educational' && (product.cat === 'educational' || product.subcat === 'stem')) ||
        (activeCategory === 'electronics' && product.cat === 'electronics') ||
        (activeCategory === 'decor' && (product.cat === 'decor' || product.subcat === 'balloons')) ||
        (activeCategory === 'handcrafted' && (product.cat === 'handcrafted' || product.cat === 'personalized')) ||
        (activeCategory === 'spiritual' && product.cat === 'spiritual') ||
        (activeCategory === 'genz' && product.cat === 'genz');

      const matchesOccasion = activeOccasion === 'all' || pOccasions.some(o => String(o).toLowerCase() === activeOccasion.toLowerCase());
      const matchesRecipient = activeRecipient === 'all' || pRecipients.some(r => String(r).toLowerCase() === activeRecipient.toLowerCase());
      const matchesSearch = !searchQuery.trim() || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (product.cat && product.cat.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.desc && product.desc.toLowerCase().includes(searchQuery.toLowerCase()));

      // Budget filter
      const prodPrice = Number(product.types?.[0]?.variants?.[0]?.price || product.price || 0);
      let matchesBudget = true;
      if (selectedBudget === 'under-500') matchesBudget = prodPrice < 500;
      else if (selectedBudget === '500-1000') matchesBudget = prodPrice >= 500 && prodPrice <= 1000;
      else if (selectedBudget === '1000-2500') matchesBudget = prodPrice > 1000 && prodPrice <= 2500;
      else if (selectedBudget === 'above-2500') matchesBudget = prodPrice > 2500;

      return matchesCategory && matchesOccasion && matchesRecipient && matchesSearch && matchesBudget;
    });

    // Sorting
    return [...list].sort((a, b) => {
      const priceA = Number(a.types?.[0]?.variants?.[0]?.price || a.price || 0);
      const priceB = Number(b.types?.[0]?.variants?.[0]?.price || b.price || 0);
      const ratingA = Number(a.rating || 4.8);
      const ratingB = Number(b.rating || 4.8);

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return ratingB - ratingA;
      if (sortBy === 'newest') {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        if (dateB !== dateA) return dateB - dateA;
        return (Number(b.id) || 0) - (Number(a.id) || 0);
      }
      // 'popular' default: highest rating
      return ratingB - ratingA;
    });
  }, [activeCategory, activeOccasion, activeRecipient, searchQuery, selectedBudget, sortBy, products]);

  // Dedicated Showcase filtered product collections
  const flowerProducts = useMemo(() => {
    const all = products.filter(p => p.cat === 'flowers' || p.category?.toLowerCase()?.includes('flower'));
    if (!activeFlowerSubcat) return all;
    const matched = all.filter(p => p.subcat === activeFlowerSubcat || (activeFlowerSubcat === 'birthday' && p.occasion?.includes('birthday')) || (activeFlowerSubcat === 'anniversary' && p.occasion?.includes('anniversary')) || p.name?.toLowerCase().includes(activeFlowerSubcat));
    return matched.length > 0 ? matched : all;
  }, [products, activeFlowerSubcat]);

  const cakeProducts = useMemo(() => {
    const all = products.filter(p => p.cat === 'cakes' || p.category?.toLowerCase()?.includes('cake'));
    if (!activeCakeSubcat) return all;
    const matched = all.filter(p => p.subcat === activeCakeSubcat || (activeCakeSubcat === 'kids' && p.recipient?.includes('kids')) || p.name?.toLowerCase().includes(activeCakeSubcat));
    return matched.length > 0 ? matched : all;
  }, [products, activeCakeSubcat]);

  const personalizedProducts = useMemo(() => {
    const all = products.filter(p => p.cat === 'personalized' || p.category?.toLowerCase()?.includes('personal'));
    if (!activePersonalizedSubcat) return all;
    const matched = all.filter(p => p.subcat === activePersonalizedSubcat || p.name?.toLowerCase().includes(activePersonalizedSubcat));
    return matched.length > 0 ? matched : all;
  }, [products, activePersonalizedSubcat]);

  const hamperProducts = useMemo(() => {
    const all = products.filter(p => (p.cat === 'hampers' || p.cat === 'chocolates' || p.cat === 'toys' || p.cat === 'electronics' || p.cat === 'decor' || p.cat === 'spiritual' || p.category?.toLowerCase()?.includes('hamper')));
    if (!activeHamperSubcat) return all;
    const matched = all.filter(p => p.subcat === activeHamperSubcat || p.cat === activeHamperSubcat || p.name?.toLowerCase().includes(activeHamperSubcat));
    return matched.length > 0 ? matched : all;
  }, [products, activeHamperSubcat]);

  const totalProductPages = Math.ceil(filteredProducts.length / productsPerPage) || 1;

  // Reset pagination when filter criteria change
  useEffect(() => {
    setProductPage(1);
  }, [activeCategory, activeOccasion, activeRecipient, searchQuery, selectedBudget, sortBy]);

  const displayedProducts = useMemo(() => {
    const startIndex = (productPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, productPage, productsPerPage]);

  const handleProductPageChange = (newPage) => {
    setProductPage(newPage);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      url.searchParams.set('page', newPage);
      window.history.pushState({}, '', url);
    }
    shopRef.current?.querySelector('#product-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (isAdminOpen) {
    return <AdminPanel onClose={async () => {
      setIsAdminOpen(false);
      const prods = await db.getProducts();
      const dls = await db.getDeals();
      setProducts(prods);
      setDeals(dls);
    }} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col w-full overflow-x-clip relative font-sans">
      
      {/* Website Paused Banner */}
      {settings.websitePaused && (
        <div className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-10 max-w-lg w-full text-center space-y-6 shadow-2xl border border-rose-100">
            <div className="w-20 h-20 bg-amber-100 text-amber-700 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <Clock size={40} className="animate-pulse" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif font-bold text-3xl text-slate-900">Orders Paused</h2>
              <p className="text-xs text-slate-500 leading-relaxed">{settings.pauseMessage}</p>
            </div>
            <span className="inline-block px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider">
              Please Check Back Soon
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <Header 
        cartQty={cartQty} 
        onOpenCart={() => setIsCartOpen(true)} 
        user={user} 
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setActiveTab('shop');
        }}
        onTabChange={(tab) => {
          setActiveTab('orders');
          setActiveProfileTab(tab);
        }}
        onCategoryChange={(catId) => {
          setActiveCategory(catId);
          setActiveTab('shop');
        }}
        onOccasionChange={(occId) => {
          setActiveOccasion(occId);
          setActiveTab('shop');
        }}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenFilters={() => setIsFilterDrawerOpen(true)}
        activeFiltersCount={activeFiltersCount}
        onOpenVendorOnboarding={() => setShowVendorOnboarding(true)}
      />
      
      {/* ===== SIDEBAR DRAWER (hamburger-triggered overlay) ===== */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            key="sidebar-portal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500]"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 bg-slate-950/60"
              onClick={() => setShowSidebar(false)}
            />
            {/* Drawer: Hardware-accelerated GPU layer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              className="absolute left-0 top-0 bottom-0 z-10 w-72 bg-white shadow-2xl flex flex-col overscroll-contain"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-rose-100">
                <div className="flex items-center gap-2">
                  <span className="text-rose-700 font-extrabold text-xs uppercase tracking-widest">Browse</span>
                  <span className="w-1.5 h-1.5 bg-rose-600 rounded-full" />
                  <span className="text-slate-400 text-[10px] font-semibold">GiftPortal Luxe</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSidebar(false)}
                  style={{ touchAction: 'manipulation' }}
                  className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
              {/* Sidebar content fills the drawer */}
              <div className="flex-1 overflow-y-auto">
                <Sidebar
                  className="w-full bg-white overflow-y-auto block"
                  activeCategory={activeCategory}
                  onCategoryChange={(cat) => { setActiveCategory(cat); setActiveTab('shop'); setShowSidebar(false); }}
                  activeOccasion={activeOccasion}
                  onOccasionChange={(occ) => { setActiveOccasion(occ); setActiveTab('shop'); setShowSidebar(false); }}
                  activeRecipient={activeRecipient}
                  onRecipientChange={(rec) => { setActiveRecipient(rec); setActiveTab('shop'); setShowSidebar(false); }}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1 w-full">
        <main className="flex-1 overflow-x-clip w-full bg-[#FAF8F5] pb-16">
          
          {/* User Logged-in Navigation & Notification Bar (with hamburger) */}
          {user && (
            <div className="relative z-20 bg-white/95 backdrop-blur-md border-b border-rose-100/70 px-3.5 sm:px-6 md:px-10 py-2.5 sm:py-3 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3 sm:gap-6">
                {/* Hamburger trigger */}
                <button
                  type="button"
                  onClick={() => setShowSidebar(true)}
                  style={{ touchAction: 'manipulation' }}
                  className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-700 hover:bg-rose-100 active:scale-95 transition-all cursor-pointer shrink-0"
                  title="Browse Categories"
                >
                  <div className="flex flex-col gap-1 items-center justify-center">
                    <span className="w-3.5 h-0.5 bg-rose-700 rounded-full" />
                    <span className="w-3.5 h-0.5 bg-rose-700 rounded-full" />
                    <span className="w-3.5 h-0.5 bg-rose-700 rounded-full" />
                  </div>
                </button>
                <button 
                  onClick={() => setActiveTab('shop')}
                  className={`relative text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all pb-1 cursor-pointer ${
                    activeTab === 'shop' ? 'text-rose-700' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Marketplace
                  {activeTab === 'shop' && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-700 rounded-full" />
                  )}
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('orders');
                    setActiveProfileTab('orders');
                  }}
                  className={`relative text-xs font-extrabold uppercase tracking-wider transition-all pb-1 cursor-pointer ${
                    activeTab === 'orders' ? 'text-rose-700' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  My Orders & Wishlist
                  {activeTab === 'orders' && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-700 rounded-full" />
                  )}
                </button>
              </div>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={async () => {
                    const willOpen = !showNotifications;
                    setShowNotifications(willOpen);
                    if (willOpen && user?.username) {
                      const notes = await db.getNotifications(user.username);
                      setNotifications(notes);
                    }
                  }}
                  className="relative p-2 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 hover:bg-rose-100 transition-all shadow-xs cursor-pointer"
                  title="View Notifications"
                >
                  <Bell size={17} />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </motion.button>

                {/* Notifications Popover */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-rose-100 p-3.5 z-50 space-y-2.5"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-rose-50">
                        <div className="flex items-center gap-1.5">
                          <Bell size={14} className="text-rose-600" />
                          <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                            Order Notifications
                          </span>
                        </div>
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="text-[10px] text-slate-400 hover:text-slate-600"
                        >
                          ✕
                        </button>
                      </div>

                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-400 py-4 text-center">No new notifications</p>
                      ) : (
                        <div className="max-h-64 overflow-y-auto space-y-2 pr-1 no-scrollbar">
                          {notifications.map((n) => (
                            <div key={n.id} className="p-2.5 bg-rose-50/50 rounded-xl border border-rose-100/70 text-xs space-y-1">
                              <p className="font-semibold text-slate-800">{n.text}</p>
                              <p className="text-[10px] text-slate-400 font-medium">
                                {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {activeTab === 'shop' ? (
            <div className="space-y-0 w-full" ref={shopRef}>
              {/* Hamburger button visible when NOT logged in */}
              {!user && (
                <div className="px-3.5 sm:px-6 md:px-10 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowSidebar(true)}
                    style={{ touchAction: 'manipulation' }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-rose-200 shadow-xs hover:border-rose-400 active:scale-97 text-rose-700 font-bold text-xs transition-all cursor-pointer"
                  >
                    <div className="flex flex-col gap-0.5 items-center justify-center">
                      <span className="w-3 h-0.5 bg-rose-700 rounded-full" />
                      <span className="w-3 h-0.5 bg-rose-700 rounded-full" />
                      <span className="w-3 h-0.5 bg-rose-700 rounded-full" />
                    </div>
                    <span>Browse Categories</span>
                  </button>
                </div>
              )}

              {/* ===== UNIFIED SHOP BY COLLECTION SECTION ===== */}
              <MainCategoryStrip 
                activeCategory={activeCategory} 
                products={products}
                onSelectCategory={(catId) => { 
                  setActiveCategory(activeCategory === catId ? 'all' : catId); 
                  setActiveTab('shop'); 
                  shopRef.current?.querySelector('#product-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
                }} 
              />

              {/* ===== 5-6 THEMATIC HERO SECTIONS SLIDER (Admin Controlled) ===== */}
              {settings?.heroSectionVisible && (
                <HeroSlider 
                  slides={heroSlides} 
                  onSelectCategory={(catId) => { 
                    setActiveCategory(catId); 
                    setActiveTab('shop'); 
                    shopRef.current?.querySelector('#product-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
                  }} 
                  cutoffTime={cutoffTime} 
                  onExploreClick={() => {
                    shopRef.current?.querySelector('#product-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                />
              )}


              {/* ===== 3-CLICK INTELLIGENT GIFT FINDER & OCCASION WIZARD ===== */}
              <GiftFinderWizard
                products={products}
                onSelectProduct={(prod) => setSelectedProduct(prod)}
                onQuickAddToCart={(prod, variant, typeLabel) => {
                  handleAddToCart(prod, variant, typeLabel);
                  setIsCartOpen(true);
                }}
                onExploreAll={() => {
                  setActiveTab('shop');
                  shopRef.current?.querySelector('#product-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              />

              {/* ===== OCCASION QUICK-SELECT ===== */}
              <section className="px-3.5 sm:px-6 md:px-10 pt-6 sm:pt-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-rose-600" />
                    <h2 className="font-serif font-bold text-lg sm:text-xl text-slate-900">What's the occasion?</h2>
                    <span className="text-xs text-slate-400 font-medium hidden sm:inline">Pick and we'll curate the perfect gift</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                    {[
                      { id: 'birthday', label: 'Birthday', emoji: '🎂', grad: 'from-rose-100 to-pink-50', active: 'from-rose-700 to-rose-800', border: 'border-rose-200' },
                      { id: 'anniversary', label: 'Anniversary', emoji: '💍', grad: 'from-purple-100 to-rose-50', active: 'from-purple-700 to-rose-700', border: 'border-purple-200' },
                      { id: 'love', label: 'Romance', emoji: '💖', grad: 'from-red-100 to-rose-50', active: 'from-red-700 to-rose-700', border: 'border-red-200' },
                      { id: 'congratulations', label: 'Congrats', emoji: '🎉', grad: 'from-amber-100 to-yellow-50', active: 'from-amber-600 to-amber-700', border: 'border-amber-200' },
                      { id: 'festive', label: 'Festive', emoji: '🪔', grad: 'from-orange-100 to-amber-50', active: 'from-orange-700 to-amber-700', border: 'border-orange-200' },
                      { id: 'get-well', label: 'Get Well', emoji: '💐', grad: 'from-emerald-100 to-teal-50', active: 'from-emerald-700 to-teal-700', border: 'border-emerald-200' },
                    ].map((occ) => {
                      const isSelected = activeOccasion === occ.id;
                      return (
                        <motion.button
                          key={occ.id}
                          whileHover={{ y: -2, scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setActiveOccasion(activeOccasion === occ.id ? 'all' : occ.id);
                          }}
                          className={`relative flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-2xl border-2 transition-all cursor-pointer overflow-hidden ${
                            isSelected
                              ? `bg-gradient-to-br ${occ.active} border-transparent text-white shadow-md`
                              : `bg-gradient-to-br ${occ.grad} ${occ.border} hover:shadow-sm`
                          }`}
                        >
                          <span className="text-2xl sm:text-3xl leading-none">{occ.emoji}</span>
                          <span className={`text-[10px] sm:text-xs font-extrabold tracking-wide ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                            {occ.label}
                          </span>
                          {isSelected && (
                            <motion.div
                              layoutId="occSelected"
                              className="absolute inset-0 bg-white/10 rounded-2xl"
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* ===== TRENDING PRODUCTS ROW (NEW) ===== */}
              {products.length > 0 && !searchQuery && activeOccasion === 'all' && activeCategory === 'all' && (
                <section className="px-3.5 sm:px-6 md:px-10 pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🔥</span>
                        <h2 className="font-serif font-bold text-lg sm:text-xl text-slate-900">Trending Right Now</h2>
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">Bestsellers</span>
                      </div>
                      <button
                        onClick={() => shopRef.current?.querySelector('#product-grid')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-xs font-bold text-rose-700 flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        View All <ChevronRight size={13} />
                      </button>
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                      {[...products]
                        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                        .slice(0, 6)
                        .map((product, idx) => {
                          const firstVariant = product.types?.[0]?.variants?.[0] || { price: 599, original: 799 };
                          const isFav = favourites.some(f => f.id === product.id);
                          return (
                            <motion.div
                              key={product.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              whileHover={{ y: -4 }}
                              className="shrink-0 w-44 sm:w-52 bg-white rounded-2xl sm:rounded-3xl border border-rose-100/90 shadow-sm overflow-hidden cursor-pointer group active:scale-95 transition-transform"
                              style={{ touchAction: 'manipulation' }}
                              onMouseEnter={() => { try { router.prefetch(`/product/${product.id}`); } catch (e) {} }}
                              onTouchStart={() => { try { router.prefetch(`/product/${product.id}`); } catch (e) {} }}
                              onClick={() => handleSelectProduct(product)}
                            >
                              <div className="relative aspect-[4/3] overflow-hidden bg-rose-50">
                                <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute top-2 left-2 bg-slate-950/85 backdrop-blur-sm text-amber-300 text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                  <Star size={8} className="fill-amber-400 text-amber-400" /> {product.rating || '4.9'}
                                </div>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleToggleFavourite(product); }}
                                  className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-sm transition-all shadow-sm cursor-pointer ${
                                    isFav ? 'bg-rose-600 text-white' : 'bg-white/85 hover:bg-white text-slate-600'
                                  }`}
                                >
                                  <Heart size={10} className={isFav ? 'fill-current' : ''} />
                                </button>
                                <div className="absolute bottom-1.5 left-2 bg-white/90 backdrop-blur-sm text-[8px] font-bold text-slate-700 px-1.5 py-0.5 rounded-full border border-rose-100/70 shadow-xs flex items-center gap-0.5">
                                  🔥 {(parseInt(product.id) % 40 + 12)} ordered today
                                </div>
                              </div>
                              <div className="p-2.5 sm:p-3 space-y-1">
                                <p className="font-serif font-bold text-xs text-slate-900 line-clamp-1 leading-snug">{product.name}</p>
                                <div className="flex items-baseline gap-1.5">
                                  <span className="font-serif font-extrabold text-sm text-rose-700">₹{firstVariant.price}</span>
                                  <span className="text-[10px] text-slate-400 line-through">₹{firstVariant.original}</span>
                                  <span className="text-[8px] font-extrabold text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200/60">
                                    {Math.round((1 - firstVariant.price / firstVariant.original) * 100)}% OFF
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                    </div>
                  </div>
                </section>
              )}

              {/* ===== NEWLY ADDED GIFTS ROW ===== */}
              {products.length > 0 && !searchQuery && activeOccasion === 'all' && activeCategory === 'all' && (
                <section className="px-3.5 sm:px-6 md:px-10 pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">✨</span>
                        <h2 className="font-serif font-bold text-lg sm:text-xl text-slate-900">Newly added gifts</h2>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">New Arrivals</span>
                      </div>
                      <button
                        onClick={() => shopRef.current?.querySelector('#product-grid')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-xs font-bold text-rose-700 flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        View All <ChevronRight size={13} />
                      </button>
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                      {[...products]
                        .sort((a, b) => {
                          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                          if (dateB !== dateA) return dateB - dateA;
                          return (Number(b.id) || 0) - (Number(a.id) || 0);
                        })
                        .slice(0, 8)
                        .map((product, idx) => {
                          const firstVariant = product.types?.[0]?.variants?.[0] || { price: 599, original: 799 };
                          const isFav = favourites.some(f => f.id === product.id);
                          return (
                            <motion.div
                              key={product.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.04 }}
                              whileHover={{ y: -4 }}
                              className="shrink-0 w-44 sm:w-52 bg-white rounded-2xl sm:rounded-3xl border border-rose-100/90 shadow-sm overflow-hidden cursor-pointer group active:scale-95 transition-transform"
                              style={{ touchAction: 'manipulation' }}
                              onMouseEnter={() => { try { router.prefetch(`/product/${product.id}`); } catch (e) {} }}
                              onTouchStart={() => { try { router.prefetch(`/product/${product.id}`); } catch (e) {} }}
                              onClick={() => handleSelectProduct(product)}
                            >
                              <div className="relative aspect-[4/3] overflow-hidden bg-rose-50">
                                <img 
                                  src={product.img} 
                                  alt={product.name} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                  loading="lazy"
                                />
                                {product.rating && (
                                  <div className="absolute top-2 left-2 bg-slate-950/85 backdrop-blur-sm text-amber-300 text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                    <Star size={8} className="fill-amber-400 text-amber-400" /> {product.rating}
                                  </div>
                                )}
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); handleToggleFavourite(product); }}
                                  className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-sm transition-all shadow-sm cursor-pointer ${
                                    isFav ? 'bg-rose-600 text-white' : 'bg-white/85 hover:bg-white text-slate-600'
                                  }`}
                                  aria-label="Wishlist"
                                >
                                  <Heart size={10} className={isFav ? 'fill-current' : ''} />
                                </button>
                                <div className="absolute bottom-1.5 left-2 bg-white/90 backdrop-blur-sm text-[8px] font-bold text-emerald-700 px-1.5 py-0.5 rounded-full border border-emerald-100/70 shadow-xs flex items-center gap-0.5">
                                  ✨ Fresh Arrival
                                </div>
                              </div>
                              <div className="p-2.5 sm:p-3 space-y-1">
                                <p className="font-serif font-bold text-xs text-slate-900 line-clamp-1 leading-snug">{product.name}</p>
                                <div className="flex items-baseline gap-1.5">
                                  <span className="font-serif font-extrabold text-sm text-rose-700">₹{firstVariant.price}</span>
                                  {firstVariant.original && firstVariant.original > firstVariant.price && (
                                    <span className="text-[10px] text-slate-400 line-through">₹{firstVariant.original}</span>
                                  )}
                                  {firstVariant.original && firstVariant.original > firstVariant.price && (
                                    <span className="text-[8px] font-extrabold text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200/60">
                                      {Math.round((1 - firstVariant.price / firstVariant.original) * 100)}% OFF
                                    </span>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                    </div>
                  </div>
                </section>
              )}

              {/* ===== COMMON FILTER, SORT & HIGHLIGHTED SEARCH CENTER ===== */}
              <section id="product-grid" className="px-3.5 sm:px-6 md:px-10 pt-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
                
                {/* Control Center Card: ULTRA-COMPACT MOBILE-FIRST SEARCH & FILTER BAR */}
                {(() => {
                  const activeFiltersCount = (selectedBudget !== 'all' ? 1 : 0) + (activeOccasion !== 'all' ? 1 : 0) + (activeCategory !== 'all' ? 1 : 0) + (activeRecipient !== 'all' ? 1 : 0) + (sortBy !== 'popular' ? 1 : 0) + (searchQuery ? 1 : 0);

                  return (
                    <>
                      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-rose-100 shadow-sm p-2.5 sm:p-4 space-y-2.5">
                        
                        {/* Row 1: Search Bar + Filter Trigger Button + Live Counter */}
                        <div className="flex items-center gap-2">
                          {/* Search Input */}
                          <div className="relative flex-1 group">
                            <div className="relative flex items-center bg-slate-50 focus-within:bg-white rounded-xl border border-rose-200/80 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20 transition-all shadow-2xs">
                              <div className="pl-3 text-rose-600 flex items-center justify-center shrink-0">
                                <Search size={15} />
                              </div>
                              <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search flowers, cakes, hampers, photo gifts..."
                                className="w-full bg-transparent py-2 pl-2.5 pr-8 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
                              />
                              {searchQuery && (
                                <button
                                  type="button"
                                  onClick={() => setSearchQuery('')}
                                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 hover:bg-rose-100 text-slate-500 hover:text-rose-700 flex items-center justify-center transition-colors cursor-pointer"
                                  aria-label="Clear search"
                                >
                                  <X size={11} />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Filter Trigger Button with Active Count Badge */}
                          <button
                            type="button"
                            onClick={() => setIsFilterDrawerOpen(true)}
                            className={`h-9 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-all cursor-pointer shadow-xs ${
                              activeFiltersCount > 0
                                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-rose-600/20'
                                : 'bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200/80'
                            }`}
                            title="Open Filters Drawer"
                          >
                            <SlidersHorizontal size={13} />
                            <span className="hidden xs:inline">Filters</span>
                            {activeFiltersCount > 0 && (
                              <span className="w-4 h-4 rounded-full bg-white text-rose-700 text-[10px] font-black flex items-center justify-center shadow-xs">
                                {activeFiltersCount}
                              </span>
                            )}
                          </button>

                          {/* Result Count Badge */}
                          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold shrink-0">
                            <span>{filteredProducts.length}</span>
                            <span className="text-[10px] text-slate-400 uppercase">Gifts</span>
                          </div>
                        </div>

                        {/* Row 2: Horizontal Quick Filter & Trending Keywords Rail */}
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
                          {/* Active Filters Clear Button if any */}
                          {activeFiltersCount > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedBudget('all');
                                setActiveOccasion('all');
                                setActiveCategory('all');
                                setActiveRecipient('all');
                                setSearchQuery('');
                                setSortBy('popular');
                              }}
                              className="px-2.5 py-1 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                            >
                              <RotateCcw size={10} />
                              <span>Reset</span>
                            </button>
                          )}

                          {/* Quick Budget Chips */}
                          {[
                            { id: 'under-500', label: 'Under ₹500', emoji: '🏷️' },
                            { id: '500-1000', label: '₹500 - ₹1k', emoji: '⭐' },
                            { id: '1000-2500', label: '₹1k - ₹2.5k', emoji: '💎' }
                          ].map((b) => (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => setSelectedBudget(selectedBudget === b.id ? 'all' : b.id)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 shrink-0 transition-all border cursor-pointer ${
                                selectedBudget === b.id
                                  ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                                  : 'bg-white text-slate-700 hover:bg-rose-50 border-slate-200/80'
                              }`}
                            >
                              <span>{b.emoji}</span>
                              <span>{b.label}</span>
                            </button>
                          ))}

                          <div className="w-px h-4 bg-slate-200 shrink-0" />

                          {/* Quick Occasion Chips */}
                          {[
                            { id: 'birthday', label: 'Birthday', emoji: '🎂' },
                            { id: 'anniversary', label: 'Anniversary', emoji: '💍' },
                            { id: 'love', label: 'Romance', emoji: '💖' }
                          ].map((o) => (
                            <button
                              key={o.id}
                              type="button"
                              onClick={() => setActiveOccasion(activeOccasion === o.id ? 'all' : o.id)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 shrink-0 transition-all border cursor-pointer ${
                                activeOccasion === o.id
                                  ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                                  : 'bg-white text-slate-700 hover:bg-purple-50 border-slate-200/80'
                              }`}
                            >
                              <span>{o.emoji}</span>
                              <span>{o.label}</span>
                            </button>
                          ))}

                          <div className="w-px h-4 bg-slate-200 shrink-0" />

                          {/* Quick Category Chips */}
                          {[
                            { id: 'flowers', label: 'Flowers', emoji: '🌸' },
                            { id: 'cakes', label: 'Cakes', emoji: '🎂' },
                            { id: 'personalized', label: 'Personalized', emoji: '🖼️' },
                            { id: 'hampers', label: 'Hampers', emoji: '🧺' }
                          ].map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => setActiveCategory(activeCategory === c.id ? 'all' : c.id)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 shrink-0 transition-all border cursor-pointer ${
                                activeCategory === c.id
                                  ? 'bg-rose-700 text-white border-rose-700 shadow-2xs'
                                  : 'bg-white text-slate-700 hover:bg-rose-50 border-slate-200/80'
                              }`}
                            >
                              <span>{c.emoji}</span>
                              <span>{c.label}</span>
                            </button>
                          ))}

                          <div className="w-px h-4 bg-slate-200 shrink-0" />

                          {/* Quick Sort Trigger */}
                          <button
                            type="button"
                            onClick={() => setIsFilterDrawerOpen(true)}
                            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center gap-1 shrink-0 cursor-pointer border border-slate-200"
                          >
                            <ArrowUpDown size={11} className="text-slate-500" />
                            <span>{sortBy === 'price-asc' ? 'Price: Low' : sortBy === 'price-desc' ? 'Price: High' : sortBy === 'rating' ? 'Rating' : 'Popular'}</span>
                          </button>
                        </div>
                      </div>

                      {/* GORGEOUS FILTER & PERSONALIZATION BOTTOM SHEET DRAWER */}
                      <AnimatePresence>
                        {isFilterDrawerOpen && (
                          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
                            {/* Backdrop */}
                            <div className="absolute inset-0" onClick={() => setIsFilterDrawerOpen(false)} />

                            {/* Modal Dialog */}
                            <motion.div
                              initial={{ y: '100%', opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: '100%', opacity: 0 }}
                              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                              className="relative z-10 w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 max-h-[88vh] overflow-y-auto text-slate-900"
                            >
                              {/* Drag Handle */}
                              <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto sm:hidden -mt-1 mb-2" />

                              {/* Header */}
                              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-700 text-white flex items-center justify-center shadow-sm">
                                    <SlidersHorizontal size={16} />
                                  </div>
                                  <div>
                                    <h3 className="font-extrabold text-base text-slate-900">
                                      Filter &amp; Refine Gifts
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                      Tailor budget, occasion, category &amp; sorting
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] font-black text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full">
                                    {filteredProducts.length} Matches
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setIsFilterDrawerOpen(false)}
                                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                                  >
                                    <X size={18} />
                                  </button>
                                </div>
                              </div>

                              {/* 1. Budget Filter Section */}
                              <div className="space-y-2">
                                <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                  <span>💰 Budget / Price Range</span>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                  {[
                                    { id: 'all', label: 'All Budgets (Any Price)', emoji: '✨' },
                                    { id: 'under-500', label: 'Under ₹500 (Budget)', emoji: '🏷️' },
                                    { id: '500-1000', label: '₹500 - ₹1,000 (Popular)', emoji: '⭐' },
                                    { id: '1000-2500', label: '₹1,000 - ₹2,500 (Premium)', emoji: '💎' },
                                    { id: 'above-2500', label: 'Above ₹2,500 (Luxury)', emoji: '👑' }
                                  ].map((b) => (
                                    <button
                                      key={b.id}
                                      type="button"
                                      onClick={() => setSelectedBudget(b.id)}
                                      className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border flex items-center justify-between cursor-pointer ${
                                        selectedBudget === b.id
                                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                                      }`}
                                    >
                                      <span className="truncate">{b.emoji} {b.label}</span>
                                      {selectedBudget === b.id && <Check size={13} className="shrink-0 stroke-[3]" />}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* 2. Occasion Filter Section */}
                              <div className="space-y-2">
                                <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                  <span>🎉 Occasion Celebration</span>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                  {[
                                    { id: 'all', label: 'All Occasions', emoji: '🎁' },
                                    { id: 'birthday', label: 'Birthday Celebrations', emoji: '🎂' },
                                    { id: 'anniversary', label: 'Anniversary & Romance', emoji: '💍' },
                                    { id: 'love', label: 'I Love You', emoji: '💖' },
                                    { id: 'congratulations', label: 'Congratulations', emoji: '🎊' },
                                    { id: 'festive', label: 'Festive & Blessings', emoji: '🪔' },
                                    { id: 'thank-you', label: 'Thank You', emoji: '🙏' },
                                    { id: 'get-well', label: 'Get Well Soon', emoji: '🌿' }
                                  ].map((o) => (
                                    <button
                                      key={o.id}
                                      type="button"
                                      onClick={() => setActiveOccasion(o.id)}
                                      className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border flex items-center justify-between cursor-pointer ${
                                        activeOccasion === o.id
                                          ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                                      }`}
                                    >
                                      <span className="truncate">{o.emoji} {o.label}</span>
                                      {activeOccasion === o.id && <Check size={13} className="shrink-0 stroke-[3]" />}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* 3. Gift Type / Category Filter Section */}
                              <div className="space-y-2">
                                <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                  <span>🎁 Category / Gift Type</span>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                  {[
                                    { id: 'all', label: 'All Gift Types', emoji: '✨' },
                                    { id: 'flowers', label: 'Flowers & Bouquets', emoji: '🌸' },
                                    { id: 'cakes', label: 'Cakes & Bakery', emoji: '🎂' },
                                    { id: 'personalized', label: 'Personalized Keepsakes', emoji: '🖼️' },
                                    { id: 'hampers', label: 'Gourmet Hampers', emoji: '🧺' },
                                    { id: 'chocolates', label: 'Artisan Chocolates', emoji: '🍫' },
                                    { id: 'plants', label: 'Plants & Bonsai', emoji: '🪴' },
                                    { id: 'toys', label: 'Toys & Plush', emoji: '🧸' }
                                  ].map((c) => (
                                    <button
                                      key={c.id}
                                      type="button"
                                      onClick={() => setActiveCategory(c.id)}
                                      className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border flex items-center justify-between cursor-pointer ${
                                        activeCategory === c.id
                                          ? 'bg-rose-700 text-white border-rose-800 shadow-xs'
                                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                                      }`}
                                    >
                                      <span className="truncate">{c.emoji} {c.label}</span>
                                      {activeCategory === c.id && <Check size={13} className="shrink-0 stroke-[3]" />}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* 4. Sort By Section */}
                              <div className="space-y-2">
                                <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                  <span>⚡ Sort Catalog</span>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                  {[
                                    { id: 'popular', label: 'Most Popular & Loved', emoji: '⭐' },
                                    { id: 'price-asc', label: 'Price: Low to High', emoji: '💰' },
                                    { id: 'price-desc', label: 'Price: High to Low', emoji: '💎' },
                                    { id: 'rating', label: 'Highest Rated', emoji: '✨' },
                                    { id: 'newest', label: 'Newest Arrivals', emoji: '🆕' }
                                  ].map((s) => (
                                    <button
                                      key={s.id}
                                      type="button"
                                      onClick={() => setSortBy(s.id)}
                                      className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border flex items-center justify-between cursor-pointer ${
                                        sortBy === s.id
                                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                                      }`}
                                    >
                                      <span className="truncate">{s.emoji} {s.label}</span>
                                      {sortBy === s.id && <Check size={13} className="shrink-0 stroke-[3]" />}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Bottom Sticky Action Bar */}
                              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 sticky bottom-0 bg-white">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedBudget('all');
                                    setActiveOccasion('all');
                                    setActiveCategory('all');
                                    setActiveRecipient('all');
                                    setSearchQuery('');
                                    setSortBy('popular');
                                  }}
                                  className="text-xs font-bold text-slate-500 hover:text-rose-700 underline cursor-pointer"
                                >
                                  Reset All
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setIsFilterDrawerOpen(false)}
                                  className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-600 text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                  <span>Show {filteredProducts.length} Matching Gifts</span>
                                  <Check size={15} />
                                </button>
                              </div>
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>
                    </>
                  );
                })()}

                {/* Section Header */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-slate-900 tracking-tight">
                      {activeCategory === 'all' && activeOccasion === 'all' && activeRecipient === 'all' && selectedBudget === 'all' && !searchQuery
                        ? 'Most Loved This Month'
                        : activeCategory !== 'all'
                          ? CATEGORY_TILES.find(c => c.id === activeCategory)?.title || 'Collections'
                          : activeOccasion !== 'all'
                            ? `${activeOccasion.charAt(0).toUpperCase() + activeOccasion.slice(1)} Gifts`
                            : activeRecipient !== 'all'
                              ? `Gifts ${activeRecipient === 'him' ? 'For Him' : activeRecipient === 'her' ? 'For Her' : activeRecipient === 'couples' ? 'For Couples' : activeRecipient === 'parents' ? 'For Parents' : 'For Kids'}`
                              : selectedBudget !== 'all'
                                ? `Gifts ${selectedBudget === 'under-500' ? 'Under ₹500' : selectedBudget === '500-1000' ? '₹500 - ₹1,000' : selectedBudget === '1000-2500' ? '₹1,000 - ₹2,500' : 'Above ₹2,500'}`
                                : 'Search Results'
                      }
                      {activeOccasion !== 'all' && activeCategory !== 'all' && <span className="font-sans text-rose-700 text-sm sm:text-base font-bold ml-1.5 sm:ml-2">({activeOccasion.toUpperCase()})</span>}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">Handcrafted with premium ingredients &amp; 100% freshness guarantee</p>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-rose-800 bg-rose-50 border border-rose-200/80 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shrink-0">
                    {filteredProducts.length} Gifts
                  </span>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-14 text-center border border-rose-100/90 shadow-sm space-y-4 max-w-lg mx-auto my-8">
                    <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mx-auto text-2xl shadow-inner">
                      <Search size={28} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-xl text-slate-900">No Matching Gifts Found</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        We couldn't find any gifts matching your search criteria. Try adjusting your keywords or exploring all luxury collections.
                      </p>
                    </div>
                    <button
                      onClick={() => { setSearchQuery(''); setActiveCategory('all'); setActiveOccasion('all'); setActiveRecipient('all'); }}
                      className="bg-rose-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-rose-800 transition-colors shadow-md cursor-pointer inline-flex items-center gap-2"
                    >
                      <RotateCcw size={14} />
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                    {displayedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelectProduct={handleSelectProduct}
                        isFavourite={favourites.some(f => f.id === product.id)}
                        onToggleFavourite={handleToggleFavourite}
                      />
                    ))}
                  </div>
                )}

                {/* SEO-Friendly Pagination matching Screenshot 3 */}
                {filteredProducts.length > 0 && (
                  <Pagination
                    currentPage={productPage}
                    totalPages={totalProductPages}
                    onPageChange={handleProductPageChange}
                    baseUrl=""
                  />
                )}
              </section>

              {/* ===== 4 DEDICATED SHOWCASES (Reference Screenshot 5) ===== */}
              {!searchQuery && activeCategory === 'all' && activeOccasion === 'all' && activeRecipient === 'all' && (
                <div className="space-y-2 mt-4">
                  {/* 1. Flowers Showcase */}
                  <DedicatedShowcase
                    title="Flowers That Speak for You"
                    subtitle="Freshly crafted surprises for every moment worth celebrating"
                    subcategories={FLOWER_SUBCATS}
                    products={flowerProducts}
                    activeSubcat={activeFlowerSubcat}
                    onSelectSubcat={(subId) => setActiveFlowerSubcat(activeFlowerSubcat === subId ? null : subId)}
                    onViewAll={() => {
                      setActiveCategory('flowers');
                      shopRef.current?.querySelector('#product-grid')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onSelectProduct={(p) => router.push(`/product/${p.id}`)}
                    favourites={favourites}
                    onToggleFavourite={handleToggleFavourite}
                    viewAllLabel="View All Flowers"
                  />

                  {/* 2. Cakes Showcase */}
                  <DedicatedShowcase
                    title="Cakes Baked with Love & Delight"
                    subtitle="Handcrafted gourmet confections for memorable celebrations"
                    subcategories={CAKE_SUBCATS}
                    products={cakeProducts}
                    activeSubcat={activeCakeSubcat}
                    onSelectSubcat={(subId) => setActiveCakeSubcat(activeCakeSubcat === subId ? null : subId)}
                    onViewAll={() => {
                      setActiveCategory('cakes');
                      shopRef.current?.querySelector('#product-grid')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onSelectProduct={(p) => router.push(`/product/${p.id}`)}
                    favourites={favourites}
                    onToggleFavourite={handleToggleFavourite}
                    viewAllLabel="View All Cakes"
                  />

                  {/* 3. Personalised / Handcrafted Memories Showcase */}
                  <DedicatedShowcase
                    title="Handcrafted Memories & Personalised Gifts"
                    subtitle="Turn your cherished moments into bespoke personalized treasures"
                    subcategories={PERSONALIZED_SUBCATS}
                    products={personalizedProducts}
                    activeSubcat={activePersonalizedSubcat}
                    onSelectSubcat={(subId) => setActivePersonalizedSubcat(activePersonalizedSubcat === subId ? null : subId)}
                    onViewAll={() => {
                      setActiveCategory('personalized');
                      shopRef.current?.querySelector('#product-grid')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onSelectProduct={(p) => router.push(`/product/${p.id}`)}
                    favourites={favourites}
                    onToggleFavourite={handleToggleFavourite}
                    viewAllLabel="View All Keepsakes"
                  />

                  {/* 4. Hampers & Specialty Gifts Showcase */}
                  <DedicatedShowcase
                    title="Curated Hampers & Specialty Surprises"
                    subtitle="Lavish artisan hampers, Belgian chocolates, plush toys & smart gadgets"
                    subcategories={HAMPER_SUBCATS}
                    products={hamperProducts}
                    activeSubcat={activeHamperSubcat}
                    onSelectSubcat={(subId) => setActiveHamperSubcat(activeHamperSubcat === subId ? null : subId)}
                    onViewAll={() => {
                      setActiveCategory('hampers');
                      shopRef.current?.querySelector('#product-grid')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onSelectProduct={(p) => router.push(`/product/${p.id}`)}
                    favourites={favourites}
                    onToggleFavourite={handleToggleFavourite}
                    viewAllLabel="View All Hampers & Gifts"
                  />
                </div>
              )}

              {/* ===== DEALS BANNER (improved with countdown) ===== */}
              {(activeCategory === 'all' || activeCategory === 'deals') && !searchQuery && deals.length > 0 && (
                <section className="px-3.5 sm:px-6 md:px-10 pt-6">
                  <div className="bg-gradient-to-br from-rose-950 via-rose-900 to-slate-950 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-rose-800/40 relative">
                    {/* Floating accent */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                      <div className="space-y-3 text-center md:text-left max-w-xl">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[9px] sm:text-[10px] font-bold border border-amber-400/30">
                            <Sparkles size={10} className="text-amber-400" />
                            COUTURE SELECTION OF THE SEASON
                          </div>
                          {cutoffTime && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold">
                              <Clock size={11} className="text-emerald-400" />
                              Same-Day Cutoff: <span className="font-mono font-black">{cutoffTime}</span>
                            </div>
                          )}
                        </div>

                        <h2 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-white leading-tight">
                          {deals[0].name}
                        </h2>
                        <p className="text-xs text-rose-100/85 leading-relaxed">
                          Hand-curated with fresh premium blooms, Belgium chocolates, and personalized gold-stamped card.
                        </p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 pt-1">
                          <div className="text-left">
                            <p className="text-[9px] uppercase font-bold text-rose-300 tracking-wider">Special Price</p>
                            <div className="flex items-baseline gap-1.5 sm:gap-2">
                              <span className="font-serif font-bold text-2xl sm:text-3xl text-amber-300">₹{deals[0].price}</span>
                              <span className="text-xs text-rose-300/60 line-through">₹{deals[0].original}</span>
                              <span className="bg-amber-400 text-slate-950 text-[9px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded uppercase">
                                {deals[0].discount}
                              </span>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => handleAddToCart(products.find(p => p.id === deals[0].id) || products[0], { label: deals[0].variant, price: deals[0].price, original: deals[0].original }, 'Special')}
                            className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 sm:px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-950/40 flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Gift size={14} />
                            Order Special Gift
                          </motion.button>
                        </div>
                      </div>

                      <div className="w-full sm:w-60 lg:w-64 h-36 sm:h-44 rounded-2xl overflow-hidden shadow-2xl border border-rose-700/50 shrink-0 relative group">
                        <img src={deals[0].img} alt={deals[0].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md text-white text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                          ⚡ Express 2-Hour Delivery
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* ===== SHOP BY RECIPIENT TILES (High-Res Images replacing Emojis) ===== */}
              {!searchQuery && (
                <section className="px-3.5 sm:px-6 md:px-10 pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Heart size={16} className="text-rose-600" />
                      <h2 className="font-serif font-bold text-lg sm:text-xl text-slate-900">Who are you gifting for?</h2>
                      <span className="text-xs text-slate-400 font-medium hidden sm:inline">Thoughtful selections tailored for everyone</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2 sm:gap-3.5">
                      {[
                        { 
                          id: 'her', 
                          label: 'For Her', 
                          sub: 'Gourmet chocolates & flowers',
                          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop'
                        },
                        { 
                          id: 'him', 
                          label: 'For Him', 
                          sub: 'Watches, gadgets & grooming',
                          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop'
                        },
                        { 
                          id: 'couples', 
                          label: 'Couples', 
                          sub: 'Keepsakes & romantic treats',
                          image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&auto=format&fit=crop'
                        },
                        { 
                          id: 'parents', 
                          label: 'Parents', 
                          sub: 'Health hampers & blessings',
                          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop'
                        },
                        { 
                          id: 'kids', 
                          label: 'Kids', 
                          sub: 'Plush toys & sweets',
                          image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=500&auto=format&fit=crop'
                        },
                      ].map((rec) => {
                        const isSelected = activeRecipient === rec.id;
                        return (
                          <motion.button
                            key={rec.id}
                            whileHover={{ y: -3, scale: 1.02 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => {
                              setActiveRecipient(isSelected ? 'all' : rec.id);
                              shopRef.current?.querySelector('#product-grid')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`group rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col text-left ${
                              isSelected
                                ? 'border-rose-600 bg-rose-50/80 shadow-md ring-2 ring-rose-500/20'
                                : 'border-rose-100/80 bg-white hover:border-rose-300 hover:shadow-md'
                            }`}
                          >
                            <div className="relative aspect-square w-full overflow-hidden bg-rose-50">
                              <img
                                src={rec.image}
                                alt={rec.label}
                                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="p-1.5 sm:p-2.5 text-center">
                              <span className={`text-[10px] sm:text-xs font-black tracking-tight block ${
                                isSelected ? 'text-rose-900 font-extrabold' : 'text-slate-800'
                              }`}>
                                {rec.label}
                              </span>
                              <span className="text-[8px] sm:text-[9px] text-slate-500 font-medium hidden sm:block">
                                {rec.sub}
                              </span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </section>
              )}

              {/* Newsletter / VIP Club Banner */}
              {activeCategory === 'all' && !searchQuery && (
                <section className="px-3.5 sm:px-6 md:px-10 pt-6">
                  <div className="bg-gradient-to-br from-rose-50 to-amber-50/60 rounded-3xl p-6 sm:p-8 border border-rose-200/70 shadow-sm text-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center mx-auto text-3xl shadow-inner border border-rose-200/60">
                      👑
                    </div>
                    <div className="space-y-1 max-w-md mx-auto">
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">Unlock Exclusive Luxury Offers</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Join the GiftPortal Privilège Club for priority midnight delivery slots, exclusive 15% off your first order, and early access to new collections.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] text-slate-600 font-bold">
                      {['✅ 15% Off First Order', '⚡ Priority Midnight Slots', '🎁 Early Collection Access'].map(b => (
                        <span key={b} className="flex items-center gap-1">{b}</span>
                      ))}
                    </div>
                    <div className="flex gap-2 max-w-sm mx-auto">
                      <input
                        type="email"
                        placeholder="Your email address..."
                        className="flex-1 border border-rose-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 bg-white"
                      />
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-rose-700 hover:bg-rose-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer transition-colors shrink-0"
                      >
                        <ArrowRight size={14} />
                        Join Club
                      </motion.button>
                    </div>
                  </div>
                </section>
              )}

            </div>

          ) : !user ? (

            /* Guest / Signed-Out Customer Privilège Access Gateway */
            <div className="px-3.5 sm:px-6 md:px-10 py-10 sm:py-16 max-w-3xl mx-auto">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-xl text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-700 via-amber-400 to-rose-700" />
                
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-rose-50 to-amber-50 text-rose-700 rounded-3xl flex items-center justify-center mx-auto text-3xl sm:text-4xl shadow-md border border-rose-200/60">
                  🎁
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-100 inline-block">
                    Privilège Club Access
                  </span>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                    Sign In to Access Your Orders & Wishlist
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Track your live express orders, manage your saved gift wishlist, and access saved doorstep addresses for 1-click checkout.
                  </p>
                </div>

                {/* 3 Privilège Perks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                  <div className="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100/80 space-y-1">
                    <Package size={18} className="text-rose-600" />
                    <p className="font-bold text-xs text-slate-900">Live Order Tracking</p>
                    <p className="text-[11px] text-slate-500">Real-time status updates & express courier dispatch.</p>
                  </div>
                  <div className="p-3.5 bg-amber-50/50 rounded-2xl border border-amber-100/80 space-y-1">
                    <Heart size={18} className="text-rose-600" />
                    <p className="font-bold text-xs text-slate-900">Saved Wishlist</p>
                    <p className="text-[11px] text-slate-500">Curate luxury bouquets & bespoke hampers for occasions.</p>
                  </div>
                  <div className="p-3.5 bg-indigo-50/50 rounded-2xl border border-indigo-100/80 space-y-1">
                    <MapPin size={18} className="text-indigo-600" />
                    <p className="font-bold text-xs text-slate-900">Saved Destinations</p>
                    <p className="text-[11px] text-slate-500">1-click express checkout across 100+ metro cities.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-800 hover:to-slate-950 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-900/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <User size={15} />
                    <span>Sign In to Your Account</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('shop')}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Continue Browsing Gifts
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Logged-in Customer Privilège Suite (Orders, Wishlist, Addresses, Account) */
            <div className="px-3.5 sm:px-6 md:px-10 py-6 sm:py-8 max-w-6xl mx-auto space-y-6 sm:space-y-8">
              
              {/* Dashboard Nav Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-rose-100 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1.5">
                    <button 
                      onClick={() => setActiveTab('shop')} 
                      className="hover:text-rose-700 transition-colors flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <span>Marketplace</span>
                    </button>
                    <ChevronRight size={12} className="text-slate-400" />
                    <span className="text-rose-700 font-bold">Privilège Suite</span>
                    <ChevronRight size={12} className="text-slate-400" />
                    <span className="text-slate-900 capitalize font-bold">
                      {activeProfileTab === 'favourites' ? 'Wishlist' : activeProfileTab === 'address' ? 'Saved Addresses' : activeProfileTab === 'profile' ? 'Account' : 'My Orders'}
                    </span>
                  </div>
                  <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight leading-normal">
                    Customer Privilège Suite
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage your orders, live express tracking, saved addresses, and wishlisted gifts.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
                  {[
                    { id: 'orders', label: 'My Orders', icon: Package, count: orders.length },
                    { id: 'favourites', label: 'Wishlist', icon: Heart, count: favourites.length },
                    { id: 'address', label: 'Saved Addresses', icon: MapPin, count: addresses.length },
                    { id: 'profile', label: 'My Account', icon: UserCircle }
                  ].map((sub) => {
                    const isSelected = activeProfileTab === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setActiveProfileTab(sub.id)}
                        className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-rose-700 text-white shadow-md'
                            : 'bg-white text-slate-600 hover:bg-rose-50 border border-rose-100'
                        }`}
                      >
                        <sub.icon size={14} className={isSelected ? 'text-amber-300' : 'text-rose-600'} />
                        <span>{sub.label}</span>
                        {typeof sub.count === 'number' && sub.count > 0 && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                            isSelected ? 'bg-amber-400 text-slate-950' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {sub.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 1. ORDERS TAB */}
              {activeProfileTab === 'orders' && (
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center border border-rose-100 space-y-4 shadow-sm">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto text-2xl">
                        🛍️
                      </div>
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">No active orders yet</h3>
                      <p className="text-xs text-slate-500">Explore our couture collections and surprise your loved ones!</p>
                      <button
                        onClick={() => setActiveTab('shop')}
                        className="bg-rose-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => {
                        const isCancelled = order.status === 'Cancelled' || order.stage === 'cancelled' || order.status === 'Rejected';
                        const isDelivered = order.status === 'Delivered';
                        const isInTransit = order.status === 'In Transit' || order.status === 'Out for Delivery' || order.status === 'Shipped';
                        const isPreparing = order.status === 'Accepted' || order.status === 'Preparing' || order.status === 'Ready for Pickup';
                        const currentStepIdx = isDelivered ? 3 : isInTransit ? 2 : isPreparing ? 1 : 0;
                        const logisticsInfo = getOrderLogisticsInfo ? getOrderLogisticsInfo(order) : { isIndore: true, city: 'Indore' };
                        const isIndore = logisticsInfo.isIndore;
                        const destCity = order.recipient?.city || order.address?.city || order.city || logisticsInfo.city;

                        return (
                          <div key={order.id} className="bg-white rounded-3xl p-5 sm:p-7 border border-rose-100/90 shadow-sm hover:shadow-md transition-all space-y-5">
                            
                            {/* 1. Header: Order ID, Gifting Badge, Logistics Badge, Timestamp, Status */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-serif font-black text-xs sm:text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200">
                                    Order #{order.id}
                                  </span>
                                  {order.orderType === 'gift' || order.isGift ? (
                                    <span className="text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-800 px-3 py-1 rounded-xl border border-purple-200 flex items-center gap-1.5">
                                      <Gift size={12} className="text-purple-600" />
                                      <span>🎁 Gifting to {order.recipient?.name || order.recipientName || 'Recipient'}</span>
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-3 py-1 rounded-xl border border-slate-200 flex items-center gap-1.5">
                                      <ShoppingBag size={12} className="text-slate-500" />
                                      <span>🛍️ Personal Luxe Order</span>
                                    </span>
                                  )}

                                  {/* Logistics Mode Badge */}
                                  {isIndore ? (
                                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-xl border border-emerald-300 flex items-center gap-1 shadow-2xs">
                                      <Zap size={11} className="text-emerald-700 fill-emerald-600" />
                                      <span>⚡ Indore Local Express (1-2 Days • 90% Same Day)</span>
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-900 px-2.5 py-1 rounded-xl border border-blue-300 flex items-center gap-1 shadow-2xs">
                                      <Truck size={11} className="text-blue-700" />
                                      <span>📦 Domestic Courier Shipment: {destCity}</span>
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80 w-fit">
                                  <Calendar size={13} className="text-rose-600 shrink-0" />
                                  <span>
                                    Placed On: <strong className="text-slate-900">{new Date(order.timestamp || order.createdAt || Date.now()).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</strong> at <strong className="text-slate-900">{new Date(order.timestamp || order.createdAt || Date.now()).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</strong>
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 flex-wrap">
                                {!isDelivered && !isCancelled && (order.dropOtp || order.deliveryOtp) && (
                                  <div className="bg-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs border border-emerald-500 animate-in fade-in">
                                    <Key size={12} className="text-emerald-200" />
                                    <span className="text-[10px] font-black uppercase tracking-wider">Drop OTP:</span>
                                    <span className="font-mono font-black text-sm tracking-widest text-emerald-100">{order.dropOtp || order.deliveryOtp}</span>
                                  </div>
                                )}
                                <span className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-2xs ${
                                  isCancelled
                                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                    : isDelivered
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : isInTransit
                                    ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                                    : 'bg-rose-100 text-rose-800 border border-rose-200'
                                }`}>
                                  <span className="w-2 h-2 rounded-full bg-current" />
                                  <span>
                                    {isCancelled
                                      ? 'Order Cancelled'
                                      : order.reassignmentNeeded
                                      ? 'Processing & Partner Assignment'
                                      : (order.status || 'Order Confirmed')}
                                  </span>
                                </span>
                              </div>
                            </div>

                            {isCancelled ? (
                              /* MASTER ADMIN CANCELLATION & SINCERE APOLOGY CARD */
                              <div className="bg-rose-50/90 border-2 border-rose-300 p-5 sm:p-6 rounded-3xl space-y-4 shadow-sm animate-in fade-in duration-300">
                                <div className="flex items-start gap-3.5">
                                  <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/20 shrink-0">
                                    <XCircle size={26} />
                                  </div>
                                  <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h4 className="text-base sm:text-lg font-black text-rose-950 tracking-tight">
                                        Order Cancelled — We Sincerely Apologize!
                                      </h4>
                                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-200 text-rose-900 border border-rose-300">
                                        100% Refund Initiated
                                      </span>
                                    </div>
                                    <p className="text-xs text-rose-900/90 leading-relaxed font-medium">
                                      {order.apologyMessage || `Dear ${order.customer || 'Valued Customer'}, we sincerely apologize, but your Order #${order.id} could not be fulfilled as no partner vendor is available in your delivery area. We have initiated a 100% full refund to your original payment method. We deeply regret this inconvenience!`}
                                    </p>
                                  </div>
                                </div>

                                {/* 100% Refund Details Strip */}
                                <div className="bg-white rounded-2xl p-4 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black shrink-0">
                                      ✓
                                    </div>
                                    <div>
                                      <p className="font-black text-slate-900">
                                        100% Full Refund: <span className="text-emerald-700 font-extrabold text-sm">₹{Number(order.total || 0).toLocaleString('en-IN')}</span>
                                      </p>
                                      <p className="text-[11px] text-slate-500">
                                        Refund has been initiated to your original payment method ({order.paymentMethod || 'Prepaid UPI / Card'}). Estimated arrival: 24-48 business hours.
                                      </p>
                                    </div>
                                  </div>

                                  <a
                                    href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi GiftPortal Concierge, I need assistance regarding my cancelled Order #${order.id}.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs shrink-0"
                                  >
                                    <MessageCircle size={14} />
                                    <span>Chat with Priority Support</span>
                                  </a>
                                </div>
                              </div>
                            ) : (
                              <>

                            {/* 2. Highlighted Scheduled Delivery Requirement */}
                            <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border-2 border-amber-400/90 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 text-white flex items-center justify-center shadow-xs shrink-0">
                                  <Calendar size={18} />
                                </div>
                                <div>
                                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 flex items-center gap-1">
                                    <Clock size={11} className="text-rose-700" /> Scheduled Delivery Commitment:
                                  </span>
                                  <p className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">
                                    Deliver On: <span className="text-rose-700 underline underline-offset-2 font-extrabold">{order.cart?.[0]?.deliveryDate || order.recipient?.deliveryDate || order.deliveryDate || 'Today'}</span>
                                    <span className="text-slate-400 mx-1.5">•</span>
                                    Slot: <span className="text-amber-950 bg-amber-100/90 px-2 py-0.5 rounded-md font-bold">{order.cart?.[0]?.slotLabel || order.recipient?.deliverySlot || order.deliverySlot || 'Standard Delivery (9:00 AM - 9:00 PM)'}</span>
                                  </p>
                                </div>
                              </div>
                              <div className="self-start sm:self-center">
                                <span className="text-[10px] font-black uppercase tracking-wider bg-white text-emerald-700 border border-emerald-300 px-3 py-1 rounded-xl flex items-center gap-1 shadow-2xs">
                                  <CheckCircle size={12} className="text-emerald-600" /> Express Dispatch Guaranteed
                                </span>
                              </div>
                            </div>

                            {/* 3. Live Order Tracking Stepper */}
                            <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-3">
                              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-500">
                                <span>{isIndore ? 'Local Express Journey' : 'Domestic Courier Delivery Journey'}</span>
                                <span className="text-rose-700 font-extrabold">
                                  {isDelivered ? 'Gift Delivered 🎉' : (isIndore ? 'Live Indore Express Fulfillment' : `Shipping to ${destCity}`)}
                                </span>
                              </div>
                              
                              <div className="relative flex items-center justify-between pt-1">
                                {/* Track bar */}
                                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 rounded-full z-0">
                                  <div 
                                    className="h-full bg-gradient-to-r from-rose-700 to-emerald-600 rounded-full transition-all duration-700" 
                                    style={{ width: `${(currentStepIdx / 3) * 100}%` }}
                                  />
                                </div>

                                {(isIndore ? [
                                  { label: 'Confirmed', icon: CheckCircle },
                                  { label: 'Crafting', icon: Sparkles },
                                  { label: 'Out for Delivery', icon: Truck },
                                  { label: 'Delivered', icon: Award }
                                ] : [
                                  { label: 'Confirmed', icon: CheckCircle },
                                  { label: 'Packed & Handover', icon: Package },
                                  { label: 'Courier In Transit', icon: Truck },
                                  { label: 'Delivered', icon: Award }
                                ]).map((s, idx) => {
                                  const isCompleted = idx <= currentStepIdx;
                                  const isCurrent = idx === currentStepIdx;
                                  return (
                                    <div key={idx} className="relative z-10 flex flex-col items-center gap-1">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all shadow-xs ${
                                        isCompleted 
                                          ? 'bg-emerald-600 text-white shadow-emerald-500/30' 
                                          : 'bg-white text-slate-400 border-2 border-slate-200'
                                      } ${isCurrent ? 'ring-4 ring-emerald-100 scale-110' : ''}`}>
                                        <s.icon size={13} />
                                      </div>
                                      <span className={`text-[10px] font-bold tracking-tight ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                                        {s.label}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* 4. Logistics Fulfillment & Live Tracking Details */}
                            {!isIndore ? (
                              /* OUTSIDE INDORE: DOMESTIC COURIER LIVE TRACKING CARD */
                              <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-blue-800 shadow-md space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-900/80 pb-3">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                                      <Truck size={16} />
                                    </div>
                                    <div>
                                      <h4 className="text-xs font-black uppercase tracking-wider text-blue-300">
                                        Domestic Courier Consignment
                                      </h4>
                                      <p className="text-xs text-slate-300 font-medium">
                                        Shipping to <strong className="text-white">{destCity}</strong> via <strong className="text-blue-200">{order.logistics?.provider || 'Partner Courier Service'}</strong>
                                      </p>
                                    </div>
                                  </div>

                                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                                    isDelivered
                                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                      : order.logistics?.trackingId
                                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 animate-pulse'
                                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  }`}>
                                    {isDelivered ? '✓ Delivered' : (order.logistics?.trackingId ? 'Shipped & In Transit' : 'Package Being Prepared')}
                                  </span>
                                </div>

                                {order.logistics?.trackingId ? (
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                                    <div className="space-y-1">
                                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                                        Courier Tracking ID / AWB
                                      </span>
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono text-base font-black text-white tracking-widest bg-blue-950/80 px-3 py-1 rounded-lg border border-blue-700">
                                          {order.logistics.trackingId}
                                        </span>
                                        <button
                                          onClick={() => {
                                            navigator.clipboard.writeText(order.logistics.trackingId);
                                            alert('Tracking ID copied to clipboard: ' + order.logistics.trackingId);
                                          }}
                                          className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                                          title="Copy Tracking ID"
                                        >
                                          <Copy size={13} />
                                          <span className="hidden sm:inline">Copy</span>
                                        </button>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                      {order.logistics.trackingUrl ? (
                                        <a
                                          href={order.logistics.trackingUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
                                        >
                                          <span>Track On {order.logistics.provider || 'Courier'}</span>
                                          <ExternalLink size={13} />
                                        </a>
                                      ) : (
                                        <span className="text-xs text-slate-300 font-medium">
                                          Est. Delivery: <strong className="text-white">{order.logistics.estimatedDays || '3-5 Business Days'}</strong>
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-300 space-y-1">
                                    <p className="font-bold text-amber-300">📦 Your gift package is being prepared by our partner vendor.</p>
                                    <p className="text-[11px] text-slate-400">
                                      Once handed over to the courier partner, your live Tracking ID and tracking link will update here automatically.
                                    </p>
                                  </div>
                                )}
                              </div>
                            ) : (
                              /* INDORE LOCAL / SELF-PICKUP: DELIVERY HANDOVER DROP OTP SECURITY CARD */
                              !isDelivered && (order.dropOtp || order.deliveryOtp) && (
                                <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-400 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 shadow-sm">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="p-1.5 bg-emerald-600 text-white rounded-lg shadow-xs">
                                        <ShieldCheck size={16} />
                                      </span>
                                      <p className="text-xs font-black uppercase tracking-wider text-emerald-950">
                                        Doorstep Delivery Drop OTP
                                      </p>
                                      {order.logistics?.provider && (
                                        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
                                          {order.logistics.provider}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-emerald-800 font-medium">
                                      Share this Drop OTP with your delivery executive ({order.logistics?.driverName ? `${order.logistics.driverName} · ` : ''}{order.logistics?.provider || 'Rider'}) upon doorstep arrival to complete handover:
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2.5 self-start sm:self-center">
                                    <div className="bg-white border-2 border-emerald-500 font-mono font-black text-emerald-950 text-2xl sm:text-3xl px-5 py-2 rounded-2xl shadow-sm tracking-[0.25em]">
                                      {order.dropOtp || order.deliveryOtp}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const code = order.dropOtp || order.deliveryOtp;
                                        navigator.clipboard.writeText(code);
                                        alert(`Drop OTP copied to clipboard: ${code}`);
                                      }}
                                      className="p-2.5 bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-800 rounded-xl transition-all cursor-pointer shadow-2xs"
                                      title="Copy Drop OTP"
                                    >
                                      <Copy size={15} />
                                    </button>
                                  </div>
                                </div>
                              )
                            )}
                          </>
                        )}

                            {/* 5. Products Showcase with Real Images & Metadata */}
                            <div className="space-y-2.5">
                              <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                                Gift Packages ({order.cart?.length || 0}):
                              </p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {(order.cart || []).map((item, idx) => {
                                  const itemImg = item.img || item.image || item.personalization?.photoUrl || productMap[String(item.id)]?.img;
                                  return (
                                    <div key={idx} className="flex items-start gap-3.5 p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/90 hover:border-rose-300 transition-all shadow-2xs">
                                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-slate-200 relative shadow-xs">
                                        {itemImg ? (
                                          <img src={itemImg} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center text-2xl bg-rose-50">{item.emoji || '🎁'}</div>
                                        )}
                                        {item.qty > 1 && (
                                          <span className="absolute bottom-1 right-1 bg-slate-950/85 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
                                            ×{item.qty}
                                          </span>
                                        )}
                                      </div>

                                      <div className="min-w-0 flex-1 space-y-1">
                                        <div className="flex items-start justify-between gap-1">
                                          <h5 className="font-serif font-bold text-slate-900 text-xs sm:text-sm tracking-tight truncate">{item.name}</h5>
                                          <span className="font-serif font-extrabold text-xs text-rose-700 shrink-0">
                                            ₹{(item.price || 0) * (item.qty || 1)}
                                          </span>
                                        </div>

                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <span className="text-[9px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                                            {item.variantLabel || 'Standard'}
                                          </span>
                                          {item.deliveryDate && (
                                            <span className="text-[9px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                                              <Calendar size={9} /> {item.deliveryDate}
                                            </span>
                                          )}
                                          {item.slotLabel && (
                                            <span className="text-[9px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                                              <Clock size={9} /> {item.slotLabel}
                                            </span>
                                          )}
                                        </div>

                                        {/* Personalization Info */}
                                        {item.personalization?.customName && (
                                          <p className="text-[10px] text-purple-700 font-semibold truncate">
                                            ✏️ Engraved: "{item.personalization.customName}"
                                          </p>
                                        )}
                                        {item.personalization?.cardMessage && (
                                          <p className="text-[10px] text-purple-700 italic line-clamp-1">
                                            💌 Note: "{item.personalization.cardMessage}"
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* 6. Destination & Greeting Note Card */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                              {/* Destination Card */}
                              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5 text-xs shadow-2xs">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                                  <MapPin size={11} className="text-rose-600" /> Delivery Address
                                </p>
                                <p className="font-bold text-slate-900">
                                  {order.recipient?.name || order.customerName || order.address?.name || 'Customer'}
                                  <span className="text-slate-500 font-medium ml-1">
                                    ({order.recipient?.mobile || order.address?.phone || order.customerMobile || 'Verified Mobile'})
                                  </span>
                                </p>
                                <p className="text-slate-600 leading-relaxed">
                                  {[
                                    order.recipient?.street || order.address?.street,
                                    order.recipient?.area || order.address?.area,
                                    order.recipient?.society || order.address?.society
                                  ].filter(Boolean).join(', ') || 'Doorstep Delivery'}
                                </p>
                              </div>

                              {/* Gift Card Message Quote Box */}
                              {(order.recipient?.cardMessage || order.cardMessage) ? (
                                <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200/80 space-y-1.5 text-xs shadow-2xs">
                                  <p className="text-[10px] font-black uppercase tracking-widest text-purple-900 flex items-center gap-1">
                                    <Sparkles size={11} className="text-purple-600" /> Printed Gift Card Message
                                  </p>
                                  <p className="font-serif italic text-purple-950 text-xs leading-relaxed bg-white/90 p-2.5 rounded-xl border border-purple-100">
                                    "{order.recipient?.cardMessage || order.cardMessage}"
                                  </p>
                                </div>
                              ) : (
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-2 text-xs text-slate-500">
                                  <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                                  <span>Signature Handcrafted Luxury Packaging with Tamper-Evident Freshness Seal.</span>
                                </div>
                              )}
                            </div>

                            {/* 7. Pricing Summary & Highlighted Payment Mode Actions Bar */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-slate-100 gap-3">
                              <div className="flex items-center gap-4 text-xs flex-wrap">
                                <div className="space-y-0.5">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase">Total Paid:</span>
                                  <p className="font-serif font-black text-2xl text-rose-700 leading-none">₹{order.total}</p>
                                </div>

                                {/* Highlighted Payment Mode */}
                                <div className="space-y-0.5">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Payment Status:</span>
                                  {(order.paymentMethod === 'COD' || order.paymentMethod === 'Cash on Delivery') ? (
                                    <span className="px-3 py-1 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-900 font-black text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
                                      <span>💵 Cash on Delivery (Pay ₹{order.total} at Doorstep)</span>
                                    </span>
                                  ) : (
                                    <span className="px-3 py-1 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-emerald-800 font-black text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
                                      <CheckCircle size={13} className="text-emerald-600" />
                                      <span>💳 Paid Online via {order.paymentMethod || 'UPI'}</span>
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 flex-wrap">
                                {order.feedback ? (
                                  <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-xs shadow-2xs">
                                    <span className="text-amber-500 font-bold">★ {order.feedback.rating}/5</span>
                                    <span className="text-slate-600 truncate max-w-[160px] italic">"{order.feedback.text}"</span>
                                  </div>
                                ) : order.status === 'Delivered' ? (
                                  <button
                                    onClick={() => setRatingOrder(order)}
                                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                                  >
                                    <Star size={13} className="fill-current" />
                                    <span>Rate Experience</span>
                                  </button>
                                ) : (
                                  <button
                                    disabled
                                    title="Rate Experience unlocks after successful doorstep delivery & Drop OTP verification"
                                    className="bg-slate-100 border border-slate-200 text-slate-400 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-not-allowed select-none opacity-70"
                                  >
                                    <Star size={13} className="text-slate-300" />
                                    <span>Rate Experience (Active Post-Delivery)</span>
                                  </button>
                                )}

                                <button
                                  onClick={() => setActiveTab('shop')}
                                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                                >
                                  Browse More Gifts
                                </button>
                              </div>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* 2. WISHLIST TAB */}
              {activeProfileTab === 'favourites' && (
                <div className="space-y-4">
                  {favourites.length === 0 ? (
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center border border-rose-100 space-y-4 shadow-sm">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto text-2xl">
                        <Heart size={32} className="text-rose-500" />
                      </div>
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">Your wishlist is empty</h3>
                      <p className="text-xs text-slate-500">Save your favourite luxury flowers, hampers, and keepsakes here.</p>
                      <button
                        onClick={() => setActiveTab('shop')}
                        className="bg-rose-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
                      >
                        Explore Collections
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favourites.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl sm:rounded-3xl p-4 border border-rose-100 shadow-sm flex gap-4 items-center justify-between">
                          <div className="w-16 h-16 rounded-xl bg-rose-50 overflow-hidden shrink-0">
                            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-serif font-bold text-xs sm:text-sm text-slate-900 truncate">{item.name}</p>
                            <p className="text-xs font-extrabold text-rose-700 mt-0.5">₹{item.types?.[0]?.variants?.[0]?.price || item.price || 899}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => router.push(`/product/${item.id}`)}
                                className="bg-slate-950 hover:bg-rose-900 text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                View Gift
                              </button>
                              <button
                                onClick={() => handleToggleFavourite(item)}
                                className="text-slate-400 hover:text-rose-600 text-[10px] font-semibold transition-colors cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 3. ADDRESS BOOK TAB */}
              {activeProfileTab === 'address' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Saved Delivery Addresses ({addresses.length})
                    </p>
                    <button
                      onClick={() => {
                        setEditingAddress(null);
                        setIsAddressModalOpen(true);
                      }}
                      className="bg-rose-700 hover:bg-rose-800 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Add New Address</span>
                    </button>
                  </div>

                  {addresses.length === 0 ? (
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center border border-rose-100 space-y-4 shadow-sm">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto text-2xl">
                        <MapPin size={32} className="text-rose-500" />
                      </div>
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">No saved addresses yet</h3>
                      <p className="text-xs text-slate-500">Save delivery destinations for seamless, 1-click checkout.</p>
                      <button
                        onClick={() => {
                          setEditingAddress(null);
                          setIsAddressModalOpen(true);
                        }}
                        className="bg-rose-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
                      >
                        Add Your First Address
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {addresses.map((addr) => (
                        <div key={addr.id} className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-rose-100 shadow-sm space-y-3 relative">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-bold text-slate-900 text-sm">{addr.name}</p>
                                {addr.isDefault && (
                                  <span className="bg-emerald-50 text-emerald-800 text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-200">
                                    DEFAULT
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 font-semibold mt-0.5">{addr.phone}</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  setEditingAddress(addr);
                                  setIsAddressModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                                title="Edit"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteAddress(addr.id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            {addr.street}, {addr.area}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 4. ACCOUNT TAB */}
              {activeProfileTab === 'profile' && (
                <div className="max-w-2xl bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm space-y-6">
                  <div className="flex items-center gap-4 border-b border-rose-50 pb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gift-800 to-gift-600 text-white text-2xl font-bold flex items-center justify-center shadow-md">
                      {user?.username?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif font-bold text-xl text-slate-900">{user?.username || 'Member'}</h3>
                        <span className="bg-amber-400 text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                          Privilège Club
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Verified Luxury Gifting Member</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Orders Placed</p>
                      <p className="text-lg font-bold text-slate-900">{orders.length}</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Saved Destinations</p>
                      <p className="text-lg font-bold text-slate-900">{addresses.length}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-rose-50 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Session secured via 256-bit local encryption</span>
                    <button
                      onClick={handleLogout}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-700 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </main>
      </div>

      {/* ===== CUSTOMER REVIEWS — above the footer ===== */}
      <section className="bg-[#FAF8F5] border-t border-rose-100/60 px-4 sm:px-8 md:px-12 py-10 sm:py-14">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Star size={18} className="text-amber-500 fill-amber-500" />
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">What Our Customers Say</h2>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 ml-1">⭐ 4.9/5.0 Average</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: 'Priya M.', city: 'Mumbai', rating: 5, text: 'The roses arrived perfectly fresh at midnight — my husband was in tears! The packaging was absolutely luxurious. Will order again!', tag: 'Midnight Surprise', emoji: '🌹' },
              { name: 'Rahul K.', city: 'Delhi', rating: 5, text: "Ordered 2 hours before my girlfriend's birthday and it reached in 90 mins. Quality is premium, easily beats any local florist.", tag: 'Express 2-Hour', emoji: '⚡' },
              { name: 'Sneha T.', city: 'Bangalore', rating: 5, text: "The hamper I ordered for my parents' anniversary was beautifully packed. They were overjoyed. The personal card message was printed perfectly!", tag: 'Gourmet Hamper', emoji: '🧺' },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-rose-100 shadow-sm space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} size={13} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[9px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                    {review.emoji} {review.tag}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-2.5 pt-2 border-t border-rose-50">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-200 to-rose-300 flex items-center justify-center text-rose-900 font-extrabold text-sm shrink-0">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{review.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{review.city} · Verified Purchase</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLATFORM TRUST STATS RIBBON (Above Footer) ===== */}
      <section className="bg-white border-y border-rose-100/80 py-6 sm:py-8 shadow-2xs">
        <div className="px-4 sm:px-8 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {heroStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 sm:gap-4 p-3 rounded-2xl hover:bg-rose-50/40 transition-colors"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-rose-50/90 border border-rose-100 flex items-center justify-center text-xl sm:text-2xl shrink-0 shadow-2xs">
                {stat.emoji}
              </div>
              <div>
                <p className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">{stat.label}</p>
                <p className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-0.5">{stat.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* International Worldwide Shipping Section (Above Footer) */}
      <InternationalShipping />

      {/* Master Single Footer - 100% Full Width across entire screen */}
      <Footer onOpenVendorOnboarding={() => setShowVendorOnboarding(true)} />

      {/* Modals & Drawers */}
      <ProductPopup product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={handleAddToCart} />
      <VendorOnboardingModal 
        isOpen={showVendorOnboarding} 
        onClose={() => setShowVendorOnboarding(false)} 
        onSuccess={() => {
          setToastMessage('🎉 Vendor application submitted! Admin will verify and activate your account.');
          setToastKey(prev => prev + 1);
        }}
      />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
        onCheckout={handleCheckout}
        user={user}
        onRequireAuth={() => setIsAuthOpen(true)}
      />
      
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        user={user}
        onRequireAuth={() => setIsAuthOpen(true)}
      />
      
      {/* ===== TOAST NOTIFICATION (with AnimatePresence for auto-dismiss) ===== */}
      <AnimatePresence mode="wait">
        {!isCartOpen && toastMessage && toastKey > 0 && (
          <motion.div
            key={toastKey}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onAnimationComplete={(def) => {
              // After enter animation, start auto-dismiss timer via CSS animation
            }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 3, duration: 0.4 }}
              onAnimationComplete={() => setToastKey(0)}
              className="bg-slate-950 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-rose-700/50 pointer-events-auto"
            >
              <Bell size={18} className="text-amber-400 shrink-0" />
              <span className="text-xs font-bold">{toastMessage}</span>
              <button
                onClick={() => setToastKey(0)}
                className="ml-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onAuthSuccess={handleAuthSuccess} />
      <RatingModal
        isOpen={Boolean(ratingOrder)}
        onClose={() => setRatingOrder(null)}
        order={ratingOrder}
        username={user?.username}
        onSubmit={handleSubmitRating}
      />
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => {
          setIsAddressModalOpen(false);
          setEditingAddress(null);
        }}
        address={editingAddress}
        onSave={handleSaveAddress}
        areas={areas}
      />

      <AddonModal
        isOpen={isAddonModalOpen}
        onClose={() => {
          setIsAddonModalOpen(false);
          setPendingMainItem(null);
        }}
        mainItem={pendingMainItem}
        onConfirmAddons={handleConfirmAddons}
      />

      {/* Sign Out Confirmation Modal */}
      <AnimatePresence>
        {showSignOutConfirm && (
          <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-rose-100 space-y-6 relative overflow-hidden"
            >
              {/* Decorative top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-700 via-amber-500 to-rose-700" />
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 border border-rose-100 flex items-center justify-center shrink-0 shadow-xs">
                  <LogOut size={22} className="text-rose-700" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                    Security Confirmation
                  </span>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 leading-snug">
                    Sign Out of GiftPortal Luxe?
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed pt-1">
                    Are you sure you want to sign out{user?.username ? `, ${user.username}` : ''}? You will need to sign back in to view your live orders, track delivery in real-time, access your wishlist, and use saved addresses.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-600 flex items-center gap-2.5">
                <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                <span>Your bag items and local preferences will remain safely preserved in this browser.</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowSignOutConfirm(false)}
                  className="py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmLogout}
                  className="py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-rose-700 to-rose-800 hover:from-rose-800 hover:to-rose-900 shadow-md shadow-rose-900/20 transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  <LogOut size={14} />
                  <span>Yes, Sign Out</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
