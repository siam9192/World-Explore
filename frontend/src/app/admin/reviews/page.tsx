import type { Metadata } from "next";
import ReviewsPageContent from "./reviews-page-content";

export const metadata: Metadata = {
  title: "Reviews | WorldExplore Admin",
  description: "Moderate traveler reviews for WorldExplore destinations.",
};

export default function AdminReviewsPage() {
  return <ReviewsPageContent />;
}
