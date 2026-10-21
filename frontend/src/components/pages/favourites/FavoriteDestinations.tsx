"use client";

import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import DestinationCard from "@/components/common/DestinationCard";
import { Destination } from "@/types/destination.type";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoriteDestinations({
  destinations,
}: {
  destinations: Destination[];
}) {
  const { favoriteIds } = useFavorites();
  const favorites = destinations.filter((destination) =>
    favoriteIds.includes(destination.id),
  );

  if (favorites.length === 0) {
    return (
      <div className="rounded-large border border-dashed border-border bg-surface px-6 py-14 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-favorite-soft text-favorite">
          <Heart size={22} />
        </div>
        <h2 className="mt-4 font-heading text-xl font-bold">
          Your collection is waiting
        </h2>
        <p className="mx-auto mt-2 max-w-md text-small leading-relaxed text-muted-foreground">
          Tap the heart on any destination to save it here for later.
        </p>
        <Link
          href="/explore"
          className="mt-5 inline-flex items-center gap-2 rounded-small bg-primary px-4 py-2.5 text-small font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <MapPin size={16} />
          Explore destinations
        </Link>
      </div>
    );
  }

  return (
    <section aria-label={`${favorites.length} saved destinations`}>
      <p className="mb-5 text-small text-muted-foreground">
        <span className="font-semibold text-foreground">{favorites.length}</span>{" "}
        {favorites.length === 1 ? "place" : "places"} saved
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {favorites.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  );
}
