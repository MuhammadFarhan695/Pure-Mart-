import React from 'react';
import { useShop } from '../context/ShopContext';
import { Star, Heart, Eye, ShoppingBag, ArrowRight, Zap } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, navigateTo } = useShop();

  const isWishlisted = isInWishlist(product.id);

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    navigateTo('checkout');
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => navigateTo('product-details', product.id)}
      className="group relative bg-white rounded-3xl border border-pink-100/70 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-pink-100/60 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
    >
      {/* Image Container with Badges & Overlay Actions */}
      <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-slate-50 mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
          {product.discountPercent > 0 && (
            <span className="bg-pink-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wide">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="bg-slate-900 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
              NEW
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="bg-amber-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 shadow-sm ${
            isWishlisted
              ? 'bg-pink-500 text-white shadow-pink-200'
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-pink-600'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Floating Overlay Button */}
        <div className="absolute inset-x-0 bottom-3 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center z-10">
          <button
            onClick={handleQuickView}
            className="w-full bg-white/90 backdrop-blur-md text-slate-800 hover:bg-pink-600 hover:text-white py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-lg transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between mb-1 text-xs">
            <span className="text-pink-600 font-semibold uppercase tracking-wider text-[10px]">
              {product.category}
            </span>
            <div className="flex items-center space-x-1 text-amber-400 font-medium">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-slate-700 text-xs font-bold">{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif-luxury text-base font-bold text-slate-900 line-clamp-1 group-hover:text-pink-600 transition-colors mb-2">
            {product.name}
          </h3>

          {/* Color Swatch Previews */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center space-x-1.5 mb-3">
              {product.colors.map((c, i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full border border-slate-300 shadow-inner inline-block"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline space-x-2 mb-4">
            <span className="text-lg font-bold text-slate-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: Add to Cart & Buy Now */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={handleAddToCart}
            className="w-full bg-pink-50 hover:bg-pink-100 text-pink-700 py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 transition border border-pink-200/50"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={handleBuyNow}
            className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 shadow-md shadow-pink-200 transition"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
