import BlogSkeleton from "@/components/BlogSkeleton";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useList } from "@/hooks/useBlog";
import { API_URL } from "@/lib/constants";
import { formatDate, stripHtml } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [page, setPage] = useState(0);
  const { data, loading, error } = useList(page, 6, "BLOG");

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-red-500 shadow-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-gray-900">
          Не удалось загрузить статьи
        </h2>
        <p className="text-gray-500 max-w-md font-medium">{error}</p>
        <Button
          variant="outline"
          onClick={() => setPage(0)}
          className="h-14 px-8 border-2"
        >
          Попробовать снова
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto py-12 px-4 md:px-8">
      <SEO
        title="Блог | GiftoYou"
        description="Статьи о выборе подарков для друзей и коллег."
      />

      <section className="space-y-12">
        <div className="flex flex-col gap-6">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-main-theme transition-all font-bold"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />{" "}
            На главную
          </Link>

          <div className="w-full flex flex-col sm:flex-row justify-between items-end gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
                Блог
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
                Полезные советы и идеи для идеальных праздников
              </p>
            </div>

            {data && !loading && (
              <div className="flex items-center gap-4 bg-white dark:bg-gray-900 p-2 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <Button
                  variant="ghost"
                  disabled={page <= 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  className="text-main-theme font-bold gap-2 h-11 px-4 rounded-xl disabled:opacity-30 hover:bg-main-theme/10"
                >
                  <ArrowLeft className="size-4" /> Назад
                </Button>
                <span className="text-sm font-black text-gray-900 dark:text-gray-100 px-2 min-w-[4rem] text-center">
                  {page + 1}
                </span>
                <Button
                  variant="ghost"
                  disabled={data.length < 6}
                  onClick={() => setPage((p) => p + 1)}
                  className="text-main-theme font-bold gap-2 h-11 px-4 rounded-xl disabled:opacity-30 hover:bg-main-theme/10"
                >
                  Далее <ArrowRight className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <BlogSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {data?.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                state={{ from: "/blog" }}
                className="group h-full"
                data-reveal
                data-reveal-delay={index % 3}
              >
                <Card className="h-full flex flex-col rounded-[2.5rem] bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 overflow-hidden border-none">
                  {post.preview_image && (
                    <div className="p-4">
                      <div className="aspect-[16/10] w-full overflow-hidden rounded-[1.8rem] bg-gray-50 dark:bg-gray-800 relative">
                        <img
                          src={`${API_URL}${post.preview_image}`}
                          alt={post.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  )}
                  <div className="px-8 pt-2 pb-10 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-main-theme font-black uppercase tracking-widest mb-4">
                      <Calendar className="size-3.5" />
                      <time dateTime={post.published_at}>
                        {formatDate(post.published_at)}
                      </time>
                    </div>
                    <h3 className="line-clamp-2 text-2xl font-black text-gray-900 dark:text-white group-hover:text-main-theme transition-colors leading-tight mb-4">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 line-clamp-3 text-base leading-relaxed font-medium mb-6">
                      {post.preview_content ||
                        stripHtml(post.content, 120) ||
                        "Описание отсутствует."}
                    </p>

                    <div className="mt-auto flex items-center text-main-theme font-black text-sm uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                      Читать статью <ArrowRight className="size-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
