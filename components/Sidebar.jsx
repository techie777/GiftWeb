'use client';
import { motion } from 'framer-motion';
import { Home, Sparkles, Gift, Crown, Calendar, Users, Award, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '../lib/db';

export default function Sidebar({
  activeCategory,
  onCategoryChange,
  activeOccasion,
  onOccasionChange,
  activeRecipient,
  onRecipientChange,
  className = ''
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    db.getCategories().then(setCategories);
  }, []);

  const CATEGORIES = [
    { id: 'all', name: 'All Collections', icon: Home },
    { id: 'deals', name: 'Special Offers', icon: Sparkles },
    ...categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      image: cat.image
    }))
  ];

  const OCCASIONS = [
    { id: 'all', name: 'All Occasions' },
    { id: 'birthday', name: '🎂 Birthday Gifts' },
    { id: 'anniversary', name: '💍 Anniversary' },
    { id: 'love', name: '💖 Love & Romance' },
    { id: 'congratulations', name: '🎉 Congratulations' }
  ];

  const RECIPIENTS = [
    { id: 'all', name: 'Everyone' },
    { id: 'him', name: '👔 Gifts for Him' },
    { id: 'her', name: '👗 Gifts for Her' },
    { id: 'couples', name: '👩‍❤️‍👨 Couples' },
    { id: 'kids', name: '🧸 Kids & Teens' }
  ];

  return (
    <aside className={className || "w-64 h-[calc(100vh-65px)] bg-white border-r border-rose-100/60 flex-shrink-0 sticky top-[65px] overflow-y-auto hidden lg:block shadow-sm"}>
      <div className="p-5 space-y-6">
        
        {/* 1. Category Collections */}
        <nav className="space-y-1.5">
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Categories
          </p>
          <div className="space-y-1">
            {CATEGORIES.map((cat) => (
              <motion.button
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'text-rose-700 font-extrabold bg-rose-50 border border-rose-200/80 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {cat.icon ? (
                    <cat.icon
                      size={16}
                      className={activeCategory === cat.id ? 'text-rose-600' : 'text-slate-400'}
                    />
                  ) : (
                    <div className="w-4 h-4 rounded overflow-hidden flex-shrink-0 border border-rose-100 flex items-center justify-center bg-rose-50">
                      {cat.image ? (
                        <img src={cat.image} className="w-full h-full object-cover" alt="" />
                      ) : (
                        <Gift size={10} className="text-rose-400" />
                      )}
                    </div>
                  )}
                  <span>{cat.name}</span>
                </div>
                {activeCategory === cat.id && <ChevronRight size={14} className="text-rose-600" />}
              </motion.button>
            ))}
          </div>
        </nav>

        {/* 2. Occasion Filter */}
        <nav className="space-y-1.5 border-t border-rose-100/60 pt-4">
          <div className="flex items-center gap-2 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            <Calendar size={13} className="text-rose-600" />
            <span>Shop By Occasion</span>
          </div>
          <div className="space-y-1">
            {OCCASIONS.map((occ) => (
              <button
                key={occ.id}
                onClick={() => onOccasionChange(occ.id)}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeOccasion === occ.id
                    ? 'text-rose-700 bg-rose-50 font-bold border border-rose-200/80'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {occ.name}
              </button>
            ))}
          </div>
        </nav>

        {/* 3. Recipient Filter */}
        <nav className="space-y-1.5 border-t border-rose-100/60 pt-4">
          <div className="flex items-center gap-2 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            <Users size={13} className="text-rose-600" />
            <span>Shop By Recipient</span>
          </div>
          <div className="space-y-1">
            {RECIPIENTS.map((rec) => (
              <button
                key={rec.id}
                onClick={() => onRecipientChange(rec.id)}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeRecipient === rec.id
                    ? 'text-rose-700 bg-rose-50 font-bold border border-rose-200/80'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {rec.name}
              </button>
            ))}
          </div>
        </nav>

        {/* VIP Membership Card */}
        <div className="p-4 bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-rose-500/10 rounded-2xl border border-amber-200/60 relative overflow-hidden group cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500 text-white rounded-xl flex items-center justify-center shadow-md">
              <Award size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">VIP Luxe Pass</p>
              <p className="text-[10px] text-amber-700 font-semibold mt-0.5">Free Shipping & 2-Hr Slots</p>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}
