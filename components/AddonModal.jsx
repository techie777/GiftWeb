'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, ArrowRight, ShieldCheck, Gift } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '../lib/db';

export default function AddonModal({ isOpen, onClose, mainItem, onConfirmAddons }) {
  const [addonsList, setAddonsList] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);

  useEffect(() => {
    if (isOpen) {
      db.getAddons().then(setAddonsList);
      setSelectedAddons([]);
    }
  }, [isOpen]);

  if (!isOpen || !mainItem) return null;

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => {
      const exists = prev.some(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);

  const handleContinue = () => {
    onConfirmAddons(selectedAddons);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[350] overflow-hidden">
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
            <div className="bg-gradient-to-br from-gift-950 via-gift-900 to-rose-950 p-6 text-white relative shrink-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-5 right-5 p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-rose-100 hover:text-white transition-colors border border-white/10 shadow-lg"
                aria-label="Close dialogue"
              >
                <X size={18} />
              </motion.button>

              <div className="pr-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                  <Sparkles size={11} className="text-amber-400" />
                  Luxury Pairings
                </div>

                <h3 className="font-serif font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                  Frequently Bought Together
                </h3>

                <p className="text-xs font-medium text-rose-200/90 leading-relaxed">
                  Enhance <span className="text-amber-300 font-bold underline decoration-amber-400/60">{mainItem.name}</span> with complementary gourmet treats or keepsakes.
                </p>
              </div>
            </div>

            {/* Scrollable Addons Grid */}
            <div className="p-5 md:p-6 overflow-y-auto space-y-4 flex-1 no-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {addonsList.map((addon) => {
                  const isSelected = selectedAddons.some(a => a.id === addon.id);
                  return (
                    <motion.div
                      key={addon.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => toggleAddon(addon)}
                      className={`relative p-3.5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-rose-600 bg-rose-50/70 shadow-md'
                          : 'border-slate-200 hover:border-rose-300 bg-white shadow-sm'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-rose-700 text-white flex items-center justify-center shadow-md">
                          <Check size={13} />
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <img
                          src={addon.img}
                          alt={addon.name}
                          className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
                        />
                        <div className="flex-1 min-w-0 pr-4">
                          <p className="text-xs font-extrabold text-slate-900 leading-tight line-clamp-2">{addon.name}</p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="text-sm font-black text-rose-700">₹{addon.price}</span>
                            <span className="text-[10px] text-slate-400 line-through font-bold">₹{addon.original}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-dashed border-slate-200 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider">
                        <span className="text-slate-500">{addon.emoji} Add-on</span>
                        <span className={isSelected ? 'text-rose-700 font-black' : 'text-slate-700'}>
                          {isSelected ? 'Selected ✓' : '+ Add Item'}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Packaging guarantee banner */}
              <div className="bg-amber-50/80 rounded-2xl p-3.5 border border-amber-200 flex items-center gap-3">
                <ShieldCheck size={20} className="text-amber-600 shrink-0" />
                <p className="text-xs font-semibold text-amber-950">
                  <span className="font-extrabold">Handcrafted Packaging:</span> All chosen pairings are nestled neatly inside the main presentation box.
                </p>
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="p-5 md:p-6 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-4 shrink-0">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Add-ons</p>
                <p className="text-lg font-black text-rose-700 tracking-tight">
                  {selectedAddons.length > 0 ? `+ ₹${addonsTotal} (${selectedAddons.length} item${selectedAddons.length === 1 ? '' : 's'})` : 'None added'}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleContinue}
                  className="text-xs font-black text-slate-500 hover:text-slate-900 px-3 py-2 transition-colors uppercase tracking-wider cursor-pointer"
                >
                  Skip
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-rose-800 via-rose-700 to-rose-900 hover:from-rose-900 hover:to-rose-950 text-white px-5 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-rose-900/20 transition-all border border-rose-600/30 cursor-pointer"
                >
                  <span>Continue to Bag</span>
                  <ArrowRight size={15} />
                </motion.button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
