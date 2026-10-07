import Container from "@/components/layout/Container";
import React from "react";

function PostCard() {
  return (
    <section className="px-2 py-6 sm:px-4 sm:py-8">
   <Container>
       <div
        className="relative  flex min-h-[320px] items-center overflow-hidden rounded-extra-large bg-cover bg-center"
        style={{
          backgroundImage: `
      linear-gradient(
        90deg,
        rgba(7, 91, 81, 0.5) 0%,
        rgba(9, 101, 91, 0.6) 45%,
        rgba(8, 83, 76, 0.7) 100%
      ),
      url("https://media.istockphoto.com/id/1284068390/photo/upper-dam.jpg?s=612x612&w=0&k=20&c=XTV3nI-r07biBB0mkne0149WLWigaA3OdjrPl3T_ORU=")
    `,
        }}
      >
        {/* Content */}
        <div className="max-w-6xl mx-auto grid w-full grid-cols-1 items-center gap-8 px-8 py-10 sm:px-10 lg:grid-cols-[1.2fr_0.9fr] lg:px-12 lg:py-12">
          {/* Left */}
          <div className="max-w-[550px] text-white">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-light">
              The Sunday Postcard
            </p>

            <h2 className="font-serif text-huge lg:text-extra-huge font-bold leading-[1.15] tracking-[-0.02em] ">
              One extraordinary place in your inbox,
              <br className="hidden sm:block" />
              every Sunday morning.
            </h2>

            <p className="mt-4 max-w-[500px] text-small leading-[1.5] text-white/85 ">
              Join 240,000 readers. No spam, no listicles — just one beautifully
              reported destination and how to do it right.
            </p>
          </div>

          {/* Signup Card */}
          <div className="w-full max-w-[373px] justify-self-end rounded-[11px] bg-white p-5 text-slate-900 shadow-[0_8px_30px_rgba(0,0,0,0.12)] sm:p-5">
            <h3 className="font-serif text-[17px] font-bold leading-tight">
              Start exploring free
            </h3>

            <p className="mt-1 text-extra-small leading-5 text-slate-500">
              Save favourites, write reviews, build your map.
            </p>

            <form className="mt-3.5">
              <input
                type="email"
                placeholder="you@example.com"
                className="h-10 w-full rounded-[6px] border border-slate-200 bg-slate-50 px-3 text-[12px] text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
              />

              <button
                type="submit"
                className="mt-2.5 h-10 w-full rounded-[6px] bg-primary px-4 text-[12px] font-bold text-white transition hover:bg-primary-dark active:scale-[0.99]"
              >
                Create free account
              </button>
            </form>

            <p className="mt-2.5 text-center text-extra-small text-slate-500">
              Free forever · No credit card needed
            </p>
          </div>
        </div>
      </div>
   </Container>
    </section>
  );
}

export default PostCard;
