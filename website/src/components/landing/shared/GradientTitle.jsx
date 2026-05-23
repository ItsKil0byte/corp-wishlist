export default function GradientTitle({ title, subtitle, gradientPart, as: Component = "h2", size = "default", className = "" }) {
  const sizes = {
    default: "text-4xl md:text-6xl",
    hero: "text-5xl md:text-7xl",
  };

  const Heading = Component;

  return (
    <div className={`space-y-4 ${className}`}>
      <Heading className={`${sizes[size]} font-black text-gray-900 tracking-tight leading-[1.1]`}>
        {title}
        {gradientPart && <span className="gradient-text block mt-2">{gradientPart}</span>}
      </Heading>
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
