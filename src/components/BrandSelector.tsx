import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Zap, ShieldCheck, Lightbulb, HardHat, Cog, ClipboardList, Wrench } from 'lucide-react';
import { BRANDS_DATA } from '../data/siddhiData';

// Small image shown on the right side of each category pill.
// Any category not listed here falls back to the brand's featured photo.
const CATEGORY_IMAGES: Record<string, string> = {
  // Lapp
  'Power & Control Cables': '/images/lapp/power-control-cables.jpg',
  'Data Communication': '/images/lapp/data-communication-cables.jpg',
  'Cable Glands & Connectors': '/images/lapp/cable-glands-counter-nuts.jpg',
  // Eaton
  'Motor Protection (PKZ/PKE)': '/images/resource/et1.jpg',
  'Contactors & Relays': '/images/resource/et2.jpg',
  'Pilot Devices (RMQ 22.5)': '/images/resource/et4.jpg',
  // Partex
  'Wire & Cable Markers': '/images/clients/partex.png',
  'Marking Sleeves': '/images/clients/partex.png',
  'Labels & Marking Printers': '/images/clients/partex.png',
  // Mennekes
  'CEE Plugs & Sockets (16A–125A)': '/images/resource/me1.jpg',
  'Interlocked Combinations': '/images/resource/me6.jpg',
};

const BRAND_COPY: Record<string, { title: string; desc: string }> = {
  lapp: { title: 'Cables & connectivity', desc: 'Power, control and data cables, single-core cables, cable glands, protection systems and industrial connectors for machines, panels and installations.' },
  eaton: { title: 'Switchgear & control', desc: 'Switchgear, motor protection, controllers, contactors, pushbuttons and switch-disconnectors for industrial control panels and equipment.' },
  partex: { title: 'Identification & marking', desc: 'Cable and wire markers, component markers, sleeves, labels, printers and accessories to keep panels and systems clearly identified.' },
  mennekes: { title: 'Industrial power connections', desc: 'CEE plugs and sockets, interlocked combinations and power distribution products for factories, workshops and worksites.' },
};

const ALLIED = [
  { icon: Zap, tag: 'POWER', title: 'LT & HT cables', desc: 'Cable options for low- and high-voltage distribution and industrial applications.' },
  { icon: ShieldCheck, tag: 'PROTECTION', title: 'Armoured cables', desc: 'Protected cable choices for fixed power installations and demanding routes.' },
  { icon: Lightbulb, tag: 'LIGHTING', title: 'Industrial lighting', desc: 'Lighting options for plant floors, workshops, warehouses and work areas.' },
  { icon: HardHat, tag: 'SAFETY', title: 'Earthing solutions', desc: 'Products to support safe, dependable earthing and bonding installations.' },
  { icon: Cog, tag: 'OEM SUPPORT', title: 'OEM requirements', desc: 'Product sourcing aligned with equipment specifications, bills of materials and repeat build needs.' },
  { icon: ClipboardList, tag: 'PROJECTS', title: 'Project handling', desc: 'Coordination of product requirements and supply for industrial and building projects.' },
  { icon: Wrench, tag: 'LIFECYCLE', title: 'RMO services', desc: 'Repair, Maintenance & Overhaul support for equipment and operations.' },
];

interface BrandSelectorProps {
  onSelectBrand: (brandId: string) => void;
  // kept for compatibility with existing pages; the brand cards no longer open the inquiry modal
  onOpenRfq?: (brandName?: string) => void;
}

/**
 * The four main brands (Lapp, Eaton, Partex, Mennekes).
 * Same structure and left alignment on every card; each card uses its own brand colour
 * plus the brand's product photo and logo. Brand name and description text are removed.
 */
