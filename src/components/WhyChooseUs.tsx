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
  <svg preserveAspectRatio="xMaxYMid meet" key="india" viewBox="0 0 100 100" fill="none" stroke="#D2430F" strokeWidth="1" strokeLinejoin="round" aria-hidden="true">
    <path d="M24 3 L32 8 L38 11 L37 18 L42 24 L45 26 L54 30 L67 33 L72 36 L80 36 L90 31 L96 32 L93 35 L90 38 L88 45 L85 50 L82 51 L80 45 L78 41 L73 41 L70 38 L69 45 L70 51 L64 53 L58 59 L48 69 L43 74 L42 80 L41 89 L36 93 L34 96 L30 91 L26 82 L22 72 L19 61 L18 54 L11 55 L6 50 L4 46 L10 44 L13 40 L10 35 L14 30 L22 22 L24 18 L26 13 Z" fill="#D2430F" fillOpacity="0.10" />
    <g strokeWidth="0.8" strokeDasharray="2 2"><line x1="35" y1="32" x2="43" y2="36"/><line x1="43" y1="36" x2="58" y2="40"/><line x1="58" y1="40" x2="68" y2="49"/><line x1="68" y1="49" x2="19" y2="61"/><line x1="19" y1="61" x2="28" y2="50"/><line x1="28" y1="50" x2="35" y2="32"/><line x1="28" y1="50" x2="33" y2="80"/><line x1="33" y1="80" x2="30" y2="90"/><line x1="19" y1="61" x2="33" y2="80"/><line x1="43" y1="36" x2="28" y2="50"/></g>
    <g fill="#D2430F" stroke="none"><circle cx="35" cy="32" r="3.2"/><circle cx="33" cy="80" r="3.2"/><circle cx="19" cy="61" r="3.2"/><circle cx="68" cy="49" r="3.2"/><circle cx="43" cy="36" r="3.2"/><circle cx="30" cy="90" r="3.2"/><circle cx="58" cy="40" r="3.2"/><circle cx="28" cy="50" r="3.2"/></g>
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
    viewport={{ once: false, amount: 0.15 }}
    transition={{ duration: 0.45, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="relative group rounded-2xl border border-[#F1D9CA] hover:border-[#D2430F]/50 bg-gradient-to-br from-white to-[#FFF1E8] shadow-sm hover:shadow-lg transition-all duration-200 p-4 sm:p-5 overflow-hidden cursor-default"
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
  suffix: string;
  label: string;
  subLabel?: string;
  theme?: number;
}> = ({ target, suffix, label, subLabel, theme = 0 }) => {
  const [count, setCount] = useState(0);
  const card = STAT_CARDS[theme % STAT_CARDS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      onViewportEnter={() => {
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
      className="relative p-5 sm:p-6 rounded-2xl border border-[#F1CDB3] shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-default group overflow-hidden bg-[#FFF7F0]"
    >
      {/* Wash: solid behind the text, lighter towards the graphic */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, rgba(${card.tint},0.97) 0%, rgba(${card.tint},0.85) 45%, rgba(${card.tint},0.35) 100%)`,
        }}
      />
      {/* Soft themed graphic, right side */}
      <div className="absolute inset-y-0 right-0 w-3/5 flex items-center justify-end pr-3 opacity-35 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none">
        <div className="h-[85%] w-full [&>svg]:h-full [&>svg]:w-full [&>svg]:object-right">
          {CARD_ART[theme % CARD_ART.length]}
        </div>
      </div>
      {/* Accent bar */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#D2430F]" />

      <div className="relative z-10 pl-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-light font-editorial text-[#1E293B] tabular-nums tracking-tight">
              {count.toLocaleString('en-US')}
            </span>
            <span className="text-2xl sm:text-3xl font-light text-[#D2430F] font-editorial ml-0.5">
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
const WHY_VIDEO = '/assets/videos/why-siddhi.mp4';
const WHY_IMAGE = '/images/industries/automation-robotics.jpg';

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenRfq, hideAbout = false }) => {
  const [videoOk, setVideoOk] = useState(true);
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
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#5F524C] px-3.5 py-1.5 rounded-full bg-[#FFF1E8] border border-[#F1D9CA]">
              <Sparkles className="w-3.5 h-3.5 text-[#D2430F]" />
              <span>About Siddhi Kabel</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#231815] font-editorial tracking-tight leading-[1.15]">
              Built on experience. <br className="hidden sm:inline" />
              Focused on your application.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#231815]/85 font-light leading-relaxed">
              <p>
                Since 2008, Siddhi Kabel Corporation Private Limited has supported industrial businesses with electrical, automation, safety and infrastructure requirements. As an authorised channel partner for LAPP, Eaton, Partex and MENNEKES, we provide access to trusted product ranges—alongside sourcing support for allied product needs.
              </p>
              <p>
                From OEM product specifications and project-based requirements to repair, maintenance and overhaul support, we help identify suitable products and coordinate supply for plants, control panels, buildings and production lines. Our allied offerings include LT and HT cables, armoured cables, industrial lighting and earthing products. RMO support covers Repair, Maintenance and Overhaul. With more than 33 years of industrial experience, we are able to make procurement clearer and ongoing support more dependable.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5 relative flex flex-col justify-center self-stretch rounded-2xl border border-[#F1D9CA] bg-gradient-to-br from-white to-[#FFF1E8] shadow-sm p-6 sm:p-10 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#D2430F]" />
            <span className="self-start inline-block text-[10px] font-semibold tracking-widest uppercase text-[#D2430F] px-3 py-1 rounded-full bg-white border border-[#F1D9CA]">
              Your industrial supply partner
            </span>
            <h3 className="mt-5 text-xl sm:text-2xl lg:text-3xl font-semibold text-[#231815] leading-snug">
              OEM sourcing, project coordination and RMO support—from one responsive team.
            </h3>
            <p className="mt-4 text-sm sm:text-base text-[#5F524C] leading-relaxed">
              From product selection and supply coordination to Repair, Maintenance &amp; Overhaul support shaped around your operation.
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
              <Link to="/contact" className="mt-6 self-start inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D2430F] hover:text-[#A8340A]">
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
          <AnimatedCounterCard target={4} suffix=" brands" theme={3} label="LAPP · Eaton · Partex · MENNEKES" />
        </div>

        {/* Why Choose Us Grid - Redesigned to be space-efficient & compact */}
        <div className="pt-2 sm:pt-4">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              className="inline-block text-xs font-semibold tracking-widest uppercase text-[#5F524C] px-3.5 py-1 rounded-full bg-[#FFF1E8] border border-[#F1D9CA]"
            >
              The Siddhi Kabel Advantage
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-4xl font-normal text-[#231815] font-editorial tracking-tight"
            >
              Why industry chooses Siddhi Kabel.
            </motion.h2>
            <p className="text-sm sm:text-base text-[#5F524C]/80 font-light leading-relaxed">
              Strong product partnerships. Real-world experience. One responsive team for your industrial requirements.
            </p>
          </div>

          {/* Infographic panel */}
          <div className="rounded-3xl border border-[#F1D9CA] bg-gradient-to-br from-[#FFFAF6] via-white to-[#FFF1E8] p-4 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px_1fr] gap-4 lg:gap-8 items-center">
              {/* LEFT COLUMN */}
              <div className="space-y-4 order-2 lg:order-1">
                <InfoCard num="02" side="left" title="Four authorised partners" desc="Trusted products from LAPP, Eaton, Partex and MENNEKES.">
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {BRAND_LOGOS.map((src) => (
                      <div key={src} className="h-10 rounded-lg bg-white border border-[#F1D9CA] flex items-center justify-center p-1.5">
                        <img src={src} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
                      </div>
                    ))}
                  </div>
                </InfoCard>

                <InfoCard num="03" side="left" delay={0.06} title="Broad product choice" desc="Options for industrial, commercial and domestic applications.">
                  <div className="flex items-stretch gap-2 mt-3">
                    {APPLICATIONS.map((a) => {
                      const I = a.icon;
                      return (
                        <div key={a.label} className="flex-1 overflow-hidden rounded-lg border border-[#F1D9CA] bg-white">
                          <div className="relative h-16">
                            <img src={a.img} alt="" loading="lazy" className="no-zoom w-full h-full object-cover" />
                            <span className="absolute left-1.5 top-1.5 w-6 h-6 rounded-md bg-[#D2430F] text-white flex items-center justify-center">
                              <I className="w-3.5 h-3.5" />
                            </span>
                          </div>
                          <span className="block py-1.5 text-center text-xs font-semibold text-[#231815]">{a.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </InfoCard>

                <InfoCard num="04" side="left" delay={0.12} title="People who understand" desc="Responsive technical and commercial product guidance.">
                  <IconRow icons={[Users, Wrench, Cog]} />
                </InfoCard>
              </div>

              {/* CENTER HUB */}
              <div className="order-1 lg:order-2 flex flex-col items-center gap-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-60 h-60 sm:w-64 sm:h-64"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-[#D2430F]/40"
                  />
                  <div className="absolute inset-3 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img src={WHY_IMAGE} alt="" className="no-zoom absolute inset-0 w-full h-full object-cover" />
                    {videoOk && (
                      <video
                        src={WHY_VIDEO}
                        poster={WHY_IMAGE}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onError={() => setVideoOk(false)}
                        className="no-zoom absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-[#FFF1E8]/85 to-[#FDE5D3]/90" />
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                      <span className="w-11 h-11 rounded-full bg-[#D2430F] text-white flex items-center justify-center shadow-md mb-2">
                        <ShieldCheck className="w-6 h-6" />
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#D2430F] tracking-widest">01</span>
                      <span className="text-sm font-semibold text-[#231815] leading-snug">One dependable source</span>
                      <span className="text-[11px] text-[#5F524C] leading-snug mt-1">
                        Electrical, safety, energy and automation ranges together.
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* 25 years seal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group relative w-full rounded-2xl border border-[#F1D9CA] bg-gradient-to-br from-white to-[#FFF4D6] shadow-sm hover:shadow-lg transition-shadow p-4 flex items-center gap-4"
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
              <div className="space-y-4 order-3">
                <InfoCard num="08" side="right" title="Ethical business practices" desc="Transparent dealings, quality-first decisions and trust built over time.">
                  <IconRow icons={[HeartHandshake, Scale, ShieldCheck]} />
                </InfoCard>

                <InfoCard num="07" side="right" delay={0.06} title="100% statutory compliance" desc="Committed to meeting applicable statutory requirements in our business operations.">
                  <IconRow icons={[FileCheck, BadgeCheck]} />
                </InfoCard>

                <InfoCard num="06" side="right" delay={0.12} title="Planned stock, wider reach" desc="Inventory planning backed by an extensive network.">
                  <IconRow icons={[Warehouse, Truck, Globe]} />
                </InfoCard>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};