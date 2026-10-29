import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Zap, ShieldCheck, Lightbulb, HardHat, Cog, ClipboardList, Wrench } from 'lucide-react';
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
  { icon: Zap, bg: 'bg-[#FFF1E8]', tag: 'POWER', title: 'LT & HT cables', desc: 'Cable options for low- and high-voltage distribution and industrial applications.' },
  { icon: ShieldCheck, bg: 'bg-[#FFF6D9]', tag: 'PROTECTION', title: 'Armoured cables', desc: 'Protected cable choices for fixed power installations and demanding routes.' },
  { icon: Lightbulb, bg: 'bg-[#E8F0F8]', tag: 'LIGHTING', title: 'Industrial lighting', desc: 'Lighting options for plant floors, workshops, warehouses and work areas.' },
  { icon: HardHat, bg: 'bg-[#E9F4EA]', tag: 'SAFETY', title: 'Earthing solutions', desc: 'Products to support safe, dependable earthing and bonding installations.' },
  { icon: Cog, bg: 'bg-[#F5ECF6]', tag: 'OEM SUPPORT', title: 'OEM requirements', desc: 'Product sourcing aligned with equipment specifications, bills of materials and repeat build needs.' },
  { icon: ClipboardList, bg: 'bg-[#FFEDE0]', tag: 'PROJECTS', title: 'Project handling', desc: 'Coordination of product requirements and supply for industrial and building projects.' },
  { icon: Wrench, bg: 'bg-[#E6F3F3]', tag: 'LIFECYCLE', title: 'RMO services', desc: 'Repair, Maintenance & Overhaul support for equipment and operations.' },
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
export const BrandSelector: React.FC<BrandSelectorProps> = ({ onSelectBrand }) => {
  return (
    <section id="brands" className="py-10 sm:py-12 bg-white border-b border-[#EBD9CD] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-[#231815] font-editorial">Trusted brand partners. Broader industrial solutions.</h2>
          <p className="mt-3 text-sm sm:text-base text-[#5F524C]/80 leading-relaxed">
            Authorised ranges from LAPP, Eaton, Partex and MENNEKES—alongside allied product sourcing, OEM requirement support and project handling.
          </p>
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

        {/* More ways we support your requirements */}
        <div className="mt-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#5F524C] mb-3 px-3 py-1 rounded-full bg-[#FFF1E8] border border-[#F1D9CA]">
            Allied products &amp; services
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#231815]">More ways we support your requirements.</h3>
          <p className="mt-1 text-sm text-[#5F524C]/80">
            Alongside our authorised brands, we help with allied product sourcing, OEM needs, project supply and lifecycle services.
          </p>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALLIED.map((a, i) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.title}
                  className={`group relative overflow-hidden rounded-2xl border border-[#F1D9CA] ${a.bg} p-6 min-h-[170px] cursor-default shadow-xs transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#D2430F] hover:bg-[#FFE6D3] ${i === ALLIED.length - 1 ? 'lg:col-span-2' : ''}`}
                >
                  <Icon className="absolute -right-4 -bottom-4 w-28 h-28 text-[#D2430F]/10 group-hover:text-[#D2430F]/20 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 pointer-events-none" strokeWidth={1.25} />
                  <div className="relative flex items-center gap-3">
                    <span className="w-11 h-11 rounded-xl bg-white text-[#D2430F] border border-[#F1D9CA] flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-[#D2430F] group-hover:text-white group-hover:border-[#D2430F] group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-[#D2430F] group-hover:text-[#A8340A] transition-colors">{a.tag}</span>
                  </div>
                  <h4 className="relative mt-4 text-lg font-semibold text-[#231815] group-hover:text-[#D2430F] transition-colors">{a.title}</h4>
                  <p className="relative mt-1.5 text-xs sm:text-[13px] text-[#5F524C] leading-relaxed group-hover:text-[#231815] transition-colors">{a.desc}</p>
                  <span className="absolute left-0 bottom-0 h-1 w-0 bg-[#D2430F] transition-all duration-500 group-hover:w-full" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};