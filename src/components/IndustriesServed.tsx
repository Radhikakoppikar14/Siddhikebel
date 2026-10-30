import React from 'react';
import { Cog, Factory, FlaskConical, Car, Gauge, Building2, Network } from 'lucide-react';

const SEGMENTS = [
  { icon: Cog, label: 'Machine building' },
  { icon: Factory, label: 'Manufacturing' },
  { icon: FlaskConical, label: 'Pharmaceuticals' },
  { icon: Car, label: 'Automotive' },
  { icon: Gauge, label: 'Process industries' },
  { icon: Building2, label: 'Infrastructure' },
  { icon: Network, label: 'System integrators' },
];

export const IndustriesServed: React.FC = () => (
  <section id="industries" className="py-12 sm:py-16 bg-white border-b border-[#F1D9CA]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-[#231815] font-editorial">Supporting the people who keep work moving.</h2>
        <p className="mt-3 text-sm sm:text-base text-[#5F524C] leading-relaxed">
          From a single product requirement to a project supply need, we support customers across India.
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-6">
        {SEGMENTS.map(({ icon: Icon, label }, i) => (
          <li
            key={label}
            className={`${i < 4 ? 'lg:col-span-3' : 'lg:col-span-4'} ${i < 6 ? 'sm:col-span-2' : 'sm:col-span-6'} ${i === 6 ? 'col-span-2' : ''} group relative overflow-hidden rounded-2xl border border-[#F1D9CA] bg-white px-5 py-6 flex items-center gap-4 cursor-default shadow-xs transition-all duration-300 motion-safe:hover:-translate-y-1.5 hover:shadow-xl hover:border-[#D2430F] hover:bg-[#FFF1E8]`}
          >
            <span className="w-12 h-12 shrink-0 rounded-xl bg-[#FFF1E8] text-[#D2430F] flex items-center justify-center transition-all duration-300 group-hover:bg-[#D2430F] group-hover:text-white motion-safe:group-hover:rotate-6 motion-safe:group-hover:scale-110">
              <Icon className="w-6 h-6" />
            </span>
            <span className="text-sm font-semibold text-[#231815] leading-snug transition-colors group-hover:text-[#A8340A]">{label}</span>
            <span aria-hidden="true" className="absolute left-0 bottom-0 h-1 w-0 bg-[#D2430F] transition-all duration-500 group-hover:w-full" />
          </li>
        ))}
      </ul>
    </div>
  </section>
);