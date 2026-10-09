import DestinationCard from "@/components/common/DestinationCard";
import Container from "@/components/layout/Container";
import { getDestinations } from "@/services/destination.service";
import { Destination } from "@/types/destination.type";
import { ArrowRight } from "lucide-react";

async function PopularDestinations() {
  const destinations = await getDestinations();

  return (
    <section className="py-14">
      <Container>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          {/* Heading */}
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-widest text-primary sm:text-extra-small">
              Chapter 01 — Popular now
            </p>

            <h1 className="mt-1 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-gigantic">
              Popular Destinations
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              The places our editors and 86,000 reviewers keep returning to this
              season.
            </p>
          </div>

          {/* View all */}
          <div className="shrink-0">
            <button
              type="button"
              className="flex w-fit items-center gap-2 rounded-small border border-border bg-surface px-4 py-2 text-small font-medium text-primary transition-colors hover:bg-primary hover:text-white"
            >
              <span>View all</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default PopularDestinations;
