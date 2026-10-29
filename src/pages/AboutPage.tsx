import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ZoomIn,
  X,
  Sparkles,
  ArrowRight,
  Users,
  Target,
  Compass,
  Play,
  Loader2
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

// ---- Replace these when the client sends the final Vision, Mission and company video ----
const VISION = 'To be a leading, preferred and respected solution partner to our valuable customers in the field of electrical products & services.';
const MISSION = 'Work towards continuous improvement, stay focused on achieving customer satisfaction.';
const VIDEO_ID = 'e3a0qpri5NA'; // YouTube video id of the company video
// maxresdefault is a true 16:9 image (hqdefault is 4:3 with black bars, which looks cropped and blurry).
// mqdefault is a true 16:9 fallback for videos that have no maxres thumbnail.
const VIDEO_THUMB = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
const VIDEO_THUMB_FALLBACK = `https://i.ytimg.com/vi/${VIDEO_ID}/mqdefault.jpg`;
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

      {/* 2. Breadcrumb */}
      <div className="bg-[#FFFAF6] pt-6 sm:pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center text-xs font-medium text-[#5F524C]">
          <span className="text-[#D2430F] mr-2">←</span>
          <Link to="/" className="hover:text-[#231815] transition-colors">Home</Link>
          <span className="mx-2 text-[#5F524C]">|</span>
          <span className="text-[#231815] font-semibold">About Us</span>
        </div>
      </div>

      {/* 3. About (Built on experience) + counters + Why industry chooses Siddhi Kabel */}
      <WhyChooseUs onOpenRfq={onGoToContact} />

      {/* 4. Service that starts with understanding */}
      <ServiceSteps />

      {/* 5. Vision, Mission and company video.
          Space reserved for the final content the client will send:
          replace VISION, MISSION and VIDEO_ID at the top of this file. */}
      <section id="vision-mission" className="py-10 sm:py-14 bg-[#FFF1E8] border-y border-[#F1D9CA] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#D2430F]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#D2430F]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#5F524C] px-3.5 py-1 rounded-full bg-white border border-[#F1D9CA]">
              <Sparkles className="w-3.5 h-3.5 text-[#D2430F]" />
              Who we are
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-normal font-editorial tracking-tight text-[#231815]">
              Our vision, mission and story.
            </h2>
          </div>

          {/* Vision + Mission side by side, each with a big watermark number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Compass, title: 'Vision', text: VISION },
              { icon: Target, title: 'Mission', text: MISSION },
            ].map(({ icon: Icon, title, text }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden bg-[#FFFAF6] border border-[#F1D9CA] border-l-4 border-l-[#D2430F] rounded-2xl p-7 sm:p-9 shadow-lg"
              >
                <div className="relative flex items-center gap-3">
                  <span className="w-11 h-11 rounded-xl bg-white border border-[#F1D9CA] text-[#D2430F] flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-[#231815]">{title}</h3>
                </div>
                <p className="relative mt-5 text-sm sm:text-base text-[#5F524C] leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Company video (16:9) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="mt-8 max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-[#F1D9CA] bg-black"
          >
            <div className="relative pb-[56.25%] h-0 overflow-hidden">
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
                    src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&autoplay=1&playsinline=1`}
                    title="Siddhi Kabel company video"
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
                  aria-label="Play Siddhi Kabel company video"
                  className="absolute inset-0 w-full h-full cursor-pointer group/play"
                >
                  <img
                    src={VIDEO_THUMB}
                    onLoad={checkThumbSize}
                    onError={swapToFallbackThumb}
                    alt="Siddhi Kabel company video thumbnail"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <span className="absolute inset-0 bg-black/25 group-hover/play:bg-black/10 transition-colors" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D2430F] flex items-center justify-center shadow-xl group-hover/play:scale-110 transition-transform">
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white ml-1" />
                    </span>
                  </span>
                  <span className="absolute left-4 bottom-4 text-xs font-semibold text-white bg-black/50 rounded-full px-3 py-1">Our company video</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Team photos (click to enlarge) */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { src: '/images/resource/about2.jpg', alt: 'Siddhi Kabel Team Photo', caption: 'Siddhi Kabel Executive Leadership & Operations Team', label: 'Leadership & Engineering Team', icon: Users },
              { src: '/images/resource/about3.jpg', alt: 'Siddhi Kabel Team Meeting', caption: 'Siddhi Kabel Technical Solution Analysis & Application Engineering', label: 'Technical Review & Client Support', icon: Target },
            ].map(({ src, alt, caption, label, icon: Icon }) => (
              <div
                key={src}
                onClick={() => setLightboxImage({ src, alt, caption })}
                className="relative rounded-2xl overflow-hidden shadow-lg border border-[#F1D9CA] group cursor-pointer h-56 sm:h-64"
              >
                <img decoding="async" loading="lazy" src={src} alt={alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#231815] bg-white/80 px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#F1D9CA]/30">
                      <Icon className="w-3.5 h-3.5 text-[#D2430F]" /> {label}
                    </span>
                    <span className="p-1.5 rounded-full bg-white text-[#231815] group-hover:bg-[#D2430F] group-hover:text-white transition-colors">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Industries we serve */}
      <IndustriesServed />

      {/* Closing call to action */}
      <section id="cta" className="py-12 sm:py-16 bg-gradient-to-br from-[#D2430F] to-[#A8340A] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          <h2 className="text-3xl sm:text-5xl font-normal font-editorial tracking-tight !text-white">Let’s keep your next project moving.</h2>
          <p className="mt-4 text-sm text-white/90 leading-relaxed max-w-xl mx-auto">
            Tell us what you are building, connecting or maintaining. Our team is ready to help with suitable industrial product options.
          </p>
          <button
            type="button"
            onClick={() => handleInquire('Project enquiry')}
            className="mt-7 inline-flex items-center gap-2 bg-white text-[#A8340A] text-xs font-bold uppercase tracking-wider rounded-md px-6 py-3 shadow-lg hover:bg-[#FFF1E8] transition-colors cursor-pointer"
          >
            Talk to Siddhi Kabel <ArrowRight className="w-3.5 h-3.5" />
          </button>
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