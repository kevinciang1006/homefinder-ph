"use client";

import { GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompareStore } from "@/stores/compare-store";
import { toast } from "@/hooks/use-toast";

interface CompareToggleProps {
  propertyId: string;
}

export function CompareToggle({ propertyId }: CompareToggleProps) {
  const { ids, add, remove } = useCompareStore();
  const isInCompare = ids.includes(propertyId);

  const toggle = () => {
    if (isInCompare) {
      remove(propertyId);
      toast({ title: "Removed from comparison" });
    } else if (ids.length >= 3) {
      toast({
        title: "Compare limit reached",
        description: "You can compare up to 3 properties at a time.",
        variant: "destructive",
      });
    } else {
      add(propertyId);
      toast({
        title: "Added to comparison",
        description: `${ids.length + 1} of 3 slots used.`,
      });
    }
  };

  return (
    <Button
      variant={isInCompare ? "default" : "outline"}
      size="sm"
      onClick={toggle}
      className="gap-1"
    >
      <GitCompare className="h-4 w-4" />
      {isInCompare ? "In Compare" : "Compare"}
    </Button>
  );
}
