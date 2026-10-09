import { Review } from "./review.type";

export interface Destination extends Pick<
  DestinationDetails,
  | "id"
  | "title"
  | "images"
  | "slug"
  | "badge"
  | "isFavorite"
  | "rating"
  | "totalReviews"
  | "shortDescription"
  | "price"
  | "location"
> {
  createdAt: string;
  updatedAt: string;
}
export interface DestinationDetails {
  id: string;
  title: string;
  slug: string;
  tagline: string;

  images: string[];
  categories: string[];
  badge?: string;
  isFavorite: boolean;

  rating: number;
  totalReviews: number;

  description: string;
  shortDescription: string;
  editorNote: string;

  price: {
    amount: number;
    currency: string;
    period: string;
  };

  guideVerified: boolean;
  bestTime: string;

  dailyBudget: {
    min: number;
    max: number;
    currency: string;
  };

  idealTrip: string;
  gettingAround: string[];
  languages: string[];

  highlights: {
    label: string;
    value: string;
    icon: string;
  }[];

  activities: Activity[];

  location: {
    city: string;
    state?: string;
    country: string;
    address: string;
    description: string;
    mapUrl?: string;
  };

  reviews: Review[];

  createdAt: string;
  updatedAt: string;
}
export interface Activity {
  title: string;
  duration: string;
  price: number;
  isFree: boolean;
  currency: string;
  icon?: string;
}
