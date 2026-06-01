import { SEO } from "@/components/SEO";

export default function LandingLayout({ children, title, description }) {
  return (
    <>
      <SEO title={title} description={description} />
      <div className="w-full relative">
        {children}
      </div>
    </>
  );
}
