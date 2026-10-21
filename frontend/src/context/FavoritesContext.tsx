"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import destinations from "../../public/json/destinations.json";

const STORAGE_KEY = "world-explore-favorites";
const DEFAULT_FAVORITES = destinations
  .filter((destination) => destination.isFavorite)
  .map((destination) => destination.id);
const DEFAULT_SNAPSHOT = JSON.stringify(DEFAULT_FAVORITES);
const listeners = new Set<() => void>();

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? DEFAULT_SNAPSHOT;
}

function getServerSnapshot() {
  return DEFAULT_SNAPSHOT;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function parseFavorites(snapshot: string): string[] {
  try {
    const parsedFavorites: unknown = JSON.parse(snapshot);
    if (
      Array.isArray(parsedFavorites) &&
      parsedFavorites.every((id): id is string => typeof id === "string")
    ) {
      return parsedFavorites;
    }

    console.error("Saved favourites must be an array of destination IDs.");
  } catch (error) {
    console.error("Could not read saved favourites.", error);
  }

  return DEFAULT_FAVORITES;
}

interface FavoritesContextValue {
  favoriteIds: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const favoriteIds = useMemo(() => parseFavorites(snapshot), [snapshot]);

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds],
  );
  const toggleFavorite = useCallback(
    (id: string) => {
      const nextFavorites = favoriteIds.includes(id)
        ? favoriteIds.filter((favoriteId) => favoriteId !== id)
        : [...favoriteIds, id];

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextFavorites));
      listeners.forEach((listener) => listener());
    },
    [favoriteIds],
  );

  const value = useMemo(
    () => ({ favoriteIds, isFavorite, toggleFavorite }),
    [favoriteIds, isFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider.");
  }

  return context;
}
