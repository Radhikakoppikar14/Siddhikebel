import { RfqButton } from './RfqButton';
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { COMPANY_INFO, BRANDS_DATA } from '../data/siddhiData';
import { motion, AnimatePresence } from 'framer-motion';

/* Desktop nav link: slim underline that grows on hover and slides to the active page */
const DesktopNavLink: React.FC<{ to: string; children: React.ReactNode; end?: boolean }> = ({ to, children, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `relative group whitespace-nowrap px-3 xl:px-4 py-2 text-sm transition-colors duration-200 ${
        isActive ? 'text-[#D2430F] font-semibold' : 'text-[#231815]/75 hover:text-[#231815]'
      }`
    }
  >
    {({ isActive }) => (
      <>
        <span className="relative z-10">{children}</span>
        <span className="absolute left-3 right-3 xl:left-4 xl:right-4 bottom-0.5 h-0.5 rounded-full origin-left bg-[#231815]/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
        {isActive && (
          <motion.span
            layoutId="nav-active-underline"
            className="absolute left-3 right-3 xl:left-4 xl:right-4 bottom-0.5 h-0.5 rounded-full bg-[#D2430F]"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </>
    )}
  </NavLink>
);

const MOBILE_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products Catalog' },
  { to: '/industries', label: 'Industries We Cater' },
  { to: '/about', label: 'About us' },
  { to: '/contact', label: 'Contact Us' },
];

interface NavbarProps {
  onOpenContactModal?: (item?: string) => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContactModal, onReplayIntro }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Utility Top Bar - Soft Brown (#5F524C) with Warm Beige (#F1D9CA) & Cream White (#FFFAF6) */}
      <div className="bg-[#5F6670] text-white/90 text-xs py-2 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-[11px] sm:text-xs">
          {/* Left: Social Icons, then Tagline */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="hidden sm:flex items-center gap-2.5 text-white/75 border-r border-white/25 pr-3 shrink-0">
              <a
                href={COMPANY_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7v-3h3V9.5C10 6.46 11.82 5 14.5 5c1.28 0 2.4.1 2.4.1v2.7h-1.35c-1.46 0-1.92.91-1.92 1.85V12h3.15l-.5 3h-2.65v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>
              <a
                href={COMPANY_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-3.37-4-3.11-4 0v5.6h-3v-11h3v1.77c1.4-2.59 7-2.78 7 2.47v6.76z" />
                </svg>
              </a>
            </div>
            <span className="flex items-center gap-2 font-normal text-white/90 truncate max-w-[220px] sm:max-w-xs md:max-w-md lg:max-w-none"><span className="w-1.5 h-1.5 rounded-full bg-[#F08A4B] shrink-0" />
              {COMPANY_INFO.tagline}
            </span>
          </div>

          {/* Right: Phone & Email Contacts */}
          <div className="flex items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs text-white/90 shrink-0">
            <a
              href="tel:09620000947"
              className="flex items-center gap-1 sm:gap-1.5 hover:text-white transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-white/80" />
              <span className="font-medium font-mono text-white">096200 00947</span>
            </a>
            <span className="text-white/80 hidden sm:inline" aria-hidden="true">·</span>
            <a
              href="mailto:info@siddhikabel.com"
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap"
            >
              <Mail className="w-3 h-3 text-white/80" />
              <span>info@siddhikabel.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header - floating rounded island instead of a full-width bar */}
      <header className="sticky top-0 z-40 px-1 sm:px-2 pt-3 pb-2 bg-[#FFFAF6] pointer-events-none">
        <div
          className={`pointer-events-auto relative max-w-[calc(80rem-1rem)] mx-auto rounded-3xl lg:rounded-full border border-[#F1D9CA] bg-white transition-shadow duration-300 ${
            isScrolled ? 'shadow-lg shadow-[#D2430F]/10' : 'shadow-md shadow-[#231815]/5'
          }`}
        >
          <div
            className={`flex items-center justify-between gap-6 px-3 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] transition-all duration-300 ${
              isScrolled ? 'py-2' : 'py-3'
            }`}
          >
            {/* Brand Logo */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center justify-self-start shrink-0 group"
              title="Siddhi Kabel - Home"
            >
              <img
                src="/images/logo.png"
                alt="Siddhi Kabel Corporation Private Limited"
                className="h-8 sm:h-10 lg:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Navigation (desktop): Home, Industries, Products, About us, Contact */}
            <nav className="hidden lg:flex items-center justify-center gap-2 font-medium text-[#231815]">
              <DesktopNavLink to="/" end>Home</DesktopNavLink>

              {/* Products - opens a full-width mega menu */}
              <div
                className="relative"
                onMouseEnter={() => setProductsDropdownOpen(true)}
                onMouseLeave={() => setProductsDropdownOpen(false)}
              >
                <DesktopNavLink to="/products">
                  <span className="inline-flex items-center gap-1.5">
                    <span>Products</span>
                    <motion.span
                      animate={{ rotate: productsDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-[10px] text-[#D2430F] inline-block"
                    >
                      ▾
                    </motion.span>
                  </span>
                </DesktopNavLink>

                <AnimatePresence>
                  {productsDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50 w-[min(440px,calc(100vw-2rem))]"
                    >
                      <div className="bg-white shadow-2xl rounded-2xl border border-stone-100 p-3">
                        {/* Catalog link at the top */}
                        <Link
                          to="/products"
                          className="mb-3 flex items-center justify-between px-3 pb-3 border-b border-stone-100 text-xs font-semibold text-[#231815] hover:text-[#D2430F] transition-colors"
                        >
                          All Products Catalog
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>

                        {/* 2 x 2 tiles for the 4 brands below */}
                        <div className="grid grid-cols-2 gap-2.5">
                          {BRANDS_DATA.map((brand, i) => (
                            <motion.div
                              key={brand.id}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.04 * i + 0.04, duration: 0.25 }}
                            >
                              <Link
                                to={`/products/${brand.id}`}
                                className="group/tile relative flex h-28 flex-col justify-between rounded-xl p-3 border border-transparent hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
                                style={{ backgroundColor: brand.colorTint }}
                              >
                                <span className="h-9 w-20 rounded-lg bg-white flex items-center justify-center p-1.5 shadow-sm">
                                  <img src={brand.logo} alt="" className="max-h-full max-w-full object-contain" />
                                </span>
                                <span className="flex items-end justify-between gap-2">
                                  <span className="text-[13px] font-semibold leading-tight" style={{ color: brand.colorDark }}>
                                    {brand.name}
                                  </span>
                                  <ArrowUpRight
                                    className="w-4 h-4 shrink-0 opacity-0 -translate-x-1 group-hover/tile:opacity-100 group-hover/tile:translate-x-0 transition-all duration-200"
                                    style={{ color: brand.colorDark }}
                                  />
                                </span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <DesktopNavLink to="/industries">Industries</DesktopNavLink>
              <DesktopNavLink to="/about">About us</DesktopNavLink>
            </nav>

            {/* Desktop Action Button */}
            <div className="hidden lg:flex items-center justify-self-end gap-3 shrink-0">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `inline-flex items-center justify-center whitespace-nowrap px-5 py-2.5 text-sm font-semibold rounded-full text-[#D2430F] border border-[#D2430F]/30 transition-colors ${
                    isActive ? 'bg-[#FFD7C2]' : 'bg-[#FFE7D8] hover:bg-[#FFD7C2]'
                  }`
                }
              >
                Contact Us
              </NavLink>
              <RfqButton className="px-5 py-2.5 text-sm rounded-full border border-transparent" />
            </div>

            {/* Mobile & Tablet Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-[#231815] bg-[#FFF4EC] hover:bg-[#FFE7D8] rounded-full transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                <motion.span
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="block"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.span>
              </button>
            </div>
          </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden border-t border-[#F1D9CA] px-5 py-5 overflow-hidden"
            >
              <nav className="flex flex-col gap-2 text-sm font-medium text-[#231815]">
                {MOBILE_LINKS.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.05, duration: 0.3, ease: 'easeOut' }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block py-2.5 border-b border-[#F1D9CA]/60 transition-all duration-200 hover:pl-2 hover:text-[#5F524C] ${
                          isActive ? 'text-[#D2430F] font-semibold pl-2 border-l-2 border-l-[#D2430F]' : ''
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}

                {/* Mobile Action Buttons */}
                <div className="pt-4 space-y-2.5">
                  <RfqButton onAfterClick={() => setMobileMenuOpen(false)} className="w-full py-3 text-sm rounded-full" />

                  {onOpenContactModal && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenContactModal('Mobile Inquiry');
                      }}
                      className="w-full py-2.5 text-xs font-medium uppercase tracking-wider text-[#5F524C] bg-[#FFF1E8] border border-[#F1D9CA] hover:bg-[#F1D9CA] rounded-xl text-center cursor-pointer"
                    >
                      Instant Contact Popup
                    </button>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </header>
    </>
  );
};