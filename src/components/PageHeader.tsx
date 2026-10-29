import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb: string;
  category?: string;
  bgImage?: string;
  bgVideo?: string;
  onOpenRfq?: (subject?: string) => void;
  /** title on top, then Home > page breadcrumb; hides partner line, subtitle and bullet points */
  minimal?: boolean;
}

const DEFAULT_SUBTITLE =
  'Delivering manufacturer-certified cables, industrial switchgear, automation accessories, and electrical safety solutions with guaranteed reliability across India.';

const POINTS = ['Direct Factory Sourcing', '100% Genuine MTC', 'Pan-India Logistics'];

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumb,
  category = 'Siddhi Kabel LTD.',
  bgImage = '/images/main-slider/1.jpg',
  bgVideo,
  minimal = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [bgVideo]);

  return (
    <header className="relative overflow-hidden bg-[#231815] flex items-center min-h-[260px] sm:min-h-[340px] lg:min-h-[400px]">
      {/* Photo with a dark overlay so the white text stays readable (same as the home hero) */}
      <div className="absolute inset-0 z-0">
        {bgVideo ? (
          <video
            ref={videoRef}
            src={bgVideo}
            poster={bgImage}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="no-zoom absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <img
            src={bgImage}
            alt=""
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 lg:py-16">
        <div className="max-w-3xl space-y-4">
          {!minimal && (
            <>
          <nav className="flex items-center gap-2 text-sm text-white/75" aria-label="Breadcrumb">
            <Link to="/" className="font-medium hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-white">{breadcrumb}</span>
          </nav>

          <p className="text-sm font-semibold text-[#FF8A55]">
            {category}
            <span className="text-white/75 font-normal"> &nbsp;|&nbsp; Official Channel Partner</span>
          </p>

            </>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-editorial leading-[1.05]">
            {title}
          </h1>

          {minimal && (
          <nav className="flex items-center gap-2 text-sm text-white/75" aria-label="Breadcrumb">
              <Link to="/" className="font-medium hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-semibold text-white">{breadcrumb}</span>
            </nav>

          )}
          {!minimal && (
            <>
          {/* pass subtitle="" to hide the line on a page (e.g. Contact) */}
          {(subtitle ?? DEFAULT_SUBTITLE) !== '' && (
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
              {subtitle ?? DEFAULT_SUBTITLE}
            </p>
          )}

          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-sm font-medium text-white">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#D2430F]" />
                {p}
              </li>
            ))}
          </ul>
            </>
          )}
        </div>
      </div>
    </header>
  );
};