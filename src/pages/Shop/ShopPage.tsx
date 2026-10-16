import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { SlidersHorizontal, PackageX } from 'lucide-react';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import { FilterState, SortOption } from '../../types';
import { ProductCard } from '../../components/product/ProductCard';
import { ProductFilters } from '../../components/product/ProductFilters';
import { Button } from '../../components/ui/Button';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');

  // Available brands derived from catalog
  const availableBrands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort();
  }, []);

  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';
  const isDeals = searchParams.get('deals') === 'true';

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: initialSearch,
    category: initialCategory,
    brands: [],
    minPrice: 0,
    maxPrice: 85000,
    rating: 0,
    sizes: [],
    inStockOnly: false,
  });

  // Sync with URL query params
  useEffect(() => {
    const cat = searchParams.get('category') || '';
    const q = searchParams.get('search') || '';
    setFilters((prev) => ({
      ...prev,
      category: cat,
      searchQuery: q,
      minPrice: isDeals ? 0 : prev.minPrice,
    }));
  }, [searchParams, isDeals]);

  const currentCategoryData = useMemo(() => {
    if (!filters.category) return null;
    return categories.find((c) => c.slug === filters.category);
  }, [filters.category]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: '',
      brands: [],
      minPrice: 0,
      maxPrice: 85000,
      rating: 0,
      sizes: [],
      inStockOnly: false,
    });
    setSearchParams({});
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesCat) return false;
      }

      // Category
      if (filters.category && p.category !== filters.category) {
        return false;
      }

      // Deals filter
      if (isDeals && p.discount < 20) {
        return false;
      }

      // Brand
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) {
        return false;
      }

      // Max price
      if (p.price > filters.maxPrice) {
        return false;
      }

      // Rating
      if (filters.rating > 0 && p.rating < filters.rating) {
        return false;
      }

      // In stock
      if (filters.inStockOnly && !p.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return b.reviewCount - a.reviewCount;
    });
  }, [filters, sortBy, isDeals]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-20">
      {/* Category Hero / Shop Header Banner */}
      <div className="bg-white border-b border-[#E7E5E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {currentCategoryData ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#737373]">
                  DEPARTMENT
                </span>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#171717]">
                  {currentCategoryData.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                  {currentCategoryData.description}
                </p>
              </div>
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#FAF9F6] border border-[#E7E5E4] shrink-0">
                <img
                  src={currentCategoryData.image}
                  alt={currentCategoryData.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-1.5 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#737373]">
                CATALOG BROWSER
              </span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#171717]">
                {filters.searchQuery
                  ? `Search: "${filters.searchQuery}"`
                  : isDeals
                  ? 'Curated Offers & Archive'
                  : 'All Products'}
              </h1>
              <p className="text-xs sm:text-sm text-[#737373]">
                Carefully selected premium goods with verified authenticity and 7-day returns
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-xl border border-[#E7E5E4] sticky top-24">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              availableBrands={availableBrands}
            />
          </aside>

          {/* Product Listing Column */}
          <main className="lg:col-span-9 space-y-6">
            {/* Top Toolbar: Result Count, Filter Toggle (Mobile), Sort By */}
            <div className="bg-white p-4 rounded-xl border border-[#E7E5E4] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF9F6] border border-[#E7E5E4] text-[#171717] text-xs font-semibold"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filters</span>
                </button>

                <p className="text-xs sm:text-sm font-semibold text-[#171717]">
                  Showing <span className="font-black text-[#171717]">{filteredProducts.length}</span>{' '}
                  products
                </p>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#737373] font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-[#FAF9F6] border border-[#E7E5E4] rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#171717] cursor-pointer"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Client Rating</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#E7E5E4] p-12 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4] text-[#737373] flex items-center justify-center mb-4">
                  <PackageX className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#171717]">No products found</h3>
                <p className="text-xs text-[#737373] max-w-sm mt-1">
                  Try adjusting or clearing your filters to discover matching products.
                </p>
                <div className="mt-5">
                  <Button variant="primary" size="sm" onClick={handleResetFilters}>
                    Clear All Filters
                  </Button>
                </div>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                    }}
                    className="h-full"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 overflow-y-auto shadow-xl z-10">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              availableBrands={availableBrands}
              isMobile={true}
              onCloseMobile={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
