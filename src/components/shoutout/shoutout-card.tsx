import { MapPin, BedDouble, DollarSign, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ShoutOut } from "@/types";
import { formatPHP, formatDate } from "@/lib/format";

interface ShoutOutCardProps {
  shoutout: ShoutOut;
}

export function ShoutOutCard({ shoutout }: ShoutOutCardProps) {
  const typeLabel =
    shoutout.preferredType === "condo"
      ? "Condo"
      : shoutout.preferredType === "house-and-lot"
        ? "House & Lot"
        : shoutout.preferredType === "townhouse"
          ? "Townhouse"
          : "Lot";

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold">{shoutout.buyerName}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Calendar className="h-3 w-3" />
              {formatDate(shoutout.createdAt)}
            </p>
          </div>
          <Badge variant="secondary">{typeLabel}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">{shoutout.description}</p>

        <div className="flex flex-wrap gap-2 text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <DollarSign className="h-4 w-4 text-primary" />
            {formatPHP(shoutout.budget.min)} – {formatPHP(shoutout.budget.max)}
          </span>
          {shoutout.bedroomsMin > 0 && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <BedDouble className="h-4 w-4 text-primary" />
              {shoutout.bedroomsMin}+ BR
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {shoutout.preferredCities.map((city) => (
            <Badge key={city} variant="outline" className="text-xs">
              <MapPin className="mr-1 h-3 w-3" />
              {city}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
