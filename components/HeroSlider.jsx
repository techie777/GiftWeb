'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Gift, Sparkles, Clock, Star, 
  ShieldCheck, ArrowRight, Play, Pause 
} from 'lucide-react';

export default function HeroSlider({ 
  slides = [], 
  onSelectCategory, 
  cutoffTime = '07:31:17',
  onExploreClick 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const timerRef = useRef(null);

  const activeSlides = (slides && slides.length > 0)
    ? slides.filter(s => s.isActive !== false)
    : [];

  const totalSlides = activeSlides.length;

  const nextSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play timer
  useEffect(() => {
    if (isPaused || totalSlides <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, totalSlides, nextSlide, currentIndex]);

  if (totalSlides === 0) return null;

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <section 
      aria-label="Featured Gifting Hero Showcases"
      className="relative w-full overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic Background with smooth fade */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentSlide.bgGradient || 'from-gift-950 via-gift-900 to-rose-950'} transition-all duration-700`}>
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-10 sm:py-16 md:py-20 min-h-[460px] sm:min-h-[520px] flex items-center">
        
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide.id || currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
          >
            {/* Left: Copy & CTA */}
            <div className="flex-1 text-center md:text-left space-y-4 sm:space-y-5 max-w-2xl">
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full shadow-inner backdrop-blur-xs"
              >
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shrink-0" />
                <span>{currentSlide.badge || '⚡ Delivering right now in Mumbai · Delhi · Bangalore · Pune'}</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-white leading-[1.15] tracking-tight"
              >
                {currentSlide.title}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-200 to-amber-400 drop-shadow-sm">
                  {currentSlide.titleHighlight}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-rose-100/85 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0 font-medium"
              >
                {currentSlide.subtitle}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2"
              >
                <button
                  onClick={() => {
                    if (onSelectCategory && currentSlide.ctaPrimaryCategory) {
                      onSelectCategory(currentSlide.ctaPrimaryCategory);
                    } else if (onExploreClick) {
                      onExploreClick();
                    }
                  }}
                  className="bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl font-black text-xs sm:text-[13px] uppercase tracking-wider shadow-xl shadow-amber-950/40 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Gift size={16} />
                  <span>{currentSlide.ctaPrimaryText || 'Explore Collections'}</span>
                </button>

                <button
                  onClick={() => {
                    if (onSelectCategory) {
                      onSelectCategory(currentSlide.ctaSecondaryCategory || 'same-day');
                    }
                  }}
                  className="bg-white/10 hover:bg-white/20 border border-white/25 text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl font-bold text-xs sm:text-[13px] uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer backdrop-blur-xs hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles size={15} className="text-amber-300" />
                  <span>{currentSlide.ctaSecondaryText || 'Same-Day Gifts'}</span>
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2"
              >
                {['⭐ 4.9/5.0 Rating', '✅ 100% On-Time', '🔒 Safe Checkout'].map((t) => (
                  <span key={t} className="text-[10px] sm:text-xs text-rose-200/80 font-bold bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right: Featured Card with Cutoff Countdown Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="relative shrink-0 w-64 sm:w-72 md:w-80 cursor-pointer group"
              onClick={() => {
                if (onSelectCategory && currentSlide.categoryKey) {
                  onSelectCategory(currentSlide.categoryKey);
                }
              }}
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-rose-500/30 shadow-2xl shadow-rose-950/80 bg-slate-900 group-hover:border-amber-400/50 transition-all duration-500">
                <img
                  src={currentSlide.cardProduct?.image || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop'}
                  alt={currentSlide.cardProduct?.name || currentSlide.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                {/* Card Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
                  <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-sm">
                    {currentSlide.tag || 'Featured Collection'}
                  </span>
                  <p className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-2">
                    {currentSlide.cardProduct?.name || 'Exclusive Handcrafted Special'}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-amber-300 font-extrabold text-xs sm:text-sm">
                      Starting {currentSlide.cardProduct?.price || '₹599'}
                    </p>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                      {currentSlide.cardProduct?.delivery || 'Earliest: Today'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Same-day cutoff countdown badge matching Screenshot 1 */}
              {cutoffTime && (
                <div className="absolute -top-3.5 -right-3.5 bg-amber-400 text-slate-950 rounded-2xl px-3.5 py-2 text-center shadow-2xl border-2 border-white/40">
                  <p className="text-[8.5px] font-extrabold uppercase tracking-widest leading-tight">Same-Day Cutoff</p>
                  <p className="font-mono font-black text-sm sm:text-base leading-none mt-1 tracking-tight">{cutoffTime}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Navigation Arrows */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm cursor-pointer hover:scale-110 active:scale-95 z-20"
            aria-label="Previous Hero Slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm cursor-pointer hover:scale-110 active:scale-95 z-20"
            aria-label="Next Hero Slide"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Slide Indicator Dots + Progress Bar */}
      {totalSlides > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-slate-950/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          {activeSlides.map((s, idx) => (
            <button
              key={s.id || idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentIndex
                  ? 'w-6 h-2 bg-amber-400 shadow-sm'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}: ${s.tag || ''}`}
            />
          ))}

          <span className="text-[9px] font-bold text-rose-200 ml-1.5">
            {currentIndex + 1}/{totalSlides}
          </span>
        </div>
      )}
    </section>
  );
}
