import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ContactSection } from '../components/ContactSection';

export const ContactPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Contact"
        breadcrumb="Contact-us"
        category="Siddhi Kabel LTD."
        subtitle=""
        bgVideo="/assets/videos/demoo1.mp4"
        bgImage="/assets/videos/demoo1-poster.jpg"
      />

      {/* Exact Head Office Details & Send Message Form */}
      <ContactSection />
    </div>
  );
};