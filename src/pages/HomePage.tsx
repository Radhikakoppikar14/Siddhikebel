import React from 'react';
import { BrandSelector } from '../components/BrandSelector';
import { Hero } from '../components/Hero';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { BrandServicesSection } from '../components/BrandServicesSection';
import { CaseStudiesSection } from '../components/CaseStudiesSection';
import { ClientsWall } from '../components/ClientsWall';
import { MotionReveal } from '../components/MotionReveal';


interface HomePageProps {
  onGoToContact: (productName?: string) => void;
  onSelectBrand: (brandId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGoToContact, onSelectBrand }) => {
  return (
    <div>
      {/* 1. Main slider */}
      <Hero onOpenRfq={() => onGoToContact()} />

      {/* 2. Key numbers + Why industry chooses Siddhi Kabel */}
      <MotionReveal direction="up" yOffset={50} duration={0.9}>
        <WhyChooseUs hideAbout onOpenRfq={onGoToContact} />
      </MotionReveal>

      {/* 3. Trusted brand partners + allied products & services */}
      <MotionReveal direction="up" yOffset={50} duration={0.9}>
        <BrandSelector onSelectBrand={onSelectBrand} onOpenRfq={onGoToContact} />
      </MotionReveal>

      {/* 4. Services for industries */}
      <MotionReveal direction="up" yOffset={50} duration={0.9}>
        <BrandServicesSection onOpenRfq={onGoToContact} />
      </MotionReveal>

      {/* 5. Recent projects and client logos */}
      <MotionReveal direction="right" yOffset={70} duration={0.9}>
        <CaseStudiesSection onOpenRfq={onGoToContact} />
      </MotionReveal>
      <MotionReveal direction="zoom" duration={0.9}>
        <ClientsWall />
      </MotionReveal>

    </div>
  );
};