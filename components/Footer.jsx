'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ShieldCheck, Truck, Clock, Heart, Sparkles, Crown, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer({ onOpenVendorOnboarding }) {
  return (
    <footer className="w-full bg-white text-slate-800 pt-16 pb-10 border-t border-rose-100/90 relative overflow-hidden font-sans">
      {/* Soft Light Glow Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-50/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 space-y-10 sm:space-y-14">
        
        {/* Luxury Light VIP Newsletter Section */}
        <div className="bg-gradient-to-r from-rose-50/90 via-amber-50/40 to-rose-100/60 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-rose-200/80 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 shadow-xs">
          <div className="space-y-2.5 sm:space-y-3 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200/80">
              <Crown size={14} className="text-amber-600" /> VIP Gifting Membership
            </div>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
              Unlock Exclusive Luxury Offers & Priority Midnight Slots
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Subscribe to receive private invitations to seasonal hamper releases, custom engraving previews, and member-only express delivery privileges.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="w-full sm:w-80 bg-white border border-rose-200/90 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-rose-600 transition-colors shadow-2xs"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto bg-rose-700 hover:bg-rose-800 text-white font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Join Club</span>
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>

        {/* 4-Column Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          
          {/* Col 1: Brand Story */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-700 to-rose-500 flex items-center justify-center text-white text-xl shadow-md shadow-rose-900/10">
                🎁
              </div>
              <div>
                <h4 className="font-serif font-bold text-xl text-slate-900 tracking-tight">GiftPortal Luxe</h4>
                <p className="text-[10px] font-bold tracking-widest text-rose-700 uppercase">Couture Gifting</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Crafting extraordinary gifting experiences across India. From handcrafted rose boxes to bespoke artisan hampers, we deliver emotions with precision and elegance.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-rose-50/80 hover:bg-rose-100 text-slate-600 hover:text-rose-700 flex items-center justify-center transition-all border border-rose-100 shadow-2xs"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Collections */}
          <div className="space-y-4">
            <h5 className="font-serif font-bold text-base text-slate-900 tracking-wide border-b border-rose-100/90 pb-2">
              Couture Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              {['Signature Rose Boxes', 'Gourmet Luxury Hampers', 'Artisan Chocolate Truffles', 'Custom Engraved Watches', 'Indoor Bonsai & Zen Pots'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-rose-700 transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-rose-600" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Why Us & Delivery Guarantees */}
          <div className="space-y-4">
            <h5 className="font-serif font-bold text-base text-slate-900 tracking-wide border-b border-rose-100/90 pb-2">
              Our Promise
            </h5>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">100% On-Time Guarantee</p>
                  <p className="text-[11px] text-slate-500">Delivered strictly within your chosen time slot.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Express 2-Hour Dispatch</p>
                  <p className="text-[11px] text-slate-500">Hyper-local courier delivery in 100+ cities.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Handcrafted Packaging</p>
                  <p className="text-[11px] text-slate-500">Includes free printed card with envelope.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Direct Concierge Contact */}
          <div className="space-y-4">
            <h5 className="font-serif font-bold text-base text-slate-900 tracking-wide border-b border-rose-100/90 pb-2">
              Luxe Concierge
            </h5>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-amber-600 shrink-0" />
                <span className="font-semibold text-slate-800">Call Us: 1800-LUXE-GIFT (Toll-Free)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-rose-600 shrink-0" />
                <span className="font-semibold text-slate-800">concierge@giftportalluxe.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-emerald-600 shrink-0" />
                <span className="text-slate-600">Metro Studio Hub, Mumbai & Delhi NCR</span>
              </div>
              <div className="pt-2">
                <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider mb-2">Accepted Payment Modes</p>
                <div className="flex items-center gap-2 flex-wrap text-[10px] font-bold text-slate-700">
                  <span className="bg-rose-50/60 border border-rose-100 px-2 py-1 rounded-md">UPI</span>
                  <span className="bg-rose-50/60 border border-rose-100 px-2 py-1 rounded-md">Razorpay</span>
                  <span className="bg-rose-50/60 border border-rose-100 px-2 py-1 rounded-md">Credit/Debit Cards</span>
                  <span className="bg-rose-50/60 border border-rose-100 px-2 py-1 rounded-md">NetBanking</span>
                  <span className="bg-rose-50/60 border border-rose-100 px-2 py-1 rounded-md">COD</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-rose-100/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p className="flex items-center justify-center sm:justify-start gap-1 flex-wrap font-medium">
            © 2026 GiftPortal Luxe Inc. All rights reserved. Handcrafted with <Heart size={12} className="text-rose-600 fill-rose-600 mx-0.5" /> in India.
          </p>
          <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 text-xs text-slate-600 font-semibold">
            {onOpenVendorOnboarding && (
              <button
                type="button"
                onClick={onOpenVendorOnboarding}
                className="text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>🤝 Sell with Us (B2B &amp; B2C)</span>
              </button>
            )}
            <Link href="/admin" className="text-rose-700 hover:text-rose-900 font-bold transition-colors">
              Vendor &amp; Admin Portal
            </Link>
            <Link href="/privacy-policy" className="hover:text-rose-700 transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-rose-700 transition-colors">Terms &amp; Conditions</Link>
            <Link href="/refund-policy" className="hover:text-rose-700 transition-colors">Refund / Cancellation Policy</Link>
            <Link href="/shipping-policy" className="hover:text-rose-700 transition-colors">Shipping &amp; Delivery</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
