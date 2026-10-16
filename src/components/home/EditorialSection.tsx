import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const EditorialSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#FAF9F6] border-b border-[#E7E5E4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden p-6 sm:p-10">
          {/* Left: Editorial Image */}
          <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto lg:h-[460px] rounded-xl overflow-hidden bg-stone-100 border border-[#E7E5E4]">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80"
              alt="Editorial Haute Fashion Collection"
              className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700"
            />
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#737373]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6554D9]" />
              <span>THE EDITORIAL LOOKBOOK</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-[#171717] leading-tight">
              Contemporary Aesthetics, Everyday Utility.
            </h3>

            <p className="text-sm sm:text-base text-[#737373] leading-relaxed">
              We believe the modern wardrobe shouldn't compromise between immaculate tailoring and peak function. From French Terry heavyweights to Italian pebbled leather totes, discover pieces engineered to elevate your daily routine.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/shop?category=fashion"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#171717] hover:bg-black text-white text-sm font-semibold transition-colors"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/shop?category=accessories"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white border border-[#E7E5E4] hover:border-[#171717] text-[#171717] text-sm font-medium transition-colors"
              >
                <span>Shop Accessories</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
