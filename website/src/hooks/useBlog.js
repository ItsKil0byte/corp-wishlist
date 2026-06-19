import { BlogService } from "@/services/BlogService";
import { useEffect, useState } from "react";

export function useList(page = 0, limit = 10, category = "") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);

    BlogService.getBlogList(page, limit, category)
      .then((response) => {
        if (isMounted) {
          setData(response);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(
            error.response?.data?.message ||
              error.message ||
              "Ошибка загрузки!",
          );
        }
      })
      .finally(() => {
        isMounted = false;
        setLoading(false);
      });
  }, [page, limit, category]);

  return { data, loading, error };
}

export default function usePost(slug) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      return;
    }

    let isMounted = true;

    setLoading(true);

    BlogService.getBlogPost(slug)
      .then((response) => {
        if (isMounted) {
          setData(response);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(
            error.response?.data?.status === 404
              ? "Статья не найдена!"
              : error.message,
          );
        }
      })
      .finally(() => {
        isMounted = false;
        setLoading(false);
      });
  }, [slug]);

  return { data, loading, error };
}
