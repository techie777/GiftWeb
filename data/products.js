export const DEALS = [
  {
    id: 101,
    name: 'Royal Orchid & Dutch Rose Symphony',
    emoji: '💐',
    img: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=700&auto=format&fit=crop',
    variant: 'Premium Wrap with Satin Ribbon',
    price: 899,
    original: 1299,
    tag: '🌟 BEST SELLER',
    discount: '30% OFF',
    slot: 'Special',
    earliestDelivery: 'Today',
    occasion: ['birthday', 'anniversary', 'love'],
    recipient: ['her', 'couples']
  },
  {
    id: 102,
    name: 'Artisan Belgian Cocoa Praline Box',
    emoji: '🍫',
    img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=700&auto=format&fit=crop',
    variant: '16 Handcrafted Pieces',
    price: 499,
    original: 750,
    tag: '✨ LIMITED EDITION',
    discount: '33% OFF',
    slot: 'Special',
    earliestDelivery: 'Today',
    occasion: ['birthday', 'congratulations'],
    recipient: ['him', 'her', 'kids']
  }
];

export const ADDONS = [
  {
    id: 'addon-cake-truffle',
    name: 'Dutch Chocolate Truffle Cake (0.5kg)',
    emoji: '🎂',
    price: 499,
    original: 699,
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop',
    cat: 'cake'
  },
  {
    id: 'addon-card-luxury',
    name: 'Hardcover Greeting Card + Velvet Envelope',
    emoji: '💌',
    price: 99,
    original: 199,
    img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop',
    cat: 'card'
  },
  {
    id: 'addon-balloons',
    name: 'Helium Metallic Balloons (Set of 5)',
    emoji: '🎈',
    price: 149,
    original: 249,
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&auto=format&fit=crop',
    cat: 'decor'
  },
  {
    id: 'addon-teddy',
    name: 'Adorable Plush Teddy Bear (10 inch)',
    emoji: '🧸',
    price: 299,
    original: 450,
    img: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500&auto=format&fit=crop',
    cat: 'toy'
  }
];

