import Container from "@/components/layout/Container";
import FavoriteDestinations from "@/components/pages/favourites/FavoriteDestinations";
import { getDestinations } from "@/services/destination.service";
import { Heart } from "lucide-react";

export default async function FavouritesPage() {
  const destinations = await getDestinations();

  return (
    <main className="min-h-screen py-12 md:py-16">
      <Container>
        <div className="mb-8">
          <p className="flex items-center gap-2 text-extra-small font-bold uppercase tracking-[0.2em] text-primary">
            <Heart size={15} />
            Your travel collection
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            Your favourites
          </h1>
          <p className="mt-2 max-w-xl text-small leading-relaxed text-muted-foreground">
            Keep the places you love together and come back to them whenever
            you&apos;re ready to plan your next trip.
          </p>
        </div>
        <FavoriteDestinations destinations={destinations} />
      </Container>
    </main>
  );
}
