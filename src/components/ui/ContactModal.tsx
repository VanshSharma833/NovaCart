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
    showToast(`Copied ${email} to clipboard`, 'success');
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
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#E7E5E4] overflow-hidden z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#E7E5E4] flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF9F6] border border-[#E7E5E4] text-[10px] font-medium uppercase tracking-widest text-[#737373] mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6554D9]" />
                  Concierge Desk
                </div>
                <h3 className="text-xl font-medium tracking-tight text-[#171717]">
                  Contact Customer Care
                </h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  Direct one-on-one assistance with our concierge team
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-[#737373] hover:text-[#171717] hover:bg-[#FAF9F6] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Primary Email Box */}
              <div className="bg-[#FAF9F6] rounded-xl p-4 border border-[#E7E5E4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#E7E5E4] text-[#171717] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 stroke-1" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-[#737373] uppercase tracking-wider">
                      Customer Support
                    </p>
                    <a
                      href={`mailto:${supportEmail}`}
                      className="text-sm font-semibold text-[#171717] hover:text-[#6554D9] transition-colors"
                    >
                      {supportEmail}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopyEmail(supportEmail)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E7E5E4] text-[#171717] hover:bg-[#FAF9F6] transition-colors shadow-2xs self-stretch sm:self-auto justify-center"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#737373]" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* VIP Concierge Email Box */}
              <div className="bg-[#FAF9F6] rounded-xl p-4 border border-[#E7E5E4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#E7E5E4] text-[#171717] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 stroke-1" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-[#737373] uppercase tracking-wider">
                      VIP Styling & Concierge
                    </p>
                    <a
                      href={`mailto:${conciergeEmail}`}
                      className="text-sm font-semibold text-[#171717] hover:text-[#6554D9] transition-colors"
                    >
                      {conciergeEmail}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopyEmail(conciergeEmail)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E7E5E4] text-[#171717] hover:bg-[#FAF9F6] transition-colors shadow-2xs self-stretch sm:self-auto justify-center"
                >
                  <Copy className="w-3.5 h-3.5 text-[#737373]" />
                  <span>Copy VIP</span>
                </button>
              </div>

              {/* Topic Selector for Quick Prefilled Mail */}
              <div>
                <label className="block text-[11px] font-medium text-[#737373] uppercase tracking-wider mb-2">
                  Select Topic
                </label>
                <div className="flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => setSelectedTopic(t.label)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedTopic === t.label
                          ? 'bg-[#171717] text-white'
                          : 'bg-[#FAF9F6] border border-[#E7E5E4] text-[#171717] hover:border-[#171717]'
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
                className="w-full py-3 px-5 rounded-lg bg-[#171717] hover:bg-[#171717]/90 text-white font-medium text-xs tracking-wide flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open Mail Client ({selectedTopic})</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              {/* Additional Help Notes */}
              <div className="pt-3 border-t border-[#E7E5E4] grid grid-cols-2 gap-3 text-xs text-[#737373]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#737373]" />
                  <span>1800-420-NOVA</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#737373]" />
                  <span>Mon-Sun: 9 AM - 10 PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
