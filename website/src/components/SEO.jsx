import { Helmet } from "react-helmet-async";

export function SEO({ title, description, image, url }) {
  // TODO: Обговорить с Полиной что тут должно быть.
  const pageTitle = title
    ? `${title} | Корпоративный Вишлист`
    : "Корпоративный Вишлист";
  const pageDescription =
    description ||
    "Планируйте подарки, создавайте вишлисты вместе со своими коллегами!";
  const pageUrl = url || window.location.href;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={pageUrl} />

      <link rel="canonical" href={pageUrl} />
    </Helmet>
  );
}
