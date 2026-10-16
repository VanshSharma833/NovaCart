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
        <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
          <h3 className="text-sm font-bold text-[#171717]">Refine Catalog</h3>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-md text-[#737373] hover:text-[#171717]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Header & Reset */}
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717]">
          Filters
        </h4>
        <button
          onClick={onReset}
          className="text-xs text-[#737373] hover:text-[#171717] font-medium flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="pt-4 border-t border-[#E7E5E4]">
        <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#737373] mb-3">
          Department
        </h5>
        <div className="space-y-1">
          <button
            onClick={() => handleCategoryChange('')}
            className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md transition-colors flex items-center justify-between ${
              filters.category === ''
                ? 'bg-[#171717] text-white font-semibold'
                : 'text-[#171717] hover:bg-[#FAF9F6]'
            }`}
          >
            <span>All Departments</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md transition-colors flex items-center justify-between ${
                filters.category === cat.slug
                  ? 'bg-[#171717] text-white font-semibold'
                  : 'text-[#171717] hover:bg-[#FAF9F6]'
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] ${
                  filters.category === cat.slug ? 'text-white/70' : 'text-[#737373]'
                }`}
              >
                {cat.itemCount}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-4 border-t border-[#E7E5E4]">
        <div className="flex items-center justify-between mb-2">
          <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#737373]">
            Price Range
          </h5>
          <span className="text-xs font-bold text-[#171717]">
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
          className="w-full accent-[#171717] bg-[#E7E5E4] h-1.5 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#737373] mt-1">
          <span>₹1,000</span>
          <span>₹85,000</span>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="pt-4 border-t border-[#E7E5E4]">
        <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#737373] mb-3">
          Brand
        </h5>
        <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
          {availableBrands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2.5 text-xs text-[#171717] hover:text-black cursor-pointer select-none py-0.5"
            >
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="w-3.5 h-3.5 rounded border-[#E7E5E4] text-[#171717] focus:ring-0 cursor-pointer accent-[#171717]"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Minimum Rating Filter */}
      <div className="pt-4 border-t border-[#E7E5E4]">
        <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#737373] mb-3">
          Minimum Rating
        </h5>
        <div className="flex flex-wrap gap-1.5">
          {[4, 4.5, 4.8].map((stars) => (
            <button
              key={stars}
              onClick={() => handleRatingChange(stars)}
              className={`py-1 px-2.5 rounded-md text-xs font-medium border transition-colors ${
                filters.rating === stars
                  ? 'bg-[#171717] text-white border-[#171717]'
                  : 'bg-white text-[#171717] border-[#E7E5E4] hover:border-[#171717]'
              }`}
            >
              ★ {stars}+
            </button>
          ))}
        </div>
      </div>

      {/* In Stock Toggle */}
      <div className="pt-4 border-t border-[#E7E5E4]">
        <label className="flex items-center justify-between cursor-pointer select-none">
          <span className="text-xs font-medium text-[#171717]">In Stock Only</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded border-[#E7E5E4] text-[#171717] focus:ring-0 accent-[#171717]"
          />
        </label>
      </div>
    </div>
  );
};
