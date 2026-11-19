import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollToTop } from './components/ScrollToTop';
import { SectionScroll } from './components/SectionScroll';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { ContactModal } from './components/ContactModal';
import { FloatingArrow } from './components/FloatingArrow';
import { IntroSplash } from './components/IntroSplash';
import { LiveEffects } from './components/LiveEffects';

// The Exact Pages from the Original Website
import { HomePage } from './pages/HomePage';
// Home loads right away; every other page is downloaded only when it is opened
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const BrandPage = lazy(() => import('./pages/BrandPage').then((m) => ({ default: m.BrandPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage').then((m) => ({ default: m.IndustriesPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const AlliedPage = lazy(() => import('./pages/AlliedPage').then((m) => ({ default: m.AlliedPage })));
const AlliedServicePage = lazy(() => import('./pages/AlliedServicePage').then((m) => ({ default: m.AlliedServicePage })));

import { ProductItem, BRANDS_DATA } from './data/siddhiData';
import { ALLIED_SERVICES } from './data/alliedServices';
import { PATHS, brandPath, servicePath } from './data/paths';

// Old clean addresses (/products/lapp, /services/lt-ht-cables) now go to the .html address, keeping any #section
const LegacyBrandRedirect: React.FC = () => {
  const { brandId = '' } = useParams<{ brandId: string }>();
  const { hash } = useLocation();
  return <Navigate to={brandPath(brandId) + hash} replace />;
};
const LegacyServiceRedirect: React.FC = () => {
  const { serviceId = '' } = useParams<{ serviceId: string }>();
  return <Navigate to={servicePath(serviceId)} replace />;
};

// Warm the browser cache so brand logos and the video thumbnail appear instantly
if (typeof window !== 'undefined') {
  BRANDS_DATA.forEach((b) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = b.logo;
  });
  const thumb = new Image();
  thumb.src = 'https://i.ytimg.com/vi/e3a0qpri5NA/maxresdefault.jpg';
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(true);
  const [selectedBrandId, setSelectedBrandId] = useState<string>('lapp');
  const [activeProductForSpecs, setActiveProductForSpecs] = useState<ProductItem | null>(null);

  // Global Contact Modal Popup state per user requirement
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [prefilledContactItem, setPrefilledContactItem] = useState<string>('');

  const handleOpenContactModal = (itemName?: string) => {
    setPrefilledContactItem(itemName || '');
    setContactModalOpen(true);
  };

  // Direct page navigation fallback if needed
  const handleGoToContact = (productName?: string) => {
    handleOpenContactModal(productName);
  };

  const handleSelectBrand = (brandId: string) => {
    setSelectedBrandId(brandId);
  };

  const handleOpenSpecs = (product: ProductItem) => {
    setActiveProductForSpecs(product);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFAF6] text-[#231815] relative">
      {/* Starting Logo Intro Splash Reveal (as requested) */}
      {showIntro && <IntroSplash onFinish={() => setShowIntro(false)} />}

      {/* Global live effects: scroll progress, cursor glow, scroll reveals, button shine + ripple */}
      <LiveEffects />

      {/* Top Navbar */}
      <Navbar onOpenContactModal={handleOpenContactModal} onReplayIntro={() => setShowIntro(true)} />

      {/* Dedicated Page Routes with Smooth Page-Entrance Animations */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <Suspense fallback={<div className="min-h-[60vh]" />}>
            <Routes location={location} key={location.pathname}>
              <Route
                path={PATHS.home}
                element={
                  <HomePage
                    onGoToContact={handleOpenContactModal}
                    onSelectBrand={handleSelectBrand}
                  />
                }
              />
              {/* Page addresses follow the original live site: about_us.html, products_lapp.html, contact_us.html ... */}
              <Route path={PATHS.about} element={<AboutPage onGoToContact={handleOpenContactModal} />} />

              <Route
                path={PATHS.products}
                element={
                  <ProductsPage
                    selectedBrandId={selectedBrandId}
                    onSelectBrand={handleSelectBrand}
                    onOpenSpecs={handleOpenSpecs}
                    onGoToContact={handleOpenContactModal}
                  />
                }
              />

              {/* /products_lapp.html, /products_eaton.html, /products_partex.html, /products_mennekes.html */}
              {BRANDS_DATA.map((b) => (
                <Route
                  key={b.id}
                  path={brandPath(b.id)}
                  element={<BrandPage brandId={b.id} onOpenSpecs={handleOpenSpecs} onGoToContact={handleOpenContactModal} />}
                />
              ))}

              <Route path={PATHS.industries} element={<IndustriesPage />} />
              <Route path={PATHS.contact} element={<ContactPage />} />
              <Route path={PATHS.services} element={<ServicesPage onOpenRfq={handleOpenContactModal} />} />
              <Route path={PATHS.allied} element={<AlliedPage onOpenRfq={handleOpenContactModal} />} />

              {/* /services_lt-ht-cables.html, /services_mro-services.html ... */}
              {ALLIED_SERVICES.map((svc) => (
                <Route
                  key={svc.slug}
                  path={servicePath(svc.slug)}
                  element={<AlliedServicePage serviceId={svc.slug} onOpenRfq={handleOpenContactModal} />}
                />
              ))}

              <Route path={PATHS.projects} element={<ProjectsPage onOpenRfq={handleOpenContactModal} />} />

              {/* Old clean addresses (from the earlier Vercel build) go to the .html address */}
              <Route path="/about" element={<Navigate to={PATHS.about} replace />} />
              <Route path="/products" element={<Navigate to={PATHS.products} replace />} />
              <Route path="/products/:brandId" element={<LegacyBrandRedirect />} />
              <Route path="/industries" element={<Navigate to={PATHS.industries} replace />} />
              <Route path="/contact" element={<Navigate to={PATHS.contact} replace />} />
              <Route path="/services" element={<Navigate to={PATHS.services} replace />} />
              <Route path="/allied" element={<Navigate to={PATHS.allied} replace />} />
              <Route path="/services/:serviceId" element={<LegacyServiceRedirect />} />
              <Route path="/projects" element={<Navigate to={PATHS.projects} replace />} />

              {/* Home page address is index.html, same as the original live site; "/" goes there */}
              <Route path="/" element={<Navigate to={PATHS.home} replace />} />

              {/* RFQ site / products on offer: left as before for now (goes to Home) */}
              <Route path="/products-on-offer" element={<Navigate to={PATHS.home} replace />} />
              <Route path="/products-on-offer.html" element={<Navigate to={PATHS.home} replace />} />
              <Route path="/offers" element={<Navigate to={PATHS.home} replace />} />

              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to={PATHS.home} replace />} />
            </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onOpenContactModal={handleOpenContactModal} />

      {/* Floating Animated Back to Top Object */}
      <FloatingArrow />

      {/* Technical Specifications Sheet (inquiry opens Contact Modal) */}
      <ProductModal
        product={activeProductForSpecs}
        onClose={() => setActiveProductForSpecs(null)}
        onGoToContact={handleOpenContactModal}
      />

      {/* Contact Page Popup Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        prefilledItem={prefilledContactItem}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SectionScroll />
      <AppContent />
    </BrowserRouter>
  );
}