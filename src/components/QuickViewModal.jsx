import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, Heart, ShoppingBag, Zap, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist, navigateTo } = useShop();
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const colorToUse = selectedColor || (quickViewProduct.colors?.[0]?.name ?? 'Standard');
  const isWishlisted = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, colorToUse);
    setQuickViewProduct(null);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, quantity, colorToUse);
    setQuickViewProduct(null);
    navigateTo('checkout');
  };

  const handleViewFullDetails = () => {
    setQuickViewProduct(null);
    navigateTo('product-details', quickViewProduct.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-pink-100 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Modal Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-100 hover:bg-pink-100 text-slate-500 hover:text-pink-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Gallery Left */}
          <div>
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 mb-3 border border-pink-100">
              <img
                src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnail switcher */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition ${
                      activeImageIndex === idx ? 'border-pink-500 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Right */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <span className="text-pink-600 text-xs font-bold uppercase tracking-wider">
                {quickViewProduct.category}
              </span>
              <h2 className="font-serif-luxury text-2xl font-bold text-slate-900 mt-1 mb-2">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-xs font-bold text-slate-800">{quickViewProduct.rating}</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500">{quickViewProduct.reviewCount} customer reviews</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>In Stock ({quickViewProduct.stock})</span>
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline space-x-3 mb-4">
                <span className="text-3xl font-bold text-slate-900">PKR {quickViewProduct.price}</span>
                {quickViewProduct.originalPrice && (
                  <span className="text-base text-slate-400 line-through">PKR {quickViewProduct.originalPrice}</span>
                )}
                {quickViewProduct.discountPercent && (
                  <span className="bg-pink-100 text-pink-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Save {quickViewProduct.discountPercent}%
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-3">
                {quickViewProduct.description}
              </p>

              {/* Color Selection */}
              {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                    Color: <span className="text-pink-600 font-semibold">{colorToUse}</span>
                  </label>
                  <div className="flex items-center space-x-3">
                    {quickViewProduct.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-8 h-8 rounded-full border-2 p-0.5 transition flex items-center justify-center ${
                          colorToUse === c.name ? 'border-pink-600 scale-110' : 'border-slate-200 hover:border-slate-300'
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
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Quantity</label>
                <div className="inline-flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg bg-white shadow-xs text-slate-700 font-bold hover:bg-pink-50 transition"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-slate-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg bg-white shadow-xs text-slate-700 font-bold hover:bg-pink-50 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-pink-50 hover:bg-pink-100 text-pink-700 py-3 rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 border border-pink-200 transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-pink-200 transition"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className="text-xs font-semibold text-slate-600 hover:text-pink-600 flex items-center space-x-1"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'text-pink-500 fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button
                  onClick={handleViewFullDetails}
                  className="text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center space-x-1"
                >
                  <span>View Full Product Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
