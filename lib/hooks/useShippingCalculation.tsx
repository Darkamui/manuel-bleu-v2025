"use client";
import { useState, useEffect } from "react";
import { getShippingPrice, DEFAULT_SHIPPING_PRICE } from "../shipping";
import Cookies from "js-cookie";

interface UseShippingCalculationProps {
  initialCountry?: string;
  initialQty?: number;
}

interface UseShippingCalculationReturn {
  shippingPrice: number;
  qty: number;
  country: string;
  setCountry: (country: string) => void;
  setQty: (qty: number) => void;
  incrementQty: () => void;
  decrementQty: () => void;
  updateShippingPrice: (newCountry: string, newQty: number) => void;
}

/**
 * Custom hook for managing shipping calculations and quantity
 */
export function useShippingCalculation({
  initialCountry = "France",
  initialQty = 1,
}: UseShippingCalculationProps = {}): UseShippingCalculationReturn {
  const [qty, setQtyState] = useState(initialQty);
  const [country, setCountryState] = useState(initialCountry);
  const [shippingPrice, setShippingPrice] = useState(DEFAULT_SHIPPING_PRICE);

  // Calculate and update shipping price
  const updateShippingPrice = (newCountry: string, newQty: number) => {
    const price = getShippingPrice(newCountry, newQty);
    setShippingPrice(price);
    Cookies.set("shippingPrice", price.toString());
  };

  // Set quantity with validation and cookie update
  const setQty = (newQty: number) => {
    const validQty = Math.max(1, Math.min(10, newQty));
    setQtyState(validQty);
    Cookies.set("qty", validQty.toString());
    updateShippingPrice(country, validQty);
  };

  // Set country and update shipping
  const setCountry = (newCountry: string) => {
    setCountryState(newCountry);
    Cookies.set("country", newCountry);
    updateShippingPrice(newCountry, qty);
  };

  // Increment quantity (max 10)
  const incrementQty = () => {
    if (qty < 10) {
      setQty(qty + 1);
    }
  };

  // Decrement quantity (min 1)
  const decrementQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  // Initialize from cookies on mount
  useEffect(() => {
    const savedQty = Cookies.get("qty");
    const savedCountry = Cookies.get("country");
    const savedShippingPrice = Cookies.get("shippingPrice");

    const qtyValue = savedQty ? parseInt(savedQty) : initialQty;
    const countryValue = savedCountry || initialCountry;

    setQtyState(qtyValue);
    setCountryState(countryValue);

    if (savedShippingPrice) {
      setShippingPrice(parseFloat(savedShippingPrice));
    } else {
      updateShippingPrice(countryValue, qtyValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    shippingPrice,
    qty,
    country,
    setCountry,
    setQty,
    incrementQty,
    decrementQty,
    updateShippingPrice,
  };
}