export const PRODUCTS = [
  // --- FLOWERS ---
  {
    id: 1,
    name: 'Guitarist With 10 Red Roses',
    emoji: '🌹',
    tag: 'Celebration Special',
    cat: 'flowers',
    subcat: 'roses',
    rating: 4.9,
    reviewsCount: 1420,
    earliestDelivery: 'Today',
    deliveryDays: 0,
    img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'anniversary', 'love'],
    recipient: ['her', 'couples'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Musical Experience',
        variants: [
          { label: 'Acoustic Guitarist + 10 Roses', price: 2799, original: 3499, stock: 25 },
          { label: 'Grand Performance + 20 Roses', price: 3499, original: 4499, stock: 15 }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Midnight Serenade Red Rose Bouquet',
    emoji: '🌹',
    tag: 'Best Seller',
    cat: 'flowers',
    subcat: 'roses',
    rating: 4.9,
    reviewsCount: 1284,
    earliestDelivery: 'Today',
    deliveryDays: 0,
    img: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'anniversary', 'love'],
    recipient: ['her', 'couples'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Signature',
        variants: [
          { label: '12 Red Roses', price: 599, original: 799, stock: 50 },
          { label: '24 Red Roses', price: 999, original: 1499, stock: 35 }
        ]
      },
      {
        label: 'Luxury',
        variants: [
          { label: '50 Premium Roses', price: 1899, original: 2499, stock: 20 }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Sunshine Asiatic Lilies & Gerberas',
    emoji: '🌼',
    tag: 'Trending',
    cat: 'flowers',
    subcat: 'lilies',
    rating: 4.8,
    reviewsCount: 890,
    earliestDelivery: 'Today',
    deliveryDays: 0,
    img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'congratulations', 'get-well'],
    recipient: ['her', 'parents', 'him'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Hand-Tied Bouquet',
        variants: [
          { label: 'Standard Bunch (6 Stems)', price: 749, original: 999, stock: 40 },
          { label: 'Grand Vase Bunch (12 Stems)', price: 1299, original: 1699, stock: 20 }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Exotic Purple Orchids In Cylindrical Vase',
    emoji: '🌸',
    tag: 'Luxury',
    cat: 'flowers',
    subcat: 'orchids',
    rating: 4.9,
    reviewsCount: 750,
    earliestDelivery: 'Today',
    deliveryDays: 0,
    img: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600&auto=format&fit=crop',
    occasion: ['anniversary', 'congratulations'],
    recipient: ['her', 'parents', 'couples'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Glass Vase Display',
        variants: [
          { label: '8 Fresh Stems', price: 949, original: 1299, stock: 30 },
          { label: '16 Fresh Stems', price: 1599, original: 2199, stock: 15 }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Radiant Golden Sunflower Symphony Hatbox',
    emoji: '🌻',
    tag: 'Exclusive',
    cat: 'flowers',
    subcat: 'sunflowers',
    rating: 4.8,
    reviewsCount: 620,
    earliestDelivery: 'Today',
    deliveryDays: 0,
    img: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'congratulations'],
    recipient: ['her', 'him', 'parents'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Luxe Parisian Box',
        variants: [
          { label: 'Standard Hatbox', price: 1199, original: 1599, stock: 25 },
          { label: 'Deluxe Hatbox', price: 1799, original: 2399, stock: 10 }
        ]
      }
    ]
  },

  // --- PERSONALISED GIFTS ---
  {
    id: 6,
    name: 'Love Forever Solid Custom Wood Frame',
    emoji: '🖼️',
    tag: 'Top Pick',
    cat: 'personalized',
    subcat: 'frames',
    rating: 4.9,
    reviewsCount: 1650,
    earliestDelivery: '11 - Sep',
    deliveryDays: 2,
    img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop',
    occasion: ['anniversary', 'love', 'birthday'],
    recipient: ['couples', 'her', 'him'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Hand-Carved Pine Wood',
        variants: [
          { label: '8x6 Inch Keepsake', price: 949, original: 1499, stock: 45 },
          { label: '12x8 Inch Large Plaque', price: 1399, original: 1999, stock: 25 }
        ]
      }
    ]
  },
  {
    id: 7,
    name: 'Personalised Photo Frame For Her',
    emoji: '🖼️',
    tag: 'Personalized',
    cat: 'personalized',
    subcat: 'frames',
    rating: 4.8,
    reviewsCount: 1120,
    earliestDelivery: '11 - Sep',
    deliveryDays: 2,
    img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'anniversary'],
    recipient: ['her'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Acrylic Triple Arc',
        variants: [
          { label: '3-Photo Tiered Stand', price: 949, original: 1399, stock: 40 }
        ]
      }
    ]
  },
  {
    id: 8,
    name: 'Customized Large Capacity Handled Tumbler',
    emoji: '🥤',
    tag: 'Trending Now',
    cat: 'personalized',
    subcat: 'drinkware',
    rating: 4.9,
    reviewsCount: 840,
    earliestDelivery: '11 - Sep',
    deliveryDays: 2,
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'congratulations'],
    recipient: ['him', 'her'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Insulated 40oz Steel',
        variants: [
          { label: 'Laser Engraved Matte Black', price: 1449, original: 2199, stock: 35 },
          { label: 'Pastel Blush Powder Coat', price: 1449, original: 2199, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 9,
    name: 'Personalized Photo LED Acrylic Lamp',
    emoji: '💡',
    tag: 'Best Seller',
    cat: 'personalized',
    subcat: 'lamps',
    rating: 4.9,
    reviewsCount: 1890,
    earliestDelivery: '11 - Sep',
    deliveryDays: 2,
    img: 'https://images.unsplash.com/photo-1517999186909-30554816b412?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'anniversary', 'love'],
    recipient: ['couples', 'her', 'him'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Warm Glow Wooden Base',
        variants: [
          { label: 'Single Portrait Acrylic', price: 799, original: 1299, stock: 60 },
          { label: 'Multi-Photo Collage + Clock', price: 1199, original: 1899, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 10,
    name: 'Custom Engraved Luxury Men Watch & Cufflinks Set',
    emoji: '⌚',
    tag: 'Couture',
    cat: 'personalized',
    subcat: 'accessories',
    rating: 4.9,
    reviewsCount: 540,
    earliestDelivery: '11 - Sep',
    deliveryDays: 2,
    img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'anniversary'],
    recipient: ['him'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Executive Edition',
        variants: [
          { label: 'Engraved Leather Strap Watch', price: 2999, original: 4500, stock: 20 },
          { label: 'Watch + Personalized Cufflinks Box', price: 3799, original: 5500, stock: 15 }
        ]
      }
    ]
  },

  // --- CAKES ---
  {
    id: 11,
    name: 'Decadent Dutch Chocolate Truffle Cake',
    emoji: '🎂',
    tag: 'Fresh Baked',
    cat: 'cakes',
    subcat: 'chocolate',
    rating: 4.9,
    reviewsCount: 2150,
    earliestDelivery: 'Today',
    deliveryDays: 0,
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'anniversary'],
    recipient: ['him', 'her', 'kids', 'parents', 'couples'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Eggless Artisan Cake',
        variants: [
          { label: '0.5 Kg (Pure Belgian Cocoa)', price: 549, original: 799, stock: 50 },
          { label: '1.0 Kg Celebration Size', price: 999, original: 1399, stock: 35 }
        ]
      }
    ]
  },
  {
    id: 12,
    name: 'Velveteen Red Romance Heart Cake',
    emoji: '🍰',
    tag: 'Love Special',
    cat: 'cakes',
    subcat: 'romantic',
    rating: 4.9,
    reviewsCount: 1320,
    earliestDelivery: 'Today',
    deliveryDays: 0,
    img: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop',
    occasion: ['anniversary', 'love', 'birthday'],
    recipient: ['her', 'couples'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Cream Cheese Frosting',
        variants: [
          { label: '0.5 Kg Heart Shape', price: 649, original: 899, stock: 40 },
          { label: '1.0 Kg Grand Heart', price: 1149, original: 1599, stock: 25 }
        ]
      }
    ]
  },
  {
    id: 13,
    name: 'Superhero Avengers Tiered Birthday Cake',
    emoji: '🦸',
    tag: 'Kids Favorite',
    cat: 'cakes',
    subcat: 'kids',
    rating: 4.8,
    reviewsCount: 940,
    earliestDelivery: 'Today',
    deliveryDays: 0,
    img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop',
    occasion: ['birthday'],
    recipient: ['kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Fondant Theme Cake',
        variants: [
          { label: '1.0 Kg Avengers Shield Design', price: 1499, original: 1999, stock: 20 },
          { label: '2.0 Kg Double Tier Superhero', price: 2699, original: 3499, stock: 10 }
        ]
      }
    ]
  },
  {
    id: 14,
    name: 'Choco-Vanilla Pinata Surprise Cake with Hammer',
    emoji: '🔨',
    tag: 'Viral Hit',
    cat: 'cakes',
    subcat: 'pinata',
    rating: 4.9,
    reviewsCount: 1180,
    earliestDelivery: 'Today',
    deliveryDays: 0,
    img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'anniversary'],
    recipient: ['him', 'her', 'kids', 'couples'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Shell with Wooden Mallet',
        variants: [
          { label: 'Spherical Pinata + Truffle Core', price: 899, original: 1299, stock: 30 }
        ]
      }
    ]
  },

  // --- BALLOON DECOR & PARTY ---
  {
    id: 15,
    name: 'Grand Metallic Gold & Silver Balloon Marquee',
    emoji: '🎈',
    tag: 'Event Styling',
    cat: 'decor',
    subcat: 'balloons',
    rating: 4.8,
    reviewsCount: 680,
    earliestDelivery: 'Today',
    deliveryDays: 0,
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'anniversary'],
    recipient: ['her', 'couples', 'kids', 'parents'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Room Setup / Table Marquee',
        variants: [
          { label: 'Tabletop Balloon Standee', price: 799, original: 1199, stock: 25 },
          { label: 'Complete Home Wall Decor Setup', price: 1999, original: 2899, stock: 15 }
        ]
      }
    ]
  },
  {
    id: 16,
    name: 'Luxury Polka Dot Gold Birthday Party Accessories Kit',
    emoji: '🎉',
    tag: 'Party Essentials',
    cat: 'decor',
    subcat: 'party',
    rating: 4.7,
    reviewsCount: 430,
    earliestDelivery: '11 - Sep',
    deliveryDays: 2,
    img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'congratulations'],
    recipient: ['kids', 'her', 'him'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Full Dinner & Prop Set',
        variants: [
          { label: 'Set of 24 Plates, Cups & Glasses', price: 649, original: 999, stock: 50 }
        ]
      }
    ]
  },

  // --- TOYS & GIFTS FOR KIDS ---
  {
    id: 17,
    name: 'Giant 3-Foot Cuddly Honey Plush Teddy Bear',
    emoji: '🧸',
    tag: 'Hug me',
    cat: 'toys',
    subcat: 'plush',
    rating: 4.9,
    reviewsCount: 1510,
    earliestDelivery: 'Today',
    deliveryDays: 0,
    img: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'love'],
    recipient: ['kids', 'her'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Hypoallergenic Velvet Plush',
        variants: [
          { label: '2.5 Foot Classic Teddy', price: 799, original: 1199, stock: 35 },
          { label: '3.5 Foot Giant Huggable Teddy', price: 1499, original: 2299, stock: 20 }
        ]
      }
    ]
  },
  {
    id: 18,
    name: 'Smart 12-in-1 Solar Powered STEM Robotic Kit',
    emoji: '🤖',
    tag: 'Educational',
    cat: 'educational',
    subcat: 'stem',
    rating: 4.9,
    reviewsCount: 780,
    earliestDelivery: '11 - Sep',
    deliveryDays: 2,
    img: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'congratulations'],
    recipient: ['kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Discovery Science Pack',
        variants: [
          { label: 'Complete 190 Pcs Building Kit', price: 1199, original: 1799, stock: 30 }
        ]
      }
    ]
  },

  // --- ELECTRONIC ITEMS ---
  {
    id: 19,
    name: 'Luxe Bluetooth High-Fidelity Portable Speaker',
    emoji: '🔊',
    tag: 'Tech Favorite',
    cat: 'electronics',
    subcat: 'audio',
    rating: 4.8,
    reviewsCount: 890,
    earliestDelivery: '11 - Sep',
    deliveryDays: 2,
    img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'anniversary'],
    recipient: ['him', 'her', 'couples'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Acoustic Wooden Mesh',
        variants: [
          { label: 'Vintage Walnut Finish', price: 1899, original: 2799, stock: 25 },
          { label: 'Midnight Jet Black', price: 1899, original: 2799, stock: 20 }
        ]
      }
    ]
  },
  {
    id: 20,
    name: 'Smart Touch Wireless Earbuds with LED Digital Display',
    emoji: '🎧',
    tag: 'Premium Gadget',
    cat: 'electronics',
    subcat: 'gadgets',
    rating: 4.7,
    reviewsCount: 650,
    earliestDelivery: '11 - Sep',
    deliveryDays: 2,
    img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'congratulations'],
    recipient: ['him', 'her'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Active Noise Cancellation',
        variants: [
          { label: 'Pro Earbuds with Case', price: 1699, original: 2499, stock: 30 }
        ]
      }
    ]
  },

  // --- HANDCRAFTED GIFTS ---
  {
    id: 21,
    name: 'Artisanal Hand-Poured Soy Wax Scented Candle Set',
    emoji: '🕯️',
    tag: 'Handcrafted',
    cat: 'handcrafted',
    subcat: 'aromatherapy',
    rating: 4.9,
    reviewsCount: 580,
    earliestDelivery: '11 - Sep',
    deliveryDays: 2,
    img: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop',
    occasion: ['anniversary', 'birthday', 'festive'],
    recipient: ['her', 'parents', 'couples'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Organic Essential Oils',
        variants: [
          { label: 'Set of 4 Botanical Scents', price: 849, original: 1299, stock: 40 }
        ]
      }
    ]
  },

  // --- SPIRITUAL GIFTS ---
  {
    id: 22,
    name: 'Blessings Lord Ganesha Hand-Cast Brass Idol',
    emoji: '🕉️',
    tag: 'Auspicious',
    cat: 'spiritual',
    subcat: 'idols',
    rating: 5.0,
    reviewsCount: 1420,
    earliestDelivery: '11 - Sep',
    deliveryDays: 2,
    img: 'https://images.unsplash.com/photo-1567591414240-e22262d94b0d?w=600&auto=format&fit=crop',
    occasion: ['festive', 'congratulations'],
    recipient: ['parents', 'couples', 'him', 'her'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Antique Brass Craft',
        variants: [
          { label: '5-Inch Sanctum Ganesha', price: 1249, original: 1899, stock: 35 },
          { label: '8-Inch Grand Temple Ganesha', price: 2199, original: 3199, stock: 15 }
        ]
      }
    ]
  },
  {
    id: 23,
    name: 'Royal Handcrafted Temple Peacock Diya Stand',
    emoji: '🪔',
    tag: 'Divine Blessings',
    cat: 'spiritual',
    subcat: 'diyas',
    rating: 4.9,
    reviewsCount: 710,
    earliestDelivery: '11 - Sep',
    deliveryDays: 2,
    img: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?w=600&auto=format&fit=crop',
    occasion: ['festive', 'congratulations'],
    recipient: ['parents', 'couples'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Solid Brass Pair',
        variants: [
          { label: 'Twin Peacock Brass Diyas', price: 999, original: 1499, stock: 25 }
        ]
      }
    ]
  },

  // --- GEN Z GIFTS ---
  {
    id: 24,
    name: 'Aesthetic Neon LED Sign Wall Ambient Art',
    emoji: '⚡',
    tag: 'GenZ Aesthetic',
    cat: 'genz',
    subcat: 'neon',
    rating: 4.8,
    reviewsCount: 920,
    earliestDelivery: '11 - Sep',
    deliveryDays: 2,
    img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop',
    occasion: ['birthday'],
    recipient: ['kids', 'her', 'him'],
    supportsPersonalization: false,
    types: [
      {
        label: 'USB Powered Neon Flex',
        variants: [
          { label: 'Warm Heart Glow Sign', price: 899, original: 1399, stock: 45 },
          { label: 'Good Vibes Aesthetic Sign', price: 1099, original: 1699, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 25,
    name: 'Retro Instant Film Camera & Film Pack Kit',
    emoji: '📷',
    tag: 'GenZ Viral',
    cat: 'genz',
    subcat: 'cameras',
    rating: 4.9,
    reviewsCount: 640,
    earliestDelivery: '11 - Sep',
    deliveryDays: 2,
    img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'anniversary'],
    recipient: ['her', 'him', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Instant Print Kit',
        variants: [
          { label: 'Pastel Lilac Camera + 10 Film Pack', price: 5499, original: 6999, stock: 12 }
        ]
      }
    ]
  },

  // --- HAMPERS & CHOCOLATES ---
  {
    id: 26,
    name: 'Golden Elegance Grand Gourmet Hamper',
    emoji: '🧺',
    tag: 'Premium Luxe',
    cat: 'hampers',
    subcat: 'gourmet',
    rating: 5.0,
    reviewsCount: 840,
    earliestDelivery: 'Today',
    deliveryDays: 0,
    img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop',
    occasion: ['anniversary', 'congratulations', 'festive'],
    recipient: ['him', 'her', 'couples', 'parents'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Woven Wicker Hamper',
        variants: [
          { label: 'Standard Gourmet Braid', price: 1499, original: 1999, stock: 35 },
          { label: 'Grand Royal Banquet Hamper', price: 2499, original: 3499, stock: 18 }
        ]
      }
    ]
  },
  {
    id: 27,
    name: 'Imported Belgian Truffles & Dark Chocolate Box',
    emoji: '🍫',
    tag: 'Imported Cocoa',
    cat: 'chocolates',
    subcat: 'truffles',
    rating: 4.9,
    reviewsCount: 612,
    earliestDelivery: 'Today',
    deliveryDays: 0,
    img: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&auto=format&fit=crop',
    occasion: ['birthday', 'congratulations', 'love'],
    recipient: ['him', 'her', 'kids', 'couples'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Gift Box Collection',
        variants: [
          { label: '9 Pcs Artisanal Assortment', price: 399, original: 550, stock: 60 },
          { label: '16 Pcs Luxury Velvet Box', price: 699, original: 950, stock: 40 }
        ]
      }
    ]
  },
  {
    id: 28,
    name: 'Indoor Zen Bonsai in Ceramic Glazed Planter',
    emoji: '🪴',
    tag: 'Eco-Friendly',
    cat: 'plants',
    subcat: 'bonsai',
    rating: 4.7,
    reviewsCount: 320,
    earliestDelivery: 'Today',
    deliveryDays: 0,
    img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop',
    occasion: ['congratulations', 'birthday'],
    recipient: ['him', 'her', 'parents'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Living Bonsai Tree',
        variants: [
          { label: '3-Year Ficus Bonsai', price: 699, original: 950, stock: 30 },
          { label: '5-Year Juniper Bonsai in Stone Pot', price: 1199, original: 1650, stock: 15 }
        ]
      }
    ]
  },
  {
    id: 29,
    name: "Velvet Crimson Rose Hatbox",
    emoji: "\ud83c\udf39",
    tag: "Handcrafted Bloom Box",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 1153,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1299, original: 1799, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1818, original: 2518, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 30,
    name: "Red Velvet Heart Cream Cheese Cake",
    emoji: "\u2764\ufe0f",
    tag: "Romantic Heart",
    cat: "cakes",
    subcat: "romantic",
    rating: 4.8,
    reviewsCount: 1190,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 799, original: 1099, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1118, original: 1538, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 31,
    name: "Laser-Engraved Luxury Chronograph Watch",
    emoji: "\u231a",
    tag: "Precision Time",
    cat: "personalized",
    subcat: "watches",
    rating: 4.7,
    reviewsCount: 1227,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1999, original: 2999, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2798, original: 4198, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 32,
    name: "Smart Wireless Charging Desk Lamp with Speaker",
    emoji: "\ud83d\udcf1",
    tag: "Smart Home",
    cat: "hampers",
    subcat: "gadgets",
    rating: 4.6,
    reviewsCount: 1264,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1899, original: 2699, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2658, original: 3778, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 33,
    name: "Sun-Kissed Golden Meadow Sunflowers",
    emoji: "\ud83c\udf3b",
    tag: "Bright Sunshine",
    cat: "flowers",
    subcat: "sunflowers",
    rating: 4.9,
    reviewsCount: 1301,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 899, original: 1299, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1258, original: 1818, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 34,
    name: "Butterscotch Praline Caramel Crunch Cake",
    emoji: "\ud83c\udf6f",
    tag: "Caramel Crunch",
    cat: "cakes",
    subcat: "butterscotch",
    rating: 4.8,
    reviewsCount: 1338,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 649, original: 899, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 908, original: 1258, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 35,
    name: "Monogrammed Brass & Leather Keychain Set",
    emoji: "\ud83d\udd11",
    tag: "Genuine Leather",
    cat: "personalized",
    subcat: "keychains",
    rating: 4.7,
    reviewsCount: 1375,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 499, original: 799, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 698, original: 1118, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 36,
    name: "Dry Fruits & Roasted Nuts Regal Wooden Casket",
    emoji: "\ud83c\udf30",
    tag: "Healthy Royale",
    cat: "hampers",
    subcat: "gourmet",
    rating: 4.6,
    reviewsCount: 1412,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1699, original: 2399, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2378, original: 3358, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 37,
    name: "Classic 100 Red Roses Heart Arrangement",
    emoji: "\u2764\ufe0f",
    tag: "Grand Romance",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 1449,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 3499, original: 4599, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 4898, original: 6438, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 38,
    name: "Lotus Biscoff Speculoos Cheesecake",
    emoji: "\ud83c\udf6a",
    tag: "Biscoff Caramel",
    cat: "cakes",
    subcat: "cheesecake",
    rating: 4.8,
    reviewsCount: 1486,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1199, original: 1699, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1678, original: 2378, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 39,
    name: "Personalised Engraved Parker Pen & Diary Set",
    emoji: "\u2712\ufe0f",
    tag: "Executive Luxe",
    cat: "personalized",
    subcat: "keepsakes",
    rating: 4.7,
    reviewsCount: 1523,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 849, original: 1249, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1188, original: 1748, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 40,
    name: "Luxury Soy Wax Scented Candle Trio in Gift Box",
    emoji: "\ud83d\udd6f\ufe0f",
    tag: "Ambient Glow",
    cat: "hampers",
    subcat: "fragrance",
    rating: 4.6,
    reviewsCount: 1560,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 899, original: 1299, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1258, original: 1818, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 41,
    name: "Boutique Velvet Crimson Rose Hatbox",
    emoji: "\ud83c\udf39",
    tag: "Handcrafted Bloom Box",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 1597,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1363, original: 1888, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1908, original: 2643, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 42,
    name: "Boutique Red Velvet Heart Cream Cheese Cake",
    emoji: "\u2764\ufe0f",
    tag: "Romantic Heart",
    cat: "cakes",
    subcat: "romantic",
    rating: 4.8,
    reviewsCount: 1634,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 838, original: 1153, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1173, original: 1614, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 43,
    name: "Boutique Laser-Engraved Luxury Chronograph Watch",
    emoji: "\u231a",
    tag: "Precision Time",
    cat: "personalized",
    subcat: "watches",
    rating: 4.7,
    reviewsCount: 1671,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2098, original: 3148, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2937, original: 4407, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 44,
    name: "Boutique Smart Wireless Charging Desk Lamp with Speaker",
    emoji: "\ud83d\udcf1",
    tag: "Smart Home",
    cat: "hampers",
    subcat: "gadgets",
    rating: 4.6,
    reviewsCount: 1708,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1993, original: 2833, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2790, original: 3966, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 45,
    name: "Boutique Sun-Kissed Golden Meadow Sunflowers",
    emoji: "\ud83c\udf3b",
    tag: "Bright Sunshine",
    cat: "flowers",
    subcat: "sunflowers",
    rating: 4.9,
    reviewsCount: 1745,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 943, original: 1363, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1320, original: 1908, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 46,
    name: "Boutique Butterscotch Praline Caramel Crunch Cake",
    emoji: "\ud83c\udf6f",
    tag: "Caramel Crunch",
    cat: "cakes",
    subcat: "butterscotch",
    rating: 4.8,
    reviewsCount: 1782,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 681, original: 943, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 953, original: 1320, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 47,
    name: "Boutique Monogrammed Brass & Leather Keychain Set",
    emoji: "\ud83d\udd11",
    tag: "Genuine Leather",
    cat: "personalized",
    subcat: "keychains",
    rating: 4.7,
    reviewsCount: 1819,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 523, original: 838, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 732, original: 1173, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 48,
    name: "Boutique Dry Fruits & Roasted Nuts Regal Wooden Casket",
    emoji: "\ud83c\udf30",
    tag: "Healthy Royale",
    cat: "hampers",
    subcat: "gourmet",
    rating: 4.6,
    reviewsCount: 1856,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1783, original: 2518, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2496, original: 3525, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 49,
    name: "Boutique Classic 100 Red Roses Heart Arrangement",
    emoji: "\u2764\ufe0f",
    tag: "Grand Romance",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 93,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 3673, original: 4828, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 5142, original: 6759, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 50,
    name: "Boutique Lotus Biscoff Speculoos Cheesecake",
    emoji: "\ud83c\udf6a",
    tag: "Biscoff Caramel",
    cat: "cakes",
    subcat: "cheesecake",
    rating: 4.8,
    reviewsCount: 130,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1258, original: 1783, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1761, original: 2496, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 51,
    name: "Boutique Personalised Engraved Parker Pen & Diary Set",
    emoji: "\u2712\ufe0f",
    tag: "Executive Luxe",
    cat: "personalized",
    subcat: "keepsakes",
    rating: 4.7,
    reviewsCount: 167,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 891, original: 1311, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1247, original: 1835, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 52,
    name: "Boutique Luxury Soy Wax Scented Candle Trio in Gift Box",
    emoji: "\ud83d\udd6f\ufe0f",
    tag: "Ambient Glow",
    cat: "hampers",
    subcat: "fragrance",
    rating: 4.6,
    reviewsCount: 204,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 943, original: 1363, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1320, original: 1908, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 53,
    name: "Supreme Velvet Crimson Rose Hatbox",
    emoji: "\ud83c\udf39",
    tag: "Handcrafted Bloom Box",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 241,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1428, original: 1978, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1999, original: 2769, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 54,
    name: "Supreme Red Velvet Heart Cream Cheese Cake",
    emoji: "\u2764\ufe0f",
    tag: "Romantic Heart",
    cat: "cakes",
    subcat: "romantic",
    rating: 4.8,
    reviewsCount: 278,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 878, original: 1208, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1229, original: 1691, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 55,
    name: "Supreme Laser-Engraved Luxury Chronograph Watch",
    emoji: "\u231a",
    tag: "Precision Time",
    cat: "personalized",
    subcat: "watches",
    rating: 4.7,
    reviewsCount: 315,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2198, original: 3298, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3077, original: 4617, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 56,
    name: "Supreme Smart Wireless Charging Desk Lamp with Speaker",
    emoji: "\ud83d\udcf1",
    tag: "Smart Home",
    cat: "hampers",
    subcat: "gadgets",
    rating: 4.6,
    reviewsCount: 352,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2088, original: 2968, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2923, original: 4155, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 57,
    name: "Supreme Sun-Kissed Golden Meadow Sunflowers",
    emoji: "\ud83c\udf3b",
    tag: "Bright Sunshine",
    cat: "flowers",
    subcat: "sunflowers",
    rating: 4.9,
    reviewsCount: 389,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 988, original: 1428, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1383, original: 1999, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 58,
    name: "Supreme Butterscotch Praline Caramel Crunch Cake",
    emoji: "\ud83c\udf6f",
    tag: "Caramel Crunch",
    cat: "cakes",
    subcat: "butterscotch",
    rating: 4.8,
    reviewsCount: 426,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 713, original: 988, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 998, original: 1383, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 59,
    name: "Supreme Monogrammed Brass & Leather Keychain Set",
    emoji: "\ud83d\udd11",
    tag: "Genuine Leather",
    cat: "personalized",
    subcat: "keychains",
    rating: 4.7,
    reviewsCount: 463,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 548, original: 878, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 767, original: 1229, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 60,
    name: "Supreme Dry Fruits & Roasted Nuts Regal Wooden Casket",
    emoji: "\ud83c\udf30",
    tag: "Healthy Royale",
    cat: "hampers",
    subcat: "gourmet",
    rating: 4.6,
    reviewsCount: 500,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1868, original: 2638, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2615, original: 3693, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 61,
    name: "Supreme Classic 100 Red Roses Heart Arrangement",
    emoji: "\u2764\ufe0f",
    tag: "Grand Romance",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 537,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 3848, original: 5058, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 5387, original: 7081, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 62,
    name: "Supreme Lotus Biscoff Speculoos Cheesecake",
    emoji: "\ud83c\udf6a",
    tag: "Biscoff Caramel",
    cat: "cakes",
    subcat: "cheesecake",
    rating: 4.8,
    reviewsCount: 574,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1318, original: 1868, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1845, original: 2615, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 63,
    name: "Supreme Personalised Engraved Parker Pen & Diary Set",
    emoji: "\u2712\ufe0f",
    tag: "Executive Luxe",
    cat: "personalized",
    subcat: "keepsakes",
    rating: 4.7,
    reviewsCount: 611,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 933, original: 1373, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1306, original: 1922, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 64,
    name: "Supreme Luxury Soy Wax Scented Candle Trio in Gift Box",
    emoji: "\ud83d\udd6f\ufe0f",
    tag: "Ambient Glow",
    cat: "hampers",
    subcat: "fragrance",
    rating: 4.6,
    reviewsCount: 648,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 988, original: 1428, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1383, original: 1999, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 65,
    name: "Artisan Velvet Crimson Rose Hatbox",
    emoji: "\ud83c\udf39",
    tag: "Handcrafted Bloom Box",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 685,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1493, original: 2068, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2090, original: 2895, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 66,
    name: "Artisan Red Velvet Heart Cream Cheese Cake",
    emoji: "\u2764\ufe0f",
    tag: "Romantic Heart",
    cat: "cakes",
    subcat: "romantic",
    rating: 4.8,
    reviewsCount: 722,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 918, original: 1263, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1285, original: 1768, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 67,
    name: "Artisan Laser-Engraved Luxury Chronograph Watch",
    emoji: "\u231a",
    tag: "Precision Time",
    cat: "personalized",
    subcat: "watches",
    rating: 4.7,
    reviewsCount: 759,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2298, original: 3448, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3217, original: 4827, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 68,
    name: "Artisan Smart Wireless Charging Desk Lamp with Speaker",
    emoji: "\ud83d\udcf1",
    tag: "Smart Home",
    cat: "hampers",
    subcat: "gadgets",
    rating: 4.6,
    reviewsCount: 796,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2183, original: 3103, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3056, original: 4344, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 69,
    name: "Artisan Sun-Kissed Golden Meadow Sunflowers",
    emoji: "\ud83c\udf3b",
    tag: "Bright Sunshine",
    cat: "flowers",
    subcat: "sunflowers",
    rating: 4.9,
    reviewsCount: 833,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1033, original: 1493, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1446, original: 2090, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 70,
    name: "Artisan Butterscotch Praline Caramel Crunch Cake",
    emoji: "\ud83c\udf6f",
    tag: "Caramel Crunch",
    cat: "cakes",
    subcat: "butterscotch",
    rating: 4.8,
    reviewsCount: 870,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 746, original: 1033, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1044, original: 1446, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 71,
    name: "Artisan Monogrammed Brass & Leather Keychain Set",
    emoji: "\ud83d\udd11",
    tag: "Genuine Leather",
    cat: "personalized",
    subcat: "keychains",
    rating: 4.7,
    reviewsCount: 907,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 573, original: 918, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 802, original: 1285, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 72,
    name: "Artisan Dry Fruits & Roasted Nuts Regal Wooden Casket",
    emoji: "\ud83c\udf30",
    tag: "Healthy Royale",
    cat: "hampers",
    subcat: "gourmet",
    rating: 4.6,
    reviewsCount: 944,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1953, original: 2758, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2734, original: 3861, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 73,
    name: "Artisan Classic 100 Red Roses Heart Arrangement",
    emoji: "\u2764\ufe0f",
    tag: "Grand Romance",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 981,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 4023, original: 5288, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 5632, original: 7403, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 74,
    name: "Artisan Lotus Biscoff Speculoos Cheesecake",
    emoji: "\ud83c\udf6a",
    tag: "Biscoff Caramel",
    cat: "cakes",
    subcat: "cheesecake",
    rating: 4.8,
    reviewsCount: 1018,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1378, original: 1953, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1929, original: 2734, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 75,
    name: "Artisan Personalised Engraved Parker Pen & Diary Set",
    emoji: "\u2712\ufe0f",
    tag: "Executive Luxe",
    cat: "personalized",
    subcat: "keepsakes",
    rating: 4.7,
    reviewsCount: 1055,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 976, original: 1436, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1366, original: 2010, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 76,
    name: "Artisan Luxury Soy Wax Scented Candle Trio in Gift Box",
    emoji: "\ud83d\udd6f\ufe0f",
    tag: "Ambient Glow",
    cat: "hampers",
    subcat: "fragrance",
    rating: 4.6,
    reviewsCount: 1092,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1033, original: 1493, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1446, original: 2090, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 77,
    name: "Deluxe Velvet Crimson Rose Hatbox",
    emoji: "\ud83c\udf39",
    tag: "Handcrafted Bloom Box",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 1129,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1558, original: 2158, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2181, original: 3021, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 78,
    name: "Deluxe Red Velvet Heart Cream Cheese Cake",
    emoji: "\u2764\ufe0f",
    tag: "Romantic Heart",
    cat: "cakes",
    subcat: "romantic",
    rating: 4.8,
    reviewsCount: 1166,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 958, original: 1318, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1341, original: 1845, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 79,
    name: "Deluxe Laser-Engraved Luxury Chronograph Watch",
    emoji: "\u231a",
    tag: "Precision Time",
    cat: "personalized",
    subcat: "watches",
    rating: 4.7,
    reviewsCount: 1203,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2398, original: 3598, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3357, original: 5037, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 80,
    name: "Deluxe Smart Wireless Charging Desk Lamp with Speaker",
    emoji: "\ud83d\udcf1",
    tag: "Smart Home",
    cat: "hampers",
    subcat: "gadgets",
    rating: 4.6,
    reviewsCount: 1240,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2278, original: 3238, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3189, original: 4533, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 81,
    name: "Deluxe Sun-Kissed Golden Meadow Sunflowers",
    emoji: "\ud83c\udf3b",
    tag: "Bright Sunshine",
    cat: "flowers",
    subcat: "sunflowers",
    rating: 4.9,
    reviewsCount: 1277,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1078, original: 1558, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1509, original: 2181, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 82,
    name: "Deluxe Butterscotch Praline Caramel Crunch Cake",
    emoji: "\ud83c\udf6f",
    tag: "Caramel Crunch",
    cat: "cakes",
    subcat: "butterscotch",
    rating: 4.8,
    reviewsCount: 1314,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 778, original: 1078, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1089, original: 1509, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 83,
    name: "Deluxe Monogrammed Brass & Leather Keychain Set",
    emoji: "\ud83d\udd11",
    tag: "Genuine Leather",
    cat: "personalized",
    subcat: "keychains",
    rating: 4.7,
    reviewsCount: 1351,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 598, original: 958, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 837, original: 1341, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 84,
    name: "Deluxe Dry Fruits & Roasted Nuts Regal Wooden Casket",
    emoji: "\ud83c\udf30",
    tag: "Healthy Royale",
    cat: "hampers",
    subcat: "gourmet",
    rating: 4.6,
    reviewsCount: 1388,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2038, original: 2878, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2853, original: 4029, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 85,
    name: "Deluxe Classic 100 Red Roses Heart Arrangement",
    emoji: "\u2764\ufe0f",
    tag: "Grand Romance",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 1425,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 4198, original: 5518, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 5877, original: 7725, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 86,
    name: "Deluxe Lotus Biscoff Speculoos Cheesecake",
    emoji: "\ud83c\udf6a",
    tag: "Biscoff Caramel",
    cat: "cakes",
    subcat: "cheesecake",
    rating: 4.8,
    reviewsCount: 1462,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1438, original: 2038, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2013, original: 2853, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 87,
    name: "Deluxe Personalised Engraved Parker Pen & Diary Set",
    emoji: "\u2712\ufe0f",
    tag: "Executive Luxe",
    cat: "personalized",
    subcat: "keepsakes",
    rating: 4.7,
    reviewsCount: 1499,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1018, original: 1498, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1425, original: 2097, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 88,
    name: "Deluxe Luxury Soy Wax Scented Candle Trio in Gift Box",
    emoji: "\ud83d\udd6f\ufe0f",
    tag: "Ambient Glow",
    cat: "hampers",
    subcat: "fragrance",
    rating: 4.6,
    reviewsCount: 1536,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1078, original: 1558, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1509, original: 2181, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 89,
    name: "Exquisite Velvet Crimson Rose Hatbox",
    emoji: "\ud83c\udf39",
    tag: "Handcrafted Bloom Box",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 1573,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1623, original: 2248, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2272, original: 3147, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 90,
    name: "Exquisite Red Velvet Heart Cream Cheese Cake",
    emoji: "\u2764\ufe0f",
    tag: "Romantic Heart",
    cat: "cakes",
    subcat: "romantic",
    rating: 4.8,
    reviewsCount: 1610,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 998, original: 1373, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1397, original: 1922, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 91,
    name: "Exquisite Laser-Engraved Luxury Chronograph Watch",
    emoji: "\u231a",
    tag: "Precision Time",
    cat: "personalized",
    subcat: "watches",
    rating: 4.7,
    reviewsCount: 1647,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2498, original: 3748, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3497, original: 5247, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 92,
    name: "Exquisite Smart Wireless Charging Desk Lamp with Speaker",
    emoji: "\ud83d\udcf1",
    tag: "Smart Home",
    cat: "hampers",
    subcat: "gadgets",
    rating: 4.6,
    reviewsCount: 1684,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2373, original: 3373, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3322, original: 4722, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 93,
    name: "Exquisite Sun-Kissed Golden Meadow Sunflowers",
    emoji: "\ud83c\udf3b",
    tag: "Bright Sunshine",
    cat: "flowers",
    subcat: "sunflowers",
    rating: 4.9,
    reviewsCount: 1721,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1123, original: 1623, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1572, original: 2272, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 94,
    name: "Exquisite Butterscotch Praline Caramel Crunch Cake",
    emoji: "\ud83c\udf6f",
    tag: "Caramel Crunch",
    cat: "cakes",
    subcat: "butterscotch",
    rating: 4.8,
    reviewsCount: 1758,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 811, original: 1123, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1135, original: 1572, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 95,
    name: "Exquisite Monogrammed Brass & Leather Keychain Set",
    emoji: "\ud83d\udd11",
    tag: "Genuine Leather",
    cat: "personalized",
    subcat: "keychains",
    rating: 4.7,
    reviewsCount: 1795,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 623, original: 998, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 872, original: 1397, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 96,
    name: "Exquisite Dry Fruits & Roasted Nuts Regal Wooden Casket",
    emoji: "\ud83c\udf30",
    tag: "Healthy Royale",
    cat: "hampers",
    subcat: "gourmet",
    rating: 4.6,
    reviewsCount: 1832,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2123, original: 2998, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2972, original: 4197, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 97,
    name: "Exquisite Classic 100 Red Roses Heart Arrangement",
    emoji: "\u2764\ufe0f",
    tag: "Grand Romance",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 1869,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 4373, original: 5748, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 6122, original: 8047, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 98,
    name: "Exquisite Lotus Biscoff Speculoos Cheesecake",
    emoji: "\ud83c\udf6a",
    tag: "Biscoff Caramel",
    cat: "cakes",
    subcat: "cheesecake",
    rating: 4.8,
    reviewsCount: 106,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1498, original: 2123, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2097, original: 2972, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 99,
    name: "Exquisite Personalised Engraved Parker Pen & Diary Set",
    emoji: "\u2712\ufe0f",
    tag: "Executive Luxe",
    cat: "personalized",
    subcat: "keepsakes",
    rating: 4.7,
    reviewsCount: 143,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1061, original: 1561, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1485, original: 2185, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 100,
    name: "Exquisite Luxury Soy Wax Scented Candle Trio in Gift Box",
    emoji: "\ud83d\udd6f\ufe0f",
    tag: "Ambient Glow",
    cat: "hampers",
    subcat: "fragrance",
    rating: 4.6,
    reviewsCount: 180,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1123, original: 1623, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1572, original: 2272, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 101,
    name: "Prestige Velvet Crimson Rose Hatbox",
    emoji: "\ud83c\udf39",
    tag: "Handcrafted Bloom Box",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 217,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1688, original: 2338, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2363, original: 3273, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 102,
    name: "Prestige Red Velvet Heart Cream Cheese Cake",
    emoji: "\u2764\ufe0f",
    tag: "Romantic Heart",
    cat: "cakes",
    subcat: "romantic",
    rating: 4.8,
    reviewsCount: 254,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1038, original: 1428, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1453, original: 1999, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 103,
    name: "Prestige Laser-Engraved Luxury Chronograph Watch",
    emoji: "\u231a",
    tag: "Precision Time",
    cat: "personalized",
    subcat: "watches",
    rating: 4.7,
    reviewsCount: 291,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2598, original: 3898, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3637, original: 5457, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 104,
    name: "Prestige Smart Wireless Charging Desk Lamp with Speaker",
    emoji: "\ud83d\udcf1",
    tag: "Smart Home",
    cat: "hampers",
    subcat: "gadgets",
    rating: 4.6,
    reviewsCount: 328,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2468, original: 3508, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3455, original: 4911, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 105,
    name: "Prestige Sun-Kissed Golden Meadow Sunflowers",
    emoji: "\ud83c\udf3b",
    tag: "Bright Sunshine",
    cat: "flowers",
    subcat: "sunflowers",
    rating: 4.9,
    reviewsCount: 365,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1168, original: 1688, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1635, original: 2363, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 106,
    name: "Prestige Butterscotch Praline Caramel Crunch Cake",
    emoji: "\ud83c\udf6f",
    tag: "Caramel Crunch",
    cat: "cakes",
    subcat: "butterscotch",
    rating: 4.8,
    reviewsCount: 402,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 843, original: 1168, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1180, original: 1635, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 107,
    name: "Prestige Monogrammed Brass & Leather Keychain Set",
    emoji: "\ud83d\udd11",
    tag: "Genuine Leather",
    cat: "personalized",
    subcat: "keychains",
    rating: 4.7,
    reviewsCount: 439,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 648, original: 1038, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 907, original: 1453, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 108,
    name: "Prestige Dry Fruits & Roasted Nuts Regal Wooden Casket",
    emoji: "\ud83c\udf30",
    tag: "Healthy Royale",
    cat: "hampers",
    subcat: "gourmet",
    rating: 4.6,
    reviewsCount: 476,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2208, original: 3118, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3091, original: 4365, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 109,
    name: "Prestige Classic 100 Red Roses Heart Arrangement",
    emoji: "\u2764\ufe0f",
    tag: "Grand Romance",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 513,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 4548, original: 5978, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 6367, original: 8369, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 110,
    name: "Prestige Lotus Biscoff Speculoos Cheesecake",
    emoji: "\ud83c\udf6a",
    tag: "Biscoff Caramel",
    cat: "cakes",
    subcat: "cheesecake",
    rating: 4.8,
    reviewsCount: 550,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1558, original: 2208, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2181, original: 3091, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 111,
    name: "Prestige Personalised Engraved Parker Pen & Diary Set",
    emoji: "\u2712\ufe0f",
    tag: "Executive Luxe",
    cat: "personalized",
    subcat: "keepsakes",
    rating: 4.7,
    reviewsCount: 587,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1103, original: 1623, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1544, original: 2272, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 112,
    name: "Prestige Luxury Soy Wax Scented Candle Trio in Gift Box",
    emoji: "\ud83d\udd6f\ufe0f",
    tag: "Ambient Glow",
    cat: "hampers",
    subcat: "fragrance",
    rating: 4.6,
    reviewsCount: 624,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1168, original: 1688, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1635, original: 2363, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 113,
    name: "Classic Velvet Crimson Rose Hatbox",
    emoji: "\ud83c\udf39",
    tag: "Handcrafted Bloom Box",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 661,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1753, original: 2428, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2454, original: 3399, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 114,
    name: "Classic Red Velvet Heart Cream Cheese Cake",
    emoji: "\u2764\ufe0f",
    tag: "Romantic Heart",
    cat: "cakes",
    subcat: "romantic",
    rating: 4.8,
    reviewsCount: 698,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1078, original: 1483, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1509, original: 2076, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 115,
    name: "Classic Laser-Engraved Luxury Chronograph Watch",
    emoji: "\u231a",
    tag: "Precision Time",
    cat: "personalized",
    subcat: "watches",
    rating: 4.7,
    reviewsCount: 735,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2698, original: 4048, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3777, original: 5667, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 116,
    name: "Classic Smart Wireless Charging Desk Lamp with Speaker",
    emoji: "\ud83d\udcf1",
    tag: "Smart Home",
    cat: "hampers",
    subcat: "gadgets",
    rating: 4.6,
    reviewsCount: 772,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2563, original: 3643, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3588, original: 5100, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 117,
    name: "Classic Sun-Kissed Golden Meadow Sunflowers",
    emoji: "\ud83c\udf3b",
    tag: "Bright Sunshine",
    cat: "flowers",
    subcat: "sunflowers",
    rating: 4.9,
    reviewsCount: 809,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1213, original: 1753, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1698, original: 2454, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 118,
    name: "Classic Butterscotch Praline Caramel Crunch Cake",
    emoji: "\ud83c\udf6f",
    tag: "Caramel Crunch",
    cat: "cakes",
    subcat: "butterscotch",
    rating: 4.8,
    reviewsCount: 846,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 876, original: 1213, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1226, original: 1698, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 119,
    name: "Classic Monogrammed Brass & Leather Keychain Set",
    emoji: "\ud83d\udd11",
    tag: "Genuine Leather",
    cat: "personalized",
    subcat: "keychains",
    rating: 4.7,
    reviewsCount: 883,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 673, original: 1078, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 942, original: 1509, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 120,
    name: "Classic Dry Fruits & Roasted Nuts Regal Wooden Casket",
    emoji: "\ud83c\udf30",
    tag: "Healthy Royale",
    cat: "hampers",
    subcat: "gourmet",
    rating: 4.6,
    reviewsCount: 920,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2293, original: 3238, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3210, original: 4533, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 121,
    name: "Classic Classic 100 Red Roses Heart Arrangement",
    emoji: "\u2764\ufe0f",
    tag: "Grand Romance",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 957,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 4723, original: 6208, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 6612, original: 8691, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 122,
    name: "Classic Lotus Biscoff Speculoos Cheesecake",
    emoji: "\ud83c\udf6a",
    tag: "Biscoff Caramel",
    cat: "cakes",
    subcat: "cheesecake",
    rating: 4.8,
    reviewsCount: 994,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1618, original: 2293, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2265, original: 3210, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 123,
    name: "Classic Personalised Engraved Parker Pen & Diary Set",
    emoji: "\u2712\ufe0f",
    tag: "Executive Luxe",
    cat: "personalized",
    subcat: "keepsakes",
    rating: 4.7,
    reviewsCount: 1031,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1146, original: 1686, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1604, original: 2360, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 124,
    name: "Classic Luxury Soy Wax Scented Candle Trio in Gift Box",
    emoji: "\ud83d\udd6f\ufe0f",
    tag: "Ambient Glow",
    cat: "hampers",
    subcat: "fragrance",
    rating: 4.6,
    reviewsCount: 1068,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1213, original: 1753, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1698, original: 2454, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 125,
    name: "Signature Velvet Crimson Rose Hatbox",
    emoji: "\ud83c\udf39",
    tag: "Handcrafted Bloom Box",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 1105,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1818, original: 2518, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2545, original: 3525, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 126,
    name: "Signature Red Velvet Heart Cream Cheese Cake",
    emoji: "\u2764\ufe0f",
    tag: "Romantic Heart",
    cat: "cakes",
    subcat: "romantic",
    rating: 4.8,
    reviewsCount: 1142,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1118, original: 1538, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1565, original: 2153, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 127,
    name: "Signature Laser-Engraved Luxury Chronograph Watch",
    emoji: "\u231a",
    tag: "Precision Time",
    cat: "personalized",
    subcat: "watches",
    rating: 4.7,
    reviewsCount: 1179,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2798, original: 4198, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3917, original: 5877, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 128,
    name: "Signature Smart Wireless Charging Desk Lamp with Speaker",
    emoji: "\ud83d\udcf1",
    tag: "Smart Home",
    cat: "hampers",
    subcat: "gadgets",
    rating: 4.6,
    reviewsCount: 1216,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2658, original: 3778, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3721, original: 5289, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 129,
    name: "Signature Sun-Kissed Golden Meadow Sunflowers",
    emoji: "\ud83c\udf3b",
    tag: "Bright Sunshine",
    cat: "flowers",
    subcat: "sunflowers",
    rating: 4.9,
    reviewsCount: 1253,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1258, original: 1818, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1761, original: 2545, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 130,
    name: "Signature Butterscotch Praline Caramel Crunch Cake",
    emoji: "\ud83c\udf6f",
    tag: "Caramel Crunch",
    cat: "cakes",
    subcat: "butterscotch",
    rating: 4.8,
    reviewsCount: 1290,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 908, original: 1258, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1271, original: 1761, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 131,
    name: "Signature Monogrammed Brass & Leather Keychain Set",
    emoji: "\ud83d\udd11",
    tag: "Genuine Leather",
    cat: "personalized",
    subcat: "keychains",
    rating: 4.7,
    reviewsCount: 1327,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 698, original: 1118, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 977, original: 1565, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 132,
    name: "Signature Dry Fruits & Roasted Nuts Regal Wooden Casket",
    emoji: "\ud83c\udf30",
    tag: "Healthy Royale",
    cat: "hampers",
    subcat: "gourmet",
    rating: 4.6,
    reviewsCount: 1364,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2378, original: 3358, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3329, original: 4701, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 133,
    name: "Signature Classic 100 Red Roses Heart Arrangement",
    emoji: "\u2764\ufe0f",
    tag: "Grand Romance",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 1401,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 4898, original: 6438, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 6857, original: 9013, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 134,
    name: "Signature Lotus Biscoff Speculoos Cheesecake",
    emoji: "\ud83c\udf6a",
    tag: "Biscoff Caramel",
    cat: "cakes",
    subcat: "cheesecake",
    rating: 4.8,
    reviewsCount: 1438,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1678, original: 2378, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2349, original: 3329, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 135,
    name: "Signature Personalised Engraved Parker Pen & Diary Set",
    emoji: "\u2712\ufe0f",
    tag: "Executive Luxe",
    cat: "personalized",
    subcat: "keepsakes",
    rating: 4.7,
    reviewsCount: 1475,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1188, original: 1748, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1663, original: 2447, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 136,
    name: "Signature Luxury Soy Wax Scented Candle Trio in Gift Box",
    emoji: "\ud83d\udd6f\ufe0f",
    tag: "Ambient Glow",
    cat: "hampers",
    subcat: "fragrance",
    rating: 4.6,
    reviewsCount: 1512,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1258, original: 1818, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1761, original: 2545, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 137,
    name: "Boutique Velvet Crimson Rose Hatbox",
    emoji: "\ud83c\udf39",
    tag: "Handcrafted Bloom Box",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 1549,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1883, original: 2608, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2636, original: 3651, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 138,
    name: "Boutique Red Velvet Heart Cream Cheese Cake",
    emoji: "\u2764\ufe0f",
    tag: "Romantic Heart",
    cat: "cakes",
    subcat: "romantic",
    rating: 4.8,
    reviewsCount: 1586,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1158, original: 1593, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1621, original: 2230, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 139,
    name: "Boutique Laser-Engraved Luxury Chronograph Watch",
    emoji: "\u231a",
    tag: "Precision Time",
    cat: "personalized",
    subcat: "watches",
    rating: 4.7,
    reviewsCount: 1623,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2898, original: 4348, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 4057, original: 6087, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 140,
    name: "Boutique Smart Wireless Charging Desk Lamp with Speaker",
    emoji: "\ud83d\udcf1",
    tag: "Smart Home",
    cat: "hampers",
    subcat: "gadgets",
    rating: 4.6,
    reviewsCount: 1660,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2753, original: 3913, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3854, original: 5478, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 141,
    name: "Boutique Sun-Kissed Golden Meadow Sunflowers",
    emoji: "\ud83c\udf3b",
    tag: "Bright Sunshine",
    cat: "flowers",
    subcat: "sunflowers",
    rating: 4.9,
    reviewsCount: 1697,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1303, original: 1883, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1824, original: 2636, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 142,
    name: "Boutique Butterscotch Praline Caramel Crunch Cake",
    emoji: "\ud83c\udf6f",
    tag: "Caramel Crunch",
    cat: "cakes",
    subcat: "butterscotch",
    rating: 4.8,
    reviewsCount: 1734,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 941, original: 1303, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1317, original: 1824, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 143,
    name: "Boutique Monogrammed Brass & Leather Keychain Set",
    emoji: "\ud83d\udd11",
    tag: "Genuine Leather",
    cat: "personalized",
    subcat: "keychains",
    rating: 4.7,
    reviewsCount: 1771,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 723, original: 1158, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1012, original: 1621, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 144,
    name: "Boutique Dry Fruits & Roasted Nuts Regal Wooden Casket",
    emoji: "\ud83c\udf30",
    tag: "Healthy Royale",
    cat: "hampers",
    subcat: "gourmet",
    rating: 4.6,
    reviewsCount: 1808,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2463, original: 3478, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3448, original: 4869, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 145,
    name: "Boutique Classic 100 Red Roses Heart Arrangement",
    emoji: "\u2764\ufe0f",
    tag: "Grand Romance",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 1845,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 5073, original: 6668, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 7102, original: 9335, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 146,
    name: "Boutique Lotus Biscoff Speculoos Cheesecake",
    emoji: "\ud83c\udf6a",
    tag: "Biscoff Caramel",
    cat: "cakes",
    subcat: "cheesecake",
    rating: 4.8,
    reviewsCount: 82,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1738, original: 2463, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2433, original: 3448, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 147,
    name: "Boutique Personalised Engraved Parker Pen & Diary Set",
    emoji: "\u2712\ufe0f",
    tag: "Executive Luxe",
    cat: "personalized",
    subcat: "keepsakes",
    rating: 4.7,
    reviewsCount: 119,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1231, original: 1811, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1723, original: 2535, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 148,
    name: "Boutique Luxury Soy Wax Scented Candle Trio in Gift Box",
    emoji: "\ud83d\udd6f\ufe0f",
    tag: "Ambient Glow",
    cat: "hampers",
    subcat: "fragrance",
    rating: 4.6,
    reviewsCount: 156,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1303, original: 1883, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1824, original: 2636, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 149,
    name: "Supreme Velvet Crimson Rose Hatbox",
    emoji: "\ud83c\udf39",
    tag: "Handcrafted Bloom Box",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 193,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1948, original: 2698, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2727, original: 3777, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 150,
    name: "Supreme Red Velvet Heart Cream Cheese Cake",
    emoji: "\u2764\ufe0f",
    tag: "Romantic Heart",
    cat: "cakes",
    subcat: "romantic",
    rating: 4.8,
    reviewsCount: 230,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1198, original: 1648, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1677, original: 2307, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 151,
    name: "Supreme Laser-Engraved Luxury Chronograph Watch",
    emoji: "\u231a",
    tag: "Precision Time",
    cat: "personalized",
    subcat: "watches",
    rating: 4.7,
    reviewsCount: 267,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2998, original: 4498, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 4197, original: 6297, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 152,
    name: "Supreme Smart Wireless Charging Desk Lamp with Speaker",
    emoji: "\ud83d\udcf1",
    tag: "Smart Home",
    cat: "hampers",
    subcat: "gadgets",
    rating: 4.6,
    reviewsCount: 304,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2848, original: 4048, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3987, original: 5667, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 153,
    name: "Supreme Sun-Kissed Golden Meadow Sunflowers",
    emoji: "\ud83c\udf3b",
    tag: "Bright Sunshine",
    cat: "flowers",
    subcat: "sunflowers",
    rating: 4.9,
    reviewsCount: 341,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1348, original: 1948, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1887, original: 2727, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 154,
    name: "Supreme Butterscotch Praline Caramel Crunch Cake",
    emoji: "\ud83c\udf6f",
    tag: "Caramel Crunch",
    cat: "cakes",
    subcat: "butterscotch",
    rating: 4.8,
    reviewsCount: 378,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 973, original: 1348, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1362, original: 1887, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 155,
    name: "Supreme Monogrammed Brass & Leather Keychain Set",
    emoji: "\ud83d\udd11",
    tag: "Genuine Leather",
    cat: "personalized",
    subcat: "keychains",
    rating: 4.7,
    reviewsCount: 415,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 748, original: 1198, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1047, original: 1677, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 156,
    name: "Supreme Dry Fruits & Roasted Nuts Regal Wooden Casket",
    emoji: "\ud83c\udf30",
    tag: "Healthy Royale",
    cat: "hampers",
    subcat: "gourmet",
    rating: 4.6,
    reviewsCount: 452,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2548, original: 3598, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3567, original: 5037, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 157,
    name: "Supreme Classic 100 Red Roses Heart Arrangement",
    emoji: "\u2764\ufe0f",
    tag: "Grand Romance",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 489,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 5248, original: 6898, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 7347, original: 9657, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 158,
    name: "Supreme Lotus Biscoff Speculoos Cheesecake",
    emoji: "\ud83c\udf6a",
    tag: "Biscoff Caramel",
    cat: "cakes",
    subcat: "cheesecake",
    rating: 4.8,
    reviewsCount: 526,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1798, original: 2548, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2517, original: 3567, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 159,
    name: "Supreme Personalised Engraved Parker Pen & Diary Set",
    emoji: "\u2712\ufe0f",
    tag: "Executive Luxe",
    cat: "personalized",
    subcat: "keepsakes",
    rating: 4.7,
    reviewsCount: 563,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1273, original: 1873, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1782, original: 2622, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 160,
    name: "Supreme Luxury Soy Wax Scented Candle Trio in Gift Box",
    emoji: "\ud83d\udd6f\ufe0f",
    tag: "Ambient Glow",
    cat: "hampers",
    subcat: "fragrance",
    rating: 4.6,
    reviewsCount: 600,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1348, original: 1948, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1887, original: 2727, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 161,
    name: "Artisan Velvet Crimson Rose Hatbox",
    emoji: "\ud83c\udf39",
    tag: "Handcrafted Bloom Box",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 637,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2013, original: 2788, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2818, original: 3903, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 162,
    name: "Artisan Red Velvet Heart Cream Cheese Cake",
    emoji: "\u2764\ufe0f",
    tag: "Romantic Heart",
    cat: "cakes",
    subcat: "romantic",
    rating: 4.8,
    reviewsCount: 674,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1238, original: 1703, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1733, original: 2384, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 163,
    name: "Artisan Laser-Engraved Luxury Chronograph Watch",
    emoji: "\u231a",
    tag: "Precision Time",
    cat: "personalized",
    subcat: "watches",
    rating: 4.7,
    reviewsCount: 711,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 3098, original: 4648, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 4337, original: 6507, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 164,
    name: "Artisan Smart Wireless Charging Desk Lamp with Speaker",
    emoji: "\ud83d\udcf1",
    tag: "Smart Home",
    cat: "hampers",
    subcat: "gadgets",
    rating: 4.6,
    reviewsCount: 748,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2943, original: 4183, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 4120, original: 5856, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 165,
    name: "Artisan Sun-Kissed Golden Meadow Sunflowers",
    emoji: "\ud83c\udf3b",
    tag: "Bright Sunshine",
    cat: "flowers",
    subcat: "sunflowers",
    rating: 4.9,
    reviewsCount: 785,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1393, original: 2013, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1950, original: 2818, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 166,
    name: "Artisan Butterscotch Praline Caramel Crunch Cake",
    emoji: "\ud83c\udf6f",
    tag: "Caramel Crunch",
    cat: "cakes",
    subcat: "butterscotch",
    rating: 4.8,
    reviewsCount: 822,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1005, original: 1393, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1407, original: 1950, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 167,
    name: "Artisan Monogrammed Brass & Leather Keychain Set",
    emoji: "\ud83d\udd11",
    tag: "Genuine Leather",
    cat: "personalized",
    subcat: "keychains",
    rating: 4.7,
    reviewsCount: 859,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 773, original: 1238, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1082, original: 1733, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 168,
    name: "Artisan Dry Fruits & Roasted Nuts Regal Wooden Casket",
    emoji: "\ud83c\udf30",
    tag: "Healthy Royale",
    cat: "hampers",
    subcat: "gourmet",
    rating: 4.6,
    reviewsCount: 896,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2633, original: 3718, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3686, original: 5205, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 169,
    name: "Artisan Classic 100 Red Roses Heart Arrangement",
    emoji: "\u2764\ufe0f",
    tag: "Grand Romance",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 933,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 5423, original: 7128, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 7592, original: 9979, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 170,
    name: "Artisan Lotus Biscoff Speculoos Cheesecake",
    emoji: "\ud83c\udf6a",
    tag: "Biscoff Caramel",
    cat: "cakes",
    subcat: "cheesecake",
    rating: 4.8,
    reviewsCount: 970,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1858, original: 2633, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2601, original: 3686, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 171,
    name: "Artisan Personalised Engraved Parker Pen & Diary Set",
    emoji: "\u2712\ufe0f",
    tag: "Executive Luxe",
    cat: "personalized",
    subcat: "keepsakes",
    rating: 4.7,
    reviewsCount: 1007,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1315, original: 1935, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1840, original: 2709, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 172,
    name: "Artisan Luxury Soy Wax Scented Candle Trio in Gift Box",
    emoji: "\ud83d\udd6f\ufe0f",
    tag: "Ambient Glow",
    cat: "hampers",
    subcat: "fragrance",
    rating: 4.6,
    reviewsCount: 1044,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1393, original: 2013, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1950, original: 2818, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 173,
    name: "Deluxe Velvet Crimson Rose Hatbox",
    emoji: "\ud83c\udf39",
    tag: "Handcrafted Bloom Box",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 1081,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2078, original: 2878, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2909, original: 4029, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 174,
    name: "Deluxe Red Velvet Heart Cream Cheese Cake",
    emoji: "\u2764\ufe0f",
    tag: "Romantic Heart",
    cat: "cakes",
    subcat: "romantic",
    rating: 4.8,
    reviewsCount: 1118,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1278, original: 1758, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1789, original: 2461, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 175,
    name: "Deluxe Laser-Engraved Luxury Chronograph Watch",
    emoji: "\u231a",
    tag: "Precision Time",
    cat: "personalized",
    subcat: "watches",
    rating: 4.7,
    reviewsCount: 1155,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 3198, original: 4798, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 4477, original: 6717, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 176,
    name: "Deluxe Smart Wireless Charging Desk Lamp with Speaker",
    emoji: "\ud83d\udcf1",
    tag: "Smart Home",
    cat: "hampers",
    subcat: "gadgets",
    rating: 4.6,
    reviewsCount: 1192,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 3038, original: 4318, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 4253, original: 6045, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 177,
    name: "Deluxe Sun-Kissed Golden Meadow Sunflowers",
    emoji: "\ud83c\udf3b",
    tag: "Bright Sunshine",
    cat: "flowers",
    subcat: "sunflowers",
    rating: 4.9,
    reviewsCount: 1229,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1438, original: 2078, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2013, original: 2909, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 178,
    name: "Deluxe Butterscotch Praline Caramel Crunch Cake",
    emoji: "\ud83c\udf6f",
    tag: "Caramel Crunch",
    cat: "cakes",
    subcat: "butterscotch",
    rating: 4.8,
    reviewsCount: 1266,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1038, original: 1438, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1453, original: 2013, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 179,
    name: "Deluxe Monogrammed Brass & Leather Keychain Set",
    emoji: "\ud83d\udd11",
    tag: "Genuine Leather",
    cat: "personalized",
    subcat: "keychains",
    rating: 4.7,
    reviewsCount: 1303,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 798, original: 1278, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1117, original: 1789, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 180,
    name: "Deluxe Dry Fruits & Roasted Nuts Regal Wooden Casket",
    emoji: "\ud83c\udf30",
    tag: "Healthy Royale",
    cat: "hampers",
    subcat: "gourmet",
    rating: 4.6,
    reviewsCount: 1340,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2718, original: 3838, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3805, original: 5373, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 181,
    name: "Deluxe Classic 100 Red Roses Heart Arrangement",
    emoji: "\u2764\ufe0f",
    tag: "Grand Romance",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 1377,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 5598, original: 7358, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 7837, original: 10301, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 182,
    name: "Deluxe Lotus Biscoff Speculoos Cheesecake",
    emoji: "\ud83c\udf6a",
    tag: "Biscoff Caramel",
    cat: "cakes",
    subcat: "cheesecake",
    rating: 4.8,
    reviewsCount: 1414,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1918, original: 2718, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2685, original: 3805, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 183,
    name: "Deluxe Personalised Engraved Parker Pen & Diary Set",
    emoji: "\u2712\ufe0f",
    tag: "Executive Luxe",
    cat: "personalized",
    subcat: "keepsakes",
    rating: 4.7,
    reviewsCount: 1451,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1358, original: 1998, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1901, original: 2797, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 184,
    name: "Deluxe Luxury Soy Wax Scented Candle Trio in Gift Box",
    emoji: "\ud83d\udd6f\ufe0f",
    tag: "Ambient Glow",
    cat: "hampers",
    subcat: "fragrance",
    rating: 4.6,
    reviewsCount: 1488,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1438, original: 2078, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2013, original: 2909, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 185,
    name: "Exquisite Velvet Crimson Rose Hatbox",
    emoji: "\ud83c\udf39",
    tag: "Handcrafted Bloom Box",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 1525,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2143, original: 2968, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3000, original: 4155, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 186,
    name: "Exquisite Red Velvet Heart Cream Cheese Cake",
    emoji: "\u2764\ufe0f",
    tag: "Romantic Heart",
    cat: "cakes",
    subcat: "romantic",
    rating: 4.8,
    reviewsCount: 1562,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1318, original: 1813, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1845, original: 2538, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 187,
    name: "Exquisite Laser-Engraved Luxury Chronograph Watch",
    emoji: "\u231a",
    tag: "Precision Time",
    cat: "personalized",
    subcat: "watches",
    rating: 4.7,
    reviewsCount: 1599,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 3298, original: 4948, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 4617, original: 6927, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 188,
    name: "Exquisite Smart Wireless Charging Desk Lamp with Speaker",
    emoji: "\ud83d\udcf1",
    tag: "Smart Home",
    cat: "hampers",
    subcat: "gadgets",
    rating: 4.6,
    reviewsCount: 1636,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 3133, original: 4453, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 4386, original: 6234, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 189,
    name: "Exquisite Sun-Kissed Golden Meadow Sunflowers",
    emoji: "\ud83c\udf3b",
    tag: "Bright Sunshine",
    cat: "flowers",
    subcat: "sunflowers",
    rating: 4.9,
    reviewsCount: 1673,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1483, original: 2143, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2076, original: 3000, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 190,
    name: "Exquisite Butterscotch Praline Caramel Crunch Cake",
    emoji: "\ud83c\udf6f",
    tag: "Caramel Crunch",
    cat: "cakes",
    subcat: "butterscotch",
    rating: 4.8,
    reviewsCount: 1710,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1070, original: 1483, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1498, original: 2076, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 191,
    name: "Exquisite Monogrammed Brass & Leather Keychain Set",
    emoji: "\ud83d\udd11",
    tag: "Genuine Leather",
    cat: "personalized",
    subcat: "keychains",
    rating: 4.7,
    reviewsCount: 1747,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 823, original: 1318, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1152, original: 1845, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 192,
    name: "Exquisite Dry Fruits & Roasted Nuts Regal Wooden Casket",
    emoji: "\ud83c\udf30",
    tag: "Healthy Royale",
    cat: "hampers",
    subcat: "gourmet",
    rating: 4.6,
    reviewsCount: 1784,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2803, original: 3958, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3924, original: 5541, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 193,
    name: "Exquisite Classic 100 Red Roses Heart Arrangement",
    emoji: "\u2764\ufe0f",
    tag: "Grand Romance",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 1821,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 5773, original: 7588, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 8082, original: 10623, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 194,
    name: "Exquisite Lotus Biscoff Speculoos Cheesecake",
    emoji: "\ud83c\udf6a",
    tag: "Biscoff Caramel",
    cat: "cakes",
    subcat: "cheesecake",
    rating: 4.8,
    reviewsCount: 1858,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1978, original: 2803, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2769, original: 3924, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 195,
    name: "Exquisite Personalised Engraved Parker Pen & Diary Set",
    emoji: "\u2712\ufe0f",
    tag: "Executive Luxe",
    cat: "personalized",
    subcat: "keepsakes",
    rating: 4.7,
    reviewsCount: 95,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1400, original: 2060, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1959, original: 2884, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 196,
    name: "Exquisite Luxury Soy Wax Scented Candle Trio in Gift Box",
    emoji: "\ud83d\udd6f\ufe0f",
    tag: "Ambient Glow",
    cat: "hampers",
    subcat: "fragrance",
    rating: 4.6,
    reviewsCount: 132,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1483, original: 2143, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2076, original: 3000, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 197,
    name: "Prestige Velvet Crimson Rose Hatbox",
    emoji: "\ud83c\udf39",
    tag: "Handcrafted Bloom Box",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 169,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2208, original: 3058, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3091, original: 4281, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 198,
    name: "Prestige Red Velvet Heart Cream Cheese Cake",
    emoji: "\u2764\ufe0f",
    tag: "Romantic Heart",
    cat: "cakes",
    subcat: "romantic",
    rating: 4.8,
    reviewsCount: 206,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1358, original: 1868, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1901, original: 2615, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 199,
    name: "Prestige Laser-Engraved Luxury Chronograph Watch",
    emoji: "\u231a",
    tag: "Precision Time",
    cat: "personalized",
    subcat: "watches",
    rating: 4.7,
    reviewsCount: 243,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 3398, original: 5098, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 4757, original: 7137, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 200,
    name: "Prestige Smart Wireless Charging Desk Lamp with Speaker",
    emoji: "\ud83d\udcf1",
    tag: "Smart Home",
    cat: "hampers",
    subcat: "gadgets",
    rating: 4.6,
    reviewsCount: 280,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 3228, original: 4588, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 4519, original: 6423, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 201,
    name: "Prestige Sun-Kissed Golden Meadow Sunflowers",
    emoji: "\ud83c\udf3b",
    tag: "Bright Sunshine",
    cat: "flowers",
    subcat: "sunflowers",
    rating: 4.9,
    reviewsCount: 317,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1528, original: 2208, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2139, original: 3091, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 202,
    name: "Prestige Butterscotch Praline Caramel Crunch Cake",
    emoji: "\ud83c\udf6f",
    tag: "Caramel Crunch",
    cat: "cakes",
    subcat: "butterscotch",
    rating: 4.8,
    reviewsCount: 354,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1103, original: 1528, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1544, original: 2139, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 203,
    name: "Prestige Monogrammed Brass & Leather Keychain Set",
    emoji: "\ud83d\udd11",
    tag: "Genuine Leather",
    cat: "personalized",
    subcat: "keychains",
    rating: 4.7,
    reviewsCount: 391,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 848, original: 1358, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1187, original: 1901, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 204,
    name: "Prestige Dry Fruits & Roasted Nuts Regal Wooden Casket",
    emoji: "\ud83c\udf30",
    tag: "Healthy Royale",
    cat: "hampers",
    subcat: "gourmet",
    rating: 4.6,
    reviewsCount: 428,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2888, original: 4078, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 4043, original: 5709, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 205,
    name: "Prestige Classic 100 Red Roses Heart Arrangement",
    emoji: "\u2764\ufe0f",
    tag: "Grand Romance",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 465,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 5948, original: 7818, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 8327, original: 10945, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 206,
    name: "Prestige Lotus Biscoff Speculoos Cheesecake",
    emoji: "\ud83c\udf6a",
    tag: "Biscoff Caramel",
    cat: "cakes",
    subcat: "cheesecake",
    rating: 4.8,
    reviewsCount: 502,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2038, original: 2888, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2853, original: 4043, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 207,
    name: "Prestige Personalised Engraved Parker Pen & Diary Set",
    emoji: "\u2712\ufe0f",
    tag: "Executive Luxe",
    cat: "personalized",
    subcat: "keepsakes",
    rating: 4.7,
    reviewsCount: 539,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1443, original: 2123, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2020, original: 2972, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 208,
    name: "Prestige Luxury Soy Wax Scented Candle Trio in Gift Box",
    emoji: "\ud83d\udd6f\ufe0f",
    tag: "Ambient Glow",
    cat: "hampers",
    subcat: "fragrance",
    rating: 4.6,
    reviewsCount: 576,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1528, original: 2208, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2139, original: 3091, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 209,
    name: "Classic Velvet Crimson Rose Hatbox",
    emoji: "\ud83c\udf39",
    tag: "Handcrafted Bloom Box",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 613,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2273, original: 3148, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3182, original: 4407, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 210,
    name: "Classic Red Velvet Heart Cream Cheese Cake",
    emoji: "\u2764\ufe0f",
    tag: "Romantic Heart",
    cat: "cakes",
    subcat: "romantic",
    rating: 4.8,
    reviewsCount: 650,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1398, original: 1923, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1957, original: 2692, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 211,
    name: "Classic Laser-Engraved Luxury Chronograph Watch",
    emoji: "\u231a",
    tag: "Precision Time",
    cat: "personalized",
    subcat: "watches",
    rating: 4.7,
    reviewsCount: 687,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 3498, original: 5248, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 4897, original: 7347, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 212,
    name: "Classic Smart Wireless Charging Desk Lamp with Speaker",
    emoji: "\ud83d\udcf1",
    tag: "Smart Home",
    cat: "hampers",
    subcat: "gadgets",
    rating: 4.6,
    reviewsCount: 724,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 3323, original: 4723, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 4652, original: 6612, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 213,
    name: "Classic Sun-Kissed Golden Meadow Sunflowers",
    emoji: "\ud83c\udf3b",
    tag: "Bright Sunshine",
    cat: "flowers",
    subcat: "sunflowers",
    rating: 4.9,
    reviewsCount: 761,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1573, original: 2273, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2202, original: 3182, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 214,
    name: "Classic Butterscotch Praline Caramel Crunch Cake",
    emoji: "\ud83c\udf6f",
    tag: "Caramel Crunch",
    cat: "cakes",
    subcat: "butterscotch",
    rating: 4.8,
    reviewsCount: 798,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1135, original: 1573, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1589, original: 2202, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 215,
    name: "Classic Monogrammed Brass & Leather Keychain Set",
    emoji: "\ud83d\udd11",
    tag: "Genuine Leather",
    cat: "personalized",
    subcat: "keychains",
    rating: 4.7,
    reviewsCount: 835,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 873, original: 1398, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1222, original: 1957, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 216,
    name: "Classic Dry Fruits & Roasted Nuts Regal Wooden Casket",
    emoji: "\ud83c\udf30",
    tag: "Healthy Royale",
    cat: "hampers",
    subcat: "gourmet",
    rating: 4.6,
    reviewsCount: 872,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2973, original: 4198, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 4162, original: 5877, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 217,
    name: "Classic Classic 100 Red Roses Heart Arrangement",
    emoji: "\u2764\ufe0f",
    tag: "Grand Romance",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 909,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 6123, original: 8048, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 8572, original: 11267, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 218,
    name: "Classic Lotus Biscoff Speculoos Cheesecake",
    emoji: "\ud83c\udf6a",
    tag: "Biscoff Caramel",
    cat: "cakes",
    subcat: "cheesecake",
    rating: 4.8,
    reviewsCount: 946,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2098, original: 2973, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2937, original: 4162, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 219,
    name: "Classic Personalised Engraved Parker Pen & Diary Set",
    emoji: "\u2712\ufe0f",
    tag: "Executive Luxe",
    cat: "personalized",
    subcat: "keepsakes",
    rating: 4.7,
    reviewsCount: 983,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1485, original: 2185, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2079, original: 3059, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 220,
    name: "Classic Luxury Soy Wax Scented Candle Trio in Gift Box",
    emoji: "\ud83d\udd6f\ufe0f",
    tag: "Ambient Glow",
    cat: "hampers",
    subcat: "fragrance",
    rating: 4.6,
    reviewsCount: 1020,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1573, original: 2273, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2202, original: 3182, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 221,
    name: "Signature Velvet Crimson Rose Hatbox",
    emoji: "\ud83c\udf39",
    tag: "Handcrafted Bloom Box",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 1057,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2338, original: 3238, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3273, original: 4533, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 222,
    name: "Signature Red Velvet Heart Cream Cheese Cake",
    emoji: "\u2764\ufe0f",
    tag: "Romantic Heart",
    cat: "cakes",
    subcat: "romantic",
    rating: 4.8,
    reviewsCount: 1094,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1438, original: 1978, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2013, original: 2769, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 223,
    name: "Signature Laser-Engraved Luxury Chronograph Watch",
    emoji: "\u231a",
    tag: "Precision Time",
    cat: "personalized",
    subcat: "watches",
    rating: 4.7,
    reviewsCount: 1131,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 3598, original: 5398, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 5037, original: 7557, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 224,
    name: "Signature Smart Wireless Charging Desk Lamp with Speaker",
    emoji: "\ud83d\udcf1",
    tag: "Smart Home",
    cat: "hampers",
    subcat: "gadgets",
    rating: 4.6,
    reviewsCount: 1168,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 3418, original: 4858, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 4785, original: 6801, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 225,
    name: "Signature Sun-Kissed Golden Meadow Sunflowers",
    emoji: "\ud83c\udf3b",
    tag: "Bright Sunshine",
    cat: "flowers",
    subcat: "sunflowers",
    rating: 4.9,
    reviewsCount: 1205,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1618, original: 2338, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 2265, original: 3273, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 226,
    name: "Signature Butterscotch Praline Caramel Crunch Cake",
    emoji: "\ud83c\udf6f",
    tag: "Caramel Crunch",
    cat: "cakes",
    subcat: "butterscotch",
    rating: 4.8,
    reviewsCount: 1242,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 1168, original: 1618, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1635, original: 2265, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 227,
    name: "Signature Monogrammed Brass & Leather Keychain Set",
    emoji: "\ud83d\udd11",
    tag: "Genuine Leather",
    cat: "personalized",
    subcat: "keychains",
    rating: 4.7,
    reviewsCount: 1279,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: true,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 898, original: 1438, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 1257, original: 2013, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 228,
    name: "Signature Dry Fruits & Roasted Nuts Regal Wooden Casket",
    emoji: "\ud83c\udf30",
    tag: "Healthy Royale",
    cat: "hampers",
    subcat: "gourmet",
    rating: 4.6,
    reviewsCount: 1316,
    earliestDelivery: "Tomorrow",
    deliveryDays: 1,
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 3058, original: 4318, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 4281, original: 6045, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 229,
    name: "Signature Classic 100 Red Roses Heart Arrangement",
    emoji: "\u2764\ufe0f",
    tag: "Grand Romance",
    cat: "flowers",
    subcat: "roses",
    rating: 4.9,
    reviewsCount: 1353,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 6298, original: 8278, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 8817, original: 11589, stock: 30 }
        ]
      }
    ]
  },
  {
    id: 230,
    name: "Signature Lotus Biscoff Speculoos Cheesecake",
    emoji: "\ud83c\udf6a",
    tag: "Biscoff Caramel",
    cat: "cakes",
    subcat: "cheesecake",
    rating: 4.8,
    reviewsCount: 1390,
    earliestDelivery: "Today",
    deliveryDays: 0,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop",
    occasion: ['birthday', 'anniversary', 'congratulations', 'love'],
    recipient: ['her', 'him', 'couples', 'parents', 'kids'],
    supportsPersonalization: false,
    types: [
      {
        label: 'Selection',
        variants: [
          { label: 'Standard Edition', price: 2158, original: 3058, stock: 50 },
          { label: 'Grand Deluxe Edition', price: 3021, original: 4281, stock: 30 }
        ]
      }
    ]
  }
];
