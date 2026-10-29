'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ProductCard from './ProductCard';

export default function DedicatedShowcase({
  title,
  subtitle,
  subcategories = [],
  products = [],
  activeSubcat = null,
  onSelectSubcat,
  onViewAll,
  onSelectProduct,
  favourites = [],
  onToggleFavourite,
  viewAllLabel = 'View All'
}) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-4 sm:py-6 border-b border-rose-100/50 bg-white/60">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 md:px-10 space-y-3 sm:space-y-4">
        
        {/* Header matching Reference Screenshot 5 */}
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="font-sans font-bold text-lg sm:text-xl md:text-[22px] text-slate-900 tracking-tight leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[11px] sm:text-xs text-slate-500 font-normal mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          {onViewAll && (
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#e11d48] hover:text-[#be123c] transition-colors cursor-pointer group shrink-0"
            >
              <span>{viewAllLabel}</span>
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>

        {/* Sub-Category Squircle Tiles Strip matching Screenshot 5 */}
        {subcategories && subcategories.length > 0 && (
          <div className="relative group/carousel">
            {/* Left Scroll Arrow */}
            <button
              onClick={() => scroll('left')}
              className="absolute -left-2 sm:-left-3.5 top-11 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-rose-600 hover:scale-105 transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer hidden sm:flex"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Scroll Container */}
            <div 
              ref={scrollRef}
              className="flex items-start gap-2.5 sm:gap-4 md:gap-5 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth"
            >
              {subcategories.map((sub, idx) => {
                const isSelected = activeSubcat === sub.id;

                return (
                  <button
                    key={sub.id || idx}
                    type="button"
                    onClick={() => onSelectSubcat && onSelectSubcat(sub.id)}
                    className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer text-center outline-none focus:outline-none"
                    style={{ width: '100px', minWidth: '100px' }}
                  >
                    {/* Small squircle photo tile matching Screenshot 5 (#FFFAE6 warm cream) */}
                    <div 
                      className={`w-[82px] h-[82px] sm:w-[98px] sm:h-[98px] rounded-[18px] sm:rounded-[22px] overflow-hidden transition-all duration-300 flex items-center justify-center p-1.5 shrink-0 ${
                        isSelected 
                          ? 'bg-[#FFF0B3] border-2 border-[#e11d48] ring-2 ring-[#e11d48]/20 shadow-sm scale-102' 
                          : 'bg-[#FFFAE6] border border-[#FEF3C7] shadow-2xs hover:shadow-md hover:border-amber-300 hover:scale-104'
                      }`}
                      style={{ width: '98px', height: '98px', minWidth: '98px', minHeight: '98px' }}
                    >
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-full h-full object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-106"
                        loading="lazy"
                      />
                    </div>

                    {/* Compact Sub-category label */}
                    <span 
                      className={`text-[11px] sm:text-xs font-medium text-center leading-snug transition-colors line-clamp-2 px-0.5 ${
                        isSelected ? 'text-[#e11d48] font-bold' : 'text-slate-800 group-hover:text-rose-700'
                      }`}
                      style={{ maxWidth: '98px' }}
                    >
                      {sub.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Scroll Arrow */}
            <button
              onClick={() => scroll('right')}
              className="absolute -right-2 sm:-right-3.5 top-11 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-rose-600 hover:scale-105 transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer hidden sm:flex"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Curated Compact Product Grid (4 items) */}
        {products && products.length > 0 && (
          <div className="pt-1.5">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
              {products.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                  isFavourite={favourites.some(f => f.id === product.id)}
                  onToggleFavourite={onToggleFavourite}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
