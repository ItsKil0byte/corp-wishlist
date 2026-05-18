import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";

export default function MainLanding() {
  return (
    <div className="w-full flex flex-col gap-16 md:gap-24">
      <Hero />
      <Features />
    </div>
  );
}
