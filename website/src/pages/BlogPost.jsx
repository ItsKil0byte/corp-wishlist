import PostSkeleton from "@/components/PostSkeleton";
import { SEO } from "@/components/SEO";
import usePost from "@/hooks/useBlog";
import { formatDate, stripHtml } from "@/lib/utils";
import DOMPurify from "dompurify";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function BlogPost() {
  const { slug } = useParams();
  const { data, loading, error } = usePost(slug);

  if (loading) return <PostSkeleton />;

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">
          Статья не найдена
        </h2>
        <p className="text-gray-500 max-w-md font-medium">
          {error || "Возможно, материал был удалён или ссылка неверна."}
        </p>
        <Link to="/blog">
          <button className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2">
            <ArrowLeft className="size-5" /> Вернуться в блог
          </button>
        </Link>
      </div>
    );
  }

  const getSanitizedContent = (html) => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        "b",
        "i",
        "em",
        "strong",
        "a",
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
        "img",
        "br",
        "span",
        "div",
        "figure",
        "figcaption",
        "hr",
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "style", "target"],
    });
  };

  return (
    <>
      <SEO
        title={`${data.title} | Блог GiftoYou`}
        description={stripHtml(data.content, 160)}
        image={data.preview_image}
        url={window.location.href}
      />
      <article className="max-w-[1440px] mx-auto py-12 px-4 md:px-8 pb-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-main-theme transition-all font-bold"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />{" "}
            Вернуться к блогу
          </Link>

          <header className="space-y-8" data-reveal>
            <div className="flex items-center gap-3 text-xs text-main-theme font-black uppercase tracking-[0.2em]">
              <Calendar className="size-4" />
              <time dateTime={data.published_at}>
                {formatDate(data.published_at)}
              </time>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
              {data.title}
            </h1>
            <div className="h-1.5 w-24 bg-main-theme rounded-full" />
          </header>

          <div
            className="
              prose prose-neutral prose-lg lg:prose-xl dark:prose-invert max-w-none
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:font-medium
              prose-headings:font-black prose-headings:tracking-tight prose-headings:text-gray-900
              prose-img:w-full prose-img:h-auto prose-img:object-cover prose-img:rounded-[2.5rem] prose-img:shadow-2xl prose-img:my-16
              prose-li:marker:text-main-theme prose-li:font-medium
              prose-a:text-main-theme prose-a:no-underline hover:prose-a:underline
              prose-hr:border-gray-100 prose-hr:my-16
            "
            data-reveal
            data-reveal-delay="2"
            dangerouslySetInnerHTML={{
              __html: getSanitizedContent(data.content),
            }}
          />
        </div>
      </article>
    </>
  );
}
