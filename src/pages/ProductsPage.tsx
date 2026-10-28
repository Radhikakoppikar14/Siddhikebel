import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { BrandServicesSection } from '../components/BrandServicesSection';
import { ProductItem } from '../data/siddhiData';

interface ProductsPageProps {
  selectedBrandId: string;
  onSelectBrand: (brandId: string) => void;
  onOpenSpecs: (product: ProductItem) => void;
  onGoToContact: (productName?: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onGoToContact }) => {
  return (
    <div>
      <PageHeader
        title="Products"
        breadcrumb="Products"
        category="Siddhi Kabel LTD."
        bgVideo="/assets/videos/demoo1.mp4"
        bgImage="/assets/videos/demoo1-poster.jpg"
      />

      <BrandServicesSection onOpenRfq={onGoToContact} />
    </div>
  );
};