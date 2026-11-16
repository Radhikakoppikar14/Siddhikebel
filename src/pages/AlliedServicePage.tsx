import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { ALLIED_SERVICES } from '../data/alliedServices';

interface AlliedServicePageProps {
  onOpenRfq: (subject?: string) => void;
}

export const AlliedServicePage: React.FC<AlliedServicePageProps> = ({ onOpenRfq }) => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [imageFailed, setImageFailed] = useState(false);

  const index = ALLIED_SERVICES.findIndex((s) => s.slug === serviceId);
  if (index === -1) return <Navigate to="/services" replace />;

  const service = ALLIED_SERVICES[index];
  const others = ALLIED_SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <div className="bg-[#FFFAF6] text-[#231815]">
      <PageHeader
        title={service.title}
        breadcrumb={service.title}
        category="Allied Products & Services"
        minimal
      />

      {/* Main content */}
      <section className="py-8 sm:py-12 border-b border-[#F1D9CA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Link
            to="/allied"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D2430F] hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All allied products &amp; services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-[#A8340A] px-3 py-1 rounded-full bg-[#FFF1E8] border border-[#F1D9CA]">
                  {service.tag}
                </span>
                <h2 className="mt-3 text-2xl sm:text-4xl font-editorial text-[#231815] leading-tight">
                  {service.subtitle}
                </h2>
                <p className="mt-3 text-base text-[#3D332E] leading-relaxed">{service.intro}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#A8340A] mb-3">
                  What we offer
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 rounded-xl border border-[#F1D9CA] bg-white px-4 py-3"
                    >
                      <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-[#D2430F] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-[#231815] leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#A8340A] mb-3">
                  Where it is used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.usedIn.map((u) => (
                    <span
                      key={u}
                      className="text-sm px-3 py-1.5 rounded-full bg-white border border-[#F1D9CA] text-[#231815]"
                    >
                      {u}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenRfq(service.title)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#D2430F] hover:bg-[#A8340A] rounded-full shadow-sm transition-colors cursor-pointer"
                >
                  Share your requirement
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#A8340A] border-2 border-[#D2430F] rounded-full hover:bg-[#FFF1E8] transition-colors"
                >
                  Contact us
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-[#F1D9CA] bg-[#FFF1E8] shadow-sm">
                {imageFailed ? (
                  <div className="h-64 sm:h-80 flex items-center justify-center text-center px-6 text-sm font-semibold text-[#A8340A]">
                    {service.title}
                  </div>
                ) : (
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    onError={() => setImageFailed(true)}
                    className="no-zoom w-full h-64 sm:h-80 lg:h-[420px] object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other allied services */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-editorial text-[#231815]">More allied services</h2>
          <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/services/${o.slug}`}
                className="group flex flex-col rounded-xl border border-[#F1D9CA] bg-white p-4 sm:p-5 hover:shadow-md hover:-translate-y-0.5 transition"
              >
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#A8340A]">{o.tag}</span>
                <span className="mt-1 text-sm sm:text-base font-semibold text-[#231815] leading-snug group-hover:text-[#D2430F] transition-colors">
                  {o.title}
                </span>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#D2430F]">
                  View details <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};