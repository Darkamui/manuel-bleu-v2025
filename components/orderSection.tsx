"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useOrderForm } from "@/lib/hooks/useOrderForm";
import { useShippingCalculation } from "@/lib/hooks/useShippingCalculation";
import { OrderForm } from "./orderForm";
import { OrderSummary } from "./orderSummary";
import { ShippingInfo } from "@/lib/types";
import Cookies from "js-cookie";
import { getDictionary } from "@/get-dictionary";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function About(props: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  lang: "fr" | "en";
}) {
  const [, paypalDispatch] = usePayPalScriptReducer();

  const price = 9.9;
  const { dictionary } = props;

  // Use custom hooks
  const {
    formMethods,
    isFormLocked,
    hasSubmittedInfo,
    submitShippingInfo,
    resetForm,
  } = useOrderForm();

  const {
    shippingPrice,
    qty,
    setCountry,
    incrementQty,
    decrementQty,
    updateShippingPrice,
  } = useShippingCalculation();

  // Load PayPal script
  useEffect(() => {
    const loadPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/keys");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (paypalDispatch as any)({
        type: "resetOptions",
        value: {
          clientId,
          currency: "EUR",
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (paypalDispatch as any)({ type: "setLoadingStatus", value: "pending" });
    };
    loadPaypalScript();
  }, [paypalDispatch]);

  // Handle country change
  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    updateShippingPrice(newCountry, qty);
  };

  // Handle form submission
  const handleFormSubmit = (data: ShippingInfo) => {
    submitShippingInfo(data);
    updateShippingPrice(data.country, qty);
    toast.success(dictionary.confirmInfoToast);
  };

  // Handle reset
  const handleReset = () => {
    resetForm();
    Cookies.remove("qty");
    Cookies.remove("shippingPrice");
    Cookies.remove("country");
    toast.success(dictionary.resetInfoToast);
  };

  // Create order on PayPal
  async function createOrder(
    _data: unknown,
    actions: Record<string, unknown>
  ): Promise<string> {
    const orderActions = actions as {
      order: {
        create: (config: {
          purchase_units: Array<{ amount: { value: string } }>;
        }) => Promise<string>;
      };
    };
    return orderActions.order.create({
      purchase_units: [
        {
          amount: {
            value: (
              parseFloat((qty * price).toString()) +
              parseFloat(shippingPrice.toString())
            ).toFixed(2),
          },
        },
      ],
    });
  }

  // Once payment is approved on PayPal
  async function onApprove(_data: unknown, actions: Record<string, unknown>) {
    const captureActions = actions as {
      order: {
        capture: () => Promise<void>;
      };
    };
    return captureActions.order.capture().then(async function () {
      try {
        const formData = formMethods.getValues();
        const orderData = {
          name: formData.name,
          email: formData.email,
          price,
          shippingPrice: parseFloat(shippingPrice.toString()),
          adress: formData.address, // Keep 'adress' for API compatibility
          city: formData.city,
          postalCode: formData.postalCode,
          state: formData.state,
          country: formData.country,
          qty: parseInt(qty.toString()),
        };

        await axios.post("/api/email", orderData);

        handleReset();
        toast.success(dictionary.buyToast);
      } catch (error) {
        console.error("Error processing order:", error);
        toast.error(dictionary.errorToast);
      }
    });
  }

  // Error logger
  function onError(err: unknown) {
    console.log(err);
  }

  return (
    <div
      className="space-y-10 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 sm:p-12 shadow-xl animate-fade-in-up"
      id="orderSection"
    >
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-indigo-900">
          {dictionary.orderTitle}
        </h2>
        <p className="text-3xl font-bold text-blue-600">€9.90</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-6 animate-fade-in-up delay-200">
          <Card className="shadow-lg border-indigo-100">
            <CardContent className="p-6">
              <OrderForm
                formMethods={formMethods}
                isDisabled={isFormLocked}
                onSubmit={handleFormSubmit}
                onCountryChange={handleCountryChange}
                t={(key: string) =>
                  dictionary[key as keyof typeof dictionary] as string
                }
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 animate-fade-in-up delay-300">
          <OrderSummary
            qty={qty}
            price={price}
            shippingPrice={shippingPrice}
            isDisabled={isFormLocked}
            onIncrement={incrementQty}
            onDecrement={decrementQty}
            t={(key: string) =>
              dictionary[key as keyof typeof dictionary] as string
            }
          />

          <Button
            variant="outline"
            disabled={!isFormLocked}
            onClick={handleReset}
            className="w-full border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300"
            size="lg"
          >
            {dictionary.resetBtn}
          </Button>

          <div
            className={
              hasSubmittedInfo
                ? "opacity-100 transition-opacity duration-500"
                : "opacity-50 pointer-events-none transition-opacity duration-500"
            }
          >
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              disabled={!hasSubmittedInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
