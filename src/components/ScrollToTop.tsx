/**
 * Section-to-section "snap" scrolling has been removed at the client's request:
 * the page now scrolls natively (smooth and continuous) instead of jumping a whole
 * section per mouse-wheel gesture. Component kept as a no-op so existing imports still work.
 */
export const SectionScroll = () => null;