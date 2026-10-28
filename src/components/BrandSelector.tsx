import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
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
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-[#231815] font-editorial">Our Authorised Brand Partners</h2>
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
                  className="-mt-8 w-16 h-16 rounded-md bg-white border shadow-md flex items-center justify-center p-2 relative z-10"
                  style={{ borderColor: `${brand.color}55` }}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-8 max-w-full object-contain"
                    loading="eager"
                    decoding="async"
                    width={96}
                    height={40}
                  />
                </div>

                <ul className="mt-4 flex flex-wrap justify-start gap-1.5">
                  {brand.categories.map((cat) => (
                    <li
                      key={cat}
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold pl-2.5 pr-1 py-1 rounded-md bg-white/80 border"
                      style={{ color: brand.colorDark, borderColor: `${brand.color}55` }}
                    >
                      <span>{cat}</span>
                      <img
                        src={CATEGORY_IMAGES[cat] ?? brand.featuredImg}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        width={24}
                        height={24}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        className="no-zoom w-6 h-6 shrink-0 rounded-full bg-white object-contain border"
                        style={{ borderColor: `${brand.color}33` }}
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
      </div>
    </section>
  );
};