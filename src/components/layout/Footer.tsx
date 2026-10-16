import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Check,
  Mail,
  Copy,
  Clock,
  Phone,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface FooterProps {
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      showToast('Thank you for subscribing! Check your inbox for your 10% off code.');
      setEmail('');
    } else {
      showToast('Please enter a valid email address.', 'error');
    }
  };

  const handleCopySupport = () => {
    navigator.clipboard.writeText('support@novacart.com');
    setCopiedEmail(true);
    showToast('Copied support@novacart.com to clipboard!', 'success');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="bg-white text-[#171717] pt-16 pb-24 sm:pb-14 border-t border-[#E7E5E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#E7E5E4]">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E7E5E4] text-[#171717] shrink-0">
              <Truck className="w-4 h-4 text-[#171717]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#171717]">Express Delivery</h4>
              <p className="text-xs text-[#737373] mt-0.5">Complimentary over ₹999</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E7E5E4] text-[#171717] shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#171717]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#171717]">100% Genuine</h4>
              <p className="text-xs text-[#737373] mt-0.5">Verified authentic sourcing</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E7E5E4] text-[#171717] shrink-0">
              <RotateCcw className="w-4 h-4 text-[#171717]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#171717]">7-Day Returns</h4>
              <p className="text-xs text-[#737373] mt-0.5">Hassle-free doorstep pickup</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E7E5E4] text-[#171717] shrink-0">
              <Headphones className="w-4 h-4 text-[#171717]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#171717]">Direct Support</h4>
              <p className="text-xs text-[#737373] mt-0.5">Concierge desk &lt; 2h reply</p>
            </div>
          </div>
        </div>

        {/* Direct Email Concierge Bar */}
        <div className="my-10 bg-[#FAF9F6] border border-[#E7E5E4] rounded-xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg bg-white border border-[#E7E5E4] flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-[#171717]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#737373] uppercase tracking-wider mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6554D9]" />
                <span>Customer Concierge</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#171717]">
                Need sizing advice or order assistance?
              </h3>
              <p className="text-xs text-[#737373] mt-0.5">
                Our team responds directly within 2 hours.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="mailto:support@novacart.com?subject=Inquiry%20from%20NovaCart%20Customer"
              className="px-4 py-2.5 rounded-lg bg-[#171717] hover:bg-black text-white font-medium text-xs transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Mail: support@novacart.com</span>
            </a>

            <button
              type="button"
              onClick={handleCopySupport}
              className="px-3.5 py-2.5 rounded-lg bg-white border border-[#E7E5E4] hover:border-[#171717] text-[#171717] font-medium text-xs transition-colors flex items-center gap-1.5"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#737373]" />}
              <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
            </button>

            {onOpenContact && (
              <button
                type="button"
                onClick={onOpenContact}
                className="px-3.5 py-2.5 rounded-lg bg-white border border-[#E7E5E4] hover:border-[#171717] text-[#171717] font-medium text-xs transition-colors"
              >
                Help Desk
              </button>
            )}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-b border-[#E7E5E4] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-[#171717] tracking-tight">
              Subscribe to the Lookbook
            </h3>
            <p className="text-xs text-[#737373] mt-1">
              Private season alerts, curated collections, and 10% off your initial order.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto max-w-md gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
              className="flex-1 sm:w-64 bg-[#FAF9F6] border border-[#E7E5E4] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#171717] placeholder:text-[#737373] focus:outline-none focus:border-[#171717]"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#171717] hover:bg-black text-white text-xs sm:text-sm font-semibold transition-colors shrink-0"
            >
              {subscribed ? 'Joined' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Navigation Columns */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-[#737373]">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-base font-black tracking-tight text-[#171717]">NovaCart</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#6554D9]" />
            </div>
            <p className="leading-relaxed text-[#737373]">
              Curated marketplace combining contemporary fashion, electronics, and home living.
            </p>
            <div className="mt-4 space-y-1.5 text-xs">
              <p className="flex items-center gap-2 text-[#737373]">
                <Mail className="w-3.5 h-3.5 text-[#171717]" />
                <a href="mailto:support@novacart.com" className="hover:text-[#171717] transition-colors">
                  support@novacart.com
                </a>
              </p>
              <p className="flex items-center gap-2 text-[#737373]">
                <Phone className="w-3.5 h-3.5 text-[#171717]" />
                <span>1800-420-NOVA</span>
              </p>
              <p className="flex items-center gap-2 text-[#737373]">
                <Clock className="w-3.5 h-3.5 text-[#171717]" />
                <span>Mon-Sun: 9:00 AM - 10:00 PM IST</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-3">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#171717] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#171717] transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/shop?deals=true" className="hover:text-[#171717] transition-colors">Exclusive Deals</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-[#171717] transition-colors">Wishlist</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#171717] transition-colors">Shopping Cart</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-3">Departments</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop?category=fashion" className="hover:text-[#171717] transition-colors">Fashion</Link>
              </li>
              <li>
                <Link to="/shop?category=sneakers" className="hover:text-[#171717] transition-colors">Sneakers</Link>
              </li>
              <li>
                <Link to="/shop?category=electronics" className="hover:text-[#171717] transition-colors">Electronics</Link>
              </li>
              <li>
                <Link to="/shop?category=beauty" className="hover:text-[#171717] transition-colors">Beauty & Body</Link>
              </li>
              <li>
                <Link to="/shop?category=home" className="hover:text-[#171717] transition-colors">Home & Living</Link>
              </li>
              <li>
                <Link to="/shop?category=accessories" className="hover:text-[#171717] transition-colors">Accessories</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-3">Client Care</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="hover:text-[#171717] transition-colors">Track Orders</Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-[#171717] transition-colors">Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-[#171717] transition-colors">Shipping Details</Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="hover:text-[#171717] transition-colors text-left"
                >
                  Direct Mail Concierge
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737373]">
          <p>© 2026 NovaCart Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#171717] cursor-pointer">Privacy</span>
            <span className="hover:text-[#171717] cursor-pointer">Terms</span>
            <span className="hover:text-[#171717] cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
