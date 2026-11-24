import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Wrench, Cog, Warehouse, Truck, Globe, FileCheck, BadgeCheck, HeartHandshake, Scale, ShieldCheck, Sparkles, Factory, Building2, Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Each card: soft line-art + a wash colour that keeps the text sharp
const STAT_CARDS = [
  { tint: '253,229,211' }, // warm peach
  { tint: '255,244,214' }, // warm cream
  { tint: '233,238,244' }, // cool grey
  { tint: '245,236,228' }, // warm sand
];

// Soft line-art backgrounds for the three counter cards (right side, text stays on the left)
const CARD_ART: React.ReactNode[] = [
  // 1. Experience: milestone timeline rising to a flag
  <svg preserveAspectRatio="xMaxYMid meet" key="timeline" viewBox="0 0 200 120" fill="none" stroke="#D2430F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 100H192" />
    <path d="M30 100V82M70 100V68M110 100V54M150 100V40M184 100V22" strokeDasharray="2 4" />
    <polyline points="30,82 70,68 110,54 150,40 184,22" />
    <g fill="#D2430F" stroke="none"><circle cx="30" cy="82" r="3.5" /><circle cx="70" cy="68" r="3.5" /><circle cx="110" cy="54" r="3.5" /><circle cx="150" cy="40" r="3.5" /></g>
    <path d="M184 22V6M184 6l14 5-14 5" />
    <circle cx="184" cy="22" r="5" />
  </svg>,
  // 2. Established: calendar
  <svg preserveAspectRatio="xMaxYMid meet" key="calendar" viewBox="0 0 200 120" fill="none" stroke="#D2430F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="110" y="22" width="72" height="80" rx="6" />
    <path d="M110 44H182M130 12V30M162 12V30" />
    <path d="M122 58h10M144 58h10M166 58h8M122 72h10M144 72h10M166 72h8M122 86h10M144 86h10" />
  </svg>,
  // 3. Customers: pan-India network map
  <svg preserveAspectRatio="xMaxYMid meet" key="india" viewBox="0 0 100 100" fill="none" stroke="#D2430F" strokeWidth="0.9" strokeLinejoin="round" aria-hidden="true">
    <path d="M2.2 46.0 L4.1 44.0 L6.7 44.0 L8.4 44.4 L9.7 42.0 L8.9 39.7 L8.5 37.3 L6.6 35.3 L6.9 33.3 L9.2 31.5 L11.5 32.0 L14.4 31.3 L17.7 28.3 L21.0 25.3 L23.3 22.3 L23.3 19.7 L24.6 18.7 L25.6 17.0 L26.6 16.0 L25.2 15.0 L22.6 15.7 L21.6 13.7 L20.7 11.7 L19.3 9.7 L21.0 8.3 L20.3 6.0 L22.6 4.0 L23.3 2.0 L26.2 1.5 L29.5 2.0 L32.5 5.8 L34.1 7.0 L37.4 8.7 L40.0 9.0 L42.0 7.7 L40.7 11.7 L39.0 14.3 L37.0 16.0 L36.7 18.3 L36.9 20.3 L37.7 21.8 L41.6 23.3 L44.3 24.3 L42.6 26.0 L41.3 28.8 L42.8 29.3 L45.6 30.0 L47.5 31.3 L49.8 32.7 L51.8 33.8 L53.9 33.7 L56.2 34.8 L58.4 35.8 L61.6 36.3 L64.6 37.0 L66.9 37.0 L67.7 35.8 L67.4 33.3 L67.7 32.0 L69.0 31.3 L70.0 31.3 L69.7 33.8 L71.1 35.5 L73.1 35.8 L75.1 35.5 L79.0 35.5 L79.3 32.5 L80.7 32.3 L82.6 31.3 L85.2 29.5 L87.2 28.3 L89.5 27.3 L93.4 27.0 L95.7 30.0 L97.9 30.8 L97.0 32.3 L94.1 34.0 L91.8 36.0 L90.8 38.3 L89.2 40.0 L88.9 41.0 L87.2 45.0 L84.9 45.3 L84.1 48.3 L83.4 50.0 L83.9 51.8 L82.3 51.8 L82.0 51.7 L81.3 48.5 L78.7 48.5 L77.9 47.3 L78.0 44.7 L80.3 43.7 L81.1 41.8 L80.0 41.2 L75.9 41.0 L73.3 40.7 L73.1 38.3 L71.5 37.2 L70.5 37.0 L68.9 37.3 L68.5 38.7 L68.9 39.0 L67.7 41.0 L67.2 42.8 L67.5 44.3 L68.2 46.0 L69.2 47.7 L69.7 49.2 L70.5 51.3 L70.2 53.0 L67.7 52.8 L65.6 53.0 L63.9 53.3 L63.0 57.3 L60.1 59.0 L57.0 60.8 L54.1 64.0 L51.8 66.0 L48.4 68.5 L44.8 71.1 L41.3 76.8 L42.0 79.7 L41.9 81.4 L40.4 85.2 L40.5 89.1 L40.5 90.7 L38.7 94.1 L34.9 95.7 L33.0 98.1 L29.8 95.3 L28.9 93.3 L28.7 91.8 L25.8 85.4 L24.1 82.2 L21.6 75.7 L20.7 73.3 L19.0 68.3 L17.4 61.8 L17.5 57.0 L17.4 54.3 L16.8 50.7 L15.2 52.4 L13.1 54.7 L11.4 56.0 L9.4 55.3 L6.9 52.9 L4.8 50.9 L5.1 50.1 L8.4 50.1 L8.9 48.4 L6.1 48.9 L3.3 45.9 Z" fill="#D2430F" fillOpacity="0.14" />
    <g strokeWidth="0.6" strokeDasharray="2 2"><line x1="33.1" y1="81.8" x2="31.8" y2="29.7"/><line x1="33.1" y1="81.8" x2="17.7" y2="61.3"/><line x1="33.1" y1="81.8" x2="42.0" y2="81.3"/><line x1="33.1" y1="81.8" x2="68.5" y2="49.7"/><line x1="33.1" y1="81.8" x2="36.1" y2="67.0"/><line x1="33.1" y1="81.8" x2="16.7" y2="48.3"/></g>
    <g fill="#D2430F" stroke="none"><circle cx="33.1" cy="81.8" r="3.4"/><circle cx="31.8" cy="29.7" r="2.5"/><circle cx="17.7" cy="61.3" r="2.5"/><circle cx="42.0" cy="81.3" r="2.5"/><circle cx="68.5" cy="49.7" r="2.5"/><circle cx="36.1" cy="67.0" r="2.5"/><circle cx="16.7" cy="48.3" r="2.5"/></g>
  </svg>,
  // 4. Brands: four partner tiles
  <svg preserveAspectRatio="xMaxYMid meet" key="brands" viewBox="0 0 200 120" fill="none" stroke="#D2430F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="104" y="14" width="38" height="38" rx="6" /><rect x="148" y="14" width="38" height="38" rx="6" />
    <rect x="104" y="58" width="38" height="38" rx="6" /><rect x="148" y="58" width="38" height="38" rx="6" />
    <g fill="#D2430F" stroke="none"><circle cx="123" cy="33" r="4" /><circle cx="167" cy="33" r="4" /><circle cx="123" cy="77" r="4" /><circle cx="167" cy="77" r="4" /></g>
  </svg>,
];

