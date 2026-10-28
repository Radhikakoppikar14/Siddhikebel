import React, { useState } from 'react';
import { Users, Wrench, Cog, Warehouse, Truck, Globe, FileCheck, BadgeCheck, HeartHandshake, Scale, ShieldCheck, Sparkles, Factory, Building2, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

// Each card: soft line-art + a wash colour that keeps the text sharp
const STAT_CARDS = [
  { tint: '253,229,211' }, // warm peach
  { tint: '255,244,214' }, // warm cream
  { tint: '233,238,244' }, // cool grey
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
  // 2. Industrial segments: solar panels, power bolt and gear
  <svg preserveAspectRatio="xMaxYMid meet" key="industry" viewBox="0 0 200 120" fill="none" stroke="#D2430F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 96 L52 96 L70 46 L32 46 Z" />
    <path d="M23 71H61M26.5 59H64M41 46L23 96M51 46L33 96" strokeWidth="1" />
    <path d="M60 96 L98 96 L116 46 L78 46 Z" />
    <path d="M69 71H107M72.5 59H110M87 46L69 96M97 46L79 96" strokeWidth="1" />
    <path d="M156 10 L134 58 H154 L144 100 L178 46 H158 Z" />
    <circle cx="176" cy="92" r="9" /><circle cx="176" cy="92" r="3.5" />
    <path d="M176 78v-4M176 106v4M162 92h-4M190 92h4M166 82l-3-3M186 102l3 3M186 82l3-3M166 102l-3 3" />
  </svg>,
  // 3. Customers: pan-India network map
  <svg preserveAspectRatio="xMaxYMid meet" key="india" viewBox="0 0 100 100" fill="none" stroke="#D2430F" strokeWidth="1" strokeLinejoin="round" aria-hidden="true">
    <path d="M24 3 L32 8 L38 11 L37 18 L42 24 L45 26 L54 30 L67 33 L72 36 L80 36 L90 31 L96 32 L93 35 L90 38 L88 45 L85 50 L82 51 L80 45 L78 41 L73 41 L70 38 L69 45 L70 51 L64 53 L58 59 L48 69 L43 74 L42 80 L41 89 L36 93 L34 96 L30 91 L26 82 L22 72 L19 61 L18 54 L11 55 L6 50 L4 46 L10 44 L13 40 L10 35 L14 30 L22 22 L24 18 L26 13 Z" fill="#D2430F" fillOpacity="0.10" />
    <g strokeWidth="0.8" strokeDasharray="2 2"><line x1="35" y1="32" x2="43" y2="36"/><line x1="43" y1="36" x2="58" y2="40"/><line x1="58" y1="40" x2="68" y2="49"/><line x1="68" y1="49" x2="19" y2="61"/><line x1="19" y1="61" x2="28" y2="50"/><line x1="28" y1="50" x2="35" y2="32"/><line x1="28" y1="50" x2="33" y2="80"/><line x1="33" y1="80" x2="30" y2="90"/><line x1="19" y1="61" x2="33" y2="80"/><line x1="43" y1="36" x2="28" y2="50"/></g>
    <g fill="#D2430F" stroke="none"><circle cx="35" cy="32" r="3.2"/><circle cx="33" cy="80" r="3.2"/><circle cx="19" cy="61" r="3.2"/><circle cx="68" cy="49" r="3.2"/><circle cx="43" cy="36" r="3.2"/><circle cx="30" cy="90" r="3.2"/><circle cx="58" cy="40" r="3.2"/><circle cx="28" cy="50" r="3.2"/></g>
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
  { label: 'Domestic', img: '/images/gallery/led.jpg', icon: Lightbulb },
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

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="about" className="py-10 sm:py-12 bg-white border-b border-[#F1D9CA] relative overflow-hidden">
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#FFF1E8] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#D2430F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Story & Background Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-12 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#5F524C] px-3.5 py-1.5 rounded-full bg-[#FFF1E8] border border-[#F1D9CA]">
              <Sparkles className="w-3.5 h-3.5 text-[#D2430F]" />
              <span>We Are Siddhi Kabel</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#231815] font-editorial tracking-tight leading-[1.15]">
              Transforming Indian Industry <br className="hidden sm:inline" />
              With Innovative Products
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#231815]/85 font-light leading-relaxed">
              <p>
                A trusted supplier of industrial electrical, automation and safety products, with 33+ years of experience.
              </p>
            </div>

            {/* Quick Badges with Live Animated Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F1D9CA]">
              <AnimatedCounterCard
                target={33}
                suffix="+"
                theme={0}
                label="Years of Industrial Experience"
                subLabel="Industrial electrical field"
              />
              <AnimatedCounterCard
                target={16}
                suffix="+"
                theme={1}
                label="Industrial segments"
                subLabel="Pharma, Solar, OEM & more"
              />
              <AnimatedCounterCard
                target={1800}
                suffix="+"
                theme={2}
                label="Customers served"
                subLabel="Pan-India Corporate Clients"
              />
            </div>
          </motion.div>
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
              Why Choose Us
            </motion.h2>
          </div>

          {/* Infographic panel */}
          <div className="rounded-3xl border border-[#F1D9CA] bg-gradient-to-br from-[#FFFAF6] via-white to-[#FFF1E8] p-4 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px_1fr] gap-4 lg:gap-8 items-center">
              {/* LEFT COLUMN */}
              <div className="space-y-4 order-2 lg:order-1">
                <InfoCard num="02" side="left" title="Multiple World-Class Brands" desc="Leading brands from one supplier.">
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {BRAND_LOGOS.map((src) => (
                      <div key={src} className="h-10 rounded-lg bg-white border border-[#F1D9CA] flex items-center justify-center p-1.5">
                        <img src={src} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
                      </div>
                    ))}
                  </div>
                </InfoCard>

                <InfoCard num="03" side="left" delay={0.06} title="Wide Range of Products" desc="For various applications.">
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

                <InfoCard num="04" side="left" delay={0.12} title="Dedicated Skilled Team" desc="Skilled technical and commercial team.">
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
                    <img src="/images/industries/plant-engineering.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-[#FFF1E8]/85 to-[#FDE5D3]/90" />
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                      <span className="w-11 h-11 rounded-full bg-[#D2430F] text-white flex items-center justify-center shadow-md mb-2">
                        <ShieldCheck className="w-6 h-6" />
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#D2430F] tracking-widest">01</span>
                      <span className="text-sm font-semibold text-[#231815] leading-snug">One Trusted Single Source</span>
                      <span className="text-[11px] text-[#5F524C] leading-snug mt-1">
                        Electrical, safety, energy and automation products &amp; services.
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
                    <h4 className="text-sm font-semibold text-[#231815] leading-snug">33+ Years of Industrial Experience</h4>
                    <p className="text-xs text-[#5F524C] leading-relaxed mt-0.5">Across industry segments.</p>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-4 order-3">
                <InfoCard num="08" side="right" title="Ethical Business Practice" desc="Quality first, ethical practice.">
                  <IconRow icons={[HeartHandshake, Scale, ShieldCheck]} />
                </InfoCard>

                <InfoCard num="07" side="right" delay={0.06} title="Complete Statutory Compliance" desc="Full statutory compliance.">
                  <IconRow icons={[FileCheck, BadgeCheck]} />
                </InfoCard>

                <InfoCard num="06" side="right" delay={0.12} title="Planned Inventory & Large Network" desc="Well-planned stock and a large network for better service.">
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