import { Helmet } from "react-helmet-async";

export function SEO({ title, description, image, url }) {
  const pageTitle = title
    ? `${title} | GiftToYou`
    : "GiftToYou - бесплатный сервис для выбора подарков";
  const pageDescription =
    description ||
    "Бесплатный сервис, который помогает быстро и просто выбирать подарки! Создавайте вишлисты и делитесь ими с друзьями.";
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
