import DestinationCard from "@/components/common/DestinationCard";
import { getDestinations } from "@/services/destination.service";
import { ArrowRight } from "lucide-react";
import React from "react";

async function RecommendedDestinations() {
  const destinations = await getDestinations();
  return (
    <div className="mt-10 ">
      <div className="flex items-center justify-between">
        <h1 className="text-huge font-heading font-bold">You may also Love</h1>
        <button
          type="button"
          className="flex w-fit items-center gap-2 rounded-small px-4 py-2 text-small font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors  "
        >
          <span>More in japan</span>
          <ArrowRight size={18} />
        </button>
      </div>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
        {destinations.slice(0,5).map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  );
}

export default RecommendedDestinations;
