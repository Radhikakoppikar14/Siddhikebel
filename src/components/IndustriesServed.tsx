import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

// Same 7 segments as the Industries page. Photos live in /public/images/industries.
const SEGMENTS: { name: string; image: string; span: string }[] = [
  { name: 'Machine building', image: '/images/industries/mechanical-plant-engineering.jpg', span: 'col-span-2 row-span-2' },
  { name: 'Manufacturing', image: '/images/industries/oem-machines.jpg', span: '' },
  { name: 'Pharmaceuticals', image: '/images/industries/pharmaceutical-cleanroom.jpg', span: '' },
  { name: 'Automotive', image: '/images/industries/automobile-rail-transport.jpg', span: '' },
  { name: 'Process industries', image: '/images/industries/oil-gas-chemical.jpg', span: '' },
  { name: 'Infrastructure', image: '/images/industries/construction.jpg', span: 'col-span-2' },
  { name: 'System integrators', image: '/images/industries/panel-builders.jpg', span: 'col-span-2' },
];

/** Industries we serve: bento grid of photo tiles. */
export const IndustriesServed: React.FC = () => (
  <section id="industries" className="py-12 sm:py-16 bg-white border-b border-[#F1D9CA]">
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D2430F]">
            <span className="w-8 h-px bg-[#D2430F]" />
            Industries we serve
          </div>
          <h2 className="mt-3 text-3xl sm:text-5xl font-normal text-[#231815] font-editorial tracking-tight">
            Supporting the people who keep work moving.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5F524C] leading-relaxed">
            From a single product requirement to a project supply need, we support customers across India.
          </p>
        </div>
        <Link
          to="/industries"
          className="shrink-0 inline-flex items-center gap-2 self-start md:self-auto text-xs font-bold uppercase tracking-wider text-[#231815] border border-[#231815] rounded-md px-5 py-3 hover:bg-[#231815] hover:text-white transition-colors"
        >
          View all industries <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[150px] sm:auto-rows-[190px] gap-3 sm:gap-4">
        {SEGMENTS.map((s, i) => (
          <Link
            to="/industries"
            key={s.name}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFE6D3] to-[#F1D9CA] ${s.span}`}
          >
            <img
              src={s.image}
              alt={s.name}
              loading="lazy"
              decoding="async"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              className="no-zoom absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#231815]/85 via-[#231815]/20 to-transparent transition-colors duration-300 group-hover:from-[#A8340A]/90" />
            <span className="absolute top-3 left-3 text-[11px] font-bold tabular-nums text-white/90 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-[#D2430F] flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </span>
            <div className="absolute left-0 right-0 bottom-0 p-4 sm:p-5">
              <h3 className={`font-semibold text-white leading-snug ${i === 0 ? 'text-xl sm:text-3xl' : 'text-sm sm:text-lg'}`}>{s.name}</h3>
              <span className="mt-2 block h-0.5 w-8 bg-[#D2430F] transition-all duration-300 group-hover:w-16 group-hover:bg-white" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);