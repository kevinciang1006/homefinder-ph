import { ListingForm } from "@/components/seller/listing-form";

export default function NewListingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">List Your Property</h1>
        <p className="mt-1 text-muted-foreground">
          Fill in the details below. Your listing will be reviewed and published within 24 hours.
        </p>
      </div>
      <ListingForm />
    </div>
  );
}
