export default function AppImage({ src, alt, className = "" }) {
  return (
    <div className={`glass-frame !p-3 shadow-2xl ${className}`}>
      <img src={src} alt={alt} className="rounded-2xl w-full" />
    </div>
  );
}
