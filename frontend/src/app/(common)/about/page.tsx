
"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "@/components/layout/Container";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Heart,
  Compass,
  MapPin,
  Mountain,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Footprints,
  Leaf,
  Quote,
  Mail,
} from "lucide-react";

const values = [
  {
    icon: Compass,
    number: "01",
    title: "Explore with curiosity",
    description:
      "The world is full of extraordinary places waiting to be discovered. We help you look beyond the ordinary and find experiences worth remembering.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Travel with confidence",
    description:
      "Honest reviews, useful details, and thoughtfully curated recommendations help you make informed decisions before every adventure.",
  },
  {
    icon: Heart,
    number: "03",
    title: "Respect every place",
    description:
      "We believe meaningful travel celebrates local cultures, supports communities, and leaves the places we visit better understood and appreciated.",
  },
];

const steps = [
  {
    number: "01",
    title: "Find your inspiration",
    description:
      "Browse beautiful destinations, discover hidden gems, and find places that match your travel style.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Discover the details",
    description:
      "Explore local highlights, traveler reviews, activities, and practical information for your journey.",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Make it your journey",
    description:
      "Save your favorite places, compare possibilities, and start turning your travel dreams into plans.",
    icon: Footprints,
  },
];

const team = [
  {
    name: "The Explorers",
    role: "Curiosity & Discovery",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=85",
    description: "Always searching for the next unforgettable place.",
  },
  {
    name: "The Storytellers",
    role: "Stories & Inspiration",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=700&q=85",
    description: "Turning destinations into stories worth sharing.",
  },
  {
    name: "The Community",
    role: "Travelers Around the World",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=700&q=85",
    description: "Real experiences from people who love to explore.",
  },
];

const stats = [
  { value: "140+", label: "Countries to explore" },
  { value: "12.4k+", label: "Curated destinations" },
  { value: "86k+", label: "Traveler reviews" },
  { value: "4.8/5", label: "Community rating" },
];

