import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { CartDrawer } from './components/cart/CartDrawer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { ContactModal } from './components/ui/ContactModal';

import { HomePage } from './pages/Home/HomePage';
import { ShopPage } from './pages/Shop/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetails/ProductDetailsPage';
import { CartPage } from './pages/Cart/CartPage';
import { WishlistPage } from './pages/Wishlist/WishlistPage';
import { CheckoutPage } from './pages/Checkout/CheckoutPage';
import { AccountPage } from './pages/Account/AccountPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';

const AppContent: React.FC = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const location = useLocation();

  const handleOpenContact = () => {
    setContactModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#171717] selection:bg-[#171717] selection:text-white relative">
      <AnnouncementBar onOpenContact={handleOpenContact} />
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Content Route Views */}
      <main className="flex-1 w-full" key={location.pathname}>
        <Routes>
          <Route path="/" element={<HomePage onOpenContact={handleOpenContact} />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer onOpenContact={handleOpenContact} />
      <MobileNav />
      <CartDrawer />

      {/* Direct Mail & Concierge Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <ScrollToTop />
            <AppContent />
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
