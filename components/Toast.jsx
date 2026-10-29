'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

export default function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0, y: 50, x: "-50%", scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
          exit={{ opacity: 0, y: 20, x: "-50%", scale: 0.9 }}
          className="fixed bottom-10 left-1/2 z-[500] w-max"
        >
          <div className="bg-gift-900 text-white px-8 py-5 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(136,19,55,0.4)] flex items-center gap-5 border border-gift-800 backdrop-blur-xl">
            <div className="bg-gift-600 p-3 rounded-2xl shadow-inner">
              <Sparkles size={24} className="text-white" />
            </div>
            <div className="space-y-0.5">
              <p className="font-black text-[11px] uppercase tracking-[0.2em] text-gift-400">Notification</p>
              <p className="font-black text-sm text-white tracking-tight">{message}</p>
            </div>
            <motion.button 
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="ml-6 p-2 hover:bg-white/10 rounded-xl transition-colors text-gift-400"
            >
              <X size={18} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
