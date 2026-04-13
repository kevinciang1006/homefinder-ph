import { Suspense } from "react";
import { PropertiesContent } from "./properties-content";

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
}
