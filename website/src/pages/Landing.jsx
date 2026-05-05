import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";

export default function Landing() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <main className="w-full max-w-7xl flex flex-col gap-16 md:gap-24 px-6">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
