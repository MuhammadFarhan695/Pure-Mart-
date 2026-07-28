import {
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';

// ─── Collection References ────────────────────────────────────────────────────
const productsCol  = collection(db, 'products');
const categoriesCol = collection(db, 'categories');
const ordersCol    = collection(db, 'orders');

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

/** Fetch all products once */
export const fetchProducts = async () => {
  const snapshot = await getDocs(productsCol);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/** Real-time listener for products */
export const subscribeProducts = (callback) => {
  return onSnapshot(productsCol, (snapshot) => {
    const products = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(products);
  });
};

/** Add a new product — uses Firestore auto-ID */
export const addProductToFirestore = async (productData) => {
  const ref = await addDoc(productsCol, {
    ...productData,
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

/** Update existing product by Firestore document ID */
export const updateProductInFirestore = async (productId, updates) => {
  await updateDoc(doc(db, 'products', productId), updates);
};

/** Delete a product by Firestore document ID */
export const deleteProductFromFirestore = async (productId) => {
  await deleteDoc(doc(db, 'products', productId));
};

// ─── CATEGORIES ───────────────────────────────────────────────────────────────

/** Fetch all categories once */
export const fetchCategories = async () => {
  const snapshot = await getDocs(categoriesCol);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/** Real-time listener for categories */
export const subscribeCategories = (callback) => {
  return onSnapshot(categoriesCol, (snapshot) => {
    const categories = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(categories);
  });
};

/** Add a new category */
export const addCategoryToFirestore = async (categoryData) => {
  const ref = await addDoc(categoriesCol, {
    ...categoryData,
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

/** Delete a category */
export const deleteCategoryFromFirestore = async (categoryId) => {
  await deleteDoc(doc(db, 'categories', categoryId));
};

// ─── ORDERS ───────────────────────────────────────────────────────────────────

/** Fetch all orders once (newest first) */
export const fetchOrders = async () => {
  const q = query(ordersCol, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/** Real-time listener for orders */
export const subscribeOrders = (callback) => {
  const q = query(ordersCol, orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(orders);
  });
};

/** Place a new order — uses the generated order ID as the doc ID */
export const placeOrderInFirestore = async (orderData) => {
  await setDoc(doc(db, 'orders', orderData.id), {
    ...orderData,
    createdAt: serverTimestamp(),
  });
};

/** Update order status */
export const updateOrderStatusInFirestore = async (orderId, newStatus) => {
  await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
};

// ─── SEED HELPERS ─────────────────────────────────────────────────────────────
// Run once from the browser console or a one-time script to populate Firestore.
// Usage: import { seedFirestore } from './firestoreService'; seedFirestore(products, categories, orders);

export const seedFirestore = async (products, categories, orders) => {
  console.log('🌱 Seeding Firestore...');

  for (const product of products) {
    await setDoc(doc(db, 'products', product.id), product);
  }

  for (const category of categories) {
    await setDoc(doc(db, 'categories', category.id), category);
  }

  for (const order of orders) {
    await setDoc(doc(db, 'orders', order.id), {
      ...order,
      createdAt: serverTimestamp(),
    });
  }

  console.log('✅ Firestore seeded successfully!');
};
