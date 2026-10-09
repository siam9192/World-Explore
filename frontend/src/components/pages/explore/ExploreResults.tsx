import DestinationCard from "@/components/common/DestinationCard";
import Container from "@/components/layout/Container";
import { getDestinations } from "@/services/destination.service";
import React from "react";

async function ExploreResults() {
  const destinations = await getDestinations();

  return (
    <div className="py-12 md:py-14">
      <Container>
        <div>
          <p className="text-small">
            <span className="font-bold text-foreground">248</span> destinations
            found
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default ExploreResults;
