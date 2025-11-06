import { ShippingPriceParams, ShippingPriceResult } from "./types";

/**
 * Shipping price tiers for France
 */
const FRANCE_SHIPPING_PRICES: Record<number, number> = {
  1: 4.5,
  2: 6.5,
  3: 6.5,
  4: 7.75,
  5: 7.75,
  6: 7.75,
  7: 9.35,
  8: 9.35,
  9: 9.35,
  10: 9.35,
};

/**
 * Shipping price tiers for international (non-France)
 */
const INTERNATIONAL_SHIPPING_PRICES: Record<number, number> = {
  1: 11.5,
  2: 13.75,
  3: 13.75,
  4: 26.3,
  5: 26.3,
  6: 26.3,
  7: 26.3,
  8: 26.3,
  9: 26.3,
  10: 26.3,
};

/**
 * Default shipping price (for France, 1 item)
 */
export const DEFAULT_SHIPPING_PRICE = 4.5;

/**
 * Calculate shipping price based on country and quantity
 *
 * @param params - Object containing country and quantity
 * @returns Shipping price and whether it's France
 */
export function calculateShippingPrice({
  country,
  qty,
}: ShippingPriceParams): ShippingPriceResult {
  // Normalize country name for comparison
  const isFrance = country.toLowerCase() === "france";

  // Ensure quantity is within valid range (1-10)
  const validQty = Math.max(1, Math.min(10, qty));

  // Get the appropriate price table
  const priceTable = isFrance
    ? FRANCE_SHIPPING_PRICES
    : INTERNATIONAL_SHIPPING_PRICES;

  // Get price for the quantity (with fallback to default)
  const price = priceTable[validQty] ?? DEFAULT_SHIPPING_PRICE;

  return {
    price,
    isFrance,
  };
}

/**
 * Get shipping price for a specific country and quantity
 *
 * @param country - Country name
 * @param qty - Quantity of items
 * @returns Shipping price in euros
 */
export function getShippingPrice(country: string, qty: number): number {
  return calculateShippingPrice({ country, qty }).price;
}
