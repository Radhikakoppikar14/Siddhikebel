import { useEffect } from 'react';

/**
 * Section-to-section scrolling for mouse wheels and trackpads.
 * One scroll gesture moves straight to the next (or previous) section and lands
 * just below the sticky header. Sections taller than the screen scroll normally
 * until their bottom edge is in view, so nothing is skipped. Sections shorter than the
 * screen are centred so the whole section is visible after each jump. Modals, scrollable
 * boxes, form fields, touch screens and "reduce motion" users keep normal scrolling.
 */
const SETTLE_MS = 800;   // time the page is given to finish a jump
const GESTURE_GAP_MS = 150; // quiet time that marks the start of a new gesture
const MIN_DELTA = 4;     // ignore tiny wheel noise

const headerHeight = () => {
  const h = document.querySelector('header') as HTMLElement | null;
  return h ? h.getBoundingClientRect().height : 0;
};

const getTargets = (): HTMLElement[] => {
  const list = Array.from(document.querySelectorAll<HTMLElement>('main section')).filter(
    (s) => !s.parentElement?.closest('section') && s.offsetHeight > 0,
  );
  const footer = document.querySelector('footer') as HTMLElement | null;
  if (footer) list.push(footer);
  return list;
};

const insideScrollable = (el: HTMLElement | null): boolean => {
  while (el && el !== document.body) {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return true;
    const oy = getComputedStyle(el).overflowY;
    if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 1) return true;
    el = el.parentElement;
  }
  return false;
};

export const SectionScroll = () => {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lockedUntil = 0;
    let lastWheel = 0;
    let consumed = false;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey || reduceMotion.matches) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const target = e.target as HTMLElement | null;
      if (document.body.style.overflow === 'hidden') return; // a modal is open
      if (target?.closest('[class*="fixed"], [role="dialog"]')) return; // modal / popup layers
      if (insideScrollable(target)) return;

      const now = performance.now();
      if (now - lastWheel > GESTURE_GAP_MS) consumed = false; // new gesture
      lastWheel = now;

      // Rest of a gesture that already caused a jump: swallow it so the page doesn't drift.
      if (consumed || now < lockedUntil) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) < MIN_DELTA) return;

      const down = e.deltaY > 0;
      const offset = headerHeight();
      const y = window.scrollY;
      const vh = window.innerHeight;
      const maxY = Math.max(0, document.documentElement.scrollHeight - vh);
      const avail = vh - offset; // visible height below the sticky header
      // Where to stop for each section: short sections are centred so the WHOLE
      // section is visible; tall sections stop at their top edge.
      const tops = getTargets().map((el) => {
        const r = el.getBoundingClientRect();
        const top = r.top + y - offset;
        const h = r.height;
        const snap = h < avail ? top - (avail - h) / 2 : top;
        return {
          top: Math.min(maxY, Math.max(0, Math.round(snap))),
          bottom: r.bottom + y,
        };
      });
      if (tops.length === 0) return;

      let idx = 0;
      tops.forEach((t, i) => { if (t.top <= y + 5) idx = i; });
      const cur = tops[idx];

      let dest: number | null = null;
      if (down) {
        // current section still extends below the screen: let it scroll normally
        if (cur.bottom > y + vh + 5) return;
        if (idx + 1 < tops.length) dest = tops[idx + 1].top;
      } else if (y - cur.top > 5) {
        // inside a section: a tall one scrolls normally until the top is within one screen
        if (y - cur.top > vh) return;
        dest = cur.top;
      } else if (idx > 0) {
        dest = tops[idx - 1].top;
      }

      if (dest === null || Math.abs(dest - y) < 4) return;

      e.preventDefault();
      consumed = true;
      lockedUntil = now + SETTLE_MS;
      window.scrollTo({ top: dest, behavior: 'smooth' });
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  return null;
};