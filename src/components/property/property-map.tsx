"use client";

import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Property } from "@/types";
import { formatPHP } from "@/lib/format";
import { MANILA_CENTER, DEFAULT_MAP_ZOOM } from "@/lib/constants";
import { Button } from "@/components/ui/button";

interface PropertyMapProps {
  properties: Property[];
}

const MAP_STYLE = {
  version: 8 as const,
  sources: {
    osm: {
      type: "raster" as const,
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster" as const,
      source: "osm",
    },
  ],
};

export function PropertyMap({ properties }: PropertyMapProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden border border-border">
      <Map
        initialViewState={{
          latitude: MANILA_CENTER.lat,
          longitude: MANILA_CENTER.lng,
          zoom: DEFAULT_MAP_ZOOM,
        }}
        mapStyle={MAP_STYLE}
        style={{ width: "100%", height: "100%" }}
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            latitude={property.coordinates.lat}
            longitude={property.coordinates.lng}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedProperty(property);
            }}
          >
            <div
              className="cursor-pointer rounded-full bg-primary p-1 text-white shadow-md hover:scale-110 transition-transform"
              title={property.title}
            >
              <MapPin className="h-4 w-4" />
            </div>
          </Marker>
        ))}

        {selectedProperty && (
          <Popup
            latitude={selectedProperty.coordinates.lat}
            longitude={selectedProperty.coordinates.lng}
            anchor="top"
            onClose={() => setSelectedProperty(null)}
            closeButton={true}
            closeOnClick={false}
            maxWidth="240px"
          >
            <div className="p-1">
              <div className="relative h-24 w-full overflow-hidden rounded">
                <Image
                  src={selectedProperty.images[0] ?? "https://picsum.photos/240/120"}
                  alt={selectedProperty.title}
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 line-clamp-1 text-sm font-semibold">
                {selectedProperty.title}
              </p>
              <p className="text-sm font-bold text-primary">
                {formatPHP(selectedProperty.price)}
                {selectedProperty.status === "for-rent" && "/mo"}
              </p>
              <p className="text-xs text-muted-foreground">{selectedProperty.city}</p>
              <Link href={`/properties/${selectedProperty.id}`}>
                <Button size="sm" className="mt-2 w-full text-xs">
                  View details
                </Button>
              </Link>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
