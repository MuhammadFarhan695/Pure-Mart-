import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Heart, Award, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AboutUsPage = () => {
  const { navigateTo } = useShop();

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Header */}
      <section className="bg-pink-50/80 py-16 border-b border-pink-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-pink-600 text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Heritage & Vision</span>
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Crafting Elegance for the Modern Woman
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Founded with a passion for timeless luxury and accessible glamour, Bella Store brings artisanal fashion accessories, jewelry, and leather goods directly to your doorstep.
          </p>
        </div>
      </section>

      {/* Brand Story Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/3 border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
              alt="Atelier Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-pink-600 text-xs font-bold uppercase tracking-widest">
              The Bella Philosophy
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold text-slate-900">
              Uncompromising Quality Meets Accessible Luxury
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              At Bella Store, we believe that luxury is not defined by exorbitant price tags, but by exquisite craftsmanship, ethical materials, and attention to detail. Every handbag, piece of jewelry, and scarf is thoughtfully designed in our atelier to inspire confidence.
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-800 font-semibold">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-pink-600 shrink-0" />
                <span>100% Ethical & Sustainable Material Sourcing</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-pink-600 shrink-0" />
                <span>Hand-inspected by Master Artisans before Dispatch</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-pink-600 shrink-0" />
                <span>Signature Luxe Packaging with Soft Velvet Dust Bags</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('shop')}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-pink-200 transition flex items-center space-x-2"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="bg-pink-50/50 py-16 border-y border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-3xl border border-pink-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-slate-900">Passion & Purpose</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Created to empower self-expression and elevate everyday style with grace.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-pink-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-slate-900">Artisanal Masterclass</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Blending traditional craftsmanship techniques with contemporary fashion aesthetics.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-pink-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-slate-900">Customer Excellence</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                White-glove 24/7 dedicated support and effortless 30-day returns.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
