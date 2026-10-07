"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import Container from "@/components/layout/Container";
const reviews = [
  {
    rating: "5.0",
    reviews: "14 reviews",
    text: `"The Kyoto guide alone was worth it — hidden kitasen, damn at Fushimi, zero crowds. Felt like travelling with a local friend."`,
    name: "Amara Osei",
    location: "Lagos, Nigeria",
    count: "14 reviews",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400",
  },
  {
    rating: "5.0",
    reviews: "9 reviews",
    text: `"Planned our entire Amalfi honeymoon from one page. Costs were honest, the activities list was perfect, reviews never missed."`,
    name: "Daniel Reyes",
    location: "Austin, USA",
    count: "9 reviews",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
  },
  {
    rating: "5.0",
    reviews: "22 reviews",
    text: `"As a photographer, the field notes and best-time guidance are unmatched. Banff in October — exactly as promised."`,
    name: "Yuki Tanaka",
    location: "Osaka, Japan",
    count: "22 reviews",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  },
];

export default function TravellerReviews() {
  return (
  <section className="py-10 sm:py-12 lg:py-14">
  <Container>
    {/* Header */}
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-primary sm:mb-2 sm:text-extra-small sm:tracking-[0.22em]">
          Chapter 05 — Traveller Letters
        </p>

        <h2 className="font-serif text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-gigantic">
          Loved by curious travellers
        </h2>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 text-[10px] text-muted-foreground sm:pb-1 sm:text-small">
        <Star size={10} fill="currentColor" strokeWidth={1.5} className="shrink-0 text-accent" />
        <span className="font-semibold">4.8</span>
        <span>(86k reviews)</span>
      </div>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 gap-3.5 sm:gap-4 md:grid-cols-3">
      {reviews.map((review) => (
        <article key={review.name} className="flex min-h-0 flex-col rounded-medium border border-border bg-surface px-4 py-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)] sm:min-h-[170px] sm:px-4 sm:py-4 lg:min-h-[160px] lg:px-4 max-w-sm">
          {/* Rating */}
          <div className="mb-2.5 flex items-center gap-1.5 text-[9px] sm:mb-3">
            <Star size={10} fill="currentColor" strokeWidth={1.5} className="shrink-0 text-accent" />

            <span className="font-medium text-muted-foreground">
              {review.rating}
            </span>

            <span className="text-muted-foreground font-medium">
              ({review.reviews})
            </span>
          </div>

          {/* Review */}
          <p className="flex-1 font-serif text-sm font-medium leading-[1.65] text-foreground sm:text-base lg:text-large">
            {review.text}
          </p>

          {/* Divider */}
          <div className="my-3 h-px w-full shrink-0 bg-border" />

          {/* User */}
          <div className="flex min-w-0 items-center gap-2">
            <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-slate-200 sm:h-8 sm:w-8">
              <Image src={review.image} alt={review.name} fill sizes="32px" className="object-cover" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[9px] font-semibold text-muted-foreground sm:text-extra-small">
                {review.name}
              </p>

              <p className="truncate text-[8px] text-slate-400 sm:text-[10px]">
                {review.location} · {review.count}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  </Container>
</section>
  );
}
