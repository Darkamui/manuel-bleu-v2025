"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface OrderSummaryProps {
  qty: number;
  price: number;
  shippingPrice: number;
  isDisabled: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
  t: (key: string) => string;
}

export function OrderSummary({
  qty,
  price,
  shippingPrice,
  isDisabled,
  onIncrement,
  onDecrement,
}: OrderSummaryProps) {
  const totalPrice = parseFloat((qty * price + shippingPrice).toFixed(2));

  return (
    <Card className="bg-white shadow-lg border-indigo-100">
      <CardContent className="p-6">
        {/* Quantity selector */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onDecrement}
            disabled={isDisabled || qty <= 1}
            className="h-10 w-10 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center w-20 h-10 border-2 border-indigo-200 rounded-md bg-indigo-50">
            <span className="text-lg font-semibold text-indigo-900">{qty}</span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onIncrement}
            disabled={isDisabled || qty >= 10}
            className="h-10 w-10 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Price breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Nb de copies</span>
            <span className="font-medium text-gray-900">x{qty}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Prix unitaire</span>
            <span className="font-medium text-gray-900">€{price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Livraison</span>
            <span className="font-medium text-gray-900">€{shippingPrice.toFixed(2)}</span>
          </div>
          <div className="border-t-2 border-indigo-100 pt-3 flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              €{totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
