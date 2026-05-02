import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Не  знаю насколько правда, взято из нейронки + ответов с интернета
// Есть отдельная библиотека, но пока хз надо нам её подключать или нет.

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
