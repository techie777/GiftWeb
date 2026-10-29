import Link from 'next/link';
import { Scale, ArrowLeft, ShieldAlert, CheckCircle2, Clock, MapPin, AlertCircle, FileCheck } from 'lucide-react';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms & Conditions | GiftPortal Luxe Couture Gifting',
  description: 'Review the terms of purchase contract, delivery slots, substitution policies, and dispute jurisdiction for GiftPortal Luxe.'
};

export default function TermsAndConditionsPage() {
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
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Legal Agreement Active</span>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-widest border border-rose-200">
          <Scale size={14} className="text-rose-700" /> Purchase Contract &amp; Service Agreement
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Please read these terms carefully before placing an order. They establish the legal purchase contract between you and GiftPortal Luxe Private Limited.
        </p>
        <div className="pt-2 text-xs text-slate-400 font-medium">
          Effective Date: <strong className="text-slate-700">January 1, 2026</strong> · Last Revised: <strong className="text-slate-700">September 12, 2026</strong>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 space-y-12">
        {/* Important Notice Callout */}
        <div className="bg-amber-50/80 border-2 border-amber-300/80 p-5 sm:p-6 rounded-3xl text-amber-950 text-xs sm:text-sm space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertCircle size={18} className="text-amber-700 shrink-0" />
            <span>Essential Purchase Terms for Perishable Goods</span>
          </div>
          <p className="text-amber-900/90 leading-relaxed text-xs">
            GiftPortal Luxe specializes in fresh floral arrangements, artisan cakes, chocolates, and bespoke personalized keepsakes. Because fresh flowers and cakes are delicate and perishable, specific cancellation cut-offs and delivery verification procedures apply to guarantee peak freshness upon arrival.
          </p>
        </div>

        {/* Section 1: Agreement to Terms */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">1</span>
            <span>Agreement &amp; User Eligibility</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            By visiting, browsing, or placing an order through <strong className="text-slate-900">GiftPortal Luxe</strong>, you agree to be bound by these Terms and Conditions, all applicable laws and regulations in India, and agree that you are responsible for compliance with local laws.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            You must be at least 18 years of age or possess legal parental/guardian consent to enter into binding purchase contracts on this platform. If you are ordering on behalf of an enterprise or entity, you represent and warrant that you possess the authority to bind that entity.
          </p>
        </section>

        {/* Section 2: Pricing & Payment */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">2</span>
            <span>Pricing, Taxes &amp; Payment Security</span>
          </h3>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>All prices listed across our catalogue are in Indian Rupees (INR) and are inclusive of applicable Goods and Services Tax (GST) unless explicitly indicated otherwise.</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong className="text-slate-800">Dynamic Slot Fees:</strong> Fixed delivery slots (e.g. Midnight 11:30 PM–12:15 AM or 2-Hour Express) incur designated surcharge fees clearly itemized in the cart before payment.</li>
              <li><strong className="text-slate-800">Payment Authorization:</strong> Orders are validated and accepted only upon successful authorization and capture confirmation by our integrated payment gateways (Razorpay, Stripe, Cashfree, UPI).</li>
              <li><strong className="text-slate-800">Fraud Prevention:</strong> We reserve the right to decline or cancel any transaction suspected of fraudulent activity, unauthorized card usage, or address spoofing.</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Delivery Slots & Fulfillment */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">3</span>
            <span>Delivery Slots &amp; Recipient Handover</span>
          </h3>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>We take pride in our punctuality and offer multiple specialized delivery tiers:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                <strong className="text-slate-900 block font-bold">Standard Daytime (Indore)</strong>
                <p className="text-slate-500">Delivered within the chosen daytime window (9:00 AM to 9:00 PM). Orders placed before 9:00 PM qualify for same-day delivery.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                <strong className="text-slate-900 block font-bold">⚡ Express 2-Hour Delivery</strong>
                <p className="text-slate-500">Handcrafted and dispatched within 120 minutes of order confirmation in serviceable Indore zones.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                <strong className="text-slate-900 block font-bold">🌙 Midnight Delivery (11:30 PM - 12:15 AM)</strong>
                <p className="text-slate-500">Specially routed for birthday and anniversary surprise moments. Handover occurs between 11:30 PM and 12:15 AM.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                <strong className="text-slate-900 block font-bold">📦 Pan-India Courier Transit</strong>
                <p className="text-slate-500">Shipped via premium air couriers (BlueDart/Delhivery) with tracking in 2 to 4 business days.</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 pt-1">
              <strong className="text-slate-700">Doorstep OTP Handover:</strong> To ensure high-value packages reach the rightful recipient, our executive may request the 4-digit Delivery OTP sent to the sender/recipient phone.
            </p>
          </div>
        </section>

        {/* Section 4: Substitution Policy */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">4</span>
            <span>Artisan &amp; Floral Substitution Policy</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Due to the seasonal nature of fresh flowers and regional micro-climates, specific bloom varieties or exact container shades displayed in photographs may occasionally be unavailable at the time of arrangement.
          </p>
          <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-100 text-xs text-slate-700 space-y-1.5">
            <p className="font-bold text-rose-950">Our Floral Integrity Guarantee:</p>
            <p>If a specific stem or foliage is unavailable, our master florists will substitute with blooms of <strong className="text-rose-900">equal or higher monetary value</strong> while meticulously maintaining the color palette, aesthetic balance, and luxury scale of your chosen arrangement.</p>
          </div>
        </section>

        {/* Section 5: Limitation of Liability */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">5</span>
            <span>Limitation of Liability &amp; Force Majeure</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            In no event shall GiftPortal Luxe, its directors, employees, or partner vendors be liable for indirect, incidental, or consequential damages arising from delays caused by Force Majeure events, including severe weather, unannounced civil roadblocks, natural disasters, or unexpected state curfew restrictions.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our aggregate liability for any claim arising out of a purchased order shall not exceed the total purchase price actually paid by the customer for that specific order.
          </p>
        </section>

        {/* Section 6: Governing Law & Jurisdiction */}
        <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-3">
          <h3 className="font-serif text-lg sm:text-xl font-bold flex items-center gap-2">
            <Scale size={20} className="text-rose-400" />
            <span>Governing Law &amp; Exclusive Dispute Jurisdiction</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            These Terms &amp; Conditions and any dispute or claim arising out of or in connection with them or their subject matter shall be governed by and construed strictly in accordance with the laws of the <strong className="text-white">Republic of India</strong>.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            The parties irrevocably agree that the courts situated in <strong className="text-rose-300">Indore, Madhya Pradesh, India</strong> shall have exclusive jurisdiction to settle any dispute, controversy, or claim arising out of or relating to this contract.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
