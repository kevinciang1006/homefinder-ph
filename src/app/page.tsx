import { Hero } from "@/components/home/hero";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { ValueProps } from "@/components/home/value-props";
import { PROPERTIES } from "@/data/properties";

export default function HomePage() {
  // SSR: use the 6 newest properties from seed data
  const featured = [...PROPERTIES]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <>
      <Hero />
      <FeaturedProperties properties={featured} />
      <ValueProps />
    </>
  );
}
