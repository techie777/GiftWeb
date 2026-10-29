import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, Mail, Phone, MapPin, CheckCircle2, UserCheck, Database, HelpCircle } from 'lucide-react';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | GiftPortal Luxe Couture Gifting',
  description: 'Learn how GiftPortal Luxe collects, protects, and handles your personal data in compliance with the DPDP Act 2023, GDPR, and CCPA.'
};

export default function PrivacyPolicyPage() {
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
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Legal &amp; Compliance Verified</span>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-widest border border-rose-200">
          <ShieldCheck size={14} className="text-rose-700" /> DPDP Act 2023 · GDPR · CCPA Compliant
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Privacy &amp; Data Protection Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          At GiftPortal Luxe, your trust is our highest priority. This policy outlines our uncompromising commitment to protecting your personal data, recipient information, and digital privacy.
        </p>
        <div className="pt-2 text-xs text-slate-400 font-medium">
          Effective Date: <strong className="text-slate-700">January 1, 2026</strong> · Last Revised: <strong className="text-slate-700">September 12, 2026</strong>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 space-y-12">
        {/* Quick Highlights Card */}
        <div className="bg-gradient-to-r from-rose-50/80 via-white to-amber-50/40 p-6 sm:p-8 rounded-3xl border border-rose-200/80 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-serif">
            <Lock size={18} className="text-rose-700" />
            <span>Key Data Commitments at a Glance</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-2xs space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">Zero Data Selling</span>
              <p className="text-slate-600">We never sell, rent, or trade your personal or recipient data to advertisers or third-party brokers.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-2xs space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">Bank-Grade Security</span>
              <p className="text-slate-600">All payment transactions are encrypted with 256-bit TLS and processed via PCI-DSS Level 1 compliant gateways.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-2xs space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 block">Recipient Confidentiality</span>
              <p className="text-slate-600">Gift messages and personalized photographs are kept strictly confidential and purged after fulfillment.</p>
            </div>
          </div>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">1</span>
            <span>Data Controller &amp; Scope of Policy</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            This Privacy Policy applies to the GiftPortal Luxe e-commerce platform (<strong className="text-slate-800">giftportalluxe.com</strong>), mobile websites, concierge ordering channels, and application programming interfaces operated by <strong className="text-slate-800">GiftPortal Luxe Private Limited</strong> (referred to as "GiftPortal Luxe", "we", "us", or "our"), having its registered head office in Indore, Madhya Pradesh, India.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            By accessing our store, registering an account, or placing an order, you acknowledge and agree to the collection, storage, and processing practices detailed in this document in accordance with the Indian Digital Personal Data Protection Act, 2023 (DPDP Act), the Information Technology Act, 2000, the EU General Data Protection Regulation (GDPR), and the California Consumer Privacy Act (CCPA).
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">2</span>
            <span>Personal Information We Collect</span>
          </h3>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>To provide high-precision couture gifting experiences, we collect the following categories of data:</p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li><strong className="text-slate-800">Customer (Sender) Details:</strong> Full name, telephone number, alternate contact number, email address, password/access PIN, billing address, and account preferences.</li>
              <li><strong className="text-slate-800">Recipient Fulfillment Details:</strong> Recipient name, delivery address, apartment/society name, landmark, postal PIN code, and contact phone number to facilitate delivery coordination.</li>
              <li><strong className="text-slate-800">Personalization Data:</strong> Custom engraving texts, greeting card messages, custom photographs uploaded for customized keepsake frames or custom cakes.</li>
              <li><strong className="text-slate-800">Transaction &amp; Billing Data:</strong> Order reference identifiers, amount paid, payment method used (UPI, Credit/Debit Card, NetBanking), payment processor transaction IDs, and invoice records. <em className="text-slate-500">Note: We never store complete credit card numbers or CVVs on our servers.</em></li>
              <li><strong className="text-slate-800">Technical Device Data:</strong> IP address, browser type, operating system version, time zone, and session interaction timestamps.</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">3</span>
            <span>Purpose &amp; Legal Basis of Processing</span>
          </h3>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Contractual Necessity &amp; Order Fulfillment:</strong>
                <p className="text-slate-600 text-xs mt-0.5">Assigning orders to verified partner florists/bakers, generating doorstep delivery OTPs, routing couriers, and dispatching real-time SMS/WhatsApp tracking updates.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Payment Reconciliation &amp; Fraud Prevention:</strong>
                <p className="text-slate-600 text-xs mt-0.5">Verifying payment gateway capture webhooks, preventing duplicate charges via idempotency keys, and complying with tax and audit laws.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Customer Support &amp; Concierge Assistance:</strong>
                <p className="text-slate-600 text-xs mt-0.5">Assisting with address modifications, delivery slot rescheduling, replacement requests, and VIP customer inquiries.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">4</span>
            <span>Third-Party Disclosures &amp; Service Providers</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            We share only the minimum necessary data with trusted service partners operating under strict confidentiality agreements:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <strong className="text-slate-900 block font-bold">Authorized Payment Gateways</strong>
              <p className="text-slate-500">Razorpay, Stripe, Cashfree, and PayU. All entities comply with PCI-DSS standards for encrypted financial transactions.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <strong className="text-slate-900 block font-bold">Logistics &amp; Delivery Fleets</strong>
              <p className="text-slate-500">Certified local delivery riders (Rapido, Porter, Uber Package) and air couriers (BlueDart, Delhivery, DTDC) for package transit.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <strong className="text-slate-900 block font-bold">Communication Gateways</strong>
              <p className="text-slate-500">Telephony and SMS/WhatsApp providers to transmit OTP codes, delivery dispatch alerts, and digital invoice links.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <strong className="text-slate-900 block font-bold">Law Enforcement &amp; Legal Duty</strong>
              <p className="text-slate-500">Only when mandatory under applicable statutory laws, court orders, or official governmental directives in India.</p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center shrink-0">5</span>
            <span>Your Rights Under DPDP Act 2023 &amp; GDPR</span>
          </h3>
          <div className="space-y-2 text-sm text-slate-600 leading-relaxed">
            <p>You have full sovereignty over your personal data. At any time, you may exercise:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong className="text-slate-800">Right to Access:</strong> Request a digital summary of all personal data held about you.</li>
              <li><strong className="text-slate-800">Right to Correction &amp; Update:</strong> Edit your saved shipping addresses, contact numbers, and profile info directly in your account.</li>
              <li><strong className="text-slate-800">Right to Erasure / Deletion:</strong> Request permanent removal of your account, saved cards, and address history, subject to statutory tax retention requirements.</li>
              <li><strong className="text-slate-800">Right to Withdraw Consent:</strong> Unsubscribe from marketing promotions or VIP newsletters at any time with 1-click.</li>
            </ul>
          </div>
        </section>

        {/* Section 6: Grievance Officer */}
        <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold">Grievance Redressal Officer</h3>
              <p className="text-xs text-slate-400">In accordance with the Information Technology Act &amp; DPDP Act, 2023</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="space-y-1 text-slate-300">
              <p><strong className="text-white">Officer Name:</strong> Rajeshwari Singhal</p>
              <p><strong className="text-white">Designation:</strong> Data Protection &amp; Grievance Lead</p>
              <p><strong className="text-white">Email:</strong> <a href="mailto:grievance@giftportalluxe.com" className="text-rose-400 hover:underline">grievance@giftportalluxe.com</a></p>
            </div>
            <div className="space-y-1 text-slate-300">
              <p><strong className="text-white">Office:</strong> GiftPortal Luxe Tower, AB Road, Indore, MP 452010</p>
              <p><strong className="text-white">Response Time:</strong> Acknowledged within 24 hours, resolved within 15 days</p>
              <p><strong className="text-white">Toll-Free Helpline:</strong> 1800-LUXE-GIFT (10:00 AM - 6:00 PM IST)</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
