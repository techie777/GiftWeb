'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift, ArrowRight } from 'lucide-react';

export const MAIN_CATEGORIES = [
  {
    id: 'flowers',
    name: 'Flowers & Plants',
    subtitle: 'Fresh Dutch Blooms',
    badge: 'GET IT TODAY',
    badgeColor: 'bg-emerald-600 text-white',
    gradient: 'from-amber-50 via-rose-50 to-pink-100',
    borderColor: 'border-rose-200/70',
    image: '/showcase/flowers/roses.png'
  },
  {
    id: 'cakes',
    name: 'Cakes & Bakes',
    subtitle: 'Fresh Handcrafted',
    badge: 'EXPRESS 2-HR',
    badgeColor: 'bg-rose-600 text-white',
    gradient: 'from-yellow-50 via-amber-50 to-rose-100',
    borderColor: 'border-amber-200/70',
    image: '/showcase/cakes/dutch-truffle.png'
  },
  {
    id: 'personalized',
    name: 'Personalised Gifts',
    subtitle: 'Photo & Engraved',
    badge: 'POPULAR',
    badgeColor: 'bg-purple-600 text-white',
    gradient: 'from-teal-50 via-emerald-50 to-cyan-100',
    borderColor: 'border-teal-200/70',
    image: '/showcase/personalized/photo-frames.png'
  },
  {
    id: 'hampers',
    name: 'Gourmet Hampers',
    subtitle: 'Artisan Luxe Baskets',
    badge: 'CURATED LUXE',
    badgeColor: 'bg-amber-600 text-white',
    gradient: 'from-amber-50 via-orange-50 to-amber-100',
    borderColor: 'border-amber-200/70',
    image: '/showcase/hampers/gourmet-hampers.png'
  },
  {
    id: 'chocolates',
    name: 'Artisan Chocolates',
    subtitle: 'Belgian Truffles',
    badge: 'INDULGENT',
    badgeColor: 'bg-amber-800 text-white',
    gradient: 'from-amber-50 via-rose-50 to-stone-100',
    borderColor: 'border-amber-200/70',
    image: '/showcase/hampers/belgian-truffles.png'
  },
  {
    id: 'toys',
    name: 'Soft Toys & Plush',
    subtitle: 'Hug-worthy Teddies',
    badge: 'CUTE',
    badgeColor: 'bg-pink-600 text-white',
    gradient: 'from-pink-50 via-rose-50 to-purple-100',
    borderColor: 'border-pink-200/70',
    image: '/showcase/hampers/plush-teddies.png'
  },
  {
    id: 'electronics',
    name: 'Electronic Items',
    subtitle: 'Audio & Gadgets',
    badge: 'TRENDING',
    badgeColor: 'bg-blue-600 text-white',
    gradient: 'from-blue-50 via-indigo-50 to-slate-100',
    borderColor: 'border-blue-200/70',
    image: '/showcase/hampers/smart-tech.png'
  },
  {
    id: 'decor',
    name: 'Balloon Decor',
    subtitle: 'Party & Celebrations',
    badge: 'CELEBRATE',
    badgeColor: 'bg-teal-600 text-white',
    gradient: 'from-emerald-50 via-teal-50 to-amber-100',
    borderColor: 'border-emerald-200/70',
    image: '/showcase/hampers/balloon-decor.png'
  },
  {
    id: 'kids',
    name: 'Gifts for Kids',
    subtitle: 'Toys, STEM & Cakes',
    badge: 'AGES 3-14',
    badgeColor: 'bg-violet-600 text-white',
    gradient: 'from-purple-50 via-indigo-50 to-blue-100',
    borderColor: 'border-purple-200/70',
    image: '/showcase/cakes/kids-cakes.png'
  },
  {
    id: 'educational',
    name: 'Educational Gifts',
    subtitle: 'Brainy & STEM Kits',
    badge: 'BRAINY',
    badgeColor: 'bg-indigo-600 text-white',
    gradient: 'from-sky-50 via-blue-50 to-indigo-100',
    borderColor: 'border-sky-200/70',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&auto=format&fit=crop'
  },
  {
    id: 'handcrafted',
    name: 'Handcrafted Gifts',
    subtitle: 'Artisan Keepsakes',
    badge: 'HANDMADE',
    badgeColor: 'bg-orange-600 text-white',
    gradient: 'from-orange-50 via-amber-50 to-stone-100',
    borderColor: 'border-orange-200/70',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=300&auto=format&fit=crop'
  },
  {
    id: 'spiritual',
    name: 'Spiritual Gifts',
    subtitle: 'Idols & Auspicious Decor',
    badge: 'AUSPICIOUS',
    badgeColor: 'bg-amber-700 text-white',
    gradient: 'from-amber-50 via-yellow-50 to-orange-100',
    borderColor: 'border-amber-300/80',
    image: '/showcase/hampers/spiritual-idols.png'
  },
  {
    id: 'genz',
    name: 'GenZ Gifts',
    subtitle: 'Viral Aesthetics',
    badge: 'VIRAL',
    badgeColor: 'bg-fuchsia-600 text-white',
    gradient: 'from-fuchsia-50 via-purple-50 to-pink-100',
    borderColor: 'border-fuchsia-200/70',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&auto=format&fit=crop'
  }
];

