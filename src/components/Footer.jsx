import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Sparkles,
  Camera,
  Share2,
  Globe,
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

export const Footer = () => {
  const { navigateTo, setSelectedCategory } = useShop();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-pink-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 border-b border-slate-800 pb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-pink-500 to-pink-300 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-2xl font-bold tracking-widest text-white leading-none">
                  BELLA
                </span>
                <span className="text-[10px] tracking-[0.25em] text-pink-400 uppercase font-semibold mt-1">
                  Luxury Fashion
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Elevate your daily elegance with handcrafted leather handbags, 18k rose gold-dipped jewelry, vintage eyewear, and Parisian perfumes. Designed for the modern style icon.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-pink-500 hover:bg-pink-600 hover:text-white flex items-center justify-center text-slate-400 transition"
                aria-label="Instagram"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-pink-500 hover:bg-pink-600 hover:text-white flex items-center justify-center text-slate-400 transition"
                aria-label="Facebook"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-pink-500 hover:bg-pink-600 hover:text-white flex items-center justify-center text-slate-400 transition"
                aria-label="Twitter"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-pink-400 transition">
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    navigateTo('shop');
                  }}
                  className="hover:text-pink-400 transition"
                >
                  Shop Collection
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-pink-400 transition">
                  About Atelier
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-pink-400 transition">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-pink-400 transition flex items-center space-x-1 text-pink-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Handbags');
                    navigateTo('shop');
                  }}
                  className="hover:text-pink-400 transition"
                >
                  Handbags
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Jewelry');
                    navigateTo('shop');
                  }}
                  className="hover:text-pink-400 transition"
                >
                  Fine Jewelry
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Sunglasses');
                    navigateTo('shop');
                  }}
                  className="hover:text-pink-400 transition"
                >
                  Sunglasses
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Perfume');
                    navigateTo('shop');
                  }}
                  className="hover:text-pink-400 transition"
                >
                  Eau de Parfum
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Footwear');
                    navigateTo('shop');
                  }}
                  className="hover:text-pink-400 transition"
                >
                  Stiletto Heels
                </button>
              </li>
            </ul>
          </div>

          {/* Boutique Info */}
          <div className="space-y-3">
            <h3 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider">
              Atelier Location
            </h3>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                <span>Rodeo Drive, Beverly Hills, CA 90210</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-pink-500 shrink-0" />
                <span>+1 (800) 555-BELLA</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-pink-500 shrink-0" />
                <span>support@bellastore.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Payment Methods */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Bella Store. All Rights Reserved. Designed with luxury craftsmanship.</p>

          <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">VISA</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">MASTERCARD</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">AMEX</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">APPLE PAY</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">PAYPAL</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">COD</span>
          </div>
        </div>
      </div>

      {/* Back to Top Floating Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-pink-600 hover:bg-pink-700 text-white shadow-xl shadow-pink-300 transition-all duration-300 hover:scale-110"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
};
