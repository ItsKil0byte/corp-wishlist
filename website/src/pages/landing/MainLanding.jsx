import Features from "@/components/landing/Features";
import Reviews from "@/components/landing/Reviews";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import FAQSection from "@/components/landing/FAQSection";
import LandingLayout from "@/layouts/LandingLayout";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";
import Section from "@/components/landing/shared/Section";
import GradientTitle from "@/components/landing/shared/GradientTitle";
import NextLanding from "@/components/landing/NextLanding";

/**
 * Главная страница лендинга
 */
export default function MainLanding() {
  return (
    <LandingLayout
      title="GiftoYou — вишлисты, которыми приятно делиться"
      description="Бесплатный сервис для организации вишлистов и подарков."
    >
      <div className="w-full flex flex-col pb-24">
        <Hero />
        <Stats />
        <Features />
        <Reviews />
        <FAQSection />

        <Section
          spacing="large"
          className="flex flex-col items-center text-center gap-12"
          data-reveal
        >
          <GradientTitle as="h2" size="hero" title="Начните прямо сейчас" />
          <Button
            asChild
            className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-black py-8 md:py-10 px-10 md:px-16 rounded-2xl text-2xl md:text-xl shadow-xl transition-all hover:scale-105 active:scale-95 btn-glow w-full sm:w-auto"
          >
            <a href={APP_URL}>Начать бесплатно</a>
          </Button>
        </Section>

        <NextLanding
          title="Организуете подарок в офисе?"
          description="Попробуйте наши инструменты для групп: собирайте идеи, обсуждайте и выбирайте лучшие подарки вместе с коллегами."
          buttonText="Узнать про группы"
          link="/for-groups"
        />
      </div>
    </LandingLayout>
  );
}
