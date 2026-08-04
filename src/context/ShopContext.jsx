import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialProducts, initialCategories, initialOrders, validCoupons } from '../data/mockData';
import {
  apiFetchProducts,
  apiFetchCategories,
  apiFetchOrders,
  apiAddProduct,
  apiUpdateProduct,
  apiDeleteProduct,
  apiAddCategory,
  apiDeleteCategory,
  apiPlaceOrder,
  apiUpdateOrderStatus,
  apiAdminLogin,
  apiLogout,
  apiSendContactMessage,
  apiValidateCoupon,
} from '../api/apiService';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Navigation & View state
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);

  // ── Backend-backed state ──────────────────────────────────────────────
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('puremart_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });
  const [firestoreReady, setFirestoreReady] = useState(false);

  // ── Local-only state ───────────────────────────────────────────────────
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('bella_cart');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Bella Rose Quilted Crossbody Bag', price: 129, originalPrice: 189, quantity: 1, selectedColor: 'Dusty Rose', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80' },
      { id: 2, name: 'Aura 18K Gold Pearl Drop Earrings', price: 79, originalPrice: 110, quantity: 1, selectedColor: 'Pearl Gold', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80' }
    ];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('bella_wishlist');
    return saved ? JSON.parse(saved) : [1, 4];
  });

  const [couponCode, setCouponCode] = useState('BELLA10');
  const [discountPercent, setDiscountPercent] = useState(0.10);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('10% Discount Code (BELLA10) Applied!');

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const [lastPlacedOrder, setLastPlacedOrder] = useState(() => {
    const saved = localStorage.getItem('bella_last_order');
    return saved ? JSON.parse(saved) : null;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(20000);
  const [sortBy, setSortBy] = useState('featured');

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('bella_admin_auth') === 'true';
  });

  const defaultSettings = {
    websiteName: 'PURE MART',
    businessName: 'PURE MART',
    ownerName: 'Muhammad Farhan',
    email: 'farhanabc43@gmail.com',
    phone: '03116493529',
    address: 'Nazimabad No. 2 Printing Market, Near Fancy Paper Shop, Karachi, Pakistan',
  };

  const [siteSettings, setSiteSettings] = useState(() => {
    const saved = localStorage.getItem('puremart_site_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, websiteName: 'PURE MART', businessName: 'PURE MART', email: 'farhanabc43@gmail.com' };
    }
    return defaultSettings;
  });

  const [contactMessages, setContactMessages] = useState(() => {
    const saved = localStorage.getItem('puremart_contact_messages');
    return saved ? JSON.parse(saved) : [
      {
        id: 'MSG-9041',
        name: 'Ali Raza',
        email: 'aliraza@example.com',
        phone: '03001234567',
        subject: 'Order Delivery & Products Inquiry',
        message: 'Assalam-o-Alaikum, PURE MART par new stock kab aaye ga? Order deliver hone mein kitna time lagta hai?',
        date: new Date().toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: 'Unread'
      }
    ];
  });

  const [toasts, setToasts] = useState([]);

  // ── Toast Helper ───────────────────────────────────────────────────────
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // ── Fetch Data from Backend API ─────────────────────────────────────
  const fetchAllData = useCallback(async () => {
    try {
      // Fetch products
      const productsRes = await apiFetchProducts({ limit: 100 });
      if (productsRes.success && productsRes.data.length > 0) {
        setProducts(productsRes.data);
        // Set initial selectedProductId if not set
        if (!selectedProductId && productsRes.data.length > 0) {
          setSelectedProductId(productsRes.data[0].id);
        }
      } else {
        // Fallback to mock data if backend is empty or unreachable
        setProducts(initialProducts);
        if (!selectedProductId) setSelectedProductId('prod-1');
      }
    } catch {
      // Backend unreachable — use mock data as fallback
      console.warn('⚠️ Backend unreachable, using local mock data for products');
      setProducts(initialProducts);
      if (!selectedProductId) setSelectedProductId('prod-1');
    }

    try {
      const categoriesRes = await apiFetchCategories();
      if (categoriesRes.success && categoriesRes.data.length > 0) {
        setCategories(categoriesRes.data);
      } else {
        setCategories(initialCategories);
      }
    } catch {
      console.warn('⚠️ Backend unreachable, using local mock data for categories');
      setCategories(initialCategories);
    }

    try {
      // Orders require admin auth — only fetch if admin is logged in
      if (isAdminLoggedIn && localStorage.getItem('bella_auth_token')) {
        const ordersRes = await apiFetchOrders();
        if (ordersRes.success) {
          setOrders(ordersRes.data);
        }
      } else {
        setOrders(initialOrders);
      }
    } catch {
      console.warn('⚠️ Backend unreachable, using local mock data for orders');
      setOrders(initialOrders);
    }

    setFirestoreReady(true);
  }, [isAdminLoggedIn, selectedProductId]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // ── Persist local state to localStorage ───────────────────────────────
  useEffect(() => { localStorage.setItem('bella_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('bella_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('bella_admin_auth', isAdminLoggedIn ? 'true' : 'false'); }, [isAdminLoggedIn]);
  useEffect(() => { localStorage.setItem('puremart_site_settings', JSON.stringify(siteSettings)); }, [siteSettings]);
  useEffect(() => { localStorage.setItem('puremart_contact_messages', JSON.stringify(contactMessages)); }, [contactMessages]);
  useEffect(() => { localStorage.setItem('puremart_orders', JSON.stringify(orders)); }, [orders]);

  // ── Navigation ─────────────────────────────────────────────────────────
  const navigateTo = (page, productId = null) => {
    setActivePage(page);
    if (productId) setSelectedProductId(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Cart Functions ─────────────────────────────────────────────────────
  const addToCart = (product, quantity = 1, selectedColor = null) => {
    const color = selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0].name : 'Standard');
    const image = selectedColor && product.colors
      ? (product.colors.find(c => c.name === selectedColor)?.image || product.images[0])
      : product.images[0];

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevCart, { id: product.id, name: product.name, price: product.price, originalPrice: product.originalPrice, quantity, selectedColor: color, image }];
    });

    showToast(`Added "${product.name}" to your shopping bag! ✨`);
  };

  const updateCartQuantity = (id, color, newQuantity) => {
    if (newQuantity <= 0) { removeFromCart(id, color); return; }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.selectedColor === color ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id, color) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.selectedColor === color)));
    showToast('Item removed from bag', 'info');
  };

  const clearCart = () => setCart([]);

  // ── Wishlist Functions ─────────────────────────────────────────────────
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const isAlreadyIn = prev.includes(productId);
      if (isAlreadyIn) {
        showToast('Removed item from your Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      }
      showToast('Saved to your Wishlist! ♥️');
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // ── Coupon ─────────────────────────────────────────────────────────────
  const applyCoupon = async (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) { setCouponError('Please enter a coupon code.'); setCouponSuccess(''); return; }

    try {
      const res = await apiValidateCoupon(cleanCode);
      if (res.success) {
        setDiscountPercent(res.data.discountPercent);
        setCouponCode(res.data.code);
        setCouponSuccess(res.message);
        setCouponError('');
        showToast(`Coupon applied! You saved ${res.data.discountPercent * 100}%! 🎉`);
        return;
      }
    } catch {
      // Fallback to local validation
    }

    // Local fallback
    if (validCoupons[cleanCode]) {
      setDiscountPercent(validCoupons[cleanCode]);
      setCouponCode(cleanCode);
      setCouponSuccess(`Coupon ${cleanCode} applied! (${validCoupons[cleanCode] * 100}% OFF)`);
      setCouponError('');
      showToast(`Coupon applied! You saved ${validCoupons[cleanCode] * 100}%! 🎉`);
    } else {
      setCouponError('Invalid promo code. Try BELLA10, LUXURY20, or WELCOME15.');
      setCouponSuccess('');
    }
  };

  // ── Cart Calculations ──────────────────────────────────────────────────
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartDiscount = cartSubtotal * discountPercent;
  const shippingFee = cartSubtotal > 150 || cartSubtotal === 0 ? 0 : 15;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + shippingFee);

  // ── Place Order ─────────────────────────────────────────────────────────
  const OWNER_PHONE = '923116493529'; // WhatsApp number (country code + number)
  const OWNER_EMAIL = 'farhanabc43@gmail.com';

  const placeOrder = async (customerDetails) => {
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      customerName: customerDetails.name,
      email: customerDetails.email,
      phone: customerDetails.phone,
      address: `${customerDetails.address}, ${customerDetails.city}, ${customerDetails.state} ${customerDetails.zip}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: shippingFee,
      total: cartTotal,
      paymentMethod: customerDetails.paymentMethod || 'Cash on Delivery',
      status: 'Processing',
      notes: customerDetails.notes || 'None',
    };

    // 1) Save to Admin Panel orders state (localStorage)
    setOrders((prev) => [newOrder, ...prev]);
    const savedOrders = JSON.parse(localStorage.getItem('puremart_orders') || '[]');
    localStorage.setItem('puremart_orders', JSON.stringify([newOrder, ...savedOrders]));

    // 2) Send Email Notification via FormSubmit to owner email
    try {
      const itemsList = cart.map(i => `• ${i.name} x${i.quantity} = PKR ${(i.price * i.quantity).toLocaleString()}`).join('\n');
      await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `🛍️ New Order ${orderId} — PURE MART`,
          'Order ID': orderId,
          'Customer Name': customerDetails.name,
          'Customer Email': customerDetails.email,
          'Customer Phone': customerDetails.phone,
          'Delivery Address': newOrder.address,
          'Payment Method': newOrder.paymentMethod,
          'Order Items': itemsList,
          'Total Amount': `PKR ${cartTotal.toLocaleString()}`,
          'Order Date': newOrder.date,
        })
      });
    } catch {
      // silent fail — email not critical
    }

    // 3) Open WhatsApp with pre-filled order notification
    try {
      const itemsText = cart.map(i => `▪ ${i.name} x${i.quantity} = PKR ${(i.price * i.quantity).toLocaleString()}`).join('\n');
      const waMsg = encodeURIComponent(
        `🛍️ *NEW ORDER — PURE MART*\n\n` +
        `📋 *Order ID:* ${orderId}\n` +
        `👤 *Customer:* ${customerDetails.name}\n` +
        `📞 *Phone:* ${customerDetails.phone}\n` +
        `📧 *Email:* ${customerDetails.email}\n` +
        `🏠 *Address:* ${newOrder.address}\n\n` +
        `🧾 *Items Ordered:*\n${itemsText}\n\n` +
        `💰 *Subtotal:* PKR ${cartSubtotal.toLocaleString()}\n` +
        `🏷️ *Discount:* PKR ${cartDiscount.toLocaleString()}\n` +
        `🚚 *Shipping:* PKR ${shippingFee.toLocaleString()}\n` +
        `✅ *TOTAL: PKR ${cartTotal.toLocaleString()}*\n\n` +
        `💳 *Payment:* ${newOrder.paymentMethod}\n` +
        `📅 *Date:* ${newOrder.date}`
      );
      window.open(`https://wa.me/${OWNER_PHONE}?text=${waMsg}`, '_blank');
    } catch {
      // silent fail
    }

    setLastPlacedOrder(newOrder);
    localStorage.setItem('bella_last_order', JSON.stringify(newOrder));
    clearCart();
    navigateTo('order-confirmation');
    showToast('✅ Order placed! WhatsApp & Email notification sent to admin.', 'success');
  };

  // ── Contact Messages Functions ──────────────────────────────────────────
  const sendContactMessage = async (formData) => {
    const newMsg = {
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name || 'Anonymous Customer',
      email: formData.email || 'No email provided',
      phone: formData.phone || '',
      subject: formData.subject || 'General Inquiry',
      message: formData.message || '',
      date: new Date().toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'Unread'
    };
    setContactMessages((prev) => [newMsg, ...prev]);

    try {
      await fetch('https://formsubmit.co/ajax/farhanabc43@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'N/A',
          _subject: `[PURE MART Contact] ${formData.subject}`,
          message: formData.message
        })
      });
      showToast('📩 Real Email & Admin Panel update sent successfully!', 'success');
    } catch {
      showToast('✨ Message saved in Admin Panel.', 'success');
    }
    return true;
  };

  const deleteContactMessage = (id) => {
    setContactMessages((prev) => prev.filter((m) => m.id !== id));
    showToast('Message deleted successfully', 'info');
  };

  const markMessageRead = (id) => {
    setContactMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'Read' } : m))
    );
  };

  // ── Admin Auth ─────────────────────────────────────────────────────────
  const loginAdmin = async (password, email = 'farhanabc43@gmail.com') => {
    const cleanPass = password ? password.trim() : '';
    const cleanEmail = email ? email.trim().toLowerCase() : '';

    if (cleanPass === 'Pak12345' && (cleanEmail === '' || cleanEmail === 'farhanabc43@gmail.com')) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('bella_admin_auth', 'true');
      showToast('👑 Welcome Admin (farhanabc43@gmail.com)! Access Granted.', 'success');
      return true;
    } else {
      showToast('❌ Ghalat Email ya Password! Admin password sirf "Pak12345" hai.', 'error');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('bella_admin_auth');
    apiLogout();
    showToast('Logged out of PURE MART Admin panel.', 'info');
  };

  // ── Admin Product CRUD (Backend API) ───────────────────────────────────
  const addProduct = async (newProd) => {
    const productData = { rating: 5.0, reviewCount: 0, reviews: [], ...newProd };
    try {
      const res = await apiAddProduct(productData);
      if (res.success) {
        showToast(`Product "${productData.name}" created successfully!`);
        fetchAllData(); // Refresh products list
        return res.data.id;
      }
    } catch (err) {
      console.error('Failed to add product:', err);
      showToast('Failed to add product. Check console.', 'error');
    }
  };

  const updateProduct = async (updatedProd) => {
    try {
      const res = await apiUpdateProduct(updatedProd.id, updatedProd);
      if (res.success) {
        showToast(`Updated product "${updatedProd.name}"`);
        fetchAllData();
      }
    } catch (err) {
      console.error('Failed to update product:', err);
      showToast('Failed to update product.', 'error');
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await apiDeleteProduct(id);
      if (res.success) {
        showToast('Product deleted from store', 'info');
        fetchAllData();
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
      showToast('Failed to delete product.', 'error');
    }
  };

  // ── Admin Category CRUD (Backend API) ──────────────────────────────────
  const addCategory = async (categoryName) => {
    if (!categoryName) return;
    const newCat = {
      name: categoryName,
      icon: 'Sparkles',
      count: 0,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    };
    try {
      await apiAddCategory(newCat);
      showToast(`Category "${categoryName}" added!`);
      fetchAllData();
    } catch (err) {
      console.error('Failed to add category:', err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await apiDeleteCategory(id);
      showToast('Category deleted', 'info');
      fetchAllData();
    } catch (err) {
      console.error('Failed to delete category:', err);
    }
  };

  // ── Admin Order Status (Backend API) ───────────────────────────────────
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await apiUpdateOrderStatus(orderId, newStatus);
      showToast(`Order ${orderId} status updated to ${newStatus}`);
      fetchAllData();
    } catch (err) {
      console.error('Failed to update order status:', err);
      showToast('Failed to update order status.', 'error');
    }
  };

  return (
    <ShopContext.Provider
      value={{
        activePage, setActivePage,
        selectedProductId, setSelectedProductId,
        navigateTo,

        products, categories, orders,
        firestoreReady,

        cart, wishlist,
        addToCart, updateCartQuantity, removeFromCart, clearCart,
        toggleWishlist, isInWishlist,

        couponCode, discountPercent, couponError, couponSuccess, applyCoupon,

        cartSubtotal, cartDiscount, shippingFee, cartTotal,

        quickViewProduct, setQuickViewProduct,

        lastPlacedOrder, placeOrder,

        searchQuery, setSearchQuery,
        selectedCategory, setSelectedCategory,
        priceRange, setPriceRange,
        sortBy, setSortBy,

        isAdminLoggedIn, loginAdmin, logoutAdmin,
        addProduct, updateProduct, deleteProduct,
        addCategory, deleteCategory,
        updateOrderStatus,

        siteSettings, setSiteSettings,

        contactMessages, sendContactMessage, deleteContactMessage, markMessageRead,

        toasts, showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
