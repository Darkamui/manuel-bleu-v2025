// Type definitions for the application

export interface ShippingInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}

export interface OrderData extends ShippingInfo {
  qty: number;
  price: number;
  shippingPrice: number;
}

export interface ShippingPriceParams {
  country: string;
  qty: number;
}

export interface ShippingPriceResult {
  price: number;
  isFrance: boolean;
}
