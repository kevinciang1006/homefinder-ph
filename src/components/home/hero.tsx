"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PH_CITIES, PROPERTY_TYPES } from "@/lib/constants";

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");
  const [type, setType] = useState("all");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (city && city !== "all") params.set("city", city);
    if (type && type !== "all") params.set("type", type);
    router.push(`/properties?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent to-accent/80 py-20 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl">
          Find your next home in{" "}
          <span className="text-primary">Metro Manila</span>
        </h1>
        <p className="mb-8 text-lg text-white/80">
          Browse 40+ verified listings across Makati, BGC, Pasig, and more. Real properties,
          trusted developers, zero BS.
        </p>

        {/* Search bar */}
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-2 shadow-2xl sm:flex sm:gap-2">
          <div className="flex-1 mb-2 sm:mb-0">
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search by name, developer, or location…"
              className="border-0 bg-transparent text-foreground shadow-none focus-visible:ring-0 h-10"
            />
          </div>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="w-full sm:w-36 border-0 bg-transparent text-foreground shadow-none focus:ring-0">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {PH_CITIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full sm:w-36 border-0 bg-transparent text-foreground shadow-none focus:ring-0">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {PROPERTY_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSearch} className="w-full sm:w-auto gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>

        <p className="mt-4 text-sm text-white/60">
          40 properties · 9 cities · 10 trusted developers
        </p>
      </div>
    </section>
  );
}
