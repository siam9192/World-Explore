"use client";

import { useMemo, useState } from "react";
import {
  Check,
  ChevronRight,
  ShieldCheck,
  Star,
  Trash2,
  X,
} from "lucide-react";

type ReviewStatus = "Published" | "Flagged";
type ReviewFilter = "All" | "Flagged" | "Published";

interface ModerationReview {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  destination: string;
  destinationSlug: string;
  date: string;
  rating: number;
  status: ReviewStatus;
  text: string;
  flagReason?: string;
}

const initialReviews: ModerationReview[] = [
  {
    id: "review-1",
    name: "Maya Lindqvist",
    initials: "ML",
    avatarColor: "bg-rose-100 text-rose-700",
    destination: "Banff, Canada",
    destinationSlug: "banff-canada",
    date: "Oct 4",
    rating: 5,
    status: "Published",
    text: "Banff in October is pure gold — empty trails, perfect light. Cost guide spot on.",
  },
  {
    id: "review-2",
    name: "Jonas Weber",
    initials: "JW",
    avatarColor: "bg-emerald-100 text-emerald-700",
    destination: "Santorini, Greece",
    destinationSlug: "santorini-greece",
    date: "Oct 3",
    rating: 4,
    status: "Published",
    text: "Beautiful but crowded in August. Ferry tip saved us two hours of queues.",
  },
  {
    id: "review-3",
    name: "Guest_2291",
    initials: "G",
    avatarColor: "bg-amber-100 text-amber-800",
    destination: "Bali, Indonesia",
    destinationSlug: "bali-indonesia",
    date: "Oct 2",
    rating: 1,
    status: "Flagged",
    text: "CHEAP DEAL click here for huge discount!!! Best price guarantee...",
    flagReason: "Auto-flagged: spam pattern · 3 user reports",
  },
  {
    id: "review-4",
    name: "Priya Nair",
    initials: "PN",
    avatarColor: "bg-orange-100 text-orange-700",
    destination: "Kyoto, Japan",
    destinationSlug: "kyoto-japan",
    date: "Oct 1",
    rating: 5,
    status: "Published",
    text: "Tea ceremony booking through the guide was seamless. Gion at night is magic.",
  },
];

const filters: ReviewFilter[] = ["All", "Flagged", "Published"];

