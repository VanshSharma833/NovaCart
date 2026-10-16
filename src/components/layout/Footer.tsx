import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Send,
  Check,
  Mail,
  Copy,
  Clock,
  MapPin,
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
    <footer className="bg-[#070913] text-slate-300 pt-16 pb-24 sm:pb-14 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Value Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-slate-800/80">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Free Express Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">On all orders above ₹999</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Genuine Guaranteed</h4>
              <p className="text-xs text-slate-400 mt-0.5">Directly sourced from verified brands</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">7-Day Hassle-Free Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5">Door-step pickup & quick refund</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">24/7 Dedicated Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Email response in under 2 hours</p>
            </div>
          </div>
        </div>

        {/* Direct Email Concierge Banner */}
        <div className="my-10 bg-gradient-to-r from-indigo-950/70 via-slate-900 to-indigo-950/70 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl backdrop-blur-md">
          <div className="flex items-start sm:items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-cyan-400 shrink-0 mx-auto sm:mx-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                <span>Direct Customer Desk</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Have questions or need assistance? Email us directly.
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Our concierge desk replies within 2 hours for orders, sizing, exchanges, and custom requests.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
            {/* Direct Mailto Button */}
            <a
              href="mailto:support@novacart.com?subject=Inquiry%20from%20NovaCart%20Shopper"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-md shadow-indigo-600/30"
            >
              <Mail className="w-4 h-4" />
              <span>Mail: support@novacart.com</span>
            </a>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopySupport}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
            </button>

            {/* Open Concierge Modal */}
            {onOpenContact && (
              <button
                type="button"
                onClick={onOpenContact}
                className="px-4 py-2.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 font-semibold text-xs transition-colors"
              >
                Open Concierge Modal
              </button>
            )}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-b border-slate-800/80 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Join Our VIP Newsletter
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Receive private drop alerts, runway drops, and 10% off your first order.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto max-w-md gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="flex-1 sm:w-72 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md shadow-indigo-600/30"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Joined</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Navigation Columns */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Nova<span className="text-indigo-400">Cart</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curated marketplace combining luxury fashion, cutting-edge electronics, and home living.
            </p>
            <div className="mt-4 space-y-1 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <a href="mailto:support@novacart.com" className="hover:text-white transition-colors">
                  support@novacart.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                <span>1800-420-NOVA (Toll Free)</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Mon-Sun: 9:00 AM - 10:00 PM IST</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">Shop All</Link>
              </li>
              <li>
                <Link to="/shop?deals=true" className="hover:text-white transition-colors">Deals & Offers</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">Cart</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Customer Care</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/account" className="hover:text-white transition-colors">Track Orders</Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors">Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors">Shipping Information</Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="hover:text-white transition-colors text-left"
                >
                  Direct Mail Concierge
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/shop?category=fashion" className="hover:text-white transition-colors">Fashion Apparel</Link>
              </li>
              <li>
                <Link to="/shop?category=sneakers" className="hover:text-white transition-colors">Sneakers & Kicks</Link>
              </li>
              <li>
                <Link to="/shop?category=electronics" className="hover:text-white transition-colors">Audio & Mobiles</Link>
              </li>
              <li>
                <Link to="/shop?category=home" className="hover:text-white transition-colors">Home & Living</Link>
              </li>
              <li>
                <Link to="/shop?category=beauty" className="hover:text-white transition-colors">Beauty & Skincare</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 NovaCart Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
