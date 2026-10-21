"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  LayoutDashboard,
  MapPin,
  Settings,
  Star,
  Tags,
  Users,
} from "lucide-react";

const adminNavigation = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Destinations", href: "/admin/destinations", icon: MapPin },
  { label: "Categories", href: "/admin/categories", icon: Tags },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Reviews", href: "/admin/reviews", icon: Star, badge: "18" },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col bg-[#1c1a18] text-white md:fixed md:inset-y-0 md:w-52">
      <Link
        href="/admin"
        className="flex h-[68px] items-center gap-3 border-b border-white/10 px-5"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
          <Compass size={18} strokeWidth={2.4} />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-heading text-sm font-bold">WorldExplore</span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">
            Admin Console
          </span>
        </span>
      </Link>

      <nav
        aria-label="Admin navigation"
        className="flex gap-1 overflow-x-auto p-3 md:flex-1 md:flex-col md:overflow-visible md:pt-4"
      >
        {adminNavigation.map(({ label, href, icon: Icon, badge }) => {
          const isActive =
            href === "/admin"
              ? pathname === href
              : pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={label}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={15} strokeWidth={2} />
              <span>{label}</span>
              {badge && (
                <span className="ml-auto rounded bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold leading-none text-[#211b12]">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="hidden p-3 md:block">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <p className="text-[10px] font-semibold text-white/90">
            Autumn issue is live. 24 drafts await review.
          </p>
          <Link
            href="/admin/reviews"
            className="mt-3 flex items-center justify-center rounded-md bg-amber-500 px-3 py-2 text-[10px] font-bold text-[#211b12] transition-colors hover:bg-amber-400"
          >
            Review queue
          </Link>
        </div>
        <Link
          href="/"
          className="mt-3 flex items-center gap-2 px-2 py-1.5 text-[10px] text-white/65 transition-colors hover:text-white"
        >
          <Compass size={13} />
          View live site
        </Link>
      </div>
    </aside>
  );
}
