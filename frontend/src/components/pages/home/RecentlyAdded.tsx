import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, MapPin, Star } from "lucide-react";
import Container from "@/components/layout/Container";
import { getDestinations } from "@/services/destination.service";
import DestinationCard from "@/components/common/DestinationCard";

export default async function RecentlyAdded() {
  const destinations = await getDestinations();
  const recentlyAdded = destinations.slice(1, 4);

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="bg-primary-light/30 rounded-large border border-border  p-5 md:p-10 ">
          <div className="grid  lg:grid-cols-5 lg:items-center gap-5 lg:gap-10">
            {/* Editorial Content */}
            <div className="col-span-2 flex flex-col justify-center">
              <p className="text-extra-small font-bold uppercase tracking-[0.2em] text-primary">
                Chapter 04 — Fresh ink
              </p>

              <h2 className="mt-1.5 font-heading text-xl font-bold leading-tight text-gigantic">
                Recently Added
                <br />
                Destinations
              </h2>

              <p className="mt-3  leading-relaxed text-muted-foreground">
                Newly scouted by our editors — be the first to review them and
                shape their story.
              </p>

              <Link
                href="/destinations/new"
                className="mt-4 flex w-fit items-center text-small gap-1.5 rounded-small bg-primary px-3 py-2  font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Browse new arrivals
                <ArrowRight size={12} />
              </Link>
            </div>

            {/* Destination Cards */}
            <div className="col-span-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {recentlyAdded.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}