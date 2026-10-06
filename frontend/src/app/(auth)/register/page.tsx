"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Apple,
  Eye,
  EyeOff,
  Heart,
  Map,
  ShieldCheck,
  Star,
  AlertCircle,
} from "lucide-react";


import Input from "@/components/ui/input";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-background p-2">
      <div className="mx-auto flex min-h-[calc(100vh-1rem)] w-full max-w-7xl overflow-hidden rounded-medium border border-border bg-white">
        {/* LEFT SIDE */}

        <section className="relative hidden overflow-hidden lg:flex lg:w-1/2">
          <Image
            src={"/images/positano.jpg"}
            alt="Northern lights over a forest"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />

          {/* LOGO */}

          <div className="absolute left-8 top-8 z-10 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-small bg-white/20 text-white backdrop-blur-sm">
              <span className="text-small font-bold">◎</span>
            </div>

            <span className="font-heading text-large font-bold text-white">
              WorldExplore
            </span>
          </div>

          {/* FEATURE CARDS */}

          <div className="absolute bottom-8 left-8 right-8 z-10 grid grid-cols-3 gap-3">
            {/* SAVE */}

            <div className="rounded-medium border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
              <Heart size={16} className="mb-3 text-accent" />

              <p className="text-small font-semibold text-white">Save</p>

              <p className="mt-0.5 text-extra-small text-white/75">
                Build your wishlist
              </p>
            </div>

            {/* REVIEW */}

            <div className="rounded-medium border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
              <Star size={16} className="mb-3 text-accent" />

              <p className="text-small font-semibold text-white">Review</p>

              <p className="mt-0.5 text-extra-small text-white/75">
                Guide others
              </p>
            </div>

            {/* TRACK */}

            <div className="rounded-medium border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
              <Map size={16} className="mb-3 text-accent" />

              <p className="text-small font-semibold text-white">Track</p>

              <p className="mt-0.5 text-extra-small text-white/75">
                Map 140 countries
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}

        <section className="flex w-full items-center justify-center bg-white px-5 py-8 sm:px-8 md:px-12 lg:w-1/2 lg:px-14 xl:px-16">
          <div className="w-full max-w-md">
            {/* HEADER */}

            <div className="mb-5">
              <p className="mb-1 text-extra-small font-semibold uppercase tracking-widest text-primary">
                Join 240,000 travellers
              </p>

              <h1 className="font-heading text-extra-huge font-bold leading-tight text-foreground">
                Start your atlas
              </h1>
            </div>

            {/* SOCIAL BUTTONS */}

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="flex h-9 items-center justify-center gap-2 rounded-small border border-border bg-white text-small font-semibold text-foreground transition-colors hover:bg-muted/40"
              >
                <span className="font-bold">G</span>
                Google
              </button>

              <button
                type="button"
                className="flex h-9 items-center justify-center gap-2 rounded-small border border-border bg-white text-small font-semibold text-foreground transition-colors hover:bg-muted/40"
              >
                <Apple size={15} />
                Apple
              </button>
            </div>

            {/* DIVIDER */}

            <div className="my-5 flex items-center gap-2">
              <div className="h-px flex-1 bg-border" />

              <span className="shrink-0 text-extra-small text-muted-foreground">
                or with email
              </span>

              <div className="h-px flex-1 bg-border" />
            </div>

            {/* FORM */}

            <form className="space-y-3">
              {/* FIRST + LAST NAME */}

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-1.5 block text-extra-small font-semibold text-foreground"
                  >
                    First name
                  </label>

                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Maya"
                    className="h-10 text-extra-small"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-1.5 block text-extra-small font-semibold text-foreground"
                  >
                    Last name
                  </label>

                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Lindqvist"
                    className="h-10 text-extra-small"
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-extra-small font-semibold text-foreground"
                >
                  Email address
                </label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="maya@example.com"
                  className="h-10 text-extra-small"
                />
              </div>

              {/* PASSWORD */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-extra-small font-semibold text-foreground"
                >
                  Password
                </label>

                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="enter your password..."
                    className="h-10 border-error pr-10 text-extra-small focus:border-error focus:ring-error/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>

                {/* PASSWORD ERROR */}

                <div className="mt-1 flex items-center gap-1 text-extra-small text-error">
                  <AlertCircle size={12} />

                  <span>Use 8+ characters with a number and symbol.</span>
                </div>
              </div>

              {/* TERMS BOX */}

              <div className="flex gap-2 rounded-small border border-primary/20 bg-soft p-3">
                <ShieldCheck
                  size={15}
                  className="mt-0.5 shrink-0 text-primary"
                />

                <p className="text-extra-small leading-relaxed text-ink-soft">
                  By joining you agree to our{" "}
                  <Link href="/terms" className="font-medium text-primary">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="font-medium text-primary">
                    Privacy Policy
                  </Link>
                  . Free forever, unsubscribe anytime.
                </p>
              </div>

              {/* REGISTER BUTTON */}

              <button
                type="submit"
                className="flex h-10 w-full items-center justify-center rounded-small bg-primary text-small font-semibold text-primary-foreground transition-colors hover:bg-primary-dark active:scale-[0.99]"
              >
                Create free account
              </button>
            </form>

            {/* LOGIN LINK */}

            <p className="mt-4 text-center text-extra-small text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                Log in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
