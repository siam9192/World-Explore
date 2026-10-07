import React from "react";
import Container from "@/components/layout/Container";

import { Globe, LayoutGridCircles, MapPin, Search } from "lucide-react";
import Image from "next/image";

const popular_places = ["Kyota", "Santorini", "Banff", "Marrakch"];
function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[650px] overflow-hidden">
      <Image
        src="/images/banner.jpg"
        alt="Scenic travel destination"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40">
        <Container>
          <div className="flex h-full flex-col justify-center py-10 md:py-14 lg:py-20">
            {/* Hero Content */}
            <div className="w-full max-w-3xl">
              <div className="mb-4 flex items-center gap-2 uppercase text-primary-light text-extra-small font-semibold tracking-wide">
                <Globe size={16} />
                <p>The global discovery issue · 12,400 places</p>
              </div>

              <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[60px]">
                Discover the World, One Place at a Time
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 text-small md:text-lg">
                Curated destinations, honest traveller reviews, and field notes
                from everywhere — from Kyoto tea houses to Patagonian fjords.
              </p>
            </div>

            {/* Search Box */}
            <div className="mt-10 w-full max-w-4xl overflow-hidden rounded-large bg-surface shadow-xl">
              <div className="flex flex-col md:flex-row">
                {/* Where To */}
                <div className="flex flex-1 items-center gap-3 p-4 md:p-5">
                  <span className="shrink-0 text-primary">
                    <MapPin size={20} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <label
                      htmlFor="destination"
                      className="block uppercase text-small font-semibold"
                    >
                      Where To
                    </label>

                    <input
                      id="destination"
                      type="text"
                      placeholder="Search city, country or place"
                      className="mt-1 w-full bg-transparent text-extra-small outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="flex flex-1 items-center gap-3 border-t border-border p-4 md:border-l md:border-t-0 md:p-5">
                  <span className="shrink-0 text-primary">
                    <LayoutGridCircles size={20} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <label
                      htmlFor="category"
                      className="block uppercase text-small font-semibold"
                    >
                      Category
                    </label>

                    <input
                      id="category"
                      type="text"
                      placeholder="Search category"
                      className="mt-1 w-full bg-transparent text-extra-small outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex items-center p-3 md:p-4">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-medium bg-primary px-6 py-3 text-small font-medium text-primary-foreground transition hover:opacity-90 md:w-auto"
                  >
                    <Search size={18} />
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-small font-medium text-white/60">
                Popular:
              </span>

              <div className="flex flex-wrap gap-2">
                {popular_places.map((place) => (
                  <button
                    key={place}
                    type="button"
                    className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-extra-small font-medium text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/15 hover:text-white"
                  >
                    {place}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default Hero;
