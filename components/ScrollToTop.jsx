'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastVisible = false;
    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const nowVisible = window.scrollY > 300;
          if (nowVisible !== lastVisible) {
            lastVisible = nowVisible;
            setIsVisible(nowVisible);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.7, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 14 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          aria-label="Go to top"
          title="Go to top"
          className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-[990] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-rose-800 via-rose-700 to-rose-600 text-white shadow-lg shadow-rose-950/30 ring-2 ring-white/90 border border-rose-400/40 flex items-center justify-center cursor-pointer group transition-shadow hover:shadow-xl hover:shadow-rose-900/40"
        >
          <ArrowUp 
            size={20} 
            className="group-hover:-translate-y-0.5 transition-transform duration-200 stroke-[2.5]" 
          />
          <span className="sr-only">Go to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
