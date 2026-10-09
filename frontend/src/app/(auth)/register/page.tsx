"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Apple,
  AlertCircle,
  Eye,
  EyeOff,
  Heart,
  Map,
  ShieldCheck,
  Star,
} from "lucide-react";

import Input from "@/components/ui/Input";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* =====================================================
          LEFT — HERO
      ====================================================== */}
      <section className="relative hidden min-h-[80vh] overflow-hidden lg:block">
        {/* Background */}
        <Image
          src="/images/bg-register.avif"
          alt="Beautiful travel destination"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bottom-0 h-full w-full bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Logo */}
        <Link
          href="/"
          className="absolute left-7 top-7 z-10 flex items-center gap-2.5 sm:left-9 sm:top-9"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-small bg-white/20 text-white backdrop-blur-md">
            <span className="text-small font-bold">◎</span>
          </div>

          <span className="font-heading text-xl font-bold text-white sm:text-huge">
            WorldExplore
          </span>
        </Link>

        {/* Feature Cards */}
        <div className="absolute bottom-8 left-7 right-7 z-10 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:left-9 lg:right-9">
          {/* Save */}
          <div className="rounded-medium border border-white/20 bg-white/10 p-3 backdrop-blur-md">
            <Heart size={16} className="mb-3 text-accent" />

            <p className="text-small font-semibold text-white">Save</p>

            <p className="mt-0.5 text-extra-small text-white/75">
              Build your wishlist
            </p>
          </div>

          {/* Review */}
          <div className="rounded-medium border border-white/20 bg-white/10 p-3 backdrop-blur-md">
            <Star size={16} className="mb-3 text-accent" />

            <p className="text-small font-semibold text-white">Review</p>

            <p className="mt-0.5 text-extra-small text-white/75">
              Guide others
            </p>
          </div>

          {/* Track */}
          <div className="rounded-medium border border-white/20 bg-white/10 p-3 backdrop-blur-md">
            <Map size={16} className="mb-3 text-accent" />

            <p className="text-small font-semibold text-white">Track</p>

            <p className="mt-0.5 text-extra-small text-white/75">
              Map 140 countries
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          RIGHT — REGISTER
      ====================================================== */}
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 md:px-12 lg:px-14 xl:px-20">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-7">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[2px] text-primary">
              Join 240,000 travellers
            </p>

            <h1 className="font-heading text-2xl font-bold leading-tight text-foreground sm:text-[28px]">
              Start your atlas
            </h1>

            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-small">
              Create your account and start planning your next adventure.
            </p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-small border border-border bg-surface text-xs font-semibold text-foreground transition-colors hover:bg-muted/40"
            >
              <span className="text-sm font-bold">G</span>
              Continue with Google
            </button>

            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-small border border-border bg-surface text-xs font-semibold text-foreground transition-colors hover:bg-muted/40"
            >
              <Apple size={15} strokeWidth={2} />
              Continue with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />

            <span className="shrink-0 text-[11px] text-muted-foreground">
              or continue with email
            </span>

            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* First + Last Name */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1.5 block text-[11px] font-semibold text-foreground"
                >
                  First name
                </label>

                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Maya"
                  className="h-10 text-xs sm:text-extra-small"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-1.5 block text-[11px] font-semibold text-foreground"
                >
                  Last name
                </label>

                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Lindqvist"
                  className="h-10 text-xs sm:text-extra-small"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-[11px] font-semibold text-foreground"
              >
                Email address
              </label>

              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="maya@example.com"
                className="h-10 text-xs sm:text-extra-small"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-[11px] font-semibold text-foreground"
              >
                Password
              </label>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  className="h-10 pr-10 text-xs sm:text-extra-small"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {/* Password Requirement */}
              <div className="mt-1.5 flex items-start gap-1 text-[11px] text-muted-foreground">
                <AlertCircle size={12} className="mt-0.5 shrink-0" />

                <span>Use 8+ characters with a number and symbol.</span>
              </div>
            </div>

            {/* Terms */}
            <div className="flex gap-2.5 rounded-small border border-primary/20 bg-soft p-3">
              <ShieldCheck size={15} className="mt-0.5 shrink-0 text-primary" />

              <p className="text-[11px] leading-relaxed text-ink-soft">
                By joining you agree to our{" "}
                <Link
                  href="/terms"
                  className="font-medium text-primary hover:underline"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-primary hover:underline"
                >
                  Privacy Policy
                </Link>
                . Free forever, unsubscribe anytime.
              </p>
            </div>

            {/* Register */}
            <button
              type="submit"
              className="flex h-10 w-full items-center justify-center rounded-small bg-primary text-xs font-semibold text-primary-foreground transition-all hover:bg-primary-dark active:scale-[0.99]"
            >
              Create free account
            </button>
          </form>

          {/* Login */}
          <p className="mt-5 text-center text-[11px] text-muted-foreground sm:text-xs">
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
    </main>
  );
}
