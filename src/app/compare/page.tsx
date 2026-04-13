"use client";

import Link from "next/link";
import Image from "next/image";
import { X, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCompareStore } from "@/stores/compare-store";
import { PROPERTIES } from "@/data/properties";
import { formatPHP, formatArea, formatFullPHP } from "@/lib/format";

export default function ComparePage() {
  const { ids, remove, clear } = useCompareStore();
  const compared = PROPERTIES.filter((p) => ids.includes(p.id));

  if (compared.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-24 text-center">
          <GitCompare className="h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-semibold">No properties to compare</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Add up to 3 properties to compare side by side.
          </p>
          <Link href="/properties" className="mt-4">
            <Button>Browse Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const rows: { label: string; render: (p: (typeof compared)[0]) => React.ReactNode }[] = [
    {
      label: "Image",
      render: (p) => (
        <div className="relative h-32 w-full overflow-hidden rounded">
          <Image
            src={p.images[0] ?? "https://picsum.photos/300/200"}
            alt={p.title}
            fill
            sizes="200px"
            className="object-cover"
          />
        </div>
      ),
    },
    { label: "Title", render: (p) => <Link href={`/properties/${p.id}`} className="font-medium text-primary hover:underline">{p.title}</Link> },
    { label: "City", render: (p) => p.city },
    {
      label: "Status",
      render: (p) => (
        <Badge variant={p.status === "for-sale" ? "default" : "secondary"}>
          {p.status === "for-sale" ? "For Sale" : "For Rent"}
        </Badge>
      ),
    },
    {
      label: "Price",
      render: (p) => (
        <span className="font-bold text-primary">
          {formatFullPHP(p.price)}
          {p.status === "for-rent" && <span className="text-xs font-normal">/mo</span>}
        </span>
      ),
    },
    { label: "Price/sqm", render: (p) => formatPHP(p.pricePerSqm) },
    { label: "Bedrooms", render: (p) => (p.bedrooms > 0 ? p.bedrooms : "—") },
    { label: "Bathrooms", render: (p) => (p.bathrooms > 0 ? p.bathrooms : "—") },
    { label: "Floor Area", render: (p) => formatArea(p.floorAreaSqm) },
    { label: "Developer", render: (p) => p.developer },
    { label: "Amenities", render: (p) => `${p.amenities.length} amenities` },
  ];

  const colWidth = compared.length === 1 ? "w-1/2" : compared.length === 2 ? "w-1/3" : "w-1/4";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Compare Properties</h1>
        {compared.length > 1 && (
          <Button variant="outline" size="sm" onClick={clear}>
            Clear all
          </Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-24 py-2 text-left text-sm font-medium text-muted-foreground" />
              {compared.map((p) => (
                <th key={p.id} className={`${colWidth} px-2 py-2 text-left`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="float-right h-6 w-6"
                    onClick={() => remove(p.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ label, render }) => (
              <tr key={label} className="border-t border-border">
                <td className="py-3 pr-4 text-sm font-medium text-muted-foreground whitespace-nowrap">
                  {label}
                </td>
                {compared.map((p) => (
                  <td key={p.id} className="px-2 py-3 text-sm">
                    {render(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {compared.length < 3 && (
        <div className="mt-6 rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
          Add {3 - compared.length} more {3 - compared.length === 1 ? "property" : "properties"} to compare.{" "}
          <Link href="/properties" className="text-primary hover:underline">
            Browse properties
          </Link>
        </div>
      )}
    </div>
  );
}
