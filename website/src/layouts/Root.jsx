import Features from "@/components/landing/Features";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <Hero />
        <Features />
        <Stats />
      </main>

      <footer className="border-t-2 border-gray-100 py-6 text-center text-sm text-gray-500">
        Сделано с любовью студентами ИИТ
      </footer>
    </div>
  );
}
