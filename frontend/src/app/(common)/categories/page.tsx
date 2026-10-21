import CategoryCard from "@/components/common/CategoryCard";
import Container from "@/components/layout/Container";
import { getCategories } from "@/services/category.service";
import { Compass } from "lucide-react";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen py-12 md:py-16">
      <Container>
        <div className="mb-8">
          <p className="flex items-center gap-2 text-extra-small font-bold uppercase tracking-[0.2em] text-primary">
            <Compass size={15} />
            Find your kind of getaway
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            Explore by category
          </h1>
          <p className="mt-2 max-w-xl text-small leading-relaxed text-muted-foreground">
            From quiet mountain trails to lively city streets, find a
            destination that fits the way you want to travel.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </main>
  );
}
