import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { customerReviews } from '../../data/reviews';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-[#E7E5E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#737373]">
            COMMUNITY FEEDBACK
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-[#171717] tracking-tight mt-1">
            What Our Shoppers Say
          </h2>
          <p className="text-xs sm:text-sm text-[#737373] mt-2">
            Curated reviews and feedback from our demonstration cohort
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF9F6] p-6 rounded-xl border border-[#E7E5E4] flex flex-col justify-between"
            >
              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <h4 className="text-sm font-semibold text-[#171717] mb-1.5">
                  &quot;{rev.title}&quot;
                </h4>

                <p className="text-xs text-[#737373] leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E7E5E4] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-8 h-8 rounded-full object-cover border border-[#E7E5E4]"
                  />
                  <div>
                    <h5 className="text-xs font-medium text-[#171717]">{rev.author}</h5>
                    <p className="text-[10px] text-[#737373]">{rev.date}</p>
                  </div>
                </div>

                {rev.verified && (
                  <span className="flex items-center gap-1 text-[10px] font-medium text-[#171717] bg-white border border-[#E7E5E4] px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3 h-3 text-[#6554D9]" />
                    <span>Demo Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
