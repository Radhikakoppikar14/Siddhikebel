import React from 'react';
import { Link } from 'react-router-dom';

/** Plain "Contact Us" button that opens the Contact page. */
interface ContactButtonProps {
  className?: string;
  onAfterClick?: () => void;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ className = '', onAfterClick }) => (
  <Link
    to="/contact"
    onClick={onAfterClick}
    className={`inline-flex items-center justify-center whitespace-nowrap font-semibold cursor-pointer bg-[#D2430F] hover:bg-[#A8340A] text-white transition-colors ${className}`}
  >
    Contact Us
  </Link>
);