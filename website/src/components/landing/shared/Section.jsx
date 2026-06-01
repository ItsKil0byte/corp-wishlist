export default function Section({ children, className = "", spacing = "medium" }) {
  const spacingStyles = {
    small: "py-12",
    medium: "py-20",
    large: "py-32",
  };

  return (
    <section className={`w-full max-w-[1440px] mx-auto px-6 md:px-12 ${spacingStyles[spacing]} ${className}`}>
      {children}
    </section>
  );
}
