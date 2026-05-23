import { Button } from "../ui/button";

export default function HeroCentered({
  title,
  subtitle,
  buttonText,
  buttonLink,
  image,
}) {
  return (
    <section
      className="flex flex-col items-center text-center gap-10 pt-16 md:pt-24 px-4"
      data-reveal
    >
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] max-w-5xl tracking-tight">
        {title}
      </h1>

      {subtitle && (
        <p className="text-xl md:text-2xl font-medium max-w-3xl text-gray-600 leading-relaxed">
          {subtitle}
        </p>
      )}

      {buttonText && buttonLink && (
        <Button className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-bold py-10 px-20 text-xl md:text-2xl rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95 btn-glow mt-4">
          <a href={buttonLink}>{buttonText}</a>
        </Button>
      )}

      {image && (
        <div className="w-full max-w-6xl mt-12 glass-frame !p-3 shadow-2xl">
          <img src={image} alt="Image" className="w-full h-auto rounded-2xl shadow-xl" />
        </div>
      )}
    </section>
  );
}
