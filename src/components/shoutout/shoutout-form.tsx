"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePostShoutout } from "@/hooks/use-shoutouts";
import { toast } from "@/hooks/use-toast";
import { PH_CITIES, PROPERTY_TYPES } from "@/lib/constants";
import type { PHCity } from "@/types";

const schema = z.object({
  buyerName: z.string().min(2, "Name is required"),
  budgetMin: z.coerce.number().positive("Enter a valid minimum budget"),
  budgetMax: z.coerce.number().positive("Enter a valid maximum budget"),
  preferredCities: z.array(z.string()).min(1, "Select at least one city"),
  preferredType: z.enum(["condo", "house-and-lot", "townhouse", "lot"]),
  bedroomsMin: z.coerce.number().int().min(0),
  description: z.string().min(10, "Please describe what you're looking for"),
});

type FormValues = z.infer<typeof schema>;

export function ShoutOutForm() {
  const router = useRouter();
  const { mutate, isPending } = usePostShoutout();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      preferredCities: [],
      preferredType: "condo",
      bedroomsMin: 1,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedCities = watch("preferredCities");

  const toggleCity = (city: string) => {
    if (selectedCities.includes(city)) {
      setValue(
        "preferredCities",
        selectedCities.filter((c) => c !== city)
      );
    } else {
      setValue("preferredCities", [...selectedCities, city]);
    }
  };

  const onSubmit = (data: FormValues) => {
    mutate(
      {
        buyerName: data.buyerName,
        budget: { min: data.budgetMin, max: data.budgetMax },
        preferredCities: data.preferredCities as PHCity[],
        preferredType: data.preferredType,
        bedroomsMin: data.bedroomsMin,
        description: data.description,
      },
      {
        onSuccess: () => {
          toast({ title: "ShoutOut posted!", description: "Sellers can now see your listing." });
          router.push("/shoutouts");
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to post. Please try again.", variant: "destructive" });
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="buyerName">Your Name</Label>
        <Input id="buyerName" {...register("buyerName")} placeholder="e.g. Maria Santos" />
        {errors.buyerName && (
          <p className="text-xs text-destructive">{errors.buyerName.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="budgetMin">Min Budget (₱)</Label>
          <Input
            id="budgetMin"
            type="number"
            {...register("budgetMin")}
            placeholder="5000000"
          />
          {errors.budgetMin && (
            <p className="text-xs text-destructive">{errors.budgetMin.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="budgetMax">Max Budget (₱)</Label>
          <Input
            id="budgetMax"
            type="number"
            {...register("budgetMax")}
            placeholder="15000000"
          />
          {errors.budgetMax && (
            <p className="text-xs text-destructive">{errors.budgetMax.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Preferred Cities</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PH_CITIES.map((city) => (
            <div key={city} className="flex items-center gap-2">
              <Checkbox
                id={`shout-city-${city}`}
                checked={selectedCities.includes(city)}
                onCheckedChange={() => toggleCity(city)}
              />
              <label htmlFor={`shout-city-${city}`} className="cursor-pointer text-sm">
                {city}
              </label>
            </div>
          ))}
        </div>
        {errors.preferredCities && (
          <p className="text-xs text-destructive">{errors.preferredCities.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="preferredType">Property Type</Label>
          <Select
            defaultValue="condo"
            onValueChange={(v) =>
              setValue(
                "preferredType",
                v as "condo" | "house-and-lot" | "townhouse" | "lot"
              )
            }
          >
            <SelectTrigger id="preferredType">
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
        <div className="space-y-2">
          <Label htmlFor="bedroomsMin">Min Bedrooms</Label>
          <Input
            id="bedroomsMin"
            type="number"
            min={0}
            {...register("bedroomsMin")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">What are you looking for?</Label>
        <textarea
          id="description"
          {...register("description")}
          rows={4}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Describe your ideal property — size, features, neighborhood vibe, must-haves…"
        />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Posting…" : "Post ShoutOut"}
      </Button>
    </form>
  );
}
