import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Zap, Lightbulb, HardHat, Wrench, Package } from 'lucide-react';
import { BRANDS_DATA } from '../data/siddhiData';

// Card text per brand (from the brand & product category requirements document)
const BRAND_COPY: Record<string, { title: string; desc: string }> = {
  lapp: { title: 'Cables & Wiring Solutions', desc: 'Power, control, data and communication cables, single-core wires, cable glands, conduit systems and domestic wiring solutions for industrial and commercial applications.' },
  eaton: { title: 'Switchgear & Control', desc: 'Complete switchgear and electrical control solutions, including circuit protection, motor protection, contactors, vacuum circuit breakers and UPS systems for industrial and commercial applications.' },
  partex: { title: 'Identification & Marking Systems', desc: 'Professional cable and wire identification solutions, marking machines, labels, cable ties, tools and accessories for electrical panels and industrial applications.' },
  mennekes: { title: 'Industrial Power Connections', desc: 'Industrial electrical plugs, sockets, panel-mounted receptacles, inlets and fused, switched and interlocked power connection solutions.' },
};

// Product categories per brand. `id` is the product on the brand page the row links to;
// `img` is the thumbnail (the brand logo is shown when there is no photo or it fails to load).
type Cat = { id: string; label: string; sub?: string; img?: string };
const BRAND_CATS: Record<string, Cat[]> = {
  lapp: [
    { id: 'lapp-power-control', label: 'Power & Control Cables', img: '/images/lapp/power-control-cables.jpg' },
    { id: 'lapp-data-communication', label: 'Data and Communication Cables', img: '/images/lapp/data-communication-cables.jpg' },
    { id: 'lapp-control-cabinet', label: 'Control Cabinet Single Core', img: '/images/lapp/control-cabinet-single-cores.webp' },
    { id: 'lapp-glands', label: 'Cable Glands & Counter Nuts', img: '/images/lapp/cable-glands-counter-nuts.jpg' },
    { id: 'lapp-conduit', label: 'Rill, Conduit & Klick', img: '/images/lapp/rill-conduit-klick.jpg' },
    { id: 'lapp-domestic', label: 'Domestic / House Wiring', img: '/images/lapp/domestic-house-wiring.webp' },
  ],
  eaton: [
    { id: 'eaton-contactors', label: 'Contactors', img: '/images/eaton/contactor.png' },
    { id: 'eaton-mccb', label: 'MCCB', img: '/images/eaton/mccb-nzm.png' },
    { id: 'eaton-pkz', label: 'MPCB', img: '/images/eaton/mpcb-pkz.png' },
    { id: 'eaton-acb', label: 'ACB', img: '/images/eaton/acb-izmx.png' },
    { id: 'eaton-vcb', label: 'VCB', img: '/images/eaton/vcb-medium-voltage.png' },
    { id: 'eaton-bussmann', label: 'Bussmann Fuses', img: '/images/eaton/bussmann-fuses.png' },
    { id: 'eaton-ups', label: 'UPS', sub: 'Single Phase / Three Phase', img: '/images/eaton/ups.png' },
  ],
  partex: [
    { id: 'partex-machines', label: 'Marking Machines', img: '/images/partex/marking-machine.png' },
    { id: 'partex-labels', label: 'Labels', img: '/images/partex/heat-shrink-labels.png' },
    { id: 'partex-ties', label: 'Cable Ties and Tools', img: '/images/partex/cable-ties.png' },
    { id: 'partex-profile', label: 'Accessories', sub: 'CAS · MD / MDH · PLD', img: '/images/partex/profile-accessories.png' },
  ],
  mennekes: [
    { id: 'mennekes-receptacles', label: 'CEE Panel Mounted Receptacles', img: '/images/mennekes/panel-receptacle.png' },
    { id: 'mennekes-plugs', label: 'CEE Plugs', img: '/images/mennekes/plugs-couplers.png' },
    { id: 'mennekes-connectors', label: 'CEE Plugs and Connectors', img: '/images/mennekes/plug-connector.png' },
    { id: 'mennekes-interlocked', label: 'CEE Receptacles: Fused, Switched and Interlocked', img: '/images/mennekes/interlocked-duo.png' },
    { id: 'mennekes-inlets', label: 'CEE Panel Mounted Inlets', img: '/images/mennekes/panel-inlet.jpg' },
  ],
};

