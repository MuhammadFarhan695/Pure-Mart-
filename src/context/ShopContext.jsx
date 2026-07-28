import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts, initialCategories, initialOrders, validCoupons } from '../data/mockData';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Navigation & View state
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('prod-1');

  // Core Data state (stored in localStorage for persistence)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('bella_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('bella_categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('bella_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  // Cart & Wishlist State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('bella_cart');
    return saved ? JSON.parse(saved) : [
      { id: 'prod-1', name: 'Bella Rose Quilted Crossbody Bag', price: 129, originalPrice: 189, quantity: 1, selectedColor: 'Dusty Rose', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80' },
      { id: 'prod-2', name: 'Aura 18K Gold Pearl Drop Earrings', price: 79, originalPrice: 110, quantity: 1, selectedColor: 'Pearl Gold', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80' }
    ];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('bella_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-4'];
  });

  // Coupon & Discount state
  const [couponCode, setCouponCode] = useState('BELLA10');
  const [discountPercent, setDiscountPercent] = useState(0.10);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('10% Discount Code (BELLA10) Applied!');

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Active Placed Order for Confirmation Page
  const [lastPlacedOrder, setLastPlacedOrder] = useState(() => {
    const saved = localStorage.getItem('bella_last_order');
    return saved ? JSON.parse(saved) : null;
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(300);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating', 'newest'

  // Admin State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('bella_admin_auth') === 'true';
  });

  // Notification Toast state
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('bella_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bella_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('bella_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('bella_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bella_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('bella_admin_auth', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Page Routing Helper
  const navigateTo = (page, productId = null) => {
    setActivePage(page);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Functions
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
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            quantity: quantity,
            selectedColor: color,
            image: image,
          },
        ];
      }
    });

    showToast(`Added "${product.name}" to your shopping bag! ✨`);
  };

  const updateCartQuantity = (id, color, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id, color);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.selectedColor === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (id, color) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.selectedColor === color)));
    showToast('Item removed from bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Functions
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const isAlreadyIn = prev.includes(productId);
      if (isAlreadyIn) {
        showToast('Removed item from your Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your Wishlist! ♥️');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Coupon apply
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      setCouponError('Please enter a coupon code.');
      setCouponSuccess('');
      return;
    }
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

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartDiscount = cartSubtotal * discountPercent;
  const shippingFee = cartSubtotal > 150 || cartSubtotal === 0 ? 0 : 15;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + shippingFee);

  // Place Order
  const placeOrder = (customerDetails) => {
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
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
      notes: customerDetails.notes || 'None'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    localStorage.setItem('bella_last_order', JSON.stringify(newOrder));
    clearCart();
    navigateTo('order-confirmation');
    showToast('Your order has been placed successfully! 🎉');
  };

  // Admin Auth & Functions
  const loginAdmin = (password) => {
    if (password === 'bella123' || password === 'admin') {
      setIsAdminLoggedIn(true);
      showToast('Admin Access Granted. Welcome back! 👑');
      return true;
    } else {
      showToast('Invalid Admin Credentials. Try password "admin" or "bella123"', 'error');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    showToast('Logged out of Admin panel.', 'info');
  };

  const addProduct = (newProd) => {
    const createdProduct = {
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      reviews: [],
      ...newProd
    };
    setProducts((prev) => [createdProduct, ...prev]);
    showToast(`Product "${createdProduct.name}" created successfully!`);
  };

  const updateProduct = (updatedProd) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProd.id ? { ...p, ...updatedProd } : p))
    );
    showToast(`Updated product "${updatedProd.name}"`);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted from store', 'info');
  };

  const addCategory = (categoryName) => {
    if (!categoryName) return;
    const newCat = {
      id: `cat-${Date.now()}`,
      name: categoryName,
      icon: 'Sparkles',
      count: 0,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${categoryName}" added!`);
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Category deleted', 'info');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order ${orderId} status updated to ${newStatus}`);
  };

  return (
    <ShopContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProductId,
        setSelectedProductId,
        navigateTo,

        products,
        categories,
        orders,
        cart,
        wishlist,

        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,

        toggleWishlist,
        isInWishlist,

        couponCode,
        discountPercent,
        couponError,
        couponSuccess,
        applyCoupon,

        cartSubtotal,
        cartDiscount,
        shippingFee,
        cartTotal,

        quickViewProduct,
        setQuickViewProduct,

        lastPlacedOrder,
        placeOrder,

        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,

        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        deleteCategory,
        updateOrderStatus,

        toasts,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
