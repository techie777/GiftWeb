'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, ShieldCheck, CheckCircle2, Clock, 
  Scale, AlertCircle, X, Download, Printer, Award 
} from 'lucide-react';
import { db } from '../lib/db';

export default function VendorAgreementModal({ isOpen, onClose, vendor }) {
  const [hasAgreed, setHasAgreed] = useState(true);
  const [signatoryName, setSignatoryName] = useState(vendor?.name || 'Authorized Partner');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[700] flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-md overflow-hidden font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-rose-100 flex flex-col max-h-[92vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-gift-950 to-rose-950 text-white p-5 sm:p-6 relative shrink-0">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300">
                <Scale size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                  Legal Agreement & SLA Terms · v2.4
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                  Vendor & Platform Master Partnership Agreement
                </h3>
              </div>
            </div>
          </div>

          {/* Agreement Body (Scrollable) */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-xs text-slate-700 leading-relaxed font-medium">
            
            {/* Agreement Status Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-black text-emerald-900 text-xs">
                    Partnership Agreement Active & In Good Standing
                  </h4>
                  <p className="text-[11px] text-emerald-700">
                    Signed by: <strong>{signatoryName}</strong> ({vendor?.businessName || vendor?.name || 'Partner'})
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold bg-white text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
                VERIFIED SLA
              </span>
            </div>

            {/* Clause 1 */}
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-xs font-black">1</span>
                <span>Quality Assurance & Packaging Standards</span>
              </h4>
              <p className="text-slate-600 pl-8">
                The Vendor warrants that all goods supplied (including fresh Dutch roses, botanical indoor plants, baked patisserie cakes, and luxury artisan hampers) match the high-resolution catalog photos and descriptions submitted. All parcels must be packaged using approved protective, insulated materials to prevent in-transit heat or structural damage.
              </p>
            </div>

            {/* Clause 2 */}
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-xs font-black">2</span>
                <span>Order Fulfillment Timelines (SLA)</span>
              </h4>
              <p className="text-slate-600 pl-8">
                Orders assigned to the Vendor by the Admin must be acknowledged and set to <strong>"Preparing"</strong> promptly. For Express Same-Day and Midnight orders, the product must be marked <strong>"Ready for Pickup"</strong> at least 90 minutes before the scheduled delivery slot to allow sufficient transit time.
              </p>
            </div>

            {/* Clause 3 */}
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-xs font-black">3</span>
                <span>Dual-OTP Security & Logistics Handover</span>
              </h4>
              <p className="text-slate-600 pl-8">
                To guarantee zero theft or shipment mix-up, the logistics driver will verify the parcel pickup via a secure <strong>4-Digit Pickup OTP</strong> provided to the Vendor. The delivery driver will only mark the product delivered to the customer upon verification of the customer's <strong>Delivery OTP</strong>.
              </p>
            </div>

            {/* Clause 4 */}
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-xs font-black">4</span>
                <span>Platform Commission & Payment Settlement</span>
              </h4>
              <p className="text-slate-600 pl-8">
                GiftPortal Luxe retains a standard <strong>10% platform facilitation fee</strong> on net item sales. Payments are settled on a scheduled weekly or bi-weekly cycle directly via NEFT/IMPS/UPI with digital settlement vouchers generated in the Vendor Settlement Window.
              </p>
            </div>

            {/* Clause 5 */}
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-xs font-black">5</span>
                <span>Personalized Gifts & Privacy Protection</span>
              </h4>
              <p className="text-slate-600 pl-8">
                High-resolution images and personalized text provided by customers for customized plaques, engraved items, or cards must be handled with strict confidentiality. Customer assets must never be distributed, displayed without consent, or repurposed.
              </p>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
            <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Legally Binding Digital SLA</span>
            </span>
            <button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Done / Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
