import Link from 'next/link';
import { Truck, ArrowLeft, Clock, ShieldCheck, CheckCircle2, MapPin, AlertCircle, Phone, Package, Send } from 'lucide-react';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Shipping & Delivery Policy | GiftPortal Luxe Couture Gifting',
  description: 'Explore delivery zones, estimated transit times, 2-hour express slots, and verified logistics partners for GiftPortal Luxe.'
};

export default function ShippingPolicyPage() {
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
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Live Logistics Active</span>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-widest border border-rose-200">
          <Truck size={14} className="text-rose-700" /> Express Dispatch &amp; Doorstep Protocol
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Shipping &amp; Delivery Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          From temperature-controlled flower boxes to midnight anniversary deliveries, we operate a bespoke logistics network engineered to deliver emotions with surgical precision.
        </p>
        <div className="pt-2 text-xs text-slate-400 font-medium">
          Effective Date: <strong className="text-slate-700">January 1, 2026</strong> · Last Revised: <strong className="text-slate-700">September 12, 2026</strong>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 space-y-12">
        {/* Quick Transit Time Grid Card */}
        <div className="bg-gradient-to-r from-rose-50/80 via-white to-amber-50/40 p-6 sm:p-8 rounded-3xl border border-rose-200/80 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-serif">
            <Clock size={18} className="text-rose-700" />
            <span>Estimated Transit Times &amp; Delivery Windows</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-2xs space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">Indore Same-Day</span>
              <p className="font-black text-slate-900 text-base">4 – 6 Hours</p>
              <p className="text-slate-500 text-[11px]">Orders placed before 9:00 PM qualify for daytime handover.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-2xs space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 block">⚡ Express 2-Hour</span>
              <p className="font-black text-slate-900 text-base">Within 120 Mins</p>
              <p className="text-slate-500 text-[11px]">Physical handover guaranteed within 2 hours in Indore.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-2xs space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 block">🌙 Midnight Surprise</span>
              <p className="font-black text-slate-900 text-base">11:30 PM – 12:15 AM</p>
              <p className="text-slate-500 text-[11px]">Handover timed specifically for midnight celebrations.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-2xs space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">📦 Pan-India Courier</span>
              <p className="font-black text-slate-900 text-base">2 – 4 Business Days</p>
              <p className="text-slate-500 text-[11px]">Air express shipping across 19,000+ Indian PIN codes.</p>
            </div>
          </div>
        </div>

        {/* Section 1: Serviceable Geographies */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">1</span>
            <span>Delivery Zones &amp; Serviceable Areas</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            GiftPortal Luxe operates a dual-tier fulfillment infrastructure:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <MapPin size={16} className="text-rose-600" />
                <span>Zone A: Hyper-Local Indore City (Same-Day)</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Full coverage across all major areas and townships: Vijay Nagar, Palasia, Old Palasia, Saket Nagar, Scheme 54, Scheme 78, AB Road, Bypass Road, Annapurna, Rajwada, Bhanwarkuan, Rau, Super Corridor, Nipania, and surrounding Indore societies.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Package size={16} className="text-purple-600" />
                <span>Zone B: Pan-India Courier Network</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Non-perishable keepsakes, customized luxury watches, engraved wooden frames, eternal preserved roses, and scented hampers are shipped pan-India to Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, and 19,000+ PIN codes.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Delivery Partner Disclosures */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">2</span>
            <span>Authorized Logistics Partners</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            To guarantee pristine presentation and thermal protection for delicate blooms and cakes, we partner exclusively with verified delivery networks:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1">
              <strong className="text-slate-900 block font-bold">Local On-Demand Fleet (Indore)</strong>
              <p className="text-slate-600">Rapido, Porter, Uber Package, and our in-house certified temperature-bagged delivery executive fleet.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1">
              <strong className="text-slate-900 block font-bold">National Express Air Couriers</strong>
              <p className="text-slate-600">BlueDart Express, Delhivery Air, and DTDC Express with live AWB satellite milestone tracking.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Doorstep OTP Handover */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">3</span>
            <span>Security &amp; Doorstep OTP Verification Protocol</span>
          </h3>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 text-xs sm:text-sm text-slate-600">
            <p className="leading-relaxed">
              Because GiftPortal Luxe deliveries often represent surprise celebrations, we maintain a secure <strong className="text-slate-900">Dual-OTP Security Protocol</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
                <strong className="text-amber-950 block">1. Pickup Verification OTP</strong>
                <p className="text-amber-900/80">The delivery driver must present a verified 4-digit Pickup OTP to the florist or baker before parcel release to eliminate wrongful pickups.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                <strong className="text-emerald-950 block">2. Recipient Handover OTP</strong>
                <p className="text-emerald-900/80">At the delivery doorstep, the recipient provides the 4-digit Delivery OTP sent via SMS to verify identity and record real-time handover.</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 pt-1">
              <em className="text-slate-700 font-semibold">Surprise Deliveries:</em> If you selected "Gifting Order (Surprise)" in cart, our driver will not reveal the sender's identity or contents until the gift is handed over!
            </p>
          </div>
        </section>

        {/* Section 4: Attempted & Failed Delivery Protocols */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">4</span>
            <span>Attempted Deliveries &amp; Re-routing Rules</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our delivery executives will make up to <strong className="text-slate-900">3 phone attempts</strong> and wait at the address for up to 15 minutes. In scenarios where:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
            <li><strong className="text-slate-800">Premises are Locked / Unreachable:</strong> With sender consent, the parcel will be left with a trusted neighbor, residential security desk, or building reception with digital photo confirmation.</li>
            <li><strong className="text-slate-800">Incorrect Address Provided by Sender:</strong> If the address is unreachable or non-existent, the driver returns the parcel to the hub. A re-delivery may be scheduled subject to a nominal re-dispatch fee.</li>
            <li><strong className="text-slate-800">Recipient Refusal:</strong> If the recipient explicitly declines acceptance of a gift order, the order is deemed fulfilled as the custom perishable arrangement was crafted and dispatched per instruction.</li>
          </ul>
        </section>

        {/* Dispatch Concierge Banner */}
        <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-lg sm:text-xl font-bold">Have a Time-Sensitive Delivery Question?</h3>
            <p className="text-xs text-slate-400">Track your order live in "My Orders" or speak directly to dispatch control.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link 
              href="/?tab=orders" 
              className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
            >
              <Send size={14} />
              <span>Live Order Tracking</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
