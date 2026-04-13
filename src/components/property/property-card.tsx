"use client";

import Link from "next/link";
import Image from "next/image";
import { BedDouble, Bath, Maximize2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FavoriteButton } from "./favorite-button";
import { formatPHP, formatArea } from "@/lib/format";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const img = property.images[0] ?? "https://picsum.photos/400/300";

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      <Link href={`/properties/${property.id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <Image
            src={img}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-2 top-2 flex gap-1">
            <Badge
              variant={property.status === "for-sale" ? "default" : "secondary"}
              className="text-xs"
            >
              {property.status === "for-sale" ? "For Sale" : "For Rent"}
            </Badge>
            <Badge variant="outline" className="bg-white text-xs">
              {property.type === "condo"
                ? "Condo"
                : property.type === "house-and-lot"
                  ? "House & Lot"
                  : property.type === "townhouse"
                    ? "Townhouse"
                    : "Lot"}
            </Badge>
          </div>
          <div className="absolute right-2 top-2">
            <FavoriteButton
              propertyId={property.id}
              className="bg-white/90 hover:bg-white"
            />
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/properties/${property.id}`}>
          <p className="mb-1 line-clamp-1 font-semibold text-foreground hover:text-primary">
            {property.title}
          </p>
          <p className="mb-2 text-2xl font-bold text-primary">
            {formatPHP(property.price)}
            {property.status === "for-rent" && (
              <span className="text-sm font-normal text-muted-foreground">/mo</span>
            )}
          </p>
          <p className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            {property.city}
          </p>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <BedDouble className="h-4 w-4" />
                {property.bedrooms}
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                {property.bathrooms}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Maximize2 className="h-4 w-4" />
              {formatArea(property.floorAreaSqm)}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{property.developer}</p>
        </Link>
      </CardContent>
    </Card>
  );
}
