import PostSkeleton from "@/components/PostSkeleton";
import { SEO } from "@/components/SEO";
import usePost from "@/hooks/useBlog";
import DOMPurify from "dompurify";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function BlogPost() {
  const { slug } = useParams();
  const { data, loading, error } = usePost(slug);

  console.log(data);

  const getDescription = (html) => {
    if (!html) {
      return "";
    }
    return html
      .replace(/<[^>]*>/g, "")
      .slice(0, 160)
      .trim();
  };

  const getFormatDate = (date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  if (loading) {
    return <PostSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Статья не найдена</h2>
        <p className="text-gray-600 max-w-md">
          {error || "Возможно, материал был удалён."}
        </p>
        <Link
          to="/blog"
          className="text-main-theme hover:underline flex items-center gap-2 font-medium"
        >
          <ArrowLeft className="size-4" /> Вернуться к списку статей
        </Link>
      </div>
    );
  }

  const cleanContent = DOMPurify.sanitize(data.content, {
    ALLOWED_TAGS: [
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "a",
      "img",
      "blockquote",
      "code",
      "pre",
      "br",
      "hr",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "figure",
      "figcaption",
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "class",
      "target",
      "rel",
      "width",
      "height",
    ],
  });

  return (
    <>
      <SEO
        title={data.title}
        description={getDescription(data.content)}
        image={data.preview_image}
        url={window.location.href}
      />
      <article className="max-w-4xl mx-auto space-y-8 pb-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-main-theme transition-colors font-medium"
        >
          <ArrowLeft className="size-4" /> Вернуться к блогу
        </Link>

        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="size-4" />
            <time datetime={data.published_at}>
              {getFormatDate(data.published_at)}
            </time>
          </div>
        </header>

        {data.preview_image && (
          <figure className="w-full aspect-video rounded-lg overflow-hidden bg-gray-50 shadow-sm">
            <img
              src={data.preview_image}
              alt={data.title}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </figure>
        )}

        <div
          dangerouslySetInnerHTML={{ __html: cleanContent }}
          className="prose prose-base md:prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-main-theme prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-blockquote:border-l-4 prose-blockquote:border-main-theme prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:italic"
        />
      </article>
    </>
  );
}
