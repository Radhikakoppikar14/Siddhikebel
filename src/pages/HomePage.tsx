import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Target, Play, Loader2, Ear, ClipboardCheck, Truck, ChevronDown, ChevronRight } from 'lucide-react';
import { BrandSelector } from '../components/BrandSelector';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Hero } from '../components/Hero';
import { CaseStudiesSection } from '../components/CaseStudiesSection';
import { ClientsWall } from '../components/ClientsWall';
import { MotionReveal } from '../components/MotionReveal';


const STEPS = [
  { n: '01', icon: Ear, title: 'We listen first', desc: 'We learn about your application, operating conditions and project needs.' },
  { n: '02', icon: ClipboardCheck, title: 'We help you choose', desc: 'We guide you toward suitable products from our authorised brand portfolio.' },
  { n: '03', icon: Truck, title: 'We coordinate supply', desc: 'We work to make sourcing and delivery straightforward for your team.' },
];

const ServiceSteps: React.FC = () => (
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

// Replace these when the client sends the final Vision, Mission and company video.
const VISION = 'To be a leading, preferred and respected solution partner to our valuable customers in the field of electrical products & services.';
const MISSION = 'Work towards continuous improvement, stay focused on achieving customer satisfaction.';
const VIDEO_ID = 'e3a0qpri5NA';
const THUMB = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
const THUMB_FALLBACK = `https://i.ytimg.com/vi/${VIDEO_ID}/mqdefault.jpg`;

/** Space reserved between "Service that starts with understanding" and "Industries we serve". */
const VisionMissionVideo: React.FC = () => {
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const onThumb = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth <= 200 && img.src !== THUMB_FALLBACK) img.src = THUMB_FALLBACK;
  };

  return (
    <section id="vision-mission" className="py-10 sm:py-12 bg-[#FFFAF6] border-b border-[#F1D9CA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#5F524C] px-3.5 py-1 rounded-full bg-[#FFF1E8] border border-[#F1D9CA]">Who we are</div>
          <h2 className="mt-3 text-2xl sm:text-4xl font-normal text-[#231815] font-editorial tracking-tight">Our vision, mission and story.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-stretch">
          {/* Company video */}
          <div className="relative rounded-2xl overflow-hidden bg-black shadow-xl border border-[#F1D9CA] min-h-[240px]">
            <div className="relative pb-[56.25%] h-0">
              {active ? (
                <>
                  <img src={THUMB} onLoad={onThumb} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  {!ready && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Loader2 className="w-9 h-9 text-white animate-spin" />
                    </span>
                  )}
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&autoplay=1&playsinline=1`}
                    title="Siddhi Kabel company video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    onLoad={() => setReady(true)}
                    className={`absolute inset-0 w-full h-full border-0 transition-opacity ${ready ? 'opacity-100' : 'opacity-0'}`}
                  />
                </>
              ) : (
                <button type="button" onClick={() => setActive(true)} aria-label="Play Siddhi Kabel company video"
                  className="absolute inset-0 w-full h-full cursor-pointer group/play">
                  <img src={THUMB} onLoad={onThumb} alt="Siddhi Kabel company video" loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover" />
                  <span className="absolute inset-0 bg-black/25 group-hover/play:bg-black/10 transition-colors" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D2430F] flex items-center justify-center shadow-xl group-hover/play:scale-110 transition-transform">
                      <Play className="w-7 h-7 text-white fill-white ml-1" />
                    </span>
                  </span>
                  <span className="absolute left-4 bottom-4 text-xs font-semibold text-white bg-black/50 rounded-full px-3 py-1">Our company video</span>
                </button>
              )}
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="flex flex-col gap-4">
            {[{ icon: Compass, title: 'Vision', text: VISION }, { icon: Target, title: 'Mission', text: MISSION }].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex-1 bg-white border border-[#F1D9CA] rounded-2xl p-6 shadow-xs">
                <span className="w-10 h-10 rounded-full bg-[#FFF1E8] text-[#D2430F] flex items-center justify-center"><Icon className="w-5 h-5" /></span>
                <h3 className="mt-3 text-xl font-semibold text-[#231815]">{title}</h3>
                <div className="w-12 h-0.5 bg-[#D2430F] my-3" />
                <p className="text-sm text-[#5F524C] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SEGMENTS = ['Machine building', 'Manufacturing', 'Pharmaceuticals', 'Automotive', 'Process industries', 'Infrastructure', 'System integrators'];

const IndustriesServed: React.FC = () => (
  <section id="industries" className="relative overflow-hidden py-10 sm:py-12 bg-gradient-to-b from-white to-[#FFFAF6] border-b border-[#F1D9CA]">
    <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full bg-[#D2430F]/10 blur-3xl pointer-events-none" />
    <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-[#FFE6D3] blur-3xl pointer-events-none" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-8 text-center">
      <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#5F524C] px-3.5 py-1 rounded-full bg-[#FFF1E8] border border-[#F1D9CA]">Industries we serve</div>
      <h2 className="mt-3 text-3xl sm:text-5xl font-normal text-[#231815] font-editorial tracking-tight">Supporting the people who keep work moving.</h2>
      <p className="mt-3 text-sm text-[#5F524C]">From a single product requirement to a project supply need, we support customers across India.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        {SEGMENTS.map((s) => (
          <span
            key={s}
            className="cursor-default text-xs sm:text-[13px] font-semibold text-[#231815] bg-[#FFF1E8] border border-[#F1D9CA] rounded-full px-5 py-2.5 shadow-xs transition-all duration-300 hover:bg-[#FFE0CA] hover:text-[#D2430F] hover:border-[#D2430F] hover:-translate-y-1 hover:shadow-lg"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  </section>
);

interface HomePageProps {
  onGoToContact: (productName?: string) => void;
  onSelectBrand: (brandId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGoToContact, onSelectBrand }) => {
  return (
    <div>
      {/* 1. Main slider */}
      <Hero onOpenRfq={() => onGoToContact()} />

      {/* 2. About: Built on experience. Focused on your application. */}
      <MotionReveal direction="up" yOffset={50} duration={0.9}>
        <WhyChooseUs onOpenRfq={onGoToContact} />
      </MotionReveal>

      {/* 4. Trusted brand partners + allied products & services */}
      <MotionReveal direction="up" yOffset={50} duration={0.9}>
        <BrandSelector onSelectBrand={onSelectBrand} onOpenRfq={onGoToContact} />
      </MotionReveal>

      {/* 5. Service that starts with understanding */}
      <MotionReveal direction="up" yOffset={50} duration={0.9}>
        <ServiceSteps />
      </MotionReveal>

      {/* 6. Vision, Mission and company video (space requested by client) */}
      <MotionReveal direction="up" yOffset={50} duration={0.9}>
        <VisionMissionVideo />
      </MotionReveal>

      {/* 7. Industries we serve */}
      <MotionReveal direction="up" yOffset={50} duration={0.9}>
        <IndustriesServed />
      </MotionReveal>

      {/* 8. Recent projects and client logos */}
      <MotionReveal direction="right" yOffset={70} duration={0.9}>
        <CaseStudiesSection onOpenRfq={onGoToContact} />
      </MotionReveal>
      <MotionReveal direction="zoom" duration={0.9}>
        <ClientsWall />
      </MotionReveal>

    </div>
  );
};