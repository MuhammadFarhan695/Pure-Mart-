import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  Lock,
  ArrowRight,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const CheckoutPage = () => {
  const { cart, cartSubtotal, cartDiscount, shippingFee, cartTotal, placeOrder, navigateTo } = useShop();

  const [formData, setFormData] = useState({
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'Beverly Hills',
    state: 'CA',
    zip: '90210',
    paymentMethod: 'Cash on Delivery',
    notes: 'Please call upon arrival.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Trigger luxury confetti celebration!
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F472B6', '#EC4899', '#BE185D', '#FCD34D', '#FFF']
      });
    } catch (err) {
      // Fallback if canvas-confetti fails
    }

    setTimeout(() => {
      placeOrder(formData);
      setIsSubmitting(false);
    }, 600);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="font-serif-luxury text-2xl font-bold text-slate-900">
          No items in cart to checkout
        </h2>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-pink-600 text-white font-bold px-6 py-2.5 rounded-full text-xs"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div>
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
          <span className="cursor-pointer hover:text-pink-600" onClick={() => navigateTo('home')}>Home</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="cursor-pointer hover:text-pink-600" onClick={() => navigateTo('cart')}>Bag</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-900">Checkout</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
          Secure Luxury Checkout
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Information & Address Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Contact Information */}
          <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-sm space-y-4">
            <h2 className="font-serif-luxury text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-xs font-extrabold flex items-center justify-center">1</span>
              <span>Customer Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Address */}
          <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-sm space-y-4">
            <h2 className="font-serif-luxury text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-xs font-extrabold flex items-center justify-center">2</span>
              <span>Shipping Delivery Address</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Zip Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method & Notes */}
          <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-sm space-y-4">
            <h2 className="font-serif-luxury text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-xs font-extrabold flex items-center justify-center">3</span>
              <span>Payment Option</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-center space-x-3 ${
                  formData.paymentMethod === 'Cash on Delivery'
                    ? 'border-pink-600 bg-pink-50/60 ring-2 ring-pink-500/20'
                    : 'border-slate-200 hover:border-pink-200'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={formData.paymentMethod === 'Cash on Delivery'}
                  onChange={handleChange}
                  className="accent-pink-600"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900 flex items-center space-x-1">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    <span>Cash on Delivery (COD)</span>
                  </p>
                  <p className="text-[11px] text-slate-500">Pay when your order arrives</p>
                </div>
              </label>

              <label
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-center space-x-3 ${
                  formData.paymentMethod === 'Credit Card'
                    ? 'border-pink-600 bg-pink-50/60 ring-2 ring-pink-500/20'
                    : 'border-slate-200 hover:border-pink-200'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Credit Card"
                  checked={formData.paymentMethod === 'Credit Card'}
                  onChange={handleChange}
                  className="accent-pink-600"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900 flex items-center space-x-1">
                    <CreditCard className="w-4 h-4 text-pink-600" />
                    <span>Credit / Debit Card</span>
                  </p>
                  <p className="text-[11px] text-slate-500">256-Bit Encrypted</p>
                </div>
              </label>
            </div>

            {/* Order Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Order Notes / Delivery Instructions (Optional)
              </label>
              <textarea
                name="notes"
                rows={2}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Gate code, gift ribbon preferences, etc."
                className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl p-3 text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary & Place Order Button */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-sm space-y-4">
            <h3 className="font-serif-luxury text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Order Review
            </h3>

            {/* Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedColor}`} className="flex items-center space-x-3 text-xs">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover border border-pink-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 truncate">{item.name}</p>
                    <p className="text-pink-600 text-[11px]">
                      Color: {item.selectedColor} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-slate-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Calculation */}
            <div className="space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800">${cartSubtotal.toFixed(2)}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>-${cartDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-slate-800">
                  {shippingFee === 0 ? <strong className="text-emerald-600 uppercase">FREE</strong> : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div className="border-t border-slate-100 pt-3 flex justify-between text-lg font-bold text-slate-900">
                <span>Total Due</span>
                <span className="text-pink-600 text-2xl font-extrabold">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-linear-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-pink-200 transition flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span>Processing Luxury Order...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order Now</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-400 text-center flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>30-Day Money Back Guarantee & Express Delivery</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
