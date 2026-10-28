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

interface AboutPageProps {
  onGoToContact?: (subject?: string) => void;
}

const AUTHORIZED_PARTNERS = [
  'LAPP INDIA PVT LTD',
  'EATON Power Quality Pvt Ltd',
  'PARTEX Marking Systems',
  'MENNEKES Electric India Pvt Ltd',
];

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
        bgVideo="/assets/videos/hero-1.mp4"
        bgImage="/assets/videos/hero-1-poster.jpg"
      />

      {/* 2. About Us introduction */}
      <section className="pt-6 pb-10 sm:pt-8 sm:pb-12 bg-[#FFFAF6] relative">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8">
          <div className="mb-8 flex items-center text-xs font-medium text-[#5F524C]">
            <span className="text-[#D2430F] mr-2">←</span>
            <Link to="/" className="hover:text-[#231815] transition-colors">Home</Link>
            <span className="mx-2 text-[#5F524C]">|</span>
            <span className="text-[#231815] font-semibold">About Us</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Left column */}
            <div className="space-y-6 text-sm sm:text-base text-[#231815]/85 leading-relaxed font-normal">
              <p className="text-justify">
                <span className="font-semibold text-[#231815]">Siddhi Kabel</span> was established in the year 2008 by professionals with experience of more than 15 years in providing solutions for various needs of high quality Industrial electrical, automation and safety products.
              </p>
              <p className="text-justify">
                For many customers Siddhi Kabel is more than a supplier, we combine superior product offerings with unparalleled technical support and supply chain services, Whether its providing products &amp; services for a Machine tool industries, Pharmaceutical, Process industry, automotive, Oil &amp; Gas, Chemical &amp; Paint industries, projects, or System integrators, we know our customers are looking for more than a supply of parts and pieces, we focus on addressing our customers larger business needs.
              </p>
            </div>

            {/* Right column */}
            <div className="space-y-6 text-sm sm:text-base text-[#231815]/85 leading-relaxed font-normal">
              <p className="text-justify">
                We constantly monitor and adjust each program so that when our customers' needs change our solutions change with them, our expertise lies in understanding the customer requirements and careful analysis of applications to provide the best possible techno commercial solutions, our team strives hard in planning and managing best inventory apart from arranging and sourcing of materials from our large and reliable network to offer uninterrupted services to our valued customers.
              </p>

                <div className="bg-white p-5 sm:p-6 rounded-lg border border-[#F1D9CA] space-y-3 shadow-2xs">
                  <h3 className="text-base sm:text-lg font-semibold text-[#231815] leading-snug">
                    Siddhi is Authorized Distributors / Dealers / Channel partners / Importer with world class major manufacturing companies:
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {AUTHORIZED_PARTNERS.map((partner) => (
                      <li
                        key={partner}
                        className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#231815] cursor-pointer"
                        onClick={() => handleInquire(`Authorized Line: ${partner}`)}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#D2430F] shrink-0" />
                        <span>{partner}</span>
                      </li>
                    ))}
                  </ul>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <WhyChooseUs />

      {/* 2.5. Corporate Video Feature: Precision Industrial Infrastructure in Action (YouTube e3a0qpri5NA) */}
      <section className="py-10 sm:py-12 bg-[#FFF1E8] border-y border-[#F1D9CA] relative overflow-hidden">
        {/* Subtle decorative ambient glows */}
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[#FFF1E8] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-[#D2430F]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#5F524C] px-3.5 py-1 rounded-full bg-[#FFF1E8] border border-[#F1D9CA] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D2430F]" />
              <span>Official Video Presentation</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#231815] font-editorial tracking-tight">
              Siddhi Kabel Industrial Capability in Action
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#5F524C]/80 font-light max-w-2xl mx-auto leading-relaxed">
              Explore our comprehensive cable supply, specialized machine harness integration, and central Bangalore warehouse logistics.
            </p>
          </div>

          {/* 16:9 Video Embed Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-[#F1D9CA] bg-black relative group"
          >
            <div className="relative pb-[56.25%] h-0 overflow-hidden">
              {videoActive ? (
                <>
                  {/* Thumbnail + spinner stay visible until the YouTube player is ready */}
                  <img
                    src="https://i.ytimg.com/vi/e3a0qpri5NA/hqdefault.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
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
                    src="https://i.ytimg.com/vi/e3a0qpri5NA/hqdefault.jpg"
                    alt="Siddhi Kabel Corporate Overview video thumbnail"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <span className="absolute inset-0 bg-black/25 group-hover/play:bg-black/10 transition-colors" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D2430F] flex items-center justify-center shadow-xl group-hover/play:scale-110 transition-transform">
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white ml-1" />
                    </span>
                  </span>
                </button>
              )}
            </div>

            {/* Video footer bar */}
            <div className="p-4 sm:p-5 bg-[#FFF1E8] text-[#231815] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#F1D9CA]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D2430F] flex items-center justify-center text-white shrink-0">
                  <Play className="w-4 h-4 fill-white" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-semibold text-[#231815] block">
                    Siddhi Kabel Corporate &amp; Engineering Reel
                  </span>
                  <span className="text-[11px] text-[#5F524C] font-light block">
                    Authorised Industrial Cables, Automation Switchgear &amp; Safety Systems
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleInquire('Corporate Video Inquiry')}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#FFFAF6] bg-[#D2430F] hover:bg-[#A8340A] rounded-xl transition-colors cursor-pointer shadow-md shrink-0 border border-[#F1D9CA]/30"
              >
                <span>Request Facility Visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Vision & Mission Section */}
      <section className="py-10 sm:py-12 bg-[#FFF1E8] relative overflow-hidden text-[#231815] border-b border-[#F1D9CA]">
        {/* Ambient background glow */}
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#D2430F] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#D2430F]/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5F524C] px-3 py-1 rounded-full bg-white border border-[#F1D9CA]/30">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-4xl font-light font-editorial mt-3 text-[#231815]">
              Vision &amp; Mission of Siddhi Kabel
            </h2>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto items-stretch">
            {/* Top-Left: Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4 }}
              className="bg-[#FFFAF6] text-[#231815] p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col justify-center items-center text-center relative group border border-[#F1D9CA]"
            >
              <div className="p-3 bg-[#FFF1E8] rounded-2xl text-[#5F524C] mb-4 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6 text-[#5F524C]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#231815] font-editorial">
                Vision
              </h3>
              <div className="w-14 h-0.5 bg-[#D2430F] my-4" />
              <p className="text-sm sm:text-base text-[#5F524C]/80 font-light leading-relaxed max-w-sm">
                To be a leading, preferred and respected solution partner to our valuable customers in the field of electrical products &amp; services.
              </p>
              <button
                onClick={() => handleInquire('Vision & Solutions Inquiry')}
                className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#5F524C] hover:text-[#231815] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* Top-Right: Outdoor Team Photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
                            transition={{ duration: 0.4 }}
              className="relative rounded-3xl overflow-hidden shadow-xl border border-[#F1D9CA] group cursor-pointer min-h-[280px]"
              onClick={() =>
                setLightboxImage({
                  src: '/images/resource/about2.jpg',
                  alt: 'Siddhi Kabel Corporate Team Bangalore',
                  caption: 'Siddhi Kabel Executive Leadership & Operations Team',
                })
              }
            >
              <img
                decoding="async"
                loading="eager"
                src="/images/resource/about2.jpg"
                alt="Siddhi Kabel Team Photo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#231815] bg-white/80 px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5 border border-[#F1D9CA]/30">
                    <Users className="w-3.5 h-3.5 text-[#D2430F]" /> Leadership &amp; Engineering Team
                  </span>
                  <span className="p-1.5 rounded-full bg-white text-white group-hover:bg-[#D2430F] transition-colors">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bottom-Left: Indoor Laptop Meeting Photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
                            transition={{ duration: 0.4 }}
              className="relative rounded-3xl overflow-hidden shadow-xl border border-[#F1D9CA] group cursor-pointer min-h-[280px] order-last md:order-none"
              onClick={() =>
                setLightboxImage({
                  src: '/images/resource/about3.jpg',
                  alt: 'Siddhi Kabel Technical Consultation Team',
                  caption: 'Siddhi Kabel Technical Solution Analysis & Application Engineering',
                })
              }
            >
              <img
                decoding="async"
                loading="eager"
                src="/images/resource/about3.jpg"
                alt="Siddhi Kabel Team Meeting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#231815] bg-white/80 px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5 border border-[#F1D9CA]/30">
                    <Target className="w-3.5 h-3.5 text-[#D2430F]" /> Technical Review &amp; Client Support
                  </span>
                  <span className="p-1.5 rounded-full bg-white text-white group-hover:bg-[#D2430F] transition-colors">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bottom-Right: Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4 }}
              className="bg-[#FFFAF6] text-[#231815] p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col justify-center items-center text-center relative group border border-[#F1D9CA]"
            >
              <div className="p-3 bg-[#FFF1E8] rounded-2xl text-[#5F524C] mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-[#5F524C]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#231815] font-editorial">
                Mission
              </h3>
              <div className="w-14 h-0.5 bg-[#D2430F] my-4" />
              <p className="text-sm sm:text-base text-[#5F524C]/80 font-light leading-relaxed max-w-sm">
                Work towards continuous improvement, stay focused on achieving customer satisfaction.
              </p>
              <button
                onClick={() => handleInquire('Mission & Continuous Improvement')}
                className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#5F524C] hover:text-[#231815] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
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