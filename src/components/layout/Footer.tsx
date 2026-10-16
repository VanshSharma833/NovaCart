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
    <footer className="bg-[#06080F] text-slate-300 pt-16 pb-24 sm:pb-14 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-white/10">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#0D121E] border border-white/10 text-cyan-400 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">Express Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Complimentary over ₹999</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#0D121E] border border-white/10 text-cyan-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">100% Genuine</h4>
              <p className="text-xs text-slate-400 mt-0.5">Verified authentic sourcing</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#0D121E] border border-white/10 text-cyan-400 shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">7-Day Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5">Hassle-free doorstep pickup</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#0D121E] border border-white/10 text-cyan-400 shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">Direct Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Concierge desk &lt; 2h reply</p>
            </div>
          </div>
        </div>

        {/* Direct Email Concierge Bar */}
        <div className="my-10 bg-[#0D121E] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-cyan-400">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Customer Concierge</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Need sizing advice or order assistance?
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Our team responds directly within 2 hours.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="mailto:support@novacart.com?subject=Inquiry%20from%20NovaCart%20Customer"
              className="px-4 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 hover:bg-slate-100 shadow-md"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Mail: support@novacart.com</span>
            </a>

            <button
              type="button"
              onClick={handleCopySupport}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 hover:border-white/35 text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
            </button>

            {onOpenContact && (
              <button
                type="button"
                onClick={onOpenContact}
                className="px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 hover:border-white/35 text-white font-medium text-xs transition-colors cursor-pointer"
              >
                Help Desk
              </button>
            )}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-b border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Subscribe to the Lookbook
            </h3>
            <p className="text-xs text-slate-400 mt-1">
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
              className="flex-1 sm:w-64 bg-[#0B0F19] border border-white/15 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-white text-slate-950 text-xs sm:text-sm font-bold hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
            >
              {subscribed ? 'Joined' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Navigation Columns */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-slate-400">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-base font-black tracking-tight text-white">NovaCart</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
            <p className="leading-relaxed text-slate-400">
              Curated marketplace combining contemporary fashion, electronics, and home living.
            </p>
            <div className="mt-4 space-y-1.5 text-xs">
              <p className="flex items-center gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <a href="mailto:support@novacart.com" className="hover:text-white transition-colors">
                  support@novacart.com
                </a>
              </p>
              <p className="flex items-center gap-2 text-slate-400">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>1800-420-NOVA</span>
              </p>
              <p className="flex items-center gap-2 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Mon-Sun: 9:00 AM - 10:00 PM IST</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/shop?deals=true" className="hover:text-white transition-colors">Exclusive Deals</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">Shopping Cart</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Departments</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop?category=fashion" className="hover:text-white transition-colors">Fashion</Link>
              </li>
              <li>
                <Link to="/shop?category=sneakers" className="hover:text-white transition-colors">Sneakers</Link>
              </li>
              <li>
                <Link to="/shop?category=electronics" className="hover:text-white transition-colors">Electronics</Link>
              </li>
              <li>
                <Link to="/shop?category=beauty" className="hover:text-white transition-colors">Beauty & Body</Link>
              </li>
              <li>
                <Link to="/shop?category=home" className="hover:text-white transition-colors">Home & Living</Link>
              </li>
              <li>
                <Link to="/shop?category=accessories" className="hover:text-white transition-colors">Accessories</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Client Care</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="hover:text-white transition-colors">Track Orders</Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors">Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors">Shipping Details</Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Direct Mail Concierge
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 NovaCart Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
