import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, Search, PackageX } from 'lucide-react';
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
      // popularity
      return b.reviewCount - a.reviewCount;
    });
  }, [filters, sortBy, isDeals]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Category Hero / Shop Header Banner */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {currentCategoryData ? (
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="relative z-10 space-y-2 text-center md:text-left">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Department
                </span>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  {currentCategoryData.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                  {currentCategoryData.description}
                </p>
              </div>
              <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-slate-700 shrink-0">
                <img
                  src={currentCategoryData.image}
                  alt={currentCategoryData.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Explore Marketplace
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {filters.searchQuery
                  ? `Search Results for "${filters.searchQuery}"`
                  : isDeals
                  ? 'Curated Deals & Discounts'
                  : 'Shop All Products'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Browse premium collections with verified authenticity and 7-day returns
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle sticky top-24">
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
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                </button>

                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                  Showing <span className="font-extrabold text-slate-900">{filteredProducts.length}</span>{' '}
                  products
                </p>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4">
                  <PackageX className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No matching products found</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1">
                  We couldn't find any items matching your active filter criteria. Try adjusting your
                  search or clearing your filters.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  className="mt-6"
                  onClick={handleResetFilters}
                >
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              availableBrands={availableBrands}
              isMobile
              onCloseMobile={() => setMobileFilterOpen(false)}
            />
            <div className="pt-6">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setMobileFilterOpen(false)}
              >
                Apply Filters ({filteredProducts.length})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
