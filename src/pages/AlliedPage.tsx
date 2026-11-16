import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { ALLIED_SERVICES } from '../data/alliedServices';

interface AlliedPageProps {
  onOpenRfq: (subject?: string) => void;
}

export const AlliedPage: React.FC<AlliedPageProps> = ({ onOpenRfq }) => {
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  return (
    <div className="bg-[#FFFAF6] text-[#231815]">
      <PageHeader
        title="Allied Products & Services"
        subtitle="Earthing, LED retrofits, LT & HT cables, MRO support and industrial electrical consumables, alongside our authorised brands."
        breadcrumb="Allied Products & Services"
        category="Allied Products & Services"
      />

      <section className="py-10 sm:py-14 border-b border-[#F1D9CA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {ALLIED_SERVICES.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#F1D9CA] bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <div className="h-44 bg-[#FFF1E8] overflow-hidden">
                  {failed[s.slug] ? (
                    <div className="h-full flex items-center justify-center px-6 text-center text-sm font-semibold text-[#A8340A]">
                      {s.title}
                    </div>
                  ) : (
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      decoding="async"
                      onError={() => setFailed((f) => ({ ...f, [s.slug]: true }))}
                      className="no-zoom w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#A8340A]">{s.tag}</span>
                  <h3 className="mt-1 text-lg font-semibold text-[#231815] leading-snug group-hover:text-[#D2430F] transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#5F524C] leading-relaxed line-clamp-3">{s.intro}</p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#D2430F]">
                    View details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => onOpenRfq()}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#D2430F] hover:bg-[#A8340A] rounded-full shadow-sm transition-colors cursor-pointer"
            >
              Share your requirement <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};