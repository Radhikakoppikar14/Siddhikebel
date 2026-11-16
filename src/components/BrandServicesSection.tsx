import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ZoomIn, X, Sparkles, ChevronRight } from 'lucide-react';
import { BRANDS_DATA, PRODUCTS_CATALOG } from '../data/siddhiData';

interface BrandCategory {
  label: string;
  /** id of the product card on the brand's listing page (/products/<brand>#<productId>) */
  productId: string;
  /** optional small tags shown under the label */
  tags?: string[];
}

interface BrandBlock {
  brandId: string;
  /** Heading shown beside the logo, e.g. "LAPP" */
  title: string;
  /** Sub heading shown beside the logo, e.g. "Cables & Wiring Solutions" */
  subtitle: string;
  categories: BrandCategory[];
}

// Content for each brand section (client brief). Description, logo and photo come from BRANDS_DATA.
const BLOCKS: BrandBlock[] = [
  {
    brandId: 'lapp',
    title: 'LAPP',
    subtitle: 'Cables & Wiring Solutions',
    categories: [
      { label: 'Power & Control Cables', productId: 'lapp-power-control' },
      { label: 'Data and Communication Cables', productId: 'lapp-data-communication' },
      { label: 'Control Cabinet Single Core', productId: 'lapp-control-cabinet' },
      { label: 'Cable Glands & Counter Nuts', productId: 'lapp-glands' },
      { label: 'Rill, Conduit & Klick', productId: 'lapp-conduit' },
      { label: 'Domestic / House Wiring', productId: 'lapp-domestic' },
    ],
  },
  {
    brandId: 'eaton',
    title: 'EATON',
    subtitle: 'Switchgear & Control',
    categories: [
      { label: 'Contactors', productId: 'eaton-contactors' },
      { label: 'MCCB', productId: 'eaton-mccb' },
      { label: 'MPCB', productId: 'eaton-pkz' },
      { label: 'ACB', productId: 'eaton-acb' },
      { label: 'VCB', productId: 'eaton-vcb' },
      { label: 'Bussmann Fuses', productId: 'eaton-bussmann' },
      { label: 'UPS – Single Phase / Three Phase', productId: 'eaton-ups' },
    ],
  },
  {
    brandId: 'partex',
    title: 'PARTEX',
    subtitle: 'Identification & Marking Systems',
    categories: [
      { label: 'Marking Machines', productId: 'partex-machines' },
      { label: 'Labels', productId: 'partex-labels' },
      { label: 'Cable Ties and Tools', productId: 'partex-ties' },
      { label: 'Accessories', productId: 'partex-profile', tags: ['CAS', 'MD / MDH', 'PLD'] },
    ],
  },
  {
    brandId: 'mennekes',
    title: 'MENNEKES',
    subtitle: 'Industrial Power Connections',
    categories: [
      { label: 'CEE Panel Mounted Receptacles', productId: 'mennekes-receptacles' },
      { label: 'CEE Plugs', productId: 'mennekes-plugs' },
      { label: 'CEE Plugs and Connectors', productId: 'mennekes-connectors' },
      { label: 'CEE Receptacles – Fused, Switched and Interlocked', productId: 'mennekes-interlocked' },
      { label: 'CEE Panel Mounted Inlets', productId: 'mennekes-inlets' },
    ],
  },
];

// Brand colour themes: LAPP orange, EATON blue, PARTEX green, MENNEKES red
const THEME: Record<string, { bar: string; dark: string; tint: string }> = {
  lapp: { bar: '#EA580C', dark: '#9A3412', tint: '#FFF3EA' },
  eaton: { bar: '#1D5FD0', dark: '#1740A0', tint: '#EAF2FF' },
  partex: { bar: '#16A34A', dark: '#166534', tint: '#ECFDF3' },
  mennekes: { bar: '#DC2626', dark: '#991B1B', tint: '#FEECEC' },
};

/** Logo on a white chip; falls back to the brand name if the file is missing. */
const LogoChip: React.FC<{ src: string; name: string }> = ({ src, name }) => {
  const [failed, setFailed] = useState(false);
  return (
    <div className="shrink-0 flex items-center justify-center bg-white rounded-md shadow-md w-28 sm:w-36 h-12 sm:h-14 px-3 py-1.5">
      {failed ? (
        <span className="text-sm font-bold text-[#231815]">{name}</span>
      ) : (
        <img
          src={src}
          alt={`${name} logo`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="no-zoom max-h-full max-w-full w-auto h-auto object-contain"
        />
      )}
    </div>
  );
};

/** Small product photo; hidden if the file is missing so no broken image shows. */
const Thumb: React.FC<{ src: string; alt: string; to: string }> = ({ src, alt, to }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <Link
      to={to}
      aria-label={alt}
      className="block w-full aspect-[4/3] rounded-lg overflow-hidden bg-white border border-white/70 shadow-md hover:scale-[1.04] transition-transform"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="no-zoom w-full h-full object-cover"
      />
    </Link>
  );
};

interface Props {
  onOpenRfq: (productName?: string) => void;
}

