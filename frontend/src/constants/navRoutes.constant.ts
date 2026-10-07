import {
  Menu,
  X,
  Home,
  Compass,
  Tags,
  BookOpen,
  Info,
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