const IconBubble: React.FC<{ icon: React.ElementType }> = ({ icon: Icon }) => (
  <span className="w-9 h-9 rounded-full bg-white border border-[#F1D9CA] text-[#D2430F] flex items-center justify-center shadow-sm group-hover:bg-[#D2430F] group-hover:text-white transition-colors duration-200">
    <Icon size={18} />
  </span>
);

const IconRow: React.FC<{ icons: React.ElementType[] }> = ({ icons }) => (
  <div className="flex items-center gap-2 mt-3">
    {icons.map((I, i) => (
      <IconBubble key={i} icon={I} />
    ))}
  </div>
);

const BRAND_LOGOS = [
  '/images/clients/lapp.png',
  '/images/clients/eaton.png',
  '/images/clients/partex.png',
  '/images/clients/mennekes.png',
];

const APPLICATIONS = [
  { label: 'Industrial', img: '/images/industries/steel-cement.jpg', icon: Factory },
  { label: 'Commercial', img: '/images/industries/construction.jpg', icon: Building2 },
  { label: 'Domestic', img: '/images/domestic.jpg', icon: Lightbulb },
];

const InfoCard: React.FC<{
  num: string;
  title: string;
  desc: string;
  side?: 'left' | 'right';
  delay?: number;
  children?: React.ReactNode;
}> = ({ num, title, desc, side, delay = 0, children }) => (
  <motion.div
    initial={{ opacity: 0, x: side === 'right' ? 24 : -24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.45, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="relative group rounded-2xl border border-[#F1D9CA] hover:border-[#D2430F]/50 bg-gradient-to-br from-white to-[#FFF1E8] shadow-sm hover:shadow-lg transition-all duration-200 p-4 sm:p-5 overflow-hidden cursor-default lg:flex-1 min-h-fit"
  >
    <div className="absolute top-0 left-0 right-0 h-1 bg-[#D2430F]/70 group-hover:bg-[#D2430F] transition-colors" />
    <span className="absolute right-3 top-3.5 w-7 h-7 rounded-full bg-[#D2430F]/10 text-[#D2430F] text-[11px] font-mono font-bold flex items-center justify-center">
      {num}
    </span>
    <h4 className="text-sm sm:text-base font-semibold text-[#231815] leading-snug pr-9">{title}</h4>
    <p className="text-xs sm:text-[13px] text-[#5F524C] leading-relaxed mt-1">{desc}</p>
    {children}
  </motion.div>
);

const AnimatedCounterCard: React.FC<{
  target: number;
  /** Show this text instead of a counting number (e.g. "Multi") */
  text?: string;
  suffix: string;
  label: string;
  subLabel?: string;
  theme?: number;
}> = ({ target, text, suffix, label, subLabel, theme = 0 }) => {
  const [count, setCount] = useState(0);
  const card = STAT_CARDS[theme % STAT_CARDS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      onViewportEnter={() => {
        if (text) return;
        setCount(0);
        let start = 0;
        const duration = 1200;
        const steps = 30;
        const stepTime = duration / steps;
        const increment = target / steps;
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, stepTime);
      }}
      whileHover={{ y: -7, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative p-4 sm:p-6 rounded-2xl border border-[#F1CDB3] shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-default group overflow-hidden bg-[#FFF7F0]"
    >
      {/* Wash: solid behind the text, lighter towards the graphic */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, rgba(${card.tint},0.97) 0%, rgba(${card.tint},0.85) 45%, rgba(${card.tint},0.35) 100%)`,
        }}
      />
      {/* Soft themed graphic, right side */}
      <div className={`absolute inset-y-0 right-0 ${text ? 'w-1/4 opacity-25' : theme === 2 ? 'w-[42%] opacity-70' : 'w-3/5 opacity-35'} flex items-center justify-end pr-3 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none`}>
        <div className="h-[85%] w-full [&>svg]:h-full [&>svg]:w-full [&>svg]:object-right">
          {CARD_ART[theme % CARD_ART.length]}
        </div>
      </div>
      {/* Accent bar */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#D2430F]" />

      <div className="relative z-10 pl-2">
        <div className="flex items-baseline justify-between">
          <div className="flex flex-wrap items-baseline">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-light font-editorial text-[#1E293B] tabular-nums tracking-tight">
              {text ?? count.toLocaleString('en-US')}
            </span>
            <span className={`text-2xl sm:text-3xl font-light text-[#D2430F] font-editorial ${text ? 'ml-2' : 'ml-0.5'}`}>
              {suffix}
            </span>
          </div>
        </div>
        <span className="text-xs sm:text-sm text-[#1E293B] font-semibold mt-2.5 block tracking-tight">
          {label}
        </span>
        {subLabel && (
          <span className="text-[11px] text-[#475569] font-normal block mt-0.5">
            {subLabel}
          </span>
        )}
      </div>
    </motion.div>
  );
};

interface WhyChooseUsProps {
  onOpenRfq?: (subject?: string) => void;
  /** Hide the "Built on experience" text block (used on the About page, which has its own intro) */
  hideAbout?: boolean;
}

// To show a looping video in the "Why" hub, put a file at this path in /public.
// If it is missing, the photo is shown instead.

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenRfq, hideAbout = false }) => {
  return (
    <section id="about" className="py-10 sm:py-12 bg-white border-b border-[#F1D9CA] relative overflow-hidden">
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#FFF1E8] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#D2430F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Story & Background Split */}
        {!hideAbout && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#5F524C] px-3.5 py-1.5 rounded-full bg-[#FFF1E8] border border-[#F1D9CA]">
              <Sparkles className="w-3.5 h-3.5 text-[#D2430F]" />
              <span>About Siddhi Kabel</span>
            </div>
            <p className="text-sm font-semibold text-[#D2430F]">Siddhi Kabel Corporation Private Limited</p>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#231815] font-editorial tracking-tight leading-[1.15]">
              Built on experience. <br className="hidden sm:inline" />
              Focused on your application.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#231815]/85 font-light leading-relaxed">
              <p>
                Since 2008, Siddhi Kabel Corporation Private Limited has supported industrial businesses with electrical, automation, safety and infrastructure requirements. We provide access to trusted LAPP, Eaton, Partex and MENNEKES product ranges—alongside sourcing support for allied product needs.
              </p>
              <p>
                From OEM product specifications and project-based requirements to maintenance, repair and overhaul support, we help identify suitable products and coordinate supply for plants, control panels, buildings and production lines. Our allied offerings include LT and HT armoured and unarmoured cables, industrial lighting and earthing products. MRO support covers Maintenance, Repair and Overhaul. With more than 33 years of industrial experience, we are able to make procurement clearer and ongoing support more dependable.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5 relative flex flex-col justify-center self-stretch rounded-2xl border border-[#F1D9CA] bg-gradient-to-br from-white to-[#FFF1E8] shadow-sm p-6 sm:p-10 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#D2430F]" />
            <span className="self-start inline-block text-[10px] font-semibold tracking-widest uppercase text-[#D2430F] px-3 py-1 rounded-full bg-white border border-[#F1D9CA]">
              Your industrial supply partner
            </span>
            <h3 className="mt-5 text-xl sm:text-2xl lg:text-3xl font-semibold text-[#231815] leading-snug">
              OEM sourcing, project coordination and MRO support—from one responsive team.
            </h3>
            <p className="mt-4 text-sm sm:text-base text-[#5F524C] leading-relaxed">
              From product selection and supply coordination to MRO (Maintenance, Repair, and Overhaul) support shaped around your operation.
            </p>
            {onOpenRfq ? (
              <button
                type="button"
                onClick={() => onOpenRfq('About: Talk with our team')}
                className="mt-6 self-start inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D2430F] hover:text-[#A8340A] cursor-pointer"
              >
                Talk with our team <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link to="/contact_us.html" className="mt-6 self-start inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D2430F] hover:text-[#A8340A]">
                Talk with our team <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </motion.div>
        </div>
        )}

        {/* Quick Badges with Live Animated Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-[#F1D9CA] mb-10 sm:mb-12">
          <AnimatedCounterCard target={33} suffix="+ years" theme={0} label="Industrial experience" />
          <AnimatedCounterCard target={18} suffix=" years" theme={1} label="Established in 2008" />
          <AnimatedCounterCard target={1800} suffix="+" theme={2} label="Happy customers served" />
          <AnimatedCounterCard target={0} text="Multi" suffix=" brand" theme={3} label="Authorised OEM partners" />
        </div>

        {/* Why Choose Us Grid - Redesigned to be space-efficient & compact */}
        <div className="pt-2 sm:pt-4">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              className="inline-block text-xs font-semibold tracking-widest uppercase text-[#5F524C] px-3.5 py-1 rounded-full bg-[#FFF1E8] border border-[#F1D9CA]"
            >
              The Siddhi Kabel Advantage
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-4xl font-normal text-[#231815] font-editorial tracking-tight"
            >
              Why industry chooses Siddhi Kabel.
            </motion.h2>
            <p className="text-sm sm:text-base text-[#5F524C] font-light leading-relaxed">
              Strong product partnerships. Real-world experience. One responsive team for your industrial requirements.
            </p>
          </div>

          {/* Infographic panel */}
          <div className="rounded-3xl border border-[#F1D9CA] bg-gradient-to-br from-[#FFFAF6] via-white to-[#FFF1E8] p-4 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px_1fr] gap-4 lg:gap-8 items-stretch">
              {/* LEFT COLUMN */}
              <div className="flex flex-col gap-4 order-1 lg:order-1">
                <InfoCard num="01" side="left" title="One dependable source" desc="Electrical, safety, energy and automation ranges together.">
                  <IconRow icons={[ShieldCheck, Cog]} />
                </InfoCard>

                <InfoCard num="02" side="left" delay={0.06} title="Authorised multi-brand partners" desc="Trusted products from LAPP, Eaton, Partex, MENNEKES and more.">
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {BRAND_LOGOS.map((src) => (
                      <div key={src} className="h-10 rounded-lg bg-white border border-[#F1D9CA] flex items-center justify-center p-1.5">
                        <img src={src} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
                      </div>
                    ))}
                  </div>
                </InfoCard>

                <InfoCard num="03" side="left" delay={0.12} title="Broad product choice" desc="Options for industrial, commercial and domestic applications.">
                  <div className="flex items-stretch gap-2 mt-3">
                    {APPLICATIONS.map((a) => {
                      const I = a.icon;
                      return (
                        <div key={a.label} className="flex-1 flex flex-col items-center gap-2 rounded-lg border border-[#F1D9CA] bg-white py-3 px-2">
                          <span className="w-9 h-9 rounded-md bg-[#D2430F] text-white flex items-center justify-center">
                            <I className="w-5 h-5" />
                          </span>
                          <span className="block text-center text-xs font-semibold text-[#231815]">{a.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </InfoCard>

              </div>

              {/* CENTER HUB */}
              <div className="contents lg:flex lg:order-2 lg:flex-col lg:items-center lg:justify-center lg:gap-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-60 h-60 sm:w-64 sm:h-64 mx-auto order-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-[#D2430F]/40"
                  />
                  <div className="absolute inset-3 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FFF1E8] to-[#FDE5D3]" />
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                      <span className="w-11 h-11 rounded-full bg-[#D2430F] text-white flex items-center justify-center shadow-md mb-2">
                        <Users className="w-6 h-6" />
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#D2430F] tracking-widest">04</span>
                      <span className="text-sm font-semibold text-[#231815] leading-snug">People who understand</span>
                      <span className="text-[11px] text-[#5F524C] leading-snug mt-1">
                        Responsive technical and commercial product guidance.
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* 25 years seal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  whileHover={{ y: -4 }}
                  className="order-3 group relative w-full rounded-2xl border border-[#F1D9CA] bg-gradient-to-br from-white to-[#FFF4D6] shadow-sm hover:shadow-lg transition-shadow p-4 flex items-center gap-4"
                >
                  <div className="shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#D2430F] to-[#F08A4B] ring-4 ring-[#FFE1CC] text-white flex flex-col items-center justify-center leading-none shadow-md">
                    <span className="text-xl font-bold font-editorial">33</span>
                    <span className="text-[9px] font-semibold tracking-widest mt-0.5">YEARS</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#D2430F]">05</span>
                    <h4 className="text-sm font-semibold text-[#231815] leading-snug">33+ years of experience</h4>
                    <p className="text-xs text-[#5F524C] leading-relaxed mt-0.5">Industrial knowledge built across varied segments.</p>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col gap-4 order-4 lg:order-3">
                <InfoCard num="06" side="right" title="100% statutory compliance" desc="Committed to meeting applicable statutory requirements in our business operations.">
                  <IconRow icons={[FileCheck, BadgeCheck]} />
                </InfoCard>

                <InfoCard num="07" side="right" delay={0.06} title="Planned stock, wider reach" desc="Inventory planning backed by an extensive network.">
                  <IconRow icons={[Warehouse, Truck, Globe]} />
                </InfoCard>

                <InfoCard num="08" side="right" delay={0.12} title="Ethical business practices" desc="Transparent dealings, quality-first decisions and trust built over time.">
                  <IconRow icons={[HeartHandshake, Scale, ShieldCheck]} />
                </InfoCard>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

/** Just the four animated number cards (33+ years, 18 years, 1,800+ customers, multi brand). Used on the Home page under the slider. */
export const StatsStrip: React.FC = () => (
  <section className="py-8 sm:py-10 bg-white border-b border-[#F1D9CA]">
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedCounterCard target={33} suffix="+ years" theme={0} label="Industrial experience" />
        <AnimatedCounterCard target={18} suffix=" years" theme={1} label="Established in 2008" />
        <AnimatedCounterCard target={1800} suffix="+" theme={2} label="Happy customers served" />
        <AnimatedCounterCard target={0} text="Multi" suffix=" brand" theme={3} label="Authorised OEM partners" />
      </div>
    </div>
  </section>
);