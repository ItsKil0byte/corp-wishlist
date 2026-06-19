import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Хук для отправки событий в Яндекс.Метрику при смене маршрута
 * @param {number|string} id - ID счетчика Яндекс.Метрики
 */
export default function useMetrika(id) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.ym) {
      window.ym(id, "hit", pathname, {
        referer: document.referrer,
        title: document.title,
        debug: true,
      });
    }
  }, [pathname, id]);
}
