import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ShopPage } from './components/ShopPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderConfirmationPage } from './components/OrderConfirmationPage';
import { AboutUsPage } from './components/AboutUsPage';
import { ContactUsPage } from './components/ContactUsPage';
import { AdminDashboard } from './components/AdminDashboard';
import { QuickViewModal } from './components/QuickViewModal';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';

const MainContent = () => {
  const { activePage } = useShop();

  return (
    <main className="min-h-screen">
      {activePage === 'home' && <HomePage />}
      {activePage === 'shop' && <ShopPage />}
      {activePage === 'product-details' && <ProductDetailsPage />}
      {activePage === 'cart' && <CartPage />}
      {activePage === 'checkout' && <CheckoutPage />}
      {activePage === 'order-confirmation' && <OrderConfirmationPage />}
      {activePage === 'about' && <AboutUsPage />}
      {activePage === 'contact' && <ContactUsPage />}
      {activePage === 'admin' && <AdminDashboard />}
    </main>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-[#FFFDFD] text-slate-800 flex flex-col justify-between selection:bg-pink-200 selection:text-pink-900 font-sans">
        <ToastContainer />
        <Navbar />
        <MainContent />
        <QuickViewModal />
        <Footer />
      </div>
    </ShopProvider>
  );
}
