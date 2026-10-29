'use client';
import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, Heart, ArrowRight, RotateCcw, Check, ShoppingBag, Eye, Zap, Star, X, SlidersHorizontal, ChevronRight } from 'lucide-react';

const RECIPIENT_OPTIONS = [
  { id: 'all', label: 'Anyone (कोई भी)', emoji: '✨' },
  { id: 'her', label: 'For Her / Wife / GF (महिला)', emoji: '💖' },
  { id: 'him', label: 'For Him / Husband / BF (पुरुष)', emoji: '🎩' },
  { id: 'parents', label: 'Parents / Elders (माता-पिता)', emoji: '👨‍👩‍👦' },
  { id: 'kids', label: 'Kids & Teens (बच्चे)', emoji: '🧸' },
  { id: 'couples', label: 'Couples / Friends (जोड़ी)', emoji: '🥂' },
  { id: 'colleague', label: 'Colleague / Boss (ऑफिस)', emoji: '💼' }
];

const OCCASION_OPTIONS = [
  { id: 'all', label: 'Any Occasion (कोई भी अवसर)', emoji: '🎁' },
  { id: 'birthday', label: 'Birthday (जन्मदिन)', emoji: '🎂' },
  { id: 'anniversary', label: 'Anniversary (सालगिरह)', emoji: '💍' },
  { id: 'love', label: 'Romance / Love (प्यार)', emoji: '❤️' },
  { id: 'congratulations', label: 'Congrats (बधाई)', emoji: '🎉' },
  { id: 'housewarming', label: 'Housewarming (गृहप्रवेश)', emoji: '🏡' },
  { id: 'festive', label: 'Festive (त्योहार व पूजा)', emoji: '🪔' }
];

const BUDGET_OPTIONS = [
  { id: 'all', label: 'All Budgets (सभी बजट)', min: 0, max: 999999, emoji: '✨' },
  { id: 'under500', label: 'Under ₹499 (बजट फ्रेंडली)', min: 0, max: 499, emoji: '🏷️' },
  { id: '500-999', label: '₹500 – ₹999 (सबसे लोकप्रिय)', min: 500, max: 999, emoji: '⭐' },
  { id: '1000-2499', label: '₹1k – ₹2.5k (लक्ज़री हैंपर)', min: 1000, max: 2499, emoji: '💎' },
  { id: '2500plus', label: '₹2.5k+ (शानदार गिफ्ट्स)', min: 2500, max: 999999, emoji: '👑' }
];

