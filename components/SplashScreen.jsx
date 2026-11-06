'use client';

import { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Zap, Heart, Gift } from 'lucide-react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Smooth progress from 15% to 100% in ~1.3 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              setIsVisible(false);
            }, 500);
          }, 200);
          return 100;
        }
        // Random increment between 8 and 18 for natural feel
        const inc = Math.floor(Math.random() * 12) + 8;
        return Math.min(100, prev + inc);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  const getStatusText = () => {
    if (progress < 40) return 'Curating handcrafted flowers & artisanal cakes...';
    if (progress < 80) return 'Setting up Indore express local delivery...';
    return 'Your luxury gifting store is ready ✨';
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[999999] flex flex-col justify-between items-center p-6 sm:p-10 select-none cursor-pointer transition-all duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundColor: '#FAF8F5',
        backgroundImage: 'radial-gradient(ellipse at 50% 35%, #FFFFFF 0%, #FAF8F5 60%, #F3ECE4 100%)'
      }}
    >
      {/* Top Bar */}
      <div className="w-full max-w-xl flex items-center justify-between text-xs" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 uppercase tracking-widest text-[10px] font-bold text-amber-900 bg-amber-100/80 border border-amber-300/70 px-3 py-1 rounded-full shadow-2xs">
            <Sparkles size={12} className="text-amber-600 fill-amber-500" />
            <span>Luxury Gifting Experience</span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="text-slate-500 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-1 rounded-full text-xs font-semibold shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center gap-1"
        >
          <span>Skip</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* Center Brand Showcase (Always 100% visible immediately, no opacity: 0 delay) */}
      <div className="flex flex-col items-center text-center space-y-6 max-w-md w-full px-4 my-auto">
        {/* Animated Brand Icon with Luxury Pulse */}
        <div className="relative">
          <div className="absolute -inset-4 bg-rose-500/20 rounded-3xl blur-2xl animate-pulse" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-rose-800 via-rose-700 to-amber-600 flex items-center justify-center text-white text-4xl sm:text-5xl shadow-2xl shadow-rose-950/25 border-4 border-white">
            <span className="transform hover:scale-110 transition-transform duration-300">🎁</span>
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2.5">
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight leading-none">
              GiftPortal
            </h1>
            <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-lg tracking-widest uppercase shadow-xs">
              LUXE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold tracking-wide">
            Handcrafted Flowers · Artisan Cakes · Bespoke Gifts
          </p>

          {/* Key Feature Pills */}
          <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
            <span className="text-[10px] font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
              🌸 Fresh Blooms
            </span>
            <span className="text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
              🎂 Gourmet Cakes
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              ⚡ 2-Hour Express
            </span>
          </div>
        </div>

        {/* Progress Bar & Real-time Status */}
        <div className="w-full max-w-xs space-y-2.5 pt-3">
          <div className="w-full h-2.5 bg-slate-200/90 rounded-full p-0.5 border border-slate-300/60 shadow-inner overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-700 via-amber-500 to-emerald-600 rounded-full transition-all duration-300 ease-out shadow-xs"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 px-1">
            <span className="truncate">{getStatusText()}</span>
            <span className="font-mono text-slate-700 font-bold shrink-0 ml-2">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Reassurance & Trust Badges */}
      <div className="w-full max-w-xl flex items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-slate-500 font-semibold flex-wrap text-center border-t border-slate-200/60 pt-4">
        <span className="flex items-center gap-1.5 text-amber-800">
          <Zap size={13} className="text-amber-500 fill-amber-500" /> Express Same-Day Delivery
        </span>
        <span className="text-slate-300 hidden sm:inline">•</span>
        <span className="flex items-center gap-1.5 text-emerald-800">
          <ShieldCheck size={13} className="text-emerald-600" /> 100% On-Time Guarantee
        </span>
        <span className="text-slate-300 hidden sm:inline">•</span>
        <span className="text-slate-600 font-bold">
          📍 Indore &amp; 100+ Metro Cities
        </span>
      </div>
    </div>
  );
}
