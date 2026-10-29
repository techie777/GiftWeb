'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe2, Plane, ShieldCheck, Clock, CheckCircle2, 
  Sparkles, Search, ArrowRight, X, HeartHandshake, Box
} from 'lucide-react';

const POPULAR_COUNTRIES = [
  { code: 'US', flag: '🇺🇸', name: 'United States', region: 'Americas', transit: '3-4 Business Days', dutyFree: true, popular: true },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom', region: 'Europe', transit: '3-5 Business Days', dutyFree: true, popular: true },
  { code: 'CA', flag: '🇨🇦', name: 'Canada', region: 'Americas', transit: '3-5 Business Days', dutyFree: true, popular: true },
  { code: 'AE', flag: '🇦🇪', name: 'United Arab Emirates (Dubai)', region: 'Middle East', transit: '2-3 Business Days', dutyFree: true, popular: true },
  { code: 'AU', flag: '🇦🇺', name: 'Australia', region: 'Oceania', transit: '4-5 Business Days', dutyFree: true, popular: true },
  { code: 'SG', flag: '🇸🇬', name: 'Singapore', region: 'Asia Pacific', transit: '2-3 Business Days', dutyFree: true, popular: true },
  { code: 'DE', flag: '🇩🇪', name: 'Germany', region: 'Europe', transit: '3-5 Business Days', dutyFree: true, popular: true },
  { code: 'FR', flag: '🇫🇷', name: 'France', region: 'Europe', transit: '3-5 Business Days', dutyFree: true, popular: true },
  { code: 'NZ', flag: '🇳🇿', name: 'New Zealand', region: 'Oceania', transit: '4-6 Business Days', dutyFree: true, popular: false },
  { code: 'SA', flag: '🇸🇦', name: 'Saudi Arabia', region: 'Middle East', transit: '3-4 Business Days', dutyFree: true, popular: false },
  { code: 'MY', flag: '🇲🇾', name: 'Malaysia', region: 'Asia Pacific', transit: '3-4 Business Days', dutyFree: true, popular: false },
  { code: 'IT', flag: '🇮🇹', name: 'Italy', region: 'Europe', transit: '4-5 Business Days', dutyFree: true, popular: false },
  { code: 'JP', flag: '🇯🇵', name: 'Japan', region: 'Asia Pacific', transit: '3-4 Business Days', dutyFree: true, popular: false },
  { code: 'NL', flag: '🇳🇱', name: 'Netherlands', region: 'Europe', transit: '3-4 Business Days', dutyFree: true, popular: false },
];

const GLOBAL_PERKS = [
  {
    icon: Plane,
    title: 'Priority Global Express Air',
    description: 'Direct air courier via DHL & FedEx Global with express customs clearance.'
  },
  {
    icon: ShieldCheck,
    title: 'Customs & Duties Pre-Cleared',
    description: 'No hidden taxes or customs fees for your overseas recipient.'
  },
  {
    icon: Box,
    title: 'Luxury Fragile Protective Packaging',
    description: 'Insulated, climate-resistant wrapping to preserve freshness and elegance.'
  },
  {
    icon: HeartHandshake,
    title: '24/7 Global Gifting Concierge',
    description: 'Dedicated timezone support and live WhatsApp delivery confirmation.'
  }
];

export default function InternationalShipping() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredCountries = POPULAR_COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full bg-gradient-to-b from-rose-50/50 via-white to-rose-50/30 py-14 sm:py-20 border-t border-rose-100/80 relative overflow-hidden font-sans">
      {/* Decorative ambient gradients */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-rose-200/30 via-amber-200/20 to-purple-200/30 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 text-rose-900 border border-rose-200 text-[11px] font-black uppercase tracking-widest shadow-2xs">
            <Globe2 size={14} className="text-rose-700 animate-spin-slow" />
            <span>Worldwide Delivery Network · 45+ Countries</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Connecting Loved Ones Across Oceans & Timezones
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Whether your family, partner, or corporate partners live in New York, London, Dubai, or Sydney, 
            send artisan hampers, personalized keepsake gifts, and Dutch blooms with doorstep international delivery.
          </p>

          {/* Quick Search Input */}
          <div className="pt-2 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search your destination country (e.g. Canada, UK, UAE)..."
                className="w-full bg-white border-2 border-rose-200/80 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-medium outline-none focus:border-rose-600 shadow-sm transition-all"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Popular Countries Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Plane size={14} className="text-rose-600" />
              <span>We Proudly Ship To The Following Countries</span>
            </h3>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              {filteredCountries.length} Destinations Available
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {filteredCountries.map((c) => (
              <motion.button
                key={c.code}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCountry(c)}
                className="bg-white hover:bg-gradient-to-br hover:from-white hover:to-rose-50/60 border border-rose-100 hover:border-rose-300 rounded-2xl p-3.5 text-left flex flex-col justify-between space-y-2.5 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl sm:text-3xl leading-none drop-shadow-sm">{c.flag}</span>
                  {c.popular && (
                    <span className="text-[8px] font-black uppercase bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded-full tracking-wider">
                      Popular
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-xs tracking-tight group-hover:text-rose-700 transition-colors line-clamp-1">
                    {c.name}
                  </h4>
                  <p className="text-[10px] font-medium text-slate-500 flex items-center gap-1 mt-0.5">
                    <Clock size={10} className="text-rose-600 shrink-0" />
                    <span>{c.transit}</span>
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Global Perks Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {GLOBAL_PERKS.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div 
                key={index}
                className="bg-white/90 backdrop-blur-sm border border-rose-100/90 rounded-2xl p-5 space-y-2.5 shadow-2xs hover:border-rose-300 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-rose-800 text-white flex items-center justify-center shadow-md shadow-rose-900/10">
                  <Icon size={18} />
                </div>
                <h4 className="font-bold text-slate-900 text-xs tracking-tight">
                  {perk.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Country Details Modal */}
        <AnimatePresence>
          {selectedCountry && (
            <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-rose-100 space-y-5 relative font-sans"
              >
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  <X size={16} />
                </button>

                <div className="flex items-center gap-4">
                  <div className="text-4xl">{selectedCountry.flag}</div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      {selectedCountry.region}
                    </span>
                    <h3 className="font-serif text-xl font-black text-slate-900 mt-1">
                      {selectedCountry.name}
                    </h3>
                  </div>
                </div>

                <div className="bg-rose-50/60 rounded-2xl p-4 border border-rose-100 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-500">Transit Duration</span>
                    <span className="font-extrabold text-slate-900">{selectedCountry.transit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-500">Customs Clearance</span>
                    <span className="font-extrabold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 size={13} /> 100% Pre-Cleared
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-500">Packaging</span>
                    <span className="font-extrabold text-slate-900">Climate Insulated Box</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-500">Courier Partner</span>
                    <span className="font-extrabold text-slate-900">DHL Express / FedEx Priority</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  Orders placed for {selectedCountry.name} include express air bill dispatch, gift message printing in local time, and active milestone tracking sent via email & SMS.
                </p>

                <button
                  onClick={() => setSelectedCountry(null)}
                  className="w-full bg-rose-700 hover:bg-rose-800 text-white font-extrabold py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Explore Gifts for {selectedCountry.name}</span>
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
