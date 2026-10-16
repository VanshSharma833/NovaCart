import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X, Copy, Check, Clock, ShieldCheck, Send, MessageSquare, Phone, ExternalLink } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Order & Delivery Support');
  const { showToast } = useToast();

  const supportEmail = 'support@novacart.com';
  const conciergeEmail = 'concierge@novacart.com';

  const topics = [
    { label: 'Order & Delivery Support', subject: 'Inquiry: Order Status & Delivery' },
    { label: 'Size & Fit Consultation', subject: 'Styling Advice: Sizing & Product Fit' },
    { label: 'Returns & Instant Refunds', subject: 'Support: Return/Exchange Request' },
    { label: 'Product Authenticity & Specs', subject: 'Product Question: Authenticity Verification' },
    { label: 'Partnership & Wholesale', subject: 'Business Inquiry: Brand Collaboration' },
  ];

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    showToast(`Copied ${email} to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const currentSubject = topics.find((t) => t.label === selectedTopic)?.subject || 'NovaCart Support Request';
  const mailtoUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(currentSubject)}&body=${encodeURIComponent(
    `Hello NovaCart Concierge Team,\n\nI need assistance regarding: ${selectedTopic}.\n\n[Please describe your request or order ID here]\n\nThank you!`
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden z-10"
          >
            {/* Header with Cool Gradient Glow */}
            <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-7 text-white overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-cyan-400 shadow-inner">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                      <span>Direct Mail Concierge</span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Direct 1-on-1 assistance with our dedicated team
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Pill */}
              <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Concierge Desk Online</span>
                <span className="text-slate-500">•</span>
                <Clock className="w-3 h-3 text-slate-400" />
                <span>Response in &lt; 2 hrs</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-7 space-y-6">
              {/* Primary Email Box */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Customer Support
                    </p>
                    <a
                      href={`mailto:${supportEmail}`}
                      className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                    >
                      {supportEmail}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopyEmail(supportEmail)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all shadow-xs self-stretch sm:self-auto justify-center"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* VIP Concierge Email Box */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      VIP Styling & Escalations
                    </p>
                    <a
                      href={`mailto:${conciergeEmail}`}
                      className="text-base font-bold text-slate-900 hover:text-purple-600 transition-colors"
                    >
                      {conciergeEmail}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopyEmail(conciergeEmail)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all shadow-xs self-stretch sm:self-auto justify-center"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy VIP</span>
                </button>
              </div>

              {/* Topic Selector for Quick Prefilled Mail */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Select Topic for Auto-Formatted Email:
                </label>
                <div className="flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => setSelectedTopic(t.label)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedTopic === t.label
                          ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                          : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Mail Action Button */}
              <a
                href={mailtoUrl}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all hover:shadow-indigo-600/40 active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                <span>Open Mail Client ({selectedTopic})</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              {/* Additional Help Notes */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Toll-Free: 1800-420-NOVA</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mon-Sun: 9 AM - 10 PM IST</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
