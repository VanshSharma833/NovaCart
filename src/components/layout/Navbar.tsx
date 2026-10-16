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
  Mail,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { categories } from '../../data/categories';
import { products } from '../../data/products';
import { formatPrice } from '../../lib/formatPrice';
import { cn } from '../../lib/helpers';

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

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchFocused(false);
        setCategoriesOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Quick live search matching results (up to 5)
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
      setMobileMenuOpen(false);
      searchInputRef.current?.blur();
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-colors duration-200 bg-white border-b border-[#E7E5E4]',
        isScrolled ? 'shadow-2xs' : ''
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 sm:gap-8">
          {/* LEFT: Mobile Menu Button & Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#171717] hover:text-black lg:hidden focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Editorial Minimal Logo */}
            <Link to="/" className="flex items-center gap-1.5 group select-none">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#171717]">
                NovaCart
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#6554D9] inline-block" />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#737373] ml-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    'transition-colors hover:text-[#171717]',
                    isActive ? 'text-[#171717] font-semibold' : ''
                  )
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  cn(
                    'transition-colors hover:text-[#171717]',
                    isActive ? 'text-[#171717] font-semibold' : ''
                  )
                }
              >
                Shop All
              </NavLink>

              {/* Categories Dropdown */}
              <div
                className="relative py-2"
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                <button
                  className="flex items-center gap-1 hover:text-[#171717] focus:outline-none transition-colors cursor-pointer"
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  aria-expanded={categoriesOpen}
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={cn(
                      'w-3.5 h-3.5 opacity-60 transition-transform duration-150',
                      categoriesOpen ? 'rotate-180 text-[#171717]' : ''
                    )}
                  />
                </button>

                <AnimatePresence>
                  {categoriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full -left-2 w-72 bg-white rounded-xl shadow-lg border border-[#E7E5E4] p-3 z-50"
                    >
                      <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold text-[#737373] uppercase tracking-wider border-b border-[#E7E5E4] mb-1.5">
                        <span>Departments</span>
                        <Link
                          to="/shop"
                          onClick={() => setCategoriesOpen(false)}
                          className="text-[#6554D9] hover:underline lowercase font-normal"
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
                            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#171717] hover:bg-[#FAF9F6] rounded-lg transition-colors group"
                          >
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              {cat.name}
                            </span>
                            <span className="text-[10px] text-[#737373] bg-[#FAF9F6] border border-[#E7E5E4] px-2 py-0.5 rounded-full">
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
                className={({ isActive }) =>
                  cn(
                    'transition-colors hover:text-[#171717] flex items-center gap-1.5',
                    isActive ? 'text-[#171717] font-semibold' : ''
                  )
                }
              >
                <span>Deals</span>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-[#FAF9F6] text-[#6554D9] border border-[#E7E5E4] px-1.5 py-0.5 rounded">
                  Sale
                </span>
              </NavLink>
            </nav>
          </div>

          {/* CENTER: Search Bar with Live Suggestions Dropdown */}
          <div ref={searchContainerRef} className="flex-1 max-w-sm hidden md:flex justify-center relative">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, sneakers..."
                className={cn(
                  'w-full text-[#171717] placeholder:text-[#737373] text-xs sm:text-sm pl-9 pr-8 py-2 rounded-lg border transition-colors outline-none',
                  searchFocused
                    ? 'bg-white border-[#171717]'
                    : 'bg-[#FAF9F6] hover:bg-white border-[#E7E5E4]'
                )}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#171717] p-0.5 cursor-pointer"
                  aria-label="Clear search input"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Live Autocomplete Results Dropdown */}
            <AnimatePresence>
              {searchFocused && searchQuery.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-[#E7E5E4] overflow-hidden z-50 max-h-96 overflow-y-auto"
                >
                  {searchResults.length > 0 ? (
                    <div className="p-2 space-y-1">
                      <div className="px-3 py-1.5 text-[10px] font-semibold text-[#737373] uppercase tracking-wider">
                        Matching Products
                      </div>
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          onClick={() => {
                            setSearchFocused(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#FAF9F6] transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-md bg-[#FAF9F6] border border-[#E7E5E4] p-1 shrink-0 overflow-hidden flex items-center justify-center">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <p className="text-xs font-medium text-[#171717] group-hover:text-[#6554D9] truncate transition-colors">
                              {product.name}
                            </p>
                            <p className="text-[10px] text-[#737373]">
                              {product.brand} • {product.category}
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-[#171717]">
                            {formatPrice(product.price)}
                          </span>
                        </Link>
                      ))}
                      <div className="pt-2 border-t border-[#E7E5E4]">
                        <button
                          onClick={handleSearchSubmit}
                          className="w-full py-2 px-3 rounded-lg text-xs font-medium text-center text-[#171717] hover:bg-[#FAF9F6] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>View all results for &quot;{searchQuery}&quot;</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center space-y-2">
                      <p className="text-xs text-[#171717] font-medium">
                        No products found for &quot;{searchQuery}&quot;
                      </p>
                      <p className="text-[11px] text-[#737373]">
                        Try checking your spelling or search by category name.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Direct Mail, Wishlist, Cart & Profile */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Direct Mail concierge button */}
            <button
              type="button"
              onClick={onOpenContact}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#171717] hover:bg-[#FAF9F6] border border-[#E7E5E4] transition-colors cursor-pointer"
              title="Direct Mail Support"
            >
              <Mail className="w-3.5 h-3.5 text-[#737373]" />
              <span>Contact</span>
            </button>

            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-lg text-[#171717] hover:bg-[#FAF9F6] transition-colors"
              title="Saved Items"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-[#171717]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#171717] text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg text-[#171717] hover:bg-[#FAF9F6] transition-colors cursor-pointer"
              title="Shopping Cart"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#171717]" />
              {totalItemCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[1rem] h-4 px-1 rounded-full bg-[#171717] text-white text-[9px] font-bold flex items-center justify-center">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Account Profile Link */}
            <Link
              to="/account"
              className="p-2 rounded-lg text-[#171717] hover:bg-[#FAF9F6] transition-colors hidden sm:flex"
              title="My Account"
              aria-label="Account"
            >
              <User className="w-5 h-5 text-[#171717]" />
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3 pt-1">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-[#FAF9F6] text-[#171717] placeholder:text-[#737373] text-xs pl-9 pr-4 py-2 rounded-lg border border-[#E7E5E4] focus:border-[#171717] outline-none"
            />
          </form>
        </div>
      </div>

      {/* Mobile Navigation Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-[#E7E5E4] bg-white px-4 pt-4 pb-6 space-y-4 shadow-sm overflow-hidden"
          >
            <div className="flex flex-col space-y-1 text-sm font-medium text-[#171717]">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#FAF9F6] text-[#171717]"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#FAF9F6] text-[#171717] flex items-center justify-between"
              >
                <span>Shop All</span>
                <ArrowRight className="w-4 h-4 text-[#737373]" />
              </Link>
              <Link
                to="/shop?deals=true"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#FAF9F6] text-[#171717] flex items-center justify-between"
              >
                <span>Deals</span>
                <span className="text-[10px] bg-[#FAF9F6] text-[#6554D9] border border-[#E7E5E4] px-2 py-0.5 rounded font-bold">
                  Sale
                </span>
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#FAF9F6] text-[#171717] flex items-center justify-between"
              >
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="text-xs bg-[#171717] text-white px-2 py-0.5 rounded-full font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#FAF9F6] text-[#171717]"
              >
                My Account & Orders
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact?.();
                }}
                className="px-3 py-2 rounded-lg hover:bg-[#FAF9F6] text-[#171717] text-left flex items-center justify-between"
              >
                <span>Contact Support</span>
                <Mail className="w-4 h-4 text-[#737373]" />
              </button>
            </div>

            <div className="pt-3 border-t border-[#E7E5E4]">
              <p className="text-[11px] font-semibold text-[#737373] uppercase tracking-wider px-1 mb-2.5">
                Categories
              </p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to={`/shop?category=${c.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-xs font-medium text-[#171717] rounded-lg bg-[#FAF9F6] border border-[#E7E5E4] hover:bg-white"
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
