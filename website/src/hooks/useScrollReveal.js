import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Отслеживает элементы с атрибутом `data-reveal` и добавляет им класс `.revealed`,
 * когда они попадают в область видимости, запуская анимацию появления.
 *
 * @param {Object} options
 * @param {string} options.rootMargin - Отступы для IntersectionObserver
 * @param {number} options.threshold - Порог срабатывания IntersectionObserver
 */
export default function useScrollReveal({
  rootMargin = "0px 0px -60px 0px",
  threshold = 0.1,
} = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Небольшая задержка, чтобы DOM успел обновиться после смены маршрута
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll("[data-reveal]");
      if (!elements.length) return;

      // Учитываем предпочтения пользователя по ограничению анимаций
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
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
        { rootMargin, threshold },
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, rootMargin, threshold]);
}
