import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const location = useLocation();

  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubY = scrollY.on('change', (latest) => {
      setShowBackToTop(latest > 300);
    });
    const unsubProgress = scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.round(latest * 100));
    });
    return () => {
      unsubY();
      unsubProgress();
    };
  }, [scrollY, scrollYProgress]);

  const handleOpenContact = () => {
    setContactModalOpen(true);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070A12] text-slate-100 selection:bg-white selection:text-slate-950 relative">
      {/* Top Luminous Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 z-[100] origin-left shadow-[0_0_14px_rgba(56,189,248,0.8)] pointer-events-none"
      />

      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Content Route Views with subtle Page Transition */}
      <main className="flex-1 w-full" key={location.pathname}>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="w-full h-full"
        >
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
        </motion.div>
      </main>

      <Footer onOpenContact={handleOpenContact} />
      <MobileNav />
      <CartDrawer />

      {/* Floating Back To Top Button with Circular Scroll Progress */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleScrollToTop}
            className="fixed bottom-20 sm:bottom-8 right-5 z-40 p-2 sm:p-2.5 rounded-full bg-[#0E1424]/90 backdrop-blur-md border border-white/20 text-white shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:border-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group flex items-center justify-center"
            aria-label="Back to top"
            title={`Scroll to top (${scrollPercent}%)`}
          >
            {/* SVG Progress Ring */}
            <svg className="w-9 h-9 sm:w-10 sm:h-10 -rotate-90 pointer-events-none" viewBox="0 0 36 36">
              <path
                className="text-white/10"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-cyan-400 transition-all duration-150"
                strokeDasharray={`${scrollPercent}, 100`}
                strokeWidth="3"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <ArrowUp className="w-4 h-4 absolute text-white group-hover:text-cyan-300 group-hover:-translate-y-0.5 transition-all" />
          </motion.button>
        )}
      </AnimatePresence>

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