export default function MainCategoryStrip({ activeCategory, onSelectCategory, products = [] }) {
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

  return (
    <section 
      aria-label="Shop by Collection"
      className="w-full bg-white/95 backdrop-blur-md border-b border-rose-100/80 py-2.5 sm:py-3.5 px-3 sm:px-6 md:px-10 shadow-xs"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Premium E-Commerce Gifting Branding */}
        <div className="flex items-center justify-between mb-2.5 sm:mb-3 px-0.5 sm:px-1">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-600 shadow-2xs shrink-0">
              <Gift size={15} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-xs sm:text-base md:text-lg text-slate-900 leading-tight">
                  Shop by Collection
                </h2>
                <span className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 sm:px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Express 120m
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium hidden sm:block">
                Handcrafted flowers, artisan cakes, personalized keepsakes & luxury hampers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeCategory !== 'all' && (
              <button
                onClick={() => onSelectCategory('all')}
                className="text-[10px] sm:text-xs font-bold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100/80 px-2 sm:px-2.5 py-1 rounded-lg border border-rose-200/80 flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
              >
                <span>All Collections</span>
                <span className="text-[9px]">✕</span>
              </button>
            )}
            <span className="text-[10px] text-slate-400 font-medium sm:hidden flex items-center gap-0.5">
              Swipe <ArrowRight size={10} />
            </span>
          </div>
        </div>

        {/* Space-Saving Mobile Horizontal Carousel (Swipeable ~80px height vs ~900px vertical stack) & Desktop Responsive Grid */}
        <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-2 sm:gap-2.5 md:gap-3 pb-1 pt-0.5 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 -mx-3 px-3 sm:mx-0 sm:px-0">
          {MAIN_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const count = catProdCounts[cat.id] || 0;

            return (
              <motion.button
                key={cat.id}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
                className={`relative flex items-center justify-between p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all text-left group cursor-pointer overflow-hidden min-h-[64px] sm:min-h-[70px] w-[160px] shrink-0 snap-start sm:w-auto bg-gradient-to-r ${cat.gradient} ${
                  isSelected 
                    ? 'border-rose-600 ring-2 ring-rose-600/30 shadow-md bg-white' 
                    : `${cat.borderColor} hover:border-rose-400 hover:shadow-xs shadow-2xs`
                }`}
              >
                {/* Left: Text, Badge & Live Product Count */}
                <div className="relative z-10 flex flex-col justify-center gap-0.5 min-w-0 pr-1.5 flex-1">
                  {cat.badge && (
                    <span className={`inline-block text-[7px] sm:text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md w-fit leading-none shadow-2xs ${cat.badgeColor}`}>
                      {cat.badge}
                    </span>
                  )}
                  <p className={`font-serif font-bold text-[11px] sm:text-xs md:text-[13px] leading-tight truncate transition-colors ${
                    isSelected ? 'text-rose-900 font-black' : 'text-slate-900 group-hover:text-rose-700'
                  }`}>
                    {cat.name}
                  </p>
                  {count > 0 && (
                    <span className={`text-[8px] sm:text-[9px] font-semibold flex items-center gap-0.5 ${
                      isSelected ? 'text-rose-700 font-bold' : 'text-slate-500'
                    }`}>
                      {count} Gifts
                    </span>
                  )}
                </div>

                {/* Right: Realistic Cutout Imagery */}
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 shrink-0">
                  <div className="w-full h-full rounded-xl overflow-hidden shadow-xs border border-white/80 bg-white/70 p-0.5">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-108 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=120&auto=format&fit=crop';
                      }}
                    />
                  </div>
                </div>

                {/* Subtle active indicator dot */}
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-600 ring-2 ring-white shadow" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
