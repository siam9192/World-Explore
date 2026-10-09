import ReviewCard from "@/components/common/ReviewCard";
import { Review } from "@/types/review.type";
import { Star } from "lucide-react";



function RatingStars({
  rating = 5,
  size = 12,
}: {
  rating?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={size}
          className={
            index < Math.round(rating)
              ? "fill-accent text-accent"
              : "text-border"
          }
        />
      ))}
    </div>
  );
}

export default function ExploreReviews({
  rating,
  totalReviews,
  reviews,
}: {
  rating: number;
  totalReviews: number;
  reviews: Review[];
}) {

    
const ratingDistribution = [
  { rating: 5, percentage: 88 },
  { rating: 4, percentage: 8 },
  { rating: 3, percentage: 3 },
  { rating: 2, percentage: 1 },
  { rating: 1, percentage: 0.5 },
];


  return (
    <section className="mt-10" id="reviews">
      <div className="flex items-end justify-between gap-3">
        <h2 className="font-heading text-huge font-bold">
          Reviews ({totalReviews.toLocaleString()})
        </h2>

        <button
          type="button"
          className="shrink-0 rounded-small bg-primary px-3 py-2 text-extra-small font-semibold text-primary-foreground"
        >
          Write a review
        </button>
      </div>

      <div className="mt-4 rounded-medium border border-border bg-surface p-4">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-[100px_1fr]">
          <div>
            <p className="font-heading text-4xl font-bold">
              {rating.toFixed(1)}
            </p>

            <div className="mt-1">
              <RatingStars rating={rating} size={13} />
            </div>

            <p className="mt-1 text-[10px] text-muted-foreground">
              {totalReviews.toLocaleString()} reviews
            </p>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div
                key={item.rating}
                className="flex items-center gap-2"
              >
                <span className="flex w-8 items-center gap-1 text-small">
                  {item.rating}
                  <Star size={12} />
                </span>

                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>

                <span className="w-10 text-right font-mono text-extra-small">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-medium border border-border bg-surface px-4 py-2 text-extra-small font-semibold text-foreground hover:bg-muted"
      >
        Load all {totalReviews.toLocaleString()} reviews
      </button>
    </section>
  );
}