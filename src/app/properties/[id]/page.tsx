import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PropertyGallery } from "@/components/property/property-gallery";
import { PriceTrendChart } from "@/components/property/price-trend-chart";
import { FavoriteButton } from "@/components/property/favorite-button";
import { AgentContact } from "./agent-contact";
import { CompareToggle } from "./compare-toggle";
import { PROPERTIES } from "@/data/properties";
import { formatPHP, formatArea, formatFullPHP } from "@/lib/format";
import type { Property } from "@/types";
import { BedDouble, Bath, Maximize2, MapPin, Building } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROPERTIES.map((p) => ({ id: p.id }));
}

function PropertySpecs({ property }: { property: Property }) {
  const specs = [
    ...(property.bedrooms > 0
      ? [{ icon: BedDouble, label: "Bedrooms", value: String(property.bedrooms) }]
      : []),
    ...(property.bathrooms > 0
      ? [{ icon: Bath, label: "Bathrooms", value: String(property.bathrooms) }]
      : []),
    {
      icon: Maximize2,
      label: "Floor Area",
      value: formatArea(property.floorAreaSqm),
    },
    {
      icon: Building,
      label: "Developer",
      value: property.developer,
    },
    {
      icon: MapPin,
      label: "City",
      value: property.city,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {specs.map(({ icon: Icon, label, value }) => (
        <div key={label} className="rounded-lg bg-secondary/50 p-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon className="h-4 w-4" />
            <span className="text-xs">{label}</span>
          </div>
          <p className="mt-1 font-semibold text-sm">{value}</p>
        </div>
      ))}
    </div>
  );
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = PROPERTIES.find((p) => p.id === id);

  if (!property) notFound();

  const typeLabel =
    property.type === "condo"
      ? "Condo"
      : property.type === "house-and-lot"
        ? "House & Lot"
        : property.type === "townhouse"
          ? "Townhouse"
          : "Lot";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge>{property.status === "for-sale" ? "For Sale" : "For Rent"}</Badge>
            <Badge variant="secondary">{typeLabel}</Badge>
            <Badge variant="outline">
              <MapPin className="mr-1 h-3 w-3" />
              {property.city}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">{property.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{property.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <FavoriteButton propertyId={property.id} />
          <Button variant="outline" size="icon" aria-label="Share">
            <Share2 className="h-4 w-4" />
          </Button>
          <Suspense fallback={null}>
            <CompareToggle propertyId={property.id} />
          </Suspense>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <p className="text-3xl font-extrabold text-primary">
          {formatFullPHP(property.price)}
          {property.status === "for-rent" && (
            <span className="text-base font-normal text-muted-foreground">/month</span>
          )}
        </p>
        <p className="text-sm text-muted-foreground">
          {formatPHP(property.pricePerSqm)}/sqm
        </p>
      </div>

      {/* Gallery */}
      <div className="mb-8">
        <PropertyGallery images={property.images} title={property.title} />
      </div>

      {/* Specs */}
      <div className="mb-8">
        <h2 className="mb-3 font-semibold">Property Details</h2>
        <PropertySpecs property={property} />
      </div>

      <Separator className="mb-8" />

      {/* Description */}
      <div className="mb-8">
        <h2 className="mb-3 font-semibold">About this property</h2>
        <p className="text-muted-foreground leading-relaxed">{property.description}</p>
      </div>

      {/* Amenities */}
      {property.amenities.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 font-semibold">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((a) => (
              <Badge key={a} variant="secondary" className="text-sm">
                {a}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Separator className="mb-8" />

      {/* Price Trend Chart */}
      <div className="mb-8">
        <h2 className="mb-3 font-semibold">Price Trend (Last 12 Months)</h2>
        <PriceTrendChart data={property.priceHistory} status={property.status} />
      </div>

      <Separator className="mb-8" />

      {/* Agent Contact */}
      <Suspense fallback={null}>
        <AgentContact agent={property.agent} />
      </Suspense>
    </div>
  );
}
