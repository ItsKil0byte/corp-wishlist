import BlogSkeleton from "@/components/BlogSkeleton";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useList } from "@/hooks/useBlog";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function BlogList() {
  // const response = useList();
  // console.log(response);

  const [page, setPage] = useState(0);
  const { data, loading, error } = useList(page, 5);

  console.log(data);

  const getContentPreview = (html) => {
    if (!html) {
      return "Описание отсутствует.";
    }
    return (
      html.replace(/<[^>]*>/g, "").slice(0, 150) +
      (html.length > 150 ? "..." : "")
    );
  };

  const getFormatDate = (date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Не удалось загрузить статьи...
        </h2>
        <p className="text-gray-600 max-w-md">{error}</p>
        <Button
          variant="outline"
          onClick={() => {
            setPage((p) => p);
          }}
          className="h-12"
        >
          Попробовать снова
        </Button>
      </div>
    );
  }

  return (
    <div>
      <SEO
        title="Блог"
        description="Статьи о выборе подарков для своих друзей и коллег."
      />

      <section className="space-y-8">
        <div className="flex flex-col items-start gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-main-theme transition-colors font-bold"
          >
            <ArrowLeft className="size-4" /> На главную
          </Link>

          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-4xl font-black text-gray-900">Блог</h1>

            {data && !loading && (
              <div className="flex items-center gap-4">
                <Button
                  disabled={page <= 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  className="bg-main-theme-lite hover:bg-main-theme-lite/80 text-main-theme font-bold gap-2 h-12 px-6 rounded-lg transition-colors disabled:opacity-50"
                >
                  <ArrowLeft className="size-4" /> Назад
                </Button>
                <span className="text-sm font-bold text-gray-400">
                  Стр. {page + 1}
                </span>
                <Button
                  disabled={data.length < 5}
                  onClick={() => setPage((p) => p + 1)}
                  className="bg-main-theme-lite hover:bg-main-theme-lite/80 text-main-theme font-bold gap-2 h-12 px-6 rounded-lg transition-colors disabled:opacity-50"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block h-full"
              >
                <Card className="h-full flex flex-col overflow-hidden rounded-lg border-2 border-gray-100 hover:shadow-md transition-shadow">
                  {post.preview_image && (
                    <div className="p-3 py-0">
                      <div className="aspect-video w-full overflow-hidden bg-gray-50 rounded-lg">
                        <img
                          src={post.preview_image}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  )}
                  <CardHeader className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                      <Calendar className="size-4" />
                      <time dateTime={post.published_at}>
                        {getFormatDate(post.published_at)}
                      </time>
                    </div>
                    <CardTitle className="line-clamp-2 text-xl font-bold group-hover:text-main-theme transition-colors leading-snug">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 pb-6">
                    <p className="text-gray-400 line-clamp-3 text-sm leading-relaxed">
                      {post.preview_content || getContentPreview(post.content)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
