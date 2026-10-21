import type { Metadata } from "next";
import UsersPageContent from "./users-page-content";

export const metadata: Metadata = {
  title: "Users | WorldExplore Admin",
  description: "Manage WorldExplore members and their account access.",
};

export default function AdminUsersPage() {
  return <UsersPageContent />;
}
