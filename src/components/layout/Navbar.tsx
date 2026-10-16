import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { categories } from '../../data/categories';
import { cn } from '../../lib/helpers';
import { AnimatedLogo } from '../ui/AnimatedLogo';

interface NavbarProps {
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const { totalItemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
      searchInputRef.current?.blur();
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-xs border-b border-slate-200/80 text-slate-900'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-100 text-slate-900'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-6">
          {/* LEFT: Mobile Menu Button & Kinetic Animated Logo */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <AnimatedLogo size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600 ml-4">
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  cn(
                    'transition-colors hover:text-slate-900 py-1 border-b-2',
                    isActive
                      ? 'text-slate-950 border-slate-950 font-bold'
                      : 'border-transparent text-slate-600'
                  )
                }
              >
                Shop All
              </NavLink>

              {/* Categories Dropdown */}
              <div
                className="relative py-1"
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                <button
                  className="flex items-center gap-1 hover:text-slate-950 focus:outline-none transition-colors"
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  aria-expanded={categoriesOpen}
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={cn(
                      'w-3.5 h-3.5 opacity-70 transition-transform duration-200',
                      categoriesOpen ? 'rotate-180 text-slate-950' : ''
                    )}
                  />
                </button>

                <AnimatePresence>
                  {categoriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full -left-2 w-72 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-slate-200/80 p-2.5 z-50"
                    >
                      <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                        <span>Departments</span>
                        <Link
                          to="/shop"
                          onClick={() => setCategoriesOpen(false)}
                          className="text-slate-900 hover:underline lowercase font-normal"
                        >
                          view all
                        </Link>
                      </div>
                      <div className="space-y-0.5">
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/shop?category=${cat.slug}`}
                            onClick={() => setCategoriesOpen(false)}
                            className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 rounded-xl transition-colors group"
                          >
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              {cat.name}
                            </span>
                            <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-mono">
                              {cat.itemCount}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink
                to="/shop?deals=true"
                className="flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deals</span>
              </NavLink>
            </nav>
          </div>

          {/* CENTER: Clean Expandable Search Bar */}
          <div className="flex-1 max-w-md hidden md:flex justify-center">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search styles, tech, sneakers..."
                className={cn(
                  'w-full text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm pl-9 pr-10 py-2 rounded-full border transition-all duration-200 outline-none',
                  searchFocused
                    ? 'bg-white border-slate-900 shadow-md ring-4 ring-slate-900/5'
                    : 'bg-slate-100/90 hover:bg-slate-100 border-slate-200/70'
                )}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>

          {/* RIGHT: Direct Mail, Wishlist, Cart & Profile with Micro-Animations */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Direct Mail Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/70 transition-colors shadow-2xs"
              title="Direct Mail Support"
            >
              <Mail className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden xl:inline">Direct Mail</span>
            </motion.button>

            {/* Wishlist Button with Elastic Hover */}
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors block"
                title="Saved Items"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            {/* Cart Button with Animated Bounce */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Shopping Cart"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-slate-900 text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs"
                >
                  {totalItemCount}
                </motion.span>
              )}
            </motion.button>

            {/* Account Profile Link */}
            <Link
              to="/account"
              className="p-2.5 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors hidden sm:flex"
              title="My Account"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3 pt-1">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clothes, shoes, electronics..."
              className="w-full bg-slate-100 text-slate-900 placeholder:text-slate-400 text-xs pl-9 pr-4 py-2 rounded-full border border-slate-200/60 focus:border-slate-800 outline-none"
            />
          </form>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-4 shadow-xl overflow-hidden"
          >
            {/* Direct Mail Alert Banner in Mobile Menu */}
            <div className="bg-slate-900 text-white rounded-2xl p-3.5 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/10 text-cyan-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Direct Concierge Mail</p>
                  <p className="text-[11px] text-slate-400">support@novacart.com</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact?.();
                }}
                className="text-xs font-bold text-slate-900 px-3 py-1.5 rounded-lg bg-white shadow-xs hover:bg-slate-100 transition-colors"
              >
                Reach Us
              </button>
            </div>

            <div className="flex flex-col space-y-1 text-sm font-semibold text-slate-800">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-900 flex items-center justify-between"
              >
                <span>Home</span>
              </Link>
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-900 flex items-center justify-between"
              >
                <span>Shop All Products</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                to="/shop?deals=true"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-amber-50 text-amber-700 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Deals & Flash Sales</span>
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-900 flex items-center justify-between"
              >
                <span>Saved Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="text-xs bg-slate-900 text-white px-2 py-0.5 rounded-full font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-900"
              >
                My Account & Orders
              </Link>
            </div>

            {/* Quick Department Chips */}
            <div className="pt-3 border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-2.5">
                Popular Categories
              </p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to={`/shop?category=${c.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-950 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
