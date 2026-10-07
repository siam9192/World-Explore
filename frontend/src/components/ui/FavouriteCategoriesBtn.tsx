"use client";

import {
  FavouriteCategory,
  DestinationCategory,
} from "@/app/types/destinationType";

export type FavouriteFilter = "All" | DestinationCategory;

interface FavouriteCategoriesProps {
  categories: FavouriteCategory[];
  totalCount: number;
  activeCategory: FavouriteFilter;
  onCategoryChange: (category: FavouriteFilter) => void;
}

const FavouriteCategories = ({
  categories,
  totalCount,
  activeCategory,
  onCategoryChange,
}: FavouriteCategoriesProps) => {
  return (
    <div className="flex w-full items-center gap-2 overflow-x-auto pb-1">
      {/* ALL */}
      <button
        type="button"
        onClick={() => onCategoryChange("All")}
        className={`shrink-0 rounded-medium border px-4 py-2 text-small font-medium transition-all duration-200 ${
          activeCategory === "All"
            ? "border-foreground bg-foreground text-white"
            : "border-border bg-white text-foreground hover:border-primary hover:text-primary"
        }`}
      >
        All ({totalCount})
      </button>

      {/* OTHER CATEGORIES */}
      {categories.map((category) => {
        const isActive = activeCategory === category.name;

        return (
          <button
            key={category.name}
            type="button"
            onClick={() => onCategoryChange(category.name)}
            className={`shrink-0 rounded-medium border px-4 py-2 text-small font-medium transition-all duration-200 ${
              isActive
                ? "border-foreground bg-foreground text-white"
                : "border-border bg-white text-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {category.name} ({category.count})
          </button>
        );
      })}
    </div>
  );
};

export default FavouriteCategories;