import Link from 'next/link';
import { RotateCcw, ArrowLeft, Clock, ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle, FileText, Ban, CreditCard } from 'lucide-react';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Refund & Cancellation Policy | GiftPortal Luxe Couture Gifting',
  description: 'Understand our clear cancellation windows, perishable items return guidelines, and 5-7 day refund processing times.'
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/40 via-white to-white text-slate-800 font-sans">
      {/* Top Header Strip */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100/90 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-rose-700 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Boutique</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">100% Buyer Protection</span>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-widest border border-rose-200">
          <RotateCcw size={14} className="text-rose-700" /> Transparent Returns &amp; Swift Refunds
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Refund &amp; Cancellation Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          We want every recipient to be overjoyed. If an arrangement arrives damaged, compromised, or your plans change within our cancellation window, our team makes resolution seamless and immediate.
        </p>
        <div className="pt-2 text-xs text-slate-400 font-medium">
          Effective Date: <strong className="text-slate-700">January 1, 2026</strong> · Last Revised: <strong className="text-slate-700">September 12, 2026</strong>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 space-y-12">
        {/* Quick Refund Timeline Matrix Card */}
        <div className="bg-gradient-to-r from-rose-50/80 via-white to-amber-50/40 p-6 sm:p-8 rounded-3xl border border-rose-200/80 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-serif">
            <Clock size={18} className="text-rose-700" />
            <span>Resolution Windows at a Glance</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-2xs space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">2-Hour Cancellation Window</span>
              <p className="text-slate-600">Standard orders can be cancelled with a 100% full refund if requested at least 2 hours before the delivery slot begins.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-2xs space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">4-Hour Quality Notice</span>
              <p className="text-slate-600">Report any transit damage or floral wilt within 4 hours of receipt with a photo for instant replacement or refund.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-2xs space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">5–7 Business Days Refund</span>
              <p className="text-slate-600">Approved refunds are credited directly to your original payment method (UPI, credit/debit card, net banking).</p>
            </div>
          </div>
        </div>

        {/* Section 1: Order Cancellations */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">1</span>
            <span>Order Cancellation Cut-off Times</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Because our master florists harvest fresh blooms and our pastry chefs bake artisanal cakes to order, cancellation eligibility depends strictly on the stage of preparation:
          </p>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-950 block">Standard Daytime Delivery Orders (100% Full Refund)</strong>
                <p className="text-emerald-900/80 text-xs mt-0.5">Eligible for 100% cancellation refund if requested at least <strong className="text-emerald-950">2 hours prior</strong> to the scheduled time slot commencement.</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/60 flex items-start gap-3">
              <Clock size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-950 block">🌙 Midnight Delivery Slots (Cut-off: 7:00 PM on Delivery Date)</strong>
                <p className="text-amber-900/80 text-xs mt-0.5">Midnight orders require floral conditioning and night dispatch routing. Cancellations must be received before 7:00 PM IST on the date of delivery.</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/60 flex items-start gap-3">
              <Ban size={18} className="text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-950 block">⚡ Express 2-Hour Delivery Slots (Non-Cancellable Once Baking / Assembly Begins)</strong>
                <p className="text-rose-900/80 text-xs mt-0.5">Due to immediate 120-minute turnaround, express orders enter physical workshop assembly within 15 minutes of checkout and cannot be cancelled once preparation has started.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Non-Returnable Items */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">2</span>
            <span>Non-Returnable Goods &amp; Exceptions</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            In compliance with consumer health, safety, and hygiene standards, the following categories cannot be returned or physically sent back after handover:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
            <li><strong className="text-slate-800">Perishable Goods:</strong> Fresh cut flowers, floral bouquets, fresh cakes, pastries, gourmet chocolates, and fruit baskets.</li>
            <li><strong className="text-slate-800">Personalized / Customized Items:</strong> Products personalized with customer-provided photographs, custom laser engraving (e.g. watches, wooden plaques), or custom greeting messages.</li>
            <li><strong className="text-slate-800">Unsealed Wellness &amp; Fragrance Products:</strong> Scented luxury candles, reed diffusers, and bath hampers once the outer tamper-proof luxury seal has been breached.</li>
          </ul>
        </section>

        {/* Section 3: Damaged, Defective or Incorrect Items */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">3</span>
            <span>Damaged on Arrival &amp; Floral Wilt Guarantee</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            If an arrangement arrives noticeably damaged, squashed in transit, wilted, or with missing items, our <strong className="text-slate-900">Perfection Guarantee</strong> ensures immediate corrective action:
          </p>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 text-xs sm:text-sm">
            <h4 className="font-bold text-slate-900">How to Claim Immediate Resolution:</h4>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600">
              <li>Contact our concierge team via WhatsApp or email (<strong className="text-slate-800">concierge@giftportalluxe.com</strong>) within <strong className="text-slate-900">4 hours</strong> of delivery.</li>
              <li>Provide your <strong className="text-slate-800">Order ID</strong> (e.g. GP-1001) along with 2 clear photographs showing the condition of the package and item.</li>
              <li>Our concierge will verify your claim within 30 minutes and offer your choice of:
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <span className="bg-emerald-50 text-emerald-800 font-bold p-2 rounded-lg border border-emerald-200">
                    Option A: Free Priority Replacement dispatched immediately
                  </span>
                  <span className="bg-rose-50 text-rose-800 font-bold p-2 rounded-lg border border-rose-200">
                    Option B: 100% Full Refund credited to original payment method
                  </span>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Section 4: Refund Processing & Timelines */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">4</span>
            <span>Refund Processing Timeline</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Once an order cancellation or refund request is approved by our concierge or verified by our billing desk:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <strong className="text-slate-950 block">UPI Transactions</strong>
              <p className="text-emerald-700 font-mono font-bold text-sm">24 to 48 Hours</p>
              <p className="text-slate-500">Credited directly to the linked bank account associated with the VPA.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <strong className="text-slate-950 block">Credit &amp; Debit Cards</strong>
              <p className="text-emerald-700 font-mono font-bold text-sm">5 to 7 Business Days</p>
              <p className="text-slate-500">Subject to your card issuing bank's regular settlement cycle.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <strong className="text-slate-950 block">Net Banking</strong>
              <p className="text-emerald-700 font-mono font-bold text-sm">3 to 5 Business Days</p>
              <p className="text-slate-500">Processed via automated banking clearing networks (NEFT/IMPS).</p>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            A confirmation email containing the banking UTR (Unique Transaction Reference) number will be sent automatically once the payout has been initiated.
          </p>
        </section>

        {/* Concierge Contact Strip */}
        <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-lg sm:text-xl font-bold">Need Assistance with a Return or Refund?</h3>
            <p className="text-xs text-slate-400">Our concierge team is on standby 7 days a week, 8:00 AM to 11:30 PM IST.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href="mailto:concierge@giftportalluxe.com" 
              className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Email Concierge
            </a>
            <a 
              href="tel:18005893443" 
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-all border border-slate-700"
            >
              Call 1800-LUXE-GIFT
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