export default function ReviewsPageContent() {
  const [reviews, setReviews] = useState(initialReviews);
  const [filter, setFilter] = useState<ReviewFilter>("All");
  const [selectedReview, setSelectedReview] =
    useState<ModerationReview | null>(null);

  const flaggedCount = reviews.filter(
    (review) => review.status === "Flagged",
  ).length;
  const publishedCount = reviews.filter(
    (review) => review.status === "Published",
  ).length;

  const visibleReviews = useMemo(
    () =>
      filter === "All"
        ? reviews
        : reviews.filter((review) => review.status === filter),
    [filter, reviews],
  );

  function updateReviewStatus(id: string, status: ReviewStatus) {
    setReviews((current) =>
      current.map((review) =>
        review.id === id
          ? {
              ...review,
              status,
              flagReason: status === "Flagged" ? review.flagReason : undefined,
            }
          : review,
      ),
    );
    setSelectedReview(null);
  }

  function deleteReview(review: ModerationReview) {
    if (!window.confirm(`Delete the review from ${review.name}?`)) return;
    setReviews((current) => current.filter((item) => item.id !== review.id));
    setSelectedReview(null);
  }

  function reviewNextFlagged() {
    const nextFlagged = reviews.find((review) => review.status === "Flagged");
    if (nextFlagged) {
      setFilter("Flagged");
      setSelectedReview(nextFlagged);
    }
  }

  return (
    <div className="min-h-screen">
      <header className="flex min-h-[68px] flex-wrap items-center justify-between gap-3 border-b border-[#eae7e3] bg-white px-4 py-3 sm:px-6">
        <div>
          <h1 className="font-heading text-lg font-bold leading-tight">
            Reviews
          </h1>
          <p className="mt-0.5 text-[10px] text-stone-500">
            86,402 total · {flaggedCount} flagged for moderation
          </p>
        </div>
        <div
          className="flex items-center gap-1 rounded-lg border border-stone-200 bg-white p-1"
          aria-label="Filter reviews"
        >
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
              className={`rounded-md px-2.5 py-1.5 text-[9px] font-semibold transition ${
                filter === item
                  ? "bg-[#211e1b] text-white"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              {item}
              {item === "Flagged" && (
                <span className="ml-1">({flaggedCount})</span>
              )}
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-3 p-3 sm:p-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.85fr)]">
        <section aria-label={`${filter} reviews`} className="space-y-2.5">
          {visibleReviews.map((review) => (
            <article
              key={review.id}
              className={`rounded-lg border bg-white p-3 ${
                review.status === "Flagged"
                  ? "border-rose-200"
                  : "border-[#eae7e3]"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[9px] font-bold ${review.avatarColor}`}
                >
                  {review.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-1 text-[9px]">
                    <span className="font-bold text-stone-800">
                      {review.name}
                    </span>
                    <span className="text-stone-400">➜</span>
                    <span className="text-stone-600">
                      {review.destination}
                    </span>
                    <span className="ml-auto">
                      <StatusBadge status={review.status} />
                    </span>
                  </div>
                  <p className="mt-0.5 text-[8px] text-stone-500">
                    {review.date} · ★ {review.rating.toFixed(1)} · 5.0
                  </p>
                </div>
              </div>

              <p className="mt-2 text-[10px] leading-relaxed text-stone-800">
                “{review.text}”
              </p>

              {review.flagReason && review.status === "Flagged" && (
                <div className="mt-2 rounded-sm bg-amber-50 px-2 py-1.5 text-[9px] font-medium text-amber-700">
                  <span aria-hidden="true">⚠ </span>
                  {review.flagReason}
                </div>
              )}

              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                {review.status === "Flagged" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateReviewStatus(review.id, "Published")
                    }
                    className="flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1.5 text-[9px] font-semibold text-white transition hover:bg-emerald-700"
                  >
                    <Check size={11} />
                    Approve
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => deleteReview(review)}
                  className="flex items-center gap-1 rounded-md border border-stone-200 px-2.5 py-1.5 text-[9px] font-semibold text-rose-600 transition hover:border-rose-200 hover:bg-rose-50"
                >
                  <Trash2 size={10} />
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedReview(review)}
                  className="rounded-md border border-stone-200 px-2.5 py-1.5 text-[9px] font-semibold text-stone-700 transition hover:bg-stone-50"
                >
                  {review.status === "Flagged" ? "View user" : "View destination"}
                </button>
              </div>
            </article>
          ))}

          {visibleReviews.length === 0 && (
            <div className="rounded-lg border border-[#eae7e3] bg-white px-4 py-12 text-center">
              <p className="text-xs font-semibold text-stone-700">
                No {filter.toLowerCase()} reviews
              </p>
              <p className="mt-1 text-[10px] text-stone-500">
                Try another filter to see more reviews.
              </p>
            </div>
          )}
        </section>

        <aside className="space-y-3">
          <section className="rounded-lg border border-[#eae7e3] bg-white p-3">
            <h2 className="font-heading text-sm font-bold">Moderation health</h2>
            <div className="mt-2 grid grid-cols-3 gap-1.5 text-center">
              <MetricCard label="Flagged" value={String(flaggedCount)} />
              <MetricCard label="This week" value="912" />
              <MetricCard label="Approved" value="98%" />
            </div>
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-[8px]">
                <span className="font-semibold text-stone-700">
                  Auto-filter accuracy
                </span>
                <span className="text-stone-500">94%</span>
              </div>
              <div
                role="progressbar"
                aria-label="Auto-filter accuracy"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={94}
                className="h-1.5 overflow-hidden rounded-full bg-stone-100"
              >
                <div className="h-full w-[94%] rounded-full bg-primary" />
              </div>
            </div>
          </section>

          <section className="flex min-h-[230px] flex-col items-center justify-center rounded-lg border border-[#eae7e3] bg-white px-5 py-7 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-primary">
              <ShieldCheck size={20} />
            </span>
            <h2 className="mt-3 font-heading text-sm font-bold">
              {flaggedCount === 0 ? "Queue clear" : "Queue clear soon"}
            </h2>
            <p className="mt-1 max-w-[220px] text-[9px] leading-relaxed text-stone-500">
              {flaggedCount === 0
                ? "You have no flagged reviews waiting for moderation."
                : `You are ${flaggedCount} review${flaggedCount === 1 ? "" : "s"} away from an empty moderation queue. Nice work.`}
            </p>
            {flaggedCount > 0 && (
              <button
                type="button"
                onClick={reviewNextFlagged}
                className="mt-3 rounded-md bg-primary px-3 py-2 text-[9px] font-semibold text-white transition hover:bg-primary-dark"
              >
                Review next flagged
              </button>
            )}
            {flaggedCount === 0 && (
              <span className="mt-3 inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-700">
                <Check size={11} /> All caught up
              </span>
            )}
          </section>

          <section className="rounded-lg border border-[#eae7e3] bg-white p-3">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-sm font-bold">This queue</h2>
              <span className="text-[9px] text-stone-500">
                {publishedCount} published
              </span>
            </div>
            <button
              type="button"
              onClick={() => setFilter("Flagged")}
              className="mt-2 flex w-full items-center gap-2 rounded-md bg-stone-50 px-2.5 py-2 text-left transition hover:bg-stone-100"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-50 text-amber-700">
                <Star size={12} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-semibold">
                  Flagged for review
                </span>
                <span className="block text-[8px] text-stone-500">
                  Spam reports and community flags
                </span>
              </span>
              <span className="text-[9px] font-bold text-stone-600">
                {flaggedCount}
              </span>
              <ChevronRight size={12} className="text-stone-500" />
            </button>
          </section>
        </aside>
      </div>

      {selectedReview && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedReview(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-detail-title"
            className="w-full max-w-md rounded-xl border border-stone-200 bg-white p-5 shadow-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2
                  id="review-detail-title"
                  className="font-heading text-base font-bold"
                >
                  {selectedReview.name}
                </h2>
                <p className="mt-1 text-[10px] text-stone-500">
                  {selectedReview.destination} · {selectedReview.date}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close review details"
                onClick={() => setSelectedReview(null)}
                className="rounded-md p-1 text-stone-500 hover:bg-stone-100"
              >
                <X size={16} />
              </button>
            </div>
            <div className="mt-4 flex items-center gap-1 text-amber-600">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={13}
                  className={
                    index < selectedReview.rating ? "fill-amber-500" : ""
                  }
                />
              ))}
              <span className="ml-1 text-[10px] font-semibold">
                {selectedReview.rating}.0
              </span>
            </div>
            <p className="mt-3 rounded-md bg-stone-50 p-3 text-xs leading-relaxed text-stone-700">
              “{selectedReview.text}”
            </p>
            {selectedReview.status === "Flagged" && (
              <div className="mt-3 rounded-md bg-amber-50 p-2.5 text-[10px] text-amber-800">
                {selectedReview.flagReason}
              </div>
            )}
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              {selectedReview.status === "Flagged" && (
                <button
                  type="button"
                  onClick={() =>
                    updateReviewStatus(selectedReview.id, "Published")
                  }
                  className="flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-2 text-[10px] font-semibold text-white hover:bg-emerald-700"
                >
                  <Check size={12} /> Approve
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                className="rounded-md border border-stone-200 px-3 py-2 text-[10px] font-semibold text-stone-700 hover:bg-stone-50"
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: Readonly<{ status: ReviewStatus }>) {
  return (
    <span
      className={`rounded-sm px-1.5 py-1 text-[8px] font-semibold ${
        status === "Published"
          ? "bg-emerald-50 text-emerald-700"
          : "border border-rose-200 bg-rose-50 text-rose-700"
      }`}
    >
      {status}
    </span>
  );
}

function MetricCard({
  label,
  value,
}: Readonly<{ label: string; value: string }>) {
  return (
    <div className="rounded-md border border-stone-100 bg-stone-50/70 px-1.5 py-2">
      <p className="font-heading text-base font-bold leading-none">{value}</p>
      <p className="mt-1 text-[8px] text-stone-500">{label}</p>
    </div>
  );
}
