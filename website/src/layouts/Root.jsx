import useMetrika from "@/hooks/useMetrika";
import { Outlet } from "react-router-dom";

export default function Root() {
  // TODO: Подставить реальную метрику.
  useMetrika(107709357);

  console.log(window.ym);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Outlet />
    </div>
  );
}
