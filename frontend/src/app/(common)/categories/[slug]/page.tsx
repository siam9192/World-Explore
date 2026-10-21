import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import DestinationCard from "@/components/common/DestinationCard";
import Container from "@/components/layout/Container";
import { getCategories } from "@/services/category.service";
import { getDestinations } from "@/services/destination.service";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [categories, destinations] = await Promise.all([
    getCategories(),
    getDestinations(),
  ]);
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryDestinations = destinations.filter((destination) =>
    destination.categories.some(
      (destinationCategory) =>
        destinationCategory.toLowerCase() === category.name.toLowerCase(),
    ),
  );

  return (
    <main className="min-h-screen py-12 md:py-16">
      <Container>
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-small font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          All categories
        </Link>

        <div className="mt-6 mb-8">
          <p className="flex items-center gap-2 text-extra-small font-bold uppercase tracking-[0.2em] text-primary">
            <MapPin size={15} />
            Curated destinations
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            {category.name} escapes
          </h1>
          <p className="mt-2 text-small text-muted-foreground">
            {categoryDestinations.length}{" "}
            {categoryDestinations.length === 1 ? "destination" : "destinations"}{" "}
            to explore
          </p>
        </div>

        {categoryDestinations.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {categoryDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-large border border-dashed border-border bg-surface px-6 py-14 text-center">
            <h2 className="font-heading text-xl font-bold">
              More destinations coming soon
            </h2>
            <p className="mt-2 text-small text-muted-foreground">
              We&apos;re still curating this collection. Browse all destinations
              while we add more.
            </p>
            <Link
              href="/explore"
              className="mt-5 inline-flex rounded-small bg-primary px-4 py-2.5 text-small font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Browse destinations
            </Link>
          </div>
        )}
      </Container>
    </main>
  );
}
