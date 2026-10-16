import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

interface AnnouncementBarProps {
  onOpenContact?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onOpenContact }) => {
  return (
    <aside
      aria-label="Special Offers and Support"
      className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-6 border-b border-slate-800/80 relative z-30"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
        {/* Left: Free Shipping and Guarantee */}
        <div className="flex items-center gap-2 sm:gap-3 truncate">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold text-[11px]">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>SPECIAL OFFER</span>
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Free Express Delivery on orders over <strong className="text-white font-semibold">₹999</strong>
          </span>
          <span className="text-slate-600 hidden md:inline">•</span>
          <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>7-Day Hassle-Free Returns</span>
          </span>
        </div>

        {/* Right: Direct Email & Shop Deals */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0 ml-auto">
          {/* Direct Email Link */}
          <button
            type="button"
            onClick={onOpenContact}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group"
            title="Direct Concierge Support"
          >
            <Mail className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="hidden xs:inline">Direct Mail:</span>
            <span className="font-semibold text-indigo-300 hover:underline">
              support@novacart.com
            </span>
          </button>

          <span className="text-slate-700 hidden sm:inline">|</span>

          {/* Deals CTA */}
          <Link
            to="/shop?deals=true"
            className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold transition-colors group"
          >
            <span>Exclusive Deals</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
