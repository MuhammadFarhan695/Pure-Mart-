import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  Sparkles,
  Tag,
  CheckCircle2,
  AlertCircle,
  Truck,
  ChevronRight
} from 'lucide-react';

export const CartPage = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    couponCode,
    applyCoupon,
    couponError,
    couponSuccess,
    cartSubtotal,
    cartDiscount,
    shippingFee,
    cartTotal,
    navigateTo
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState('');

  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const amountLeftForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    applyCoupon(inputCoupon);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif-luxury text-3xl font-bold text-slate-900">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Looks like you haven't added any luxury items to your shopping bag yet. Explore our handcrafted collection to find your next signature piece.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-pink-200 transition"
        >
          Discover Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
          <span className="cursor-pointer hover:text-pink-600" onClick={() => navigateTo('home')}>Home</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-900">Shopping Bag</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
          Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
        </h1>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-pink-50 border border-pink-100 rounded-2xl p-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4 text-pink-600" />
            {amountLeftForFreeShipping > 0 ? (
              <span>
                Add <strong className="text-pink-600">${amountLeftForFreeShipping.toFixed(2)}</strong> more for FREE Express Shipping!
              </span>
            ) : (
              <span className="text-emerald-700 font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>You unlocked FREE Express Shipping!</span>
              </span>
            )}
          </div>
          <span className="text-pink-600">{progressPercent.toFixed(0)}%</span>
        </div>
        <div className="w-full h-2.5 bg-pink-200/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Cart Items Table/List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-pink-100 p-4 sm:p-6 shadow-sm space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedColor}`}
                className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-slate-50/70 border border-slate-100 gap-4"
              >
                {/* Thumbnail & Product Details */}
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-2xl object-cover border border-pink-100 shrink-0 cursor-pointer"
                    onClick={() => navigateTo('product-details', item.id)}
                  />
                  <div className="min-w-0">
                    <h3
                      onClick={() => navigateTo('product-details', item.id)}
                      className="font-serif-luxury text-base font-bold text-slate-900 hover:text-pink-600 cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-pink-600 font-semibold mt-0.5">
                      Color: {item.selectedColor}
                    </p>
                    <p className="text-xs font-bold text-slate-800 mt-1">
                      ${item.price}
                      {item.originalPrice && (
                        <span className="text-slate-400 line-through text-[11px] font-normal ml-2">
                          ${item.originalPrice}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Item Total */}
                <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                  {/* Quantity Stepper */}
                  <div className="inline-flex items-center border border-slate-200 rounded-xl bg-white p-1">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.selectedColor, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-slate-50 text-slate-700 font-bold hover:bg-pink-50 transition text-xs"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.selectedColor, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-slate-50 text-slate-700 font-bold hover:bg-pink-50 transition text-xs"
                    >
                      +
                    </button>
                  </div>

                  {/* Total per Item */}
                  <span className="text-sm font-bold text-slate-900 w-16 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.selectedColor)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
              <button
                onClick={clearCart}
                className="text-slate-500 hover:text-red-600 font-semibold"
              >
                Clear Entire Bag
              </button>
              <button
                onClick={() => navigateTo('shop')}
                className="text-pink-600 hover:text-pink-700 font-bold flex items-center space-x-1"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary & Coupon Code */}
        <div className="lg:col-span-4 space-y-6">
          {/* Coupon Box */}
          <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-sm space-y-3">
            <h3 className="font-serif-luxury text-base font-bold text-slate-900 flex items-center space-x-2">
              <Tag className="w-4 h-4 text-pink-600" />
              <span>Have a Promo Code?</span>
            </h3>
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="BELLA10, LUXURY20..."
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl px-3 py-2 text-xs uppercase font-semibold focus:outline-none"
              />
              <button
                type="submit"
                className="bg-slate-900 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
              >
                Apply
              </button>
            </form>

            {couponSuccess && (
              <p className="text-xs text-emerald-700 font-semibold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{couponSuccess}</span>
              </p>
            )}
            {couponError && (
              <p className="text-xs text-red-600 font-semibold flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                <span>{couponError}</span>
              </p>
            )}
            <div className="text-[11px] text-slate-400 pt-1">
              Try code <strong className="text-pink-600">BELLA10</strong> for 10% off or <strong className="text-pink-600">WELCOME15</strong> for 15% off.
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-sm space-y-4">
            <h3 className="font-serif-luxury text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800">${cartSubtotal.toFixed(2)}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Promo Discount ({couponCode})</span>
                  <span>-${cartDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-bold text-slate-800">
                  {shippingFee === 0 ? <strong className="text-emerald-600 uppercase">FREE</strong> : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div className="border-t border-slate-100 pt-3 flex justify-between text-base font-bold text-slate-900">
                <span>Total Amount</span>
                <span className="text-pink-600 text-xl font-extrabold">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('checkout')}
              className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold py-4 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-pink-200 transition flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
