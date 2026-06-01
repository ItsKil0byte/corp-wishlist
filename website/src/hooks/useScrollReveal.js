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
  threshold = 0.01,
} = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Учитываем предпочтения пользователя по ограничению анимаций
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;

            if (prefersReducedMotion) {
              el.classList.add("revealed");
              observer.unobserve(el);
              return;
            }

            const delay = el.getAttribute("data-reveal-delay") || "0";

            setTimeout(
              () => {
                el.classList.add("revealed");
              },
              parseInt(delay) * 150,
            );

            observer.unobserve(el);
          }
        });
      },
      { rootMargin, threshold },
    );

    const observeElements = () => {
      const elements = document.querySelectorAll(
        "[data-reveal]:not(.revealed)",
      );
      elements.forEach((el) => observer.observe(el));
    };

    // Начальный запуск с небольшой задержкой для плавности
    const timeoutId = setTimeout(observeElements, 100);

    // Следим за изменениями DOM для динамически подгружаемого контента (например, посты в блоге)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname, rootMargin, threshold]);
}
