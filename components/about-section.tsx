"use client";
import { getDictionary } from "@/get-dictionary";
import Image from "next/image";
import OrderSection from "./orderSection";

export default function About(props: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  lang: "fr" | "en";
}) {
  const { dictionary, lang } = props;

  return (
    <section className="bg-gradient-to-b from-white via-indigo-50/30 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-20">
        {/* Author Section */}
        <div className="space-y-6 animate-fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl text-indigo-900">
            Raphaël Jerusalmy
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4 leading-relaxed">
            <p className="animate-fade-in-up delay-100">
              {dictionary.aboutText}
            </p>
            <p className="animate-fade-in-up delay-200">
              {dictionary.aboutText1}
            </p>
            <p className="animate-fade-in-up delay-300">
              {dictionary.aboutText2}
            </p>
            <p className="animate-fade-in-up delay-400">
              {dictionary.aboutText3}
            </p>
          </div>
          <div className="flex justify-center animate-fade-in-up delay-500">
            <a
              href="https://raphaeljerusalmy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              {dictionary.redirect}
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl animate-scale-in">
          <Image
            src="/sexpist.jpg"
            alt="Raphaël Jerusalmy"
            fill
            className="object-contain hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>

        {/* Share Section */}
        <div className="space-y-6 animate-fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl text-indigo-900">
            {dictionary.h2}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4 leading-relaxed">
            <p className="animate-fade-in-up delay-100">
              {dictionary.shareText}
            </p>
            <p className="animate-fade-in-up delay-200">
              {dictionary.shareText1}
            </p>
            <p className="animate-fade-in-up delay-300">
              {dictionary.institut}
            </p>
          </div>
        </div>

        {/* Order Section (French only) */}
        {/* {lang === "fr" && <OrderSection dictionary={dictionary} lang={lang} />} */}

        {/* Contact Section */}
        <div className="space-y-6 text-center animate-fade-in-up bg-indigo-900 text-white rounded-3xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Contact
          </h2>
          <div className="prose prose-lg max-w-none space-y-4 text-indigo-100">
            <p>{dictionary.contact}</p>
            <p>
              {dictionary.contact1}
              <a
                className="text-blue-300 hover:text-blue-200 hover:underline font-medium transition-colors"
                href="mailto:david.reinharc@gmail.com"
              >
                david.reinharc@gmail.com
              </a>
            </p>
            <p className="text-sm text-indigo-200 pt-4 border-t border-indigo-700/50">
              {dictionary.footer}{" "}
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 hover:underline font-medium transition-colors pointer-events-none"
              >
                J-Web
              </a>
              . {dictionary.footerRights} © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
