"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
import { toast } from "@/hooks/use-toast";
import { PH_CITIES, PROPERTY_TYPES } from "@/lib/constants";

const AMENITY_OPTIONS = [
  "Swimming Pool",
  "Gym",
  "Parking",
  "24/7 Security",
  "Concierge",
  "Playground",
  "Garden",
  "Rooftop Deck",
  "Smart Home",
  "Jacuzzi",
  "CCTV",
  "Basketball Court",
];

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  type: z.enum(["condo", "house-and-lot", "townhouse", "lot"]),
  status: z.enum(["for-sale", "for-rent"]),
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
  address: z.string().min(5, "Please enter a full address"),
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  bedrooms: z.coerce.number().int().min(0),
  bathrooms: z.coerce.number().int().min(0),
  floorAreaSqm: z.coerce.number().positive("Enter a valid area"),
  price: z.coerce.number().positive("Enter a valid price"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  amenities: z.array(z.string()),
  photos: z.array(z.string()),
});

type FormValues = z.infer<typeof schema>;

export function ListingForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      type: "condo",
      status: "for-sale",
      city: "Makati",
      amenities: [],
      photos: [],
      lat: 14.5547,
      lng: 121.0244,
    },
  });

  const amenities = watch("amenities");
  const photos = watch("photos");

  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setValue(
        "amenities",
        amenities.filter((a) => a !== amenity)
      );
    } else {
      setValue("amenities", [...amenities, amenity]);
    }
  };

  const addPhoto = () => {
    if (photoUrl.trim()) {
      setValue("photos", [...photos, photoUrl.trim()]);
      setPhotoUrl("");
    }
  };

  const removePhoto = (i: number) => {
    setValue(
      "photos",
      photos.filter((_, idx) => idx !== i)
    );
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/seller/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      toast({
        title: "Listing submitted!",
        description: "Your property is under review and will be published within 24 hours.",
      });
      router.push("/seller");
    } catch {
      toast({
        title: "Error",
        description: "Failed to submit listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basics */}
      <section className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Basic Information</h3>
        <div className="space-y-2">
          <Label htmlFor="title">Property Title</Label>
          <Input id="title" {...register("title")} placeholder="e.g. Shang Salcedo Place — 1BR Unit" />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
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
          <div className="space-y-2">
            <Label>Listing Status</Label>
            <Select
              defaultValue="for-sale"
              onValueChange={(v) => setValue("status", v as "for-sale" | "for-rent")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="for-sale">For Sale</SelectItem>
                <SelectItem value="for-rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Location</h3>
        <div className="space-y-2">
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
        <div className="space-y-2">
          <Label htmlFor="address">Full Address</Label>
          <Input id="address" {...register("address")} placeholder="e.g. 123 Ayala Ave, Makati CBD" />
          {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="lat">Latitude</Label>
            <Input id="lat" type="number" step="0.0001" {...register("lat")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lng">Longitude</Label>
            <Input id="lng" type="number" step="0.0001" {...register("lng")} />
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Property Specifications</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input id="bedrooms" type="number" min={0} {...register("bedrooms")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input id="bathrooms" type="number" min={0} {...register("bathrooms")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="floorAreaSqm">Floor Area (sqm)</Label>
            <Input id="floorAreaSqm" type="number" min={1} {...register("floorAreaSqm")} />
            {errors.floorAreaSqm && (
              <p className="text-xs text-destructive">{errors.floorAreaSqm.message}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price (₱)</Label>
          <Input id="price" type="number" min={1} {...register("price")} placeholder="e.g. 12000000" />
          {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
        </div>
      </section>

      {/* Description */}
      <section className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Description</h3>
        <div className="space-y-2">
          <textarea
            {...register("description")}
            rows={5}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Describe the property — key features, nearby landmarks, what makes it special…"
          />
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description.message}</p>
          )}
        </div>
      </section>

      {/* Amenities */}
      <section className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Amenities</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {AMENITY_OPTIONS.map((amenity) => (
            <div key={amenity} className="flex items-center gap-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={amenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <label htmlFor={`amenity-${amenity}`} className="cursor-pointer text-sm">
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Photos */}
      <section className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Photos</h3>
        <p className="text-sm text-muted-foreground">
          Enter Unsplash or direct image URLs to add photo previews.
        </p>
        <div className="flex gap-2">
          <Input
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="https://images.unsplash.com/photo-…"
            className="flex-1"
          />
          <Button type="button" variant="outline" onClick={addPhoto}>
            Add
          </Button>
        </div>
        {photos.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {photos.map((url, i) => (
              <div key={i} className="group relative h-20 w-28 overflow-hidden rounded border">
                <Image
                  src={url}
                  alt={`Photo ${i + 1}`}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <Button type="submit" disabled={loading} size="lg" className="w-full">
        {loading ? "Submitting…" : "Submit Listing"}
      </Button>
    </form>
  );
}
