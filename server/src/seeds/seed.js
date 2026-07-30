import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import pool from '../config/db.js';

dotenv.config();

/**
 * Seed script — populates database with initial data matching the frontend mock data.
 * Run: npm run seed
 */

const seedDatabase = async () => {
  console.log('🌱 Starting Bella Store database seed...\n');

  try {
    // ── 1. Seed Admin + Default User ──────────────────────────────────
    console.log('👤 Creating users...');
    const adminPassword = await bcrypt.hash('bella123', 12);
    const userPassword = await bcrypt.hash('farhan123', 12);

    await pool.execute(
      `INSERT IGNORE INTO users (name, email, password, phone, address, role)
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['Bella Admin', 'admin@bellastore.com', adminPassword, '+1 (800) 555-2355', '742 Evergreen Terrace, Beverly Hills, CA 90210', 'admin']
    );

    await pool.execute(
      `INSERT IGNORE INTO users (name, email, password, phone, address, role)
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['Muhammad Farhan', 'farhanabc43@gmail.com', userPassword, '+92 300 1234567', 'Nazimabad No. 2, Printing Market, Near Fancy Paper Shop, Karachi.', 'customer']
    );
    console.log('  ✅ Admin (admin@bellastore.com / bella123)');
    console.log('  ✅ Customer (farhanabc43@gmail.com / farhan123)\n');

    // ── 2. Seed Categories ────────────────────────────────────────────
    console.log('📂 Creating categories...');
    const categories = [
      ['Handbags', 'ShoppingBag', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'],
      ['Jewelry', 'Sparkles', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'],
      ['Sunglasses', 'Glasses', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'],
      ['Perfume', 'Flame', 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80'],
      ['Accessories', 'Watch', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
      ['Footwear', 'Footprints', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80'],
    ];

    for (const [name, icon, image] of categories) {
      await pool.execute(
        'INSERT IGNORE INTO categories (name, icon, image) VALUES (?, ?, ?)',
        [name, icon, image]
      );
    }
    console.log(`  ✅ ${categories.length} categories created\n`);

    // ── 3. Seed Products ──────────────────────────────────────────────
    console.log('🛍️  Creating products...');
    const products = [
      {
        name: 'Bella Rose Quilted Crossbody Bag', category: 'Handbags',
        price: 129, originalPrice: 189, discount: 32, rating: 4.9, reviewCount: 48,
        featured: true, isNew: true, bestSeller: true, stock: 14, sku: 'BEL-BAG-001',
        description: 'Crafted from premium vegan lambskin leather, the Bella Rose Quilted Crossbody Bag features custom gold-tone hardware, a luxurious plush interior, and an adjustable chain strap.',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80',
        ]),
        colors: JSON.stringify([
          { name: 'Dusty Rose', hex: '#E8B4B8', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80' },
          { name: 'Cream Ivory', hex: '#FFFDD0', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80' },
          { name: 'Onyx Black', hex: '#1F2937', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80' },
        ]),
        features: JSON.stringify(['100% Ultra-Soft Vegan Leather', 'Custom 18k Rose Gold-Plated Chain Hardware', 'Magnetic flap closure with dual interior slip pockets', 'Includes signature Bella Store velvet dust bag', 'Dimensions: 9.5" W x 6.2" H x 3.1" D']),
      },
      {
        name: 'Aura 18K Gold Pearl Drop Earrings', category: 'Jewelry',
        price: 79, originalPrice: 110, discount: 28, rating: 4.8, reviewCount: 36,
        featured: true, isNew: false, bestSeller: true, stock: 22, sku: 'BEL-JWL-002',
        description: 'Elevate any look with our handcrafted Aura Freshwater Pearl Drop Earrings. Featuring 18k gold-dipped brass and ethically harvested baroque freshwater pearls.',
        images: JSON.stringify(['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80']),
        colors: JSON.stringify([{ name: 'Pearl Gold', hex: '#E5C158', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80' }, { name: 'Rose Gold', hex: '#B76E79', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80' }]),
        features: JSON.stringify(['Handpicked Natural Baroque Freshwater Pearls', '18K Solid Gold Plating over Hypoallergenic Brass', 'Lightweight design for all-day comfort', 'Tarnish-resistant finish', 'Handmade in limited boutique batches']),
      },
      {
        name: 'Parisienne Oversized Vintage Sunglasses', category: 'Sunglasses',
        price: 65, originalPrice: 95, discount: 31, rating: 4.7, reviewCount: 29,
        featured: true, isNew: true, bestSeller: false, stock: 18, sku: 'BEL-SUN-003',
        description: 'Chic, oversized square silhouette inspired by 1970s Parisian Riviera glamour. Features UV400 anti-glare polarized lenses.',
        images: JSON.stringify(['https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=80']),
        colors: JSON.stringify([{ name: 'Honey Tortoise', hex: '#8B5A2B', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80' }, { name: 'Rose Tint', hex: '#F472B6', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80' }, { name: 'Classic Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80' }]),
        features: JSON.stringify(['100% UV400 Protection Lenses', 'Scratch-resistant polycarbonate coating', 'Hand-carved premium acetate frame', 'Includes signature pink leather magnetic case']),
      },
      {
        name: 'Elixir de Rose Eau de Parfum (100ml)', category: 'Perfume',
        price: 145, originalPrice: 195, discount: 25, rating: 5.0, reviewCount: 62,
        featured: true, isNew: false, bestSeller: true, stock: 9, sku: 'BEL-PRF-004',
        description: 'An intoxicating floral melody of Damask rose petals, subtle pink pepper, velvety vanilla, and warm white amber.',
        images: JSON.stringify(['https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80']),
        colors: JSON.stringify([{ name: 'Crystal Pink', hex: '#FBCFE8', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80' }]),
        features: JSON.stringify(['Top Notes: Damask Rose, Italian Bergamot, Pink Pepper', 'Heart Notes: Bulgarian Rose, Peony, Jasmine Sambac', 'Base Notes: Bourbon Vanilla, Cashmere Wood, White Musk', 'Long-lasting 12+ hour fragrance hold']),
      },
      {
        name: 'Monaco Minimalist Rose Gold Mesh Watch', category: 'Accessories',
        price: 115, originalPrice: 160, discount: 28, rating: 4.9, reviewCount: 39,
        featured: false, isNew: true, bestSeller: true, stock: 15, sku: 'BEL-WTC-005',
        description: 'An ultra-slim 32mm minimalist timepiece crafted with Japanese Quartz movement, mother of pearl dial.',
        images: JSON.stringify(['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80']),
        colors: JSON.stringify([{ name: 'Rose Gold', hex: '#E0A96D', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' }, { name: 'Silver Slate', hex: '#CBD5E1', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80' }]),
        features: JSON.stringify(['Japanese Miyota Precision Quartz Movement', 'Natural Mother-of-Pearl Dial', '3 ATM Water Resistant', 'Scratch-resistant Sapphire Crystal Glass']),
      },
      {
        name: 'Valentina Stiletto Pointed-Toe Heel', category: 'Footwear',
        price: 159, originalPrice: 220, discount: 27, rating: 4.8, reviewCount: 31,
        featured: true, isNew: false, bestSeller: false, stock: 11, sku: 'BEL-SHO-006',
        description: 'Designed in Milan, the Valentina Stiletto features a sleek 90mm heel, cushioned memory foam footbed.',
        images: JSON.stringify(['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80']),
        colors: JSON.stringify([{ name: 'Blush Satin', hex: '#F472B6', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80' }, { name: 'Nude Patent', hex: '#E5D0C3', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80' }]),
        features: JSON.stringify(['Italian Silk Satin Upper', '90mm slim heel', 'Dual-layer cloud memory foam cushioning', 'Non-slip leather outsole']),
      },
      {
        name: 'Seraphina 100% Pure Mulberry Silk Scarf', category: 'Accessories',
        price: 58, originalPrice: 85, discount: 31, rating: 4.9, reviewCount: 22,
        featured: false, isNew: true, bestSeller: false, stock: 25, sku: 'BEL-SCF-007',
        description: '100% Grade 6A Mulberry Silk square scarf with hand-rolled edges.',
        images: JSON.stringify(['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80']),
        colors: JSON.stringify([{ name: 'Floral Blush', hex: '#FCE7F3', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80' }]),
        features: JSON.stringify(['100% Top-Grade 19 Momme Mulberry Silk', 'Hand-rolled and hand-stitched borders', 'Hypoallergenic and ultra-soft']),
      },
      {
        name: 'Celestial Diamond Cut Tennis Bracelet', category: 'Jewelry',
        price: 98, originalPrice: 140, discount: 30, rating: 5.0, reviewCount: 41,
        featured: true, isNew: false, bestSeller: true, stock: 19, sku: 'BEL-JWL-008',
        description: 'Featuring 4mm AAA grade cubic zirconia stones hand-set in sterling silver.',
        images: JSON.stringify(['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80']),
        colors: JSON.stringify([{ name: 'Silver Sparkle', hex: '#E2E8F0', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80' }]),
        features: JSON.stringify(['4mm AAA Diamond-Cut Cubic Zirconia', 'Solid Sterling Silver with Rhodium Coating', 'Double safety box clasp', 'Length: 7 inches (18cm)']),
      },
    ];

    for (const p of products) {
      const [cats] = await pool.execute('SELECT id FROM categories WHERE name = ?', [p.category]);
      const catId = cats.length > 0 ? cats[0].id : null;

      await pool.execute(
        `INSERT IGNORE INTO products (name, category_id, category_name, price, original_price, discount_percent, rating, review_count, is_featured, is_new, is_best_seller, stock, sku, description, images, colors, features)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.name, catId, p.category, p.price, p.originalPrice, p.discount, p.rating, p.reviewCount, p.featured, p.isNew, p.bestSeller, p.stock, p.sku, p.description, p.images, p.colors, p.features]
      );
    }
    console.log(`  ✅ ${products.length} products created\n`);

    // ── 4. Seed Reviews ───────────────────────────────────────────────
    console.log('⭐ Creating reviews...');
    const [prodRows] = await pool.execute('SELECT id, sku FROM products');
    const prodMap = {};
    for (const r of prodRows) prodMap[r.sku] = r.id;

    const reviews = [
      { sku: 'BEL-BAG-001', name: 'Sophia L.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80', rating: 5, comment: 'Absolutely breathtaking! The leather quality is so soft and luxurious.' },
      { sku: 'BEL-BAG-001', name: 'Emma Watson', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', rating: 5, comment: 'The rose gold hardware gives it an ultra-expensive look. Fast shipping.' },
      { sku: 'BEL-JWL-002', name: 'Olivia Martinez', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80', rating: 5, comment: 'Stunning pearls! Lightweight and hypoallergenic.' },
      { sku: 'BEL-SUN-003', name: 'Chloe Bennett', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80', rating: 5, comment: 'The frame shape makes any outfit look high fashion.' },
      { sku: 'BEL-PRF-004', name: 'Victoria Thorne', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80', rating: 5, comment: 'My new signature scent! Warm, sensual, yet fresh.' },
      { sku: 'BEL-WTC-005', name: 'Hannah G.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', rating: 5, comment: 'Sleek, elegant, and fits my wrist perfectly.' },
      { sku: 'BEL-SHO-006', name: 'Isabelle K.', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80', rating: 5, comment: 'Unbelievably comfortable for a 3.5-inch heel!' },
      { sku: 'BEL-SCF-007', name: 'Amelia R.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80', rating: 5, comment: 'Silky smooth with vibrant pastel tones.' },
      { sku: 'BEL-JWL-008', name: 'Grace Taylor', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', rating: 5, comment: 'Looks exactly like real diamonds!' },
    ];

    for (const rev of reviews) {
      const productId = prodMap[rev.sku];
      if (productId) {
        await pool.execute(
          'INSERT INTO reviews (product_id, user_name, avatar, rating, comment, is_verified) VALUES (?, ?, ?, ?, ?, TRUE)',
          [productId, rev.name, rev.avatar, rev.rating, rev.comment]
        );
      }
    }
    console.log(`  ✅ ${reviews.length} reviews created\n`);

    // ── 5. Seed Coupons ───────────────────────────────────────────────
    console.log('🎟️  Creating coupons...');
    const coupons = [
      ['BELLA10', 10],
      ['LUXURY20', 20],
      ['WELCOME15', 15],
    ];
    for (const [code, disc] of coupons) {
      await pool.execute('INSERT IGNORE INTO coupons (code, discount_percent) VALUES (?, ?)', [code, disc]);
    }
    console.log(`  ✅ ${coupons.length} coupons created\n`);

    // ── 6. Seed Sample Orders ─────────────────────────────────────────
    console.log('📦 Creating sample orders...');
    await pool.execute(
      `INSERT IGNORE INTO orders (order_code, customer_name, email, phone, address, subtotal, discount, shipping, total, payment_method, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ['ORD-98421', 'Sarah Jenkins', 'sarah.j@example.com', '+1 (555) 234-5678', '742 Evergreen Terrace, Beverly Hills, CA 90210', 208, 20.80, 0, 187.20, 'Cash on Delivery', 'Delivered', 'Please leave in front porch box.']
    );

    const [ord1] = await pool.execute('SELECT id FROM orders WHERE order_code = ?', ['ORD-98421']);
    if (ord1.length > 0) {
      const p1 = prodMap['BEL-BAG-001'];
      const p2 = prodMap['BEL-JWL-002'];
      await pool.execute('INSERT IGNORE INTO order_items (order_id, product_id, product_name, price, quantity, selected_color, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [ord1[0].id, p1 || null, 'Bella Rose Quilted Crossbody Bag', 129, 1, 'Dusty Rose', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80']);
      await pool.execute('INSERT IGNORE INTO order_items (order_id, product_id, product_name, price, quantity, selected_color, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [ord1[0].id, p2 || null, 'Aura 18K Gold Pearl Drop Earrings', 79, 1, 'Pearl Gold', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80']);
    }

    await pool.execute(
      `INSERT IGNORE INTO orders (order_code, customer_name, email, phone, address, subtotal, discount, shipping, total, payment_method, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ['ORD-98422', 'Amanda Ray', 'amanda.r@example.com', '+1 (555) 876-5432', '100 Fifth Avenue, New York, NY 10011', 145, 0, 10, 155.00, 'Credit Card', 'Processing', 'Gift wrap requested.']
    );

    const [ord2] = await pool.execute('SELECT id FROM orders WHERE order_code = ?', ['ORD-98422']);
    if (ord2.length > 0) {
      const p4 = prodMap['BEL-PRF-004'];
      await pool.execute('INSERT IGNORE INTO order_items (order_id, product_id, product_name, price, quantity, selected_color, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [ord2[0].id, p4 || null, 'Elixir de Rose Eau de Parfum (100ml)', 145, 1, 'Crystal Pink', 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80']);
    }

    console.log('  ✅ 2 sample orders created\n');

    console.log('═══════════════════════════════════════════════════');
    console.log('  🎉 Database seeded successfully!');
    console.log('═══════════════════════════════════════════════════');
    console.log('\nAdmin Login:');
    console.log('  Email: admin@bellastore.com');
    console.log('  Password: bella123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
