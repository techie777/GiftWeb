'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ChevronLeft, ChevronRight, Check, Sparkles, LayoutGrid, Rows } from 'lucide-react';

export const MAIN_CATEGORIES = [
  {
    id: 'flowers',
    name: 'Flowers & Plants',
    subtitle: 'Fresh Dutch Blooms',
    image: '/showcase/flowers/roses.png',
    fallback: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=200&auto=format&fit=crop'
  },
  {
    id: 'cakes',
    name: 'Cakes & Bakes',
    subtitle: 'Fresh Handcrafted',
    image: '/showcase/cakes/dutch-truffle.png',
    fallback: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&auto=format&fit=crop'
  },
  {
    id: 'personalized',
    name: 'Personalised Gifts',
    subtitle: 'Photo & Engraved',
    image: '/showcase/personalized/photo-frames.png',
    fallback: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=200&auto=format&fit=crop'
  },
  {
    id: 'hampers',
    name: 'Gourmet Hampers',
    subtitle: 'Luxury Curated Baskets',
    image: '/showcase/hampers/gourmet-hampers.png',
    fallback: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&auto=format&fit=crop'
  },
  {
    id: 'chocolates',
    name: 'Artisan Chocolates',
    subtitle: 'Belgian Truffles',
    image: '/showcase/hampers/belgian-truffles.png',
    fallback: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=200&auto=format&fit=crop'
  },
  {
    id: 'toys',
    name: 'Soft Toys & Plush',
    subtitle: 'Hug-worthy Teddies',
    image: '/showcase/hampers/plush-teddies.png',
    fallback: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=200&auto=format&fit=crop'
  },
  {
    id: 'electronics',
    name: 'Electronic Items',
    subtitle: 'Smart Tech & Audio',
    image: '/showcase/hampers/smart-tech.png',
    fallback: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop'
  },
  {
    id: 'decor',
    name: 'Balloon Decor',
    subtitle: 'Party & Celebrations',
    image: '/showcase/hampers/balloon-decor.png',
    fallback: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&auto=format&fit=crop'
  },
  {
    id: 'kids',
    name: 'Gifts for Kids',
    subtitle: 'Toys, Cakes & Fun',
    image: '/showcase/cakes/kids-cakes.png',
    fallback: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=200&auto=format&fit=crop'
  },
  {
    id: 'educational',
    name: 'Educational Gifts',
    subtitle: 'STEM & Brain Kits',
    image: '/showcase/personalized/memory-plaques.png',
    fallback: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&auto=format&fit=crop'
  },
  {
    id: 'handcrafted',
    name: 'Handcrafted Gifts',
    subtitle: 'Artisan Keepsakes',
    image: '/showcase/personalized/photo-lamps.png',
    fallback: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=200&auto=format&fit=crop'
  },
  {
    id: 'spiritual',
    name: 'Spiritual Gifts',
    subtitle: 'Idols & Sacred Decor',
    image: '/showcase/hampers/spiritual-idols.png',
    fallback: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=200&auto=format&fit=crop'
  },
  {
    id: 'genz',
    name: 'GenZ Gifts',
    subtitle: 'Trending & Viral',
    image: '/showcase/personalized/custom-drinkware.png',
    fallback: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200&auto=format&fit=crop'
  }
];

