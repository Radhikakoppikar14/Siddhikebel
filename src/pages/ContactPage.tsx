import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ContactSection } from '../components/ContactSection';

export const ContactPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Contact"
        breadcrumb="Contact us"
        category="Siddhi Kabel Corporation Private Limited"
        subtitle=""
        minimal
        bgImage="/images/contact-banner.webp"
        overlay={false}
      />

      {/* Exact Head Office Details & Send Message Form */}
      <ContactSection />
    </div>
  );
};