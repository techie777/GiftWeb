'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, ShoppingBag, Sparkles, CheckCircle2, ShieldCheck, 
  ArrowRight, X, Phone, Mail, MapPin, Clock, Scale, 
  Award, AlertCircle, Check, Key, Store, Truck
} from 'lucide-react';
import { db } from '../lib/db';

export default function VendorOnboardingModal({ isOpen, onClose, onRegistered }) {
  const [step, setStep] = useState(1); // 1: Model | 2: Details | 3: Location | 4: Agreement | 5: Success

  // Form Fields
  const [sellingModel, setSellingModel] = useState('both'); // 'both' | 'b2c' | 'b2b'
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [primaryCategory, setPrimaryCategory] = useState('flowers');
  const [city, setCity] = useState('Indore');
  const [address, setAddress] = useState('');
  const [selectedAreas, setSelectedAreas] = useState('Vijay Nagar, New Palasia, Saket Nagar');
  const [openingTime, setOpeningTime] = useState('08:30 AM');
  const [closingTime, setClosingTime] = useState('10:00 PM');
  const [gstin, setGstin] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [createdVendor, setCreatedVendor] = useState(null);

  if (!isOpen) return null;

  const handleNextFromStep1 = () => {
    setStep(2);
  };

  const handleNextFromStep2 = () => {
    if (!businessName.trim()) {
      setError('Please enter your business or workshop name.');
      return;
    }
    if (!ownerName.trim()) {
      setError('Please enter contact person / proprietor name.');
      return;
    }
    if (!mobile.trim() || mobile.trim().length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!username.trim() || username.trim().length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }
    if (!/^\d{4}$/.test(pin)) {
      setError('Security PIN must be exactly 4 digits (e.g. 1234).');
      return;
    }
    setError('');
    setStep(3);
  };

  const handleNextFromStep3 = () => {
    if (!address.trim()) {
      setError('Please enter your workshop / shop full address.');
      return;
    }
    setError('');
    setStep(4);
  };

  const handleSubmitRegistration = async () => {
    if (!acceptTerms) {
      setError('Please review and accept the Master Partnership Agreement & SLA.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const vendorPayload = {
        name: ownerName.trim(),
        businessName: businessName.trim(),
        username: username.trim().toLowerCase().replace(/\s+/g, '_'),
        mobile: mobile.trim(),
        email: email.trim(),
        pin: pin.trim(),
        sellingModel, // 'both' | 'b2c' | 'b2b'
        category: primaryCategory,
        categories: [primaryCategory],
        city: city.trim(),
        address: address.trim(),
        areas: selectedAreas.split(',').map(a => a.trim()).filter(Boolean),
        gstin: gstin.trim(),
        openingTime,
        closingTime
      };

      const registered = await db.registerVendor(vendorPayload);
      setCreatedVendor(registered);
      setStep(5); // Success step
      if (onRegistered) onRegistered(registered);
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please verify your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[800] flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-hidden font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-rose-100 flex flex-col max-h-[92vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-gift-950 via-slate-900 to-rose-950 text-white p-5 sm:p-6 relative shrink-0">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300">
                <Store size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  Seller & Supplier Onboarding
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                  Partner with GiftPortal Luxe
                </h3>
              </div>
            </div>

            {/* Step Progress Bar */}
            {step < 5 && (
              <div className="pt-4 flex items-center gap-2">
                {[
                  { n: 1, label: 'Selling Model' },
                  { n: 2, label: 'Profile' },
                  { n: 3, label: 'Location' },
                  { n: 4, label: 'Digital SLA' }
                ].map(s => (
                  <div key={s.n} className="flex-1">
                    <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-wider mb-1">
                      <span className={step >= s.n ? 'text-amber-300' : 'text-slate-400'}>
                        {s.n}. {s.label}
                      </span>
                    </div>
                    <div className={`h-1.5 rounded-full ${step >= s.n ? 'bg-amber-400' : 'bg-white/20'}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Content */}
          <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">

            {/* STEP 1: SELLING MODEL SELECTION */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    How would you like to sell on GiftPortal?
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Select your business model. You can serve retail gift shoppers (B2C), wholesale vendor clients (B2B), or both.
                  </p>
                </div>

                <div className="space-y-3.5">
                  {/* Card 1: Hybrid Both */}
                  <div 
                    onClick={() => setSellingModel('both')}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                      sellingModel === 'both' 
                        ? 'bg-amber-50/70 border-amber-500 shadow-sm' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="absolute top-3 right-3 text-[9px] font-black uppercase tracking-wider bg-amber-500 text-white px-2.5 py-0.5 rounded-full shadow-2xs">
                      ⚡ RECOMMENDED · MAXIMUM INCOME
                    </div>
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles size={20} />
                      </div>
                      <div className="space-y-1 pr-12">
                        <h5 className="font-black text-slate-900 text-sm sm:text-base">
                          Both B2B Wholesale &amp; B2C Retail Selling
                        </h5>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          The complete powerhouse: Sell individual luxury gifts, cakes, bouquets to retail consumers, AND supply bulk wholesale raw materials / packaging to fellow partner vendors.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-bold text-amber-900">
                          <span className="bg-white/80 px-2 py-0.5 rounded-md border border-amber-200">✓ Retail Storefront Access</span>
                          <span className="bg-white/80 px-2 py-0.5 rounded-md border border-amber-200">✓ V2V Wholesale Exchange</span>
                          <span className="bg-white/80 px-2 py-0.5 rounded-md border border-amber-200">✓ Custom Wholesale MOQs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: B2C Only */}
                  <div 
                    onClick={() => setSellingModel('b2c')}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      sellingModel === 'b2c' 
                        ? 'bg-rose-50/70 border-rose-500 shadow-sm' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                        <ShoppingBag size={20} />
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-black text-slate-900 text-sm sm:text-base">
                          B2C Retail Selling (Vendor to Customer)
                        </h5>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          Direct to consumer e-commerce. Deliver handcrafted flowers, fresh patisserie cakes, gourmet hampers, and personalized gifts directly to customers with 2-hour and midnight delivery.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: B2B Only */}
                  <div 
                    onClick={() => setSellingModel('b2b')}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      sellingModel === 'b2b' 
                        ? 'bg-purple-50/70 border-purple-500 shadow-sm' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Building size={20} />
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-black text-slate-900 text-sm sm:text-base">
                          B2B Wholesale &amp; Bulk Supplies (Vendor to Vendor)
                        </h5>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          Bulk supply manufacturer / distributor. Supply bulk Dutch rose stems, wholesale gift hampers, laser-engraved blanks, cake bases, or packaging boxes to other florists and partner studios.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextFromStep1}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>Next: Business Profile</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PROFILE & CREDENTIALS */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    Business Profile &amp; Portal Login
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Enter your shop details and set a 4-digit PIN for logging into your Vendor Command Center.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase">Shop / Business Name *</label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Royal Blossom Florals"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase">Proprietor / Contact Name *</label>
                    <input
                      type="text"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase">Mobile Number (For Order OTPs) *</label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. shop@royalblossom.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-3">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                    <Key size={14} className="text-amber-600" />
                    <span>Vendor Portal Login Credentials</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-700 uppercase">Vendor Username *</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="e.g. royal_blossom"
                        className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 outline-none"
                      />
                      <span className="text-[9px] text-slate-400">Used to sign in at /admin</span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-700 uppercase">4-Digit Security PIN *</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                        placeholder="● ● ● ●"
                        className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-center text-sm font-black tracking-widest text-slate-900 outline-none font-mono"
                      />
                      <span className="text-[9px] text-slate-400">Remember this PIN to log in</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-700 uppercase">Primary Specialization Category *</label>
                  <select
                    value={primaryCategory}
                    onChange={(e) => setPrimaryCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 outline-none"
                  >
                    <option value="flowers">💐 Fresh Flowers & Exotic Bouquets</option>
                    <option value="cakes">🎂 Artisan Patisserie Cakes & Bakes</option>
                    <option value="hampers">🧺 Gourmet Luxury Hampers & Packaging</option>
                    <option value="personalized">✨ Laser Engraved & Photo Gifts</option>
                    <option value="plants">🪴 Botanical Indoor Plants & Bonsai</option>
                    <option value="chocolates">🍫 Handcrafted Belgian Chocolates</option>
                    <option value="electronics">🎧 Tech Gifts & Lifestyle Gadgets</option>
                  </select>
                </div>

                {error && (
                  <p className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                    <AlertCircle size={14} /> {error}
                  </p>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextFromStep2}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>Next: Workshop Location</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: WORKSHOP & LOGISTICS */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    Workshop Location &amp; Operating Hours
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    This location will be used by Rapido/Porter riders and courier vans for pickup dispatches.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase">Operating City *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 outline-none"
                    >
                      <option value="Indore">Indore (Primary Express Hub)</option>
                      <option value="Bhopal">Bhopal</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Pune">Pune</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase">GSTIN / Tax ID (Optional for artisans)</label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      placeholder="e.g. 23AAAAA0000A1Z5"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-rose-600 focus:bg-white uppercase"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-700 uppercase">Workshop / Shop Address *</label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Shop 18, Apollo Premier, Vijay Nagar, Indore"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 outline-none focus:border-rose-600 focus:bg-white resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-700 uppercase">Primary Serviceable Localities / Areas</label>
                  <input
                    type="text"
                    value={selectedAreas}
                    onChange={(e) => setSelectedAreas(e.target.value)}
                    placeholder="Vijay Nagar, New Palasia, Saket Nagar, Bengali Square"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-rose-600"
                  />
                  <span className="text-[9px] text-slate-400">Comma-separated areas your team can cater to</span>
                </div>

                <div className="grid grid-cols-2 gap-3.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase flex items-center gap-1">
                      <Clock size={12} className="text-slate-500" />
                      <span>Opening Time</span>
                    </label>
                    <input
                      type="text"
                      value={openingTime}
                      onChange={(e) => setOpeningTime(e.target.value)}
                      placeholder="08:30 AM"
                      className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs font-bold text-slate-900 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase flex items-center gap-1">
                      <Clock size={12} className="text-slate-500" />
                      <span>Closing Time</span>
                    </label>
                    <input
                      type="text"
                      value={closingTime}
                      onChange={(e) => setClosingTime(e.target.value)}
                      placeholder="10:00 PM"
                      className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs font-bold text-slate-900 outline-none"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                    <AlertCircle size={14} /> {error}
                  </p>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextFromStep3}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>Next: Agreement &amp; SLA</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: DIGITAL SLA & SUBMISSION */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Scale size={18} className="text-amber-600" />
                    <span>Master Partnership Agreement &amp; SLA Terms</span>
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Please review our partner commitments, Dual-OTP logistics protocol, and settlement terms.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 text-xs text-slate-700 space-y-3 max-h-56 overflow-y-auto leading-relaxed">
                  <div className="border-b border-slate-200/60 pb-2">
                    <strong className="text-slate-900 block text-xs">1. Selling Model &amp; Channel Commitment</strong>
                    <span>You are registering under the <strong>{sellingModel.toUpperCase()}</strong> channel. For B2B wholesale, minimum order quantities (MOQ) and tiered wholesale rates will be honored for partner vendors.</span>
                  </div>
                  <div className="border-b border-slate-200/60 pb-2">
                    <strong className="text-slate-900 block text-xs">2. Dual-OTP Handover Security</strong>
                    <span>Parcels collected from your workshop require verification of driver Pickup OTP. Doorstep deliveries require customer Drop OTP to guarantee zero loss or theft.</span>
                  </div>
                  <div className="border-b border-slate-200/60 pb-2">
                    <strong className="text-slate-900 block text-xs">3. Product Approval Policy</strong>
                    <span>To maintain luxury standards, any product you add, edit, or reactivate must receive Admin Approval before going live.</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-xs">4. Weekly Payout Settlements</strong>
                    <span>Net earnings (90% after standard 10% platform facilitation fee) are settled directly via NEFT/UPI with digital settlement vouchers.</span>
                  </div>
                </div>

                <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50/70 border border-amber-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded border-amber-300 mt-0.5 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    I, on behalf of <strong>{businessName}</strong>, agree to the Master Partnership Agreement and SLA fulfillment terms.
                  </span>
                </label>

                {error && (
                  <p className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                    <AlertCircle size={14} /> {error}
                  </p>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting || !acceptTerms}
                    onClick={handleSubmitRegistration}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <CheckCircle2 size={16} />
                    <span>{isSubmitting ? 'Registering Account...' : 'Complete Registration & Submit'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: SUCCESS & WELCOME */}
            {step === 5 && createdVendor && (
              <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-400">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl mx-auto flex items-center justify-center shadow-inner">
                  <CheckCircle2 size={40} />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                    Application Submitted Successfully
                  </span>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight">
                    Welcome, {createdVendor.businessName}!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your vendor application for <strong>{createdVendor.sellingModel?.toUpperCase()}</strong> selling has been sent to Master Admin.
                  </p>
                </div>

                {/* Account Summary Box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-bold">Vendor ID:</span>
                    <span className="font-mono font-bold text-slate-900">{createdVendor.id}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-bold">Portal Username:</span>
                    <span className="font-bold text-slate-900">{createdVendor.username}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-bold">Selling Channel:</span>
                    <span className="font-bold text-amber-700 uppercase">{createdVendor.sellingModel} (B2B &amp; B2C)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500 font-bold">Status:</span>
                    <span className="font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full text-[10px]">
                      Pending Admin Verification
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Done &amp; Close
                  </button>
                  <a
                    href="/admin"
                    className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Open Vendor Portal (/admin)</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
