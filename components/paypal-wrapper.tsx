"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import About from "./about-section";
import { getDictionary } from "@/get-dictionary";

interface PayPalWrapperProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  lang: "fr" | "en";
}

export function PayPalWrapper({ dictionary, lang }: PayPalWrapperProps) {
  return (
    <PayPalScriptProvider
      deferLoading={true}
      options={{
        clientId: "test",
        currency: "EUR",
      }}
    >
      <About dictionary={dictionary} lang={lang} />
    </PayPalScriptProvider>
  );
}
