import type { Metadata } from "next";
import SettingsPageContent from "./settings-page-content";

export const metadata: Metadata = {
  title: "Settings | WorldExplore Admin",
  description: "Configure WorldExplore platform and moderation settings.",
};

export default function AdminSettingsPage() {
  return <SettingsPageContent />;
}
