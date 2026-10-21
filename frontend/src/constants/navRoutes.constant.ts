import {
  Home,
  Compass,
  Tags,
  BookOpen,
  Info,
  Heart,
} from "lucide-react";

export const navRoutes = [
  {
    label: "Home",
    path: "/",
    icon: Home,
  },
  {
    label: "Explore",
    path: "/explore",
    icon: Compass,
  },
  {
    label: "Categories",
    path: "/categories",
    icon: Tags,
  },
  {
    label: "Favourites",
    path: "/favourites",
    icon: Heart,
  },
  {
    label: "Journal",
    path: "/journal",
    icon: BookOpen,
  },
  {
    label: "About",
    path: "/about",
    icon: Info,
  },
];
