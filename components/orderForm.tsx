"use client";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { ShippingInfo } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Register locale for countries
countries.registerLocale(enLocale);

interface OrderFormProps {
  formMethods: UseFormReturn<ShippingInfo>;
  isDisabled: boolean;
  onSubmit: (data: ShippingInfo) => void;
  onCountryChange: (country: string) => void;
  t: (key: string) => string;
}

export function OrderForm({
  formMethods,
  isDisabled,
  onSubmit,
  onCountryChange,
  t,
}: OrderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  // Get country options
  const countryObj = countries.getNames("en", { select: "official" });
  const countryArr = Object.entries(countryObj).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">{t("nameLabel")}</Label>
        <Input
          id="name"
          type="text"
          placeholder="John M. Doe"
          disabled={isDisabled}
          {...register("name", {
            required: "Veuillez entrer votre nom",
          })}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{String(errors.name.message)}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">{t("emailLabel")}</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          disabled={isDisabled}
          {...register("email", {
            required: "Veuillez entrer votre courriel",
            minLength: 4,
          })}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{String(errors.email.message)}</p>
        )}
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address">{t("adress")}</Label>
        <Input
          id="address"
          type="text"
          placeholder="542 W. 15th Street"
          disabled={isDisabled}
          {...register("address", {
            required: "Veuillez entrer votre adresse",
            minLength: 4,
          })}
        />
        {errors.address && (
          <p className="text-sm text-destructive">{String(errors.address.message)}</p>
        )}
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label htmlFor="city">{t("city")}</Label>
        <Input
          id="city"
          type="text"
          placeholder="New York"
          disabled={isDisabled}
          {...register("city", {
            required: "Veuillez entrer votre ville",
          })}
        />
        {errors.city && (
          <p className="text-sm text-destructive">{String(errors.city.message)}</p>
        )}
      </div>

      {/* State and Postal Code */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="state">{t("state")}</Label>
          <Input
            id="state"
            type="text"
            placeholder="NY"
            disabled={isDisabled}
            {...register("state")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">{t("postalCode")}</Label>
          <Input
            id="postalCode"
            type="text"
            placeholder="10001"
            disabled={isDisabled}
            {...register("postalCode", {
              required: "Veuillez entrer votre code postale",
            })}
          />
          {errors.postalCode && (
            <p className="text-sm text-destructive">
              {String(errors.postalCode.message)}
            </p>
          )}
        </div>
      </div>

      {/* Country */}
      <div className="space-y-2">
        <Label htmlFor="country">{t("country")}</Label>
        <select
          id="country"
          disabled={isDisabled}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          {...register("country", {
            required: "Veuillez entrer votre pays",
            onChange: (e) => onCountryChange(e.target.value),
          })}
        >
          {countryArr.map(({ label, value }) => (
            <option value={label} key={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="text-sm text-destructive">{String(errors.country.message)}</p>
        )}
      </div>

      {/* Info text */}
      <p className="text-xs text-muted-foreground">
        *Tarifs de livraisons différents pour la France et hors de la France.
        Tous les envois se font par suivi.
      </p>

      {/* Submit button */}
      <Button
        type="submit"
        disabled={isDisabled}
        className="w-full"
        size="lg"
      >
        {t("confirmBtn")}
      </Button>
    </form>
  );
}
