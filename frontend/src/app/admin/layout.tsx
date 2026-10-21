import type { Metadata } from "next";
import AdminSidebar from "./admin-sidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard | WorldExplore",
  description: "Manage destinations, categories, users, and reviews.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf9f7] text-[#201d1a] md:flex-row">
      <AdminSidebar />
      <main className="min-w-0 flex-1 md:ml-52">{children}</main>
    </div>
  );
}