export const BrandServicesSection: React.FC<Props> = ({ onOpenRfq }) => {
  const [photo, setPhoto] = useState<{ src: string; title: string } | null>(null);

  return (
    <section id="services" className="py-10 sm:py-12 bg-white border-b border-[#F1D9CA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#5F524C] mb-3 px-3 py-1 rounded-full bg-[#FFF1E8] border border-[#F1D9CA]">
              <Sparkles className="w-3.5 h-3.5 text-[#D2430F]" />
              Engineering Capabilities
            </div>
            <h2 className="text-3xl sm:text-5xl text-[#231815] font-editorial tracking-tight">
              Services For Industries
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#5F524C] max-w-md leading-relaxed">
            Get benefited with our unique industrial solutions specially designed for Indian
            industries to enhance electrical performance and safety compliance.
          </p>
        </div>

        {/* One section per brand */}
        <div className="space-y-5 sm:space-y-8">
          {BLOCKS.map((b, i) => {
            const brand = BRANDS_DATA.find((x) => x.id === b.brandId);
            if (!brand) return null;
            const theme = THEME[brand.id];
            const imageLeft = i % 2 === 1;
            const brandName = brand.name;
            const listingUrl = `/products/${brand.id}`;
            const thumbs = PRODUCTS_CATALOG.filter((p) => p.brandId === brand.id && p.image).slice(0, 3);

            return (
              <article
                key={b.brandId}
                id={`brand-${brand.id}`}
                className="flex flex-col bg-white rounded-2xl border overflow-hidden shadow-xs hover:shadow-lg transition-shadow"
                style={{ borderColor: `${theme.bar}55` }}
              >
                {/* Brand header: logo + name + tagline, in the brand colour */}
                <div
                  className="px-4 sm:px-10 py-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-white"
                  style={{ backgroundColor: theme.bar }}
                >
                  <LogoChip src={brand.logo} name={brand.name} />
                  <div className="min-w-0">
                    <div className="text-xl sm:text-3xl font-bold tracking-wide leading-tight">{b.title}</div>
                    <div className="text-sm sm:text-base font-medium text-white/95">{b.subtitle}</div>
                  </div>
                  <Link
                    to={listingUrl}
                    className="ml-auto hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                    style={{ color: theme.dark }}
                  >
                    Browse Products
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Text + categories */}
                  <div className={`p-4 sm:p-10 flex flex-col gap-4 sm:gap-5 ${imageLeft ? 'lg:order-2' : ''}`}>
                    <p className="text-sm sm:text-base text-[#231815]/85 leading-relaxed">{brand.shortDesc}</p>

                    <div>
                      <h3
                        className="text-[11px] font-semibold uppercase tracking-widest mb-3"
                        style={{ color: theme.dark }}
                      >
                        Product categories
                      </h3>
                      <ul className="grid grid-cols-2 gap-2 sm:gap-2.5">
                        {b.categories.map((c, n) => (
                          <li key={c.label}>
                            <Link
                              to={`${listingUrl}#${c.productId}`}
                              className="group flex items-start gap-2 sm:gap-3 h-full rounded-xl border px-2.5 sm:px-3.5 py-2 sm:py-3 transition-all hover:-translate-y-0.5 hover:shadow-md"
                              style={{ borderColor: `${theme.bar}40`, background: theme.tint }}
                            >
                              <span
                                className="mt-0.5 w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded-full text-[10px] sm:text-[11px] font-bold text-white flex items-center justify-center"
                                style={{ background: theme.bar }}
                              >
                                {n + 1}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-[13px] sm:text-sm font-semibold text-[#231815] leading-snug">
                                  {c.label}
                                </span>
                                {c.tags && (
                                  <span className="mt-1.5 flex flex-wrap gap-1.5">
                                    {c.tags.map((t) => (
                                      <span
                                        key={t}
                                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border"
                                        style={{ color: theme.dark, borderColor: `${theme.bar}55` }}
                                      >
                                        {t}
                                      </span>
                                    ))}
                                  </span>
                                )}
                              </span>
                              <ChevronRight
                                className="hidden sm:block w-4 h-4 mt-0.5 shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition"
                                style={{ color: theme.dark }}
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-1 flex items-stretch gap-2 sm:gap-3">
                      <Link
                        to={listingUrl}
                        className="inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 text-[11px] sm:text-xs font-semibold uppercase tracking-wide sm:tracking-wider text-white rounded-full shadow-sm transition-colors"
                        style={{ background: theme.bar }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = theme.dark; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = theme.bar; }}
                      >
                        Browse Products
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => onOpenRfq(brandName)}
                        className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 px-3 sm:px-6 py-3 text-[11px] sm:text-xs font-semibold uppercase tracking-wide sm:tracking-wider rounded-full border-2 transition-colors cursor-pointer"
                        style={{ color: theme.dark, borderColor: theme.bar }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = theme.tint; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        Inquire for {brandName.split(/[\s-]/)[0]}
                      </button>
                    </div>
                  </div>

                  {/* Product images */}
                  <div
                    className={`relative min-h-[200px] sm:min-h-[260px] lg:min-h-[420px] ${imageLeft ? 'lg:order-1' : ''}`}
                    style={{ background: theme.tint }}
                  >
                    <Link to={listingUrl} aria-label={`Browse ${brandName} products`} className="absolute inset-0 block">
                      <img
                        src={brand.featuredImg}
                        alt={`${brandName} products`}
                        loading="lazy"
                        decoding="async"
                        className="no-zoom absolute inset-0 w-full h-full object-cover"
                      />
                    </Link>
                    {thumbs.length > 0 && (
                      <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 pt-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
                        <div className="grid grid-cols-3 gap-3 max-w-md pointer-events-auto pr-14">
                          {thumbs.map((p) => (
                            <Thumb key={p.id} src={p.image as string} alt={p.name} to={`${listingUrl}#${p.id}`} />
                          ))}
                        </div>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setPhoto({ src: brand.featuredImg, title: brandName })}
                      aria-label="View larger photo"
                      title="View larger photo"
                      className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-[#5F524C] border border-[#F1D9CA] shadow-md transition-colors cursor-pointer"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Photo lightbox */}
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