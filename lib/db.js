// Database Service Layer for GiftPortal
// Centralized server-synchronized data persistence across Customer Web, Master Admin, Jr Admin, and Shop Vendor

export const DB_KEYS = {
  PRODUCTS: 'giftportal_inventory',
  DEALS: 'giftportal_deals',
  USERS: 'giftportal_users',
  ORDERS: 'giftportal_orders',
  AREAS: 'giftportal_areas',
  SOCIETIES: 'giftportal_societies',
  CATEGORIES: 'giftportal_categories',
  NOTIFICATIONS: 'giftportal_notifications',
  COUPONS: 'giftportal_coupons',
  SETTINGS: 'giftportal_settings',
  ADMINS: 'giftportal_admins',
  VENDORS: 'giftportal_vendors',
  FAVOURITES: 'giftportal_favourites',
  TICKETS: 'giftportal_support_tickets',
  SETTLEMENTS: 'giftportal_vendor_settlements',
  AGREEMENTS: 'giftportal_vendor_agreements',
  HERO_SLIDES: 'giftportal_hero_slides',
  CITIES: 'giftportal_cities',
  B2B_ORDERS: 'giftportal_b2b_orders'
};

let currentLocalVersion = 0;
let isSyncing = false;
let bootstrapDone = false;

export function broadcastSync() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('storage'));
  window.dispatchEvent(new Event('giftportal_sync'));
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      if (!window.__giftportalBc) {
        window.__giftportalBc = new BroadcastChannel('giftportal_sync_channel');
      }
      window.__giftportalBc.postMessage({ type: 'sync', timestamp: Date.now() });
    }
  } catch (e) {}
}

export async function postSyncAction(action, payload = {}) {
  if (typeof window === 'undefined') return null;
  try {
    const res = await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, payload })
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.version) {
      currentLocalVersion = data.version;
      localStorage.setItem('giftportal_db_version', String(data.version));
    }
    broadcastSync();
    return data;
  } catch (err) {
    console.warn('Network sync offline fallback:', err);
    return null;
  }
}

export function isIndoreOrder(order) {
  if (!order) return true;
  if (order.deliveryZone === 'indore' || order.deliveryType === 'local') return true;
  if (order.deliveryZone === 'other_city' || order.deliveryType === 'courier') return false;

  const rawCity = (
    order.recipient?.city ||
    order.address?.city ||
    order.city ||
    ''
  ).trim().toLowerCase();

  if (rawCity) {
    return rawCity.includes('indore');
  }

  const rawArea = (
    order.recipient?.area ||
    order.address?.area ||
    (typeof order.area === 'object' ? order.area.area : order.area) ||
    ''
  ).trim().toLowerCase();

  if (rawArea) {
    return rawArea.includes('indore') || (!rawArea.includes('mumbai') && !rawArea.includes('bhopal') && !rawArea.includes('delhi'));
  }

  return true;
}

export function getOrderLogisticsInfo(order) {
  const isIndore = isIndoreOrder(order);
  const city = (
    order?.recipient?.city ||
    order?.address?.city ||
    order?.city ||
    (isIndore ? 'Indore' : 'Other City')
  ).trim();

  const isShipped = Boolean(
    order?.status === 'Shipped' ||
    (order?.logistics?.type === 'courier' && order?.logistics?.trackingId)
  );

  return {
    isIndore,
    deliveryZone: isIndore ? 'indore' : 'other_city',
    deliveryType: isIndore ? 'local' : 'courier',
    city: city || (isIndore ? 'Indore' : 'Domestic Destination'),
    timeline: isIndore ? '1-2 Days (90% Same-Day)' : '3-5 Days Courier',
    label: isIndore ? 'Indore Local (Same-Day / 1-2 Days)' : `Courier Shipping (${city})`,
    badgeText: isIndore ? '⚡ Indore Local' : `📦 Courier: ${city}`,
    isShippedViaCourier: isShipped,
    trackingId: order?.logistics?.trackingId || '',
    trackingUrl: order?.logistics?.trackingUrl || '',
    courierProvider: order?.logistics?.provider || ''
  };
}

import { PRODUCTS as DEFAULT_PRODUCTS, DEALS as DEFAULT_DEALS, ADDONS as DEFAULT_ADDONS } from '../data/products.js';

export const DEFAULT_HERO_SLIDES = [
  {
    id: 'hero-flowers-plants',
    order: 1,
    isActive: true,
    categoryKey: 'flowers',
    tag: 'Flower & Plants',
    badge: '⚡ Delivering Right Now · Mumbai, Delhi, Bangalore, Pune',
    badgeColor: 'emerald',
    title: 'Gift Something',
    titleHighlight: 'Unforgettable',
    subtitle: 'Handpicked morning-fresh Dutch roses, exotic orchids & living zen bonsai plants — same-day delivered with live photo confirmation.',
    ctaPrimaryText: 'Explore Flowers & Plants',
    ctaPrimaryCategory: 'flowers',
    ctaSecondaryText: 'Same-Day Delivery',
    ctaSecondaryCategory: 'same-day',
    bgGradient: 'from-rose-950 via-gift-950 to-slate-950',
    cardProduct: {
      name: 'Guitarist With 10 Red Roses',
      price: '₹2,799',
      delivery: 'Earliest Delivery: Today',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop'
    }
  },
  {
    id: 'hero-cakes-decor',
    order: 2,
    isActive: true,
    categoryKey: 'cakes',
    tag: 'Cakes & Decoration',
    badge: '🎂 Handcrafted by Master Patissiers · 100% Eggless Options',
    badgeColor: 'amber',
    title: 'Celebrate with',
    titleHighlight: 'Sweet Luxury',
    subtitle: 'Decadent Belgian chocolate truffles, heart velvet cakes & bespoke balloon marquee styling for midnight birthday surprises.',
    ctaPrimaryText: 'Explore Cakes & Decor',
    ctaPrimaryCategory: 'cakes',
    ctaSecondaryText: 'Midnight Surprise',
    ctaSecondaryCategory: 'cakes',
    bgGradient: 'from-amber-950 via-rose-950 to-purple-950',
    cardProduct: {
      name: 'Decadent Dutch Chocolate Truffle Cake',
      price: '₹549',
      delivery: 'Earliest Delivery: Today',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop'
    }
  },
  {
    id: 'hero-toys-tech',
    order: 3,
    isActive: true,
    categoryKey: 'toys',
    tag: 'Gifts, STEM & Soft Toys',
    badge: '🧸 Smart Educational Toys & Huggable Cuddly Companions',
    badgeColor: 'blue',
    title: 'Spark Wonder &',
    titleHighlight: 'Pure Joy',
    subtitle: 'Curated 12-in-1 STEM robotic kits, giant 3.5ft soft plush teddy bears & cutting-edge lifestyle electronic gadgets for kids & teens.',
    ctaPrimaryText: 'Shop Kids & Tech',
    ctaPrimaryCategory: 'toys',
    ctaSecondaryText: 'Educational Gifts',
    ctaSecondaryCategory: 'educational',
    bgGradient: 'from-indigo-950 via-slate-900 to-rose-950',
    cardProduct: {
      name: 'Giant 3-Foot Cuddly Plush Teddy Bear',
      price: '₹799',
      delivery: 'Earliest Delivery: Today',
      image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500&auto=format&fit=crop'
    }
  },
  {
    id: 'hero-personalised',
    order: 4,
    isActive: true,
    categoryKey: 'personalized',
    tag: 'Personalised Gifts',
    badge: '✨ Bespoke Laser Engraving & Photo Keepsakes',
    badgeColor: 'purple',
    title: 'Memories Etched',
    titleHighlight: 'Forever in Heart',
    subtitle: 'Customized warm acrylic photo lamps, hand-carved pine wooden plaques & personalized stainless steel travel tumblers.',
    ctaPrimaryText: 'Customize Gifts',
    ctaPrimaryCategory: 'personalized',
    ctaSecondaryText: 'Photo Frames',
    ctaSecondaryCategory: 'personalized',
    bgGradient: 'from-purple-950 via-gift-950 to-pink-950',
    cardProduct: {
      name: 'Love Forever Solid Custom Wood Frame',
      price: '₹949',
      delivery: 'Earliest Delivery: 11 - Sep',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop'
    }
  },
  {
    id: 'hero-choc-jewel',
    order: 5,
    isActive: true,
    categoryKey: 'chocolates',
    tag: 'Chocolates, Jewelry & Handcrafted',
    badge: '🍫 Pure Belgian Cocoa Pralines & Designer Keepsakes',
    badgeColor: 'amber',
    title: 'Indulge in Pure',
    titleHighlight: 'Artisanal Elegance',
    subtitle: 'Hand-poured aromatic botanical soy candles, imported Belgian truffle collections & exquisite fashion accessories.',
    ctaPrimaryText: 'Shop Chocolates & Jewelry',
    ctaPrimaryCategory: 'chocolates',
    ctaSecondaryText: 'Handcrafted Gifts',
    ctaSecondaryCategory: 'handcrafted',
    bgGradient: 'from-stone-950 via-amber-950 to-rose-950',
    cardProduct: {
      name: 'Artisan Belgian Truffles Box (16 Pcs)',
      price: '₹499',
      delivery: 'Earliest Delivery: Today',
      image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=700&auto=format&fit=crop'
    }
  },
  {
    id: 'hero-spiritual-genz',
    order: 6,
    isActive: true,
    categoryKey: 'spiritual',
    tag: 'Spiritual, GenZ & Trending',
    badge: '🕉️ Divine Blessings & Trending Aesthetic Finds',
    badgeColor: 'teal',
    title: 'Sacred Blessings &',
    titleHighlight: 'GenZ Aesthetic',
    subtitle: 'From sanctum brass Ganesha idols & peacock diyas to viral neon LED room art and retro instant cameras.',
    ctaPrimaryText: 'Explore Spiritual & GenZ',
    ctaPrimaryCategory: 'spiritual',
    ctaSecondaryText: 'GenZ Trending',
    ctaSecondaryCategory: 'genz',
    bgGradient: 'from-teal-950 via-slate-900 to-purple-950',
    cardProduct: {
      name: 'Blessings Lord Ganesha Hand-Cast Idol',
      price: '₹1,249',
      delivery: 'Earliest Delivery: 11 - Sep',
      image: 'https://images.unsplash.com/photo-1567591414240-e22262d94b0d?w=600&auto=format&fit=crop'
    }
  }
];

export const DEFAULT_SETTINGS = {
  storeName: 'GiftPortal Luxe',
  supportEmail: 'concierge@giftportal.com',
  supportPhone: '+91 98765 43210',
  currency: '₹',
  minCartValue: 0,
  deliveryFeeEnabled: false,
  deliveryFeeAmount: 0, // Standard delivery mostly FREE
  standardDeliveryFee: 0,
  freeDeliveryAbove: 0,
  expressDeliveryFee: 99, // Express 2-Hour Delivery (+₹99)
  fixedSlotDeliveryFee: 149, // Fixed Time Slot (+₹149)
  midnightDeliveryFee: 249, // Midnight Surprise (+₹249)
  websitePaused: false,
  pauseMessage: "Our website is temporarily paused for new orders. Thank you for your patience, we'll be back soon to help you with your gifting needs.",
  operatingHours: '9:00 AM - 10:00 PM',
  orderIdPrefix: 'GP-',
  heroSectionVisible: false
};

export const DEFAULT_CITIES = [
  {
    id: 'city-indore',
    name: 'Indore',
    state: 'Madhya Pradesh',
    hubType: 'local_express', // 'local_express' (1-2 days, 90% same-day local fleet) or 'courier'
    status: 'active', // 'active' | 'paused'
    description: 'Operational Primary Local Hub - 90% Same-Day & 2-Hour Express Delivery',
    pincodes: [
      { code: '452001', area: 'Rajwada / MG Road', status: 'active', sla: 'Same-Day / 2-Hr Express', deliveryFee: 0 },
      { code: '452010', area: 'Vijay Nagar / Scheme 54', status: 'active', sla: 'Same-Day / 2-Hr Express', deliveryFee: 0 },
      { code: '452008', area: 'Sudama Nagar / Annapurna', status: 'active', sla: 'Same-Day / 2-Hr Express', deliveryFee: 0 },
      { code: '452009', area: 'Bhawarkua / Tower Square', status: 'active', sla: 'Same-Day / 2-Hr Express', deliveryFee: 0 },
      { code: '452018', area: 'New Palasia / Saket Nagar', status: 'active', sla: 'Same-Day / 2-Hr Express', deliveryFee: 0 },
      { code: '452016', area: 'Bengali Square / Khajrana', status: 'active', sla: 'Same-Day / 2-Hr Express', deliveryFee: 0 },
      { code: '453331', area: 'Rau / Silicon City', status: 'active', sla: 'Same-Day Express', deliveryFee: 0 },
      { code: '453555', area: 'Super Corridor / Airport', status: 'active', sla: 'Same-Day Express', deliveryFee: 0 }
    ]
  },
  {
    id: 'city-bhopal',
    name: 'Bhopal',
    state: 'Madhya Pradesh',
    hubType: 'courier',
    status: 'active',
    description: 'Regional Courier Hub - Express courier shipment with live AWB tracking',
    pincodes: [
      { code: '462001', area: 'Bhopal City / MP Nagar', status: 'active', sla: 'Domestic Courier (1-2 Days)', deliveryFee: 0 },
      { code: '462016', area: 'Arera Colony / Bittan Market', status: 'active', sla: 'Domestic Courier (1-2 Days)', deliveryFee: 0 },
      { code: '462023', area: 'Kolar Road / Chuna Bhatti', status: 'active', sla: 'Domestic Courier (1-2 Days)', deliveryFee: 0 }
    ]
  },
  {
    id: 'city-mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    hubType: 'courier',
    status: 'active',
    description: 'Metro Courier Hub - Domestic Air/Surface Courier with AWB',
    pincodes: [
      { code: '400001', area: 'Fort / South Mumbai', status: 'active', sla: 'Express Courier (2-3 Days)', deliveryFee: 0 },
      { code: '400050', area: 'Bandra West / Khar', status: 'active', sla: 'Express Courier (2-3 Days)', deliveryFee: 0 },
      { code: '400053', area: 'Andheri West / Lokhandwala', status: 'active', sla: 'Express Courier (2-3 Days)', deliveryFee: 0 },
      { code: '400703', area: 'Vashi / Navi Mumbai', status: 'active', sla: 'Express Courier (2-3 Days)', deliveryFee: 0 }
    ]
  },
  {
    id: 'city-delhi',
    name: 'Delhi NCR',
    state: 'Delhi',
    hubType: 'courier',
    status: 'active',
    description: 'Capital Metro Hub - Express Courier Shipment with AWB',
    pincodes: [
      { code: '110001', area: 'Connaught Place / Central', status: 'active', sla: 'Express Courier (2-3 Days)', deliveryFee: 0 },
      { code: '110016', area: 'Hauz Khas / Green Park', status: 'active', sla: 'Express Courier (2-3 Days)', deliveryFee: 0 },
      { code: '110024', area: 'Lajpat Nagar / Defence Colony', status: 'active', sla: 'Express Courier (2-3 Days)', deliveryFee: 0 }
    ]
  },
  {
    id: 'city-jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    hubType: 'courier',
    status: 'active',
    description: 'Heritage City Courier Hub - Fast Surface Delivery',
    pincodes: [
      { code: '302001', area: 'MI Road / C-Scheme', status: 'active', sla: 'Domestic Courier (2-3 Days)', deliveryFee: 0 },
      { code: '302017', area: 'Malviya Nagar', status: 'active', sla: 'Domestic Courier (2-3 Days)', deliveryFee: 0 },
      { code: '302020', area: 'Mansarovar', status: 'active', sla: 'Domestic Courier (2-3 Days)', deliveryFee: 0 }
    ]
  }
];

