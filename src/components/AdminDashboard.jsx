import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShieldCheck,
  Lock,
  Plus,
  Trash2,
  Edit3,
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  CheckCircle2,
  X,
  Image,
  RefreshCw,
  LogOut,
  ChevronRight,
  Eye,
  Mail,
  MessageSquare
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    products,
    categories,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    deleteCategory,
    updateOrderStatus,
    navigateTo,
    showToast,
    siteSettings,
    setSiteSettings,
    contactMessages,
    deleteContactMessage,
    markMessageRead
  } = useShop();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'products' | 'categories' | 'orders'

  // Add / Edit Product Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Handbags',
    price: '',
    originalPrice: '',
    stock: '',
    sku: '',
    description: '',
    image: '',
    isFeatured: false,
    isNew: true,
    isBestSeller: false
  });

  // Category Form state
  const [newCatName, setNewCatName] = useState('');

  // View Order Modal state
  const [viewingOrder, setViewingOrder] = useState(null);

  // QuickInline Edit Price/Stock
  const [inlineEdits, setInlineEdits] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    loginAdmin(loginPassword, loginEmail);
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: categories[0]?.name || 'Handbags',
      price: '',
      originalPrice: '',
      stock: '15',
      sku: `BEL-PRD-${Math.floor(100 + Math.random() * 900)}`,
      description: 'Handcrafted luxury design from the PURE MART collection.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      isFeatured: false,
      isNew: true,
      isBestSeller: false
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice || '',
      stock: prod.stock,
      sku: prod.sku || '',
      description: prod.description || '',
      image: prod.images[0] || '',
      isFeatured: prod.isFeatured || false,
      isNew: prod.isNew || false,
      isBestSeller: prod.isBestSeller || false
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const priceNum = Number(productForm.price);
    const origPriceNum = productForm.originalPrice ? Number(productForm.originalPrice) : priceNum;
    const discount = origPriceNum > priceNum ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100) : 0;

    const payload = {
      name: productForm.name,
      category: productForm.category,
      price: priceNum,
      originalPrice: origPriceNum,
      discountPercent: discount,
      stock: Number(productForm.stock),
      sku: productForm.sku,
      description: productForm.description,
      images: [productForm.image || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'],
      isFeatured: productForm.isFeatured,
      isNew: productForm.isNew,
      isBestSeller: productForm.isBestSeller,
      colors: [
        { name: 'Standard Rose', hex: '#F472B6', image: productForm.image }
      ],
      features: [
        'Premium Atelier Handcrafted Quality',
        'Includes Signature PURE MART Dust Bag'
      ]
    };

    if (editingProduct) {
      updateProduct({ id: editingProduct.id, ...payload });
    } else {
      addProduct(payload);
    }
    setIsProductModalOpen(false);
  };

  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory(newCatName.trim());
    setNewCatName('');
  };

  const handleInlineChange = (prodId, field, val) => {
    setInlineEdits({
      ...inlineEdits,
      [prodId]: {
        ...(inlineEdits[prodId] || {}),
        [field]: val
      }
    });
  };

  const saveInlineEdit = (prod) => {
    const edit = inlineEdits[prod.id];
    if (!edit) return;
    const newPrice = edit.price !== undefined ? Number(edit.price) : prod.price;
    const newStock = edit.stock !== undefined ? Number(edit.stock) : prod.stock;
    updateProduct({ ...prod, price: newPrice, stock: newStock });
    // clear inline edit entry
    const updatedInline = { ...inlineEdits };
    delete updatedInline[prod.id];
    setInlineEdits(updatedInline);
  };

  // If not logged in, show Admin Login view
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <div className="bg-white rounded-3xl border border-pink-100 p-8 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div>
            <h1 className="font-serif-luxury text-2xl font-bold text-slate-900">
              {siteSettings.websiteName} Admin Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Enter admin email & password to manage products, categories, orders, and customer messages.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter admin email"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl py-2.5 pl-10 pr-3 text-xs focus:outline-none"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Admin Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl py-2.5 pl-10 pr-3 text-xs focus:outline-none"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-pink-200 transition"
            >
              Sign In to Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Stats Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProductsCount = products.length;
  const lowStockProductsCount = products.filter((p) => p.stock < 10).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Logout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-pink-600 flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif-luxury text-2xl font-bold">{siteSettings.websiteName} Admin Control Center</h1>
            <p className="text-xs text-pink-300">Live Inventory & Order Management</p>
          </div>
        </div>

        <button
          onClick={logoutAdmin}
          className="bg-white/10 hover:bg-white/20 text-pink-200 font-semibold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Admin</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex space-x-2 border-b border-pink-100 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center space-x-2 shrink-0 ${
            activeTab === 'dashboard'
              ? 'bg-pink-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-pink-50'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Dashboard Overview</span>
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center space-x-2 shrink-0 ${
            activeTab === 'products'
              ? 'bg-pink-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-pink-50'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Manage Products ({products.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center space-x-2 shrink-0 ${
            activeTab === 'categories'
              ? 'bg-pink-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-pink-50'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Categories ({categories.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center space-x-2 shrink-0 ${
            activeTab === 'orders'
              ? 'bg-pink-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-pink-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center space-x-2 shrink-0 ${
            activeTab === 'settings'
              ? 'bg-pink-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-pink-50'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Site Settings</span>
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center space-x-2 shrink-0 ${
            activeTab === 'messages'
              ? 'bg-pink-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-pink-50'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Contact Messages ({contactMessages ? contactMessages.length : 0})</span>
          {contactMessages && contactMessages.filter(m => m.status === 'Unread').length > 0 && (
            <span className="bg-amber-400 text-slate-900 text-[10px] px-2 py-0.5 rounded-full font-extrabold">
              {contactMessages.filter(m => m.status === 'Unread').length} New
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: DASHBOARD OVERVIEW */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-slate-400">Total Store Revenue</p>
                <h3 className="font-serif-luxury text-2xl font-bold text-slate-900 mt-1">
                  PKR {totalRevenue.toFixed(2)}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-slate-400">Total Customer Orders</p>
                <h3 className="font-serif-luxury text-2xl font-bold text-slate-900 mt-1">
                  {totalOrders}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-slate-400">Active Products</p>
                <h3 className="font-serif-luxury text-2xl font-bold text-slate-900 mt-1">
                  {totalProductsCount}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-slate-400">Low Stock Alert (&lt;10)</p>
                <h3 className="font-serif-luxury text-2xl font-bold text-slate-900 mt-1">
                  {lowStockProductsCount}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <RefreshCw className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Recent Orders Overview */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-pink-100 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-serif-luxury text-lg font-bold text-slate-900">
                  Recent Sales Activity
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-pink-600 hover:text-pink-700"
                >
                  View All Orders &rarr;
                </button>
              </div>

              <div className="space-y-3">
                {orders.slice(0, 4).map((ord) => (
                  <div
                    key={ord.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{ord.id} • {ord.customerName}</p>
                      <p className="text-slate-400 text-[11px]">{ord.date} • {ord.items.length} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-pink-600">PKR {ord.total.toFixed(2)}</p>
                      <span className="text-[10px] bg-pink-100 text-pink-800 font-bold px-2 py-0.5 rounded-full">
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-pink-100 p-6 shadow-sm space-y-4">
              <h3 className="font-serif-luxury text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleOpenAddProduct}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold p-3 rounded-2xl text-xs flex items-center justify-center space-x-2 transition shadow-md shadow-pink-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Fashion Product</span>
                </button>
                <button
                  onClick={() => setActiveTab('categories')}
                  className="w-full bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold p-3 rounded-2xl text-xs flex items-center justify-center space-x-2 border border-pink-200 transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold p-3 rounded-2xl text-xs flex items-center justify-center space-x-2 transition"
                >
                  <Mail className="w-4 h-4 text-pink-400" />
                  <span>View Customer Messages ({contactMessages ? contactMessages.length : 0})</span>
                </button>
                <button
                  onClick={() => navigateTo('shop')}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold p-3 rounded-2xl text-xs flex items-center justify-center space-x-2 transition"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Storefront</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE PRODUCTS */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="font-serif-luxury text-2xl font-bold text-slate-900">
                Products Inventory ({products.length})
              </h2>
              <p className="text-xs text-slate-500">Edit prices, stock levels, and upload product images.</p>
            </div>
            <button
              onClick={handleOpenAddProduct}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-5 py-2.5 rounded-2xl text-xs flex items-center space-x-2 shadow-md shadow-pink-200 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-y border-slate-100">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price (PKR)</th>
                  <th className="p-3">Stock Qty</th>
                  <th className="p-3">Badges</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((prod) => {
                  const inline = inlineEdits[prod.id] || {};
                  const priceVal = inline.price !== undefined ? inline.price : prod.price;
                  const stockVal = inline.stock !== undefined ? inline.stock : prod.stock;
                  const isModified = inline.price !== undefined || inline.stock !== undefined;

                  return (
                    <tr key={prod.id} className="hover:bg-pink-50/40 transition">
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-10 h-10 rounded-xl object-cover border border-pink-100"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate max-w-xs">{prod.name}</p>
                            <p className="text-[10px] text-slate-400">{prod.sku || prod.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-3 font-semibold text-pink-600">{prod.category}</td>

                      <td className="p-3">
                        <input
                          type="number"
                          value={priceVal}
                          onChange={(e) => handleInlineChange(prod.id, 'price', e.target.value)}
                          className="w-20 bg-slate-50 border border-slate-200 rounded-lg p-1 font-bold text-slate-900 focus:outline-none focus:border-pink-500"
                        />
                      </td>

                      <td className="p-3">
                        <input
                          type="number"
                          value={stockVal}
                          onChange={(e) => handleInlineChange(prod.id, 'stock', e.target.value)}
                          className={`w-16 bg-slate-50 border rounded-lg p-1 font-bold focus:outline-none ${
                            stockVal < 10 ? 'border-amber-400 text-amber-600' : 'border-slate-200 text-slate-900'
                          }`}
                        />
                      </td>

                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {prod.isFeatured && (
                            <span className="bg-pink-100 text-pink-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                          {prod.isNew && (
                            <span className="bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                              New
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-3 text-right space-x-2">
                        {isModified && (
                          <button
                            onClick={() => saveInlineEdit(prod)}
                            className="bg-emerald-600 text-white font-bold px-2 py-1 rounded-lg text-[10px]"
                          >
                            Save
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenEditProduct(prod)}
                          className="p-1.5 text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: MANAGE CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Add Category Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-pink-100 p-6 shadow-sm space-y-4">
            <h2 className="font-serif-luxury text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Add New Category
            </h2>
            <form onSubmit={handleAddCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category Name</label>
                <input
                  type="text"
                  placeholder="e.g. Silk Scarves, Cosmetics..."
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl p-2.5 text-xs font-medium focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-pink-200 transition"
              >
                Create Category
              </button>
            </form>
          </div>

          {/* Categories List */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-pink-100 p-6 shadow-sm space-y-4">
            <h2 className="font-serif-luxury text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Existing Store Categories ({categories.length})
            </h2>

            <div className="space-y-3">
              {categories.map((cat) => {
                const prodCount = products.filter((p) => p.category === cat.name).length;
                return (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-10 h-10 rounded-xl object-cover border border-pink-100"
                      />
                      <div>
                        <p className="font-bold text-slate-900">{cat.name}</p>
                        <p className="text-[11px] text-pink-600">{prodCount} products tagged</p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                      title="Delete category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CUSTOMER ORDERS */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-sm space-y-6">
          <h2 className="font-serif-luxury text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            Customer Orders Directory ({orders.length})
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-y border-slate-100">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Fulfillment Status</th>
                  <th className="p-3 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-pink-50/40 transition">
                    <td className="p-3 font-mono font-bold text-pink-600">{ord.id}</td>
                    <td className="p-3">
                      <p className="font-bold text-slate-900">{ord.customerName}</p>
                      <p className="text-[10px] text-slate-400">{ord.email}</p>
                    </td>
                    <td className="p-3 text-slate-600">{ord.date}</td>
                    <td className="p-3 font-semibold text-slate-700">{ord.paymentMethod}</td>
                    <td className="p-3 font-bold text-slate-900">PKR {ord.total.toFixed(2)}</td>

                    <td className="p-3">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className="bg-pink-50 border border-pink-200 rounded-lg p-1 font-bold text-pink-900 text-xs focus:outline-none"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={() => setViewingOrder(ord)}
                        className="bg-slate-100 hover:bg-pink-100 text-slate-700 hover:text-pink-700 font-bold px-3 py-1.5 rounded-lg text-[11px]"
                      >
                        View Items
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-sm space-y-6">
          <h2 className="font-serif-luxury text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            Website Configuration
          </h2>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); showToast('Settings Updated!'); }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Website Name</label>
                <input
                  type="text"
                  value={siteSettings.websiteName}
                  onChange={(e) => setSiteSettings({ ...siteSettings, websiteName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl p-2.5 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Business Name</label>
                <input
                  type="text"
                  value={siteSettings.businessName}
                  onChange={(e) => setSiteSettings({ ...siteSettings, businessName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl p-2.5 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Owner Name</label>
                <input
                  type="text"
                  value={siteSettings.ownerName}
                  onChange={(e) => setSiteSettings({ ...siteSettings, ownerName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl p-2.5 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={siteSettings.email}
                  onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl p-2.5 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={siteSettings.phone}
                  onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl p-2.5 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Address</label>
                <input
                  type="text"
                  value={siteSettings.address}
                  onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl p-2.5 text-xs focus:outline-none"
                />
              </div>
            </div>
            <button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-pink-200 transition">Save Settings</button>
          </form>
        </div>
      )}

      {/* TAB 6: CUSTOMER MESSAGES */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="font-serif-luxury text-2xl font-bold text-slate-900">
                Customer Contact Messages ({contactMessages ? contactMessages.length : 0})
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Messages submitted from the website Contact Us page. Delivered to <strong className="text-pink-600 font-bold">farhanabc43@gmail.com</strong>
              </p>
            </div>
          </div>

          {!contactMessages || contactMessages.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
              <Mail className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-slate-700 text-sm">No Messages Yet</h3>
              <p className="text-xs text-slate-400">When customers submit messages on the Contact page, they will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contactMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-5 rounded-2xl border transition ${
                    msg.status === 'Unread'
                      ? 'bg-pink-50/60 border-pink-200 shadow-sm'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                        msg.status === 'Unread' ? 'bg-pink-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          {msg.name}
                          {msg.status === 'Unread' && (
                            <span className="bg-pink-600 text-white text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase">
                              New Message
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-slate-500">
                          <a href={`mailto:${msg.email}`} className="text-pink-600 hover:underline font-medium">
                            {msg.email}
                          </a>
                          {msg.phone && <span className="ml-2">| 📞 {msg.phone}</span>}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-xs text-slate-400">
                      <p className="font-medium text-slate-500">{msg.date}</p>
                      <p className="text-[10px] text-pink-500 font-semibold">{msg.id}</p>
                    </div>
                  </div>

                  <div className="py-3">
                    <p className="font-bold text-xs text-slate-800 mb-1">Subject: {msg.subject}</p>
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 whitespace-pre-wrap leading-relaxed">
                      "{msg.message}"
                    </p>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-2">
                    {msg.status === 'Unread' && (
                      <button
                        onClick={() => markMessageRead(msg.id)}
                        className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition"
                      >
                        Mark as Read
                      </button>
                    )}
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}&body=Hello ${encodeURIComponent(msg.name)},\n\nThank you for contacting PURE MART.`}
                      className="text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 px-3.5 py-1.5 rounded-xl transition shadow-xs flex items-center space-x-1"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply via Email</span>
                    </a>
                    <button
                      onClick={() => deleteContactMessage(msg.id)}
                      className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-pink-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif-luxury text-xl font-bold text-slate-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. Bella Silk Handbag"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-pink-500 focus:outline-none font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="129"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-pink-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Original Price (PKR)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                    placeholder="189"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-pink-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Initial Stock Qty</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    placeholder="15"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Image URL</label>
                <input
                  type="url"
                  required
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-6 pt-1">
                <label className="flex items-center space-x-2 font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                    className="accent-pink-600"
                  />
                  <span>Featured Item</span>
                </label>

                <label className="flex items-center space-x-2 font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={productForm.isNew}
                    onChange={(e) => setProductForm({ ...productForm, isNew: e.target.checked })}
                    className="accent-pink-600"
                  />
                  <span>New Arrival</span>
                </label>

                <label className="flex items-center space-x-2 font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={productForm.isBestSeller}
                    onChange={(e) => setProductForm({ ...productForm, isBestSeller: e.target.checked })}
                    className="accent-pink-600"
                  />
                  <span>Bestseller</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-pink-600 text-white font-bold shadow-md shadow-pink-200 hover:bg-pink-700"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW ORDER ITEMS MODAL */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-pink-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif-luxury text-lg font-bold text-slate-900">
                Order Items ({viewingOrder.id})
              </h3>
              <button onClick={() => setViewingOrder(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {viewingOrder.items.map((it, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-xs bg-slate-50 p-2.5 rounded-xl">
                  <img src={it.image} alt={it.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-bold text-slate-900">{it.name}</p>
                    <p className="text-[11px] text-pink-600">Color: {it.selectedColor} • Qty: {it.quantity}</p>
                  </div>
                  <span className="font-bold text-slate-900">${(it.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs flex justify-between font-bold">
              <span>Total Paid</span>
              <span className="text-pink-600">${viewingOrder.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
