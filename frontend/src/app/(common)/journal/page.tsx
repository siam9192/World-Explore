
"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "@/components/layout/Container";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  CalendarDays,
  Clock3,
  Compass,
  Mail,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";

const categories = [
  "All stories",
  "Destinations",
  "Travel tips",
  "Culture",
  "Food & drink",
  "Adventure",
];

const articles = [
  {
    id: 1,
    title: "Kyoto in slow motion: Finding beauty in the little things",
    excerpt:
      "Beyond the famous temples and crowded streets lies a quieter Kyoto. Discover moss-covered gardens, neighborhood cafés, and the art of taking your time.",
    category: "Destinations",
    author: "Emma Wilson",
    date: "October 04, 2026",
    readTime: "8 min read",
    location: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1100&q=85",
    featured: true,
  },
  {
    id: 2,
    title: "A little island, a thousand shades of blue",
    excerpt:
      "Whitewashed villages, winding lanes, and sunsets that make you forget to check your phone.",
    category: "Destinations",
    author: "Olivia James",
    date: "September 28, 2026",
    readTime: "6 min read",
    location: "Santorini, Greece",
    image:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    title: "The art of packing light and traveling far",
    excerpt:
      "A practical guide to carrying less, planning smarter, and leaving room for the unexpected.",
    category: "Travel tips",
    author: "Noah Bennett",
    date: "September 22, 2026",
    readTime: "5 min read",
    location: "Travel essentials",
    image:
      "https://images.unsplash.com/photo-1553531384-411a247ccd73?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    title: "Where the mountains teach you to slow down",
    excerpt:
      "Fresh mountain air, winding trails, and tiny villages that remind you what really matters.",
    category: "Adventure",
    author: "Liam Carter",
    date: "September 16, 2026",
    readTime: "7 min read",
    location: "The Swiss Alps",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    title: "A seat at the table: Discovering a city through food",
    excerpt:
      "From bustling markets to family-run kitchens, the most memorable meals often come with a story.",
    category: "Food & drink",
    author: "Amelia Rose",
    date: "September 09, 2026",
    readTime: "6 min read",
    location: "Marrakech, Morocco",
    image:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    title: "The beautiful things you only notice on foot",
    excerpt:
      "Take the scenic route through hidden courtyards, unexpected street art, and everyday local life.",
    category: "Culture",
    author: "Ethan Brooks",
    date: "September 02, 2026",
    readTime: "4 min read",
    location: "Lisbon, Portugal",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    title: "A weekend in the wild: Your first national park escape",
    excerpt:
      "How to plan a refreshing outdoor getaway, from choosing a trail to respecting the landscape.",
    category: "Adventure",
    author: "Mia Thompson",
    date: "August 26, 2026",
    readTime: "7 min read",
    location: "Banff, Canada",
    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56cd1b3?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    title: "Small rituals that make every journey better",
    excerpt:
      "Keep a travel journal, learn a local greeting, and find simple ways to make a new place feel familiar.",
    category: "Travel tips",
    author: "Sophie Clarke",
    date: "August 19, 2026",
    readTime: "5 min read",
    location: "Everywhere",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=85",
  },
];

