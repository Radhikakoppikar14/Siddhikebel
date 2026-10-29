import React, { useEffect, useRef } from 'react';
import { CLIENTS_LIST } from '../data/siddhiData';
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';


// Logo files often have a lot of empty (transparent or white) space around them, which makes them look small.
// This crops that space off once in the browser so every logo fills its box as large as possible.
const trimmedCache = new Map<string, string>();
const TrimmedLogo: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [url, setUrl] = React.useState<string>(trimmedCache.get(src) ?? src);

  useEffect(() => {
    if (trimmedCache.has(src)) { setUrl(trimmedCache.get(src)!); return; }
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      try {
        const w = img.naturalWidth, h = img.naturalHeight;
        if (!w || !h) return;
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        const ctx = c.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const { data } = ctx.getImageData(0, 0, w, h);
        let minX = w, minY = h, maxX = -1, maxY = -1;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            const a = data[i + 3];
            const isBlank = a < 20 || (data[i] > 245 && data[i + 1] > 245 && data[i + 2] > 245);
            if (!isBlank) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }
        if (maxX < 0) return;
        const pad = 2;
        minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad);
        maxX = Math.min(w - 1, maxX + pad); maxY = Math.min(h - 1, maxY + pad);
        const cw = maxX - minX + 1, ch = maxY - minY + 1;
        const out = document.createElement('canvas');
        out.width = cw; out.height = ch;
        out.getContext('2d')!.drawImage(c, minX, minY, cw, ch, 0, 0, cw, ch);
        const data64 = out.toDataURL('image/png');
        trimmedCache.set(src, data64);
        if (!cancelled) setUrl(data64);
      } catch {
        /* keep the original image */
      }
    };
    img.src = src;
    return () => { cancelled = true; };
  }, [src]);

  return (
    <img
      src={url}
      alt={alt}
      className="w-full h-full object-contain"
      referrerPolicy="no-referrer"
    />
  );
};

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
              className="group relative bg-white rounded-2xl border border-[#F1D9CA] hover:border-[#5F524C] hover:shadow-xl px-4 py-3 w-60 sm:w-72 h-36 flex flex-col items-center justify-center transition-[border-color,box-shadow] duration-300 overflow-hidden shrink-0 cursor-pointer"
            >
              <div className="h-16 w-full flex items-center justify-center px-10">
                <TrimmedLogo src={client.logo} alt={client.name} />
              </div>
              <span className="mt-2 block w-full text-center text-[10px] font-medium text-[#5F524C] truncate">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};