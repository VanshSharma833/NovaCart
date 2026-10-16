import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { Button } from '../ui/Button';

export const EditorialSection: React.FC = () => {
  return (
    <section className="py-16 bg-white overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900 rounded-3xl overflow-hidden text-white shadow-2xl">
          {/* Left: Editorial Image */}
          <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto lg:h-[500px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80"
              alt="Editorial Haute Fashion Collection"
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:hidden" />
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wider uppercase border border-indigo-500/30">
              <Compass className="w-3.5 h-3.5" />
              <span>THE EDITORIAL LOOKBOOK</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Contemporary Aesthetics, Everyday Utility.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We believe the modern wardrobe shouldn't compromise between immaculate tailoring and peak function. From French Terry heavyweights to Italian pebbled leather totes, discover pieces engineered to elevate your daily routine.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link to="/shop?category=fashion">
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore The Collection
                </Button>
              </Link>

              <Link to="/shop?category=accessories">
                <Button variant="outline" size="md" className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700">
                  Shop Accessories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
