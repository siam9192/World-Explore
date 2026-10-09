
import Container from "@/components/layout/Container";
import RecommendedDestinations from "@/components/pages/explore/RecommendedDestinations";
import { Review } from "@/types/review.type";
import {
  ArrowRight,
  Bike,
  Calendar,
  CheckCircle2,
  Coffee,
  Dot,
  Heart,
  Languages,
  MapPin,
  Navigation,
  Share2,
  Star,
  ThumbsUp,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ExploreReviews from "./ExploreReviews";
import { Activity, DestinationDetails } from "@/types/destination.type";

/* =========================================================
   TYPES
========================================================= */


/* =========================================================
   MOCK DATA
========================================================= */


export const destination: DestinationDetails = {
  id: "destination-001",
  title: "Kyoto",
  slug: "kyoto",
  tagline: "Seventeen centuries of quiet beauty",

  images: [
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186",
    "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36",
    "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    "https://images.unsplash.com/photo-1513407030348-c983a97b98d8",
  ],

  categories: ["Cultural", "Historical", "City", "Nature"],
  badge: "Editor's Pick",
  isFavorite: false,

  rating: 4.8,
  totalReviews: 3124,

  description:
    "Kyoto is a city where Japan's past and present exist in remarkable harmony. Once the imperial capital of Japan for more than a thousand years, it remains one of the country's most treasured cultural destinations. Ancient temples rise above quiet gardens, wooden machiya houses line narrow streets, and traditional tea houses preserve rituals passed down through generations. Beyond its famous landmarks, Kyoto rewards travelers who slow down and explore its smaller neighborhoods, hidden courtyards, local markets, and peaceful riverside paths. From the glowing red gates of Fushimi Inari Taisha to the bamboo groves of Arashiyama, every corner offers a different perspective on Japanese culture and craftsmanship.",

  shortDescription:
    "Discover ancient temples, peaceful Zen gardens, traditional tea houses, and charming streets in Japan's former imperial capital.",

  editorNote:
    "Kyoto is best experienced without rushing. Visit its most famous temples early in the morning, spend an afternoon wandering through traditional neighborhoods, and leave room in your itinerary for an unexpected tea house or quiet garden. Spring brings delicate cherry blossoms, while autumn transforms the surrounding hills into a landscape of vivid red and gold. For a more personal experience, explore beyond the main tourist streets and discover the everyday rhythm of local life.",

  price: {
    amount: 130,
    currency: "USD",
    period: "per person / day",
  },

  guideVerified: true,
  bestTime: "March–May · October–November",

  dailyBudget: {
    min: 80,
    max: 180,
    currency: "USD",
  },

  idealTrip: "4–5 days",

  gettingAround: [
    "Train",
    "City Bus",
    "Bicycle",
    "Walking",
    "Taxi",
  ],

  languages: [
    "Japanese",
    "English",
  ],

  highlights: [
    {
      label: "Best Time",
      value: "March–May · October–November",
      icon: "calendar",
    },
    {
      label: "Ideal Duration",
      value: "4–5 days",
      icon: "clock",
    },
    {
      label: "Daily Budget",
      value: "$80–$180",
      icon: "wallet",
    },
    {
      label: "Language",
      value: "Japanese",
      icon: "languages",
    },
    {
      label: "Travel Style",
      value: "Culture & History",
      icon: "landmark",
    },
    {
      label: "Getting Around",
      value: "Train & Walking",
      icon: "train",
    },
    {
      label: "Known For",
      value: "Temples & Gardens",
      icon: "flower-2",
    },
    {
      label: "Travel Difficulty",
      value: "Easy to Moderate",
      icon: "footprints",
    },
  ],

  activities: [
    {
      title: "Sunrise at Fushimi Inari",
      duration: "2–3 hours",
      price: 0,
      isFree: true,
      currency: "USD",
      icon: "navigation",
    },
    {
      title: "Explore Arashiyama Bamboo Grove",
      duration: "2–3 hours",
      price: 0,
      isFree: true,
      currency: "USD",
      icon: "trees",
    },
    {
      title: "Visit Kinkaku-ji Golden Pavilion",
      duration: "1–2 hours",
      price: 3,
      isFree: false,
      currency: "USD",
      icon: "landmark",
    },
    {
      title: "Walk Through Gion District",
      duration: "2 hours",
      price: 0,
      isFree: true,
      currency: "USD",
      icon: "footprints",
    },
    {
      title: "Traditional Japanese Tea Ceremony",
      duration: "45–90 minutes",
      price: 30,
      isFree: false,
      currency: "USD",
      icon: "coffee",
    },
    {
      title: "Explore Nishiki Market",
      duration: "1–2 hours",
      price: 15,
      isFree: false,
      currency: "USD",
      icon: "utensils",
    },
    {
      title: "Discover Kiyomizu-dera Temple",
      duration: "2 hours",
      price: 3,
      isFree: false,
      currency: "USD",
      icon: "landmark",
    },
    {
      title: "Walk Along the Philosopher's Path",
      duration: "1–2 hours",
      price: 0,
      isFree: true,
      currency: "USD",
      icon: "route",
    },
    {
      title: "Visit Nijo Castle",
      duration: "2–3 hours",
      price: 8,
      isFree: false,
      currency: "USD",
      icon: "castle",
    },
    {
      title: "Enjoy a Riverside Evening",
      duration: "1–2 hours",
      price: 0,
      isFree: true,
      currency: "USD",
      icon: "waves",
    },
    {
      title: "Explore Kyoto Imperial Palace Park",
      duration: "1–2 hours",
      price: 0,
      isFree: true,
      currency: "USD",
      icon: "trees",
    },
    {
      title: "Try a Traditional Kaiseki Dinner",
      duration: "2 hours",
      price: 70,
      isFree: false,
      currency: "USD",
      icon: "utensils",
    },
  ],

  location: {
    city: "Kyoto",
    state: "Kansai",
    country: "Japan",
    address: "Higashiyama Ward, Kyoto, Japan",
    description:
      "Kyoto is located in the Kansai region of Japan, surrounded by forested mountains and connected to major cities by an efficient railway network. Its historic districts, temples, gardens, and traditional streets are spread throughout the city. Kyoto Station serves as a major transportation hub, making it convenient to arrive by train from Osaka, Tokyo, and other Japanese cities.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Kyoto+Japan",
  },

  reviews: [
    {
      id: "review-001",
      name: "Emily Carter",
      location: "London, United Kingdom",
      rating: 5,
      text:
        "Kyoto was the highlight of our trip to Japan. We started our mornings early and visited the temples before the crowds arrived. The atmosphere at Fushimi Inari was unforgettable, and the small streets around Gion felt like stepping into another time. I would recommend staying at least four days to appreciate the city properly.",
      image: "https://i.pravatar.cc/150?img=47",
      date: "2026-09-12",
      helpfulCount: 42,
    },
    {
      id: "review-002",
      name: "Daniel Wilson",
      location: "Toronto, Canada",
      rating: 5,
      text:
        "A beautiful destination with so much history and culture. The Golden Pavilion was stunning, but my favorite experience was simply walking beside the river in the evening. Public transportation was easy to understand, and there were plenty of restaurants for different budgets. Comfortable walking shoes are essential.",
      image: "https://i.pravatar.cc/150?img=12",
      date: "2026-08-28",
      helpfulCount: 35,
    },
    {
      id: "review-003",
      name: "Sofia Martinez",
      location: "Madrid, Spain",
      rating: 4,
      text:
        "Kyoto is incredibly photogenic, especially during autumn. Some of the famous attractions were crowded in the middle of the day, so I recommend visiting popular places early. We discovered a small tea house near a quiet temple and ended up spending almost two hours there. It became one of our favorite memories.",
      image: "https://i.pravatar.cc/150?img=44",
      date: "2026-07-19",
      helpfulCount: 28,
    },
    {
      id: "review-004",
      name: "Oliver Thompson",
      location: "Melbourne, Australia",
      rating: 5,
      text:
        "The balance between modern city life and traditional Japanese culture is remarkable. We enjoyed the food markets, historic neighborhoods, and peaceful gardens. The bus system can feel busy at peak times, but trains are convenient for many destinations. I would happily return for another visit.",
      image: "https://i.pravatar.cc/150?img=53",
      date: "2026-06-30",
      helpfulCount: 31,
    },
    {
      id: "review-005",
      name: "Aisha Rahman",
      location: "Kuala Lumpur, Malaysia",
      rating: 5,
      text:
        "I loved how every neighborhood had a different character. Arashiyama was beautiful in the morning, and Nishiki Market was perfect for trying local snacks. Some attractions require entrance fees, but many memorable walks and outdoor experiences are free. Kyoto is a wonderful destination for travelers who enjoy culture, architecture, and photography.",
      image: "https://i.pravatar.cc/150?img=49",
      date: "2026-05-21",
      helpfulCount: 24,
    },
    {
      id: "review-006",
      name: "Lucas Bernard",
      location: "Paris, France",
      rating: 4,
      text:
        "We spent five days in Kyoto and still had places left to explore. The temples and gardens were beautiful, and the local cuisine was a highlight. My suggestion is to group attractions by neighborhood rather than traveling across the city several times in one day. This makes the trip more relaxing and saves time.",
      image: "https://i.pravatar.cc/150?img=60",
      date: "2026-04-15",
      helpfulCount: 19,
    },
    {
      id: "review-007",
      name: "Grace Kim",
      location: "Seoul, South Korea",
      rating: 5,
      text:
        "Kyoto has a peaceful atmosphere that is difficult to describe. We enjoyed the traditional architecture, little craft shops, and quiet gardens tucked away from the main streets. The tea ceremony was especially memorable because our host explained the meaning behind each step. I recommend booking popular experiences in advance.",
      image: "https://i.pravatar.cc/150?img=45",
      date: "2026-03-08",
      helpfulCount: 37,
    },
    {
      id: "review-008",
      name: "Noah Williams",
      location: "New York, United States",
      rating: 5,
      text:
        "Kyoto was easy to explore independently, even though it was my first visit to Japan. Signs at major stations were helpful, and translation apps made ordering food much easier. The city is especially enjoyable when you leave time between attractions instead of following a packed schedule. The evening streets around the historic districts were lovely.",
      image: "https://i.pravatar.cc/150?img=15",
      date: "2026-02-17",
      helpfulCount: 21,
    },
  ],

  createdAt: "2025-11-12T09:00:00.000Z",
  updatedAt: "2026-09-20T14:30:00.000Z",
};


/* =========================================================
   REUSABLE COMPONENTS
========================================================= */


function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  const icons = {
    calendar: Calendar,
    wallet: Wallet,
    languages: Languages,
  };

  const Icon =
    icons[icon as keyof typeof icons] ?? Calendar;

  return (
    <div className="flex items-center gap-3 rounded-medium border border-border bg-surface p-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-small bg-soft text-primary">
        <Icon size={19} />
      </div>

      <div className="min-w-0">
        <p className="text-extra-small text-muted-foreground">
          {label}
        </p>

        <p className="mt-0.5 truncate text-small font-semibold text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}

function ActivityCard({ activity }: { activity: Activity}) {
  const icons = {
    navigation: Navigation,
    coffee: Coffee,
    bike: Bike,
  };

  const Icon =
    icons[activity.icon as keyof typeof icons] ?? Navigation;

  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: activity.currency,
    maximumFractionDigits: 0,
  }).format(activity.price);

  return (
    <article className="flex items-center gap-3 rounded-medium border border-border bg-surface p-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-small bg-accent-soft text-accent">
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-small font-semibold">
          {activity.title}
        </h3>

        <p className="mt-0.5 text-extra-small text-muted-foreground">
          {activity.duration} ·{" "}
          {activity.isFree ? "Free" : price}
        </p>
      </div>
    </article>
  );
}