export const DEFAULT_AREAS = [
  { state: 'Madhya Pradesh', city: 'Indore', area: 'Vijay Nagar' },
  { state: 'Madhya Pradesh', city: 'Indore', area: 'New Palasia' },
  { state: 'Madhya Pradesh', city: 'Indore', area: 'Old Palasia' },
  { state: 'Madhya Pradesh', city: 'Indore', area: 'Rajwada / MG Road' },
  { state: 'Madhya Pradesh', city: 'Indore', area: 'Saket Nagar' },
  { state: 'Madhya Pradesh', city: 'Indore', area: 'Bengali Square' },
  { state: 'Madhya Pradesh', city: 'Indore', area: 'Bhawarkua' },
  { state: 'Madhya Pradesh', city: 'Indore', area: 'Annapurna' },
  { state: 'Madhya Pradesh', city: 'Indore', area: 'Sudama Nagar' },
  { state: 'Madhya Pradesh', city: 'Indore', area: 'Rau' },
  { state: 'Madhya Pradesh', city: 'Indore', area: 'Geeta Bhawan' },
  { state: 'Madhya Pradesh', city: 'Indore', area: 'Super Corridor' },
  { state: 'Madhya Pradesh', city: 'Indore', area: 'Scheme No 54' },
  { state: 'Madhya Pradesh', city: 'Indore', area: 'Scheme No 78' },
  { state: 'Madhya Pradesh', city: 'Indore', area: 'Khajrana' }
];

export const DEFAULT_SOCIETIES = [];

export const DEFAULT_ADMINS = [
  {
    id: 'admin',
    username: 'admin',
    pin: '1234',
    role: 'super',
    permissions: {
      dashboard: true,
      orders: true,
      inventory: true,
      deals: true,
      coupons: true,
      areas: true,
      logistics: true,
      customers: true,
      system: true
    },
    areas: []
  },
  {
    id: 'jr_admin',
    username: 'jr_admin',
    pin: '0000',
    role: 'junior',
    permissions: {
      dashboard: true,
      orders: true,
      inventory: false,
      deals: false,
      coupons: false,
      areas: false,
      logistics: true,
      customers: false,
      system: false
    },
    areas: []
  }
];

export const DEFAULT_VENDORS = [
  {
    id: 'vendor-flowers',
    name: 'Anjali Sharma',
    businessName: 'Blossom Florals & Botanic Boutique',
    username: 'blossom_florals',
    mobile: '9876500001',
    pin: '1111',
    sellingModel: 'both', // B2B wholesale floral stems + B2C retail bouquets
    category: 'flowers',
    categories: ['flowers', 'plants'],
    approved: true,
    isPaused: false,
    areas: ['Vijay Nagar', 'New Palasia', 'Rajwada / MG Road', 'Saket Nagar', 'Bengali Square'],
    address: 'Shop 14, Apollo Premier, Vijay Nagar, Indore',
    openingTime: '08:00 AM',
    closingTime: '10:00 PM'
  },
  {
    id: 'vendor-cakes',
    name: 'Chef Kabir Mehra',
    businessName: 'Velvet Patisserie & Truffles',
    username: 'velvet_bakery',
    mobile: '9876500002',
    pin: '2222',
    sellingModel: 'b2c',
    category: 'cakes',
    categories: ['cakes', 'chocolates'],
    approved: true,
    isPaused: false,
    areas: ['Vijay Nagar', 'New Palasia', 'Old Palasia', 'Geeta Bhawan', 'Saket Nagar'],
    address: 'G-2, Silver Mall, RNT Marg, South Tukoganj, Indore',
    openingTime: '09:00 AM',
    closingTime: '11:00 PM'
  },
  {
    id: 'vendor-hampers',
    name: 'Rajesh Singhania',
    businessName: 'The Royal Hamper Co.',
    username: 'royal_hampers',
    mobile: '9876500003',
    pin: '3333',
    sellingModel: 'both', // B2B corporate bulk boxes + B2C luxury hampers
    category: 'hampers',
    categories: ['hampers'],
    approved: true,
    isPaused: false,
    areas: ['Vijay Nagar', 'Bhawarkua', 'Annapurna', 'Rau', 'Sudama Nagar'],
    address: 'C-12, Industry House, AB Road, Indore',
    openingTime: '09:30 AM',
    closingTime: '09:30 PM'
  },
  {
    id: 'vendor-custom',
    name: 'Pooja Verma',
    businessName: 'Craftsmith Studio & Custom Gifts',
    username: 'craftsmith_gifts',
    mobile: '9876500004',
    pin: '4444',
    sellingModel: 'both', // B2B wholesale acrylic/wood blanks + B2C personalized gifts
    category: 'personalized',
    categories: ['personalized'],
    approved: true,
    isPaused: false,
    areas: ['Saket Nagar', 'Bengali Square', 'Vijay Nagar', 'New Palasia'],
    address: 'Plot 45, Saket Nagar, Indore',
    openingTime: '10:00 AM',
    closingTime: '10:00 PM'
  },
  {
    id: 'vendor-tech',
    name: 'Vikram Malhotra',
    businessName: 'Prime Tech Luxuries & Gadgets',
    username: 'primetech_gifts',
    mobile: '9876500005',
    pin: '5555',
    sellingModel: 'b2c',
    category: 'electronics',
    categories: ['electronics'],
    approved: true,
    isPaused: false,
    areas: ['Vijay Nagar', 'Rajwada / MG Road', 'Super Corridor', 'Scheme No 54'],
    address: 'Shop 22, Treasure Island Mall, MG Road, Indore',
    openingTime: '10:30 AM',
    closingTime: '09:30 PM'
  },
  {
    id: 'vendor-greenbloom',
    name: 'Rohan Mehra',
    businessName: 'GreenBloom Botanics & Exotic Plants',
    username: 'greenbloom_plants',
    mobile: '9876500006',
    pin: '6666',
    sellingModel: 'both', // B2B nursery supplies to florists + B2C indoor plants
    category: 'plants',
    categories: ['plants', 'flowers'],
    approved: true,
    isPaused: false,
    areas: ['Vijay Nagar', 'Khajrana', 'Scheme No 78', 'Bengali Square'],
    address: 'Botanical Garden Rd, Bypass Road, Khajrana, Indore',
    openingTime: '07:30 AM',
    closingTime: '08:30 PM'
  }
];

export const getVendorForCat = (cat) => {
  if (cat === 'flowers' || cat === 'plants') return { vendorId: 'vendor-flowers', vendorName: 'Blossom Florals & Botanic Boutique' };
  if (cat === 'cakes' || cat === 'chocolates') return { vendorId: 'vendor-cakes', vendorName: 'Velvet Patisserie & Truffles' };
  if (cat === 'hampers') return { vendorId: 'vendor-hampers', vendorName: 'The Royal Hamper Co.' };
  if (cat === 'personalized') return { vendorId: 'vendor-custom', vendorName: 'Craftsmith Studio & Custom Gifts' };
  return { vendorId: 'vendor-tech', vendorName: 'Prime Tech Luxuries & Gadgets' };
};

