import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Observes elements with `data-reveal` attribute and adds `.revealed` class
 * when they enter the viewport, triggering a smooth fade-in-up animation.
 *
 * @param {Object} options
 * @param {string} options.rootMargin - IntersectionObserver rootMargin
 * @param {number} options.threshold - IntersectionObserver threshold
 */
export default function useScrollReveal({
  rootMargin = "0px 0px -60px 0px",
  threshold = 0.1,
} = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small delay to ensure DOM is updated after route change
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll("[data-reveal]");
      if (!elements.length) return;

      // Respect user preference for reduced motion
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        elements.forEach((el) => el.classList.add("revealed"));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin, threshold }
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, rootMargin, threshold]);
}
