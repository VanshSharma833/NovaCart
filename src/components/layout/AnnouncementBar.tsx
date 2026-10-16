import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';

interface AnnouncementBarProps {
  onOpenContact?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onOpenContact }) => {
  return (
    <aside
      aria-label="Announcement"
      className="bg-[#171717] text-[#FAF9F6] text-xs py-2 px-4 sm:px-6 relative z-30"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-[11px] sm:text-xs">
        {/* Left message */}
        <div className="flex items-center gap-2 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6554D9] inline-block shrink-0" />
          <span className="text-[#E7E5E4]">
            Complimentary express delivery on orders over ₹999 • 7-day returns
          </span>
        </div>

        {/* Right direct mail / support & offers */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0 ml-auto">
          <button
            type="button"
            onClick={onOpenContact}
            className="flex items-center gap-1.5 text-[#E7E5E4] hover:text-white transition-colors"
            title="Direct Concierge Support"
          >
            <Mail className="w-3 h-3 text-[#6554D9]" />
            <span className="hidden sm:inline">Concierge:</span>
            <span className="underline decoration-[#737373] underline-offset-2 hover:decoration-white">
              support@novacart.com
            </span>
          </button>

          <span className="text-neutral-600 hidden sm:inline">|</span>

          <Link
            to="/shop?deals=true"
            className="inline-flex items-center gap-1 text-[#FAF9F6] hover:text-white font-medium transition-colors"
          >
            <span>Exclusive Deals</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