/** Small square thumbnail; falls back to the brand logo when there is no photo. */
const Thumb: React.FC<{ src?: string; logo: string; alt: string }> = ({ src, logo, alt }) => {
  const [failed, setFailed] = useState(false);
  const useLogo = !src || failed;
  return (
    <span className="w-11 h-11 shrink-0 rounded-md border border-[#F1D9CA] bg-white flex items-center justify-center overflow-hidden">
      <img
        src={useLogo ? logo : src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => { if (!useLogo) setFailed(true); }}
        className={`no-zoom ${useLogo ? 'w-8 h-8 object-contain' : 'w-full h-full object-cover'}`}
      />
    </span>
  );
};

// Allied products & services: numbered 01 to 05
const ALLIED = [
  { icon: HardHat, slug: 'grounding-earthing', tag: 'SAFETY & EARTHING', title: 'Grounding or Earthing Solutions', desc: 'Earth pit auditing, maintenance-free chemical grounding and low-impedance bonding for plants, laboratories and buildings.' },
  { icon: Lightbulb, slug: 'led-retrofits', tag: 'ENERGY EFFICIENCY', title: 'Industrial LED Retrofits', desc: 'Factory shop-floor, high-bay and cleanroom LED retrofits with lux level auditing and payback simulation.' },
  { icon: Zap, slug: 'lt-ht-cables', tag: 'POWER DISTRIBUTION', title: 'LT & HT Armoured and Unarmoured Cables', desc: 'Supply, laying and termination of low- and high-voltage cables, in heavy-duty armoured and flexible unarmoured construction.' },
  { icon: Wrench, slug: 'mro-services', tag: 'LIFECYCLE', title: 'MRO Services', desc: 'MRO (Maintenance, Repair, and Overhaul) support for plant equipment and operations.' },
  { icon: Package, slug: 'consumables-equipment', tag: 'CONSUMABLES', title: 'Industrial Electrical Consumables & Equipment', desc: 'Glands, lugs, sleeves and other electrical consumables and equipment for plants, panels and projects.' },
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
        <div className="mb-8 sm:mb-10 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-6 sm:gap-8 lg:gap-14 items-center">
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
              { title: 'Allied products & services', desc: 'Earthing, LED retrofits, LT & HT armoured and unarmoured cables, MRO, consumables' },
              { title: 'OEM, project and MRO support', desc: 'From selection and supply to MRO (Maintenance, Repair, and Overhaul)' },
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-y-0">
          {BRANDS_DATA.map((brand) => {
            const accent = brand.color; // LAPP orange, Eaton blue, Partex green, Mennekes red
            const short = brand.name.split(/[\s-]/)[0];
            return (
              <article
                key={brand.id}
                className="flex flex-col lg:grid lg:row-span-5 lg:grid-rows-subgrid text-left rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                style={{
                  border: `1px solid ${accent}55`,
                  borderTop: `4px solid ${accent}`,
                  background: `linear-gradient(160deg, ${brand.colorTint} 0%, #ffffff 55%)`,
                }}
              >
                {/* Brand photo with the original brand logo on top */}
                <Link to={`/products/${brand.id}`} onClick={() => onSelectBrand(brand.id)} aria-label={`${brand.name} products`} className="block">
                  <div className="relative h-24 sm:h-36 overflow-hidden bg-[#FFF1E8]">
                    <img
                      src={brand.featuredImg}
                      alt={`${brand.name} products`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      className="no-zoom absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative -mt-8 sm:-mt-12 ml-3 sm:ml-4 inline-flex items-center justify-center w-28 sm:w-40 h-12 sm:h-[72px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white shadow-md" style={{ border: `1px solid ${accent}55` }}>
                    <img src={brand.logo} alt={brand.name} className="no-zoom max-h-full max-w-full object-contain" />
                  </div>
                </Link>

                {/* Title, description, categories and button sit on shared rows, so all four cards line up */}
                <h3 className="px-3 sm:px-4 pt-3 sm:pt-4 text-base sm:text-lg font-semibold text-[#231815] leading-snug">{BRAND_COPY[brand.id]?.title}</h3>
                <p className="px-3 sm:px-4 pt-2 text-xs sm:text-sm text-[#5F524C] leading-relaxed line-clamp-4 sm:line-clamp-none">{BRAND_COPY[brand.id]?.desc}</p>

                {/* Product categories: each row opens that product on the brand's listing page */}
                <ul className="px-3 sm:px-4 pt-3 sm:pt-4 flex flex-col gap-1.5 sm:gap-2 content-start">
                  {(BRAND_CATS[brand.id] ?? []).map((c) => (
                    <li key={c.id}>
                      <Link
                        to={`/products/${brand.id}#${c.id}`}
                        onClick={() => onSelectBrand(brand.id)}
                        className="flex items-center justify-between gap-3"
                      >
                        <span
                          className="flex-1 rounded-md border bg-white px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium leading-snug hover:bg-white/60 transition-colors"
                          style={{ color: brand.colorDark, borderColor: `${accent}88` }}
                        >
                          {c.label}
                          {c.sub && <span className="block text-xs font-normal text-[#5F524C]">{c.sub}</span>}
                        </span>
                        <span className="hidden sm:block"><Thumb src={c.img} logo={brand.logo} alt={c.label} /></span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="px-3 sm:px-4 pt-4 sm:pt-5 pb-4 sm:pb-5 mt-auto">
                  <Link
                    to={`/products/${brand.id}`}
                    onClick={() => onSelectBrand(brand.id)}
                    className="inline-flex w-full items-center justify-center gap-1 sm:gap-1.5 rounded-md px-2 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-colors hover:brightness-110"
                    style={{ backgroundColor: brand.colorDark }}
                  >
                    Browse {short} Products <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Allied products & services: big heading outside the panel */}
        <div id="allied" className="mt-10 sm:mt-14 mb-6 sm:mb-8 max-w-3xl scroll-mt-28 border-l-4 border-[#D2430F] pl-5 sm:pl-7 text-left">
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
              Alongside our authorised brands, we deliver five core areas: earthing, LED retrofits, LT &amp; HT cables, MRO support, and industrial electrical consumables and equipment.
            </p>
            {/* Related image fills the free space (same photo as the Allied slide in the hero) */}
            <div className="relative mt-6 flex-1 min-h-[160px] rounded-2xl overflow-hidden border border-white/25 shadow-lg">
              <img
                src="/images/gallery/allied-warehouse.jpg"
                alt="Allied industrial products and services"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className="no-zoom absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#A8340A]/40 via-transparent to-transparent" />
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
          <ul className="grid grid-cols-2 bg-[#FFFAF6]">
            {ALLIED.map((a, i) => {
              const Icon = a.icon;
              const isLast = i === ALLIED.length - 1;
              return (
                <li
                  key={a.title}
                  className={`group relative flex flex-col sm:flex-row gap-2 sm:gap-4 p-3 sm:p-6 border-b border-[#F1D9CA] cursor-pointer transition-colors duration-300 hover:bg-[#FFF1E8] ${
                    isLast ? 'col-span-2 border-b-0' : i % 2 === 0 ? 'border-r' : ''
                  }`}
                >
                  <Link to={`/services/${a.slug}`} aria-label={a.title} className="absolute inset-0 z-10" />
                  <span className="absolute left-0 top-0 h-full w-1 bg-[#D2430F] scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100" />
                  <span className="shrink-0 w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-[#D2430F]/30 bg-white text-[#D2430F] flex items-center justify-center transition-all duration-300 group-hover:bg-[#D2430F] group-hover:text-white group-hover:border-[#D2430F]">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold tabular-nums text-[#A8340A]">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-[10px] font-bold tracking-widest text-[#5F524C]">{a.tag}</span>
                    </div>
                    <h4 className="mt-1 text-sm sm:text-lg font-semibold text-[#231815] leading-snug group-hover:text-[#D2430F] transition-colors">{a.title}</h4>
                    <p className="mt-1 text-[11px] sm:text-[13px] text-[#5F524C] leading-relaxed line-clamp-3 sm:line-clamp-none">{a.desc}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#D2430F]">Learn more <ArrowUpRight className="w-3.5 h-3.5" /></span>
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