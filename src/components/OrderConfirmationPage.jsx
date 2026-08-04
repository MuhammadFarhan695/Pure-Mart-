import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Clock,
  Printer,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  ChevronRight
} from 'lucide-react';

export const OrderConfirmationPage = () => {
  const { lastPlacedOrder, navigateTo } = useShop();

  if (!lastPlacedOrder) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="font-serif-luxury text-2xl font-bold text-slate-900">
          No Recent Order Found
        </h2>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-pink-600 text-white font-bold px-6 py-2.5 rounded-full text-xs"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner Celebration */}
      <div className="bg-linear-to-r from-pink-100 via-pink-50 to-pink-100 rounded-3xl border border-pink-200 p-8 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-pink-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-pink-200 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="inline-flex items-center space-x-1 bg-white text-pink-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest border border-pink-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Order Confirmed</span>
        </span>

        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
          Thank You, {lastPlacedOrder.customerName}!
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          We have received your luxury fashion order. A confirmation email has been sent to{' '}
          <strong className="text-slate-800">{lastPlacedOrder.email}</strong>.
        </p>

        <div className="inline-block bg-white px-4 py-2 rounded-xl text-xs font-bold text-slate-700 border border-slate-200">
          Order Reference ID: <span className="text-pink-600 font-mono">{lastPlacedOrder.id}</span>
        </div>
      </div>

      {/* Track Order Timeline Status */}
      <div className="bg-white rounded-3xl border border-pink-100 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="font-serif-luxury text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
          <Clock className="w-5 h-5 text-pink-600" />
          <span>Live Order Tracking</span>
        </h2>

        <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-bold">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center mx-auto">
              ✓
            </div>
            <p className="text-pink-600">Order Placed</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center mx-auto animate-pulse">
              2
            </div>
            <p className="text-slate-800">Atelier Prep</p>
          </div>
          <div className="space-y-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto">
              3
            </div>
            <p className="text-slate-500">In Transit</p>
          </div>
          <div className="space-y-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto">
              4
            </div>
            <p className="text-slate-500">Delivered</p>
          </div>
        </div>
      </div>

      {/* Order Summary Details */}
      <div className="bg-white rounded-3xl border border-pink-100 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="font-serif-luxury text-xl font-bold text-slate-900">Order Receipt</h2>
          <button
            onClick={handlePrint}
            className="text-xs font-semibold text-slate-600 hover:text-pink-600 flex items-center space-x-1"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Customer & Shipping Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div>
            <p className="font-bold text-slate-900 uppercase tracking-wider text-[10px] mb-1">
              Shipping Address
            </p>
            <p className="font-bold text-slate-800">{lastPlacedOrder.customerName}</p>
            <p>{lastPlacedOrder.address}</p>
            <p className="mt-1">Phone: {lastPlacedOrder.phone}</p>
          </div>

          <div>
            <p className="font-bold text-slate-900 uppercase tracking-wider text-[10px] mb-1">
              Order Details
            </p>
            <p>Date: {lastPlacedOrder.date}</p>
            <p>Payment: <strong className="text-pink-600">{lastPlacedOrder.paymentMethod}</strong></p>
            <p>Status: <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-bold text-[10px]">{lastPlacedOrder.status}</span></p>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-3">
          {lastPlacedOrder.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b border-slate-100 text-xs"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover border border-pink-100"
                />
                <div>
                  <p className="font-bold text-slate-900">{item.name}</p>
                  <p className="text-pink-600 text-[11px]">
                    Color: {item.selectedColor} • Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <span className="font-bold text-slate-900">
                PKR {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Total breakdown */}
        <div className="space-y-2 text-xs text-slate-600 max-w-xs ml-auto pt-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-bold text-slate-800">PKR {lastPlacedOrder.subtotal.toFixed(2)}</span>
          </div>
          {lastPlacedOrder.discount > 0 && (
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>Discount</span>
              <span>-PKR {lastPlacedOrder.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-bold text-slate-800">
              {lastPlacedOrder.shipping === 0 ? 'FREE' : `PKR ${lastPlacedOrder.shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-bold text-slate-900">
            <span>Total Paid</span>
            <span className="text-pink-600 text-xl font-extrabold">
              PKR {lastPlacedOrder.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center">
        <button
          onClick={() => navigateTo('shop')}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-pink-200 transition flex items-center space-x-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
