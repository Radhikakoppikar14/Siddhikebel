/**
 * Page addresses (URLs). They follow the same format as the original live website
 * (https://siddhikabel.com/products_lapp.html, about_us.html, contact_us.html ...).
 * New pages that did not exist on the original site use the same "name.html" format.
 */
export const PATHS = {
  home: '/index.html',
  about: '/about_us.html',
  products: '/products.html',
  industries: '/industries.html',
  contact: '/contact_us.html',
  allied: '/allied.html',
  services: '/services.html',
  projects: '/projects.html',
} as const;

/** /products_lapp.html, /products_eaton.html, /products_partex.html, /products_mennekes.html */
export const brandPath = (brandId: string) => `/products_${brandId}.html`;

/** /services_lt-ht-cables.html, /services_mro-services.html ... */
export const servicePath = (slug: string) => `/services_${slug}.html`;