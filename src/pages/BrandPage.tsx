import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { BRANDS_DATA, PRODUCTS_CATALOG, ProductItem } from '../data/siddhiData';
import { BRAND_DETAILS } from '../data/brandDetails';
import { CroppedVideo } from '../components/CroppedVideo';
import { BrandIndustries } from '../components/BrandIndustries';
import { BRAND_INDUSTRIES } from '../data/industries';

interface BrandPageProps {
  onOpenSpecs: (product: ProductItem) => void;
  onGoToContact: (subject?: string) => void;
}

export const BrandPage: React.FC<BrandPageProps> = ({ onGoToContact }) => {
  const { brandId } = useParams<{ brandId: string }>();
  const brand = BRANDS_DATA.find((b) => b.id === brandId);
  if (!brand) return <Navigate to="/products" replace />;

  // Each brand uses its own slider video (same files as the home page slider)
  const bgVideo = `/assets/videos/hero-${brand.id}.mp4`;
  const bgPoster = `/assets/videos/hero-${brand.id}-poster.jpg`;
  const detail = BRAND_DETAILS[brand.id];
  const products = PRODUCTS_CATALOG.filter((p) => p.brandId === brand.id);

  return (
    <div className="bg-white text-[#231815]">
      {/* Header: dark overlay with white text, same as the home hero (brand colour kept as the bottom line) */}
      <header className="relative overflow-hidden text-white bg-[#231815] min-h-[240px] sm:min-h-[280px] lg:min-h-[300px] flex" style={{ borderBottom: `4px solid ${brand.color}` }}>
        {/* Background video */}
        <CroppedVideo key={bgVideo} src={bgVideo} poster={bgPoster} />
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
          <nav className="flex items-center gap-2 text-sm text-white/90" aria-label="Breadcrumb">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/products" className="hover:underline">Products</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold">{brand.name}</span>
          </nav>

          <div className="mt-5">
            {/* Logo on a white box; same box size for every brand */}
            <div className="mb-4 inline-flex items-center justify-center bg-white rounded-md shadow-md w-32 sm:w-36 h-14 sm:h-16 px-3 py-2">
              <img
                src={brand.logo}
                alt={brand.name}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="no-zoom max-h-full max-w-full w-auto h-auto object-contain"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial leading-none">{brand.name}</h1>
            <p className="mt-2 text-base sm:text-lg font-semibold tracking-wide text-white/90">Private Limited</p>
          </div>
        </div>
      </header>

      {/* About: compact so it fits on one screen */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 grid lg:grid-cols-12 gap-5 lg:gap-8 items-center">
        <div className="lg:col-span-9">
          <h2 className="text-xl sm:text-2xl font-bold font-editorial" style={{ color: brand.colorDark }}>
            About {brand.name}
          </h2>
          <p className="mt-2 text-base leading-relaxed text-[#3D332E]">{detail?.intro ?? brand.fullDesc}</p>
        </div>
        <div className="lg:col-span-3">
          <div
            className="overflow-hidden rounded-2xl bg-white w-full max-w-xs lg:max-w-none"
            style={{ border: `1px solid ${brand.color}55`, borderBottom: `5px solid ${brand.color}` }}
          >
            <img
              src={brand.featuredImg}
              alt={`${brand.name} products`}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                // hide the whole frame if the file is missing so no empty gap is left
                const frame = e.currentTarget.parentElement;
                if (frame) frame.style.display = 'none';
              }}
              className="no-zoom w-full h-32 lg:h-36 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Catalogue products */}
      {products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
          <h2 className="text-3xl sm:text-4xl font-bold font-editorial">Featured {brand.name.split(' ')[0]} products</h2>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <article key={p.id} className="flex flex-col border border-[#F1D9CA] rounded-md overflow-hidden bg-white">
                <div className="h-52 sm:h-56 bg-[#FFFAF6] overflow-hidden shrink-0">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    className="no-zoom w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1 border-t-4" style={{ borderColor: brand.color }}>
                  <h3 className="font-bold leading-snug">{p.name}</h3>
                  <p className="mt-2 text-sm text-[#5F524C] leading-relaxed">{p.shortDesc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Industries using this brand */}
      {(BRAND_INDUSTRIES[brand.id]?.length ?? 0) > 0 && (
        <section className="border-t border-[#F1D9CA]" style={{ backgroundColor: brand.colorTint }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
            <h2 className="text-3xl sm:text-4xl font-bold font-editorial" style={{ color: brand.colorDark }}>
              Industries using {brand.name.split(' ')[0]}
            </h2>
            <div className="mt-5">
              <BrandIndustries brand={brand} />
            </div>
          </div>
        </section>
      )}

      {/* Other brands */}
      <section className="border-t border-[#F1D9CA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <span className="font-semibold">Other brands</span>
          {BRANDS_DATA.filter((b) => b.id !== brand.id).map((b) => (
            <Link key={b.id} to={`/products/${b.id}`} className="font-semibold hover:underline" style={{ color: b.colorDark }}>
              {b.name}
            </Link>
          ))}
          <button type="button" onClick={() => onGoToContact(brand.name)} className="ml-auto font-semibold text-[#D2430F] hover:underline cursor-pointer">
            Contact us about {brand.name.split(' ')[0]}
          </button>
        </div>
      </section>
    </div>
  );
};