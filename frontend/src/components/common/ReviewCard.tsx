import { Review } from "@/types/review.type";
import { Star, ThumbsUp } from "lucide-react";
import Image from "next/image";

export default function ReviewCard({
  review,
}: {
  review: Review;
}) {
  return (
    <article className="flex min-h-[170px] flex-col rounded-medium border border-border bg-surface p-4">
      <div className="mb-3 flex items-center gap-1.5">
        <Star
          size={15}
          className="fill-accent text-accent"
        />

        <span className="text-extra-small font-semibold">
          {review.rating.toFixed(1)}
        </span>
      </div>

      <p className="flex-1 text-extra-small font-medium leading-[1.65] text-foreground">
        {review.text}
      </p>

      <div className="my-3 h-px w-full bg-border" />

      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className="relative size-8 shrink-0 overflow-hidden rounded-full bg-muted">
            <Image
              src={review.image}
              alt={review.name}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-extra-small font-semibold">
              {review.name}
            </p>

            <p className="truncate text-[10px] text-muted-foreground">
              {review.location} · {review.date}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label={`Mark ${review.name}'s review helpful`}
          className="flex shrink-0 items-center gap-1.5 text-extra-small text-muted-foreground hover:text-primary"
        >
          <ThumbsUp size={14} />
          {review.helpfulCount}
        </button>
      </div>
    </article>
  );
}