export const BrandSelector: React.FC<BrandSelectorProps> = ({ onSelectBrand, onOpenRfq }) => {
  return (
    <section id="brands" className="py-10 sm:py-12 bg-white border-b border-[#EBD9CD] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Heading (left) + authorised brand logos (right) */}
        <div className="mb-10 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-14 items-center">
          <div className="border-l-4 border-[#D2430F] pl-5 sm:pl-7 text-left">
            <h2 className="text-[#231815] font-editorial leading-tight">
              Trusted brand partners.
              <br className="hidden sm:block" />{' '}
              <span className="text-[#D2430F]">Broader industrial solutions.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm sm:text-base text-[#5F524C] leading-relaxed">
              Authorised ranges from LAPP, Eaton, Partex and MENNEKES—alongside allied product sourcing, OEM requirement support and project handling.
            </p>
          </div>

          {/* What we cover: summarises the intro line */}
          <ul className="rounded-2xl border border-[#F1D9CA] bg-[#FFFAF6] divide-y divide-[#F1D9CA] shadow-xs">
            {[
              { title: 'Authorised brand ranges', desc: 'LAPP, Eaton, Partex and MENNEKES' },
              { title: 'Allied product sourcing', desc: 'LT & HT cables, lighting, earthing and more' },
              { title: 'OEM, project and RMO support', desc: 'From selection and supply to repair and overhaul' },
            ].map((item) => (
              <li key={item.title} className="group flex items-center gap-4 px-5 py-4 transition-colors duration-300 hover:bg-[#FFF1E8]">
                <span className="w-9 h-9 shrink-0 rounded-full bg-white border border-[#D2430F]/30 text-[#D2430F] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#D2430F] group-hover:text-white group-hover:border-[#D2430F]">
                  <Check className="w-4 h-4" strokeWidth={2.5} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-[#231815]">{item.title}</span>
                  <span className="block text-xs text-[#5F524C]">{item.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BRANDS_DATA.map((brand) => (
            <article
              key={brand.id}
              className="flex flex-col text-left rounded-lg overflow-hidden"
              style={{
                border: `1px solid ${brand.color}66`,
                borderTop: `5px solid ${brand.color}`,
                background: `linear-gradient(135deg, ${brand.color}26 0%, #ffffff 58%, ${brand.color}14 100%)`,
              }}
            >
              {/* Product photo */}
              <div className="h-32 overflow-hidden bg-white">
                <img
                  src={brand.featuredImg}
                  alt={`${brand.name} products`}
                  loading="lazy"
                  decoding="async"
                  className="no-zoom w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col items-start flex-1 px-6 pb-6">
                {/* Logo overlapping the photo */}
                <div
                  className="-mt-10 w-36 h-20 rounded-md bg-white border shadow-md flex items-center justify-center px-3 py-2 relative z-10"
                  style={{ borderColor: `${brand.color}55` }}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-14 max-w-full w-auto object-contain"
                    loading="eager"
                    decoding="async"
                    width={96}
                    height={40}
                  />
                </div>

                <h3 className="mt-4 text-base font-semibold text-[#231815]">{BRAND_COPY[brand.id]?.title}</h3>
                <p className="mt-1.5 text-xs text-[#5F524C] leading-relaxed">{BRAND_COPY[brand.id]?.desc}</p>

                <ul className="mt-4 flex flex-col gap-2">
                  {brand.categories.map((cat) => (
                    <li key={cat} className="flex items-center justify-between gap-2">
                      <span
                        className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1.5 rounded-md bg-white/80 border"
                        style={{ color: brand.colorDark, borderColor: `${brand.color}55` }}
                      >
                        {cat}
                      </span>
                      <img
                        src={CATEGORY_IMAGES[cat] ?? brand.featuredImg}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        width={40}
                        height={40}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        className="no-zoom w-10 h-10 shrink-0 rounded-md bg-white object-contain p-0.5 border"
                        style={{ borderColor: `${brand.color}55` }}
                      />
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/products/${brand.id}`}
                  onClick={() => onSelectBrand(brand.id)}
                  className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: brand.colorDark }}
                >
                  <span>Browse {brand.name.split(' ')[0]} products</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Allied products & services: big heading outside the panel */}
        <div className="mt-14 mb-8 max-w-3xl border-l-4 border-[#D2430F] pl-5 sm:pl-7 text-left">
          <h2 className="text-[#231815] font-editorial leading-tight">Allied products &amp; services.</h2>
        </div>

        {/* Split panel (intro + numbered list) */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] rounded-3xl overflow-hidden border border-[#F1D9CA] shadow-xl bg-white">
          {/* Left: intro panel */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#D2430F] to-[#A8340A] text-white p-8 sm:p-10 flex flex-col">
            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full border border-white/15 pointer-events-none" />
            <h3 className="relative text-2xl sm:text-3xl font-normal font-editorial tracking-tight !text-white leading-tight">
              More ways we support your requirements.
            </h3>
            <p className="relative mt-4 text-sm text-white/85 leading-relaxed">
              Alongside our authorised brands, we help with allied product sourcing, OEM needs, project supply and lifecycle services.
            </p>
            {/* Related image fills the free space (same photo as the Allied slide in the hero) */}
            <div className="relative mt-6 flex-1 min-h-[160px] rounded-2xl overflow-hidden border border-white/25 shadow-lg">
              <img
                src="/assets/videos/hero-allied-poster.jpg"
                alt="Allied industrial products and services"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className="no-zoom absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#A8340A]/70 via-transparent to-transparent" />
            </div>
            <div className="relative pt-6">
              {onOpenRfq ? (
                <button
                  type="button"
                  onClick={() => onOpenRfq()}
                  className="inline-flex items-center gap-2 bg-white text-[#A8340A] text-xs font-bold uppercase tracking-wider rounded-md px-5 py-3 shadow-lg hover:bg-[#FFF1E8] transition-colors cursor-pointer"
                >
                  Share your requirement <ArrowUpRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white text-[#A8340A] text-xs font-bold uppercase tracking-wider rounded-md px-5 py-3 shadow-lg hover:bg-[#FFF1E8] transition-colors"
                >
                  Share your requirement <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Right: numbered rows */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 bg-[#FFFAF6]">
            {ALLIED.map((a, i) => {
              const Icon = a.icon;
              const isLast = i === ALLIED.length - 1;
              return (
                <li
                  key={a.title}
                  className={`group relative flex gap-4 p-5 sm:p-6 border-b border-[#F1D9CA] cursor-default transition-colors duration-300 hover:bg-[#FFF1E8] ${
                    isLast ? 'sm:col-span-2 border-b-0' : i % 2 === 0 ? 'sm:border-r' : ''
                  }`}
                >
                  <span className="absolute left-0 top-0 h-full w-1 bg-[#D2430F] scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100" />
                  <span className="shrink-0 w-12 h-12 rounded-full border border-[#D2430F]/30 bg-white text-[#D2430F] flex items-center justify-center transition-all duration-300 group-hover:bg-[#D2430F] group-hover:text-white group-hover:border-[#D2430F]">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold tabular-nums text-[#D2430F]/60">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-[10px] font-bold tracking-widest text-[#5F524C]">{a.tag}</span>
                    </div>
                    <h4 className="mt-1 text-base sm:text-lg font-semibold text-[#231815] group-hover:text-[#D2430F] transition-colors">{a.title}</h4>
                    <p className="mt-1 text-xs sm:text-[13px] text-[#5F524C] leading-relaxed">{a.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};