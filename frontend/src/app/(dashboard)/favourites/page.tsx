"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  Copy,
  Heart,
  Search,
  Share2,
} from "lucide-react";

import FavouriteCard from "@/components/ui/FavouriteCard";
import { DestinationCategory , FavouriteCategory } from "@/app/types/destinationType";


import { destinations } from "@/app/data/destinationData";
import FavouriteCategories from "@/components/ui/FavouriteCategoriesBtn";

type FilterCategory = "All" | DestinationCategory;

const Page = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");

  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState<  "recent" | "rating" | "price-low" | "price-high">("recent");

  const [showSort, setShowSort] = useState(false);

  

  const categoryCounts = useMemo(() => {
    return {
      All: destinations.length,

      Asia: destinations.filter(
        (item) => item.category === "Asia"
      ).length,

      Europe: destinations.filter(
        (item) => item.category === "Europe"
      ).length,

      Americas: destinations.filter(
        (item) => item.category === "Americas"
      ).length,

      Africa: destinations.filter(
        (item) => item.category === "Africa"
      ).length,
    };
  }, []);

  

  const filteredDestinations = useMemo(() => {
    let result = [...destinations];

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter(
        (destination) =>
          destination.category === activeCategory
      );
    }

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      result = result.filter((destination) => {
        return (
          destination.name.toLowerCase().includes(query) ||
          destination.location.toLowerCase().includes(query) ||
          destination.category.toLowerCase().includes(query)
        );
      });
    }

    // Sort
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "recent":
      default:
        
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  

  const categories: FavouriteCategory[] = [
  {
    name: "Asia",
    count: 11,
  },
  {
    name: "Europe",
    count: 14,
  },
  {
    name: "Americas",
    count: 5,
  },
  {
    name: "Africa",
    count: 2,
  },
];

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-300 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        

        <section className="mb-6">
        
          <p className="mb-2 text-extra-small font-medium uppercase tracking-[0.16em] text-primary">
            Your wishlist · {categoryCounts.All} saved
          </p>

          
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              My Favourites
            </h1>

            
            <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
              
              <div className="relative w-full sm:w-64">
                <Search
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search saved..."
                  className="h-10 w-full rounded-medium border border-border bg-white pl-9 pr-3 text-small text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

             
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSort((prev) => !prev)}
                  className="flex h-10 w-full items-center justify-between gap-4 rounded-medium border border-border bg-white px-3 text-small font-medium text-foreground transition-colors hover:border-primary sm:min-w-36"
                >
                  <span>
                    {sortBy === "recent" && "Recently saved"}
                    {sortBy === "rating" && "Highest rated"}
                    {sortBy === "price-low" && "Price: low"}
                    {sortBy === "price-high" && "Price: high"}
                  </span>

                  <ChevronDown
                    size={15}
                    className={`transition-transform ${
                      showSort ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showSort && (
                  <div className="absolute right-0 top-12 z-30 w-full min-w-40 overflow-hidden rounded-medium border border-border bg-white p-1 shadow-lg">
                    {[
                      {
                        value: "recent",
                        label: "Recently saved",
                      },
                      {
                        value: "rating",
                        label: "Highest rated",
                      },
                      {
                        value: "price-low",
                        label: "Price: low",
                      },
                      {
                        value: "price-high",
                        label: "Price: high",
                      },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setSortBy(
                            option.value as
                              | "recent"
                              | "rating"
                              | "price-low"
                              | "price-high"
                          );
                          setShowSort(false);
                        }}
                        className={`w-full rounded px-3 py-2 text-left text-small transition-colors ${
                          sortBy === option.value
                            ? "bg-foreground text-white"
                            : "text-foreground hover:bg-background"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        

        <section className="mb-6">
  <FavouriteCategories
    categories={categories}
    totalCount={categoryCounts.All}
    activeCategory={activeCategory}
    onCategoryChange={setActiveCategory}
  />
</section>

       

        {(searchQuery || activeCategory !== "All") && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-small text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filteredDestinations.length}
              </span>{" "}
              saved destinations
            </p>

            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="text-small font-medium text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

  

 {filteredDestinations.length > 0 ? (
  <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
    {filteredDestinations.map((destination) => (
      <FavouriteCard
        key={destination.id}
        destination={destination}
      />
    ))}
  </section>
) : (
  <section className="flex min-h-80 items-center justify-center rounded-large border border-dashed border-border bg-white px-6">
    <div className="max-w-sm text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-favorite-soft">
        <Heart
          size={22}
          className="text-favorite"
        />
      </div>

      <h2 className="font-heading text-large font-semibold text-foreground">
        No saved destinations
      </h2>

      <p className="mt-2 text-small leading-relaxed text-muted-foreground">
        Try another search or category to find your favourite destinations.
      </p>

      <button
        type="button"
        onClick={() => {
          setActiveCategory("All");
          setSearchQuery("");
        }}
        className="mt-5 text-small font-medium text-primary hover:underline"
      >
        View all favourites
      </button>
    </div>
  </section>
)}

       

        <section className="mt-6 overflow-hidden rounded-large border border-[#d7eeea] bg-[#effbf8]">
          <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-medium border border-[#d7eeea] bg-white">
                <Heart
                  size={18}
                  className="text-favorite"
                />
              </div>

              <div>
                <h2 className="text-small font-semibold text-foreground sm:text-medium">
                  Share your wishlist
                </h2>

                <p className="mt-1 text-extra-small leading-relaxed text-muted-foreground">
                  Invite travel buddies to vote on your next
                  trip — 6 friends already did.
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
              {/* Share URL */}
              <div className="flex h-10 min-w-0 flex-1 items-center justify-between gap-3 rounded-medium border border-border bg-white px-3 sm:min-w-52">
                <span className="truncate text-extra-small text-muted-foreground">
                  worldexplore.com/@maya
                </span>

                <button
                  type="button"
                  aria-label="Copy wishlist link"
                  className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Copy size={15} />
                </button>
              </div>

              {/* Invite */}
              <button
                type="button"
                className="flex h-10 items-center justify-center gap-2 rounded-medium bg-primary px-5 text-small font-medium text-white transition-all hover:bg-primary-dark"
              >
                <Share2 size={15} />
                <span>Invite friends</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;