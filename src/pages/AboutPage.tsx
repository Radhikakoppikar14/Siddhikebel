import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ZoomIn,
  X,
  Sparkles,
  ArrowRight,
  Users,
  Target,
  Compass,
  Play,
  Loader2,
  Cog,
  Zap,
  Wrench
} from 'lucide-react';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { PageHeader } from '../components/PageHeader';
import { ServiceSteps } from '../components/ServicesSteps';
import { IndustriesServed } from '../components/IndustriesServed';

interface AboutPageProps {
  onGoToContact?: (subject?: string) => void;
}

// Opens network connections to YouTube early so the player starts faster
const preconnected = new Set<string>();
const preconnect = (...urls: string[]) => {
  urls.forEach((url) => {
    if (preconnected.has(url)) return;
    preconnected.add(url);
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    link.crossOrigin = '';
    document.head.appendChild(link);
  });
};

// maxresdefault is a true 16:9 image (hqdefault is 4:3 with black bars, which looks cropped and blurry).
// mqdefault is a true 16:9 fallback for videos that have no maxres thumbnail.
const VIDEO_THUMB = 'https://i.ytimg.com/vi/e3a0qpri5NA/maxresdefault.jpg';
const VIDEO_THUMB_FALLBACK = 'https://i.ytimg.com/vi/e3a0qpri5NA/mqdefault.jpg';
const swapToFallbackThumb = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  if (img.src !== VIDEO_THUMB_FALLBACK) img.src = VIDEO_THUMB_FALLBACK;
};
const checkThumbSize = (e: React.SyntheticEvent<HTMLImageElement>) => {
  // YouTube answers with a tiny 120px placeholder when maxres does not exist
  if (e.currentTarget.naturalWidth <= 200) swapToFallbackThumb(e);
};

