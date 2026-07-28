import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RefreshCw,
  Headphones,
  Star,
  Camera,
  Mail,
  CheckCircle2,
  Heart,
  TrendingUp,
  Award,
  ChevronRight
} from 'lucide-react';
import { instagramPosts, reviewsList } from '../data/mockData';

export const HomePage = () => {
  const { products, categories, navigateTo, setSelectedCategory, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    showToast('✨ Thank you for subscribing! Your 15% OFF gift code is WELCOME15');
    setNewsletterEmail('');
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-12">
      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-linear-to-b from-pink-50/80 via-white to-white pt-8 pb-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
              <div className="inline-flex items-center space-x-2 bg-pink-100/80 border border-pink-200 text-pink-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>New Summer Couture Collection 2026</span>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15] tracking-tight">
                Elevate Your Style with <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-600 via-pink-500 to-rose-400">
                  Bella Collection
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Trendy Fashion Accessories at Affordable Prices. Unveil your inner radiance with handcrafted jewelry, Italian leather handbags, and statement eyewear.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    navigateTo('shop');
                  }}
                  className="w-full sm:w-auto bg-linear-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-sm tracking-wide"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('about')}
                  className="w-full sm:w-auto bg-white hover:bg-pink-50 text-slate-700 border border-slate-200 hover:border-pink-200 font-semibold px-8 py-4 rounded-full transition text-sm tracking-wide"
                >
                  Explore Brand Story
                </button>
              </div>

              {/* Brand Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-pink-100 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <p className="font-serif-luxury text-2xl font-bold text-slate-900">50K+</p>
                  <p className="text-xs text-slate-500">Happy Clients</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="font-serif-luxury text-2xl font-bold text-slate-900">4.9★</p>
                  <p className="text-xs text-slate-500">Customer Rating</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="font-serif-luxury text-2xl font-bold text-slate-900">100%</p>
                  <p className="text-xs text-slate-500">Authentic Style</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Card */}
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-4/5">
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
                    alt="Bella Collection Hero"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-pink-950/60 via-transparent to-transparent"></div>

                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-xl">
                    <p className="text-xs font-bold text-pink-600 uppercase tracking-widest">
                      Featured Design
                    </p>
                    <p className="font-serif-luxury text-lg font-bold text-slate-900">
                      Bella Rose Quilted Crossbody
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-bold text-pink-700">$129.00</span>
                      <button
                        onClick={() => navigateTo('product-details', 'prod-1')}
                        className="text-xs font-semibold text-slate-800 hover:text-pink-600 flex items-center space-x-1"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Decorative Glass Cards */}
                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-pink-100 shadow-xl hidden sm:flex items-center space-x-3 animate-float">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Trending Choice</p>
                    <p className="text-[11px] text-slate-500">2,400+ Wishlisted this week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-pink-600 text-xs font-bold uppercase tracking-widest">
            Curated Selections
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
            Shop by Category
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Explore our artisanal luxury categories crafted to complement every wardrobe.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.name);
                navigateTo('shop');
              }}
              className="group relative rounded-3xl overflow-hidden aspect-3/4 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-pink-100"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-pink-950/80 via-pink-950/20 to-transparent"></div>

              <div className="absolute bottom-4 left-3 right-3 text-center text-white">
                <h3 className="font-serif-luxury text-base font-bold tracking-wide">{cat.name}</h3>
                <p className="text-[11px] text-pink-200 mt-0.5">{cat.count || 12}+ Items</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-pink-600 text-xs font-bold uppercase tracking-widest">
              Editor's Choice
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold text-slate-900 mt-1">
              Featured Products
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              navigateTo('shop');
            }}
            className="text-pink-600 hover:text-pink-700 text-sm font-semibold flex items-center space-x-1 mt-3 md:mt-0"
          >
            <span>Explore All Featured</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* PROMOTIONAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-pink-900 via-pink-800 to-rose-950 text-white p-8 md:p-14 shadow-2xl border border-pink-700/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center z-10 relative">
            <div className="space-y-4">
              <span className="bg-pink-500/30 text-pink-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest border border-pink-400/30">
                Limited Edition Release
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold leading-tight">
                The Rose Gold Atelier Series
              </h2>
              <p className="text-pink-100 text-sm sm:text-base leading-relaxed">
                Handcrafted 18K rose gold-dipped jewelry sets paired with velvet travel pouches. Use discount promo code <strong className="text-white underline">LUXURY20</strong> to unlock 20% off at checkout.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('Jewelry');
                  navigateTo('shop');
                }}
                className="bg-white text-pink-900 hover:bg-pink-50 font-bold px-8 py-3.5 rounded-full shadow-lg text-xs uppercase tracking-wider transition"
              >
                Claim 20% OFF Collection
              </button>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
                alt="Rose Gold Series"
                className="w-72 h-72 sm:w-80 sm:h-80 rounded-2xl object-cover shadow-2xl border-4 border-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-pink-600 text-xs font-bold uppercase tracking-widest">
              Fresh Off The Atelier
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold text-slate-900 mt-1">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              navigateTo('shop');
            }}
            className="text-pink-600 hover:text-pink-700 text-sm font-semibold flex items-center space-x-1 mt-3 md:mt-0"
          >
            <span>View Newest Arrivals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-pink-600 text-xs font-bold uppercase tracking-widest">
              Most Loved By You
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold text-slate-900 mt-1">
              Best Sellers
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              navigateTo('shop');
            }}
            className="text-pink-600 hover:text-pink-700 text-sm font-semibold flex items-center space-x-1 mt-3 md:mt-0"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-pink-50/60 py-16 border-y border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-pink-600 text-xs font-bold uppercase tracking-widest">
              The Bella Promise
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold text-slate-900 mt-1">
              Why Choose Us
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              We redefine modern luxury with uncompromising quality, ethical sourcing, and white-glove customer care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm text-center hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-slate-900 mb-2">
                Premium Atelier Quality
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hand-crafted with 100% vegan lambskin, 18k gold dipped metals, and pure silk fabrics.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm text-center hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-4">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-slate-900 mb-2">
                Free Express Shipping
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Complimentary 2-day express shipping on all domestic orders over $150.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm text-center hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-7 h-7" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-slate-900 mb-2">
                30-Day Effortless Returns
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Try at home with zero risk. Pre-paid shipping labels included in every box.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm text-center hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-7 h-7" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-slate-900 mb-2">
                24/7 Personal Stylist
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Connect directly with our fashion consultants for personalized style advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-pink-600 text-xs font-bold uppercase tracking-widest">
            Client Testimonials
          </span>
          <h2 className="font-serif-luxury text-3xl font-bold text-slate-900 mt-1">
            Loved by Fashion Lovers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-8 rounded-3xl border border-pink-100 shadow-sm relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-1 text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h3 className="font-serif-luxury text-base font-bold text-slate-900 mb-2">
                  "{rev.title}"
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed italic mb-6">
                  "{rev.content}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-pink-200"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900">{rev.name}</p>
                  <p className="text-[10px] text-pink-600 font-semibold">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSTAGRAM GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 text-pink-600 text-xs font-bold uppercase tracking-widest mb-1">
            <Camera className="w-4 h-4" />
            <span>@bellastore_official</span>
          </div>
          <h2 className="font-serif-luxury text-3xl font-bold text-slate-900">
            Follow Us On Instagram
          </h2>
          <p className="text-slate-500 text-sm mt-1">Tag #BellaStyle to be featured on our official page.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="group relative rounded-2xl overflow-hidden aspect-square border border-pink-100"
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-pink-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white space-x-1.5 text-xs font-bold">
                <Heart className="w-4 h-4 fill-current text-pink-400" />
                <span>{post.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER SUBSCRIPTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-linear-to-r from-pink-100 via-pink-50 to-pink-100 p-8 sm:p-14 border border-pink-200 text-center relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-pink-600 text-white flex items-center justify-center mx-auto shadow-md shadow-pink-200">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="font-serif-luxury text-3xl font-bold text-slate-900">
              Unlock 15% OFF Your First Purchase
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Subscribe to the Bella Newsletter to receive VIP early access to new arrivals, luxury lookbooks, and exclusive secret sales.
            </p>

            {newsletterSubscribed ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Subscribed! Use Code WELCOME15 for 15% OFF at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1 bg-white border border-pink-200 focus:border-pink-500 rounded-full px-5 py-3 text-xs font-medium focus:outline-none shadow-inner"
                />
                <button
                  type="submit"
                  className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-7 py-3 rounded-full text-xs uppercase tracking-wider transition shadow-md shadow-pink-200"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
