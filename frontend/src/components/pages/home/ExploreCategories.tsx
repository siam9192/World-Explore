import Image from "next/image";

import { ArrowUpRight } from "lucide-react";
import Container from "@/components/layout/Container";
import CategoryCard from "@/components/common/CategoryCard";
import { getCategories } from "@/services/category.service";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  count: number;
  image: string;
  slug: string;
}


const ExploreCategories = async () => {
  const categories = await getCategories()
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
          <CategoryCard key={category.id} category={category}/>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ExploreCategories;
