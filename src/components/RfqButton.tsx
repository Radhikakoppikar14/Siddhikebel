import React from 'react';

/**
 * "Check our RFQ site" button.
 * Opens the RFQ site in a new tab when clicked.
 */
export const RFQ_SITE_URL = 'https://siddhikabelcorp-hdhr.vercel.app/';

interface RfqButtonProps {
  className?: string;
  onAfterClick?: () => void;
}

export const RfqButton: React.FC<RfqButtonProps> = ({ className = '', onAfterClick }) => {
  const handleClick = () => {
    if (RFQ_SITE_URL) window.open(RFQ_SITE_URL, '_blank', 'noopener,noreferrer');
    onAfterClick?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center whitespace-nowrap font-semibold cursor-pointer bg-[#D2430F] hover:bg-[#A8340A] text-white transition-colors ${className}`}
    >
      Check our RFQ site
    </button>
  );
};