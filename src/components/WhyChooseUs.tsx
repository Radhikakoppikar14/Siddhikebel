import React, { useState } from 'react';
import { Users, Wrench, Cog, Warehouse, Truck, Globe, FileCheck, BadgeCheck, HeartHandshake, Scale, ShieldCheck, Sparkles, Factory, Building2, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

// Each card: photo + a wash colour picked from that photo's own tones
const STAT_CARDS = [
  { img: '/images/industries/plant-engineering.jpg', tint: '253,229,211' }, // sunset refinery - soft peach
  { img: '/images/industries/automation-robotics.jpg', tint: '255,244,214' }, // yellow robots - warm cream
  { img: '/images/industries/oem-machines.jpg', tint: '233,238,244' }, // steel machine - cool grey
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
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-110 transition-transform duration-700"
        style={{ backgroundImage: `url(${card.img})` }}
      />
      {/* Wash in the photo's own colour: solid behind the text, fading out so the photo shows */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, rgba(${card.tint},0.97) 0%, rgba(${card.tint},0.80) 40%, rgba(${card.tint},0.15) 100%)`,
        }}
      />
      {/* Accent bar */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#D2430F]" />

      <div className="relative z-10 pl-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-light font-editorial text-[#1E293B] tabular-nums tracking-tight">
              {count}
            </span>
            <span className="text-2xl sm:text-3xl font-light text-[#D2430F] font-editorial ml-0.5">
              {suffix}
            </span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#D2430F] group-hover:scale-125 transition-transform" />
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
    <section id="about" className="py-8 sm:py-12 bg-white border-b border-[#F1D9CA] relative overflow-hidden">
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#FFF1E8] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#D2430F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
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
                Siddhi Kabel Corporation Private Limited is one of the leading and reliable suppliers of world class Industrial Electrical, Automation &amp; Safety Products.
              </p>
              <p>
                We at Siddhi Kabel specialize in providing solutions for High quality industrial products, Our primary focus is to service the needs of our customers for high quality products and services, with more than 15 years of experience in industrial Electrical field and association with leading national and multinational customers &amp; Suppliers, Siddhi Kabel offers superior quality products coupled with best technical support.
              </p>
            </div>

            {/* Quick Badges with Live Animated Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F1D9CA]">
              <AnimatedCounterCard
                target={15}
                suffix="+"
                theme={0}
                label="Years Experience"
                subLabel="Since 2008 in Karnataka"
              />
              <AnimatedCounterCard
                target={25}
                suffix="+"
                theme={1}
                label="Industrial segments"
                subLabel="Pharma, Solar, OEM & Power"
              />
              <AnimatedCounterCard
                target={500}
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
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-4xl font-normal text-[#231815] font-editorial tracking-tight"
            >
              Why Choose Us
            </motion.h3>
            <div className="w-12 h-0.5 bg-[#D2430F] mx-auto mt-2 rounded-full" />
          </div>

          {/* Infographic panel */}
          <div className="rounded-3xl border border-[#F1D9CA] bg-gradient-to-br from-[#FFFAF6] via-white to-[#FFF1E8] p-4 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px_1fr] gap-4 lg:gap-8 items-center">
              {/* LEFT COLUMN */}
              <div className="space-y-4 order-2 lg:order-1">
                <InfoCard num="02" side="left" title="Multiple World-Class Brands" desc="Multiple brands with huge range of world class products.">
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {BRAND_LOGOS.map((src) => (
                      <div key={src} className="h-10 rounded-lg bg-white border border-[#F1D9CA] flex items-center justify-center p-1.5">
                        <img src={src} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
                      </div>
                    ))}
                  </div>
                </InfoCard>

                <InfoCard num="03" side="left" delay={0.06} title="Wide Range of Products" desc="Wide range of products for Industrial, Commercial and Domestic applications.">
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {APPLICATIONS.map((a) => {
                      const I = a.icon;
                      return (
                        <div key={a.label} className="relative h-16 rounded-lg overflow-hidden border border-[#F1D9CA]">
                          <img src={a.img} alt={a.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#231815]/80 via-[#231815]/20 to-transparent" />
                          <span className="absolute bottom-1 left-1.5 right-1 flex items-center gap-1 text-[10px] font-semibold text-white">
                            <I className="w-3 h-3" /> {a.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </InfoCard>

                <InfoCard num="04" side="left" delay={0.12} title="Dedicated Skilled Team" desc="Technically, commercially skilled dedicated team.">
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
                        Complete solution in Electrical, Safety, Energy, and Automation products &amp; Services.
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
                    <span className="text-xl font-bold font-editorial">25</span>
                    <span className="text-[9px] font-semibold tracking-widest mt-0.5">YEARS</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#D2430F]">05</span>
                    <h4 className="text-sm font-semibold text-[#231815] leading-snug">25 Years Vertical Presence</h4>
                    <p className="text-xs text-[#5F524C] leading-relaxed mt-0.5">25 years of presence across industry verticals.</p>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-4 order-3">
                <InfoCard num="08" side="right" title="Ethical Business Practice" desc="Ethical business practice with quality as our first priority.">
                  <IconRow icons={[HeartHandshake, Scale, ShieldCheck]} />
                </InfoCard>

                <InfoCard num="07" side="right" delay={0.06} title="Complete Statutory Compliance" desc="Complete statutory compliance for hassle free transaction.">
                  <IconRow icons={[FileCheck, BadgeCheck]} />
                </InfoCard>

                <InfoCard num="06" side="right" delay={0.12} title="Planned Inventory & Large Network" desc="Customer specific and well-planned inventory added with reliable large network for better service.">
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