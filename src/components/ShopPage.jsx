import React, { useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, Search, RotateCcw, ChevronRight } from 'lucide-react';

export const ShopPage = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    navigateTo
  } = useShop();

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Price filter
        if (p.price > priceRange) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesCat = p.category.toLowerCase().includes(q);
          const matchesDesc = p.description?.toLowerCase().includes(q);
          if (!matchesName && !matchesCat && !matchesDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // default featured
      });
  }, [products, selectedCategory, priceRange, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceRange(20000);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb & Title */}
      <div>
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
          <span className="cursor-pointer hover:text-pink-600" onClick={() => navigateTo('home')}>Home</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-900">Shop Collection</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
          Pure Mart Collection
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore luxury accessories, designer handbags, handcrafted jewelry, and fine fragrance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters Left */}
        <div className="bg-white rounded-3xl border border-pink-100 p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="font-serif-luxury text-lg font-bold text-slate-900 flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-pink-600" />
              <span>Filters</span>
            </h2>
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
              Search Products
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-pink-400 rounded-2xl py-2 pl-9 pr-3 text-xs focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Categories List */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-3">
              Categories
            </label>
            <div className="space-y-1.5">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                  selectedCategory === 'All'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                <span>All Categories</span>
                <span className="text-[10px] opacity-80">({products.length})</span>
              </button>

              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat.name).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                      selectedCategory === cat.name
                        ? 'bg-pink-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-pink-50 hover:text-pink-600'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase text-slate-700">Max Price</label>
              <span className="text-xs font-bold text-pink-600">PKR {priceRange.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="20000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-pink-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
              <span>PKR 1,000</span>
              <span>PKR 20,000</span>
            </div>
          </div>
        </div>

        {/* Right Main Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Bar: Count & Sorting */}
          <div className="bg-white rounded-2xl border border-pink-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <span className="text-xs font-bold text-slate-700">
              Showing <span className="text-pink-600 font-extrabold">{filteredProducts.length}</span> of {products.length} Products
            </span>

            <div className="flex items-center space-x-2 text-xs">
              <span className="font-semibold text-slate-500 whitespace-nowrap">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 focus:border-pink-400 rounded-xl py-1.5 px-3 font-semibold text-slate-800 focus:outline-none"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-pink-100 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-slate-900">
                No matching products found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try adjusting your search criteria or reset filters to browse the entire Pure Mart Collection.
              </p>
              <button
                onClick={resetFilters}
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-2.5 rounded-full text-xs transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
