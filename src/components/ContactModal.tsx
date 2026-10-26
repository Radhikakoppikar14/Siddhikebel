import React, { useState, useEffect } from 'react';
import { X, MapPin, Phone, Mail, Send, CheckCircle2, User, Tag, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  prefilledItem?: string;
  onClose: () => void;
}

const FIELD_WRAP = 'relative';
const FIELD_ICON = 'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A8B84] pointer-events-none';
const FIELD_INPUT =
  'w-full pl-9 pr-2.5 py-3 bg-[#FFFAF6] border border-[#EBDCD2] rounded-xl text-[13px] leading-snug text-[#231815] placeholder:text-[#B3A59E] hover:border-[#D8C3B6] focus:outline-hidden focus:bg-white focus:border-[#D2430F] focus:ring-4 focus:ring-[#D2430F]/10 transition-all';
const LABEL = 'block text-[11px] font-semibold uppercase tracking-wider text-[#5F524C] mb-1.5';

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  prefilledItem = '',
  onClose,
}) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (prefilledItem) {
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: `Inquiry: ${prefilledItem}`,
        message: `Hello, I would like to inquire regarding specifications, pricing, and availability for: ${prefilledItem}.`,
      });
    } else {
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }
    setIsSent(false);
  }, [prefilledItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#231815]/60 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full my-auto max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] overflow-y-auto md:overflow-hidden grid grid-cols-1 md:grid-cols-[2fr_3fr] text-[#231815]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <motion.button
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-white/95 hover:bg-white text-[#231815] shadow-md cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </motion.button>

            {/* Left: brand + contact details */}
            <div className="relative bg-[#5F6670] text-white p-6 sm:p-8 flex flex-col gap-6 overflow-hidden">
              <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-[#D2430F]/40 blur-3xl pointer-events-none" />
              <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute top-10 -right-24 w-52 h-52 rounded-full border border-white/10 pointer-events-none" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-semibold uppercase tracking-widest text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F08A4B]" />
                  Get in touch
                </span>
                <h3 className="mt-4 text-2xl sm:text-3xl font-semibold font-editorial leading-tight">
                  Contact Siddhi Kabel
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  Get in touch with us for any questions about our products or solutions.
                </p>
              </div>

              <div className="relative space-y-5 text-xs">
                <div className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#FFD7C2]" />
                  </span>
                  <div>
                    <strong className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-0.5">Head Office</strong>
                    <span className="text-white/95 leading-relaxed block">
                      No.3, 1st Main Road, 1st Block, Banashankari 3rd Stage, Bangalore 560 085
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#FFD7C2]" />
                  </span>
                  <div>
                    <strong className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-0.5">Call Support</strong>
                    <a href="tel:08026720440" className="block text-white/95 hover:text-white font-mono">080 – 2672 0440</a>
                    <a href="tel:09620000947" className="block text-white/95 hover:text-white font-mono">096200 00947</a>
                    <a href="tel:09886058511" className="block text-white/95 hover:text-white font-mono">098860 58511</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#FFD7C2]" />
                  </span>
                  <div>
                    <strong className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-0.5">Email Us</strong>
                    <a href="mailto:info@siddhikabel.com" className="block text-white/95 hover:text-white">info@siddhikabel.com</a>
                    <a href="mailto:guru@siddhikabel.com" className="block text-white/95 hover:text-white">guru@siddhikabel.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="p-6 sm:p-8 md:overflow-y-auto md:max-h-[calc(100dvh-3rem)]">
              {isSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[320px] flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-[#D2430F]/10 text-[#D2430F] rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-2xl font-semibold text-[#231815] font-editorial">
                    Message Successfully Sent!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5F524C] font-light max-w-sm leading-relaxed">
                    Thank you, <strong className="font-semibold text-[#231815]">{formState.name}</strong>. An application sales engineer from Siddhi Kabel Bangalore will review your inquiry and get in touch with you shortly.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#D2430F] hover:bg-[#A8340A] rounded-full transition-colors shadow-md cursor-pointer"
                  >
                    Close Window
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="pr-10">
                    <h4 className="text-lg sm:text-xl font-semibold text-[#231815] font-editorial">
                      Send an Inquiry Message
                    </h4>
                    <div className="mt-2 h-1 w-12 rounded-full bg-[#D2430F]" />
                    {prefilledItem && (
                      <span className="inline-block mt-3 text-[11px] text-[#A8340A] bg-[#FFF1E8] px-3 py-1 rounded-full font-medium border border-[#F1D9CA]">
                        Item: {prefilledItem}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL}>Your Name *</label>
                      <div className={FIELD_WRAP}>
                        <User className={FIELD_ICON} />
                        <input
                          type="text"
                          required
                          placeholder="Enter your name"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className={FIELD_INPUT}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={LABEL}>Phone Number *</label>
                      <div className={FIELD_WRAP}>
                        <Phone className={FIELD_ICON} />
                        <input
                          type="tel"
                          required
                          placeholder="Enter your mobile number"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          className={FIELD_INPUT}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL}>Email Address *</label>
                      <div className={FIELD_WRAP}>
                        <Mail className={FIELD_ICON} />
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className={FIELD_INPUT}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={LABEL}>Subject / Requirement</label>
                      <div className={FIELD_WRAP}>
                        <Tag className={FIELD_ICON} />
                        <input
                          type="text"
                          placeholder="e.g. Lapp Cable Quote / Switchgear"
                          value={formState.subject}
                          onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                          className={FIELD_INPUT}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={LABEL}>Your Message *</label>
                    <div className={FIELD_WRAP}>
                      <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-[#9A8B84] pointer-events-none" />
                      <textarea
                        rows={4}
                        required
                        placeholder="Specify item quantities, technical queries, or project delivery deadline..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className={`${FIELD_INPUT} resize-none`}
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-3 text-xs font-semibold text-[#5F524C] hover:text-[#231815] hover:bg-[#FFF1E8] rounded-full transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={isSending}
                      className="inline-flex items-center gap-2 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#D2430F] hover:bg-[#A8340A] rounded-full transition-colors shadow-lg shadow-[#D2430F]/25 disabled:opacity-50 cursor-pointer"
                    >
                      {isSending ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Inquiry</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};