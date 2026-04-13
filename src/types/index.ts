export type PropertyType = "condo" | "house-and-lot" | "townhouse" | "lot";
export type ListingStatus = "for-sale" | "for-rent";
export type PHCity =
  | "Makati"
  | "Taguig"
  | "Pasig"
  | "Mandaluyong"
  | "Quezon City"
  | "Pasay"
  | "Manila"
  | "Alabang"
  | "Paranaque";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  status: ListingStatus;
  price: number; // PHP
  pricePerSqm: number;
  bedrooms: number;
  bathrooms: number;
  floorAreaSqm: number;
  address: string;
  city: PHCity;
  coordinates: { lat: number; lng: number };
  developer: string;
  images: string[];
  description: string;
  amenities: string[];
  priceHistory: { month: string; price: number }[];
  createdAt: string;
  agent: { name: string; phone: string; email: string; avatar: string };
}

export interface Developer {
  id: string;
  name: string;
  logo: string;
  propertyCount: number;
}

export interface ShoutOut {
  id: string;
  buyerName: string;
  budget: { min: number; max: number };
  preferredCities: PHCity[];
  preferredType: PropertyType;
  bedroomsMin: number;
  description: string;
  createdAt: string;
}

export interface PropertyFilters {
  query: string;
  cities: PHCity[];
  types: PropertyType[];
  status: ListingStatus | "all";
  priceMin: number;
  priceMax: number;
  bedroomsMin: number;
  developer: string | null;
}

export interface ValuationEstimate {
  estimated: number;
  low: number;
  high: number;
  comparableCount: number;
}
