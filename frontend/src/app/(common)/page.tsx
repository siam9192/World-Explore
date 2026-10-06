import Hero from "@/components/pages/home/Hero";
import PopularDestinations from "@/components/pages/home/PopularDestinations";
import Specialties from "@/components/pages/home/Specialties";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Specialties/>
      <PopularDestinations/>
    </div>
  );
}