export default function MainCategoryStrip({ activeCategory, onSelectCategory, products = [] }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' | 'grid'

  // Precompute live gift counts per category based on active product catalogue
  const catProdCounts = useMemo(() => {
    const counts = {};
    MAIN_CATEGORIES.forEach(cat => {
      counts[cat.id] = (products || []).filter(p => {
        if (cat.id === 'flowers') return p.cat === 'flowers' || p.cat === 'plants';
        if (cat.id === 'cakes') return p.cat === 'cakes' || p.cat === 'cake' || p.cat === 'chocolates';
        if (cat.id === 'personalized') return p.cat === 'personalized';
        if (cat.id === 'hampers') return p.cat === 'hampers';
        if (cat.id === 'chocolates') return p.cat === 'chocolates' || (p.cat === 'cakes' && p.subcat === 'chocolate');
        if (cat.id === 'toys') return p.cat === 'toys' || p.cat === 'toy' || p.cat === 'educational';
        if (cat.id === 'electronics') return p.cat === 'electronics';
        if (cat.id === 'decor') return p.cat === 'decor' || p.subcat === 'balloons';
        if (cat.id === 'kids') return p.cat === 'toys' || p.cat === 'educational' || (p.recipients && p.recipients.includes('kids'));
        if (cat.id === 'educational') return p.cat === 'educational' || p.subcat === 'stem';
        if (cat.id === 'handcrafted') return p.cat === 'handcrafted' || p.cat === 'personalized';
        if (cat.id === 'spiritual') return p.cat === 'spiritual';
        if (cat.id === 'genz') return p.cat === 'genz';
        return p.cat === cat.id;
      }).length;
    });
    return counts;
  }, [products]);

  // Update scroll indicators
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [viewMode]);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 360;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      aria-label="Shop by Collection"
      className="w-full bg-white border-b border-rose-100/80 py-4 sm:py-5 px-3 sm:px-6 md:px-10 shadow-2xs"
    >
      <div className="max-w-7xl mx-auto">
        {/* Clean, Elegant Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5 sm:mb-4 px-1">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-600 shadow-2xs shrink-0">
              <Gift size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-heading font-bold text-sm sm:text-lg md:text-xl text-slate-900 leading-tight">
                  Shop by Collection
                </h2>
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Express 120m
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block mt-0.5">
                Handcrafted flowers, artisan cakes, personalized keepsakes & luxury hampers
              </p>
            </div>
          </div>

          {/* Right Controls: Filter Reset & Carousel Nav Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {activeCategory !== 'all' && (
              <button
                onClick={() => onSelectCategory('all')}
                className="text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl border border-rose-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                title="Clear filter and view all products"
              >
                <span>All Collections</span>
                <span className="text-[10px] bg-rose-200/80 text-rose-900 rounded-full w-4 h-4 inline-flex items-center justify-center">✕</span>
              </button>
            )}

            {/* View Mode Toggle (Carousel vs All Grid) */}
            <div className="hidden md:flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/80">
              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  viewMode === 'carousel' 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Scrollable Strip View"
              >
                <Rows size={14} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  viewMode === 'grid' 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Grid View (All at once)"
              >
                <LayoutGrid size={14} />
              </button>
            </div>

            {/* Desktop Carousel Navigation Arrows */}
            {viewMode === 'carousel' && (
              <div className="hidden sm:flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleScroll('left')}
                  disabled={!canScrollLeft}
                  className="w-8 h-8 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  aria-label="Previous categories"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll('right')}
                  disabled={!canScrollRight}
                  className="w-8 h-8 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  aria-label="Next categories"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Categories Display */}
        {viewMode === 'grid' ? (
          /* Clean, Balanced Responsive Grid View */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3">
            {MAIN_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              const count = catProdCounts[cat.id] || 0;

              return (
                <motion.button
                  key={cat.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
                  className={`group relative flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl border text-left cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'bg-rose-50/70 border-rose-500 shadow-sm ring-2 ring-rose-500/20' 
                      : 'bg-white border-slate-200/80 hover:border-rose-300 hover:shadow-md'
                  }`}
                >
                  {/* Category Thumbnail Container */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl p-1 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                    isSelected ? 'bg-white shadow-2xs border border-rose-200' : 'bg-rose-50/40 border border-rose-100/70'
                  }`}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = cat.fallback;
                      }}
                    />
                  </div>

                  {/* Category Details */}
                  <div className="flex-1 min-w-0 pr-1">
                    <h3 className={`font-semibold text-xs sm:text-sm leading-tight truncate transition-colors ${
                      isSelected ? 'text-rose-900 font-bold' : 'text-slate-800 group-hover:text-rose-600'
                    }`}>
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                      {cat.subtitle}
                    </p>
                    {count > 0 && (
                      <span className={`inline-block text-[10px] font-medium mt-0.5 ${
                        isSelected ? 'text-rose-700 font-semibold' : 'text-slate-500'
                      }`}>
                        {count} Gifts
                      </span>
                    )}
                  </div>

                  {/* Active Indicator */}
                  {isSelected && (
                    <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] shadow-xs">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        ) : (
          /* Smooth, Elegant Scrollable Carousel View */
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-2.5 sm:gap-3 pb-2 pt-1 -mx-3 px-3 sm:mx-0 sm:px-0 scroll-smooth"
          >
            {MAIN_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              const count = catProdCounts[cat.id] || 0;

              return (
                <motion.button
                  key={cat.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
                  className={`group relative flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl border text-left cursor-pointer transition-all duration-200 shrink-0 snap-start w-[175px] sm:w-[210px] md:w-[220px] ${
                    isSelected 
                      ? 'bg-rose-50/70 border-rose-500 shadow-sm ring-2 ring-rose-500/20' 
                      : 'bg-white border-slate-200/80 hover:border-rose-300 hover:shadow-md'
                  }`}
                >
                  {/* Category Thumbnail Container */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl p-1 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                    isSelected ? 'bg-white shadow-2xs border border-rose-200' : 'bg-rose-50/40 border border-rose-100/70'
                  }`}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = cat.fallback;
                      }}
                    />
                  </div>

                  {/* Category Details */}
                  <div className="flex-1 min-w-0 pr-1">
                    <h3 className={`font-semibold text-xs sm:text-sm leading-tight truncate transition-colors ${
                      isSelected ? 'text-rose-900 font-bold' : 'text-slate-800 group-hover:text-rose-600'
                    }`}>
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                      {cat.subtitle}
                    </p>
                    {count > 0 && (
                      <span className={`inline-block text-[10px] font-medium mt-0.5 ${
                        isSelected ? 'text-rose-700 font-semibold' : 'text-slate-500'
                      }`}>
                        {count} Gifts
                      </span>
                    )}
                  </div>

                  {/* Active Indicator */}
                  {isSelected && (
                    <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] shadow-xs">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
