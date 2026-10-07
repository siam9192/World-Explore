import Image from "next/image";
import { Heart, MapPin, Star, ArrowRight } from "lucide-react";

import { Destination } from "@/app/types/destinationType";

interface FavouriteCardProps {
  destination: Destination;
}

const FavouriteCard = ({ destination }: FavouriteCardProps) => {
  return (
    <article className="group overflow-hidden rounded-medium border border-border bg-white transition-shadow duration-300 hover:shadow-lg">
      
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Favourite */}
        <button
          type="button"
          aria-label={`Remove ${destination.name} from favourites`}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-medium bg-white text-favorite shadow-sm transition-colors duration-200 hover:bg-favorite-soft"
        >
          <Heart size={17} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        
        {/* Name + Rating */}
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-heading text-large font-semibold text-foreground">
            {destination.name}
          </h3>

          <div className="flex shrink-0 items-center gap-1 text-small">
            <Star
              size={14}
              className="text-accent"
              fill="currentColor"
            />

            <span className="font-medium text-foreground">
              {destination.rating}
            </span>

            <span className="text-muted-foreground">
              ({destination.reviews})
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="mt-2 flex items-center gap-1.5 text-small text-muted-foreground">
          <MapPin size={14} />

          <span>{destination.location}</span>
        </div>

        {/* Saved */}
        <p className="mt-2 text-extra-small text-muted-foreground">
          Saved {destination.savedDate}

          {destination.note && (
            <>
              {" · "}
              {destination.note}
            </>
          )}
        </p>

        {/* Divider */}
        <div className="my-4 h-px bg-border" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          
          <p className="text-small text-foreground">
            <span className="font-semibold">
              ${destination.price}
            </span>
            <span className="text-muted-foreground">
              {" "}
              / day
            </span>
          </p>

          <button
            type="button"
            className="flex items-center gap-1 text-small font-medium text-primary transition-colors duration-200 hover:text-primary-dark"
          >
            <span>Explore</span>
            <ArrowRight size={16} />
          </button>

        </div>
      </div>
    </article>
  );
};

export default FavouriteCard;