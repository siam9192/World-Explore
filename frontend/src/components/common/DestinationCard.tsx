import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MapPin,
  Star,
  ArrowUpRight,
} from "lucide-react";

import { Destination } from "@/types/destination.type";

interface Props {
  destination: Destination;
}

const DestinationCard = ({ destination }: Props) => {
  const {
    title,
    slug,
    images,
    badge,
    isFavorite,
    rating,
    totalReviews,
    shortDescription,
    price,
    location,
  } = destination;

  return (
    <article className="group flex h-full w-full min-w-0 flex-col overflow-hidden rounded-large border border-border bg-surface">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={images[0]}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* Badge */}
        {badge && (
          <span className="absolute left-2.5 top-2.5 rounded-small bg-white px-2.5 py-1 text-[11px] font-semibold shadow-sm sm:left-3 sm:top-3 sm:text-extra-small">
            {badge}
          </span>
        )}

        {/* Favourite */}
        <button
          type="button"
          aria-label={
            isFavorite
              ? `Remove ${title} from favourites`
              : `Add ${title} to favourites`
          }
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white text-foreground shadow-sm transition-colors hover:bg-white/90 sm:right-3 sm:top-3 sm:h-9 sm:w-9"
        >
          <Heart
            size={17}
            className={isFavorite ? "fill-primary text-primary" : ""}
          />
        </button>
      </div>

      {/* Content */}
  
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Title + Rating */}
        <div className="flex items-start gap-2">
          <h2 className="min-w-0 flex-1 truncate font-heading text-base font-bold leading-tight sm:text-lg">
            {title}
          </h2>

          <div className="flex shrink-0 items-center gap-0.5 text-[11px] sm:gap-1 sm:text-extra-small">
            <Star
              size={14}
              className="fill-amber-500 text-amber-500 sm:h-[15px] sm:w-[15px]"
            />

            <span className="font-semibold">
              {rating.toFixed(1)}
            </span>

            <span className="hidden text-muted-foreground xs:inline sm:inline">
              ({totalReviews.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="mt-1.5 flex min-w-0 items-center gap-1.5 text-[11px] text-muted-foreground sm:text-extra-small">
          <MapPin className="h-3.5 w-3.5 shrink-0" />

          <span className="truncate">
            {location.city}, {location.country}
          </span>
        </div>

        {/* Description */}
        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-small">
          {shortDescription}
        </p>

        {/* Divider */}
        <div className="my-3 h-px bg-border sm:my-4" />

        {/* Bottom */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <p className="min-w-0 truncate text-xs font-semibold sm:text-small">
            {price.currency}
            {price.amount}
            <span className="font-normal text-muted-foreground">
              {" "}
              / {price.period}
            </span>
          </p>

          <Link
            href={`/explore/${slug}`}
            className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-primary transition-opacity hover:opacity-80 sm:gap-1 sm:text-small"
          >
            <span>Explore</span>
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>
        </div>
      </div>
   
    </article>
  );
};

export default DestinationCard;