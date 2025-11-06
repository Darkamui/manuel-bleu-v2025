"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { ShippingInfo } from "../types";

interface UseOrderFormReturn {
  formMethods: ReturnType<typeof useForm<ShippingInfo>>;
  isFormLocked: boolean;
  hasSubmittedInfo: boolean;
  submitShippingInfo: (data: ShippingInfo) => void;
  resetForm: () => void;
}

/**
 * Custom hook for managing order form state and persistence
 */
export function useOrderForm(): UseOrderFormReturn {
  const [isFormLocked, setIsFormLocked] = useState(false);
  const [hasSubmittedInfo, setHasSubmittedInfo] = useState(false);

  const formMethods = useForm<ShippingInfo>({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      state: "",
      country: "France",
    },
  });

  const { setValue } = formMethods;

  // Load saved form data from cookies on mount
  useEffect(() => {
    const savedEmail = Cookies.get("email");

    if (savedEmail) {
      // If we have saved data, load it all
      setValue("name", Cookies.get("name") || "");
      setValue("email", savedEmail);
      setValue("address", Cookies.get("address") || "");
      setValue("city", Cookies.get("city") || "");
      setValue("postalCode", Cookies.get("postalCode") || "");
      setValue("state", Cookies.get("state") || "");
      setValue("country", Cookies.get("country") || "France");

      // Lock the form and mark as submitted
      setIsFormLocked(true);
      setHasSubmittedInfo(true);
    }
  }, [setValue]);

  // Submit and save shipping info
  const submitShippingInfo = (data: ShippingInfo) => {
    // Save all form data to cookies
    Cookies.set("name", data.name);
    Cookies.set("email", data.email);
    Cookies.set("address", data.address);
    Cookies.set("city", data.city);
    Cookies.set("postalCode", data.postalCode);
    Cookies.set("state", data.state);
    Cookies.set("country", data.country);

    // Lock form and mark as submitted
    setIsFormLocked(true);
    setHasSubmittedInfo(true);
  };

  // Reset form and clear all saved data
  const resetForm = () => {
    // Clear all cookies
    Cookies.remove("name");
    Cookies.remove("email");
    Cookies.remove("address");
    Cookies.remove("city");
    Cookies.remove("postalCode");
    Cookies.remove("state");
    Cookies.remove("country");

    // Reset form values
    setValue("name", "");
    setValue("email", "");
    setValue("address", "");
    setValue("city", "");
    setValue("postalCode", "");
    setValue("state", "");
    setValue("country", "France");

    // Unlock form
    setIsFormLocked(false);
    setHasSubmittedInfo(false);
  };

  return {
    formMethods,
    isFormLocked,
    hasSubmittedInfo,
    submitShippingInfo,
    resetForm,
  };
}