const editorsPicks = [
  {
    number: "01",
    title: "The places that remind us how big the world is",
    category: "Perspective",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=500&q=85",
  },
  {
    number: "02",
    title: "Why traveling slowly is the new luxury",
    category: "Slow travel",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=500&q=85",
  },
  {
    number: "03",
    title: "The morning markets worth waking up for",
    category: "Local culture",
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=500&q=85",
  },
];

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All stories");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedArticles, setSavedArticles] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "All stories" ||
      article.category === activeCategory;

    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      !query ||
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query) ||
      article.location.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const toggleSaved = (id: number) => {
    setSavedArticles((previous) =>
      previous.includes(id)
        ? previous.filter((articleId) => articleId !== id)
        : [...previous, id],
    );
  };

  const featuredArticle = articles[0];

  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* Journal masthead */}
      <section className="border-b border-border">
        <Container>
          <div className="py-12 text-center sm:py-16 lg:py-20">
            <div className="mb-5 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              <Sparkles size={14} />
              The WorldExplore Journal
            </div>

            <h1 className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl lg:text-8xl">
              Stories from
              <span className="block font-serif italic font-medium text-primary">
                out there.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Travel stories, thoughtful guides, and little discoveries from
              around the world. Made for curious minds and open itineraries.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <Compass size={15} className="text-primary" />
                Field notes from everywhere
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
              <span className="flex items-center gap-2">
                <CalendarDays size={15} className="text-primary" />
                Fresh inspiration
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured story */}
      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="mb-7 flex items-center justify-between">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-7 bg-primary" />
              The cover story
            </p>
            <span className="text-xs text-muted-foreground">
              Editor’s selection · 01
            </span>
          </div>

          <article className="group grid overflow-hidden rounded-2xl border border-border bg-surface lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[300px] overflow-hidden sm:min-h-[420px] lg:min-h-[580px]">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/10" />

              <span className="absolute left-5 top-5 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 sm:left-7 sm:top-7">
                Editor’s pick
              </span>

              <div className="absolute bottom-5 left-5 flex items-center gap-2 text-sm text-white sm:bottom-7 sm:left-7">
                <MapPin size={15} />
                {featuredArticle.location}
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12 xl:p-16">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                <span>{featuredArticle.category}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>Featured story</span>
              </div>

              <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {featuredArticle.title}
              </h2>

              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                {featuredArticle.excerpt}
              </p>

              <div className="mt-7 flex items-center gap-3 border-t border-border pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-serif text-lg italic text-primary">
                  E
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {featuredArticle.author}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {featuredArticle.date}
                  </p>
                </div>
                <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock3 size={14} />
                  {featuredArticle.readTime}
                </span>
              </div>

              <Link
                href={`/journal/${featuredArticle.id}`}
                className="group/link mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Read the story
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover/link:translate-x-1"
                />
              </Link>
            </div>
          </article>
        </Container>
      </section>

      {/* Categories and search */}
      <section className="border-y border-border bg-surface py-7">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition ${
                    activeCategory === category
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:max-w-xs">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search stories..."
                aria-label="Search journal stories"
                className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Article listing + sidebar */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px]">
            <div>
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    The latest dispatches
                  </p>
                  <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                    Stories worth the trip.
                  </h2>
                </div>
                <p className="shrink-0 text-xs text-muted-foreground">
                  {filteredArticles.length}{" "}
                  {filteredArticles.length === 1 ? "story" : "stories"}
                </p>
              </div>

              {filteredArticles.length > 0 ? (
                <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
                  {filteredArticles.map((article) => {
                    const isSaved = savedArticles.includes(article.id);

                    return (
                      <article key={article.id} className="group min-w-0">
                        <div className="relative overflow-hidden rounded-2xl bg-surface">
                          <Link
                            href={`/journal/${article.id}`}
                            aria-label={`Read ${article.title}`}
                            className="block"
                          >
                            <img
                              src={article.image}
                              alt={article.title}
                              loading="lazy"
                              className="h-[230px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[260px]"
                            />
                          </Link>

                          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-900 backdrop-blur">
                            {article.category}
                          </span>

                          <button
                            type="button"
                            onClick={() => toggleSaved(article.id)}
                            aria-label={
                              isSaved
                                ? "Remove story from saved stories"
                                : "Save story"
                            }
                            aria-pressed={isSaved}
                            className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition ${
                              isSaved
                                ? "bg-primary text-white"
                                : "bg-white/90 text-slate-900 hover:bg-white"
                            }`}
                          >
                            <Bookmark
                              size={17}
                              fill={isSaved ? "currentColor" : "none"}
                            />
                          </button>

                          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-slate-950/55 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                            <MapPin size={12} />
                            {article.location}
                          </div>
                        </div>

                        <div className="mt-5 flex items-center gap-2 text-[11px] text-muted-foreground">
                          <span>{article.date}</span>
                          <span className="h-1 w-1 rounded-full bg-border" />
                          <Clock3 size={12} />
                          <span>{article.readTime}</span>
                        </div>

                        <h3 className="mt-3 font-heading text-xl font-semibold leading-snug transition group-hover:text-primary sm:text-2xl">
                          <Link href={`/journal/${article.id}`}>
                            {article.title}
                          </Link>
                        </h3>

                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                          {article.excerpt}
                        </p>

                        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                          <span className="text-xs font-medium text-muted-foreground">
                            By {article.author}
                          </span>
                          <Link
                            href={`/journal/${article.id}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition hover:gap-2.5"
                          >
                            Read story <ArrowUpRight size={15} />
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
                  <Search
                    size={30}
                    className="mx-auto text-muted-foreground"
                  />
                  <h3 className="mt-4 font-heading text-xl font-semibold">
                    No stories found
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try another search or select a different category.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All stories");
                    }}
                    className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
                  >
                    Show all stories
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-8">
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  From the editors
                </p>
                <h3 className="mt-3 font-heading text-2xl font-semibold">
                  Worth your time.
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  A few thoughtful reads for your next quiet moment.
                </p>

                <div className="mt-6 space-y-5">
                  {editorsPicks.map((pick) => (
                    <Link
                      key={pick.number}
                      href="/journal"
                      className="group flex gap-4"
                    >
                      <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-xl">
                        <img
                          src={pick.image}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                          {pick.category}
                        </p>
                        <h4 className="mt-2 line-clamp-3 text-sm font-semibold leading-5 transition group-hover:text-primary">
                          {pick.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-primary p-7 text-white">
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/15" />
                <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full border border-white/15" />

                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                    <Mail size={21} />
                  </div>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
                    The Sunday Postcard
                  </p>
                  <h3 className="mt-3 font-heading text-2xl font-semibold leading-tight">
                    A little wanderlust, delivered.
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/75">
                    Get destination inspiration and thoughtful travel stories
                    in your inbox.
                  </p>

                  {subscribed ? (
                    <p className="mt-5 rounded-xl bg-white/10 p-4 text-sm font-medium">
                      Thanks for your interest! Connect a newsletter service
                      to activate subscriptions.
                    </p>
                  ) : (
                    <form
                      className="mt-5 space-y-3"
                      onSubmit={(event) => {
                        event.preventDefault();
                        if (email.trim()) setSubscribed(true);
                      }}
                    >
                      <label htmlFor="sidebar-email" className="sr-only">
                        Your email address
                      </label>
                      <input
                        id="sidebar-email"
                        type="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Your email address"
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/55 focus:border-amber-300"
                      />
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
                      >
                        Subscribe <ArrowRight size={16} />
                      </button>
                    </form>
                  )}

                  <p className="mt-4 text-xs text-white/55">
                    Thoughtful reads, never inbox clutter.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-border">
                <div className="relative h-48">
                  <img
                    src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=85"
                    alt="A peaceful mountain lake"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 to-transparent" />
                  <div className="absolute bottom-4 left-5 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                      Your next chapter
                    </p>
                    <p className="mt-1 font-heading text-xl font-semibold">
                      Go somewhere new.
                    </p>
                  </div>
                </div>
                <div className="bg-surface p-5">
                  <p className="text-sm leading-6 text-muted-foreground">
                    Found a story that sparked your curiosity? Explore the
                    destinations behind the inspiration.
                  </p>
                  <Link
                    href="/explore"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3"
                  >
                    Explore destinations <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Closing banner */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85"
            alt="A scenic landscape ready to be explored"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/65" />

          <div className="relative px-6 py-16 text-center text-white sm:px-12 sm:py-24 lg:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
              Keep looking beyond the horizon
            </p>
            <h2 className="mx-auto mt-5 max-w-3xl font-heading text-3xl font-semibold leading-tight sm:text-4xl lg:text-6xl">
              Every destination has a story. Find yours.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
              The world is waiting, and your next favorite place might be
              closer than you think.
            </p>
            <Link
              href="/explore"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-amber-400 px-7 py-4 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
            >
              Discover destinations <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

