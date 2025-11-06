import { getDictionary } from "@/get-dictionary";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { Indie_Flower } from "next/font/google";
import { cn } from "@/lib/utils";

const indie = Indie_Flower({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HeroSection(props: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  lang: "fr" | "en";
}) {
  return (
    // Section container
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800">
      {/* Content outer container */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Content inner container */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content container */}
          <div className="flex justify-center animate-scale-in">
            <Image
              src="/bleu.webp"
              width={500}
              height={500}
              alt="Couvertue du livre manuel bleu"
              className="drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Right content container */}
          <div className="flex flex-col gap-8 justify-center text-white">
            {/* Language CTA */}
            <div className="flex justify-center animate-fade-in-down delay-100">
              {props.lang === "fr" ? (
                <Button
                  variant="secondary"
                  className="gap-2 rounded-full bg-white/95 backdrop-blur px-6 py-3 text-base font-medium text-gray-900 hover:bg-white shadow-lg hover:shadow-xl transition-all"
                  asChild
                >
                  <Link href="/en" className="flex items-center gap-2">
                    <span className="text-xl mb-1 leading-none">🇬🇧</span>
                    <span className="leading-none">English</span>
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="gap-2 rounded-full bg-white/95 backdrop-blur px-6 py-3 text-base font-medium text-gray-900 hover:bg-white shadow-lg hover:shadow-xl transition-all"
                  asChild
                >
                  <Link href="/fr" className="flex items-center gap-2">
                    <span className="text-xl mb-1 leading-none">🇫🇷</span>
                    <span className="leading-none">Français</span>
                  </Link>
                </Button>
              )}
            </div>

            {/* Title */}
            <h1
              className={cn(
                "text-center text-balance text-4xl md:text-5xl font-semibold animate-fade-in-up delay-200 drop-shadow-lg",
                indie.className
              )}
            >
              {props.dictionary.h1}
            </h1>

            {/* Text */}
            <div className="space-y-4 text-lg text-left leading-relaxed text-indigo-50 md:text-xl">
              <p className="animate-fade-in-up delay-300">
                {props.dictionary.headerText}
              </p>
              <p className="animate-fade-in-up delay-400">
                {props.dictionary.headerText1}
              </p>
              <p className="animate-fade-in-up delay-500">
                {props.dictionary.headerText2}
              </p>
            </div>

            {/* CTA container */}
            <div className="flex flex-col gap-4 sm:flex-row justify-center animate-fade-in-up delay-600">
              <Button
                size="lg"
                className="rounded-full bg-blue-500 px-8 py-6 text-lg font-medium text-white hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                asChild
              >
                <Link
                  href={
                    props.lang === "fr" ? "/manuel-fr.pdf" : "/manuel-en.pdf"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {props.dictionary.headerBtn}
                </Link>
              </Button>
              {/* {props.lang === "fr" && (
                <Button
                  size="lg"
                  className="rounded-full bg-blue-900 px-8 py-6 text-lg font-medium text-white hover:bg-blue-950 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  asChild
                >
                  <Link href="#orderSection">
                    {props.dictionary.buyBtn}
                  </Link>
                </Button>
              )} */}
            </div>
          </div>
        </div>
      </div>
      {/* Wave container */}
      <div className="absolute bottom-0 left-0 right-0 animate-fade-in">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="rgba(255,255,255,1)"
          />
        </svg>
      </div>
    </section>
  );
}
