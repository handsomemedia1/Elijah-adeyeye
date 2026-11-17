import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Inertia scrolling on desktop. Skipped for touch screens (native scrolling feels better there)
 * and for people who ask for reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touchOnly = window.matchMedia('(pointer: coarse)').matches;
    if (reducedMotion || touchOnly) return undefined;

    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), autoRaf: true });
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}

/** Jumps to the top on route changes, without animating through the old page. */
// eslint-disable-next-line react-refresh/only-export-components
export function scrollToTop() {
  if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
}
