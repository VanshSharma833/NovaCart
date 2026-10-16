import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Copy, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const PromoBanner: React.FC = () => {
  const [copied, setCopied] = React.useState(false);
  const { showToast } = useToast();

  const handleCopyCode = () => {
    navigator.clipboard.writeText('NOVA15');
    setCopied(true);
    showToast('Promo code NOVA15 copied! Use at checkout for 15% off.');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border border-slate-800 text-white p-8 sm:p-12 shadow-2xl">
          {/* Background glowing gradients */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-500/20 blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-cyan-500/15 blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Season Finale Special</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Unlock An Extra <span className="text-indigo-400">15% Off</span> Everything
              </h3>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl">
                Upgrade your wardrobe, grab the latest noise-cancelling tech, or revamp your living space. Limited to the first 500 customers this week.
              </p>

              {/* Coupon chip */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-900/90 border border-indigo-500/30 px-3.5 py-2 rounded-xl">
                  <span className="text-xs text-slate-400">Coupon:</span>
                  <span className="font-mono text-sm font-bold text-white tracking-widest">
                    NOVA15
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="p-1 text-indigo-400 hover:text-white transition-colors"
                    title="Copy code"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-xs text-slate-400 font-medium">• No minimum cart value</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-sm font-bold shadow-lg transition-transform active:scale-95 group"
              >
                <span>Shop Season Deals</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
