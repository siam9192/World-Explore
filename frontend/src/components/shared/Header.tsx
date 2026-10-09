import Link from "next/link";
import { ChevronDown, MapPinned, Search, Menu, X } from "lucide-react";
import Container from "../layout/Container";
import MobileNav from "../layout/MobileNav";
import { navRoutes } from "@/constants/navRoutes.constant";




function Header() {
 

  return (
    <header className="border-b border-border bg-surface">
      {/* ================= TOP BAR ================= */}
      <div className="bg-primary-dark text-primary-foreground">
        <Container>
          <div className="flex min-h-9 items-center justify-between gap-4 text-extra-small">
            <p className="truncate">
              Vol. 12 — The Autumn Discovery Issue, now live
            </p>

            <div className="hidden items-center gap-5 sm:flex">
              <button
                type="button"
                className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
              >
                <span>EN</span>
                <ChevronDown size={14} />
              </button>

              <button
                type="button"
                className="transition-opacity hover:opacity-80"
              >
                USD
              </button>

              <Link
                href="/list-your-stay"
                className="transition-opacity hover:opacity-80"
              >
                List your stay
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* ================= MAIN HEADER ================= */}
      <div className="py-4 sm:py-5 lg:py-7">
        <Container>
          <div className="flex items-center justify-between gap-4">
            {/* LOGO */}
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2.5 sm:gap-3"
              aria-label="WorldExplore home"
              
            >
              <div className="flex size-10 items-center justify-center rounded-medium bg-primary text-primary-foreground shadow-sm sm:size-11">
                <MapPinned size={21} strokeWidth={2.2} />
              </div>

              <h1 className="font-heading text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
                WorldExplore
              </h1>
            </Link>

            {/* ================= DESKTOP NAV ================= */}
            <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
              {navRoutes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className="
                    relative py-2
                    text-small font-medium
                    text-muted-foreground
                    transition-colors
                    hover:text-foreground
                    after:absolute
                    after:bottom-0
                    after:left-0
                    after:h-0.5
                    after:w-0
                    after:bg-accent
                    after:transition-all
                    hover:after:w-full
                  "
                >
                  {route.label}
                </Link>
              ))}
            </nav>

            {/* ================= RIGHT ACTIONS ================= */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop Search */}
              <div
                className="
                  hidden
                  h-10
                  w-44
                  items-center
                  gap-2
                  rounded-small
                  border
                  border-border
                  bg-input
                  px-3
                  transition-all
                  focus-within:border-primary
                  focus-within:ring-2
                  focus-within:ring-primary/10
                  md:flex
                  lg:w-52
                  xl:w-60
                "
              >
                <Search size={17} className="shrink-0 text-muted-foreground" />

                <input
                  type="search"
                  placeholder="Search places..."
                  aria-label="Search places"
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    text-small
                    text-foreground
                    outline-none
                    placeholder:text-muted-foreground
                  "
                />
              </div>

              {/* Mobile Search */}
              <button
                type="button"
                aria-label="Search"
                className="
                  flex
                  size-10
                  items-center
                  justify-center
                  rounded-medium
                  border
                  border-border
                  text-foreground
                  transition-colors
                  hover:bg-muted
                  md:hidden
                "
              >
                <Search size={19} />
              </button>

              {/* Desktop Auth */}
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  href="/login"
                  className="
                    rounded-medium
                    px-3
                    py-2
                    text-small
                    font-medium
                    text-foreground
                    transition-colors
                    hover:bg-muted
                  "
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="
                    rounded-medium
                    bg-primary
                    px-4
                    py-2.5
                    text-small
                    font-semibold
                    text-primary-foreground
                    shadow-sm
                    transition-all
                    hover:bg-primary/90
                    hover:shadow-md
                  "
                >
                  Sign up
                </Link>
              </div>

              {/* Mobile Menu Button */}
           
              <MobileNav/>
          
            </div>
          </div>

        
        </Container>
      </div>
    </header>
  );
}

export default Header;
