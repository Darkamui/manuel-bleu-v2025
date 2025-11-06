import HeroSection from "@/components/hero-section";
import { PayPalWrapper } from "@/components/paypal-wrapper";
import { getDictionary } from "@/get-dictionary";
import { type Locale } from "@/i18n-config";

export default async function Home(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang);
  return (
    <main>
      <HeroSection dictionary={dictionary} lang={lang} />
      <PayPalWrapper dictionary={dictionary} lang={lang} />
    </main>
  );
}
