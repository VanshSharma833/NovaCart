import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { customerReviews } from '../../data/reviews';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 bg-[#070A12] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-Aligned Editorial Header — No AI slop centering */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10 gap-4">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              COMMUNITY TESTIMONIALS • VERIFIED REVIEWS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              What Our Shoppers Say
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
              Authentic impressions from verified buyers across our fashion, audio, and curated lifestyle collections.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-end">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-bold text-white">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0 Global Rating</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#0E1424] p-6 rounded-2xl border border-white/10 flex flex-col justify-between shadow-xl text-left"
            >
              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <h4 className="text-sm font-bold text-white mb-1.5">
                  &quot;{rev.title}&quot;
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-8 h-8 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h5 className="text-xs font-semibold text-white">{rev.author}</h5>
                    <p className="text-[10px] text-slate-400">{rev.date}</p>
                  </div>
                </div>

                {rev.verified && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-cyan-300 bg-white/10 border border-white/15 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3 h-3 text-cyan-400" />
                    <span>Verified</span>
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