export const DEFAULT_CATEGORIES = [
  { id: 'flowers', name: 'Exquisite Flowers', image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=500' },
  { id: 'hampers', name: 'Luxury Hampers', image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=500' },
  { id: 'chocolates', name: 'Artisan Chocolates', image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=500' },
  { id: 'personalized', name: 'Personalized Gifts', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500' },
  { id: 'plants', name: 'Indoor Plants', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500' },
  { id: 'cakes', name: 'Deluxe Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500' },
  { id: 'electronics', name: 'Tech & Gadgets', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' }
];

export const db = {
  isIndoreOrder,
  getOrderLogisticsInfo,

  // --- INVENTORY & PRODUCT APPROVAL ---
  async getProducts(includePending = false, targetMarket = null) {
    if (typeof window === 'undefined') {
      return DEFAULT_PRODUCTS.map(p => {
        const vInfo = getVendorForCat(p.cat);
        const firstPrice = p.types?.[0]?.variants?.[0]?.price || p.price || 599;
        return {
          stock: p.stock !== undefined ? Number(p.stock) : 50,
          isSoldOut: false,
          approvalStatus: 'approved',
          vendorId: p.vendorId || vInfo.vendorId,
          vendorName: p.vendorName || vInfo.vendorName,
          targetMarket: p.targetMarket || 'both',
          b2bPrice: p.b2bPrice || Math.round(firstPrice * 0.65),
          b2bMoq: p.b2bMoq || 10,
          b2bUnit: p.b2bUnit || 'Pieces',
          isHidden: Boolean(p.isHidden),
          ...p
        };
      });
    }
    const data = localStorage.getItem(DB_KEYS.PRODUCTS);
    let raw = data ? JSON.parse(data) : DEFAULT_PRODUCTS;
    if (data && Array.isArray(raw)) {
      const existingIds = new Set(raw.map(p => String(p.id)));
      const missingDefaults = DEFAULT_PRODUCTS.filter(p => !existingIds.has(String(p.id)));
      if (missingDefaults.length > 0) {
        raw = [...raw, ...missingDefaults];
        localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(raw));
      }
    }
    const enriched = raw.map(p => {
      const stock = p.stock !== undefined ? Number(p.stock) : 50;
      const isSoldOut = p.isSoldOut !== undefined ? p.isSoldOut : stock <= 0;
      const vInfo = getVendorForCat(p.cat);
      const firstPrice = p.types?.[0]?.variants?.[0]?.price || p.price || 599;
      return {
        approvalStatus: p.approvalStatus || 'approved',
        stock,
        isSoldOut,
        vendorId: p.vendorId || vInfo.vendorId,
        vendorName: p.vendorName || vInfo.vendorName,
        targetMarket: p.targetMarket || 'both',
        b2bPrice: p.b2bPrice || Math.round(firstPrice * 0.65),
        b2bMoq: p.b2bMoq || 10,
        b2bUnit: p.b2bUnit || 'Pieces',
        isHidden: Boolean(p.isHidden),
        ...p
      };
    });

    let result = enriched;
    if (!includePending) {
      result = result.filter(p => p.approvalStatus === 'approved' && !p.isHidden);
    }
    if (targetMarket === 'b2b') {
      result = result.filter(p => p.targetMarket === 'b2b' || p.targetMarket === 'both');
    } else if (targetMarket === 'b2c') {
      result = result.filter(p => p.targetMarket === 'b2c' || p.targetMarket === 'both' || !p.targetMarket);
    }
    return result;
  },

  async getAllProducts() {
    return this.getProducts(true);
  },

  async submitProduct(productData, role = 'vendor') {
    const products = await this.getAllProducts();
    const isApproved = role === 'admin';
    const firstPrice = productData.price || productData.types?.[0]?.variants?.[0]?.price || 599;
    const newProduct = {
      ...productData,
      id: productData.id || Date.now(),
      approvalStatus: isApproved ? 'approved' : 'pending',
      submittedBy: role,
      createdAt: new Date().toISOString(),
      targetMarket: productData.targetMarket || 'both', // 'b2c' | 'b2b' | 'both'
      b2bPrice: Number(productData.b2bPrice) || Math.round(firstPrice * 0.65),
      b2bMoq: Number(productData.b2bMoq) || 10,
      b2bUnit: productData.b2bUnit || 'Pieces',
      isHidden: false,
      customFields: Array.isArray(productData.customFields) ? productData.customFields : [],
      personalizationConfig: productData.personalizationConfig || {
        isPersonalized: false,
        requirePhoto: false,
        requireText: false,
        textPrompt: '',
        maxChars: 50
      }
    };
    const updated = [newProduct, ...products];
    await this.saveProducts(updated);

    if (!isApproved) {
      await this.addNotification('admin', `New product submission for approval: "${newProduct.name}" by vendor ${newProduct.vendorName || 'Partner'} [${newProduct.targetMarket?.toUpperCase()}]`);
    }
    return newProduct;
  },

  async updateProduct(productId, updateData, role = 'vendor') {
    const products = await this.getAllProducts();
    let updatedProduct = null;
    const isApproved = role === 'admin';
    
    const updated = products.map(p => {
      if (String(p.id) === String(productId)) {
        updatedProduct = {
          ...p,
          ...updateData,
          // When edited by a vendor, admin approval is required to go live!
          approvalStatus: isApproved ? (p.approvalStatus || 'approved') : 'pending',
          editPending: !isApproved,
          lastEditedBy: role,
          updatedAt: new Date().toISOString()
        };
        return updatedProduct;
      }
      return p;
    });

    await this.saveProducts(updated);

    if (!isApproved && updatedProduct) {
      await this.addNotification('admin', `Product edit pending approval: "${updatedProduct.name}" by vendor ${updatedProduct.vendorName || 'Partner'}`);
      if (updatedProduct.vendorId) {
        await this.addNotification(`vendor_${updatedProduct.vendorId}`, `Changes to "${updatedProduct.name}" saved! Awaiting Admin approval to go live.`);
      }
    }
    await postSyncAction('update_product', { productId, updateData, role });
    broadcastSync();
    return updatedProduct;
  },

  async deleteProduct(productId, role = 'vendor') {
    const products = await this.getAllProducts();
    const target = products.find(p => String(p.id) === String(productId));
    const updated = products.filter(p => String(p.id) !== String(productId));
    await this.saveProducts(updated);

    if (target && role === 'vendor') {
      await this.addNotification('admin', `Vendor ${target.vendorName || 'Partner'} deleted product: "${target.name}"`);
    }
    await postSyncAction('delete_product', { productId });
    broadcastSync();
    return true;
  },

  async toggleProductVisibility(productId, isHidden) {
    const products = await this.getAllProducts();
    let targetProd = null;
    const updated = products.map(p => {
      if (String(p.id) === String(productId)) {
        const nextHidden = isHidden !== undefined ? Boolean(isHidden) : !p.isHidden;
        targetProd = { ...p, isHidden: nextHidden, visibilityUpdatedAt: new Date().toISOString() };
        return targetProd;
      }
      return p;
    });
    await this.saveProducts(updated);

    if (targetProd && targetProd.vendorId) {
      await this.addNotification(
        `vendor_${targetProd.vendorId}`, 
        `Product "${targetProd.name}" is now ${targetProd.isHidden ? 'HIDDEN from buyers' : 'VISIBLE & ACTIVE'}.`
      );
    }
    await postSyncAction('toggle_hide_product', { productId, isHidden: targetProd?.isHidden });
    broadcastSync();
    return targetProd;
  },

  async approveProduct(productId) {
    const products = await this.getAllProducts();
    let approvedProd = null;
    const updated = products.map(p => {
      if (String(p.id) === String(productId)) {
        approvedProd = { 
          ...p, 
          approvalStatus: 'approved', 
          editPending: false,
          approvedAt: new Date().toISOString() 
        };
        return approvedProd;
      }
      return p;
    });
    await this.saveProducts(updated);
    if (approvedProd && approvedProd.vendorId) {
      await this.addNotification(`vendor_${approvedProd.vendorId}`, `Great news! Your product "${approvedProd.name}" has been APPROVED and is now live!`);
    }
    await postSyncAction('approve_product', { productId });
    broadcastSync();
    return updated;
  },

  async rejectProduct(productId, reason = '') {
    const products = await this.getAllProducts();
    let rejectedProd = null;
    const updated = products.map(p => {
      if (String(p.id) === String(productId)) {
        rejectedProd = { 
          ...p, 
          approvalStatus: 'rejected', 
          editPending: false,
          rejectionReason: reason || 'Product details require revision',
          rejectedAt: new Date().toISOString() 
        };
        return rejectedProd;
      }
      return p;
    });
    await this.saveProducts(updated);
    if (rejectedProd && rejectedProd.vendorId) {
      await this.addNotification(`vendor_${rejectedProd.vendorId}`, `Product "${rejectedProd.name}" needs changes: ${reason || 'Details require revision'}`);
    }
    await postSyncAction('reject_product', { productId, reason });
    broadcastSync();
    return updated;
  },

  async getProductById(id) {
    const products = await this.getProducts();
    const deals = await this.getDeals();
    const all = [...products, ...deals];
    return all.find(p => String(p.id) === String(id)) || null;
  },

  async saveProducts(products) {
    localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products));
    await postSyncAction('save_products', { products });
    broadcastSync();
  },

  async updateProductStock(productId, newStock) {
    const products = await this.getProducts();
    const stockVal = Math.max(0, parseInt(newStock, 10) || 0);
    const updated = products.map(p => {
      if (String(p.id) === String(productId)) {
        return {
          ...p,
          stock: stockVal,
          isSoldOut: stockVal <= 0
        };
      }
      return p;
    });
    await this.saveProducts(updated);
    return updated;
  },

  async adjustProductStock(productId, delta) {
    const products = await this.getProducts();
    const target = products.find(p => String(p.id) === String(productId));
    if (!target) return products;
    const current = target.stock !== undefined ? Number(target.stock) : 50;
    const nextStock = Math.max(0, current + Number(delta));
    return this.updateProductStock(productId, nextStock);
  },

  // --- CATEGORIES ---
  async getCategories() {
    if (typeof window === 'undefined') return DEFAULT_CATEGORIES;
    const data = localStorage.getItem(DB_KEYS.CATEGORIES);
    return data ? JSON.parse(data) : DEFAULT_CATEGORIES;
  },

  async saveCategories(categories) {
    localStorage.setItem(DB_KEYS.CATEGORIES, JSON.stringify(categories));
    await postSyncAction('save_categories', { categories });
    broadcastSync();
  },

  // --- DEALS ---
  async getDeals() {
    if (typeof window === 'undefined') return DEFAULT_DEALS;
    const data = localStorage.getItem(DB_KEYS.DEALS);
    return data ? JSON.parse(data) : DEFAULT_DEALS;
  },

  async saveDeals(deals) {
    localStorage.setItem(DB_KEYS.DEALS, JSON.stringify(deals));
    window.dispatchEvent(new Event('storage'));
  },

  // --- AREAS ---
  async getAreas() {
    if (typeof window === 'undefined') return DEFAULT_AREAS;
    const data = localStorage.getItem(DB_KEYS.AREAS);
    if (!data) {
      localStorage.setItem(DB_KEYS.AREAS, JSON.stringify(DEFAULT_AREAS));
      return DEFAULT_AREAS;
    }
    try {
      const parsed = JSON.parse(data);
      const isLegacy = Array.isArray(parsed) && parsed.some(a => 
        a.state === 'Maharashtra' || 
        a.city === 'Mumbai' || 
        a.city === 'Navi Mumbai' || 
        String(a.area).includes('Vashi') ||
        String(a.area).includes('Nerul')
      );
      if (isLegacy || !Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(DB_KEYS.AREAS, JSON.stringify(DEFAULT_AREAS));
        return DEFAULT_AREAS;
      }
      return parsed;
    } catch {
      localStorage.setItem(DB_KEYS.AREAS, JSON.stringify(DEFAULT_AREAS));
      return DEFAULT_AREAS;
    }
  },

  async saveAreas(areas) {
    localStorage.setItem(DB_KEYS.AREAS, JSON.stringify(areas));
    await postSyncAction('save_areas', { areas });
    broadcastSync();
  },

  async resetToIndoreAreas() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(DB_KEYS.AREAS, JSON.stringify(DEFAULT_AREAS));
      localStorage.setItem(DB_KEYS.SOCIETIES, JSON.stringify(DEFAULT_SOCIETIES));
      await postSyncAction('save_areas', { areas: DEFAULT_AREAS });
      await postSyncAction('save_societies', { societies: DEFAULT_SOCIETIES });
      broadcastSync();
    }
    return DEFAULT_AREAS;
  },

  // --- COUPONS ---
  async getCoupons() {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(DB_KEYS.COUPONS);
    return data ? JSON.parse(data) : [];
  },

  async saveCoupons(coupons) {
    localStorage.setItem(DB_KEYS.COUPONS, JSON.stringify(coupons));
    await postSyncAction('save_coupons', { coupons });
    broadcastSync();
  },

  // --- SETTINGS ---
  async getSettings() {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    const data = localStorage.getItem(DB_KEYS.SETTINGS);
    if (!data) return DEFAULT_SETTINGS;
    try {
      const parsed = JSON.parse(data);
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        heroSectionVisible: parsed.heroSectionVisible === true
      };
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  async saveSettings(settings) {
    localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(settings));
    await postSyncAction('save_settings', { settings });
    broadcastSync();
  },

  async setHeroVisibility(visible) {
    const s = await this.getSettings();
    const updated = { ...s, heroSectionVisible: Boolean(visible) };
    await this.saveSettings(updated);
    return updated;
  },

  // --- ADMINS ---
  async getAdmins() {
    if (typeof window === 'undefined') return DEFAULT_ADMINS;
    const data = localStorage.getItem(DB_KEYS.ADMINS);
    if (!data) {
      localStorage.setItem(DB_KEYS.ADMINS, JSON.stringify(DEFAULT_ADMINS));
      return DEFAULT_ADMINS;
    }
    return JSON.parse(data);
  },

  async saveAdmins(admins) {
    localStorage.setItem(DB_KEYS.ADMINS, JSON.stringify(admins));
    await postSyncAction('save_admins', { admins });
    broadcastSync();
  },

  // --- VENDORS ---
  async getVendors() {
    if (typeof window === 'undefined') return DEFAULT_VENDORS;
    const data = localStorage.getItem(DB_KEYS.VENDORS);
    if (!data) {
      localStorage.setItem(DB_KEYS.VENDORS, JSON.stringify(DEFAULT_VENDORS));
      return DEFAULT_VENDORS;
    }
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        let changed = false;
        const merged = parsed.map(v => {
          const vNameLow = (v.name || '').toLowerCase();
          const vBizLow = (v.businessName || '').toLowerCase();
          const def = DEFAULT_VENDORS.find(d => 
            d.id === v.id || 
            (v.username && d.username === v.username) ||
            (vNameLow.includes('blossom') || vBizLow.includes('blossom')) && d.username === 'blossom_florals' ||
            (vNameLow.includes('velvet') || vBizLow.includes('velvet')) && d.username === 'velvet_bakery' ||
            (vNameLow.includes('royal') || vBizLow.includes('royal')) && d.username === 'royal_hampers' ||
            (vNameLow.includes('craftsmith') || vBizLow.includes('craftsmith')) && d.username === 'craftsmith_gifts' ||
            (vNameLow.includes('tech') || vBizLow.includes('tech')) && d.username === 'primetech_gifts' ||
            (vNameLow.includes('greenbloom') || vBizLow.includes('greenbloom')) && d.username === 'greenbloom_plants'
          );
          if (def) {
            const hasOldAreas = !v.areas || v.areas.length === 0 || v.areas.some(a => String(a).includes('Vashi') || String(a).includes('Nerul') || String(a).includes('Kharghar'));
            const updated = {
              ...def,
              ...v,
              username: v.username || def.username,
              pin: v.pin || def.pin || '1111',
              sellingModel: v.sellingModel || def.sellingModel || 'both',
              approved: v.approved !== undefined ? v.approved : true,
              isPaused: false,
              areas: hasOldAreas ? def.areas : v.areas,
              address: (v.address && !v.address.includes('Vashi') && !v.address.includes('Nerul')) ? v.address : def.address,
              openingTime: v.openingTime || def.openingTime || '08:30 AM',
              closingTime: v.closingTime || def.closingTime || '10:30 PM'
            };
            if (updated.username !== v.username || updated.pin !== v.pin || hasOldAreas || !v.openingTime || !v.closingTime || !v.sellingModel) {
              changed = true;
            }
            return updated;
          }
          return {
            ...v,
            username: v.username || v.id,
            pin: v.pin || '1234',
            sellingModel: v.sellingModel || 'both',
            approved: v.approved !== undefined ? v.approved : false,
            isPaused: v.isPaused !== undefined ? v.isPaused : false,
            openingTime: v.openingTime || '09:00 AM',
            closingTime: v.closingTime || '10:00 PM'
          };
        });

        DEFAULT_VENDORS.forEach(def => {
          if (!merged.some(m => m.id === def.id || (m.username && m.username === def.username))) {
            merged.push(def);
            changed = true;
          }
        });

        if (changed) {
          localStorage.setItem(DB_KEYS.VENDORS, JSON.stringify(merged));
        }
        return merged;
      }
      localStorage.setItem(DB_KEYS.VENDORS, JSON.stringify(DEFAULT_VENDORS));
      return DEFAULT_VENDORS;
    } catch {
      localStorage.setItem(DB_KEYS.VENDORS, JSON.stringify(DEFAULT_VENDORS));
      return DEFAULT_VENDORS;
    }
  },

  async saveVendors(vendors) {
    localStorage.setItem(DB_KEYS.VENDORS, JSON.stringify(vendors));
    await postSyncAction('save_vendors', { vendors });
    broadcastSync();
  },

  // --- VENDOR ONBOARDING & REGISTRATION ---
  async registerVendor(vendorData) {
    const vendors = await this.getVendors();
    const vendorId = vendorData.id || `vendor-${(vendorData.businessName || vendorData.name || 'partner').toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`;
    
    const newVendor = {
      id: vendorId,
      name: vendorData.name || 'Partner',
      businessName: vendorData.businessName || vendorData.name || 'New Vendor Business',
      username: vendorData.username || vendorId,
      mobile: vendorData.mobile || '',
      email: vendorData.email || '',
      pin: vendorData.pin || '1234',
      sellingModel: vendorData.sellingModel || 'both', // 'b2c' | 'b2b' | 'both'
      category: vendorData.category || 'flowers',
      categories: Array.isArray(vendorData.categories) && vendorData.categories.length > 0 ? vendorData.categories : [vendorData.category || 'flowers'],
      areas: Array.isArray(vendorData.areas) && vendorData.areas.length > 0 ? vendorData.areas : ['Vijay Nagar', 'New Palasia', 'Rajwada / MG Road'],
      address: vendorData.address || '',
      city: vendorData.city || 'Indore',
      gstin: vendorData.gstin || '',
      pan: vendorData.pan || '',
      openingTime: vendorData.openingTime || '09:00 AM',
      closingTime: vendorData.closingTime || '10:00 PM',
      approved: false, // requires admin approval to go live!
      status: 'pending_approval',
      isPaused: false,
      agreementSigned: true,
      registeredAt: new Date().toISOString()
    };

    const updated = [...vendors, newVendor];
    await this.saveVendors(updated);

    // Notify Admin of new vendor onboarding application
    await this.addNotification(
      'admin',
      `🆕 NEW VENDOR REGISTRATION: "${newVendor.businessName}" (${newVendor.name}) applied to sell [Model: ${newVendor.sellingModel.toUpperCase()}]. Action required in Approvals Desk.`
    );

    await postSyncAction('register_vendor', { vendor: newVendor });
    broadcastSync();
    return newVendor;
  },

  async approveVendor(vendorId) {
    const vendors = await this.getVendors();
    let approvedVendor = null;
    const updated = vendors.map(v => {
      if (String(v.id) === String(vendorId)) {
        approvedVendor = { ...v, approved: true, status: 'approved', approvedAt: new Date().toISOString() };
        return approvedVendor;
      }
      return v;
    });
    await this.saveVendors(updated);

    if (approvedVendor) {
      await this.addNotification('admin', `Vendor Partner "${approvedVendor.businessName}" APPROVED & Activated!`);
      await this.addNotification(
        `vendor_${approvedVendor.id}`,
        `🎉 Congratulations! Your vendor account "${approvedVendor.businessName}" has been APPROVED. You can now publish products and accept orders!`
      );
    }

    await postSyncAction('approve_vendor', { vendorId });
    broadcastSync();
    return updated;
  },

  async rejectVendor(vendorId, reason = '') {
    const vendors = await this.getVendors();
    let rejectedVendor = null;
    const updated = vendors.map(v => {
      if (String(v.id) === String(vendorId)) {
        rejectedVendor = { ...v, approved: false, status: 'rejected', rejectionReason: reason || 'Information verification incomplete', rejectedAt: new Date().toISOString() };
        return rejectedVendor;
      }
      return v;
    });
    await this.saveVendors(updated);

    if (rejectedVendor) {
      await this.addNotification('admin', `Vendor application for "${rejectedVendor.businessName}" was rejected (Reason: ${reason}).`);
      await this.addNotification(
        `vendor_${rejectedVendor.id}`,
        `Your vendor application for "${rejectedVendor.businessName}" requires changes: ${reason || 'Please update your details.'}`
      );
    }

    await postSyncAction('reject_vendor', { vendorId, reason });
    broadcastSync();
    return updated;
  },

  async updateVendorProfile(vendorId, updates) {
    const vendors = await this.getVendors();
    const updated = vendors.map(v => {
      if (String(v.id) === String(vendorId)) {
        return { ...v, ...updates, updatedAt: new Date().toISOString() };
      }
      return v;
    });
    await this.saveVendors(updated);
    return updated.find(v => String(v.id) === String(vendorId));
  },

  // --- B2B VENDOR-TO-VENDOR WHOLESALE ORDERS ---
  async getB2BOrders(vendorId = null) {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(DB_KEYS.B2B_ORDERS);
    const all = data ? JSON.parse(data) : [];
    if (!vendorId) return all;
    return all.filter(o => 
      String(o.buyerVendorId) === String(vendorId) || 
      String(o.sellerVendorId) === String(vendorId)
    );
  },

  async createB2BOrder(b2bOrderData) {
    const orders = await this.getB2BOrders();
    const orderId = `B2B-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      orderType: 'b2b_wholesale',
      createdAt: new Date().toISOString(),
      status: 'PO Raised', // 'PO Raised' -> 'Accepted' -> 'Preparing' -> 'Ready for Pickup' -> 'In Transit' -> 'Delivered'
      stage: 'po_raised',
      ...b2bOrderData
    };
    const updated = [newOrder, ...orders];
    localStorage.setItem(DB_KEYS.B2B_ORDERS, JSON.stringify(updated));

    // Notify seller vendor
    await this.addNotification(
      `vendor_${newOrder.sellerVendorId}`,
      `🏢 New B2B Wholesale Order #${orderId} from "${newOrder.buyerVendorName}": ₹${newOrder.totalAmount} (${newOrder.items?.length || 1} items). Accept PO now!`
    );
    // Notify buyer vendor
    await this.addNotification(
      `vendor_${newOrder.buyerVendorId}`,
      `Your B2B Wholesale PO #${orderId} was placed with "${newOrder.sellerVendorName}" for ₹${newOrder.totalAmount}.`
    );
    // Notify admin
    await this.addNotification(
      'admin',
      `B2B Order #${orderId}: "${newOrder.buyerVendorName}" purchased wholesale from "${newOrder.sellerVendorName}" (₹${newOrder.totalAmount})`
    );

    await postSyncAction('create_b2b_order', { order: newOrder });
    broadcastSync();
    return newOrder;
  },

  async updateB2BOrderStatus(orderId, newStatus, message = '') {
    const orders = await this.getB2BOrders();
    let target = null;
    const updated = orders.map(o => {
      if (String(o.id) === String(orderId)) {
        target = { ...o, status: newStatus, statusMessage: message, updatedAt: new Date().toISOString() };
        return target;
      }
      return o;
    });
    localStorage.setItem(DB_KEYS.B2B_ORDERS, JSON.stringify(updated));

    if (target) {
      await this.addNotification(`vendor_${target.buyerVendorId}`, `B2B PO #${orderId} status updated: ${newStatus}`);
      await this.addNotification(`vendor_${target.sellerVendorId}`, `B2B Order #${orderId} status: ${newStatus}`);
      await this.addNotification('admin', `B2B Order #${orderId} status: ${newStatus}`);
    }

    await postSyncAction('update_b2b_order_status', { orderId, newStatus, message });
    broadcastSync();
    return target;
  },

  // --- NOTIFICATIONS ---
  async getNotifications(username) {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(`${DB_KEYS.NOTIFICATIONS}_${username}`);
    return data ? JSON.parse(data) : [];
  },

  async addNotification(username, text) {
    const notes = await this.getNotifications(username);
    const newNote = {
      id: Date.now(),
      text,
      timestamp: new Date().toISOString(),
      read: false
    };
    notes.unshift(newNote);
    localStorage.setItem(`${DB_KEYS.NOTIFICATIONS}_${username}`, JSON.stringify(notes.slice(0, 30)));
    await postSyncAction('add_notification', { username, text });
    broadcastSync();
  },

  async markNotificationsAsRead(username) {
    const notes = await this.getNotifications(username);
    const updated = notes.map(n => ({ ...n, read: true }));
    localStorage.setItem(`${DB_KEYS.NOTIFICATIONS}_${username}`, JSON.stringify(updated));
    await postSyncAction('mark_notifications_read', { username });
    broadcastSync();
  },

  async clearNotifications(username) {
    localStorage.removeItem(`${DB_KEYS.NOTIFICATIONS}_${username}`);
    await postSyncAction('clear_notifications', { username });
    broadcastSync();
  },

  // --- SOCIETIES ---
  async getSocieties() {
    if (typeof window === 'undefined') return DEFAULT_SOCIETIES;
    const data = localStorage.getItem(DB_KEYS.SOCIETIES);
    if (!data) {
      localStorage.setItem(DB_KEYS.SOCIETIES, JSON.stringify(DEFAULT_SOCIETIES));
      return DEFAULT_SOCIETIES;
    }
    try {
      const parsed = JSON.parse(data);
      const isLegacy = Array.isArray(parsed) && parsed.some(s => s.state === 'Maharashtra' || s.city === 'Mumbai' || s.city === 'Navi Mumbai');
      if (isLegacy || !Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(DB_KEYS.SOCIETIES, JSON.stringify(DEFAULT_SOCIETIES));
        return DEFAULT_SOCIETIES;
      }
      return parsed;
    } catch {
      localStorage.setItem(DB_KEYS.SOCIETIES, JSON.stringify(DEFAULT_SOCIETIES));
      return DEFAULT_SOCIETIES;
    }
  },

  async saveSocieties(societies) {
    localStorage.setItem(DB_KEYS.SOCIETIES, JSON.stringify(societies));
    await postSyncAction('save_societies', { societies });
    broadcastSync();
  },

  // --- HERO SLIDES (HERO SECTION CAROUSEL) ---
  async getHeroSlides() {
    if (typeof window === 'undefined') return DEFAULT_HERO_SLIDES;
    const data = localStorage.getItem(DB_KEYS.HERO_SLIDES);
    if (!data) {
      localStorage.setItem(DB_KEYS.HERO_SLIDES, JSON.stringify(DEFAULT_HERO_SLIDES));
      return DEFAULT_HERO_SLIDES;
    }
    try {
      const slides = JSON.parse(data);
      if (Array.isArray(slides) && slides.length > 0) {
        return slides;
      }
      localStorage.setItem(DB_KEYS.HERO_SLIDES, JSON.stringify(DEFAULT_HERO_SLIDES));
      return DEFAULT_HERO_SLIDES;
    } catch {
      return DEFAULT_HERO_SLIDES;
    }
  },

  async saveHeroSlides(slides) {
    if (typeof window === 'undefined') return slides;
    localStorage.setItem(DB_KEYS.HERO_SLIDES, JSON.stringify(slides));
    await postSyncAction('save_hero_slides', { hero_slides: slides });
    broadcastSync();
    return slides;
  },

  async addHeroSlide(slide) {
    const slides = await this.getHeroSlides();
    const newSlide = {
      ...slide,
      id: slide.id || `hero-${Date.now()}`,
      order: slides.length + 1,
      isActive: slide.isActive !== undefined ? slide.isActive : true
    };
    const updated = [...slides, newSlide];
    await this.saveHeroSlides(updated);
    return newSlide;
  },

  async updateHeroSlide(slideId, updates) {
    const slides = await this.getHeroSlides();
    const updated = slides.map(s => s.id === slideId ? { ...s, ...updates } : s);
    await this.saveHeroSlides(updated);
    return updated.find(s => s.id === slideId);
  },

  async deleteHeroSlide(slideId) {
    const slides = await this.getHeroSlides();
    const updated = slides.filter(s => s.id !== slideId);
    await this.saveHeroSlides(updated);
    return true;
  },



  // --- USERS ---
  async getUser(username) {
    const data = localStorage.getItem(`user_${username}`);
    return data ? JSON.parse(data) : null;
  },

  async saveUser(userData) {
    localStorage.setItem(`user_${userData.username}`, JSON.stringify(userData));
  },

  // --- ORDERS ---
  async getOrders(username = null) {
    if (typeof window === 'undefined') return [];
    if (!isSyncing) {
      setTimeout(() => this.syncWithServer(false), 5);
    }
    const data = localStorage.getItem(DB_KEYS.ORDERS);
    const allOrders = data ? JSON.parse(data) : [];
    allOrders.sort((a, b) => {
      const timeA = new Date(a.timestamp || a.createdAt || 0).getTime() || 0;
      const timeB = new Date(b.timestamp || b.createdAt || 0).getTime() || 0;
      return timeB - timeA;
    });
    if (username) {
      return allOrders.filter(o => o.customerUsername === username);
    }
    return allOrders;
  },

  async saveOrder(order) {
    const orders = await this.getOrders();
    const orderId = `${Math.floor(1000 + Math.random() * 9000)}`;

    const vendors = await this.getVendors();
    const area = order.recipient?.area || order.address?.area || 'N/A';

    // Dual OTP Security Generation:
    // 1. Pickup OTP: driver presents to vendor to verify and collect shipment
    // 2. Delivery OTP: customer provides to driver to verify delivery handover
    const pickupOtp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const deliveryOtp = `${Math.floor(1000 + Math.random() * 9000)}`;

    // Order classification: Gift vs Self
    const isGift = order.orderType === 'gift' || Boolean(order.isGift) || Boolean(order.recipient?.name && order.recipient?.name !== order.sender?.name);
    const orderType = isGift ? 'gift' : 'self';

    const sender = order.sender || {
      name: order.customerName || order.customer || 'Customer',
      mobile: order.customerMobile || order.address?.phone || 'N/A',
      email: order.customerEmail || ''
    };

    const cleanCity = (order.recipient?.city || order.address?.city || order.city || 'Indore').trim();
    const isIndore = isIndoreOrder({ recipient: { city: cleanCity }, area });
    const deliveryZone = isIndore ? 'indore' : 'other_city';
    const deliveryType = isIndore ? 'local' : 'courier';

    const recipient = order.recipient || {
      name: order.recipientName || order.address?.name || sender.name,
      mobile: order.recipientPhone || order.address?.phone || sender.mobile,
      street: order.address?.street || 'Not provided',
      area: area,
      city: cleanCity,
      state: order.address?.state || (isIndore ? 'Madhya Pradesh' : 'India'),
      society: order.address?.society || '',
      landmark: order.address?.landmark || '',
      cardMessage: order.cardMessage || order.giftMessage || '',
      deliveryDate: order.deliveryDate || 'Today',
      deliverySlot: order.deliverySlot || (isIndore ? 'Standard Delivery' : 'Courier Dispatch'),
      customPhoto: order.customPhoto || ''
    };

    // Enrich cart items with originating vendor attribution
    const enrichedCart = (order.cart || []).map(item => {
      const vInfo = vendors.find(v => v.id === item.vendorId) ||
                    vendors.find(v => v.categories?.includes(item.cat)) ||
                    vendors.find(v => v.category === item.cat) ||
                    vendors[0];
      return {
        ...item,
        vendorId: item.vendorId || vInfo?.id || 'vendor-flowers',
        vendorName: item.vendorName || vInfo?.businessName || vInfo?.name || 'Blossom Florals & Botanic Boutique'
      };
    });

    const initialVendorId = enrichedCart[0]?.vendorId || vendors[0]?.id || '';
    const initialVendorObj = vendors.find(v => v.id === initialVendorId) || vendors[0] || null;

    const newOrder = {
      ...order,
      id: orderId,
      timestamp: new Date().toISOString(),
      orderType,
      stage: 'pending', // 'pending' | 'confirmed' | 'vendor_assigned' | 'ready_for_pickup' | 'out_for_delivery' | 'delivered' | 'rejected'
      status: 'Pending',
      statusMessage: 'Order received and awaiting admin review',
      sender,
      recipient,
      cart: enrichedCart,
      customer: sender.name,
      customerMobile: sender.mobile,
      area,
      deliveryZone,
      isLocalDelivery: isIndore,
      deliveryType,
      assignedAdmin: '',
      assignedVendorId: '',
      assignedVendorName: '',
      suggestedVendorId: initialVendorObj?.id || '',
      suggestedVendorName: initialVendorObj?.businessName || initialVendorObj?.name || '',
      assignmentAccepted: false,
      pickupOtp,
      deliveryOtp,
      logistics: null,
      feedback: null
    };
    orders.unshift(newOrder);
    orders.sort((a, b) => {
      const timeA = new Date(a.timestamp || a.createdAt || 0).getTime() || 0;
      const timeB = new Date(b.timestamp || b.createdAt || 0).getTime() || 0;
      return timeB - timeA;
    });
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(orders));
    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(new CustomEvent('giftportal_new_order', { detail: newOrder }));
        window.dispatchEvent(new Event('giftportal_sync'));
      } catch (e) {}
    }
    
    // Update deal booking stats if order contains deals
    const currentDeals = await this.getDeals();
    let dealsChanged = false;
    const updatedDeals = currentDeals.map(deal => {
      const orderItem = order.cart?.find(item => item.id === deal.id);
      if (orderItem) {
        dealsChanged = true;
        const newBookedCount = (deal.bookedCount || 0) + orderItem.qty;
        const isSoldOut = deal.maxSlots > 0 ? newBookedCount >= deal.maxSlots : deal.isSoldOut;
        return { ...deal, bookedCount: newBookedCount, isSoldOut };
      }
      return deal;
    });
    if (dealsChanged) {
      await this.saveDeals(updatedDeals);
    }

    // Deduct stock for regular products in order
    const currentProducts = await this.getProducts();
    let productsChanged = false;
    const updatedProducts = currentProducts.map(prod => {
      const orderItem = (order.cart || []).find(item => String(item.id) === String(prod.id));
      if (orderItem) {
        productsChanged = true;
        const currentStock = prod.stock !== undefined ? Number(prod.stock) : 50;
        const newStock = Math.max(0, currentStock - (orderItem.qty || 1));
        return {
          ...prod,
          stock: newStock,
          isSoldOut: newStock <= 0 ? true : prod.isSoldOut
        };
      }
      return prod;
    });
    if (productsChanged) {
      await this.saveProducts(updatedProducts);
    }

    await this.addNotification('admin', `New Order #${orderId} (${isGift ? 'Gift Booking' : 'Personal Order'}) received`);
    // Note: Vendor is notified only after Admin approves & assigns the order
    await postSyncAction('save_order', { order: newOrder });
    broadcastSync();
    return newOrder;
  },

  // Workflow Stage 1 -> 2: Admin Confirms Order
  async confirmOrder(orderId) {
    const orders = await this.getOrders();
    const updated = orders.map(o => {
      if (String(o.id) === String(orderId)) {
        return {
          ...o,
          stage: 'confirmed',
          status: 'Confirmed',
          statusMessage: 'Order confirmed by Admin',
          confirmedAt: new Date().toISOString()
        };
      }
      return o;
    });
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(updated));
    await this.addNotification('admin', `Order #${orderId} confirmed`);
    await postSyncAction('confirm_order', { orderId });
    broadcastSync();
    return updated;
  },

  // Operational Lifecycle: Confirmed -> Packed -> Dispatched -> Delivered
  async updateOrderStatusPipeline(orderId, targetStatus, metadata = {}) {
    const orders = await this.getOrders();
    const now = new Date().toISOString();
    let statusMsg = '';
    let stage = 'confirmed';

    switch (targetStatus) {
      case 'Confirmed':
        stage = 'confirmed';
        statusMsg = 'Order confirmed and scheduled for workshop preparation';
        break;
      case 'Packed':
        stage = 'packed';
        statusMsg = 'Gifts handcrafted, packed in signature luxury box, and ready for dispatch';
        break;
      case 'Dispatched':
        stage = 'out_for_delivery';
        statusMsg = metadata.trackingId 
          ? `Dispatched via ${metadata.courier || 'Express Logistics'}. Tracking AWB: ${metadata.trackingId}`
          : 'Package dispatched with delivery executive and on its way';
        break;
      case 'Delivered':
        stage = 'delivered';
        statusMsg = 'Order successfully delivered to recipient';
        break;
      case 'Cancelled':
        stage = 'cancelled';
        statusMsg = metadata.reason ? `Order cancelled: ${metadata.reason}` : 'Order cancelled';
        break;
      default:
        stage = 'confirmed';
        statusMsg = `Order status: ${targetStatus}`;
    }

    const updated = orders.map(o => {
      if (String(o.id) === String(orderId)) {
        return {
          ...o,
          status: targetStatus,
          stage,
          assignmentAccepted: (targetStatus === 'Packed' || targetStatus === 'Dispatched' || targetStatus === 'Delivered') ? true : o.assignmentAccepted,
          acceptedAt: (targetStatus === 'Packed' || targetStatus === 'Dispatched' || targetStatus === 'Delivered') ? (o.acceptedAt || now) : o.acceptedAt,
          statusMessage: metadata.customMessage || statusMsg,
          confirmedAt: targetStatus === 'Confirmed' ? (o.confirmedAt || now) : o.confirmedAt,
          packedAt: targetStatus === 'Packed' ? now : o.packedAt,
          dispatchedAt: targetStatus === 'Dispatched' ? now : o.dispatchedAt,
          deliveredAt: targetStatus === 'Delivered' ? now : o.deliveredAt,
          logistics: {
            ...(o.logistics || {}),
            ...(metadata.logistics || {}),
            ...(metadata.trackingId ? { trackingId: metadata.trackingId, provider: metadata.courier } : {})
          }
        };
      }
      return o;
    });

    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(updated));
    await this.addNotification('admin', `Order #${orderId} moved to ${targetStatus}`);
    
    const target = updated.find(o => String(o.id) === String(orderId));
    if (target?.customerUsername) {
      await this.addNotification(target.customerUsername, `Update on Order #${orderId}: ${targetStatus}. ${statusMsg}`);
    }
    if (target?.assignedVendorId) {
      await this.addNotification(`vendor_${target.assignedVendorId}`, `Order #${orderId} status: ${targetStatus}`);
    }

    await postSyncAction('update_order_status', { 
      orderId, 
      newStatus: targetStatus, 
      customMessage: metadata.customMessage || statusMsg 
    });
    broadcastSync();
    return updated;
  },

  // Workflow: Master Admin Cancels/Rejects Order (No Vendor Available to Fulfill)
  async cancelOrderByAdmin(orderId, { reason = 'No partner vendor available to fulfill order in this area', apologyMessage = '' } = {}) {
    const orders = await this.getOrders();
    let targetUsername = '';
    let targetMobile = '';
    let orderTotal = 0;
    let customerName = 'Valued Customer';

    const fallbackApology = `Dear Customer, We sincerely apologize, but your Order #${orderId} could not be fulfilled as no partner vendor is available in your delivery area. We have initiated a 100% full refund to your original payment method. We deeply regret this inconvenience!`;

    const finalApology = (apologyMessage && apologyMessage.trim()) ? apologyMessage.trim() : fallbackApology;

    const updated = orders.map(o => {
      if (String(o.id) === String(orderId)) {
        targetUsername = o.customerUsername || o.sender?.username || '';
        targetMobile = o.customerMobile || o.phone || o.sender?.mobile || o.recipient?.mobile || '';
        customerName = o.customer || o.sender?.name || 'Valued Customer';
        orderTotal = o.total || 0;

        return {
          ...o,
          stage: 'cancelled',
          status: 'Cancelled',
          statusMessage: `Order cancelled by Admin: ${reason}`,
          cancelledBy: 'master_admin',
          cancellationReason: reason,
          apologyMessage: finalApology,
          refundStatus: 'Initiated (100% Full Refund)',
          reassignmentNeeded: false,
          cancelledAt: new Date().toISOString()
        };
      }
      return o;
    });

    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(updated));

    // Sincere customer notification with apology and full refund confirmation
    if (targetUsername) {
      await this.addNotification(targetUsername, `⚠️ Order #${orderId} Cancellation: ${finalApology}`);
    }
    if (targetMobile && targetMobile !== targetUsername) {
      await this.addNotification(targetMobile, `⚠️ Order #${orderId} Cancellation: ${finalApology}`);
    }

    // Notify Admin
    await this.addNotification('admin', `Order #${orderId} cancelled by Admin (Reason: ${reason}). Customer notified with apology & 100% refund initiated.`);

    await postSyncAction('cancel_order_by_admin', { orderId, reason, apologyMessage: finalApology });
    broadcastSync();
    return updated;
  },

  // Workflow: Vendor Rejects/Declines Order -> Sent Back to Master Admin for Reassignment
  async rejectOrderByVendor(orderId, { vendorId, vendorName, reason = 'Workshop at full capacity' } = {}) {
    const orders = await this.getOrders();
    const vendors = await this.getVendors();
    const vObj = vendors.find(v => String(v.id) === String(vendorId));
    const resolvedVendorName = vendorName || vObj?.businessName || vObj?.name || 'Partner Vendor';

    const updated = orders.map(o => {
      if (String(o.id) === String(orderId)) {
        const history = Array.isArray(o.rejectionHistory) ? [...o.rejectionHistory] : [];
        history.push({
          vendorId,
          vendorName: resolvedVendorName,
          reason,
          timestamp: new Date().toISOString()
        });

        return {
          ...o,
          stage: 'vendor_rejected',
          status: 'Reassignment Needed',
          statusMessage: `Declined by ${resolvedVendorName} (${reason}). Awaiting Master Admin reassignment.`,
          reassignmentNeeded: true,
          assignmentAccepted: false,
          assignedVendorId: '',
          assignedVendorName: '',
          lastDeclinedVendor: {
            vendorId,
            vendorName: resolvedVendorName,
            reason,
            declinedAt: new Date().toISOString()
          },
          rejectionHistory: history
        };
      }
      return o;
    });

    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(updated));

    // Alert Master Admin immediately with high priority
    await this.addNotification('admin', `🚨 REASSIGNMENT REQUIRED: Order #${orderId} was declined by ${resolvedVendorName} (Reason: ${reason}). Please reassign to another vendor.`);

    if (vendorId) {
      await this.addNotification(`vendor_${vendorId}`, `Order #${orderId} declined and returned to Master Admin for reassignment.`);
    }

    // NOTE: Customer is NOT alarmed with a cancellation. Their order remains in active processing while Admin reassigns.

    await postSyncAction('reject_order_by_vendor', { 
      orderId, 
      vendorId, 
      vendorName: resolvedVendorName, 
      reason 
    });
    broadcastSync();
    return updated;
  },

  // Workflow Stage 2 -> 3: Admin Assigns/Changes Vendor
  async assignOrderVendor(orderId, vendorId, vendorName) {
    const orders = await this.getOrders();
    const vendors = await this.getVendors();
    const targetVendor = vendors.find(v => String(v.id) === String(vendorId));
    const resolvedName = vendorName || targetVendor?.businessName || targetVendor?.name || 'Assigned Vendor';

    const updated = orders.map(o => {
      if (String(o.id) === String(orderId)) {
        return {
          ...o,
          assignedVendorId: vendorId,
          assignedVendorName: resolvedName,
          adminApproved: true,
          stage: 'vendor_assigned',
          status: 'Vendor Assigned',
          statusMessage: `Assigned to ${resolvedName}. Preparing package.`,
          reassignmentNeeded: false,
          assignmentAccepted: false,
          vendorAssignedAt: new Date().toISOString()
        };
      }
      return o;
    });
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(updated));
    await this.addNotification(`vendor_${vendorId}`, `New Order #${orderId} assigned to you`);
    await this.addNotification('admin', `Order #${orderId} assigned to vendor ${resolvedName}`);
    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(new CustomEvent('giftportal_vendor_assigned', {
          detail: { orderId, vendorId, vendorName: resolvedName }
        }));
      } catch (e) {}
    }
    await postSyncAction('assign_order_vendor', { orderId, vendorId, vendorName: resolvedName });
    broadcastSync();
    return updated;
  },

  // Workflow Stage 3 -> 4: Vendor Confirms Order is Ready for Pickup
  async markOrderReadyForPickup(orderId, options = {}) {
    const orders = await this.getOrders();
    const vendors = await this.getVendors();
    const mode = options.mode || 'vendor_self'; // 'vendor_self' | 'admin_pickup'

    const targetOrder = orders.find(o => String(o.id) === String(orderId));
    const vendor = vendors.find(v => String(v.id) === String(targetOrder?.assignedVendorId)) || 
                   vendors.find(v => v.businessName === targetOrder?.assignedVendorName) ||
                   vendors.find(v => v.username === targetOrder?.assignedVendorUsername);

    const vendorName = targetOrder?.assignedVendorName || vendor?.businessName || vendor?.name || 'Shop Vendor';
    const vendorAddress = vendor?.address || targetOrder?.vendorAddress || 'Shop Counter, Indore';
    const workingHours = (vendor?.openingTime && vendor?.closingTime)
      ? `${vendor.openingTime} - ${vendor.closingTime}`
      : '08:30 AM - 10:30 PM';
    const vendorPhone = vendor?.mobile || targetOrder?.vendorPhone || 'N/A';

    const cleanPickupOtp = targetOrder?.pickupOtp || Math.floor(1000 + Math.random() * 9000).toString();
    const isAdminPickup = mode === 'admin_pickup';

    const updated = orders.map(o => {
      if (String(o.id) === String(orderId)) {
        return {
          ...o,
          stage: 'ready_for_pickup',
          status: 'Ready for Pickup',
          statusMessage: isAdminPickup
            ? `Ready for Pickup. Admin logistics collection requested from ${vendorName} (${vendorAddress}). Working Hours: ${workingHours}`
            : `Order packed and ready for self-pickup dispatch at ${vendorName}`,
          readyAt: new Date().toISOString(),
          shipmentArrangedBy: isAdminPickup ? 'admin' : 'vendor_self',
          adminPickupRequested: isAdminPickup,
          adminPickupRequestTime: isAdminPickup ? new Date().toISOString() : o.adminPickupRequestTime,
          vendorWorkingHours: workingHours,
          vendorPickupAddress: vendorAddress,
          vendorContactPhone: vendorPhone,
          pickupOtp: cleanPickupOtp
        };
      }
      return o;
    });

    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(updated));

    if (isAdminPickup) {
      await this.addNotification(
        'admin',
        `🔔 SHIPMENT READY FOR PICKUP: Order #${orderId} is ready for pickup from shop vendor "${vendorName}" (${vendorAddress}). Working Hours: ${workingHours}. Kindly arrange logistics collection.`
      );
      if (targetOrder?.assignedVendorId) {
        await this.addNotification(
          `vendor_${targetOrder.assignedVendorId}`,
          `Shipment pickup request sent to Admin for Order #${orderId}. Admin will arrange driver collection from your shop (${vendorAddress}) during working hours (${workingHours}).`
        );
      }
    } else {
      await this.addNotification(
        'admin',
        `Order #${orderId} marked Ready for Pickup by "${vendorName}" (Vendor will arrange self-pickup)`
      );
      if (targetOrder?.assignedVendorId) {
        await this.addNotification(
          `vendor_${targetOrder.assignedVendorId}`,
          `Order #${orderId} marked Ready for Pickup. You can now arrange self-dispatch with Pickup & Drop OTPs.`
        );
      }
    }

    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(new CustomEvent('giftportal_admin_pickup_alert', {
          detail: {
            orderId,
            vendorName,
            vendorAddress,
            workingHours,
            isAdminPickup
          }
        }));
      } catch (e) {}
    }

    await postSyncAction('mark_ready_for_pickup', { orderId, mode, options });
    broadcastSync();
    return updated;
  },

  // Workflow Stage 4 -> 5: Admin Dispatches Logistics (Internal Staff, 3rd Party Driver, or Outer-City Courier)
  async dispatchOrderLogistics(orderId, logisticsPayload) {
    const orders = await this.getOrders();
    const isCourier = logisticsPayload.type === 'courier';
    const cleanPickup = String(logisticsPayload.pickupOtp || '').trim();
    const cleanDrop = String(logisticsPayload.dropOtp || '').trim();

    const updated = orders.map(o => {
      if (String(o.id) === String(orderId)) {
        const nextStatus = isCourier ? 'Shipped' : 'In Transit';
        const nextMessage = isCourier
          ? `Shipped via ${logisticsPayload.provider || 'Courier'} (AWB: ${logisticsPayload.trackingId || 'N/A'}). In transit to ${o.recipient?.city || 'destination'}.`
          : `Out for delivery via ${logisticsPayload.provider || 'Express Delivery'}`;

        const nextPickup = cleanPickup || o.pickupOtp;
        const nextDrop = cleanDrop || o.dropOtp || o.deliveryOtp;

        return {
          ...o,
          pickupOtp: nextPickup,
          dropOtp: nextDrop,
          deliveryOtp: nextDrop,
          logistics: {
            ...logisticsPayload,
            pickupOtp: nextPickup,
            dropOtp: nextDrop,
            dispatchedAt: new Date().toISOString()
          },
          stage: 'out_for_delivery',
          status: nextStatus,
          statusMessage: nextMessage
        };
      }
      return o;
    });
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(updated));
    await this.addNotification('admin', `Order #${orderId} dispatched via ${logisticsPayload.provider || 'Logistics'}${isCourier && logisticsPayload.trackingId ? ` (AWB: ${logisticsPayload.trackingId})` : ''}`);
    const target = updated.find(o => String(o.id) === String(orderId));
    if (target?.customerUsername) {
      const dropCode = cleanDrop || target.dropOtp || target.deliveryOtp;
      const custMsg = isCourier
        ? `Your product has been shipped via ${logisticsPayload.provider || 'Courier'} (Tracking ID: ${logisticsPayload.trackingId || 'N/A'}). Track your order here.`
        : `Your Order #${orderId} is out for delivery with ${logisticsPayload.provider || 'Express Delivery'}! Doorstep Drop OTP: ${dropCode}`;
      await this.addNotification(target.customerUsername, custMsg);
    }
    await postSyncAction('dispatch_logistics', { orderId, logisticsPayload });
    broadcastSync();
    return updated;
  },

  // Self-Pickup (Rapido, Porter, Uber Package, Shop Fleet) Dual OTP Management
  // 1. Pickup OTP: Driver counter collection code (internal record)
  // 2. Drop OTP: Doorstep handover code (auto-notified to customer & visible in Customer My Account)
  async updateSelfPickupOtps(orderId, otpPayload = {}) {
    const orders = await this.getOrders();
    let updatedOrder = null;
    const cleanPickup = String(otpPayload.pickupOtp || '').trim();
    const cleanDrop = String(otpPayload.dropOtp || '').trim();
    const provider = otpPayload.provider || 'Rapido';
    const isDispatch = Boolean(otpPayload.isDispatch || (otpPayload.type === 'vendor_self_dispatch' && otpPayload.driverName));

    const updated = orders.map(o => {
      if (String(o.id) === String(orderId)) {
        const nextPickup = cleanPickup || o.pickupOtp || '8097';
        const nextDrop = cleanDrop || o.dropOtp || o.deliveryOtp || '4468';
        const nowIso = new Date().toISOString();
        const newLogistics = {
          ...(o.logistics || {}),
          type: 'vendor_self_dispatch',
          provider: provider,
          driverName: otpPayload.driverName !== undefined ? otpPayload.driverName : (o.logistics?.driverName || ''),
          driverMobile: otpPayload.driverMobile !== undefined ? otpPayload.driverMobile : (o.logistics?.driverMobile || ''),
          rideBookingId: otpPayload.rideBookingId !== undefined ? otpPayload.rideBookingId : (o.logistics?.rideBookingId || ''),
          trackingUrl: otpPayload.trackingUrl || o.logistics?.trackingUrl || '',
          pickupOtp: nextPickup,
          dropOtp: nextDrop,
          dispatchedAt: isDispatch ? (otpPayload.dispatchedAt || o.logistics?.dispatchedAt || nowIso) : (o.logistics?.dispatchedAt || null),
          updatedAt: nowIso
        };

        const nextStatus = o.status === 'Delivered'
          ? 'Delivered'
          : (isDispatch ? 'In Transit' : (o.status === 'Pending' || o.status === 'Accepted' ? 'Ready for Pickup' : o.status));

        const nextStage = o.status === 'Delivered'
          ? 'delivered'
          : (isDispatch ? 'out_for_delivery' : (o.stage === 'pending' || o.stage === 'crafting' ? 'ready_for_pickup' : (o.stage || 'out_for_delivery')));

        updatedOrder = {
          ...o,
          pickupOtp: nextPickup,
          dropOtp: nextDrop,
          deliveryOtp: nextDrop,
          logistics: newLogistics,
          stage: nextStage,
          status: nextStatus,
          dispatchedAt: isDispatch ? (o.dispatchedAt || nowIso) : o.dispatchedAt,
          statusMessage: o.status === 'Delivered' 
            ? o.statusMessage 
            : (isDispatch
                ? `Out for delivery via ${provider} (Rider: ${newLogistics.driverName || 'Partner'}). Doorstep handover pending Customer Drop OTP.`
                : `Self-pickup scheduled with ${provider}. Drop OTP generated for customer handover.`)
        };
        return updatedOrder;
      }
      return o;
    });

    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(updated));

    // When DROP OTP or dispatch is updated, notify customer
    if (updatedOrder) {
      if (updatedOrder.customerUsername) {
        if (isDispatch) {
          await this.addNotification(
            updatedOrder.customerUsername,
            `🛵 Order #${orderId} is out for delivery with ${provider} (${updatedOrder.logistics?.driverName || 'Rider'})! Share your Drop OTP (${updatedOrder.dropOtp}) at doorstep for delivery.`
          );
        } else if (cleanDrop) {
          await this.addNotification(
            updatedOrder.customerUsername,
            `🔔 Delivery Drop OTP for Order #${orderId} is ${cleanDrop}. Please share this OTP with your ${provider} delivery executive upon doorstep arrival.`
          );
        }
      }
    }

    await this.addNotification(
      'admin',
      isDispatch
        ? `Order #${orderId} dispatched via ${provider} (${updatedOrder?.logistics?.driverName || 'Rider'}). Status is now In Transit.`
        : `Self-pickup OTPs updated for Order #${orderId} via ${provider} (Pickup OTP: ${cleanPickup || 'N/A'}, Drop OTP: ${cleanDrop || 'N/A'})`
    );

    if (updatedOrder?.assignedVendorId) {
      await this.addNotification(
        `vendor_${updatedOrder.assignedVendorId}`,
        isDispatch
          ? `Package handed over to ${provider} rider (${updatedOrder?.logistics?.driverName || 'Partner'}). Order #${orderId} is now In Transit.`
          : `Self-pickup scheduled for Order #${orderId}: Counter Pickup OTP is ${cleanPickup || 'N/A'}. Hand over package to delivery executive after checking Pickup OTP.`
      );
    }

    await postSyncAction('update_self_pickup_otps', { orderId, ...otpPayload, isDispatch });
    broadcastSync();
    return updated;
  },

  // Update or set Courier Tracking AWB and Provider anytime
  async updateCourierTracking(orderId, courierPayload) {
    const orders = await this.getOrders();
    const updated = orders.map(o => {
      if (String(o.id) === String(orderId)) {
        const courierName = courierPayload.provider || o.logistics?.provider || 'Courier';
        const trackingId = courierPayload.trackingId || o.logistics?.trackingId || '';
        return {
          ...o,
          logistics: {
            ...(o.logistics || {}),
            ...courierPayload,
            type: 'courier',
            provider: courierName,
            trackingId,
            updatedAt: new Date().toISOString()
          },
          vendorPickupConfirmed: true,
          vendorCollectedAt: o.vendorCollectedAt || new Date().toISOString(),
          stage: o.status === 'Delivered' ? 'delivered' : 'out_for_delivery',
          status: o.status === 'Delivered' ? 'Delivered' : 'Dispatched',
          statusMessage: `Shipped via ${courierName} (AWB: ${trackingId || 'N/A'})`
        };
      }
      return o;
    });
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(updated));
    const target = updated.find(o => String(o.id) === String(orderId));
    const courierName = courierPayload.provider || target?.logistics?.provider || 'Courier';
    const trackingId = courierPayload.trackingId || target?.logistics?.trackingId || '';

    await this.addNotification('admin', `Order #${orderId} shipped via ${courierName} (AWB: ${trackingId})`);
    if (target?.customerUsername && trackingId) {
      await this.addNotification(
        target.customerUsername, 
        `Your product has been shipped via ${courierName} (Tracking ID: ${trackingId}). Track your order here.`
      );
    }
    await postSyncAction('update_courier_tracking', { orderId, courierPayload });
    broadcastSync();
    return updated;
  },

  // Workflow Stage 4 -> 5: Logistics Partner Parcel Collection via Pickup OTP Verification
  async verifyAndPickupOrder(orderId, enteredOtp, logisticsPayload = {}) {
    const orders = await this.getOrders();
    const order = orders.find(o => String(o.id) === String(orderId));
    if (!order) return { success: false, message: 'Order not found' };

    const cleanEntered = String(enteredOtp || '').trim();
    const cleanExpected = String(order.pickupOtp || '').trim();

    if (cleanEntered !== cleanExpected) {
      return { 
        success: false, 
        message: `Invalid Pickup OTP "${cleanEntered}". Pickup driver must enter correct Vendor OTP: ${cleanExpected}` 
      };
    }

    const updated = orders.map(o => {
      if (String(o.id) === String(orderId)) {
        const photo = logisticsPayload.pickupPhoto || o.pickupPhoto || null;
        return {
          ...o,
          stage: 'out_for_delivery',
          status: 'In Transit',
          statusMessage: `Parcel collected from vendor with photo proof and verified Pickup OTP. In transit with ${logisticsPayload.provider || order.logistics?.provider || 'Express Logistics'}`,
          pickupVerified: true,
          pickedUpAt: new Date().toISOString(),
          pickupPhoto: photo,
          logistics: {
            ...(o.logistics || {}),
            ...logisticsPayload,
            pickupPhoto: photo,
            pickupVerifiedAt: new Date().toISOString()
          }
        };
      }
      return o;
    });

    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(updated));
    await this.addNotification('admin', `Order #${orderId} Pickup OTP verified! Package collected and in transit.`);
    if (order.assignedVendorId) {
      await this.addNotification(`vendor_${order.assignedVendorId}`, `Order #${orderId} picked up by delivery partner upon OTP verification.`);
    }
    if (order.customerUsername) {
      await this.addNotification(order.customerUsername, `Your Order #${orderId} has been picked up from the workshop with quality check photo and is on its way to your doorstep!`);
    }
    await postSyncAction('verify_pickup', { orderId, enteredOtp, logisticsPayload });
    broadcastSync();
    return { success: true, message: 'Pickup OTP verified successfully! Order is now Out for Delivery.' };
  },

  // Workflow Stage 5 -> 6: Customer Delivery Handover via Delivery OTP Verification
  async verifyAndDeliverOrder(orderId, enteredOtp, bypass = false) {
    const orders = await this.getOrders();
    const order = orders.find(o => String(o.id) === String(orderId));
    if (!order) return { success: false, message: 'Order not found' };

    const cleanEntered = String(enteredOtp || '').trim();
    const cleanExpected = String(order.deliveryOtp || '').trim();

    if (!bypass && cleanEntered !== cleanExpected) {
      return { success: false, message: `Invalid Delivery OTP "${cleanEntered}". Customer must provide OTP: ${cleanExpected}` };
    }

    const updated = orders.map(o => {
      if (String(o.id) === String(orderId)) {
        return {
          ...o,
          stage: 'delivered',
          status: 'Delivered',
          statusMessage: 'Order successfully delivered to recipient upon OTP verification',
          deliveredAt: new Date().toISOString(),
          otpVerified: true
        };
      }
      return o;
    });
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(updated));
    await this.addNotification('admin', `Order #${orderId} verified with OTP and Delivered`);
    if (order.assignedVendorId) {
      await this.addNotification(`vendor_${order.assignedVendorId}`, `Order #${orderId} successfully delivered to customer.`);
    }
    if (order.customerUsername) {
      await this.addNotification(order.customerUsername, `Your Order #${orderId} has been delivered!`);
    }
    await postSyncAction('verify_deliver', { orderId, enteredOtp, bypass });
    broadcastSync();
    return { success: true, message: 'Order verified and delivered successfully!' };
  },

  // Workflow Stage 7: Customer Rating & Quality Feedback
  async submitOrderRating(orderId, { rating, comment, username }) {
    const orders = await this.getOrders();
    const updated = orders.map(o => {
      if (String(o.id) === String(orderId)) {
        return {
          ...o,
          feedback: {
            rating: Number(rating),
            text: comment || '',
            username: username || o.customerUsername || 'Customer',
            timestamp: new Date().toISOString()
          }
        };
      }
      return o;
    });
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(updated));
    await this.addNotification('admin', `Customer rated Order #${orderId}: ${rating} Stars`);
    await postSyncAction('save_feedback', { orderId, feedback: { rating: Number(rating), text: comment || '', username, timestamp: new Date().toISOString() } });
    broadcastSync();
    return updated;
  },

  async updateOrderStatus(orderId, newStatus, customMessage = '') {
    const orders = await this.getOrders();
    let targetUsername = '';
    let assignedAdmin = '';
    let assignedVendorId = '';
    const updated = orders.map(o => {
      if (String(o.id) === String(orderId)) {
        targetUsername = o.customerUsername;
        assignedAdmin = o.assignedAdmin;
        assignedVendorId = o.assignedVendorId;
        const patch = { ...o, status: newStatus, statusMessage: customMessage };
        if (newStatus === 'Accepted') {
          patch.assignmentAccepted = true;
          patch.acceptedAt = patch.acceptedAt || new Date().toISOString();
          if (!patch.stage || patch.stage === 'pending' || patch.stage === 'confirmed') {
            patch.stage = 'in_preparation';
          }
        }
        return patch;
      }
      return o;
    });
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(updated));
    
    if (targetUsername) {
      const userText = customMessage?.trim()
        ? `Order ${orderId}: ${customMessage}`
        : `Your order ${orderId} status updated to: ${newStatus}`;
      await this.addNotification(targetUsername, userText);
    }

    const adminText = customMessage?.trim()
      ? `Order ${orderId}: ${customMessage}`
      : `Order ${orderId} status updated to: ${newStatus}`;
    await this.addNotification('admin', adminText);

    if (assignedAdmin) {
      await this.addNotification(assignedAdmin, `Order ${orderId} updated: ${newStatus}`);
    }
    if (assignedVendorId) {
      await this.addNotification(`vendor_${assignedVendorId}`, `Order ${orderId} updated: ${newStatus}`);
    }

    await postSyncAction('update_order_status', { orderId, newStatus, customMessage });
    broadcastSync();
    return updated;
  },

  async assignOrder(orderId, assignment) {
    const orders = await this.getOrders();
    let area = '';
    let targetUsername = '';
    const vendors = await this.getVendors();

    const updated = orders.map(o => {
      if (String(o.id) !== String(orderId)) return o;
      area = o.area;
      targetUsername = o.customerUsername;

      // Only update fields that are present in the assignment object
      const newObj = { ...o };
      
      if (assignment.hasOwnProperty('assignedAdmin')) {
        newObj.assignedAdmin = assignment.assignedAdmin;
      }
      
      if (assignment.hasOwnProperty('assignedVendorId')) {
        newObj.assignedVendorId = assignment.assignedVendorId;
        const vendor = vendors.find(v => String(v.id) === String(assignment.assignedVendorId));
        newObj.assignedVendorName = vendor ? (vendor.businessName || vendor.name) : '';
      }
      
      if (assignment.hasOwnProperty('thirdPartyAssignment')) {
        newObj.thirdPartyAssignment = assignment.thirdPartyAssignment;
      }
      
      if (assignment.hasOwnProperty('assignmentAccepted')) {
        newObj.assignmentAccepted = assignment.assignmentAccepted;
      }

      return newObj;
    });

    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(updated));
    
    // Notifications logic
    if (assignment.assignedAdmin) {
      await this.addNotification(assignment.assignedAdmin, `New delivery assigned: #${orderId} (${area})`);
      await this.addNotification('admin', `Order #${orderId} assigned to admin ${assignment.assignedAdmin}`);
    }
    if (assignment.assignedVendorId) {
      const vendor = vendors.find(v => String(v.id) === String(assignment.assignedVendorId));
      const vName = vendor ? (vendor.businessName || vendor.name) : 'Unknown';
      await this.addNotification('admin', `Order #${orderId} assigned to vendor ${vName}`);
      await this.addNotification(`vendor_${assignment.assignedVendorId}`, `New order assigned: #${orderId} (${area})`);
    }
    if (assignment.thirdPartyAssignment && targetUsername) {
      const tpMsg = `Delivery Partner Assigned: ${assignment.thirdPartyAssignment.provider} - ${assignment.thirdPartyAssignment.name} (${assignment.thirdPartyAssignment.mobile}). They will deliver your order #${orderId} soon!`;
      await this.addNotification(targetUsername, tpMsg);
    }
    
    await this.addNotification('admin', `Assignment updated for ${orderId}`);
    await postSyncAction('assign_order', { orderId, assignment });
    broadcastSync();
    return updated;
  },

  async saveOrderFeedback(orderId, username, rating, feedback) {
    const orders = await this.getOrders();
    const updated = orders.map(o => {
      if (String(o.id) !== String(orderId)) return o;
      return {
        ...o,
        feedback: {
          username,
          rating: Number(rating),
          text: feedback || '',
          timestamp: new Date().toISOString()
        }
      };
    });
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(updated));
    await this.addNotification('admin', `New rating received for ${orderId}`);
    window.dispatchEvent(new Event('storage'));
    return updated;
  },

  async resetAllStats() {
    localStorage.removeItem(DB_KEYS.ORDERS);
    localStorage.removeItem(DB_KEYS.NOTIFICATIONS);
    localStorage.setItem('admin_activity_logs', JSON.stringify([]));
    window.dispatchEvent(new Event('storage'));
  },

  async changeAdminPin(username, newPin) {
    const cleanPin = String(newPin).trim();
    if (!cleanPin || cleanPin.length !== 4) return false;
    try {
      const session = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('giftportal_admin_session') || '{}') : {};
      const token = session.token;
      const res = await fetch('/api/admin/change-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPin: cleanPin, username: username || 'admin' })
      });
      const data = await res.json();
      if (data.success) {
        broadcastSync();
        return true;
      }
    } catch (e) {
      console.warn('Server change-pin fallback:', e);
    }
    const admins = await this.getAdmins();
    const updated = admins.map(a => {
      if (a.username.toLowerCase() === (username || 'admin').toLowerCase()) {
        return { ...a, pin: cleanPin };
      }
      return a;
    });
    await this.saveAdmins(updated);
    return true;
  },

  async exportDatabase() {
    if (typeof window === 'undefined') return {};
    const exportData = {};
    for (const [key, storageKey] of Object.entries(DB_KEYS)) {
      const val = localStorage.getItem(storageKey);
      if (val) {
        try {
          exportData[key] = JSON.parse(val);
        } catch (e) {
          exportData[key] = val;
        }
      }
    }
    return exportData;
  },

  async importDatabase(jsonData) {
    if (typeof window === 'undefined' || !jsonData) return false;
    for (const [key, storageKey] of Object.entries(DB_KEYS)) {
      if (jsonData[key] !== undefined) {
        localStorage.setItem(storageKey, JSON.stringify(jsonData[key]));
      }
    }
    window.dispatchEvent(new Event('storage'));
    return true;
  },

  // --- FAVOURITES ---
  async getFavourites(username) {
    if (typeof window === 'undefined' || !username) return [];
    const data = localStorage.getItem(`${DB_KEYS.FAVOURITES}_${username}`);
    return data ? JSON.parse(data) : [];
  },

  async toggleFavourite(username, product) {
    if (!username) return [];
    const favs = await this.getFavourites(username);
    const exists = favs.find(f => f.id === product.id);
    let updated;
    if (exists) {
      updated = favs.filter(f => f.id !== product.id);
    } else {
      updated = [...favs, { ...product, addedAt: new Date().toISOString() }];
    }
    localStorage.setItem(`${DB_KEYS.FAVOURITES}_${username}`, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    return updated;
  },

  // --- ADDRESSES ---
  async getAddresses(username) {
    if (typeof window === 'undefined' || !username) return [];
    const data = localStorage.getItem(`addresses_${username}`);
    return data ? JSON.parse(data) : [];
  },

  async saveAddress(username, address) {
    if (!username) return [];
    const addresses = await this.getAddresses(username);
    let updated;
    if (address.id) {
      updated = addresses.map(a => a.id === address.id ? { ...address, updatedAt: new Date().toISOString() } : a);
    } else {
      const newAddress = {
        ...address,
        id: `ADDR-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        isDefault: addresses.length === 0 ? true : address.isDefault
      };
      if (newAddress.isDefault) {
        addresses.forEach(a => a.isDefault = false);
      }
      updated = [...addresses, newAddress];
    }
    localStorage.setItem(`addresses_${username}`, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    return updated;
  },

  async deleteAddress(username, addressId) {
    if (!username) return [];
    const addresses = await this.getAddresses(username);
    const updated = addresses.filter(a => a.id !== addressId);
    if (updated.length > 0 && !updated.find(a => a.isDefault)) {
      updated[0].isDefault = true;
    }
    localStorage.setItem(`addresses_${username}`, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    return updated;
  },

  // --- CITY & PINCODE OPERATIONS DESK ---
  async getCities() {
    if (typeof window === 'undefined') return DEFAULT_CITIES;
    const data = localStorage.getItem(DB_KEYS.CITIES);
    if (!data) {
      localStorage.setItem(DB_KEYS.CITIES, JSON.stringify(DEFAULT_CITIES));
      return DEFAULT_CITIES;
    }
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      localStorage.setItem(DB_KEYS.CITIES, JSON.stringify(DEFAULT_CITIES));
      return DEFAULT_CITIES;
    } catch {
      localStorage.setItem(DB_KEYS.CITIES, JSON.stringify(DEFAULT_CITIES));
      return DEFAULT_CITIES;
    }
  },

  async saveCities(cities) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(DB_KEYS.CITIES, JSON.stringify(cities));
    }
    await postSyncAction('save_cities', { cities });
    broadcastSync();
    return cities;
  },

  async addCity({ name, state, hubType = 'courier', description = '' }) {
    const cities = await this.getCities();
    const cityId = `city-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;
    const newCity = {
      id: cityId,
      name: name.trim(),
      state: state.trim(),
      hubType: hubType || 'courier',
      status: 'active',
      description: description || (hubType === 'local_express' ? 'Local Express Fleet Hub' : 'Domestic Courier Shipping Destination'),
      pincodes: []
    };
    const updated = [...cities, newCity];
    await this.saveCities(updated);
    return newCity;
  },

  async toggleCityStatus(cityId) {
    const cities = await this.getCities();
    const updated = cities.map(c => {
      if (c.id === cityId) {
        const nextStatus = c.status === 'active' ? 'paused' : 'active';
        return { ...c, status: nextStatus };
      }
      return c;
    });
    await this.saveCities(updated);
    return updated;
  },

  async deleteCity(cityId) {
    const cities = await this.getCities();
    const updated = cities.filter(c => c.id !== cityId);
    await this.saveCities(updated);
    return updated;
  },

  async addPincode(cityId, { code, area, sla = 'Standard Delivery', deliveryFee = 0 }) {
    const cities = await this.getCities();
    const cleanCode = String(code).trim();
    const updated = cities.map(c => {
      if (c.id === cityId) {
        const existing = c.pincodes || [];
        const filtered = existing.filter(p => p.code !== cleanCode);
        const newPin = {
          code: cleanCode,
          area: area.trim(),
          sla: sla || (c.hubType === 'local_express' ? 'Same-Day / 2-Hr Express' : 'Domestic Courier (2-3 Days)'),
          deliveryFee: Number(deliveryFee) || 0,
          status: 'active'
        };
        return { ...c, pincodes: [...filtered, newPin] };
      }
      return c;
    });
    await this.saveCities(updated);
    return updated;
  },

  async togglePincodeStatus(cityId, code) {
    const cities = await this.getCities();
    const updated = cities.map(c => {
      if (c.id === cityId) {
        const nextPincodes = (c.pincodes || []).map(p => {
          if (p.code === code) {
            return { ...p, status: p.status === 'active' ? 'paused' : 'active' };
          }
          return p;
        });
        return { ...c, pincodes: nextPincodes };
      }
      return c;
    });
    await this.saveCities(updated);
    return updated;
  },

  async deletePincode(cityId, code) {
    const cities = await this.getCities();
    const updated = cities.map(c => {
      if (c.id === cityId) {
        return { ...c, pincodes: (c.pincodes || []).filter(p => p.code !== code) };
      }
      return c;
    });
    await this.saveCities(updated);
    return updated;
  },

  async resetToDefaultCities() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(DB_KEYS.CITIES, JSON.stringify(DEFAULT_CITIES));
    }
    await postSyncAction('save_cities', { cities: DEFAULT_CITIES });
    broadcastSync();
    return DEFAULT_CITIES;
  },

  // --- PINCODE & ADDONS ---
  async checkPincode(pincode) {
    const cleanPin = (pincode || '').trim();
    if (cleanPin.length !== 6 || !/^\d+$/.test(cleanPin)) {
      return { serviceable: false, message: 'Please enter a valid 6-digit Pincode.' };
    }

    const cities = await this.getCities();
    let foundCity = null;
    let foundPin = null;

    for (const c of cities) {
      if (c.pincodes && Array.isArray(c.pincodes)) {
        const match = c.pincodes.find(p => p.code === cleanPin);
        if (match) {
          foundCity = c;
          foundPin = match;
          break;
        }
      }
    }

    if (foundCity && foundPin) {
      if (foundCity.status === 'paused') {
        return {
          serviceable: false,
          pincode: cleanPin,
          city: foundCity.name,
          state: foundCity.state,
          area: foundPin.area,
          message: `Delivery operations are temporarily paused in ${foundCity.name}.`
        };
      }
      if (foundPin.status === 'paused') {
        return {
          serviceable: false,
          pincode: cleanPin,
          city: foundCity.name,
          state: foundCity.state,
          area: foundPin.area,
          message: `Delivery is currently paused for pincode ${cleanPin} (${foundPin.area}).`
        };
      }
      const isLocal = foundCity.hubType === 'local_express';
      return {
        serviceable: true,
        pincode: cleanPin,
        city: foundCity.name,
        state: foundCity.state,
        area: foundPin.area,
        hubType: foundCity.hubType,
        deliveryFee: foundPin.deliveryFee || 0,
        message: isLocal
          ? `⚡ Express 2-Hour & Midnight Delivery available in ${foundCity.name} (${foundPin.area})`
          : `📦 Domestic Courier Delivery available to ${foundCity.name} (${foundPin.area})`
      };
    }

    // Dynamic fallback for all Indore 452xxx / 453xxx pin codes if not explicitly in table
    if (cleanPin.startsWith('452') || cleanPin.startsWith('453')) {
      const indoreCity = cities.find(c => c.name.toLowerCase().includes('indore'));
      if (indoreCity && indoreCity.status === 'paused') {
        return {
          serviceable: false,
          pincode: cleanPin,
          city: 'Indore',
          state: 'Madhya Pradesh',
          area: 'Indore Zone',
          message: 'Delivery operations are temporarily paused in Indore.'
        };
      }
      return {
        serviceable: true,
        pincode: cleanPin,
        city: 'Indore',
        state: 'Madhya Pradesh',
        area: 'Indore Local Zone',
        hubType: 'local_express',
        deliveryFee: 0,
        message: `⚡ Express & Midnight Delivery available in Indore (${cleanPin})`
      };
    }

    return {
      serviceable: false,
      pincode: cleanPin,
      message: `Delivery is not yet available for pincode ${cleanPin}. We are expanding fast!`
    };
  },

  async getAddons() {
    return DEFAULT_ADDONS || [];
  },

  // --- SUPPORT TICKETING SYSTEM ---
  async getSupportTickets(username = null) {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(DB_KEYS.TICKETS);
    const all = data ? JSON.parse(data) : [];
    if (username) {
      return all.filter(t => t.customerUsername === username);
    }
    return all;
  },

  async createSupportTicket(ticketData) {
    const tickets = await this.getSupportTickets();
    const ticketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket = {
      id: ticketId,
      customerUsername: ticketData.customerUsername || 'guest',
      customerName: ticketData.customerName || 'Customer',
      email: ticketData.email || '',
      phone: ticketData.phone || '',
      orderId: ticketData.orderId || '',
      subject: ticketData.subject || 'Support Request',
      category: ticketData.category || 'General',
      priority: ticketData.priority || 'Normal', // Normal, High, Urgent
      status: 'Open', // Open, In Progress, Resolved, Closed
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          from: 'customer',
          senderName: ticketData.customerName || 'Customer',
          text: ticketData.message,
          timestamp: new Date().toISOString()
        }
      ]
    };
    tickets.unshift(newTicket);
    localStorage.setItem(DB_KEYS.TICKETS, JSON.stringify(tickets));
    await this.addNotification('admin', `New Support Ticket #${ticketId} raised by ${newTicket.customerName}: "${newTicket.subject}"`);
    window.dispatchEvent(new Event('storage'));
    return newTicket;
  },

  async replySupportTicket(ticketId, { replyText, adminUsername = 'Support Desk', newStatus = 'In Progress', replyEmail = '' }) {
    const tickets = await this.getSupportTickets();
    let updatedTicket = null;
    const updated = tickets.map(t => {
      if (String(t.id) === String(ticketId)) {
        const replyMsg = {
          id: `msg-${Date.now()}`,
          from: 'admin',
          senderName: adminUsername,
          text: replyText,
          timestamp: new Date().toISOString(),
          replyEmail: replyEmail || t.email,
          channel: 'Email'
        };
        updatedTicket = {
          ...t,
          status: newStatus || t.status,
          updatedAt: new Date().toISOString(),
          messages: [...(t.messages || []), replyMsg]
        };
        return updatedTicket;
      }
      return t;
    });

    localStorage.setItem(DB_KEYS.TICKETS, JSON.stringify(updated));
    if (updatedTicket?.customerUsername) {
      await this.addNotification(
        updatedTicket.customerUsername, 
        `Support Team replied to your Ticket #${ticketId} ("${updatedTicket.subject}") via Email.`
      );
    }
    window.dispatchEvent(new Event('storage'));
    return updatedTicket;
  },

  async updateTicketStatus(ticketId, status) {
    const tickets = await this.getSupportTickets();
    const updated = tickets.map(t => {
      if (String(t.id) === String(ticketId)) {
        return { ...t, status, updatedAt: new Date().toISOString() };
      }
      return t;
    });
    localStorage.setItem(DB_KEYS.TICKETS, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    return updated;
  },

  // --- VENDOR FINANCIALS & SETTLEMENTS ---
  async getVendorFinancials(vendorId) {
    const orders = await this.getOrders();
    const settlements = await this.getVendorSettlements(vendorId);
    const vendorOrders = orders.filter(o => String(o.assignedVendorId) === String(vendorId));
    
    const delivered = vendorOrders.filter(o => o.status === 'Delivered');
    const active = vendorOrders.filter(o => !['Delivered', 'Cancelled', 'Rejected'].includes(o.status));
    const cancelled = vendorOrders.filter(o => ['Cancelled', 'Rejected'].includes(o.status));
    
    const grossDeliveredRevenue = delivered.reduce((acc, o) => acc + (Number(o.total) || 0), 0);
    const commissionRate = 0.10; // 10% platform commission
    const platformCommission = Math.round(grossDeliveredRevenue * commissionRate);
    const netEarnings = grossDeliveredRevenue - platformCommission;
    
    const totalSettled = settlements.reduce((acc, s) => acc + (Number(s.amount) || 0), 0);
    const outstandingDue = Math.max(0, netEarnings - totalSettled);

    return {
      vendorId,
      totalOrdersCount: vendorOrders.length,
      activeCount: active.length,
      deliveredCount: delivered.length,
      cancelledCount: cancelled.length,
      grossDeliveredRevenue,
      commissionRate: commissionRate * 100,
      platformCommission,
      netEarnings,
      totalSettled,
      outstandingDue,
      orders: vendorOrders,
      settlements
    };
  },

  async getVendorSettlements(vendorId = null) {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(DB_KEYS.SETTLEMENTS);
    const all = data ? JSON.parse(data) : [];
    if (vendorId) {
      return all.filter(s => String(s.vendorId) === String(vendorId));
    }
    return all;
  },

  async settleVendorPayout({ vendorId, vendorName, amount, method = 'NEFT', refNumber = '', note = '', orderIds = [] }) {
    const settlements = await this.getVendorSettlements();
    const settlementId = `SETTLE-${Math.floor(1000 + Math.random() * 9000)}`;
    const newSettlement = {
      id: settlementId,
      vendorId,
      vendorName: vendorName || 'Vendor Partner',
      amount: Number(amount) || 0,
      method, // NEFT, IMPS, UPI, Direct Bank Transfer
      refNumber: refNumber || `UTR-${Date.now()}`,
      note,
      orderIds: orderIds || [],
      settledAt: new Date().toISOString(),
      status: 'Paid'
    };
    settlements.unshift(newSettlement);
    localStorage.setItem(DB_KEYS.SETTLEMENTS, JSON.stringify(settlements));
    
    await this.addNotification(
      `vendor_${vendorId}`,
      `💰 Payout Settlement Processed: ₹${newSettlement.amount} via ${method} (Ref: ${newSettlement.refNumber})`
    );
    await this.addNotification(
      'admin',
      `Processed payout of ₹${newSettlement.amount} for ${newSettlement.vendorName} (${settlementId})`
    );
    window.dispatchEvent(new Event('storage'));
    return newSettlement;
  },

  // --- VENDOR AGREEMENT ---
  async getVendorAgreement(vendorId) {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(DB_KEYS.AGREEMENTS);
    const all = data ? JSON.parse(data) : {};
    return all[vendorId] || {
      accepted: true, // Default active standard agreement
      acceptedAt: new Date().toISOString(),
      version: '2.4',
      signatory: 'Authorized Representative'
    };
  },

  async acceptVendorAgreement(vendorId, signatoryName) {
    if (typeof window === 'undefined') return;
    const data = localStorage.getItem(DB_KEYS.AGREEMENTS);
    const all = data ? JSON.parse(data) : {};
    all[vendorId] = {
      accepted: true,
      acceptedAt: new Date().toISOString(),
      version: '2.4',
      signatory: signatoryName || 'Authorized Signatory'
    };
    localStorage.setItem(DB_KEYS.AGREEMENTS, JSON.stringify(all));
    window.dispatchEvent(new Event('storage'));
    return all[vendorId];
  },

  // --- REAL-TIME SERVER SYNCHRONIZATION ---
  async syncWithServer(force = false) {
    if (typeof window === 'undefined' || isSyncing) return false;
    isSyncing = true;
    try {
      const localVer = currentLocalVersion || Number(localStorage.getItem('giftportal_db_version') || 0);
      const url = force ? '/api/sync' : `/api/sync?since=${localVer}`;
      const res = await fetch(url);
      if (!res.ok) return false;
      const result = await res.json();

      if (result.upToDate) return false;

      if (result.data) {
        const serverData = result.data;
        currentLocalVersion = result.version;
        localStorage.setItem('giftportal_db_version', String(result.version));

        if (Array.isArray(serverData.orders)) {
          let ordersToStore = serverData.orders;
          try {
            const localRaw = localStorage.getItem(DB_KEYS.ORDERS);
            if (localRaw) {
              const localOrders = JSON.parse(localRaw);
              if (Array.isArray(localOrders) && localOrders.length > 0) {
                const serverIdMap = new Map(serverData.orders.map(o => [String(o.id), o]));
                const missingOnServer = [];
                for (const lo of localOrders) {
                  if (!serverIdMap.has(String(lo.id))) {
                    missingOnServer.push(lo);
                  }
                }
                if (missingOnServer.length > 0) {
                  ordersToStore = [...missingOnServer, ...serverData.orders];
                  setTimeout(() => {
                    postSyncAction('bulk_sync', { orders: missingOnServer });
                  }, 100);
                }
              }
            }
          } catch (e) {}
          ordersToStore.sort((a, b) => {
            const timeA = new Date(a.timestamp || a.createdAt || 0).getTime() || 0;
            const timeB = new Date(b.timestamp || b.createdAt || 0).getTime() || 0;
            return timeB - timeA;
          });
          localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(ordersToStore));
        }
        if (Array.isArray(serverData.inventory)) {
          localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(serverData.inventory));
        }
        if (Array.isArray(serverData.deals)) {
          localStorage.setItem(DB_KEYS.DEALS, JSON.stringify(serverData.deals));
        }
        if (Array.isArray(serverData.areas)) {
          localStorage.setItem(DB_KEYS.AREAS, JSON.stringify(serverData.areas));
        }
        if (Array.isArray(serverData.societies)) {
          localStorage.setItem(DB_KEYS.SOCIETIES, JSON.stringify(serverData.societies));
        }
        if (Array.isArray(serverData.categories)) {
          localStorage.setItem(DB_KEYS.CATEGORIES, JSON.stringify(serverData.categories));
        }
        if (Array.isArray(serverData.hero_slides)) {
          localStorage.setItem(DB_KEYS.HERO_SLIDES, JSON.stringify(serverData.hero_slides));
        }
        if (Array.isArray(serverData.cities)) {
          localStorage.setItem(DB_KEYS.CITIES, JSON.stringify(serverData.cities));
        }
        if (serverData.settings) {
          localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(serverData.settings));
        }
        if (Array.isArray(serverData.admins)) {
          localStorage.setItem(DB_KEYS.ADMINS, JSON.stringify(serverData.admins));
        }
        if (Array.isArray(serverData.vendors)) {
          localStorage.setItem(DB_KEYS.VENDORS, JSON.stringify(serverData.vendors));
        }
        if (Array.isArray(serverData.coupons)) {
          localStorage.setItem(DB_KEYS.COUPONS, JSON.stringify(serverData.coupons));
        }
        if (Array.isArray(serverData.support_tickets)) {
          localStorage.setItem(DB_KEYS.TICKETS, JSON.stringify(serverData.support_tickets));
        }
        if (Array.isArray(serverData.settlements)) {
          localStorage.setItem(DB_KEYS.SETTLEMENTS, JSON.stringify(serverData.settlements));
        }
        if (Array.isArray(serverData.b2b_orders)) {
          localStorage.setItem(DB_KEYS.B2B_ORDERS, JSON.stringify(serverData.b2b_orders));
        }
        if (serverData.notifications && typeof serverData.notifications === 'object') {
          for (const [userKey, notes] of Object.entries(serverData.notifications)) {
            localStorage.setItem(`${DB_KEYS.NOTIFICATIONS}_${userKey}`, JSON.stringify(notes));
          }
        }

        broadcastSync();
        return true;
      }
      return false;
    } catch (err) {
      console.warn('syncWithServer error:', err);
      return false;
    } finally {
      isSyncing = false;
    }
  }
};

// Automatic browser client bootstrap & cross-tab sync
if (typeof window !== 'undefined') {
  const initClient = async () => {
    if (bootstrapDone) return;
    bootstrapDone = true;
    try {
      // 1. If client had local orders before server sync, push any missing orders to server
      const localData = localStorage.getItem(DB_KEYS.ORDERS);
      if (localData) {
        try {
          const localOrders = JSON.parse(localData);
          if (Array.isArray(localOrders) && localOrders.length > 0) {
            await postSyncAction('bulk_sync', { orders: localOrders });
          }
        } catch (e) {}
      }

      // 2. Initial sync with server
      await db.syncWithServer(true);
    } catch (err) {
      console.warn('Initial sync error:', err);
    }
  };

  setTimeout(initClient, 80);

  // Setup broadcast channel listener for real-time inter-tab coordination
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      const bc = new BroadcastChannel('giftportal_sync_channel');
      bc.onmessage = () => {
        db.syncWithServer(false);
      };
    }
  } catch (e) {}
}


