import React from 'react'
import Link from "next/link";
import { Category } from '@/types/category.type';
import Image from 'next/image';
interface Props {
    category:Category
}
function CategoryCard({category}:Props) {
  return (
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
  )
}

export default CategoryCard