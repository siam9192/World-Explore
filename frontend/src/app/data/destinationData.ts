import { Destination } from "../types/destinationType";
import place_image from "../../../public/positano.jpg"
export const destinations: Destination[] = [
  {
    id: 1,
    name: "Santorini",
    image: place_image,
    category: "Europe",
    location: "Oia, Greece",
    rating: 4.9,
    reviews: "2.4k",
    price: 145,
    savedDate: "Oct 12",
    note: "Notes added",
  },

  {
    id: 2,
    name: "Kyoto",
    image:place_image,
    category: "Asia",
    location: "Kansai, Japan",
    rating: 4.8,
    reviews: "3.1k",
    price: 120,
    savedDate: "Oct 8",
    note: "Trip: Japan spring",
  },

  {
    id: 3,
    name: "Banff",
    image:place_image,
    category: "Americas",
    location: "Alberta, Canada",
    rating: 4.9,
    reviews: "3.8k",
    price: 150,
    savedDate: "Sep 30",
    note: "Trip: Rockies",
  },

  {
    id: 4,
    name: "Bali",
    image:place_image,
    category: "Asia",
    location: "Bali, Indonesia",
    rating: 4.7,
    reviews: "4.2k",
    price: 110,
    savedDate: "Sep 20",
  },

  {
    id: 5,
    name: "Paris",
    image:place_image,
    category: "Europe",
    location: "Paris, France",
    rating: 4.8,
    reviews: "5.1k",
    price: 180,
    savedDate: "Sep 15",
  },
];