import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';

export const Navbar = () => {
  const {
    activePage,
    navigateTo,
    cart,
    wishlist,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    products,
    isAdminLoggedIn
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredSearchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedCategory('All');
      navigateTo('shop');
      setShowSearchDropdown(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-pink-900 via-pink-700 to-pink-900 text-pink-50 text-xs py-2 px-4 text-center font-medium flex items-center justify-center space-x-2 shadow-inner">
        <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
        <span>
          Complimentary Luxury Packaging & Express Shipping on Orders Over $150 | Code:{' '}
          <span className="font-bold underline decoration-pink-300">BELLA10</span> for 10% Off
        </span>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-pink-100/60 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:text-pink-600 hover:bg-pink-50 transition"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-pink-300 flex items-center justify-center text-white shadow-md shadow-pink-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-2xl font-bold tracking-widest text-slate-900 leading-none">
                  BELLA
                </span>
                <span className="text-[10px] tracking-[0.25em] text-pink-600 uppercase font-semibold mt-1">
                  Luxury Fashion
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => navigateTo('home')}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  activePage === 'home'
                    ? 'text-pink-600 border-b-2 border-pink-500 pb-1'
                    : 'text-slate-700 hover:text-pink-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  navigateTo('shop');
                }}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  activePage === 'shop'
                    ? 'text-pink-600 border-b-2 border-pink-500 pb-1'
                    : 'text-slate-700 hover:text-pink-600'
                }`}
              >
                Shop
              </button>
              <button
                onClick={() => navigateTo('about')}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  activePage === 'about'
                    ? 'text-pink-600 border-b-2 border-pink-500 pb-1'
                    : 'text-slate-700 hover:text-pink-600'
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  activePage === 'contact'
                    ? 'text-pink-600 border-b-2 border-pink-500 pb-1'
                    : 'text-slate-700 hover:text-pink-600'
                }`}
              >
                Contact Us
              </button>
              <button
                onClick={() => navigateTo('admin')}
                className={`text-sm font-semibold tracking-wide transition-colors flex items-center space-x-1 ${
                  activePage === 'admin'
                    ? 'text-pink-600 border-b-2 border-pink-500 pb-1'
                    : 'text-slate-500 hover:text-pink-600'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-pink-500" />
                <span>Admin</span>
                {isAdminLoggedIn && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 ml-1"></span>
                )}
              </button>
            </div>

            {/* Right Icons & Search */}
            <div className="flex items-center space-x-4">
              {/* Interactive Search Field */}
              <div className="relative hidden md:block w-56 lg:w-64">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    placeholder="Search bags, jewelry..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSearchDropdown(true);
                    }}
                    onFocus={() => setShowSearchDropdown(true)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-pink-400 rounded-full py-2 pl-9 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-pink-100 transition"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </form>

                {/* Live Search Preview Dropdown */}
                {showSearchDropdown && searchQuery.trim() !== '' && (
                  <div className="absolute top-full right-0 left-0 mt-2 bg-white rounded-2xl shadow-xl border border-pink-100 p-3 z-50">
                    {filteredSearchResults.length > 0 ? (
                      <div className="space-y-2">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2">
                          Matching Products
                        </div>
                        {filteredSearchResults.map((prod) => (
                          <div
                            key={prod.id}
                            onClick={() => {
                              navigateTo('product-details', prod.id);
                              setShowSearchDropdown(false);
                            }}
                            className="flex items-center space-x-3 p-2 rounded-xl hover:bg-pink-50 cursor-pointer transition"
                          >
                            <img
                              src={prod.images[0]}
                              alt={prod.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-slate-800 truncate">
                                {prod.name}
                              </p>
                              <p className="text-[11px] text-pink-600 font-bold">
                                ${prod.price}{' '}
                                <span className="line-through text-slate-400 text-[10px] font-normal ml-1">
                                  ${prod.originalPrice}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={handleSearchSubmit}
                          className="w-full text-center text-xs font-semibold text-pink-600 hover:text-pink-700 py-1 flex items-center justify-center space-x-1 border-t border-slate-100 mt-2"
                        >
                          <span>View all results</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 text-center py-3">
                        No products found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist Icon */}
              <button
                onClick={() => navigateTo('shop')}
                className="relative p-2 rounded-xl text-slate-700 hover:text-pink-600 hover:bg-pink-50 transition"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag / Cart Icon */}
              <button
                onClick={() => navigateTo('cart')}
                className="relative p-2 rounded-xl text-slate-700 hover:text-pink-600 hover:bg-pink-50 transition flex items-center"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-pink-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-pink-100 px-4 pt-2 pb-6 space-y-3">
            <div className="mb-4">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search bags, jewelry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-pink-400 rounded-full py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </form>
            </div>
            <button
              onClick={() => {
                navigateTo('home');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 text-base font-semibold ${
                activePage === 'home' ? 'text-pink-600' : 'text-slate-800'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setSelectedCategory('All');
                navigateTo('shop');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 text-base font-semibold ${
                activePage === 'shop' ? 'text-pink-600' : 'text-slate-800'
              }`}
            >
              Shop All Products
            </button>
            <button
              onClick={() => {
                navigateTo('about');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 text-base font-semibold ${
                activePage === 'about' ? 'text-pink-600' : 'text-slate-800'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => {
                navigateTo('contact');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 text-base font-semibold ${
                activePage === 'contact' ? 'text-pink-600' : 'text-slate-800'
              }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => {
                navigateTo('admin');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center space-x-2 w-full text-left py-2 text-base font-semibold ${
                activePage === 'admin' ? 'text-pink-600' : 'text-slate-600'
              }`}
            >
              <ShieldCheck className="w-5 h-5 text-pink-500" />
              <span>Admin Panel</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
