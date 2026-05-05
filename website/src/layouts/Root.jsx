import useMetrika from "@/hooks/useMetrika";
import { Outlet } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export default function Root() {
  // TODO: Подставить реальную метрику.
  useMetrika(107709357);

  console.log(window.ym);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
