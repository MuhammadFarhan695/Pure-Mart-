export const initialCategories = [
  { id: 'cat-1', name: 'Handbags', icon: 'ShoppingBag', count: 18, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80' },
  { id: 'cat-2', name: 'Jewelry', icon: 'Sparkles', count: 24, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80' },
  { id: 'cat-3', name: 'Sunglasses', icon: 'Glasses', count: 12, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80' },
  { id: 'cat-4', name: 'Perfume', icon: 'Flame', count: 15, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80' },
  { id: 'cat-5', name: 'Accessories', icon: 'Watch', count: 30, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' },
  { id: 'cat-6', name: 'Footwear', icon: 'Footprints', count: 16, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80' }
];

export const initialProducts = [
  {
    id: 'prod-1',
    name: 'Bella Rose Quilted Crossbody Bag',
    category: 'Handbags',
    price: 129,
    originalPrice: 189,
    discountPercent: 32,
    rating: 4.9,
    reviewCount: 48,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    stock: 14,
    sku: 'BEL-BAG-001',
    colors: [
      { name: 'Dusty Rose', hex: '#E8B4B8', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80' },
      { name: 'Cream Ivory', hex: '#FFFDD0', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80' },
      { name: 'Onyx Black', hex: '#1F2937', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Crafted from premium vegan lambskin leather, the Bella Rose Quilted Crossbody Bag features custom gold-tone hardware, a luxurious plush interior, and an adjustable chain strap. Designed to seamlessly transition from desk to evening gala.',
    features: [
      '100% Ultra-Soft Vegan Leather',
      'Custom 18k Rose Gold-Plated Chain Hardware',
      'Magnetic flap closure with dual interior slip pockets',
      'Includes signature Bella Store velvet dust bag',
      'Dimensions: 9.5" W x 6.2" H x 3.1" D'
    ],
    reviews: [
      { id: 'rev-1', name: 'Sophia L.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80', rating: 5, date: 'May 12, 2026', comment: 'Absolutely breathtaking! The leather quality is so soft and luxurious. Received so many compliments at brunch!', verified: true },
      { id: 'rev-2', name: 'Emma Watson', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', rating: 5, date: 'April 28, 2026', comment: 'The rose gold hardware gives it an ultra-expensive look. Fast shipping and gorgeous pink packaging.', verified: true }
    ]
  },
  {
    id: 'prod-2',
    name: 'Aura 18K Gold Pearl Drop Earrings',
    category: 'Jewelry',
    price: 79,
    originalPrice: 110,
    discountPercent: 28,
    rating: 4.8,
    reviewCount: 36,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    stock: 22,
    sku: 'BEL-JWL-002',
    colors: [
      { name: 'Pearl Gold', hex: '#E5C158', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80' },
      { name: 'Rose Gold', hex: '#B76E79', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Elevate any look with our handcrafted Aura Freshwater Pearl Drop Earrings. Featuring 18k gold-dipped brass and ethically harvested baroque freshwater pearls with high luster shine.',
    features: [
      'Handpicked Natural Baroque Freshwater Pearls',
      '18K Solid Gold Plating over Hypoallergenic Brass',
      'Lightweight design for all-day comfort',
      'Tarnish-resistant finish',
      'Handmade in limited boutique batches'
    ],
    reviews: [
      { id: 'rev-3', name: 'Olivia Martinez', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80', rating: 5, date: 'June 4, 2026', comment: 'Stunning pearls! Lightweight and hypoallergenic. Perfect for date night.', verified: true }
    ]
  },
  {
    id: 'prod-3',
    name: 'Parisienne Oversized Vintage Sunglasses',
    category: 'Sunglasses',
    price: 65,
    originalPrice: 95,
    discountPercent: 31,
    rating: 4.7,
    reviewCount: 29,
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    stock: 18,
    sku: 'BEL-SUN-003',
    colors: [
      { name: 'Honey Tortoise', hex: '#8B5A2B', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80' },
      { name: 'Rose Tint', hex: '#F472B6', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80' },
      { name: 'Classic Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Chic, oversized square silhouette inspired by 1970s Parisian Riviera glamour. Features UV400 anti-glare polarized lenses and hand-polished acetate frames.',
    features: [
      '100% UV400 Protection Lenses',
      'Scratch-resistant polycarbonate coating',
      'Hand-carved premium acetate frame',
      'Includes signature pink leather magnetic case',
      'Lens Width: 56mm | Bridge: 18mm | Temple: 145mm'
    ],
    reviews: [
      { id: 'rev-4', name: 'Chloe Bennett', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80', rating: 5, date: 'June 18, 2026', comment: 'The frame shape makes any outfit look high fashion instantly. 10/10 recommendation!', verified: true }
    ]
  },
  {
    id: 'prod-4',
    name: 'Elixir de Rose Eau de Parfum (100ml)',
    category: 'Perfume',
    price: 145,
    originalPrice: 195,
    discountPercent: 25,
    rating: 5.0,
    reviewCount: 62,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    stock: 9,
    sku: 'BEL-PRF-004',
    colors: [
      { name: 'Crystal Pink', hex: '#FBCFE8', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An intoxicating floral melody of Damask rose petals, subtle pink pepper, velvety vanilla, and warm white amber. Encased in a heavy crystal glass flacon topped with a blush ribbon.',
    features: [
      'Top Notes: Damask Rose, Italian Bergamot, Pink Pepper',
      'Heart Notes: Bulgarian Rose, Peony, Jasmine Sambac',
      'Base Notes: Bourbon Vanilla, Cashmere Wood, White Musk',
      'Long-lasting 12+ hour fragrance hold',
      'Sustainably sourced botanical ingredients'
    ],
    reviews: [
      { id: 'rev-5', name: 'Victoria Thorne', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80', rating: 5, date: 'July 1, 2026', comment: 'My new signature scent! Warm, sensual, yet fresh. Lasts all day on my silk scarves.', verified: true }
    ]
  },
  {
    id: 'prod-5',
    name: 'Monaco Minimalist Rose Gold Mesh Watch',
    category: 'Accessories',
    price: 115,
    originalPrice: 160,
    discountPercent: 28,
    rating: 4.9,
    reviewCount: 39,
    isFeatured: false,
    isNew: true,
    isBestSeller: true,
    stock: 15,
    sku: 'BEL-WTC-005',
    colors: [
      { name: 'Rose Gold', hex: '#E0A96D', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' },
      { name: 'Silver Slate', hex: '#CBD5E1', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An ultra-slim 32mm minimalist timepiece crafted with Japanese Quartz movement, mother of pearl dial, and quick-release stainless steel mesh strap.',
    features: [
      'Japanese Miyota Precision Quartz Movement',
      'Natural Mother-of-Pearl Dial with Crystal Markers',
      '3 ATM Water Resistant',
      'Scratch-resistant Sapphire Crystal Glass',
      'Quick-release interchangeable mesh strap'
    ],
    reviews: [
      { id: 'rev-6', name: 'Hannah G.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', rating: 5, date: 'June 10, 2026', comment: 'Sleek, elegant, and fits my wrist perfectly.', verified: true }
    ]
  },
  {
    id: 'prod-6',
    name: 'Valentina Stiletto Pointed-Toe Heel',
    category: 'Footwear',
    price: 159,
    originalPrice: 220,
    discountPercent: 27,
    rating: 4.8,
    reviewCount: 31,
    isFeatured: true,
    isNew: false,
    isBestSeller: false,
    stock: 11,
    sku: 'BEL-SHO-006',
    colors: [
      { name: 'Blush Satin', hex: '#F472B6', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80' },
      { name: 'Nude Patent', hex: '#E5D0C3', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Designed in Milan, the Valentina Stiletto features a sleek 90mm heel, cushioned memory foam footbed, and crystal rhinestone ankle buckle.',
    features: [
      'Italian Silk Satin Upper',
      '90mm (3.5 inch) slim heel',
      'Dual-layer cloud memory foam cushioning',
      'Non-slip leather outsole',
      'Crystal accented buckle closure'
    ],
    reviews: [
      { id: 'rev-7', name: 'Isabelle K.', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80', rating: 5, date: 'July 14, 2026', comment: 'Unbelievably comfortable for a 3.5-inch heel! Wore them for 6 hours straight.', verified: true }
    ]
  },
  {
    id: 'prod-7',
    name: 'Seraphina 100% Pure Mulberry Silk Scarf',
    category: 'Accessories',
    price: 58,
    originalPrice: 85,
    discountPercent: 31,
    rating: 4.9,
    reviewCount: 22,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    stock: 25,
    sku: 'BEL-SCF-007',
    colors: [
      { name: 'Floral Blush', hex: '#FCE7F3', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '100% Grade 6A Mulberry Silk square scarf with hand-rolled edges. Perfect as a hair wrap, necktie, or handbag accent.',
    features: [
      '100% Top-Grade 19 Momme Mulberry Silk',
      'Hand-rolled and hand-stitched borders',
      'Hypoallergenic and ultra-soft',
      'Dimensions: 35" x 35" (90cm x 90cm)'
    ],
    reviews: [
      { id: 'rev-8', name: 'Amelia R.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80', rating: 5, date: 'July 5, 2026', comment: 'Silky smooth with vibrant pastel tones. Tied it around my tote bag and got instant compliments!', verified: true }
    ]
  },
  {
    id: 'prod-8',
    name: 'Celestial Diamond Cut Tennis Bracelet',
    category: 'Jewelry',
    price: 98,
    originalPrice: 140,
    discountPercent: 30,
    rating: 5.0,
    reviewCount: 41,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    stock: 19,
    sku: 'BEL-JWL-008',
    colors: [
      { name: 'Silver Sparkle', hex: '#E2E8F0', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Featuring 4mm AAA grade cubic zirconia stones hand-set in sterling silver with double safety latch clasp.',
    features: [
      '4mm AAA Diamond-Cut Cubic Zirconia',
      'Solid Sterling Silver with Rhodium Coating',
      'Double safety box clasp',
      'Length: 7 inches (18cm)'
    ],
    reviews: [
      { id: 'rev-9', name: 'Grace Taylor', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', rating: 5, date: 'July 19, 2026', comment: 'Looks exactly like real diamonds! The catch lock is very secure.', verified: true }
    ]
  }
];

export const reviewsList = [
  {
    id: 'r-101',
    name: 'Charlotte Vance',
    role: 'Fashion Influencer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    title: 'Unmatched Luxury & Packaging',
    content: 'Bella Store is my go-to for accent fashion pieces. The pink luxury packaging alone makes opening every order feel like a special event!',
    product: 'Bella Rose Quilted Crossbody Bag'
  },
  {
    id: 'r-102',
    name: 'Eleanor Vance',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    title: 'Exceeded Every Expectation',
    content: 'The pearl drop earrings and perfume are divine. Fast 2-day delivery and customer service was so helpful when I had a question.',
    product: 'Aura 18K Gold Pearl Drop Earrings'
  },
  {
    id: 'r-103',
    name: 'Gabriella Rossi',
    role: 'Stylist & Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    title: 'Boutique Quality at Honest Prices',
    content: 'The craftsmanship on the leather bags and gold jewelry rivals designer labels costing 5x as much. Will be buying more for my clients!',
    product: 'Parisienne Oversized Vintage Sunglasses'
  }
];

export const instagramPosts = [
  { id: 1, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', likes: '2.4k', handle: '@bellastore_official' },
  { id: 2, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80', likes: '1.8k', handle: '@bellastore_official' },
  { id: 3, image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=600&q=80', likes: '3.1k', handle: '@bellastore_official' },
  { id: 4, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80', likes: '4.2k', handle: '@bellastore_official' },
  { id: 5, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80', likes: '2.9k', handle: '@bellastore_official' },
  { id: 6, image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80', likes: '3.7k', handle: '@bellastore_official' }
];

export const initialOrders = [
  {
    id: 'ORD-98421',
    customerName: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Beverly Hills, CA 90210',
    date: '2026-07-23',
    items: [
      { id: 'prod-1', name: 'Bella Rose Quilted Crossbody Bag', price: 129, quantity: 1, color: 'Dusty Rose', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80' },
      { id: 'prod-2', name: 'Aura 18K Gold Pearl Drop Earrings', price: 79, quantity: 1, color: 'Pearl Gold', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80' }
    ],
    subtotal: 208,
    discount: 20.8,
    shipping: 0,
    total: 187.20,
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered',
    notes: 'Please leave in front porch box.'
  },
  {
    id: 'ORD-98422',
    customerName: 'Amanda Ray',
    email: 'amanda.r@example.com',
    phone: '+1 (555) 876-5432',
    address: '100 Fifth Avenue, New York, NY 10011',
    date: '2026-07-24',
    items: [
      { id: 'prod-4', name: 'Elixir de Rose Eau de Parfum (100ml)', price: 145, quantity: 1, color: 'Crystal Pink', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80' }
    ],
    subtotal: 145,
    discount: 0,
    shipping: 10,
    total: 155.00,
    paymentMethod: 'Credit Card',
    status: 'Processing',
    notes: 'Gift wrap requested.'
  }
];

export const validCoupons = {
  'BELLA10': 0.10,
  'LUXURY20': 0.20,
  'WELCOME15': 0.15
};
