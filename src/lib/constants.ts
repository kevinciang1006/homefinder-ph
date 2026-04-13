import type { PHCity, PropertyType, ListingStatus } from "@/types";

export const PH_CITIES: PHCity[] = [
  "Makati",
  "Taguig",
  "Pasig",
  "Mandaluyong",
  "Quezon City",
  "Pasay",
  "Manila",
  "Alabang",
  "Paranaque",
];

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "condo", label: "Condo" },
  { value: "house-and-lot", label: "House & Lot" },
  { value: "townhouse", label: "Townhouse" },
  { value: "lot", label: "Lot" },
];

export const LISTING_STATUSES: { value: ListingStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "for-sale", label: "For Sale" },
  { value: "for-rent", label: "For Rent" },
];

export const MANILA_CENTER = { lat: 14.5995, lng: 120.9842 };
export const DEFAULT_MAP_ZOOM = 11;
