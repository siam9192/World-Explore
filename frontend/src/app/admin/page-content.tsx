"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  ChevronRight,
  FileText,
  Heart,
  MapPin,
  Plus,
  Search,
  Send,
  Star,
  Users,
} from "lucide-react";
import type { Destination } from "@/types/destination.type";

interface Props {
  destinations: Destination[];
}

const monthlyGrowth = [40, 53, 46, 60, 66, 57, 72, 77, 66, 81, 86, 94];
const reviewActivity = [38, 52, 45, 61, 73, 56, 82];
const categories = [
  { name: "City", count: 142, percentage: 22, color: "bg-primary" },
  { name: "Beach", count: 128, percentage: 20, color: "bg-amber-500" },
  { name: "Nature", count: 110, percentage: 17, color: "bg-green-600" },
  { name: "Mountain", count: 96, percentage: 15, color: "bg-stone-500" },
  { name: "Other", count: 168, percentage: 26, color: "bg-stone-200" },
];
const months = ["N", "D", "J", "F", "M", "A", "M", "J", "J", "A", "S", "O"];
const saveCounts = ["12.4k", "11.8k", "10.2k", "9.6k", "8.1k"];
const saveChanges = ["+212%", "+96%", "+188%", "+64%", "+41%"];

const metrics = [
  {
    label: "Total destinations",
    value: "1,284",
    change: "+24 new",
    icon: MapPin,
    iconClass: "bg-teal-50 text-primary",
  },
  {
    label: "Total users",
    value: "48,210",
    change: "+6.1%",
    icon: Users,
    iconClass: "bg-amber-50 text-amber-600",
  },
  {
    label: "Total reviews",
    value: "86,402",
    change: "+912 wk",
    icon: Star,
    iconClass: "bg-teal-50 text-primary",
  },
  {
    label: "Total favourites",
    value: "214k",
    change: "+3.8%",
    icon: Heart,
    iconClass: "bg-rose-50 text-rose-500",
  },
];

function Panel({
  children,
  className = "",
  id,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}>) {
  return (
    <section
      id={id}
      className={`min-w-0 rounded-lg border border-[#eae7e3] bg-white ${className}`}
    >
      {children}
    </section>
  );
}

