/**
 * Bella Store — API Service Layer
 * Connects frontend to the Node.js/Express/MySQL backend.
 * Drop-in replacement for Firebase/Firestore service calls.
 */

const API_BASE = 'http://localhost:5000/api';

// ─── Helper: Get stored auth token ───────────────────────────────────
const getToken = () => localStorage.getItem('bella_auth_token');

// ─── Helper: Build headers ───────────────────────────────────────────
const authHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// ─── Helper: Handle API response ─────────────────────────────────────
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `API Error: ${response.status}`);
  }
  return data;
};

// ═══════════════════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════════════════

export const apiLogin = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse(res);
  if (data.data?.token) {
    localStorage.setItem('bella_auth_token', data.data.token);
  }
  return data;
};

export const apiAdminLogin = async (password) => {
  const res = await fetch(`${API_BASE}/auth/admin-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  const data = await handleResponse(res);
  if (data.data?.token) {
    localStorage.setItem('bella_auth_token', data.data.token);
  }
  return data;
};

export const apiRegister = async (userData) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await handleResponse(res);
  if (data.data?.token) {
    localStorage.setItem('bella_auth_token', data.data.token);
  }
  return data;
};

export const apiGetProfile = async () => {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
};

export const apiLogout = () => {
  localStorage.removeItem('bella_auth_token');
};

// ═══════════════════════════════════════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════════════════════════════════════

export const apiFetchProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/products?${query}`);
  return handleResponse(res);
};

export const apiFetchProductById = async (id) => {
  const res = await fetch(`${API_BASE}/products/${id}`);
  return handleResponse(res);
};

export const apiAddProduct = async (productData) => {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(productData),
  });
  return handleResponse(res);
};

export const apiUpdateProduct = async (id, productData) => {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(productData),
  });
  return handleResponse(res);
};

export const apiDeleteProduct = async (id) => {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse(res);
};

export const apiAddReview = async (productId, reviewData) => {
  const res = await fetch(`${API_BASE}/products/${productId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });
  return handleResponse(res);
};

// ═══════════════════════════════════════════════════════════════════════
// CATEGORIES
// ═══════════════════════════════════════════════════════════════════════

export const apiFetchCategories = async () => {
  const res = await fetch(`${API_BASE}/categories`);
  return handleResponse(res);
};

export const apiAddCategory = async (categoryData) => {
  const res = await fetch(`${API_BASE}/categories`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(categoryData),
  });
  return handleResponse(res);
};

export const apiDeleteCategory = async (id) => {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse(res);
};

// ═══════════════════════════════════════════════════════════════════════
// ORDERS
// ═══════════════════════════════════════════════════════════════════════

export const apiFetchOrders = async () => {
  const res = await fetch(`${API_BASE}/orders`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
};

export const apiFetchOrderByCode = async (orderCode) => {
  const res = await fetch(`${API_BASE}/orders/${orderCode}`);
  return handleResponse(res);
};

export const apiPlaceOrder = async (orderData) => {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(orderData),
  });
  return handleResponse(res);
};

export const apiUpdateOrderStatus = async (orderCode, status) => {
  const res = await fetch(`${API_BASE}/orders/${orderCode}/status`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
  return handleResponse(res);
};

// ═══════════════════════════════════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════════════════════════════════

export const apiSendContactMessage = async (messageData) => {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messageData),
  });
  return handleResponse(res);
};

// ═══════════════════════════════════════════════════════════════════════
// COUPONS
// ═══════════════════════════════════════════════════════════════════════

export const apiValidateCoupon = async (code) => {
  const res = await fetch(`${API_BASE}/coupons/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  return handleResponse(res);
};

// ═══════════════════════════════════════════════════════════════════════
// FILE UPLOAD
// ═══════════════════════════════════════════════════════════════════════

export const apiUploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const token = getToken();
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });
  return handleResponse(res);
};
