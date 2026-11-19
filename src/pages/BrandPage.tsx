import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams, useLocation } from 'react-router-dom';
import { ChevronRight, Package } from 'lucide-react';
import { BRANDS_DATA, PRODUCTS_CATALOG, ProductItem } from '../data/siddhiData';
import { BRAND_DETAILS } from '../data/brandDetails';
import { CroppedVideo } from '../components/CroppedVideo';
import { BrandIndustries } from '../components/BrandIndustries';
import { BRAND_INDUSTRIES } from '../data/industries';
import { brandPath } from '../data/paths';

/** Product photo. If there is no photo yet (or the file is missing) a clean brand-tinted panel is shown instead of a broken image. */
const ProductImage: React.FC<{ product: ProductItem; color: string; tint: string; dark: string }> = ({ product, color, tint, dark }) => {
  const [failed, setFailed] = useState(false);
  if (!product.image || failed) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 text-center"
        style={{ backgroundColor: tint }}
      >
        <Package className="w-10 h-10" style={{ color }} strokeWidth={1.5} />
        <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: dark }}>
          {product.category}
        </span>
      </div>
    );
  }
  return (
    <img
      src={product.image}
      alt={product.name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="no-zoom w-full h-full object-contain p-2"
    />
  );
};

interface BrandPageProps {
  onOpenSpecs: (product: ProductItem) => void;
  onGoToContact: (subject?: string) => void;
  /** Set by the /products_<brand>.html routes */
  brandId?: string;
}

export const BrandPage: React.FC<BrandPageProps> = ({ onGoToContact, brandId: brandIdProp }) => {
  const params = useParams<{ brandId: string }>();
  const brandId = brandIdProp ?? params.brandId;
  const { hash } = useLocation();

  // Category links such as /products/eaton#eaton-mccb scroll to that product once the page has loaded
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
    return () => window.clearTimeout(t);
  }, [hash, brandId]);

  const brand = BRANDS_DATA.find((b) => b.id === brandId);
  if (!brand) return <Navigate to="/products.html" replace />;

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
            <Link to="/index.html" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/products.html" className="hover:underline">Products</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold">{brand.name}</span>
          </nav>

          <div className="mt-5">
            {/* Logo on a white box; same box size for every brand */}
            <div className="mb-4 inline-flex items-center justify-center bg-white rounded-md shadow-md w-44 sm:w-56 h-20 sm:h-28 px-3 py-2">
              <img
                src={brand.logo}
                alt={brand.name}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="no-zoom max-h-full max-w-full w-auto h-auto object-contain"
              />
            </div>
            {/* Logo only: brand name kept as a visually hidden heading for screen readers / SEO */}
            <h1 className="sr-only">{brand.name}</h1>
          </div>
        </div>
      </header>

      {/* About: compact so it fits on one screen */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 grid lg:grid-cols-12 gap-5 lg:gap-8 items-center">
        <div className="lg:col-span-9">
          <h2 className="text-xl sm:text-2xl font-bold font-editorial" style={{ color: brand.colorDark }}>
            About {brand.name}
          </h2>
          {(detail?.intro ?? brand.fullDesc).split('\n\n').map((para, i) => (
            <p key={i} className="mt-2 text-base leading-relaxed text-[#3D332E]">{para}</p>
          ))}
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
              className="no-zoom w-full h-32 lg:h-36 object-contain bg-white"
            />
          </div>
        </div>
      </section>

      {/* Catalogue products */}
      {products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
          <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[#231815]">Featured {brand.name.split(' ')[0]} products</h2>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <article key={p.id} id={p.id} className="flex flex-col border border-[#F1D9CA] rounded-md overflow-hidden bg-white scroll-mt-28">
                <div className="h-52 sm:h-56 bg-white overflow-hidden shrink-0">
                  <ProductImage product={p} color={brand.color} tint={brand.colorTint} dark={brand.colorDark} />
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
            <Link key={b.id} to={brandPath(b.id)} className="font-semibold hover:underline" style={{ color: b.colorDark }}>
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