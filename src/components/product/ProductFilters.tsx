import React from 'react';
import { FilterState } from '../../types';
import { categories } from '../../data/categories';
import { formatPrice } from '../../lib/formatPrice';
import { X, RotateCcw } from 'lucide-react';

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  availableBrands: string[];
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onChange,
  onReset,
  availableBrands,
  isMobile = false,
  onCloseMobile,
}) => {
  const handleCategoryChange = (slug: string) => {
    onChange({
      ...filters,
      category: filters.category === slug ? '' : slug,
    });
  };

  const handleBrandToggle = (brand: string) => {
    const nextBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: nextBrands });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, maxPrice: Number(e.target.value) });
  };

  const handleRatingChange = (rating: number) => {
    onChange({ ...filters, rating: filters.rating === rating ? 0 : rating });
  };

  return (
    <div className="space-y-6">
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Filters</h3>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Header & Reset */}
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
          Filters
        </h4>
        <button
          onClick={onReset}
          className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          Category
        </h5>
        <div className="space-y-2">
          <button
            onClick={() => handleCategoryChange('')}
            className={`w-full text-left text-xs font-medium px-2 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
              filters.category === ''
                ? 'bg-indigo-50 text-indigo-600 font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`w-full text-left text-xs font-medium px-2 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                filters.category === cat.slug
                  ? 'bg-indigo-50 text-indigo-600 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[11px] text-slate-400">({cat.itemCount})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Price Range
          </h5>
          <span className="text-xs font-bold text-indigo-600">
            Up to {formatPrice(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="85000"
          step="1000"
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="w-full accent-indigo-600 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>₹1,000</span>
          <span>₹85,000</span>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          Brand
        </h5>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 no-scrollbar">
          {availableBrands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-indigo-600 select-none"
            >
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          Minimum Rating
        </h5>
        <div className="flex gap-2">
          {[4.5, 4.0, 3.0].map((ratingVal) => (
            <button
              key={ratingVal}
              onClick={() => handleRatingChange(ratingVal)}
              className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                filters.rating === ratingVal
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              ★ {ratingVal}+
            </button>
          ))}
        </div>
      </div>

      {/* In-Stock Filter */}
      <div className="pt-4 border-t border-slate-100">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
          />
          <span>In Stock Only</span>
        </label>
      </div>
    </div>
  );
};
