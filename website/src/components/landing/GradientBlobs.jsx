export default function GradientBlobs() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Бирюзовый */}
      <div
        className="blob blob-1"
        style={{
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(4,201,168,0.6) 0%, transparent 70%)",
          top: "-10%",
          left: "-10%",
        }}
      />

      {/* Синий */}
      <div
        className="blob blob-2"
        style={{
          width: "650px",
          height: "650px",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.5) 0%, transparent 70%)",
          top: "15%",
          right: "-10%",
        }}
      />

      {/* Бирюзовый — небольшой */}
      <div
        className="blob blob-3"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(4,201,168,0.4) 0%, transparent 70%)",
          bottom: "0%",
          left: "5%",
        }}
      />

      {/* Синий - небольшой */}
      <div
        className="blob blob-4"
        style={{
          width: "550px",
          height: "550px",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.3) 0%, transparent 70%)",
          bottom: "15%",
          right: "5%",
        }}
      />
    </div>
  );
}
