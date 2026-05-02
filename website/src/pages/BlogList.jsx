import BlogSkeleton from "@/components/BlogSkeleton";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useList } from "@/hooks/useBlog";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function BlogList() {
  // const response = useList();
  // console.log(response);

  const [page, setPage] = useState(0);
  const { data, loading, error } = useList(page, 5);

  // console.log(data);

  const getContentPreview = (html) => {
    if (!html) {
      return "Описание отсутствует.";
    }
    return (
      html.replace(/<[^>]*>/g, "").slice(0, 150) +
      (html.length > 150 ? "..." : "")
    );
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
        <h1 className="text-4xl font-bold text-gray-900">Блог</h1>

        {loading ? (
          <BlogSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block h-full"
              >
                <Card className="h-full flex flex-col overflow-hidden border-gray-100 hover:shadow-lg transition-shadow">
                  {post.preview_image && (
                    <div className="aspect-video w-full overflow-hidden bg-gray-50">
                      <img
                        src={post.preview_image}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="size-4" />
                      <time dateTime={post.published_at}>
                        {post.published_at}
                      </time>
                    </div>
                    <CardTitle className="line-clamp-2 text-xl group-hover:text-main-theme transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
                      {post.preview_content || getContentPreview(post.content)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* TODO: Пагинация */}
      </section>
    </div>
  );
}
