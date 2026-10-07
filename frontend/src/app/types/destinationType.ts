import { StaticImageData } from "next/image";
export type DestinationCategory =
  | "Asia"
  | "Europe"
  | "Americas"
  | "Africa";

export interface Destination {
  id: number;
  name: string;
  image: StaticImageData;
  category: DestinationCategory;
  location: string;
  rating: number;
  reviews: string;
  price: number;
  savedDate: string;
  note?: string;
}
export interface FavouriteCategory {
  
  
  name: DestinationCategory;
  
  count: number;
}