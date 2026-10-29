import React from 'react';
import { motion } from 'framer-motion';
import { Ear, ClipboardCheck, Truck, ChevronDown, ChevronRight } from 'lucide-react';

const STEPS = [
  { n: '01', icon: Ear, title: 'We listen first', desc: 'We learn about your application, operating conditions and project needs.' },
  { n: '02', icon: ClipboardCheck, title: 'We help you choose', desc: 'We guide you toward suitable products from our authorised brand portfolio.' },
  { n: '03', icon: Truck, title: 'We coordinate supply', desc: 'We work to make sourcing and delivery straightforward for your team.' },
];

export const ServiceSteps: React.FC = () => (
  <section id="how-we-support" className="py-10 sm:py-12 bg-white border-b border-[#F1D9CA]">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
      <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#5F524C] px-3.5 py-1 rounded-full bg-[#FFF1E8] border border-[#F1D9CA]">How we support you</div>
      <h2 className="mt-3 text-3xl sm:text-5xl font-normal text-[#231815] font-editorial tracking-tight">Service that starts with understanding.</h2>
      <p className="mt-3 text-sm text-[#5F524C]">We work alongside your team to make product selection and supply more straightforward.</p>

      {/* Process infographic: 3 connected steps */}
      <div className="relative mt-12 grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-8">
        {/* dashed connector that draws itself (desktop) */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          style={{ originX: 0 }}
          className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-0 border-t-2 border-dashed border-[#D2430F]/50"
        />
        <span className="hidden md:flex absolute top-10 left-1/3 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-[#D2430F]/40 text-[#D2430F] items-center justify-center z-10">
          <ChevronRight className="w-4 h-4" />
        </span>
        <span className="hidden md:flex absolute top-10 left-2/3 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-[#D2430F]/40 text-[#D2430F] items-center justify-center z-10">
          <ChevronRight className="w-4 h-4" />
        </span>

        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.n} className="group relative flex flex-col items-center text-center">
              {/* numbered icon node */}
              <div className="relative z-10">
                <span className="flex w-20 h-20 rounded-full bg-white border-2 border-[#D2430F]/40 text-[#D2430F] items-center justify-center shadow-md ring-8 ring-[#FFF1E8] transition-all duration-300 group-hover:bg-[#FFE6D3] group-hover:text-[#A8340A] group-hover:border-[#D2430F] group-hover:scale-110 group-hover:ring-[#FFD8BE]">
                  <Icon className="w-8 h-8" />
                </span>
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#D2430F] text-white text-[11px] font-bold flex items-center justify-center border-2 border-white shadow-sm">{s.n}</span>
              </div>
              <span className="w-px h-6 bg-[#D2430F]/40" />

              {/* step card */}
              <div className="w-full flex-1 rounded-2xl border border-[#F1D9CA] bg-gradient-to-br from-white to-[#FFF1E8] p-6 shadow-xs cursor-default transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:border-[#D2430F] group-hover:from-[#FFF1E8] group-hover:to-[#FFDCC4]">
                <h3 className="text-base sm:text-lg font-semibold text-[#231815] group-hover:text-[#D2430F] transition-colors">{s.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#5F524C] leading-relaxed group-hover:text-[#231815] transition-colors">{s.desc}</p>
              </div>

              {/* downward arrow between steps (mobile) */}
              {i < STEPS.length - 1 && <ChevronDown className="md:hidden mt-3 w-6 h-6 text-[#D2430F]/60" />}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);