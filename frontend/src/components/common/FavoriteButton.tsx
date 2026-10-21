"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

interface Props {
  destinationId: string;
  destinationTitle: string;
}

export default function FavoriteButton({
  destinationId,
  destinationTitle,
}: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(destinationId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(destinationId)}
      aria-label={
        favorite
          ? `Remove ${destinationTitle} from favourites`
          : `Add ${destinationTitle} to favourites`
      }
      aria-pressed={favorite}
      className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white text-foreground shadow-sm transition-colors hover:bg-white/90 sm:right-3 sm:top-3 sm:h-9 sm:w-9"
    >
      <Heart
        size={17}
        className={favorite ? "fill-favorite text-favorite" : ""}
      />
    </button>
  );
}