export default function GiftFinderWizard({ products = [], onSelectProduct, onQuickAddToCart, onExploreAll }) {
  const [selectedRecipient, setSelectedRecipient] = useState('her');
  const [selectedOccasion, setSelectedOccasion] = useState('birthday');
  const [selectedBudget, setSelectedBudget] = useState('500-999');
  
  // Mobile Bottom Sheet / Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStepTab, setActiveStepTab] = useState('recipient'); // 'recipient' | 'occasion' | 'budget'
  const scrollContainerRef = useRef(null);

  // Helper to extract base price of a product
  const getProductPrice = (p) => {
    if (typeof p.price === 'number') return p.price;
    if (p.types?.[0]?.variants?.[0]?.price) return p.types[0].variants[0].price;
    return 499;
  };

  const currentRecipient = RECIPIENT_OPTIONS.find(r => r.id === selectedRecipient) || RECIPIENT_OPTIONS[1];
  const currentOccasion = OCCASION_OPTIONS.find(o => o.id === selectedOccasion) || OCCASION_OPTIONS[1];
  const currentBudget = BUDGET_OPTIONS.find(b => b.id === selectedBudget) || BUDGET_OPTIONS[2];

  // Helper for compact pill label (short name)
  const getShortLabel = (label) => label.split('(')[0].trim();

  // Smart Matching Engine
  const matchedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    let list = products.filter(p => {
      const price = getProductPrice(p);
      if (price < currentBudget.min || price > currentBudget.max) return false;

      // Match Recipient
      if (selectedRecipient !== 'all') {
        const recipients = (p.recipient || []).map(r => String(r).toLowerCase());
        const hasRecipient = recipients.includes(selectedRecipient) || 
          (selectedRecipient === 'parents' && (recipients.includes('family') || recipients.includes('elders'))) ||
          (selectedRecipient === 'colleague' && (recipients.includes('formal') || recipients.includes('corporate')));
        if (!hasRecipient && p.recipient && p.recipient.length > 0) return false;
      }

      // Match Occasion
      if (selectedOccasion !== 'all') {
        const occasions = (p.occasion || []).map(o => String(o).toLowerCase());
        const hasOccasion = occasions.includes(selectedOccasion) ||
          (selectedOccasion === 'love' && (occasions.includes('anniversary') || occasions.includes('romance')));
        if (!hasOccasion && p.occasion && p.occasion.length > 0) return false;
      }

      return true;
    });

    // If too strict, fallback gracefully
    if (list.length < 3) {
      const fallback = products.filter(p => {
        const price = getProductPrice(p);
        return price >= currentBudget.min && price <= currentBudget.max;
      });
      list = [...list, ...fallback.filter(f => !list.some(l => l.id === f.id))];
    }

    return list.slice(0, 6);
  }, [products, selectedRecipient, selectedOccasion, selectedBudget, currentBudget]);

  const resetFilters = () => {
    setSelectedRecipient('all');
    setSelectedOccasion('all');
    setSelectedBudget('all');
  };

  return (
    <section className="relative px-3 sm:px-6 md:px-10 py-3 sm:py-5 max-w-7xl mx-auto">
      {/* Compact Outer Glass Frame */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-950 via-purple-950/95 to-rose-950 border border-rose-500/30 p-3 sm:p-5 shadow-xl text-white">
        
        {/* Subtle Ambient Background Flare */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* 1. CATCHY TITLE & QUICK ACTION BAR */}
        <div className="relative z-10 flex items-center justify-between gap-2 border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white text-base shadow-md shrink-0">
              🎁
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-black text-xs sm:text-sm text-white tracking-tight">
                  Gift Finding Wizard
                </h3>
                <span className="text-amber-300 text-[10px] sm:text-xs font-extrabold bg-amber-500/20 border border-amber-400/40 px-2 py-0.5 rounded-full">
                  गिफ्ट कैसा हो? पता करें ✨
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden xs:block mt-0.5 truncate">
                Select who, occasion & budget for instant personalized gift matches
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition-all shadow-sm flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <SlidersHorizontal size={11} />
            <span className="hidden sm:inline">Customize</span>
            <span className="sm:hidden">Filter</span>
          </button>
        </div>

        {/* 2. THE 3 SMART FILTER PILLS ROW (Clean, never squished!) */}
        <div className="relative z-10 flex items-center justify-between gap-2 py-2 border-b border-white/10">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 min-w-0">
            <button
              type="button"
              onClick={() => { setActiveStepTab('recipient'); setIsModalOpen(true); }}
              className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-all border border-white/10 flex items-center gap-1 cursor-pointer shrink-0"
              title="Tap to change recipient"
            >
              <span>{currentRecipient.emoji}</span>
              <span className="font-medium">{getShortLabel(currentRecipient.label)}</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveStepTab('occasion'); setIsModalOpen(true); }}
              className="px-2.5 py-1 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 text-[11px] font-bold transition-all border border-purple-400/30 flex items-center gap-1 cursor-pointer shrink-0"
              title="Tap to change occasion"
            >
              <span>{currentOccasion.emoji}</span>
              <span className="font-medium">{getShortLabel(currentOccasion.label)}</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveStepTab('budget'); setIsModalOpen(true); }}
              className="px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[11px] font-bold transition-all border border-amber-400/30 flex items-center gap-1 cursor-pointer shrink-0"
              title="Tap to change budget"
            >
              <span>{currentBudget.emoji}</span>
              <span className="font-medium">{getShortLabel(currentBudget.label)}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-[10px] sm:text-[11px] text-amber-300 hover:text-white font-bold flex items-center gap-0.5 shrink-0 cursor-pointer ml-1"
          >
            <span>Change</span>
            <span className="text-xs">✏️</span>
          </button>
        </div>

        {/* 3. SUB-HEADER BAR: Live Matches Count & Swipe Indicator */}
        <div className="relative z-10 flex items-center justify-between pt-2.5 pb-2 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-bold text-white">
              {matchedProducts.length} Curated Picks
            </span>
            <span className="text-slate-400 hidden sm:inline">
              for {getShortLabel(currentRecipient.label)} · {getShortLabel(currentOccasion.label)} ({getShortLabel(currentBudget.label)})
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-rose-300/80 sm:hidden">Swipe &rarr;</span>
            <button
              type="button"
              onClick={onExploreAll}
              className="text-[10px] sm:text-[11px] font-bold text-rose-300 hover:text-white underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight size={11} />
            </button>
          </div>
        </div>

        {/* 4. REFINED PROPORTIONAL PRODUCT CARDS */}
        <div
          ref={scrollContainerRef}
          className="relative z-10 flex sm:grid sm:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pt-1 pb-1"
        >
          {matchedProducts.map((prod) => {
            const price = getProductPrice(prod);
            const original = prod.original || prod.types?.[0]?.variants?.[0]?.original || Math.round(price * 1.3);
            const discount = Math.round(((original - price) / original) * 100);
            const image = prod.img || prod.image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop';

            return (
              <div
                key={prod.id}
                className="w-[168px] sm:w-auto shrink-0 snap-start rounded-2xl bg-slate-900/95 border border-white/10 hover:border-rose-500/50 transition-all flex flex-col justify-between overflow-hidden shadow-lg group hover:shadow-rose-950/40"
              >
                {/* Image Container with FIXED HEIGHT */}
                <div 
                  className="relative h-28 sm:h-36 w-full overflow-hidden bg-slate-800 cursor-pointer"
                  onClick={() => onSelectProduct && onSelectProduct(prod)}
                >
                  <img
                    src={image}
                    alt={prod.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Bottom Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded-full bg-rose-600/95 text-white font-black text-[9px] tracking-wider uppercase shadow-md backdrop-blur-xs">
                      {discount}% OFF
                    </span>
                    {prod.earliestDelivery === 'Today' && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600/95 text-white font-bold text-[8px] uppercase shadow-md flex items-center gap-0.5 backdrop-blur-xs">
                        <Zap size={8} className="fill-white" /> Today
                      </span>
                    )}
                  </div>

                  {prod.rating && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 font-bold text-[9px] shadow-sm flex items-center gap-0.5 border border-white/10">
                      <Star size={9} className="fill-amber-300" /> {prod.rating}
                    </span>
                  )}
                </div>

                {/* Card Body & Title */}
                <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div 
                    className="cursor-pointer"
                    onClick={() => onSelectProduct && onSelectProduct(prod)}
                  >
                    <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-1 group-hover:text-rose-300 transition-colors" title={prod.name}>
                      {prod.name}
                    </h4>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-sm sm:text-base font-black text-rose-400">₹{price.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-slate-500 line-through">₹{original.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Elegant Action Buttons */}
                  <div className="pt-1.5 border-t border-white/10 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onSelectProduct && onSelectProduct(prod)}
                      className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all border border-white/10 cursor-pointer shrink-0"
                      title="View details & personalize"
                    >
                      <Eye size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (onQuickAddToCart) {
                          const variant = prod.types?.[0]?.variants?.[0] || { label: prod.variant || 'Standard', price };
                          onQuickAddToCart(prod, variant, prod.types?.[0]?.label || 'Standard');
                        }
                      }}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-600 text-white text-[11px] font-black tracking-wide uppercase transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                    >
                      <ShoppingBag size={11} />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* 5. SLEEK MOBILE BOTTOM SHEET / MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
            {/* Backdrop Click Dismiss */}
            <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />

            {/* Sheet / Modal Dialog */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 w-full sm:max-w-lg bg-slate-950 border-t sm:border border-rose-500/40 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl text-white space-y-4 max-h-[85vh] overflow-y-auto"
            >
              {/* Mobile Drag Indicator Bar */}
              <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto sm:hidden mb-1" />

              {/* Sheet Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-amber-400" />
                    <h3 className="font-extrabold text-sm sm:text-base text-white">
                      Gift Finding Wizard
                    </h3>
                  </div>
                  <p className="text-[11px] text-amber-300 font-bold">
                    गिफ्ट कैसा हो? 3 आसान स्टेप्स में पता करें ✨
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* 3 Step Tabs Bar */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900 rounded-2xl border border-white/10 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveStepTab('recipient')}
                  className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    activeStepTab === 'recipient' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>1. किसके लिए</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStepTab('occasion')}
                  className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    activeStepTab === 'occasion' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>2. अवसर</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStepTab('budget')}
                  className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    activeStepTab === 'budget' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>3. बजट</span>
                </button>
              </div>

              {/* Step Tab Content */}
              <div className="py-2 min-h-[190px]">
                {activeStepTab === 'recipient' && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-300 mb-2">गिफ्ट किसके लिए लेना चाहते हैं?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {RECIPIENT_OPTIONS.map(opt => {
                        const isSelected = selectedRecipient === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => { setSelectedRecipient(opt.id); setActiveStepTab('occasion'); }}
                            className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                              isSelected
                                ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-white/10'
                            }`}
                          >
                            <span className="text-base">{opt.emoji}</span>
                            <span className="truncate">{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeStepTab === 'occasion' && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-300 mb-2">किस खास अवसर (Occasion) के लिए गिफ्ट चाहिए?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {OCCASION_OPTIONS.map(opt => {
                        const isSelected = selectedOccasion === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => { setSelectedOccasion(opt.id); setActiveStepTab('budget'); }}
                            className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                              isSelected
                                ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-white/10'
                            }`}
                          >
                            <span className="text-base">{opt.emoji}</span>
                            <span className="truncate">{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeStepTab === 'budget' && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-300 mb-2">आपका मनपसंद बजट कितना है?</p>
                    <div className="space-y-1.5">
                      {BUDGET_OPTIONS.map(opt => {
                        const isSelected = selectedBudget === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedBudget(opt.id)}
                            className={`w-full p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer border ${
                              isSelected
                                ? 'bg-amber-500 text-slate-950 font-black border-amber-300 shadow-md'
                                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span>{opt.emoji}</span>
                              <span>{opt.label}</span>
                            </div>
                            {isSelected && <Check size={14} className="text-slate-950 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Sticky Action Bar */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Reset All
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 px-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{matchedProducts.length} बेहतरीन गिफ्ट्स देखें</span>
                  <Check size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
