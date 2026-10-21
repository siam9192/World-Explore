import type { Metadata } from "next";
import categories from "../../../../public/json/categories.json";
import destinations from "../../../../public/json/destinations.json";
import DestinationsPageContent from "./destinations-page-content";

export const metadata: Metadata = {
  title: "Destinations | WorldExplore Admin",
  description: "Manage destinations, publishing status, and travel guides.",
};

export default function AdminDestinationsPage() {
  return (
    <DestinationsPageContent
      destinations={destinations}
      categories={categories.map((category) => category.name)}
    />
  );
}
