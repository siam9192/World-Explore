
"use client";

import Container from "@/components/layout/Container";
import Input from "@/components/ui/Input";
import { getCategories } from "@/services/category.service";
import { Category } from "@/types/category.type";
import {
  ArrowDownAZ,
  ArrowDownWideNarrow,
  ArrowUpDown,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Compass,
  Heart,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface CurrentFilters {
  search: string;
  categories: string[];
  others: string[];
  rating: number;
  budget: string;
  preferences: string[];
}

const DEFAULT_FILTERS: CurrentFilters = {
  search: "",
  categories: [],
  others: [],
  rating: 0,
  budget: "",
  preferences: [],
};

const SORT_OPTIONS = [
  {
    label: "Top rated",
    value: "rating",
    description: "Highest rated destinations",
    icon: Star,
  },
  {
    label: "Most reviewed",
    value: "reviews",
    description: "Popular with travellers",
    icon: Heart,
  },
  {
    label: "Recently added",
    value: "recent",
    description: "Discover new places",
    icon: Clock3,
  },
  {
    label: "Alphabetical",
    value: "alphabetical",
    description: "A to Z",
    icon: ArrowDownAZ,
  },
];

const BUDGET_OPTIONS = [
  { label: "Budget", description: "Under $50/day", value: "budget" },
  { label: "Moderate", description: "$50–$150/day", value: "moderate" },
  { label: "Luxury", description: "$150+/day", value: "luxury" },
];

const TRAVEL_PREFERENCES = [
  "Nature",
  "Adventure",
  "Culture",
  "Relaxation",
  "Food",
  "Photography",
];

function ExploreFilterBox() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentFilters, setCurrentFilters] =
    useState<CurrentFilters>(DEFAULT_FILTERS);

  const [draftFilters, setDraftFilters] =
    useState<CurrentFilters>(DEFAULT_FILTERS);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchCategories = async () => {
      try {
        const data = await getCategories();

        if (!cancelled) {
          setCategories(data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to fetch categories:", error);
        }
      }
    };

    fetchCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  // Close popups when clicking outside or pressing Escape.
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (filterRef.current && !filterRef.current.contains(target)) {
        setIsFilterOpen(false);
      }

      if (sortRef.current && !sortRef.current.contains(target)) {
        setIsSortOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFilterOpen(false);
        setIsSortOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const activeFilterCount =
    currentFilters.categories.length +
    currentFilters.others.length +
    (currentFilters.rating > 0 ? 1 : 0) +
    (currentFilters.budget ? 1 : 0) +
    currentFilters.preferences.length;

  const hasActiveFilters =
    currentFilters.search.trim() !== "" || activeFilterCount > 0;

  const selectedSort =
    SORT_OPTIONS.find((option) => option.value === sortBy) ??
    SORT_OPTIONS[0];

  const updateDraft = <K extends keyof CurrentFilters>(
    key: K,
    value: CurrentFilters[K],
  ) => {
    setDraftFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const toggleValue = (
    values: string[],
    value: string,
  ): string[] => {
    return values.includes(value)
      ? values.filter((item) => item !== value)
      : [...values, value];
  };

  const toggleDraftCategory = (categoryId: string) => {
    updateDraft(
      "categories",
      toggleValue(draftFilters.categories, categoryId),
    );
  };

  const togglePreference = (preference: string) => {
    updateDraft(
      "preferences",
      toggleValue(draftFilters.preferences, preference),
    );
  };

  const openFilters = () => {
    setDraftFilters({
      ...currentFilters,
      categories: [...currentFilters.categories],
      others: [...currentFilters.others],
      preferences: [...currentFilters.preferences],
    });

    setIsSortOpen(false);
    setIsFilterOpen((previous) => !previous);
  };

  const applyFilters = () => {
    setCurrentFilters({
      ...draftFilters,
      categories: [...draftFilters.categories],
      others: [...draftFilters.others],
      preferences: [...draftFilters.preferences],
    });

    setIsFilterOpen(false);
  };

  const clearAll = () => {
    setCurrentFilters({ ...DEFAULT_FILTERS });
    setDraftFilters({ ...DEFAULT_FILTERS });
  };

  const removeCategory = (categoryId: string) => {
    setCurrentFilters((previous) => ({
      ...previous,
      categories: previous.categories.filter(
        (id) => id !== categoryId,
      ),
    }));

    setDraftFilters((previous) => ({
      ...previous,
      categories: previous.categories.filter(
        (id) => id !== categoryId,
      ),
    }));
  };

  const removePreference = (preference: string) => {
    setCurrentFilters((previous) => ({
      ...previous,
      preferences: previous.preferences.filter(
        (item) => item !== preference,
      ),
    }));

    setDraftFilters((previous) => ({
      ...previous,
      preferences: previous.preferences.filter(
        (item) => item !== preference,
      ),
    }));
  };

  const updateSearch = (search: string) => {
    setCurrentFilters((previous) => ({
      ...previous,
      search,
    }));

    setDraftFilters((previous) => ({
      ...previous,
      search,
    }));
  };

  const toggleQuickCategory = (categoryId: string) => {
    setCurrentFilters((previous) => ({
      ...previous,
      categories: toggleValue(previous.categories, categoryId),
    }));

    setDraftFilters((previous) => ({
      ...previous,
      categories: toggleValue(previous.categories, categoryId),
    }));
  };

  const resetDraft = () => {
    setDraftFilters({
      ...DEFAULT_FILTERS,
      search: currentFilters.search,
    });
  };

  return (
    <section className="relative z-20 border-b border-border bg-surface py-7 sm:py-9">
      <Container>
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-small bg-primary/10 text-primary">
              <Compass size={15} />
            </span>

            <p className="text-extra-small font-semibold uppercase tracking-[0.16em] text-primary">
              The atlas · 12,400 places
            </p>

            <span className="hidden h-px w-12 bg-border sm:block" />
          </div>

          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h1 className="max-w-3xl font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-gigantic">
                Explore every corner
                <br className="hidden sm:block" /> of the planet.
              </h1>

              <p className="mt-3 max-w-xl text-small leading-6 text-muted-foreground">
                Find extraordinary places, hidden gems, and
                unforgettable experiences around the world.
              </p>
            </div>

            <div className="flex items-center gap-2 text-extra-small text-muted-foreground">
              <Sparkles size={15} className="text-accent" />
              Curated for curious travellers
            </div>
          </div>
        </div>

        {/* =====================================================
            SEARCH + FILTER + SORT
        ====================================================== */}

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="min-w-0 flex-1">
            <Input
              value={currentFilters.search}
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Search destinations, cities, countries..."
              leftIcon={<Search size={17} />}
            />
          </div>

          <div className="flex gap-2">
            {/* FILTER POPUP */}
            <div ref={filterRef} className="relative flex-1 sm:flex-none">
              <button
                type="button"
                aria-expanded={isFilterOpen}
                aria-haspopup="dialog"
                onClick={openFilters}
                className={`flex h-11 w-full items-center justify-center gap-2 rounded-medium border px-4 text-small font-semibold transition-all sm:w-auto ${
                  isFilterOpen
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-surface text-foreground hover:border-primary/40 hover:bg-muted"
                }`}
              >
                <SlidersHorizontal size={17} />

                <span>Filters</span>

                {activeFilterCount > 0 && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {activeFilterCount}
                  </span>
                )}

                <ChevronDown
                  size={15}
                  className={`transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isFilterOpen && (
                <div
                  role="dialog"
                  aria-label="Destination filters"
                  className="absolute right-0 top-[calc(100%+12px)] z-50 w-[min(92vw,390px)] overflow-hidden rounded-large border border-border bg-surface shadow-[0_20px_70px_rgba(0,0,0,0.14)] sm:w-[390px]"
                >
                  {/* Popup header */}
                  <div className="flex items-center justify-between border-b border-border px-5 py-4">
                    <div>
                      <h2 className="font-heading text-lg font-bold text-foreground">
                        Refine your search
                      </h2>

                      <p className="mt-1 text-extra-small text-muted-foreground">
                        Find the right place for your next adventure.
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label="Close filters"
                      onClick={() => setIsFilterOpen(false)}
                      className="flex size-8 items-center justify-center rounded-small text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <X size={17} />
                    </button>
                  </div>

                  {/* Popup scrollable content */}
                  <div className="max-h-[min(60vh,510px)] space-y-6 overflow-y-auto p-5">
                    {/* Categories */}
                    <section>
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-small font-bold text-foreground">
                          Destination type
                        </h3>

                        <span className="text-[10px] text-muted-foreground">
                          {draftFilters.categories.length} selected
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => {
                          const selected =
                            draftFilters.categories.includes(category.id);

                          return (
                            <button
                              key={category.id}
                              type="button"
                              aria-pressed={selected}
                              onClick={() =>
                                toggleDraftCategory(category.id)
                              }
                              className={`flex min-h-10 items-center justify-between gap-2 rounded-small border px-3 py-2 text-left text-extra-small font-medium transition-all ${
                                selected
                                  ? "border-primary bg-primary/5 text-primary"
                                  : "border-border bg-surface text-foreground hover:border-primary/40 hover:bg-muted"
                              }`}
                            >
                              <span className="truncate">
                                {category.name}
                              </span>

                              {selected && (
                                <Check
                                  size={14}
                                  className="shrink-0"
                                />
                              )}
                            </button>
                          );
                        })}

                        {categories.length === 0 && (
                          <p className="col-span-2 py-2 text-extra-small text-muted-foreground">
                            Loading destination categories...
                          </p>
                        )}
                      </div>
                    </section>

                    <div className="h-px bg-border" />

                    {/* Rating */}
                    <section>
                      <div className="mb-3">
                        <h3 className="text-small font-bold text-foreground">
                          Traveller rating
                        </h3>

                        <p className="mt-1 text-extra-small text-muted-foreground">
                          Show places rated at least
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {[0, 3, 4, 4.5].map((rating) => {
                          const selected =
                            draftFilters.rating === rating;

                          return (
                            <button
                              key={rating}
                              type="button"
                              aria-pressed={selected}
                              onClick={() =>
                                updateDraft("rating", rating)
                              }
                              className={`flex h-9 items-center gap-1.5 rounded-small border px-3 text-extra-small font-semibold transition-all ${
                                selected
                                  ? "border-primary bg-primary text-white"
                                  : "border-border bg-surface text-foreground hover:border-primary/40"
                              }`}
                            >
                              {rating === 0 ? (
                                "Any rating"
                              ) : (
                                <>
                                  <Star
                                    size={13}
                                    className={
                                      selected
                                        ? "fill-white text-white"
                                        : "fill-accent text-accent"
                                    }
                                  />
                                  {rating}+
                                </>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    <div className="h-px bg-border" />

                    {/* Budget */}
                    <section>
                      <div className="mb-3 flex items-center gap-2">
                        <CircleDollarSign
                          size={17}
                          className="text-primary"
                        />

                        <h3 className="text-small font-bold text-foreground">
                          Daily budget
                        </h3>
                      </div>

                      <div className="space-y-2">
                        {BUDGET_OPTIONS.map((option) => {
                          const selected =
                            draftFilters.budget === option.value;

                          return (
                            <button
                              key={option.value}
                              type="button"
                              aria-pressed={selected}
                              onClick={() =>
                                updateDraft(
                                  "budget",
                                  selected ? "" : option.value,
                                )
                              }
                              className={`flex w-full items-center justify-between rounded-medium border p-3 text-left transition-all ${
                                selected
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/40 hover:bg-muted"
                              }`}
                            >
                              <div>
                                <p className="text-extra-small font-semibold text-foreground">
                                  {option.label}
                                </p>

                                <p className="mt-1 text-[10px] text-muted-foreground">
                                  {option.description}
                                </p>
                              </div>

                              <span
                                className={`flex size-4 items-center justify-center rounded-full border ${
                                  selected
                                    ? "border-primary bg-primary text-white"
                                    : "border-border"
                                }`}
                              >
                                {selected && <Check size={10} />}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    <div className="h-px bg-border" />

                    {/* Travel preferences */}
                    <section>
                      <div className="mb-3 flex items-center gap-2">
                        <Heart size={16} className="text-primary" />

                        <h3 className="text-small font-bold text-foreground">
                          Travel interests
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {TRAVEL_PREFERENCES.map((preference) => {
                          const selected =
                            draftFilters.preferences.includes(preference);

                          return (
                            <button
                              key={preference}
                              type="button"
                              aria-pressed={selected}
                              onClick={() =>
                                togglePreference(preference)
                              }
                              className={`rounded-full border px-3 py-2 text-extra-small font-medium transition-all ${
                                selected
                                  ? "border-primary bg-primary text-white"
                                  : "border-border text-foreground hover:border-primary/40 hover:bg-muted"
                              }`}
                            >
                              {preference}
                              {selected && (
                                <Check
                                  size={12}
                                  className="ml-1 inline"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  </div>

                  {/* Popup footer */}
                  <div className="flex items-center justify-between gap-3 border-t border-border bg-muted/30 p-4">
                    <button
                      type="button"
                      onClick={resetDraft}
                      className="flex items-center gap-1.5 rounded-small px-2 py-2 text-extra-small font-semibold text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <RotateCcw size={14} />
                      Reset
                    </button>

                    <button
                      type="button"
                      onClick={applyFilters}
                      className="flex h-10 items-center justify-center gap-2 rounded-small bg-primary px-5 text-small font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Apply filters
                      <ArrowDownWideNarrow size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SORT DROPDOWN */}
            <div ref={sortRef} className="relative flex-1 sm:flex-none">
              <button
                type="button"
                aria-expanded={isSortOpen}
                aria-haspopup="listbox"
                onClick={() => {
                  setIsFilterOpen(false);
                  setIsSortOpen((previous) => !previous);
                }}
                className={`flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-medium border px-4 text-small font-semibold transition-all sm:w-auto ${
                  isSortOpen
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-surface text-foreground hover:border-primary/40 hover:bg-muted"
                }`}
              >
                <ArrowUpDown size={16} />
                {selectedSort.label}

                <ChevronDown
                  size={15}
                  className={`transition-transform ${isSortOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isSortOpen && (
                <div
                  role="listbox"
                  aria-label="Sort destinations"
                  className="absolute right-0 top-[calc(100%+12px)] z-50 w-[min(85vw,290px)] overflow-hidden rounded-large border border-border bg-surface p-2 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                >
                  <div className="px-3 pb-2 pt-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      Sort destinations
                    </p>
                  </div>

                  {SORT_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const selected = sortBy === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 rounded-medium p-3 text-left transition-colors ${
                          selected
                            ? "bg-primary/5 text-primary"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <span
                          className={`flex size-9 shrink-0 items-center justify-center rounded-small ${
                            selected
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon size={17} />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block text-small font-semibold">
                            {option.label}
                          </span>

                          <span className="mt-0.5 block text-[10px] text-muted-foreground">
                            {option.description}
                          </span>
                        </span>

                        {selected && <Check size={16} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =====================================================
            QUICK CATEGORY CHIPS
        ====================================================== */}

        <div className="mt-5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setCurrentFilters((previous) => ({
                  ...previous,
                  categories: [],
                }));

                setDraftFilters((previous) => ({
                  ...previous,
                  categories: [],
                }));
              }}
              className={`rounded-small border px-4 py-2 text-extra-small font-semibold transition-all ${
                currentFilters.categories.length === 0
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-surface text-foreground hover:bg-muted"
              }`}
            >
              All places
            </button>

            {categories.map((category) => {
              const selected =
                currentFilters.categories.includes(category.id);

              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleQuickCategory(category.id)}
                  className={`whitespace-nowrap rounded-small border px-4 py-2 text-extra-small font-medium transition-all ${
                    selected
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-surface text-foreground hover:border-primary/40 hover:bg-muted"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            ACTIVE FILTERS
        ====================================================== */}

        {hasActiveFilters && (
          <div className="mt-5 border-t border-border pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-extra-small font-semibold text-muted-foreground">
                Active:
              </span>

              {currentFilters.search.trim() && (
                <button
                  type="button"
                  onClick={() => updateSearch("")}
                  className="flex max-w-full items-center gap-1.5 rounded-small border border-primary/20 bg-primary/5 px-2.5 py-1.5 text-extra-small font-medium text-primary transition-colors hover:bg-primary/10"
                >
                  <Search size={12} />
                  <span className="max-w-48 truncate">
                    {currentFilters.search}
                  </span>
                  <X size={13} />
                </button>
              )}

              {currentFilters.categories.map((categoryId) => {
                const category = categories.find(
                  (item) => item.id === categoryId,
                );

                if (!category) return null;

                return (
                  <button
                    key={categoryId}
                    type="button"
                    onClick={() => removeCategory(categoryId)}
                    className="flex items-center gap-1.5 rounded-small border border-primary/20 bg-primary/5 px-2.5 py-1.5 text-extra-small font-medium text-primary hover:bg-primary/10"
                  >
                    {category.name}
                    <X size={13} />
                  </button>
                );
              })}

              {currentFilters.rating > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentFilters((previous) => ({
                      ...previous,
                      rating: 0,
                    }));
                  }}
                  className="flex items-center gap-1.5 rounded-small border border-primary/20 bg-primary/5 px-2.5 py-1.5 text-extra-small font-medium text-primary hover:bg-primary/10"
                >
                  <Star size={12} />
                  {currentFilters.rating}+ rating
                  <X size={13} />
                </button>
              )}

              {currentFilters.budget && (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentFilters((previous) => ({
                      ...previous,
                      budget: "",
                    }));
                  }}
                  className="flex items-center gap-1.5 rounded-small border border-primary/20 bg-primary/5 px-2.5 py-1.5 text-extra-small font-medium text-primary hover:bg-primary/10"
                >
                  {BUDGET_OPTIONS.find(
                    (option) => option.value === currentFilters.budget,
                  )?.label}
                  <X size={13} />
                </button>
              )}

              {currentFilters.preferences.map((preference) => (
                <button
                  key={preference}
                  type="button"
                  onClick={() => removePreference(preference)}
                  className="flex items-center gap-1.5 rounded-small border border-primary/20 bg-primary/5 px-2.5 py-1.5 text-extra-small font-medium text-primary hover:bg-primary/10"
                >
                  {preference}
                  <X size={13} />
                </button>
              ))}

              <button
                type="button"
                onClick={clearAll}
                className="flex items-center gap-1.5 px-2 py-1.5 text-extra-small font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                Clear all
                <RotateCcw size={13} />
              </button>
            </div>
          </div>
        )}

        {/* =====================================================
            OPTIONAL RESULTS SUMMARY
        ====================================================== */}

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <p className="text-extra-small text-muted-foreground">
            <span className="font-semibold text-foreground">
              Discover your next favourite place
            </span>
            <span className="hidden sm:inline">
              {" "}— use filters to narrow your search.
            </span>
          </p>

          <button
            type="button"
            onClick={() => {
              setCurrentFilters(DEFAULT_FILTERS);
              setDraftFilters(DEFAULT_FILTERS);
              setSortBy("rating");
            }}
            className="flex shrink-0 items-center gap-1 text-extra-small font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Start over</span>
          </button>
        </div>
      </Container>
    </section>
  );
}

export default ExploreFilterBox;
