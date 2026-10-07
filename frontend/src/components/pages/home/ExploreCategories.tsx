import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/layout/Container";

interface Category {
  id: string;
  name: string;
  count: number;
  image: string;
  slug: string;
}
const categories: Category[] = [
  {
    id: "1",
    name: "Beach",
    count: 128,
    image: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1600",
    slug: "beach",
  },
  {
    id: "2",
    name: "Mountain",
    count: 96,
    image: "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1600",
    slug: "mountain",
  },
  {
    id: "3",
    name: "Historical",
    count: 84,
    image: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1600",
    slug: "historical",
  },
  {
    id: "4",
    name: "City",
    count: 142,
    image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1600",
    slug: "city",
  },
  {
    id: "5",
    name: "Nature",
    count: 110,
    image: "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600",
    slug: "nature",
  },
  {
    id: "6",
    name: "Island",
    count: 76,
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1600",
    slug: "island",
  },
  {
    id: "7",
    name: "Adventure",
    count: 68,
    image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1600",
    slug: "adventure",
  },
  {
    id: "8",
    name: "Cultural",
    count: 92,
    image: "https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1600",
    slug: "cultural",
  },
];

const ExploreCategories = () => {
  return (
    <section className="bg-background py-14 md:py-16">
      <Container>
        {/* Header */}
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
              Chapter 03 — Travel by mood
            </p>

            <h2 className="mt-1 font-heading text-2xl font-bold md:text-3xl">
              Explore by Category
            </h2>
          </div>

          <Link
            href="/categories"
            className="mb-1 flex items-center gap-1 text-[10px] font-medium text-primary transition-opacity hover:opacity-70"
          >
            All categories
            <ArrowUpRight size={12} />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:gap-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative aspect-[1.5/1] overflow-hidden rounded-large"
            >
              {/* Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-3 text-white md:p-3.5">
                <h3 className="font-heading text-sm font-bold md:text-base">
                  {category.name}
                </h3>

                <p className="mt-0.5 text-[9px] text-white/75 md:text-[10px]">
                  {category.count} places
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ExploreCategories;
