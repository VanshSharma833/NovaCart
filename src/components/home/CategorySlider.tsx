import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  subtext: string;
}

export const CategorySlider: React.FC = () => {
  // Six dedicated categories matching the design requirements
  const sixCategories: CategoryItem[] = [
    {
      id: 'fashion',
      name: 'Fashion',
      slug: 'fashion',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80',
      itemCount: 42,
      subtext: 'Apparel & Outerwear',
    },
    {
      id: 'sneakers',
      name: 'Sneakers',
      slug: 'sneakers',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=80',
      itemCount: 28,
      subtext: 'Footwear & Streetwear',
    },
    {
      id: 'electronics',
      name: 'Electronics',
      slug: 'electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
      itemCount: 35,
      subtext: 'Audio & Mobile Tech',
    },
    {
      id: 'beauty',
      name: 'Beauty',
      slug: 'beauty',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80',
      itemCount: 30,
      subtext: 'Body & Essentials',
    },
    {
      id: 'home',
      name: 'Home & Living',
      slug: 'home',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=80',
      itemCount: 24,
      subtext: 'Decor & Living Objects',
    },
    {
      id: 'accessories',
      name: 'Accessories',
      slug: 'accessories',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=80',
      itemCount: 38,
      subtext: 'Leather & Eyewear',
    },
  ];

  return (
    <section className="py-16 bg-[#FAF9F6] border-b border-[#E7E5E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-[#E7E5E4]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#737373]">
              DEPARTMENTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight mt-1">
              Shop by Category
            </h2>
          </div>

          <Link
            to="/shop"
            className="text-xs sm:text-sm font-semibold text-[#171717] hover:text-[#6554D9] flex items-center gap-1 transition-colors"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {sixCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug}`}
              className="group bg-white rounded-xl border border-[#E7E5E4] hover:border-[#171717] p-3 flex flex-col transition-all duration-300"
            >
              {/* Product-First Photography Frame */}
              <div className="aspect-square w-full rounded-lg overflow-hidden bg-[#FAF9F6] mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
              </div>

              {/* Title & Item Count */}
              <div className="mt-auto">
                <h3 className="text-sm font-bold text-[#171717] group-hover:text-black transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#737373] mt-0.5">
                  {cat.subtext}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
