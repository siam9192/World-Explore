import type { Metadata } from "next";
import categories from "../../../../public/json/categories.json";
import CategoriesPageContent from "./categories-page-content";

export const metadata: Metadata = {
  title: "Categories | WorldExplore Admin",
  description: "Manage WorldExplore destination categories.",
};

export default function AdminCategoriesPage() {
  return (
    <CategoriesPageContent categories={categories} />
  );
}
