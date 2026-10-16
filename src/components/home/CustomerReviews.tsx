import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { customerReviews } from '../../data/reviews';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">
            <Quote className="w-3.5 h-3.5" />
            <span>Real Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Loved by 180,000+ Shoppers
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Verified purchases from our community across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-card transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{rev.author}</h5>
                    <p className="text-[10px] text-slate-400">{rev.date}</p>
                  </div>
                </div>

                {rev.verified && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" />
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
