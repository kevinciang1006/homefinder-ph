import { ShoutOutForm } from "@/components/shoutout/shoutout-form";

export default function NewShoutoutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Post a ShoutOut</h1>
        <p className="mt-1 text-muted-foreground">
          Tell sellers exactly what you&apos;re looking for. It&apos;s free and only takes a minute.
        </p>
      </div>
      <div className="rounded-lg border border-border bg-card p-6">
        <ShoutOutForm />
      </div>
    </div>
  );
}
