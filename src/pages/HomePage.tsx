import React from 'react';
import { BrandSelector } from '../components/BrandSelector';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Hero } from '../components/Hero';
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

      {/* 2. About: Built on experience. Focused on your application. */}
      <MotionReveal direction="up" yOffset={50} duration={0.9}>
        <WhyChooseUs onOpenRfq={onGoToContact} />
      </MotionReveal>

      {/* 4. Trusted brand partners + allied products & services */}
      <MotionReveal direction="up" yOffset={50} duration={0.9}>
        <BrandSelector onSelectBrand={onSelectBrand} onOpenRfq={onGoToContact} />
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