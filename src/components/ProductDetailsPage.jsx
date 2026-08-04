import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  CheckCircle2,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  Sparkles,
  UserCheck,
  Plus,
  MessageSquare
} from 'lucide-react';

export const ProductDetailsPage = () => {
  const { selectedProductId, products, addToCart, toggleWishlist, isInWishlist, navigateTo, showToast } = useShop();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'features' | 'reviews'

  // New review state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const isWishlisted = isInWishlist(product.id);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    navigateTo('checkout');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;
    const newRev = {
      id: `rev-${Date.now()}`,
      name: reviewName,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      rating: Number(reviewRating),
      date: 'Just now',
      comment: reviewComment,
      verified: true
    };
    if (!product.reviews) product.reviews = [];
    product.reviews.unshift(newRev);
    setShowReviewForm(false);
    setReviewName('');
    setReviewComment('');
    showToast('✨ Thank you! Your verified review has been submitted.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-slate-500">
        <span className="cursor-pointer hover:text-pink-600" onClick={() => navigateTo('home')}>Home</span>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="cursor-pointer hover:text-pink-600" onClick={() => navigateTo('shop')}>Shop</span>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-semibold text-slate-900 line-clamp-1">{product.name}</span>
      </div>

      {/* Main Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: Images Gallery & Zoom Preview */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/5 w-full rounded-3xl overflow-hidden bg-slate-50 border border-pink-100 shadow-sm group">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {product.discountPercent}% OFF
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition ${
                isWishlisted ? 'bg-pink-500 text-white' : 'bg-white/80 text-slate-700 hover:bg-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnails list */}
          {product.images.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition shrink-0 ${
                    activeImageIndex === idx ? 'border-pink-600 scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Options & Buy Form */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-pink-600 text-xs font-bold uppercase tracking-widest">
              {product.category}
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900 mt-1 mb-3">
              {product.name}
            </h1>

            {/* Rating & Stock */}
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`}
                  />
                ))}
              </div>
              <span className="font-bold text-slate-800">{product.rating}</span>
              <span className="text-slate-400">({product.reviewCount} customer reviews)</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-600 font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>In Stock ({product.stock} items)</span>
              </span>
            </div>
          </div>

          {/* Price Box */}
          <div className="bg-pink-50/50 rounded-2xl border border-pink-100 p-4 flex items-baseline space-x-4">
            <span className="text-3xl font-bold text-slate-900">PKR {product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-slate-400 line-through">PKR {product.originalPrice}</span>
            )}
            {product.discountPercent > 0 && (
              <span className="bg-pink-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                Save PKR {product.originalPrice - product.price}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-slate-700">
                Select Color: <span className="text-pink-600 font-semibold">{selectedColor}</span>
              </label>
              <div className="flex items-center space-x-3">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-9 h-9 rounded-full border-2 p-0.5 transition flex items-center justify-center ${
                      selectedColor === c.name ? 'border-pink-600 scale-110 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                    }`}
                    title={c.name}
                  >
                    <span
                      className="w-full h-full rounded-full inline-block"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase text-slate-700">Quantity</label>
            <div className="inline-flex items-center border border-slate-200 rounded-2xl bg-slate-50 p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-xl bg-white shadow-xs text-slate-700 font-bold hover:bg-pink-50 transition"
              >
                -
              </button>
              <span className="w-12 text-center text-sm font-bold text-slate-800">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-xl bg-white shadow-xs text-slate-700 font-bold hover:bg-pink-50 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-pink-50 hover:bg-pink-100 text-pink-700 py-4 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 border border-pink-200 transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full bg-linear-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-pink-200 transition"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100 text-center text-[11px] font-medium text-slate-600">
            <div className="flex flex-col items-center">
              <Truck className="w-5 h-5 text-pink-600 mb-1" />
              <span>Free Shipping &gt;PKR 150</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-pink-600 mb-1" />
              <span>100% Authentic Guarantee</span>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="w-5 h-5 text-pink-600 mb-1" />
              <span>30-Day Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description / Features / Reviews */}
      <div className="bg-white rounded-3xl border border-pink-100 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex border-b border-slate-100 space-x-8">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 text-sm font-bold transition border-b-2 ${
              activeTab === 'description'
                ? 'border-pink-600 text-pink-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-3 text-sm font-bold transition border-b-2 ${
              activeTab === 'features'
                ? 'border-pink-600 text-pink-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Material & Features
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-sm font-bold transition border-b-2 ${
              activeTab === 'reviews'
                ? 'border-pink-600 text-pink-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Customer Reviews ({product.reviews ? product.reviews.length : 0})
          </button>
        </div>

        {/* Tab 1: Description */}
        {activeTab === 'description' && (
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4">
            <p>{product.description}</p>
            <p>
              Designed to reflect the pinnacle of contemporary Italian fashion aesthetics, every piece in our store undergoes 12-stage quality checks. Packaged in our signature soft pink velvet dust bag with gold foil accents.
            </p>
          </div>
        )}

        {/* Tab 2: Features */}
        {activeTab === 'features' && (
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            {product.features && product.features.map((feat, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-luxury text-xl font-bold text-slate-900">
                Customer Ratings & Feedback
              </h3>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold px-4 py-2 rounded-xl text-xs flex items-center space-x-1 border border-pink-200 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Write a Review</span>
              </button>
            </div>

            {/* Write Review Form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="bg-pink-50/60 p-5 rounded-2xl border border-pink-100 space-y-4">
                <h4 className="text-xs font-bold uppercase text-slate-800">Submit Your Feedback</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    required
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-500"
                  />
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-500 font-semibold"
                  >
                    <option value="5">5 Stars — Excellent</option>
                    <option value="4">4 Stars — Very Good</option>
                    <option value="3">3 Stars — Average</option>
                    <option value="2">2 Stars — Poor</option>
                    <option value="1">1 Star — Terrible</option>
                  </select>
                </div>
                <textarea
                  placeholder="Share details about your experience with this item..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-pink-500"
                />
                <button
                  type="submit"
                  className="bg-pink-600 text-white font-bold px-6 py-2 rounded-xl text-xs shadow-md shadow-pink-200 transition"
                >
                  Post Review
                </button>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev) => (
                  <div key={rev.id} className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-slate-900">{rev.name}</span>
                        {rev.verified && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">No reviews written yet. Be the first to review!</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h2 className="font-serif-luxury text-2xl font-bold text-slate-900">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