function PanelHeading({
  title,
  subtitle,
  action,
}: Readonly<{ title: string; subtitle?: string; action?: React.ReactNode }>) {
  return (
    <div className="flex items-start justify-between gap-3 px-4 pb-2 pt-3.5">
      <div>
        <h2 className="font-heading text-base font-bold leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-0.5 text-[10px] text-stone-500">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export default function AdminDashboard({ destinations }: Props) {
  const [search, setSearch] = useState("");
  const filteredDestinations = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return destinations.slice(0, 5);
    return destinations
      .filter((destination) =>
        `${destination.location.city} ${destination.location.country} ${destination.title}`
          .toLowerCase()
          .includes(query),
      )
      .slice(0, 5);
  }, [destinations, search]);

  return (
    <div>
      <header className="sticky top-0 z-10 flex min-h-[68px] flex-wrap items-center justify-between gap-3 border-b border-[#eae7e3] bg-white px-4 py-3 sm:px-6">
        <div>
          <h1 className="font-heading text-lg font-bold leading-tight">
            Good morning, Elena
          </h1>
          <p className="mt-0.5 text-[10px] text-stone-500">
            Wednesday, Oct 21 · Here is what is happening across the platform.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="relative hidden md:block">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500"
            />
            <span className="sr-only">Search destinations</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search destinations, users..."
              className="h-9 w-52 rounded-md border border-stone-200 bg-stone-50 pl-8 pr-3 text-[10px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </label>
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-stone-200 text-stone-700 transition hover:bg-stone-50"
          >
            <Bell size={15} />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
          </button>
          <Link
            href="/admin/destinations/new"
            className="flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-[10px] font-semibold text-white transition hover:bg-primary-dark"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">New destination</span>
            <span className="sm:hidden">New</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] space-y-3 p-3 sm:p-5">
        <section
          aria-label="Platform statistics"
          className="grid grid-cols-2 gap-3 xl:grid-cols-4"
        >
          {metrics.map(({ label, value, change, icon: Icon, iconClass }) => (
            <article
              key={label}
              className="rounded-lg border border-[#eae7e3] bg-white p-3 sm:p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-md ${iconClass}`}
                >
                  <Icon size={15} />
                </span>
                <span className="rounded-sm bg-teal-50 px-1.5 py-1 text-[9px] font-semibold text-emerald-600">
                  {change}
                </span>
              </div>
              <p className="mt-2.5 font-heading text-xl font-bold leading-none sm:text-2xl">
                {value}
              </p>
              <p className="mt-1 text-[10px] text-stone-500">{label}</p>
            </article>
          ))}
        </section>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.8fr)_minmax(220px,0.85fr)]">
          <Panel>
            <PanelHeading
              title="User growth"
              subtitle="New registrations · last 12 months"
              action={
                <span className="mt-0.5 rounded border border-stone-200 px-2 py-1 text-[9px] font-semibold">
                  2025 – 2026
                </span>
              }
            />
            <div
              aria-label="Monthly user growth chart"
              className="flex h-[132px] items-end gap-1.5 px-4 pb-3 pt-2 sm:gap-2"
            >
              {monthlyGrowth.map((height, index) => (
                <div
                  key={`${months[index]}-${index}`}
                  className="flex h-full min-w-0 flex-1 flex-col justify-end"
                >
                  <div
                    className={`w-full rounded-t-[3px] ${
                      index === monthlyGrowth.length - 1
                        ? "bg-primary"
                        : "bg-[#dcebea]"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  <span className="mt-1.5 text-center text-[8px] text-stone-500">
                    {months[index]}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHeading
              title="By category"
              subtitle="Destination distribution"
            />
            <div className="space-y-2.5 px-4 pb-3 pt-1">
              {categories.map(({ name, count, percentage, color }) => (
                <div key={name}>
                  <div className="mb-1 flex items-center justify-between text-[9px]">
                    <span className="font-semibold">
                      {name} · {count}
                    </span>
                    <span className="text-stone-500">{percentage}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-stone-100">
                    <div
                      className={`h-full rounded-full ${color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="grid gap-3 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.9fr)]">
          <Panel id="destinations">
            <PanelHeading
              title="Most popular destinations"
              action={
                <Link
                  href="/admin/destinations"
                  className="mt-1 flex items-center gap-1 text-[9px] font-semibold text-primary hover:text-primary-dark"
                >
                  View all <ArrowRight size={12} />
                </Link>
              }
            />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse text-left">
                <thead>
                  <tr className="border-y border-stone-100 text-[9px] text-stone-500">
                    <th className="px-4 py-2 font-medium">Destination</th>
                    <th className="px-3 py-2 font-medium">Rating</th>
                    <th className="px-3 py-2 font-medium">Saves</th>
                    <th className="px-4 py-2 text-right font-medium">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDestinations.map((destination, index) => (
                    <tr
                      key={destination.id}
                      className="border-b border-stone-100 last:border-0"
                    >
                      <td className="px-4 py-1.5">
                        <div className="flex items-center gap-2.5">
                          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-stone-100">
                            <Image
                              src={destination.images[0]}
                              alt=""
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          </div>
                          <span className="text-[10px] font-medium">
                            {destination.location.city},{" "}
                            {destination.location.country}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-1.5">
                        <span className="inline-flex items-center gap-1 text-[10px]">
                          <Star
                            size={11}
                            className="fill-amber-500 text-amber-500"
                          />
                          {destination.rating.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-3 py-1.5 text-[10px] text-stone-500">
                        {saveCounts[index]}
                      </td>
                      <td className="px-4 py-1.5 text-right text-[9px] font-semibold text-emerald-600">
                        {saveChanges[index]}
                      </td>
                    </tr>
                  ))}
                  {filteredDestinations.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-xs text-stone-500"
                      >
                        No destinations match “{search}”.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel id="reviews">
            <PanelHeading title="Reviews this week" />
            <div
              aria-label="Daily reviews this week"
              className="flex h-[76px] items-end gap-1.5 px-4 pb-3 pt-1"
            >
              {reviewActivity.map((height, index) => (
                <div
                  key={index}
                  className={`flex-1 rounded-t-[3px] ${
                    index === reviewActivity.length - 1
                      ? "bg-amber-500"
                      : "bg-[#fde8c3]"
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="mx-4 border-t border-stone-100 py-1">
              <Link
                href="/admin/reviews"
                className="flex items-center gap-2 py-1.5"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-50 text-primary">
                  <Star size={12} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[9px] font-medium">
                    Flagged reviews need attention
                  </span>
                  <span className="block text-[8px] text-stone-500">
                    18 pending
                  </span>
                </span>
                <ChevronRight size={13} className="text-stone-500" />
              </Link>
              <Link
                href="/admin/destinations"
                className="flex items-center gap-2 py-1.5"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-50 text-primary">
                  <FileText size={12} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[9px] font-medium">
                    24 drafts await publishing
                  </span>
                  <span className="block text-[8px] text-stone-500">
                    Content queue
                  </span>
                </span>
                <ChevronRight size={13} className="text-stone-500" />
              </Link>
              <Link
                href="/admin/reviews"
                className="flex items-center gap-2 py-1.5"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-50 text-primary">
                  <Send size={12} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[9px] font-medium">
                    Weekly digest ready to send
                  </span>
                  <span className="block text-[8px] text-stone-500">
                    240k readers
                  </span>
                </span>
                <ChevronRight size={13} className="text-stone-500" />
              </Link>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