/* =========================================================
   DESTINATION HEADER
========================================================= */

function DestinationHeader({
  destination,
}: {
  destination: DestinationDetails;
}) {
  return (
    <section>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-extra-small text-muted-foreground">
            Home / {destination.location.country} /{" "}
            <span className="font-medium text-foreground">
              {destination.title}
            </span>
          </p>

          <h1 className="mt-2 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-extra-gigantic">
            {destination.title}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin size={15} />
              <span>
                {[destination.location.state, destination.location.country]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>

            <Dot size={16} />

            <div className="flex items-center gap-1.5">
              <Star
                size={15}
                className="fill-accent text-accent"
              />

              <span>
                <strong className="font-semibold text-foreground">
                  {destination.rating.toFixed(1)}
                </strong>{" "}
                ({destination.totalReviews.toLocaleString()} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            // onClick={() => {
            //   if (typeof navigator !== "undefined" && navigator.share) {
            //     void navigator.share({
            //       title: destination.title,
            //       url: window.location.href,
            //     });
            //   } else if (typeof navigator !== "undefined") {
            //     void navigator.clipboard?.writeText(
            //       window.location.href,
            //     );
            //   }
            // }}
            className="flex h-10 items-center justify-center gap-2 rounded-small border border-border bg-surface px-4 text-small font-medium transition-colors hover:bg-muted"
          >
            <Share2 size={16} />
            Share
          </button>

          <button
            type="button"
            className="flex h-10 items-center justify-center gap-2 rounded-small bg-favorite px-4 text-small font-medium text-white transition-opacity hover:opacity-90"
          >
            <Heart size={16} />
            Save destination
          </button>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DESTINATION GALLERY
========================================================= */

function DestinationGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  return (
    <section className="mt-7 md:mt-9">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-4">
        <div className="relative h-[320px] overflow-hidden rounded-large sm:h-[420px] md:col-span-4 md:h-[500px]">
          <Image
            src={images[0]}
            alt={`${title} destination`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          />

          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-small bg-black/60 px-3 py-2 text-white backdrop-blur-sm">
            <CameraIcon />
            <span className="text-extra-small font-medium">
              {title} · Destination gallery
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:col-span-2 md:grid-cols-1 md:gap-4">
          {images.slice(1, 3).map((image, index) => (
            <div
              key={image}
              className="relative h-[220px] overflow-hidden rounded-large sm:h-[280px] md:h-[242px]"
            >
              <Image
                src={image}
                alt={`${title} gallery photo ${index + 2}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.02]"
              />

              {index === 1 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                  <span className="rounded-small border border-white/30 bg-black/40 px-4 py-2 text-extra-small font-medium text-white backdrop-blur-sm">
                    View gallery
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CameraIcon() {
  return (
    <span aria-hidden="true" className="text-sm">
      📷
    </span>
  );
}

/* =========================================================
   DESTINATION OVERVIEW
========================================================= */

function DestinationOverview({
  destination,
}: {
  destination: DestinationDetails;
}) {
  return (
    <section>
      <div className="flex flex-wrap items-center gap-2">
        {destination.categories.map((category) => (
          <span
            key={category}
            className="rounded-small bg-soft px-2 py-1 text-extra-small font-semibold text-primary"
          >
            {category}
          </span>
        ))}
      </div>

      <h2 className="mt-3 font-heading text-extra-huge font-bold leading-tight text-foreground">
        {destination.tagline}
      </h2>

      <p className="mt-3 max-w-3xl text-small leading-7 text-foreground/80">
        {destination.description}
      </p>

      <p className="mt-4 max-w-3xl text-small leading-7 text-muted-foreground">
        {destination.editorNote}
      </p>
    </section>
  );
}

/* =========================================================
   DESTINATION HIGHLIGHTS
========================================================= */

function DestinationHighlights({
  highlights,
}: {
  highlights: DestinationDetails["highlights"];
}) {
  return (
    <section className="mt-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {highlights.map((highlight) => (
          <InfoCard key={highlight.label} {...highlight} />
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   POPULAR ACTIVITIES
========================================================= */

function PopularActivities({
  activities,
}: {
  activities: Activity[];
}) {
  return (
    <section className="mt-10" id="activities">
      <div className="flex items-end justify-between">
        <h2 className="font-heading text-huge font-bold">
          Popular activities
        </h2>

        <Link
          href="#activities"
          className="flex items-center gap-1 text-extra-small font-semibold text-primary"
        >
          View all <ArrowRight size={14} />
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {activities.map((activity) => (
          <ActivityCard key={activity.title} activity={activity} />
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   DESTINATION LOCATION
========================================================= */

function DestinationLocation({
  location,
}: {
  location: DestinationDetails["location"];
}) {
  return (
    <section className="mt-6">
      <div className="rounded-medium border border-border bg-surface p-4">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-small bg-soft text-primary">
            <MapPin size={18} />
          </div>

          <div className="min-w-0">
            <p className="text-small font-semibold">
              {location.address}
            </p>

            <p className="mt-1 text-extra-small text-muted-foreground">
              {location.description}
            </p>

            {location.mapUrl && (
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-extra-small font-semibold text-primary"
              >
                Open in maps <ArrowRight size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DESTINATION REVIEWS
========================================================= */


/* =========================================================
   DESTINATION SIDEBAR
========================================================= */

function DestinationSidebar({
  destination,
}: {
  destination: DestinationDetails;
}) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: destination.dailyBudget.currency,
      maximumFractionDigits: 0,
    }).format(amount);

  const details = [
    {
      label: "Best time",
      value: destination.bestTime,
    },
    {
      label: "Daily budget",
      value: `${formatCurrency(destination.dailyBudget.min)} – ${formatCurrency(destination.dailyBudget.max)}`,
    },
    {
      label: "Ideal trip",
      value: destination.idealTrip,
    },
    {
      label: "Getting around",
      value: destination.gettingAround.join(" · "),
    },
  ];

  return (
    <aside className="lg:col-span-2">
      <div className="sticky top-6 rounded-large border border-border bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2 border-b border-border pb-3">
          <div className="flex items-center gap-1.5">
            <Star
              size={15}
              className="fill-accent text-accent"
            />

            <span className="text-small font-semibold">
              {destination.rating.toFixed(1)}
            </span>

            <span className="text-extra-small text-muted-foreground">
              ({destination.totalReviews.toLocaleString()})
            </span>
          </div>

          {destination.guideVerified && (
            <div className="flex items-center gap-1 text-extra-small font-medium text-primary">
              <CheckCircle2 size={13} />
              Verified guide
            </div>
          )}
        </div>

        <div className="space-y-3 py-4">
          {details.map((item) => (
            <div
              key={item.label}
              className="flex justify-between gap-4 text-extra-small"
            >
              <span className="text-muted-foreground">
                {item.label}
              </span>

              <span className="text-right font-semibold">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <button
            type="button"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-small bg-favorite text-extra-small font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Heart size={14} />
            Save to favourites
          </button>

          <button
            type="button"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-small bg-primary text-extra-small font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Plan this trip
            <ArrowRight size={14} />
          </button>
        </div>

        <p className="mt-3 text-center text-[10px] text-muted-foreground">
          Free to save · Updated weekly
        </p>
      </div>
    </aside>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Page() {
  return (
    <main>
      <Container className="py-8 lg:py-12">
        {/* Header */}
        <DestinationHeader destination={destination} />

        {/* Gallery */}
        <DestinationGallery
          images={destination.images}
          title={destination.title}
        />

        {/* Main content and sidebar */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-6 lg:gap-10">
          <div className="min-w-0 lg:col-span-4">
            {/* Overview */}
            <DestinationOverview destination={destination} />

            {/* Highlights */}
            <DestinationHighlights
              highlights={destination.highlights}
            />

            {/* Activities */}
            <PopularActivities
              activities={destination.activities}
            />

            {/* Location */}
            <DestinationLocation
              location={destination.location}
            />

            {/* Reviews */}
            <ExploreReviews
              rating={destination.rating}
              totalReviews={destination.totalReviews}
              reviews={destination.reviews}
            />
          </div>

          {/* Sidebar */}
          <DestinationSidebar destination={destination} />
        </div>

        {/* Recommended destinations */}
        <RecommendedDestinations />
      </Container>
    </main>
  );
}

