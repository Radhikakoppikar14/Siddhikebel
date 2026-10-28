import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ZoomIn, X, Sparkles } from 'lucide-react';
import { BRANDS_DATA } from '../data/siddhiData';

interface BrandBlock {
  brandId: string;
  badge: string;
  heading: string;
  description: string;
  points: string[];
}

// Content for each row. Brand name, colour and photo come from BRANDS_DATA.
const BLOCKS: BrandBlock[] = [
  {
    brandId: 'lapp',
    badge: 'Cables & Connectivity',
    heading: 'Power, Control & Data Cables',
    description:
      'Flexible ÖLFLEX® control cables, UNITRONIC® data cables and SKINTOP® glands for machines, panels and plants.',
    points: [
      'Oil-resistant, flexible control and power cables',
      'Shielded data and bus cables for clean signals',
      'IP-rated cable glands and EPIC® connectors',
      'Compliant with IEC and UL cable standards',
    ],
  },
  {
    brandId: 'eaton',
    badge: 'Motor Control & Switchgear',
    heading: 'Motor Protection & Control Gear',
    description:
      'Motor-protective breakers, contactors and pilot devices built for dependable industrial switching.',
    points: [
      'PKZ / PKE motor-protective circuit breakers',
      'Compact contactors with long electrical life',
      'RMQ 22.5 pushbuttons and emergency stops',
      'Short-circuit breaking capacity up to 150 kA',
    ],
  },
  {
    brandId: 'partex',
    badge: 'Marking Systems',
    heading: 'Wire & Cable Identification',
    description:
      'Precision marking sleeves, labels and printers that keep every wire and component clearly identified.',
    points: [
      'Wire and cable markers in standard sizes',
      'Heat-stable marking sleeves for panels',
      'Labels and printers for on-site marking',
      'Clear, lasting identification for audits',
    ],
  },
  {
    brandId: 'mennekes',
    badge: 'Industrial Plugs & Sockets',
    heading: 'CEE Plugs, Sockets & Distribution',
    description:
      'Rugged CEE plugs, receptacles and interlocked combinations for safe power on site and in harsh areas.',
    points: [
      'CEE plugs and sockets from 16A to 125A',
      'IP44 and IP67 protection for wet, dusty areas',
      'Interlocked switch-socket combinations',
      'Portable and fixed distribution units',
    ],
  },
];

interface Props {
  onOpenRfq: (productName?: string) => void;
}

export const BrandServicesSection: React.FC<Props> = ({ onOpenRfq }) => {
  const [photo, setPhoto] = useState<{ src: string; title: string } | null>(null);

  return (
    <section id="services" className="py-10 sm:py-12 bg-white border-b border-[#F1D9CA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#5F524C] mb-3 px-3 py-1 rounded-full bg-[#FFF1E8] border border-[#F1D9CA]">
              <Sparkles className="w-3.5 h-3.5 text-[#D2430F]" />
              Engineering Capabilities
            </div>
            <h2 className="text-3xl sm:text-5xl text-[#231815] font-editorial tracking-tight">
              Services For Industries
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#5F524C]/80 max-w-md leading-relaxed">
            Get benefited with our unique industrial solutions specially designed for Indian
            industries to enhance electrical performance and safety compliance.
          </p>
        </div>

        {/* Alternating rows */}
        <div className="space-y-8">
          {BLOCKS.map((b, i) => {
            const brand = BRANDS_DATA.find((x) => x.id === b.brandId);
            if (!brand) return null;
            const imageLeft = i % 2 === 1;
            const brandName = brand.name;
            return (
              <article
                key={b.brandId}
                className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl border border-[#F1D9CA] overflow-hidden shadow-xs hover:shadow-lg transition-shadow"
              >
                {/* Text */}
                <div className={`p-6 sm:p-10 flex flex-col justify-center gap-5 ${imageLeft ? 'lg:order-2' : ''}`}>
                  <div>
                    <span
                      className="inline-block text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border"
                      style={{
                        color: brand.colorDark,
                        background: brand.colorTint,
                        borderColor: `${brand.color}55`,
                      }}
                    >
                      {b.badge}
                    </span>
                    <h3 className="mt-3 text-2xl sm:text-3xl text-[#231815] font-editorial leading-tight">
                      <Link
                        to={`/products/${brand.id}`}
                        className="hover:text-[#D2430F] transition-colors"
                      >
                        {b.heading}
                      </Link>
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-[#231815]/85 leading-relaxed">{b.description}</p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {b.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#231815]">
                        <span
                          className="mt-0.5 p-0.5 rounded-full shrink-0"
                          style={{ background: `${brand.color}22` }}
                        >
                          <Check className="w-3.5 h-3.5" style={{ color: brand.colorDark }} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 flex flex-wrap items-stretch gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenRfq(brandName)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white rounded-full shadow-sm transition-colors cursor-pointer"
                      style={{ background: brand.color }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = brand.colorDark; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = brand.color; }}
                    >
                      Inquire for {brandName.split(/[\s-]/)[0]}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      to={`/products/${brand.id}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider rounded-full border-2 transition-colors"
                      style={{ color: brand.colorDark, borderColor: brand.color }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = brand.colorTint; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      View Products
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className={`relative min-h-[240px] lg:min-h-[360px] bg-[#FFF1E8] ${imageLeft ? 'lg:order-1' : ''}`}>
                  <Link to={`/products/${brand.id}`} aria-label={`View ${brandName} products`} className="absolute inset-0 block">
                      <img
                        src={brand.featuredImg}
                        alt={`${brandName} products`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setPhoto({ src: brand.featuredImg, title: brandName })}
                    aria-label="View work photo"
                    title="View work photo"
                    className="absolute bottom-4 right-4 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-[#FFF1E8] hover:bg-white text-[#5F524C] border border-[#F1D9CA] shadow-md transition-colors cursor-pointer"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Work photo lightbox */}
      {photo && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setPhoto(null)}
              aria-label="Close"
              className="fixed top-4 right-4 z-[60] w-11 h-11 flex items-center justify-center rounded-full bg-[#231815] hover:bg-[#D2430F] text-white shadow-lg ring-2 ring-white cursor-pointer transition-colors"
            >
              <X className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <img src={photo.src} alt={photo.title} className="w-full max-h-[80dvh] object-contain" />
          </div>
        </div>
      )}
    </section>
  );
};