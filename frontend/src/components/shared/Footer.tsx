import React from "react";
import Link from "next/link";
import Container from "../layout/Container";

function Footer() {
const categories = [
  {
    name: "Discover",
    routes: [
      {
        label: "Popular destinations",
        src: "/explore?sort=popular",
      },
      {
        label: "Trending places",
        src: "/explore?sort=trending",
      },
      {
        label: "Categories",
        src: "/categories",
      },
      {
        label: "New additions",
        src: "/explore?sort=new",
      },
      {
        label: "Travel journal",
        src: "/journal",
      },
    ],
  },

  {
    name: "Company",
    routes: [
      {
        label: "About us",
        src: "/about",
      },
      {
        label: "Careers",
        src: "/careers",
      },
      {
        label: "Press",
        src: "/press",
      },
      {
        label: "Sustainability",
        src: "/sustainability",
      },
      {
        label: "Contact us",
        src: "/contact",
      },
    ],
  },

  {
    name: "Support",
    routes: [
      {
        label: "Help center",
        src: "/help",
      },
      {
        label: "Cookie settings",
        src: "/cookies",
      },
      {
        label: "Privacy policy",
        src: "/privacy",
      },
      {
        label: "Community",
        src: "/community",
      },
      {
        label: "Sitemap",
        src: "/sitemap",
      },
    ],
  },

  {
    name: "Top Countries",
    routes: [
      {
        label: "Japan",
        src: "/explore?country=japan",
      },
      {
        label: "Italy",
        src: "/explore?country=italy",
      },
      {
        label: "France",
        src: "/explore?country=france",
      },
      {
        label: "Thailand",
        src: "/explore?country=thailand",
      },
    ],
  },
];

  return (
    <footer className="bg-foreground md:px-0 px-2">
      <Container>
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-7 lg:gap-8 lg:py-20 ">
          {/* Brand / Newsletter */}
          <div className="space-y-5 lg:col-span-3">
            <h2 className="font-heading text-huge font-semibold text-background">
              WorldExplore
            </h2>

            <p className="max-w-md text-small leading-6 text-muted-foreground">
              A field guide to the planet — curated places, honest reviews, and
              slow travel stories from 140 countries.
            </p>

            <div className="flex max-w-md flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Email for the Sunday Postcard"
                className="min-w-0 flex-1 rounded-medium border-2 border-border bg-input p-2.5 text-small text-muted-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
              />

              <button
                type="button"
                className="rounded-medium bg-accent px-5 py-2.5 text-small font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                Join
              </button>
            </div>
          </div>

          {/* Footer Categories */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:col-span-2 sm:grid-cols-4 lg:col-span-4 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.name}>
                <h3 className="mb-4 text-small font-semibold text-background">
                  {category.name}
                </h3>

                <ul className="space-y-3">
                  {category.routes.map((route) => (
                    <li key={route.label}>
                      <Link
                        href={route.src}
                        className="text-extra-small font-medium text-muted-foreground transition-colors hover:text-background"
                      >
                        {route.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-border/10">
        <Container>
          <div className="flex flex-col gap-2 py-4 text-extra-small text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 WorldExplore. Crafted for curious travelers.</p>

            <div className="flex items-center gap-3">
              <Link
                href="/privacy"
                className="transition-colors hover:text-background"
              >
                Privacy
              </Link>

              <span>·</span>

              <Link
                href="/terms"
                className="transition-colors hover:text-background"
              >
                Terms
              </Link>

              <span>·</span>

              <Link
                href="/cookies"
                className="transition-colors hover:text-background"
              >
                Cookies
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
