"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Apple, Check, Eye, EyeOff, Lock, Mail } from "lucide-react";

import Input from "@/components/ui/Input";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* =====================================================
          LEFT — HERO
      ====================================================== */}
      <section className="relative hidden min-h-screen overflow-hidden lg:block">
        {/* Background */}
        <Image
          src="/images/bg-login.avif"
          alt="Beautiful travel destination"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

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

        {/* Quote */}
        <div className="absolute bottom-8 left-7 right-7 z-10 text-white sm:bottom-9 sm:left-9 sm:right-9">
          <h2 className="max-w-xl font-heading text-2xl font-bold leading-[1.15] tracking-tight xl:text-[29px]">
            “We plan less, wander more, and always find our way back.”
          </h2>

          <p className="mt-4 text-xs font-medium text-white/80 sm:text-extra-small">
            Maya Lindqvist · 47 countries with WorldExplore
          </p>
        </div>
      </section>

      {/* =====================================================
          RIGHT — LOGIN
      ====================================================== */}
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 md:px-12 lg:px-14 xl:px-20">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-7">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[2px] text-primary">
              Welcome back
            </p>

            <h1 className="font-heading text-2xl font-bold leading-tight text-foreground sm:text-[28px]">
              Log in to your atlas
            </h1>

            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-small">
              Continue your journey and discover your next destination.
            </p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-(--radius-small) border border-border bg-surface text-xs font-semibold text-foreground transition-colors hover:bg-muted/40"
            >
              <span className="text-sm font-bold">G</span>
              Continue with Google
            </button>

            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-(--radius-small) border border-border bg-surface text-xs font-semibold text-foreground transition-colors hover:bg-muted/40"
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
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-[11px] font-semibold text-foreground"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground"
                />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jenny@mail.com"
                  className="h-10 pl-9 text-xs sm:text-extra-small"
                />
              </div>
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
                <Lock
                  size={15}
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground"
                />

                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-10 pl-9 pr-10 text-xs sm:text-extra-small"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setRememberMe((prev) => !prev)}
                className="flex items-center gap-1.5"
                aria-pressed={rememberMe}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border transition-colors ${
                    rememberMe
                      ? "border-primary bg-primary"
                      : "border-border bg-surface"
                  }`}
                >
                  {rememberMe && (
                    <Check
                      size={10}
                      strokeWidth={3}
                      className="text-primary-foreground"
                    />
                  )}
                </span>

                <span className="text-[11px] text-muted-foreground">
                  Remember me
                </span>
              </button>

              <Link
                href="/forgot-password"
                className="text-[11px] font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login */}
            <button
              type="submit"
              className="flex h-10 w-full items-center justify-center rounded-(--radius-small) bg-primary text-xs font-semibold text-primary-foreground transition-all hover:bg-primary-dark active:scale-[0.99]"
            >
              Log in
            </button>
          </form>

          {/* Register */}
          <p className="mt-5 text-center text-[11px] text-muted-foreground sm:text-xs">
            New to WorldExplore?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
