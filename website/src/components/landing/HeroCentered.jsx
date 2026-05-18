import { Button } from "../ui/button";

export default function HeroCentered({
  title,
  subtitle,
  buttonText,
  buttonLink,
  image,
}) {
  return (
    <section className="flex flex-col items-center text-center gap-8 pt-12 md:pt-20 px-4">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight max-w-4xl">
        {title}
      </h1>

      {subtitle && (
        <p className="text-lg md:text-xl font-medium max-w-2xl text-gray-600">
          {subtitle}
        </p>
      )}

      {buttonText && buttonLink && (
        <Button className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-bold py-12 px-24 text-2xl rounded-lg shadow-sm transition-all hover:scale-105 active:scale-95">
          <a href={buttonLink}>{buttonText}</a>
        </Button>
      )}

      {image && (
        <div className="w-full max-w-5xl mt-8">
          <img src={image} alt="Image" className="w-full h-auto rounded-2xl" />
        </div>
      )}
    </section>
  );
}