export const AboutPage: React.FC<AboutPageProps> = ({ onGoToContact }) => {
  const [videoActive, setVideoActive] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);

  // Thumbnail host is needed as soon as the page opens
  useEffect(() => {
    preconnect('https://i.ytimg.com');
  }, []);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; caption: string } | null>(null);

  const handleInquire = (topic: string) => {
    if (onGoToContact) {
      onGoToContact(topic);
    }
  };

  return (
    <div className="bg-[#FFFAF6] text-[#231815] overflow-hidden">
      {/* 1. Header banner - same component and typography as every other page */}
      <PageHeader
        title="About Siddhi Kabel"
        breadcrumb="About Us"
        category="Siddhi Kabel LTD."
        subtitle="Dependable Electrical, Automation & Safety Solutions for Indian Industry & Multinationals."
        bgVideo="/assets/videos/demoo1.mp4"
        bgImage="/assets/videos/demoo1-poster.jpg"
      />

      {/* 3. About (Built on experience) + counters + Why industry chooses Siddhi Kabel */}
      <WhyChooseUs onOpenRfq={onGoToContact} />

      {/* Service that starts with understanding */}
      <ServiceSteps />

      {/* Video + Vision & Mission + team photos, combined in one section */}
      <section id="who-we-are" className="py-12 sm:py-16 bg-[#FFF1E8] border-y border-[#F1D9CA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-[#231815] font-editorial">Our vision, mission and story.</h2>
            <p className="mt-3 text-sm sm:text-base text-[#5F524C] leading-relaxed">
              Explore our comprehensive cable supply, specialized machine harness integration, and central Bangalore warehouse logistics.
            </p>
          </div>

          {/* Video (left) + Vision & Mission (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 items-stretch">
            {/* Company video */}
            <div className="flex flex-col rounded-3xl overflow-hidden border border-[#F1D9CA] bg-white shadow-xl">
              <div className="relative pb-[56.25%] h-0 overflow-hidden bg-black">
                {videoActive ? (
                  <>
                    <img
                      src={VIDEO_THUMB}
                      onLoad={checkThumbSize}
                      onError={swapToFallbackThumb}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    {!iframeReady && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Loader2 className="w-10 h-10 text-white animate-spin" />
                      </span>
                    )}
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/e3a0qpri5NA?rel=0&modestbranding=1&autoplay=1&playsinline=1"
                      title="Siddhi Kabel Corporate Overview"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      onLoad={() => setIframeReady(true)}
                      className={`absolute top-0 left-0 w-full h-full border-0 transition-opacity duration-300 ${
                        iframeReady ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setVideoActive(true)}
                    onMouseEnter={() => preconnect('https://www.youtube-nocookie.com', 'https://www.google.com')}
                    onFocus={() => preconnect('https://www.youtube-nocookie.com', 'https://www.google.com')}
                    onTouchStart={() => preconnect('https://www.youtube-nocookie.com', 'https://www.google.com')}
                    aria-label="Play Siddhi Kabel corporate video"
                    className="absolute inset-0 w-full h-full cursor-pointer group/play"
                  >
                    <img
                      src={VIDEO_THUMB}
                      onLoad={checkThumbSize}
                      onError={swapToFallbackThumb}
                      alt="Siddhi Kabel Corporate Overview video thumbnail"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    <span className="absolute inset-0 bg-black/25 group-hover/play:bg-black/10 transition-colors" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D2430F] flex items-center justify-center shadow-xl ring-8 ring-white/30 group-hover/play:scale-110 transition-transform">
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white ml-1" />
                      </span>
                    </span>
                  </button>
                )}
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#F1D9CA]">
                <div className="flex items-center gap-3 text-left">
                  <span className="w-9 h-9 rounded-lg bg-[#D2430F] flex items-center justify-center text-white shrink-0">
                    <Play className="w-4 h-4 fill-white" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[#231815]">Siddhi Kabel Corporate &amp; Engineering Reel</span>
                    <span className="block text-xs text-[#5F524C]">Authorised Industrial Cables, Automation Switchgear &amp; Safety Systems</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleInquire('Corporate Video Inquiry')}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#D2430F] hover:bg-[#A8340A] rounded-full transition-colors cursor-pointer shadow-md shrink-0"
                >
                  Request Facility Visit
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Vision + Mission */}
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: Compass,
                  title: 'Vision',
                  text: 'To be a leading, preferred and respected solution partner to our valuable customers in the field of electrical products & services.',
                  cta: 'Partner with us',
                  topic: 'Vision & Solutions Inquiry',
                },
                {
                  icon: Target,
                  title: 'Mission',
                  text: 'Work towards continuous improvement, stay focused on achieving customer satisfaction.',
                  cta: 'Request consultation',
                  topic: 'Mission & Continuous Improvement',
                },
              ].map(({ icon: Icon, title, text, cta, topic }) => (
                <div
                  key={title}
                  className="group relative flex-1 overflow-hidden rounded-3xl border border-[#F1D9CA] bg-white p-6 sm:p-7 flex flex-col justify-center text-left shadow-md transition-all duration-300 motion-safe:hover:-translate-y-1 hover:shadow-xl hover:border-[#D2430F]"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-11 h-11 rounded-xl bg-[#FFF1E8] text-[#D2430F] flex items-center justify-center transition-all duration-300 group-hover:bg-[#D2430F] group-hover:text-white">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#231815]">{title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-[#5F524C] leading-relaxed">{text}</p>
                  <button
                    type="button"
                    onClick={() => handleInquire(topic)}
                    className="mt-4 self-start inline-flex items-center gap-1.5 text-sm font-semibold text-[#D2430F] hover:text-[#A8340A] transition-colors cursor-pointer"
                  >
                    {cta}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <span aria-hidden="true" className="absolute left-0 bottom-0 h-1 w-0 bg-[#D2430F] transition-all duration-500 group-hover:w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Team photos */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                src: '/images/resource/about2.jpg',
                alt: 'Siddhi Kabel Corporate Team Bangalore',
                caption: 'Siddhi Kabel Executive Leadership & Operations Team',
                chip: 'Leadership & Engineering Team',
                icon: Users,
              },
              {
                src: '/images/resource/about3.jpg',
                alt: 'Siddhi Kabel Technical Consultation Team',
                caption: 'Siddhi Kabel Technical Solution Analysis & Application Engineering',
                chip: 'Technical Review & Client Support',
                icon: Target,
              },
            ].map(({ src, alt, caption, chip, icon: Icon }) => (
              <button
                key={src}
                type="button"
                onClick={() => setLightboxImage({ src, alt, caption })}
                aria-label={`View photo: ${chip}`}
                className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-[#F1D9CA] shadow-md hover:shadow-xl transition-shadow cursor-pointer text-left"
              >
                <img decoding="async" loading="lazy" src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#231815] bg-white/90 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-[#D2430F]" /> {chip}
                  </span>
                  <span className="w-9 h-9 rounded-full bg-white text-[#D2430F] flex items-center justify-center shadow-md transition-colors group-hover:bg-[#D2430F] group-hover:text-white">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Industries we serve */}
      <IndustriesServed />

      {/* Closing call to action */}
      <section id="cta" className="py-12 sm:py-16 bg-[#FFFAF6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-[#F1D9CA] bg-gradient-to-br from-white via-white to-[#FFE6D3] p-8 sm:p-12 shadow-lg">
            {/* decorative rings */}
            <span aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 rounded-full border-[28px] border-[#D2430F]/10 pointer-events-none" />
            <span aria-hidden="true" className="absolute -top-8 -right-8 w-32 h-32 rounded-full border-[14px] border-[#D2430F]/15 pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight !text-[#231815]">
                  Let’s keep your next project moving.
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#5F524C] leading-relaxed">
                  Tell us what you are building, connecting or maintaining. Our team is ready to help with suitable industrial product options.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end sm:items-center gap-4 shrink-0">
                <button
                  type="button"
                  onClick={() => handleInquire('Project enquiry')}
                  className="group inline-flex items-center justify-center gap-2 bg-[#D2430F] hover:bg-[#A8340A] text-white text-sm font-semibold rounded-full px-7 py-3.5 shadow-md hover:shadow-xl transition-all duration-300 motion-safe:hover:-translate-y-0.5 cursor-pointer"
                >
                  Talk to Siddhi Kabel
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Tell us: building -> connecting -> maintaining */}
            <ol className="relative mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
              {[
                { icon: Cog, title: 'Building', desc: 'New machines, panels and projects' },
                { icon: Zap, title: 'Connecting', desc: 'Cables, plugs and power distribution' },
                { icon: Wrench, title: 'Maintaining', desc: 'Repair, upgrades and spares' },
              ].map(({ icon: Icon, title, desc }) => (
                <li
                  key={title}
                  className="group relative rounded-2xl border border-[#F1D9CA] bg-white/90 p-5 flex items-center gap-4 cursor-default transition-all duration-300 motion-safe:hover:-translate-y-1.5 hover:shadow-xl hover:border-[#D2430F] hover:bg-[#FFF1E8]"
                >
                  <span className="w-14 h-14 shrink-0 rounded-full bg-[#FFF1E8] border-2 border-[#D2430F]/40 text-[#D2430F] flex items-center justify-center transition-all duration-300 group-hover:bg-[#D2430F] group-hover:text-white group-hover:border-[#D2430F] motion-safe:group-hover:scale-110 motion-safe:group-hover:rotate-6">
                    <Icon className="w-6 h-6" />
                  </span>
                  <span>
                    <span className="block text-base font-semibold text-[#231815] group-hover:text-[#A8340A] transition-colors">{title}</span>
                    <span className="block mt-0.5 text-sm text-[#5F524C]">{desc}</span>
                  </span>
                  <span aria-hidden="true" className="absolute left-0 bottom-0 h-1 w-0 rounded-bl-2xl bg-[#D2430F] transition-all duration-500 group-hover:w-full" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#FFF1E8] backdrop-blur-sm backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] flex flex-col bg-[#FFFAF6] rounded-3xl overflow-hidden shadow-2xl border border-[#F1D9CA] p-4 text-[#231815]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 px-2 border-b border-[#F1D9CA]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D2430F]" />
                  <span className="text-xs sm:text-sm font-semibold">{lightboxImage.caption}</span>
                </div>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-1.5 rounded-full bg-[#FFF1E8] hover:bg-[#F1D9CA] text-[#231815] transition-colors cursor-pointer"
                  aria-label="Close image modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-3 flex-1 min-h-0 overflow-hidden flex items-center justify-center bg-white rounded-2xl p-2 border border-[#F1D9CA]">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  className="max-h-[56dvh] sm:max-h-[60dvh] max-w-full w-auto object-contain rounded-lg shadow-sm"
                />
              </div>

              <div className="mt-3 shrink-0 flex flex-wrap items-center justify-between gap-3 px-2 text-xs text-[#5F524C]/80">
                <span>Authorized Siddhi Kabel Corporate Archives</span>
                <button
                  onClick={() => {
                    setLightboxImage(null);
                    handleInquire(`Inquiry from image: ${lightboxImage.caption}`);
                  }}
                  className="px-4 py-2 bg-[#D2430F] hover:bg-[#A8340A] text-[#FFFAF6] rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  Inquire About This Service
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};