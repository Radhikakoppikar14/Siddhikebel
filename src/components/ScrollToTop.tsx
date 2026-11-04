import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Every time the route changes, the new page opens at its very start.
 * Runs immediately, again after the page transition finishes, and ignores
 * smooth-scroll so the jump to the top is instant.
 */
const toTop = () => {
  const root = document.documentElement;
  const prev = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  root.scrollTop = 0;
  document.body.scrollTop = 0;
  root.style.scrollBehavior = prev;
};

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);

  useLayoutEffect(() => {
    if (hash) return; // in-page anchor (e.g. /#brands): let the browser scroll to it
    toTop();
    const t1 = window.setTimeout(toTop, 60);
    const t2 = window.setTimeout(toTop, 350); // after the page transition (~0.3s)
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname, hash]);

  return null;
};