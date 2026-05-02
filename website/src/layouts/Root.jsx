import useMetrika from "@/hooks/useMetrika";
import { Outlet } from "react-router-dom";

export default function Root() {
  // TODO: Подставить реальную метрику.
  useMetrika(107709357);

  console.log(window.ym);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
