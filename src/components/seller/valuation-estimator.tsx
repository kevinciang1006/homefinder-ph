"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ValuationEstimate } from "@/types";
import { formatFullPHP } from "@/lib/format";
import { PH_CITIES, PROPERTY_TYPES } from "@/lib/constants";

const schema = z.object({
  type: z.enum(["condo", "house-and-lot", "townhouse", "lot"]),
  city: z.enum([
    "Makati",
    "Taguig",
    "Pasig",
    "Mandaluyong",
    "Quezon City",
    "Pasay",
    "Manila",
    "Alabang",
    "Paranaque",
  ]),
  floorAreaSqm: z.coerce.number().positive("Enter a valid area"),
  bedrooms: z.coerce.number().int().min(0),
});

type FormValues = z.infer<typeof schema>;

export function ValuationEstimator() {
  const [estimate, setEstimate] = useState<ValuationEstimate | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: { type: "condo", city: "Makati", bedrooms: 2 },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/seller/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await res.json()) as ValuationEstimate;
      setEstimate(result);
    } finally {
      setLoading(false);
    }
  };

  const rangePercent =
    estimate
      ? ((estimate.estimated - estimate.low) / (estimate.high - estimate.low)) * 100
      : 50;

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-4 font-semibold">Instant Valuation Estimator</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>Property Type</Label>
            <Select
              defaultValue="condo"
              onValueChange={(v) =>
                setValue("type", v as "condo" | "house-and-lot" | "townhouse" | "lot")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>City</Label>
            <Select
              defaultValue="Makati"
              onValueChange={(v) =>
                setValue(
                  "city",
                  v as
                    | "Makati"
                    | "Taguig"
                    | "Pasig"
                    | "Mandaluyong"
                    | "Quezon City"
                    | "Pasay"
                    | "Manila"
                    | "Alabang"
                    | "Paranaque"
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PH_CITIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>Floor Area (sqm)</Label>
            <Input
              type="number"
              {...register("floorAreaSqm")}
              placeholder="75"
              min={1}
            />
            {errors.floorAreaSqm && (
              <p className="text-xs text-destructive">{errors.floorAreaSqm.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label>Bedrooms</Label>
            <Input type="number" {...register("bedrooms")} min={0} placeholder="2" />
          </div>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Calculating…" : "Get Estimate"}
        </Button>
      </form>

      {estimate && (
        <div className="mt-6 rounded-lg bg-primary/5 p-4">
          <p className="mb-1 text-sm text-muted-foreground">Estimated Value</p>
          <p className="text-3xl font-bold text-primary">
            {formatFullPHP(estimate.estimated)}
          </p>
          <div className="mt-3 space-y-1">
            <div className="relative h-3 w-full rounded-full bg-secondary">
              <div
                className="absolute left-0 top-0 h-3 rounded-full bg-primary/30"
                style={{ width: "100%" }}
              />
              <div
                className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-primary bg-white shadow"
                style={{ left: `calc(${rangePercent}% - 10px)` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low: {formatFullPHP(estimate.low)}</span>
              <span>High: {formatFullPHP(estimate.high)}</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Based on {estimate.comparableCount} comparable properties in the area.
          </p>
        </div>
      )}
    </div>
  );
}
