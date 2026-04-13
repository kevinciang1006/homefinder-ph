import { ShieldCheck, Users, Megaphone } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    description:
      "Every property is reviewed for accuracy. No fake listings, no bait-and-switch. What you see is what you get.",
  },
  {
    icon: Users,
    title: "Trusted Agents",
    description:
      "Our network includes agents from the Philippines' top developers — Ayala Land, SMDC, Rockwell, and more.",
  },
  {
    icon: Megaphone,
    title: "Free ShoutOuts",
    description:
      "Post your wish list for free. Let sellers come to you with matching properties that fit your exact criteria.",
  },
];

export function ValueProps() {
  return (
    <section className="bg-secondary/30 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
          Why HomeFinder PH?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center rounded-lg bg-card p-6 text-center shadow-sm"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <f.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