export default function AboutPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* Hero */}
      <section className="relative isolate min-h-[650px] overflow-hidden lg:min-h-[760px]">
        <div className="absolute inset-0 -z-20">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=90"
            alt="Majestic mountains stretching into the distance"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/20" />

        <Container>
          <div className="flex min-h-[650px] flex-col justify-center py-24 lg:min-h-[760px]">
            <div className="mb-7 flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              <Sparkles size={14} />
              Our story, your journey
            </div>

            <h1 className="max-w-4xl font-heading text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-8xl">
              The world is
              <br />
              <span className="font-serif italic text-amber-300">
                full of wonder.
              </span>
              <br />
              Let’s find it.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
              We believe the best journeys begin with curiosity. WorldExplore
              helps you discover remarkable places, find inspiration, and see
              the world from a different perspective.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/explore"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Start exploring
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#our-story"
                className="inline-flex items-center gap-2 rounded-full border border-white/35 px-6 py-4 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Discover our story
                <ArrowDownRight size={17} />
              </a>
            </div>

            <div className="mt-16 flex items-center gap-4 text-white/75">
              <div className="flex -space-x-3">
                {[
                  "photo-1534528741775-53994a69daeb",
                  "photo-1500648767791-00dcc994a43e",
                  "photo-1531123897727-8f129e1688ce",
                  "photo-1506794778202-cad84cf45f1d",
                ].map((photo) => (
                  <img
                    key={photo}
                    src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=100&h=100&q=80`}
                    alt=""
                    className="h-10 w-10 rounded-full border-2 border-slate-900 object-cover"
                  />
                ))}
              </div>
              <p className="text-sm">
                Inspired by travelers.
                <span className="block font-semibold text-white">
                  Made for explorers.
                </span>
              </p>
            </div>
          </div>
        </Container>

        <div className="absolute bottom-8 right-8 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/70 md:flex">
          <span className="h-px w-10 bg-white/60" />
          There is more out there
        </div>
      </section>

      {/* Intro / Story */}
      <section id="our-story" className="py-20 sm:py-28 lg:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="relative">
              <div className="grid grid-cols-[1fr_0.72fr] items-start gap-4 sm:gap-6">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85"
                    alt="A beautiful mountain landscape beneath the stars"
                    className="h-[300px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[430px]"
                  />
                </div>

                <div className="mt-14 overflow-hidden rounded-2xl sm:mt-20">
                  <img
                    src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=700&q=85"
                    alt="Whitewashed buildings overlooking the sea"
                    className="h-[230px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[330px]"
                  />
                </div>
              </div>

              <div className="absolute bottom-5 left-3 rounded-xl border border-border bg-surface p-4 shadow-xl sm:bottom-8 sm:left-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Globe2 size={22} />
                  </div>
                  <div>
                    <p className="font-heading text-xl font-bold">One world</p>
                    <p className="text-xs text-muted-foreground">
                      Endless possibilities
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                <span className="h-px w-8 bg-primary" />
                Who we are
              </p>

              <h2 className="max-w-xl font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                More than places.
                <span className="mt-1 block font-serif italic font-medium text-primary">
                  A world of possibilities.
                </span>
              </h2>

              <p className="mt-7 text-base leading-8 text-muted-foreground">
                WorldExplore began with a simple idea: discovering the world
                should feel exciting, accessible, and personal. Every
                destination has a story, every journey creates a memory, and
                every traveler sees something a little different.
              </p>

              <p className="mt-5 text-base leading-8 text-muted-foreground">
                We bring inspiration, practical travel information, and
                authentic traveler perspectives together in one place. Whether
                you dream of quiet mountain villages, vibrant city streets, or
                distant tropical shores, we help you take the first step.
              </p>

              <div className="mt-9 flex items-center gap-4 border-t border-border pt-7">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-amber-600">
                  <Mountain size={23} />
                </div>
                <div>
                  <p className="font-semibold">Every place has a story.</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Let’s discover yours, one destination at a time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center ${
                  index !== 0 ? "lg:border-l lg:border-border" : ""
                }`}
              >
                <p className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Illustrative platform statistics — replace with your actual data
            when available.
          </p>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">
              What drives us
            </p>
            <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Making the world feel a little
              <span className="font-serif italic text-primary">
                {" "}
                closer.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              Travel is about more than checking places off a list. It is
              about the people we meet, the perspectives we gain, and the
              memories we bring home. Our mission is to make discovering those
              moments easier for everyone.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-20">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.number}
                  className="group rounded-2xl border border-border bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                      <Icon size={25} />
                    </div>
                    <span className="font-serif text-4xl text-border">
                      {value.number}
                    </span>
                  </div>

                  <h3 className="mt-8 font-heading text-xl font-semibold">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {value.description}
                  </p>

                  <div className="mt-7 h-1 w-12 rounded-full bg-amber-400 transition-all duration-300 group-hover:w-20" />
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Featured destination image */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2400&q=90"
            alt="A peaceful lake surrounded by dramatic mountains"
            className="h-[400px] w-full object-cover sm:h-[500px] lg:h-[620px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <Container>
              <div className="max-w-2xl py-12 text-white">
                <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
                  <Star size={15} />
                  Your next chapter awaits
                </p>
                <h2 className="font-heading text-4xl font-semibold leading-tight sm:text-5xl lg:text-7xl">
                  Collect moments.
                  <span className="mt-2 block font-serif italic font-medium text-amber-300">
                    Not just miles.
                  </span>
                </h2>
                <p className="mt-6 max-w-lg text-sm leading-7 text-white/80 sm:text-base">
                  Find the places that make you feel something. Follow your
                  curiosity, take the scenic route, and make room for the
                  unexpected.
                </p>
                <Link
                  href="/explore"
                  className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  Find your next destination
                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </div>
            </Container>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-28 lg:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                A little inspiration goes a long way
              </p>
              <h2 className="max-w-2xl font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                From daydreaming
                <span className="font-serif italic text-primary">
                  {" "}
                  to going.
                </span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">
              Your next adventure does not need to start with a plane ticket.
              Sometimes, it starts with a place you have never heard of.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3 lg:mt-16">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative">
                  {index !== 2 && (
                    <div className="absolute left-[70px] top-7 hidden h-px w-[calc(100%-40px)] border-t border-dashed border-border md:block" />
                  )}

                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background text-primary">
                    <Icon size={23} />
                  </div>

                  <p className="mt-7 text-xs font-bold tracking-[0.18em] text-amber-600">
                    STEP {step.number}
                  </p>
                  <h3 className="mt-3 font-heading text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Team / Community */}
      <section className="bg-surface py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Better journeys, together
            </p>
            <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              A world of travelers.
              <span className="block font-serif italic text-primary">
                One curious community.
              </span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              The best travel inspiration comes from sharing experiences,
              learning from one another, and seeing familiar places through
              fresh eyes.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16">
            {team.map((member) => (
              <article key={member.name} className="group">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-[270px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[330px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <span className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                    {member.role}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold">
                  {member.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {member.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-border bg-background p-6 sm:flex-row sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users size={23} />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold">
                  Every traveler has a story.
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Yours deserves a place in the journey.
                </p>
              </div>
            </div>

            <Link
              href="/explore"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
            >
              Explore destinations <ArrowRight size={17} />
            </Link>
          </div>
        </Container>
      </section>

      {/* Testimonial */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Quote size={34} className="mx-auto text-amber-500" />

            <blockquote className="mt-6 font-heading text-2xl font-medium leading-relaxed tracking-tight sm:text-3xl lg:text-4xl">
              “The most beautiful thing about travel is that it reminds us how
              much there is still to discover.”
            </blockquote>

            <div className="mx-auto mt-8 h-px w-12 bg-primary" />
            <p className="mt-4 text-sm font-semibold">The WorldExplore spirit</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Our philosophy, in a few words
            </p>
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-3xl bg-primary">
          <div className="absolute -right-16 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -right-4 -top-12 h-56 w-56 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

          <Container>
            <div className="relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_0.8fr] lg:gap-16 lg:py-24">
              <div className="text-white">
                <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
                  <Mail size={15} />
                  A little world in your inbox
                </div>

                <h2 className="max-w-2xl font-heading text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                  Let the world surprise you.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                  Discover inspiring destinations, travel stories, and ideas
                  for your next adventure. A little wanderlust, delivered
                  thoughtfully.
                </p>

                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/80">
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={15} /> Thoughtful inspiration
                  </span>
                  <span className="flex items-center gap-2">
                    <Leaf size={15} /> No unnecessary noise
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md sm:p-7">
                {subscribed ? (
                  <div className="py-6 text-center text-white">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                      <Heart size={25} />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">
                      Thanks for your interest!
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      The form is ready for your newsletter integration.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubscribed(false);
                        setEmail("");
                      }}
                      className="mt-5 text-sm font-semibold text-amber-300 underline underline-offset-4"
                    >
                      Go back
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-heading text-xl font-semibold text-white">
                      Stay curious.
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/70">
                      Sign up to receive travel inspiration and destination
                      highlights.
                    </p>

                    <form
                      className="mt-6 space-y-3"
                      onSubmit={(event) => {
                        event.preventDefault();

                        if (email.trim()) {
                          setSubscribed(true);
                        }
                      }}
                    >
                      <label htmlFor="newsletter-email" className="sr-only">
                        Your email address
                      </label>
                      <input
                        id="newsletter-email"
                        type="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email address"
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/50 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                      />

                      <button
                        type="submit"
                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
                      >
                        Join the journey
                        <ArrowRight
                          size={17}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </button>
                    </form>

                    <p className="mt-4 text-center text-xs leading-5 text-white/55">
                      By subscribing, you agree to receive travel updates.
                      Connect this form to your newsletter service to enable
                      subscriptions.
                    </p>
                  </>
                )}
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="flex flex-col items-center text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Your adventure starts here
            </p>
            <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Somewhere out there is a place you will never forget.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              You do not have to know where it is yet. Start exploring, stay
              curious, and let your next story find you.
            </p>
            <Link
              href="/explore"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Explore the world
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

