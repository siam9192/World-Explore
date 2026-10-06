
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Apple,
  Check,
  Eye,
  EyeOff,
  Mail,
} from "lucide-react";

import Input from "@/components/ui/input";
import login_image from "../../../../public/positano.jpg"
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <main className="min-h-screen bg-background p-1.5 sm:p-2">
      <div className="mx-auto flex min-h-[calc(100vh-12px)]  w-full max-w-285 overflow-hidden rounded-[3px] border border-border p-20 border-none">
       
        {/* LEFT SIDE - IMAGE / HERO */}
        
        <section className="relative hidden overflow-hidden items-center lg:block lg:w-1/2  ">
         
          {/* Background Image */}
          <Image
            src={login_image}
            alt="Beautiful travel destination"
            fill
            priority
            className="object-cover"
          />

          

          {/* Logo */}
          <div className="absolute left-9 top-9 z-10 flex items-center gap-2.5">
            {/* Logo Icon */}
           
            <div className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-white/20 text-white backdrop-blur-sm">
              <span className="text-[15px] font-bold">◎</span>
            </div>

            {/* Logo Text */}
            
            <span className="font-heading text-large font-bold text-white">
              WorldExplore
            </span>
          </div>

          {/* content */}
          <div className="absolute bottom-9 left-9 right-9 z-10 text-white">
            <h2 className="max-w-125 font-heading text-[27px] font-bold leading-[1.2] tracking-[-0.4px] xl:text-[29px]">
              “We plan less, wander more, and always find our way back.”
            </h2>

            <p className="mt-4 text-extra-small font-medium text-white/85">
              Maya Lindqvist · 47 countries with WorldExplore
            </p>
          </div>
        </section>

        {/* RIGHT SIDE - LOGIN FORM */}
        <section className="flex w-full items-center justify-center bg-white px-5 py-10 sm:px-10 md:px-14 lg:w-1/2 lg:px-12 xl:px-16">
          <div className="w-full max-w-89">
           
            {/* HEADER */}
            
            <div className="mb-6">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[2px] text-primary">
                Welcome back
              </p>

              <h1 className="font-heading text-[26px] font-bold leading-tight text-foreground sm:text-[28px]">
                Log in to your atlas
              </h1>
            </div>

            {/* SOCIAL LOGIN */}
            <div className="grid grid-cols-2 gap-2.5">
             
              {/* Google */}
             
              <button
                type="button"
                className="flex h-9 items-center justify-center gap-2 rounded-(--radius-small) border border-border bg-white text-extra-small font-semibold text-foreground transition-colors hover:bg-muted/40"
              >
                <span className="text-[15px] font-bold">G</span>
                Google
              </button>

              {/* Apple */}
             
              <button
                type="button"
                className="flex h-9 items-center justify-center gap-2 rounded-(--radius-small) border border-border bg-white text-extra-small font-semibold text-foreground transition-colors hover:bg-muted/40"
              >
                <Apple size={15} strokeWidth={2} />
                Apple
              </button>
            </div>

            {/* DIVIDER */}
            <div className="my-5 flex items-center gap-2">
              <div className="h-px flex-1 bg-border" />

              <span className="shrink-0 text-[11px] text-muted-foreground">
                or with email
              </span>

              <div className="h-px flex-1 bg-border" />
            </div>

            {/* LOGIN FORM */}
            <form className="space-y-3.5">
             
              {/* EMAIL */}
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
                    placeholder="enter your g-mail..."
                    className="h-10 pl-9 text-extra-small"
                  />
                </div>
              </div>

              {/* PASSWORD */}
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
                    className="h-10 pr-10 text-extra-small"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={15} />
                    ) : (
                      <Eye size={15} />
                    )}
                  </button>
                </div>
              </div>

              {/* REMEMBER + FORGOT PASSWORD */}
              <div className="flex items-center justify-between gap-3">
               
                {/* Remember Me */}
                <button
                  type="button"
                  onClick={() => setRememberMe((prev) => !prev)}
                  className="flex items-center gap-1.5"
                >
                  <span
                    className={`flex h-3.75 w-3.75 shrink-0 items-center justify-center rounded-[3px] border transition-all ${
                      rememberMe
                        ? "border-primary bg-primary"
                        : "border-border bg-white"
                    }`}
                  >
                    {rememberMe && (
                      <Check
                        size={10}
                        strokeWidth={3}
                        className="text-white"
                      />
                    )}
                  </span>

                  <span className="whitespace-nowrap text-[11px] text-muted-foreground">
                    Remember me
                  </span>
                </button>

                {/* Forgot Password */}
                <Link
                  href="/forgot-password"
                  className="whitespace-nowrap text-[11px] font-semibold text-primary transition-colors hover:text-primary-dark"
                >
                  Forgot password?
                </Link>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="mt-1 flex h-10 w-full items-center justify-center rounded-(--radius-small) bg-primary text-extra-small font-semibold text-primary-foreground transition-all hover:bg-primary-dark active:scale-[0.99]"
              >
                Log in
              </button>
            </form>

            {/* REGISTER */}
            <p className="mt-4 text-center text-[11px] text-muted-foreground">
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
      </div>
    </main>
  );
}
