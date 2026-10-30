import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { COMPANY_INFO } from '../data/siddhiData';

const { contacts } = COMPANY_INFO;
const telHref = (n: string) => `tel:${n.replace(/\s+/g, '')}`;

export const ContactSection: React.FC = () => {
  const location = useLocation();
  const prefilledProduct = (location.state as { product?: string })?.product || '';

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: prefilledProduct ? `Inquiry: ${prefilledProduct}` : '',
    message: prefilledProduct
      ? `Hello, I would like to inquire about specifications, pricing, and availability for: ${prefilledProduct}.`
      : '',
  });

  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (prefilledProduct) {
      setFormState((prev) => ({
        ...prev,
        subject: `Inquiry: ${prefilledProduct}`,
        message: `Hello, I would like to inquire about specifications, pricing, and availability for: ${prefilledProduct}.`,
      }));
    }
  }, [prefilledProduct]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 600);
  };

  const inputCls =
    'w-full px-4 py-3 bg-[#FFFAF6] border border-[#F1D9CA] rounded-xl focus:bg-white focus:outline-hidden focus:border-[#F1D9CA] focus:ring-2 focus:ring-[#5F524C]/20 transition-all text-[#231815]';
  const labelCls = 'text-xs font-bold text-[#5F524C] uppercase tracking-wider mb-1';
  const iconCls = 'p-3 bg-white rounded-2xl border border-[#F1D9CA] shrink-0';

  return (
    <section id="contact" className="py-10 sm:py-12 bg-[#FFF1E8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* If pre-filled from clicking an item */}
        {prefilledProduct && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-[#D2430F]/8 border border-[#F1D9CA] rounded-2xl flex items-center justify-between gap-4 text-xs text-[#231815]"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#5F524C]">Inquiring about:</span>
              <span className="font-medium">{prefilledProduct}</span>
            </div>
            <span className="text-[#D2430F] font-light hidden sm:inline">Form automatically prepared below</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Contact details: shown straight away */}
          <div className="lg:col-span-5 bg-white text-[#231815] rounded-3xl border border-[#F1D9CA] p-6 sm:p-8 space-y-5 shadow-md">
            <div className="flex items-start gap-4">
              <div className={iconCls}>
                <MapPin className="w-5 h-5 text-[#D2430F]" />
              </div>
              <div>
                <h3 className={labelCls}>Head Office</h3>
                <p className="text-sm text-[#5F524C] leading-relaxed">
                  <strong className="font-semibold text-[#231815]">{COMPANY_INFO.name}</strong>
                  <br />
                  {contacts.address.line1},
                  <br />
                  {contacts.address.line2},
                  <br />
                  {contacts.address.city} {contacts.address.pincode}.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-t border-[#F1D9CA] pt-5">
              <div className={iconCls}>
                <Phone className="w-5 h-5 text-[#D2430F]" />
              </div>
              <div>
                <h3 className={labelCls}>Call</h3>
                <div className="space-y-1 text-sm text-[#5F524C]">
                  {[contacts.primaryPhone, contacts.secondaryPhone].map((n) => (
                    <p key={n}>
                      <a href={telHref(n)} className="hover:text-[#D2430F] font-mono font-medium transition-colors">
                        {n}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 border-t border-[#F1D9CA] pt-5">
              <div className={iconCls}>
                <Mail className="w-5 h-5 text-[#D2430F]" />
              </div>
              <div>
                <h3 className={labelCls}>Sales Email</h3>
                <a
                  href={`mailto:${contacts.salesEmail}`}
                  className="text-sm text-[#5F524C] hover:text-[#D2430F] font-mono transition-colors"
                >
                  {contacts.salesEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 border-t border-[#F1D9CA] pt-5">
              <div className={iconCls}>
                <Clock className="w-5 h-5 text-[#D2430F]" />
              </div>
              <div>
                <h3 className={labelCls}>Business Hours</h3>
                <table className="text-sm text-[#5F524C]">
                  <tbody>
                    {contacts.hours.map((h) => (
                      <tr key={h.days}>
                        <td className="pr-4 py-0.5">{h.days}</td>
                        <td className="py-0.5 font-medium text-[#231815]">{h.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Enquiry form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#F1D9CA] p-6 sm:p-8 shadow-xs">
            <h3 className="text-2xl font-normal text-[#231815] font-editorial mb-4">Send an Enquiry</h3>

            {isSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center space-y-3 bg-[#FFFAF6] rounded-2xl border border-[#F1D9CA]"
              >
                <div className="w-12 h-12 rounded-full bg-[#F1D9CA]/50 text-[#5F524C] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-medium text-[#231815] font-editorial">Enquiry Sent</h4>
                <p className="text-xs text-[#5F524C]/80 max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting Siddhi Kabel. Our sales team will get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-3 text-xs font-semibold text-[#5F524C] underline cursor-pointer"
                >
                  Send another enquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-[#231815] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#231815] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Phone"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#231815] mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#231815] mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className={`${inputCls} leading-relaxed`}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FFFAF6] bg-[#D2430F] hover:bg-[#A8340A] rounded-xl transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {isSending ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Enquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};