import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { getDestinations } from "@/services/destination.service";
import Container from "@/components/layout/Container";

async function TrendingPlaces() {
  const destinations = await getDestinations();
  const featured = destinations[0];
  const trending = destinations.slice(1, 6);

  if (!featured) return null;

  return (
 <section className="border-y border-border bg-surface py-14 md:py-16">
  <Container>
    <div className=" grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-16">
      {/* Featured Destination */}
      <Link
        href={`/destinations/${featured.slug}`}
        className="group relative h-[420px] overflow-hidden rounded-medium"
      >
        <Image
          src={featured.images[0]}
          alt={featured.title}
          fill
          sizes="(max-width: 1024px) 100vw, 380px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

        <div className="absolute left-4 top-4">
          <span className="rounded-small bg-primary px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-primary-foreground">
            Trending No. 1
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h2 className="font-heading text-2xl font-bold leading-tight">
            {featured.title}
          </h2>

          <p className="mt-1.5 line-clamp-2 text-extra-small text-white/75">
            {featured.shortDescription}
          </p>

          <div className="mt-3 flex items-center gap-2 text-[10px] text-white/70">
            <MapPin size={12} />

            <span>
              {featured.location.city}, {featured.location.country}
            </span>

            <span>·</span>

            <span>★ {featured.rating}</span>

            <span>·</span>

            <span>
              {featured.totalReviews.toString()} reviews
            </span>
          </div>

          <div className="mt-4 inline-flex items-center gap-1.5 rounded-small bg-white px-3 py-2 text-[10px] font-semibold text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            Read the field notes
            <ArrowUpRight size={13} />
          </div>
        </div>
      </Link>

      {/* Trending List */}
      <div className="flex flex-col">
        <div className="mb-5">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
            Curated · Editor&apos;s Pick
          </p>

          <h2 className="mt-1 font-heading text-2xl font-bold md:text-3xl">
            Trending Places
          </h2>
        </div>

        <div className="divide-y divide-border">
          {trending.map((destination, index) => (
            <Link
              key={destination.id}
              href={`/destinations/${destination.slug}`}
              className="group flex items-center gap-4 py-3.5"
            >
              <span className="w-5 shrink-0 font-mono text-small text-muted-foreground">
                {String(index + 2).padStart(2, "0")}
              </span>

              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-small">
                <Image
                  src={destination.images[0]}
                  alt={destination.title}
                  fill
                  sizes="44px"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-small font-semibold transition-colors group-hover:text-primary">
                  {destination.location.city}
                </h3>

                <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                  {destination.location.country} · ★ {destination.rating}
                </p>
              </div>

              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-small border border-border text-muted-foreground transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRight size={11} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </Container>
</section>
  );
}

export default TrendingPlaces;
