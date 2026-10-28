import React, { useEffect, useRef } from 'react';
import { CLIENTS_LIST } from '../data/siddhiData';
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';

export const ClientsWall: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const offsetRef = useRef(0);   // current scroll position in px
  const targetRef = useRef(0);   // extra distance still to travel after an arrow click

  // Two copies of the whole list = seamless loop (we wrap at exactly one copy's width)
  const items = [...CLIENTS_LIST, ...CLIENTS_LIST];

  useEffect(() => {
    const SPEED = 25; // px per second (lower = slower)
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50) / 1000;
      last = now;
      const track = trackRef.current;
      if (track) {
        const loop = track.scrollWidth / 2;
        // Arrow click: ease towards the target shift
        if (Math.abs(targetRef.current) > 0.5) {
          const step = targetRef.current * Math.min(1, dt * 8);
          offsetRef.current += step;
          targetRef.current -= step;
        } else if (!pausedRef.current) {
          offsetRef.current += SPEED * dt;
        }
        if (loop > 0) offsetRef.current = ((offsetRef.current % loop) + loop) % loop;
        track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const shift = (dir: 1 | -1) => {
    const first = trackRef.current?.firstElementChild as HTMLElement | null;
    const card = (first?.offsetWidth ?? 240) + 20; // card + gap
    targetRef.current += dir * card * 2;
  };

  return (
    <section className="py-10 sm:py-12 bg-[#FFF1E8] border-b border-[#F1D9CA] relative overflow-hidden select-none">
      {/* Background radial gradient accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FFF1E8] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 mb-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#5F524C] px-3.5 py-1 rounded-full bg-[#FFF1E8] border border-[#F1D9CA] mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#D2430F]" />
            <span>Trusted by industry</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-[#231815] font-editorial tracking-tight">
            Our Clients
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#5F524C]/80 font-light max-w-3xl mx-auto">
            We are committed to provide safe industrial solutions to India's foremost engineering, automotive, defense, and manufacturing leaders.
          </p>

        </div>
      </div>

      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onTouchStart={() => { pausedRef.current = true; }}
        onTouchEnd={() => { pausedRef.current = false; }}
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#FFF1E8] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#FFF1E8] to-transparent z-20" />

        {/* Prev / Next */}
        <button
          type="button"
          aria-label="Previous clients"
          onClick={() => shift(-1)}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white border border-[#F1D9CA] text-[#D2430F] shadow-md flex items-center justify-center cursor-pointer hover:bg-[#D2430F] hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label="Next clients"
          onClick={() => shift(1)}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white border border-[#F1D9CA] text-[#D2430F] shadow-md flex items-center justify-center cursor-pointer hover:bg-[#D2430F] hover:text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Single merged row */}
        <div ref={trackRef} className="flex items-center gap-5 w-max will-change-transform py-1">
          {items.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="group relative bg-white rounded-2xl border border-[#F1D9CA] hover:border-[#5F524C] hover:shadow-xl p-5 w-52 sm:w-60 h-28 flex flex-col items-center justify-center transition-[border-color,box-shadow] duration-300 overflow-hidden shrink-0 cursor-pointer"
            >
              <div className="h-10 w-full flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-9 max-w-[85%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-75 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-2 text-center">
                <span className="block text-xs font-semibold text-[#231815] truncate max-w-[180px]">{client.name}</span>
                <span className="block text-[10px] text-[#D2430F] font-light truncate">{client.industry}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};