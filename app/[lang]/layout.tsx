import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "../globals.css";
import { i18n, type Locale } from "@/i18n-config";
import { Analytics } from "@/components/analytics";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600"],
  variable: "--font-titillium",
});

export const metadata: Metadata = {
  title: "Manuel Bleu | Raphaël Jerusalmy",
  description: "Le manuel bleu contre l'antisémtisme et la désinformation",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
  }>
) {
  const params = await props.params;
  const { children } = props;
  const lang = params.lang as Locale;
  return (
    <html lang={lang}>
      <body className={`${titillium.variable} antialiased`}>{children}</body>
      <Analytics />
    </html>
  );
}
