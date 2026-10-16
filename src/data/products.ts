import { Product } from '../types';

export const getConsistentProductViews = (baseImageUrl: string): string[] => {
  const cleanUrl = baseImageUrl.split('?')[0];
  return [
    `${cleanUrl}?auto=format&fit=crop&w=1000&q=85`,
    `${cleanUrl}?auto=format&fit=crop&w=1000&q=85&crop=center&zoom=1.25`,
    `${cleanUrl}?auto=format&fit=crop&w=1000&q=85&crop=top`,
    `${cleanUrl}?auto=format&fit=crop&w=1000&q=85&crop=edges`,
  ];
};

const rawProducts: Product[] = [
  // 1. Trending Sneakers
  {
    id: 'nike-af1-07',
    name: "Nike Air Force 1 '07",
    brand: 'Nike',
    category: 'sneakers',
    subcategory: 'Lifestyle',
    price: 7995,
    originalPrice: 10995,
    discount: 27,
    rating: 4.8,
    reviewCount: 2410,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Classic style meets modern comfort. The Nike Air Force 1 ’07 features a crisp clean design, durable premium leather, and all-day Nike Air cushioning that made it an international icon.',
    features: [
      'Real and synthetic stitched leather overlays on upper',
      'Originally designed for performance hoops, Nike Air cushioning adds lightweight comfort',
      'Low-cut silhouette adds a clean, streamlined look',
      'Padded collar feels soft and comfortable',
      'Perforations on toe for breathability'
    ],
    colors: [
      { name: 'Triple White', hex: '#FFFFFF' },
      { name: 'Black Onyx', hex: '#111827' },
      { name: 'Sail / Platinum', hex: '#F3F4F6' }
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    inStock: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    sku: 'NK-AF1-07-WHT',
  },

  // 2. Electronics
  {
    id: 'apple-airpods-pro-2',
    name: 'Apple AirPods Pro (2nd Gen)',
    brand: 'Apple',
    category: 'electronics',
    subcategory: 'Audio',
    price: 24900,
    originalPrice: 26900,
    discount: 10,
    rating: 4.7,
    reviewCount: 1820,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Up to 2x more Active Noise Cancellation than the previous generation. Transparency mode lets you comfortably hear the world around you. Personalized Spatial Audio with dynamic head tracking places sound all around you.',
    features: [
      'Apple H2 headphone chip for high-fidelity audio',
      'Adaptive Audio dynamically blends Transparency and Active Noise Cancellation',
      'Up to 6 hours of listening time with ANC enabled',
      'MagSafe Charging Case (USB-C) with speaker and lanyard loop',
      'Dust, sweat, and water resistant (IP54)'
    ],
    colors: [
      { name: 'White', hex: '#FFFFFF' }
    ],
    inStock: true,
    isTrending: true,
    isBestSeller: true,
    sku: 'APL-APP2-USBC',
  },

  // 3. Men's Fashion
  {
    id: 'levis-oversized-hoodie',
    name: "Levi's Oversized Heavyweight Hoodie",
    brand: "Levi's",
    category: 'fashion',
    subcategory: "Men's Clothing",
    price: 2499,
    originalPrice: 3499,
    discount: 30,
    rating: 4.6,
    reviewCount: 986,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
    ],
    description: 'Cut with a relaxed, modern drape from plush French terry cotton. This premium heavyweight hoodie provides effortless warmth with dropped shoulders and a kangaroo pocket.',
    features: [
      '100% Organic Cotton French Terry (450 GSM)',
      'Oversized boxy streetwear silhouette',
      'Double-layer generous hood with drawstrings',
      'Ribbed cuffs and hem retain shape',
      'Pre-shrunk fabric to prevent post-wash shrinkage'
    ],
    colors: [
      { name: 'Washed Black', hex: '#1F2937' },
      { name: 'Oatmeal Heather', hex: '#E5E7EB' },
      { name: 'Forest Green', hex: '#166534' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isTrending: true,
    isBestSeller: false,
    sku: 'LEV-HD-BLK-01',
  },

  // 4. Smartphone / Electronics
  {
    id: 'samsung-galaxy-s24',
    name: 'Samsung Galaxy S24 Ultra (512GB)',
    brand: 'Samsung',
    category: 'electronics',
    subcategory: 'Smartphones',
    price: 74999,
    originalPrice: 84999,
    discount: 12,
    rating: 4.8,
    reviewCount: 3240,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Unleash next-level mobile intelligence with Galaxy AI. Featuring a titanium shield exterior, 200MP camera with Quad Telephoto system, and the brightest flat AMOLED display.',
    features: [
      '6.8-inch Dynamic AMOLED 2X 120Hz (2600 nits)',
      'Titanium frame with Corning Gorilla Armor',
      'Snapdragon 8 Gen 3 for Galaxy processor',
      'Built-in S Pen stylus included',
      'Galaxy AI: Circle to Search, Live Translate & Photo Assist'
    ],
    colors: [
      { name: 'Titanium Gray', hex: '#4B5563' },
      { name: 'Titanium Black', hex: '#111827' },
      { name: 'Titanium Violet', hex: '#6D28D9' }
    ],
    sizes: ['256GB', '512GB', '1TB'],
    inStock: true,
    isTrending: true,
    isBestSeller: true,
    sku: 'SAM-S24U-512',
  },

  // 5. Beauty
  {
    id: 'the-ordinary-skincare-set',
    name: 'The Ordinary Daily Glow Skincare Routine',
    brand: 'The Ordinary',
    category: 'beauty',
    subcategory: 'Skin Care',
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    rating: 4.8,
    reviewCount: 1230,
    image: 'https://images.unsplash.com/photo-1608248597359-5613532b3132?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248597359-5613532b3132?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'A complete scientific 4-step regimen designed to clarify tone, deeply hydrate, and fortify the natural skin barrier. Includes Niacinamide 10%, Hyaluronic Acid 2%, Squalane Cleanser, and Natural Moisturizing Factors.',
    features: [
      'Formulated without parabens, sulfates, or artificial perfumes',
      'Vegan and cruelty-free formulation certified',
      'Visibly reduces blemishes and balances sebum production',
      'Suitable for all skin types including sensitive'
    ],
    inStock: true,
    isTrending: true,
    isBestSeller: false,
    sku: 'ORD-GLOW-SET',
  },

  // 6. Denim Jacket
  {
    id: 'mens-denim-jacket',
    name: "Classic Heritage Denim Trucker Jacket",
    brand: 'Levi’s',
    category: 'fashion',
    subcategory: "Men's Clothing",
    price: 2999,
    originalPrice: 4499,
    discount: 33,
    rating: 4.7,
    reviewCount: 1240,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80',
    ],
    description: 'An iconic silhouette born in the 1960s, rendered in rigid vintage-wash denim with shank buttons, pointed collar, and welt pockets. Gets better with every wear.',
    features: [
      '100% Cotton non-stretch selvedge denim',
      'Standard fit through chest and body',
      'Branded metal shank buttons throughout',
      'Side waist adjusters for tailored fit'
    ],
    colors: [
      { name: 'Vintage Indigo', hex: '#2563EB' },
      { name: 'Washed Black', hex: '#1E293B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isTrending: false,
    isBestSeller: true,
    sku: 'LEV-TRK-IND',
  },

  // 7. Women's Midi Dress
  {
    id: 'womens-midi-dress',
    name: 'Ribbed Knit Minimalist Midi Dress',
    brand: 'Zara',
    category: 'fashion',
    subcategory: "Women's Clothing",
    price: 2499,
    originalPrice: 3299,
    discount: 24,
    rating: 4.6,
    reviewCount: 890,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
    ],
    description: 'Sculptural silhouette cut from ribbed modal-blend knit. Features a square neckline, subtle side slit, and an elegant midi length that transitions seamlessly from day to night.',
    features: [
      'Premium stretch rib knit fabric',
      'Square neckline with supportive wide straps',
      'Side walking slit for mobility',
      'Breathable, wrinkle-resistant blend'
    ],
    colors: [
      { name: 'Classic Black', hex: '#111827' },
      { name: 'Espresso Brown', hex: '#451A03' },
      { name: 'Warm Cream', hex: '#FEF3C7' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    isTrending: false,
    isBestSeller: true,
    sku: 'ZAR-MIDI-BLK',
  },

  // 8. Oversized Fleece Hoodie
  {
    id: 'oversized-hoodie-cream',
    name: 'Cloud-Soft Oversized Fleece Hoodie',
    brand: 'H&M',
    category: 'fashion',
    subcategory: "Men's Clothing",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    rating: 4.5,
    reviewCount: 754,
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
    ],
    description: 'Crafted from ultra-soft brushed fleece with dropped shoulders and a minimalist silhouette. Engineered for supreme lounge comfort and effortless layering.',
    features: [
      'Cotton-poly brushed fleece interior',
      'Relaxed drop-shoulder cut',
      'Hidden seam kangaroo pocket'
    ],
    colors: [
      { name: 'Bone White', hex: '#F9FAFB' },
      { name: 'Slate Gray', hex: '#64748B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    sku: 'HM-OVH-CRM',
  },

  // 9. Running Shoes
  {
    id: 'nike-running-shoes',
    name: 'Nike Air Zoom Pegasus 40',
    brand: 'Nike',
    category: 'sneakers',
    subcategory: 'Running',
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    rating: 4.6,
    reviewCount: 2150,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'A springy ride for any run, the Peg’s familiar, just-for-you feel returns to help you accomplish your fitness goals with Nike React foam technology.',
    features: [
      'Dual Zoom Air units for responsive bounce',
      'Engineered mesh upper for optimized airflow',
      'Waffle-inspired rubber outsole traction',
      'Heel crash pad reduces impact shock'
    ],
    colors: [
      { name: 'Gym Red / White', hex: '#EF4444' },
      { name: 'Triple Black', hex: '#000000' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    inStock: true,
    isTrending: false,
    isBestSeller: true,
    sku: 'NK-PEG-40-RD',
  },

  // 10. Aviator Sunglasses
  {
    id: 'aviator-sunglasses',
    name: 'Ray-Ban Classic Gold Aviator Polarized',
    brand: 'Ray-Ban',
    category: 'accessories',
    subcategory: 'Eyewear',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.4,
    reviewCount: 632,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Originally designed in 1937 for US aviators, the iconic teardrop frame combines exceptional quality, performance, and unmatched comfort with crystal green lenses.',
    features: [
      'Polished gold lightweight metal frame',
      'G-15 green polarized lenses with 100% UV400 protection',
      'Adjustable clear silicone nose pads',
      'Includes signature leather case and cleaning cloth'
    ],
    colors: [
      { name: 'Gold / Green', hex: '#D97706' },
      { name: 'Matte Black', hex: '#1F2937' }
    ],
    inStock: true,
    isTrending: false,
    isBestSeller: false,
    sku: 'RB-AV-3025',
  },

  // 11. Laptop Backpack
  {
    id: 'laptop-backpack',
    name: 'Aero Minimalist Weatherproof Tech Backpack',
    brand: 'Bellroy',
    category: 'accessories',
    subcategory: 'Bags',
    price: 2799,
    originalPrice: 3999,
    discount: 30,
    rating: 4.6,
    reviewCount: 908,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Engineered for urban commuters and modern creatives. Features dedicated padded compartments for 16-inch laptops, water-resistant ballistic nylon, and ergonomic padded straps.',
    features: [
      'Dedicated suspended 16" laptop sleeve',
      'Waterproof YKK Aquaguard zippers',
      'Concealed RFID-blocking passport pocket',
      'Luggage pass-through strap for seamless travel'
    ],
    colors: [
      { name: 'Matte Black', hex: '#111827' },
      { name: 'Charcoal Grey', hex: '#475569' }
    ],
    inStock: true,
    isTrending: false,
    isBestSeller: true,
    sku: 'BEL-BKPK-20L',
  },

  // 12. Nike Air Max 270
  {
    id: 'nike-air-max-270',
    name: 'Nike Air Max 270 React',
    brand: 'Nike',
    category: 'sneakers',
    subcategory: 'Lifestyle',
    price: 12995,
    originalPrice: 14995,
    discount: 13,
    rating: 4.6,
    reviewCount: 1280,
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    ],
    description: "Boasting Nike's biggest heel Air unit yet, the Air Max 270 delivers unmatched trampolining cushion with a breathable woven and synthetic fabric upper.",
    features: [
      'Max Air 270 unit delivers unrivaled, all-day comfort',
      'Stretchy inner sleeve creates a personalized fit',
      'Rubber on outsole adds traction and durability'
    ],
    colors: [
      { name: 'White / Black', hex: '#F3F4F6' },
      { name: 'Triple Red', hex: '#DC2626' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    inStock: true,
    isTrending: true,
    isBestSeller: false,
    sku: 'NK-AM270-WHT',
  },

  // 13. Gadgets: Smart Watch
  {
    id: 'apple-watch-series-9',
    name: 'Apple Watch Series 9 GPS + Cellular',
    brand: 'Apple',
    category: 'gadgets',
    subcategory: 'Smartwatches',
    price: 41900,
    originalPrice: 45900,
    discount: 9,
    rating: 4.9,
    reviewCount: 3100,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Smarter, brighter, mightier. Features the S9 SiP chip, magical Double Tap gesture control, precision finding for iPhone, and advanced heart & blood oxygen sensors.',
    features: [
      'Double tap gesture to answer calls or control music',
      'Always-On Retina display with up to 2000 nits brightness',
      'ECG app and Blood Oxygen monitoring',
      'Fast charging with all-day 18-hour battery'
    ],
    colors: [
      { name: 'Midnight', hex: '#1E293B' },
      { name: 'Starlight', hex: '#F1F5F9' },
      { name: 'Product Red', hex: '#EF4444' }
    ],
    sizes: ['41mm', '45mm'],
    inStock: true,
    isTrending: true,
    isBestSeller: true,
    sku: 'APL-WAT-S9',
  },

  // 14. Electronics: Premium Studio Headphones
  {
    id: 'sony-wh1000xm5',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    brand: 'Sony',
    category: 'electronics',
    subcategory: 'Audio',
    price: 29990,
    originalPrice: 34990,
    discount: 14,
    rating: 4.8,
    reviewCount: 4100,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Industry-leading noise cancellation powered by two processors and eight microphones. Magnificent Hi-Res audio with 30-hour battery life and feather-light soft fit leather.',
    features: [
      'Integrated Processor V1 & HD Noise Cancelling Processor QN1',
      'Precise Voice Pickup Technology with 4 beamforming mics',
      'Up to 30 hours battery life with quick charging (3 min = 3 hrs)',
      'Multipoint connection to switch between devices seamlessly'
    ],
    colors: [
      { name: 'Silver Smoke', hex: '#E2E8F0' },
      { name: 'Black Velvet', hex: '#0F172A' },
      { name: 'Midnight Blue', hex: '#1E3A8A' }
    ],
    inStock: true,
    isTrending: true,
    isBestSeller: true,
    sku: 'SNY-WH-XM5',
  },

  // 15. Home: Nordic Lounge Chair
  {
    id: 'nordic-lounge-chair',
    name: 'Oslo Ergonomic Velvet Accent Lounge Chair',
    brand: 'West Elm',
    category: 'home',
    subcategory: 'Furniture',
    price: 18499,
    originalPrice: 24999,
    discount: 26,
    rating: 4.9,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Sculptural elegance meets serene comfort. Upholstered in stain-resistant performance velvet with solid oak tapered legs and high-density pocket spring cushioning.',
    features: [
      'Solid FSC-certified oak hardwood frame',
      'Plush high-density foam with Dacron wrap',
      'Performance velvet fabric with spill-shield coating',
      'Supports up to 150 kg load'
    ],
    colors: [
      { name: 'Eucalyptus Green', hex: '#065F46' },
      { name: 'Terracotta Rust', hex: '#9A3412' },
      { name: 'Midnight Charcoal', hex: '#1E293B' }
    ],
    inStock: true,
    isTrending: false,
    isBestSeller: true,
    sku: 'WE-OSL-CHR',
  },

  // 16. Home: Minimalist Ceramic Lamp
  {
    id: 'ceramic-table-lamp',
    name: 'Aura Sculptural Matte Ceramic Table Lamp',
    brand: 'CB2',
    category: 'home',
    subcategory: 'Lighting',
    price: 4999,
    originalPrice: 6999,
    discount: 28,
    rating: 4.7,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'An architectural lighting sculpture created with hand-cast terracotta ceramic and a textured natural linen cylinder shade for warm, soothing ambient illumination.',
    features: [
      'Handcrafted terracotta stoneware base',
      'Natural woven oatmeal linen drum shade',
      '3-way touch rotary dimmer switch',
      'Braided fabric power cord'
    ],
    colors: [
      { name: 'Warm Terracotta', hex: '#B45309' },
      { name: 'Chalk White', hex: '#F8FAFC' }
    ],
    inStock: true,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    sku: 'CB2-AUR-LMP',
  },

  // 17. Beauty: Luxury Perfume
  {
    id: 'santal-eau-de-parfum',
    name: 'Maison Noir Santal & Bergamot Eau De Parfum (100ml)',
    brand: 'Le Labo',
    category: 'beauty',
    subcategory: 'Fragrances',
    price: 11500,
    originalPrice: 13500,
    discount: 15,
    rating: 4.9,
    reviewCount: 940,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'An intoxicating blend of smoky Australian sandalwood, cardamom, violet accord, and crisp Italian bergamot. Hand-blended for long-lasting sillage.',
    features: [
      'High fragrance oil concentration (22% Parfum)',
      '12+ hours enduring longevity on skin and fabrics',
      'Artisanal heavy flacon with magnetic cap'
    ],
    inStock: true,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    sku: 'LL-SAN-100',
  },

  // 18. Accessories: Chronograph Watch
  {
    id: 'chronograph-watch-leather',
    name: 'Horizon Minimalist Sapphire Chronograph',
    brand: 'Daniel Wellington',
    category: 'accessories',
    subcategory: 'Watches',
    price: 8499,
    originalPrice: 11999,
    discount: 29,
    rating: 4.7,
    reviewCount: 780,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Precision Japanese quartz movement housed in surgical-grade 316L stainless steel with genuine Italian vegetable-tanned leather strap.',
    features: [
      'Scratch-resistant sapphire crystal glass',
      'Water resistant to 50 meters (5 ATM)',
      'Quick-release interchangeable leather strap'
    ],
    colors: [
      { name: 'Rose Gold / Tan', hex: '#B45309' },
      { name: 'Silver / Black', hex: '#1E293B' }
    ],
    inStock: true,
    isTrending: false,
    isBestSeller: true,
    sku: 'DW-HOR-CHRONO',
  },

  // 19. Gadgets: Wireless Charging Station
  {
    id: 'magsafe-3in1-station',
    name: '3-in-1 Foldable MagSafe Fast Charging Dock',
    brand: 'Anker',
    category: 'gadgets',
    subcategory: 'Accessories',
    price: 3999,
    originalPrice: 5499,
    discount: 27,
    rating: 4.8,
    reviewCount: 1650,
    image: 'https://images.unsplash.com/photo-1622445262464-84b14e3b1540?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1622445262464-84b14e3b1540?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Wirelessly power your iPhone, Apple Watch, and AirPods simultaneously. Crafted with an aluminum hinge that folds completely flat for travel.',
    features: [
      '15W Qi2 certified fast wireless charging',
      'Strong neodymium magnets ensure effortless alignment',
      'Includes 30W USB-C GaN power adapter and braided cable'
    ],
    colors: [
      { name: 'Space Gray', hex: '#374151' },
      { name: 'Silver', hex: '#E5E7EB' }
    ],
    inStock: true,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    sku: 'ANK-3IN1-DOCK',
  },

  // 20. Fashion: Linen Relaxed Shirt
  {
    id: 'relaxed-linen-shirt',
    name: 'Pure French Linen Resort Collar Shirt',
    brand: 'Zara',
    category: 'fashion',
    subcategory: "Men's Clothing",
    price: 2199,
    originalPrice: 3199,
    discount: 31,
    rating: 4.6,
    reviewCount: 512,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=80',
    ],
    description: 'Woven from premium Normandy flax linen for superior breathability in warm climates. Features a laid-back Cuban camp collar and shell buttons.',
    features: [
      '100% French Normandy linen',
      'Pre-washed for instant softness and relaxed texture',
      'Box pleat back yoke for easy mobility'
    ],
    colors: [
      { name: 'Sage Green', hex: '#84CC16' },
      { name: 'White Sand', hex: '#F3F4F6' },
      { name: 'Sky Azure', hex: '#38BDF8' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    sku: 'ZAR-LIN-SHRT',
  },

  // 20B. Luxury Wool Trench Coat
  {
    id: 'minimalist-wool-trench',
    name: 'Tailored Italian Double-Breasted Wool Trench',
    brand: 'Atelier Nova',
    category: 'fashion',
    subcategory: "Outerwear",
    price: 6999,
    originalPrice: 9999,
    discount: 30,
    rating: 4.9,
    reviewCount: 642,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
    ],
    description: 'Masterfully structured from an Italian double-faced wool blend. Designed with exaggerated storm flaps, belted waist, and a flowing calf-length silhouette.',
    features: [
      '80% Virgin Wool, 20% Cashmere blend',
      'Double-breasted horn button closure',
      'Matching tie belt with metal buckle',
      'Deep welt storm pockets and back vent'
    ],
    colors: [
      { name: 'Camel Tan', hex: '#C29B38' },
      { name: 'Midnight Onyx', hex: '#0F172A' },
      { name: 'Charcoal Heather', hex: '#334155' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: true,
    sku: 'NOV-TRN-CAM',
  },

  // 20C. Japanese Wide-Leg Pleated Trousers
  {
    id: 'japanese-pleated-trousers',
    name: 'Japanese Relaxed Wide-Leg Pleated Trousers',
    brand: 'Kuro Studio',
    category: 'fashion',
    subcategory: "Bottoms",
    price: 2799,
    originalPrice: 3899,
    discount: 28,
    rating: 4.7,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    ],
    description: 'Engineered with double front pleats and a relaxed drape from high-density Japanese twill. Delivers contemporary tailoring with relaxed daily mobility.',
    features: [
      'Japanese Cotton-Poly Microtwill',
      'Deep double forward pleats',
      'Internal drawstring with belt loops',
      'Slight taper towards the hem'
    ],
    colors: [
      { name: 'Shadow Black', hex: '#1E293B' },
      { name: 'Olive Drab', hex: '#3F4E3C' },
      { name: 'Sand Khaki', hex: '#D6C7B2' }
    ],
    sizes: ['30', '32', '34', '36'],
    inStock: true,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    sku: 'KUR-TRS-BLK',
  },

  // 21. Sneakers: Adidas Sambas
  {
    id: 'adidas-samba-og',
    name: 'Adidas Samba OG Cloud White',
    brand: 'Adidas',
    category: 'sneakers',
    subcategory: 'Streetwear',
    price: 8999,
    originalPrice: 10999,
    discount: 18,
    rating: 4.9,
    reviewCount: 3890,
    image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Born on the pitch, adopted by skateparks and city streets worldwide. The Samba OG retains the signature suede T-toe, gum rubber sole, and serrated 3-Stripes.',
    features: [
      'Full grain leather upper with gritty suede overlays',
      'Soft synthetic leather lining',
      'Iconic low-profile gum rubber sole'
    ],
    colors: [
      { name: 'Cloud White / Core Black', hex: '#F9FAFB' },
      { name: 'Core Black / Gum', hex: '#111827' }
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    inStock: true,
    isTrending: true,
    isBestSeller: true,
    sku: 'ADI-SAM-WHT',
  },

  // 22. Home: Scented Soy Candle Set
  {
    id: 'aromatherapy-candle-trio',
    name: 'Artisan Amber Glass Soy Candle Trio',
    brand: 'Diptyque',
    category: 'home',
    subcategory: 'Home Decor',
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    rating: 4.8,
    reviewCount: 460,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Hand-poured 100% natural soy wax candles featuring lead-free crackling wooden wicks and essential oil notes of Cedarwood, Fig Leaf, and Warm Vanilla.',
    features: [
      'Up to 50 hours clean burn time per candle',
      'Re-usable apothecary amber glass vessels',
      'Non-toxic clean burn without soot'
    ],
    inStock: true,
    isTrending: false,
    isBestSeller: false,
    sku: 'DIP-CNDL-TRIO',
  },

  // 23. Accessories: Italian Leather Tote Bag
  {
    id: 'italian-leather-tote',
    name: 'Palermo Structured Leather Work Tote',
    brand: 'Cuyana',
    category: 'accessories',
    subcategory: 'Bags',
    price: 14999,
    originalPrice: 18999,
    discount: 21,
    rating: 4.9,
    reviewCount: 610,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Crafted in Tuscany from certified Italian pebbled leather. Features micro-suede lining, internal laptop sleeve, and sturdy top handles that rest comfortably on the shoulder.',
    features: [
      'Full-grain Italian pebbled leather',
      'Fits up to 15-inch laptop',
      'Interior zippered safety pocket and key leash'
    ],
    colors: [
      { name: 'Caramel Tan', hex: '#B45309' },
      { name: 'Noir Black', hex: '#111827' },
      { name: 'Olive Green', hex: '#3F6212' }
    ],
    inStock: true,
    isTrending: true,
    isBestSeller: true,
    sku: 'CUY-TOTE-TAN',
  },

  // 24. Gadgets: Kindle Paperwhite
  {
    id: 'kindle-paperwhite-16gb',
    name: 'Kindle Paperwhite Signature Edition (16GB)',
    brand: 'Amazon',
    category: 'gadgets',
    subcategory: 'E-Readers',
    price: 13999,
    originalPrice: 15999,
    discount: 13,
    rating: 4.8,
    reviewCount: 5200,
    image: 'https://images.unsplash.com/photo-1592496001020-d31bd830651f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1592496001020-d31bd830651f?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Features a 6.8” glare-free display with adjustable warm light, auto-adjusting light sensor, wireless charging, and up to 10 weeks of battery life on a single charge.',
    features: [
      '300 ppi glare-free screen reads like real paper',
      'IPX8 waterproof rated for beach or bath reading',
      'USB-C and wireless charging compatible'
    ],
    colors: [
      { name: 'Agate Green', hex: '#166534' },
      { name: 'Black', hex: '#111827' }
    ],
    inStock: true,
    isTrending: false,
    isBestSeller: true,
    sku: 'AMZ-KNDL-SIG',
  },

  // 25. Beauty: Hydrating Peptide Lip Oil
  {
    id: 'peptide-lip-treatment',
    name: 'Glow Peptide Hydrating Lip Treatment',
    brand: 'Rhode',
    category: 'beauty',
    subcategory: 'Lip Care',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.7,
    reviewCount: 1840,
    image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'A restorative lip treatment that naturally plumps, softens, and hydrates dry lips with peptides, babassu, and shea butter. High-shine glossy finish without stickiness.',
    features: [
      'Rich peptide complex naturally plumps fine lines',
      'Shea butter locks in moisture for 8 hours',
      'Subtle salted caramel & watermelon tints'
    ],
    inStock: true,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    sku: 'RHD-LIP-TRT',
  }
];

export const products: Product[] = rawProducts.map((p) => ({
  ...p,
  images: getConsistentProductViews(p.image),
}));
