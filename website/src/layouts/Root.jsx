import useMetrika from "@/hooks/useMetrika";
import useScrollReveal from "@/hooks/useScrollReveal";
import { Outlet } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import GradientBlobs from "@/components/landing/GradientBlobs";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "react-hot-toast";

export default function Root() {
  useMetrika(107709357);
  useScrollReveal();

  return (
    // Контейнер для всего сайта
    <div className="min-h-screen flex flex-col relative">
      <ScrollToTop />

      {/* Всплывающие уведомления */}
      <Toaster position="bottom-center" containerStyle={{ zIndex: 999 }} />

      {/* Градиентные блобы */}
      <GradientBlobs />

      {/* Шапка сайта */}
      <Header />

      {/* Основное содержимое сайта */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <Outlet />
      </main>

      {/* Подвал сайта */}
      <Footer />
    </div>
  );
}
