import React from 'react';
import { Link } from 'react-router-dom';
import { BrandInfo } from '../data/siddhiData';
import { getIndustriesForBrand } from '../data/industries';

/**
 * "Where this brand is used": one image card per industry, coloured with the brand's own colour.
 */
export const BrandIndustries: React.FC<{ brand: BrandInfo; compact?: boolean }> = ({ brand, compact }) => {
  const industries = getIndustriesForBrand(brand.id);
  if (industries.length === 0) return null;

  return (
    <ul className="divide-y border rounded-md bg-white overflow-hidden" style={{ borderColor: `${brand.color}55` }}>
      {industries.map((ind) => (
        <li key={ind.name}>
          <Link
            to="/industries"
            className="group flex items-center gap-3 px-3 py-2 border-l-4 transition-colors hover:bg-[#FFF8F3]"
            style={{ borderLeftColor: brand.color }}
          >
            <img
              src={ind.image}
              alt={ind.name}
              loading="lazy"
              decoding="async"
              className="w-12 h-12 rounded object-cover shrink-0 bg-[#FFF1E8]"
            />
            <h4 className="text-sm font-semibold leading-snug" style={{ color: brand.colorDark }}>
              {ind.name}
            </h4>
          </Link>
        </li>
      ))}
    </ul>
  );
};