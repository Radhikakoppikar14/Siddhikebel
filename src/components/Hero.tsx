import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Zap, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CroppedVideo } from './CroppedVideo';

interface HeroProps {
  onOpenRfq: (topic?: string) => void;
}

interface SlideItem {
  type: 'video' | 'image';
  src: string;
  poster: string;
  tag: string;
  brand: string;
  headline: string;
  subtext: string;
  ranges: string[];
  accent: string;
}

// The new demo videos have no burned-in text and the corner mark is already
// removed from the files, so no cropping is needed any more.
const VIDEO_CROP_TOP = 0; // percent
const VIDEO_CROP_BOTTOM = 0; // percent
const VIDEO_CROP_RIGHT = 0; // percent

// One slide per brand. Each brand has its own background video and poster in /public/assets/videos
// (hero-lapp.mp4, hero-eaton.mp4, hero-partex.mp4, hero-mennekes.mp4).
const SLIDES: SlideItem[] = [
  {
    type: 'video',
    src: '/assets/videos/hero-lapp.mp4',
    poster: '/assets/videos/hero-lapp-poster.jpg',
    tag: 'LAPP cables & connectivity',
    brand: 'LAPP',
    headline: 'Cable and connectivity for every production line',
    subtext:
      'Power every process. Connect every signal. Explore LAPP’s cable and connectivity range for industrial equipment, control panels and building installations.',
    ranges: [
      'ÖLFLEX® · Power & control cables',
      'UNITRONIC® · Data & bus cables',
      'SILVYN® · Cable protection & guiding systems',
      'ÖLFLEX® UNIPLUS · Single-core cables for industry & buildings',
      'SKINTOP® · Cable glands',
      'EPIC® · Industrial connectors',
    ],
    accent: '#F1D9CA',
  },
  {
    type: 'video',
    src: '/assets/videos/hero-eaton.mp4',
    poster: '/assets/videos/hero-eaton-poster.jpg',
    tag: 'Eaton switchgear & control',
    brand: 'EATON',
    headline: 'Control every circuit with confidence.',
    subtext:
      'Control, protect and isolate equipment with Eaton’s industrial switchgear and control products—from motor protection and contactors to pushbuttons and switch-disconnectors for machinery, panels and production lines.',
    ranges: [
      'Switchgear & motor-protection circuit breakers',
      'Contactors & relays',
      'Switch-disconnectors & cam switches',
      'Controllers & motor starters',
      'Pushbuttons & pilot devices',
    ],
    accent: '#FFF1E8',
  },
  {
    type: 'video',
    src: '/assets/videos/hero-partex.mp4',
    poster: '/assets/videos/hero-partex-poster.jpg',
    tag: 'Partex wire & cable marking',
    brand: 'PARTEX',
    headline: 'Make every wire easy to identify',
    subtext:
      'Keep wiring clear from installation through maintenance. Partex marking solutions help identify cables, wires, terminals and components across control panels and industrial systems.',
    ranges: [
      'Cable & wire markers',
      'Marking sleeves, profiles & labels',
      'Cable ties, fixings & accessories',
      'Terminal & component markers',
      'Printers & marking software',
    ],
    accent: '#F1D9CA',
  },
  {
    type: 'video',
    src: '/assets/videos/hero-mennekes.mp4',
    poster: '/assets/videos/hero-mennekes-poster.jpg',
    tag: 'Mennekes industrial plugs & sockets',
    brand: 'MENNEKES',
    headline: 'Reliable power connections where work happens',
    subtext:
      'Connect machines and equipment with MENNEKES industrial plugs, sockets and distribution products for factories, workshops and demanding worksites.',
    ranges: [
      'CEE plugs & connectors',
      'Interlocked switch-socket combinations',
      'Sockets & inlets',
      'Industrial distribution units',
    ],
    accent: '#FFF1E8',
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenRfq }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // 10-second interval timer (one slide per brand)
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [isPlaying, currentSlide]);

  // Sync video play state on slide switch
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === currentSlide) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [currentSlide]);

  // Ensure active video keeps playing and resumes if tab focus or scroll returns
  useEffect(() => {
    const playCurrentVideo = () => {
      const activeVideo = videoRefs.current[currentSlide];
      if (activeVideo && activeVideo.paused) {
        activeVideo.play().catch(() => {});
      }
    };
    playCurrentVideo();
    window.addEventListener('focus', playCurrentVideo);
    window.addEventListener('scroll', playCurrentVideo, { passive: true });
    return () => {
      window.removeEventListener('focus', playCurrentVideo);
      window.removeEventListener('scroll', playCurrentVideo);
    };
  }, [currentSlide]);

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative bg-[#FFF1E8] text-[#231815] overflow-hidden select-none">
      {/* Background Media Slider with Smooth Transitions */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((s, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={idx}
              className={`absolute inset-0 overflow-hidden bg-[#231815] transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {s.type === 'video' ? (
                <CroppedVideo
                  src={s.src}
                  poster={s.poster}
                  preload="auto"
                  videoRef={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                />
              ) : (
                <motion.img
                  src={s.src}
                  alt={s.headline}
                  animate={isActive ? { scale: [1, 1.05] } : { scale: 1 }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}

              {/* Black overlay so the white text stays readable over the video */}
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
            </div>
          );
        })}
      </div>

      {/* Floating Animated Geometric / Glowing Particle Accents */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -right-16 w-96 h-96 bg-[#D2430F]/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.20, 0.12],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 -left-16 w-80 h-80 bg-[#F5B83D]/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-5 sm:pt-10 sm:pb-6 lg:pt-8 lg:pb-5 min-h-[420px] lg:min-h-0 flex flex-col gap-5 lg:gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl space-y-4"
          >
            {/* Headline with Live Fade & Scale */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-[clamp(2.25rem,6.5vh,3.75rem)] font-semibold leading-[1.1] tracking-tight text-white font-editorial"
              style={{ textWrap: 'balance' }}
            >
              {slide.headline}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.45 }}
              className="text-sm sm:text-base text-white/85 max-w-2xl font-normal leading-relaxed"
            >
              {slide.subtext}
            </motion.p>

            {/* Product ranges for this brand */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.45 }}
              className="pt-1"
            >
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#FFD7C2]">
                {slide.brand} product ranges
              </p>
              <ul
                className="mt-2 inline-grid grid-flow-row sm:grid-flow-col sm:[grid-template-rows:repeat(var(--r),auto)] gap-x-8 gap-y-1.5 text-xs sm:text-[13px] font-medium text-white"
                style={{ ['--r' as string]: Math.ceil(slide.ranges.length / 2) } as React.CSSProperties}
              >
                {slide.ranges.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#F08A4B]" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Live Action Row - Inquire and Catalog */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.45 }}
              className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 0 25px rgba(210, 67, 15, 0.5)',
                }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onOpenRfq(slide.headline)}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#D2430F] hover:bg-[#A8340A] rounded-xl transition-all shadow-lg border border-[#D2430F] group cursor-pointer"
              >
                <span>Inquire / Contact Us</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <Link
                to="/products"
                className="inline-flex w-full sm:w-auto items-center justify-center px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#D2430F] hover:text-[#A8340A] bg-white/85 hover:bg-white border border-[#D2430F]/30 rounded-xl transition-all hover:scale-102 shadow-sm"
              >
                Browse Catalog
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Modern Enterprise Capability Highlights Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 py-3 mt-2 border-t border-white/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2.5 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-[#F1D9CA] shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#FFF1E8] flex items-center justify-center text-[#D2430F] shrink-0 border border-[#D2430F]/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-[#231815] tracking-tight">33+ Years Industrial Experience</span>
              <span className="block text-[10px] text-[#5F524C] sm:truncate">Industrial electrical supply</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2.5 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-[#F1D9CA] shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#FFF1E8] flex items-center justify-center text-[#D2430F] shrink-0 border border-[#D2430F]/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-[#231815] tracking-tight">4 Global OEM Brands</span>
              <span className="block text-[10px] text-[#5F524C] sm:truncate">Lapp, Eaton, Partex, Mennekes</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2.5 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-[#F1D9CA] shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#FFF1E8] flex items-center justify-center text-[#D2430F] shrink-0 border border-[#D2430F]/20">
              <Zap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-[#231815] tracking-tight">Central Bangalore Hub</span>
              <span className="block text-[10px] text-[#5F524C] sm:truncate">Banashankari Ex-Stock Drums</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2.5 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-[#F1D9CA] shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#FFF1E8] flex items-center justify-center text-[#D2430F] shrink-0 border border-[#D2430F]/20">
              <Award className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-[#231815] tracking-tight">Statutory Compliant</span>
              <span className="block text-[10px] text-[#5F524C] sm:truncate">IS & IEC Certified Supply</span>
            </div>
          </div>
        </div>

        {/* Live Slide Controls with 10-Second Linear Progress Bars */}
        <div className="pt-3 flex flex-row items-center justify-between gap-3 border-t border-white/20">
          {/* Slider Indicators */}
          <div className="flex items-center gap-2.5">
            {SLIDES.map((s, i) => {
              const isActive = i === currentSlide;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 cursor-pointer ${
                    isActive ? 'w-16 bg-white/25' : 'w-5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Slide ${i + 1} - ${s.tag}`}
                >
                  {isActive && isPlaying && (
                    <motion.div
                      key={`progress-${currentSlide}`}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 10, ease: 'linear' }}
                      className="h-full bg-[#F5B83D] rounded-full"
                    />
                  )}
                  {isActive && !isPlaying && (
                    <div className="h-full w-full bg-[#F5B83D] rounded-full" />
                  )}
                </button>
              );
            })}

            <span className="text-[11px] font-mono text-white/80 ml-2">
              0{currentSlide + 1} / 0{SLIDES.length}
            </span>
          </div>

          {/* Navigation Controls: Prev & Next */}
          <div className="flex items-center gap-2.5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
              className="p-2 rounded-full border border-[#D2430F]/25 bg-white/70 hover:bg-white transition-colors text-[#D2430F] cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
              className="p-2 rounded-full border border-[#D2430F]/25 bg-white/70 hover:bg-white transition-colors text-[#D2430F] cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};