import ExploreCategories from "@/components/pages/home/ExploreCategories";
import Hero from "@/components/pages/home/Hero";
import PopularDestinations from "@/components/pages/home/PopularDestinations";
import PostCard from "@/components/pages/home/PostCard";
import RecentlyAdded from "@/components/pages/home/RecentlyAdded";
import Specialties from "@/components/pages/home/Specialties";
import TravellerReviews from "@/components/pages/home/TravellerReviews";
import TrendingPlaces from "@/components/pages/home/TrendingPlaces";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Specialties/>
      <PopularDestinations/>
      <TrendingPlaces/>
      <ExploreCategories/>
      <RecentlyAdded/>
      <TravellerReviews/>
      <PostCard/>
    </div>
  );
}
