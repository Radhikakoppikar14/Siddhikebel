import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { MotionReveal } from '../components/MotionReveal';
import { SERVED_INDUSTRIES } from '../data/industries';
import { IndustryCard } from '../components/IndustryCard';

export const IndustriesPage: React.FC = () => {
  return (
    <div className="bg-[#FFFAF6] text-[#231815]">
      <PageHeader
        title="Industries"
        breadcrumb="Industries"
        category="Siddhi Kabel LTD."
        bgVideo="/assets/videos/demoo1.mp4"
        bgImage="/assets/videos/demoo1-poster.jpg"
      />

      <section className="pt-6 pb-10 sm:pt-8 sm:pb-12 bg-[#FFFAF6] border-b border-[#F1D9CA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <MotionReveal yOffset={20} duration={0.5}>
            <div className="max-w-3xl mb-8 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-normal text-[#231815] font-editorial">
                Industries
              </h2>
              <p className="text-sm sm:text-base text-[#5F524C] leading-relaxed">
                Products and support for the industries we serve.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVED_INDUSTRIES.map((industry) => (
                <IndustryCard key={industry.name} industry={industry} />
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>
    </div>
  );
};