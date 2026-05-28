import { Gift } from "lucide-react";

/**
 * Декоративный компонент с плавающими иконками для фона.
 */
export default function FloatingDecor() {
  const icons = [
    { top: "10%", left: "5%", delay: "0s", size: 24, rotate: "15deg" },
    { top: "20%", right: "10%", delay: "2s", size: 32, rotate: "-10deg" },
    { bottom: "15%", left: "12%", delay: "4s", size: 28, rotate: "20deg" },
    { bottom: "10%", right: "8%", delay: "1s", size: 36, rotate: "-15deg" },
    { top: "50%", left: "2%", delay: "3s", size: 20, rotate: "5deg" },
    { top: "45%", right: "3%", delay: "5s", size: 22, rotate: "-25deg" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-20 dark:opacity-10">
      {icons.map((icon, i) => (
        <div
          key={i}
          className="absolute transition-all duration-1000"
          style={{
            top: icon.top,
            left: icon.left,
            right: icon.right,
            bottom: icon.bottom,
            animation: `float-slow 6s ease-in-out infinite alternate ${icon.delay}`,
            transform: `rotate(${icon.rotate})`,
          }}
        >
          <Gift
            size={icon.size}
            className="text-main-theme stroke-[1.5]"
          />
        </div>
      ))}
      <style>
        {`
          @keyframes float-slow {
            from { transform: translateY(0) rotate(0); }
            to { transform: translateY(-20px) rotate(10deg); }
          }
        `}
      </style>
    </div>
  );
}
