"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Check,
  Globe2,
  LockKeyhole,
  RotateCcw,
  Save,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

interface AdminSettings {
  platformName: string;
  supportEmail: string;
  defaultCountry: string;
  language: string;
  timezone: string;
  autoPublishReviews: boolean;
  flagReviewThreshold: number;
  requireDestinationReview: boolean;
  emailNewReviews: boolean;
  emailFlaggedReviews: boolean;
  emailWeeklyReport: boolean;
  twoFactorRequired: boolean;
  sessionTimeout: string;
}

const defaultSettings: AdminSettings = {
  platformName: "WorldExplore",
  supportEmail: "support@worldexplore.com",
  defaultCountry: "United States",
  language: "English",
  timezone: "UTC",
  autoPublishReviews: false,
  flagReviewThreshold: 3,
  requireDestinationReview: true,
  emailNewReviews: true,
  emailFlaggedReviews: true,
  emailWeeklyReport: false,
  twoFactorRequired: true,
  sessionTimeout: "8",
};

const storageKey = "worldexplore.admin.settings";

function isAdminSettings(value: unknown): value is AdminSettings {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.platformName === "string" &&
    typeof candidate.supportEmail === "string" &&
    typeof candidate.defaultCountry === "string" &&
    typeof candidate.language === "string" &&
    typeof candidate.timezone === "string" &&
    typeof candidate.autoPublishReviews === "boolean" &&
    typeof candidate.flagReviewThreshold === "number" &&
    typeof candidate.requireDestinationReview === "boolean" &&
    typeof candidate.emailNewReviews === "boolean" &&
    typeof candidate.emailFlaggedReviews === "boolean" &&
    typeof candidate.emailWeeklyReport === "boolean" &&
    typeof candidate.twoFactorRequired === "boolean" &&
    typeof candidate.sessionTimeout === "string"
  );
}

function SettingsCard({
  title,
  description,
  icon: Icon,
  children,
}: Readonly<{
  title: string;
  description: string;
  icon: typeof Globe2;
  children: React.ReactNode;
}>) {
  return (
    <section className="overflow-hidden rounded-lg border border-[#eae7e3] bg-white">
      <div className="flex items-start gap-3 border-b border-stone-100 px-4 py-3.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-teal-50 text-primary">
          <Icon size={15} />
        </span>
        <div>
          <h2 className="font-heading text-sm font-bold">{title}</h2>
          <p className="mt-0.5 text-[9px] text-stone-500">{description}</p>
        </div>
      </div>
      <div className="divide-y divide-stone-100 px-4">{children}</div>
    </section>
  );
}

function SettingRow({
  title,
  description,
  children,
}: Readonly<{
  title: string;
  description: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3">
      <div className="min-w-[180px] flex-1">
        <p className="text-[10px] font-semibold text-stone-800">{title}</p>
        <p className="mt-0.5 text-[9px] leading-relaxed text-stone-500">
          {description}
        </p>
      </div>
      <div className="w-full sm:w-auto">{children}</div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: Readonly<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}>) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        checked ? "bg-primary" : "bg-stone-300"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-[18px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}

export default function SettingsPageContent() {
  const [settings, setSettings] = useState(defaultSettings);
  const [savedSettings, setSavedSettings] = useState(defaultSettings);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(storageKey);
        if (stored) {
          const parsed: unknown = JSON.parse(stored);
          if (isAdminSettings(parsed)) {
            setSettings(parsed);
            setSavedSettings(parsed);
          } else {
            setError("Saved settings have an invalid format and were ignored.");
          }
        }
      } catch {
        setError("Saved settings could not be loaded from this browser.");
      } finally {
        setLoaded(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const isDirty = useMemo(
    () => JSON.stringify(settings) !== JSON.stringify(savedSettings),
    [savedSettings, settings],
  );

  function updateSetting<K extends keyof AdminSettings>(
    key: K,
    value: AdminSettings[K],
  ) {
    setSettings((current) => ({ ...current, [key]: value }));
    setMessage("");
    setError("");
  }

  function saveSettings() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(settings));
      setSavedSettings(settings);
      setMessage("Settings saved in this browser.");
      setError("");
    } catch {
      setError("Settings could not be saved. Check browser storage access.");
      setMessage("");
    }
  }

  function resetSettings() {
    setSettings(defaultSettings);
    setMessage("");
    setError("");
  }

  return (
    <div className="min-h-screen">
      <header className="flex min-h-[68px] flex-wrap items-center justify-between gap-3 border-b border-[#eae7e3] bg-white px-4 py-3 sm:px-6">
        <div>
          <h1 className="font-heading text-lg font-bold leading-tight">
            Settings
          </h1>
          <p className="mt-0.5 text-[10px] text-stone-500">
            Manage platform preferences, moderation, and notifications.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetSettings}
            disabled={!isDirty}
            className="flex h-9 items-center gap-1.5 rounded-md border border-stone-200 px-3 text-[10px] font-semibold text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw size={12} />
            Reset
          </button>
          <button
            type="button"
            onClick={saveSettings}
            disabled={!loaded || !isDirty}
            className="flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-[10px] font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={13} />
            Save changes
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-3 p-3 sm:p-5">
        {(message || error) && (
          <p
            role={error ? "alert" : "status"}
            className={`flex items-center gap-2 rounded-md border px-3 py-2 text-[10px] font-medium ${
              error
                ? "border-rose-200 bg-rose-50 text-rose-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {error ? null : <Check size={13} />}
            {error || message}
          </p>
        )}

        <SettingsCard
          title="General"
          description="Basic information and regional defaults for your platform."
          icon={Globe2}
        >
          <SettingRow
            title="Platform name"
            description="Displayed across your admin console and emails."
          >
            <input
              value={settings.platformName}
              onChange={(event) =>
                updateSetting("platformName", event.target.value)
              }
              className="h-9 w-full rounded-md border border-stone-200 px-2.5 text-[10px] outline-none focus:border-primary sm:w-56"
            />
          </SettingRow>
          <SettingRow
            title="Support email"
            description="Where travelers can contact your support team."
          >
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(event) =>
                updateSetting("supportEmail", event.target.value)
              }
              className="h-9 w-full rounded-md border border-stone-200 px-2.5 text-[10px] outline-none focus:border-primary sm:w-56"
            />
          </SettingRow>
          <SettingRow
            title="Default country"
            description="Preselected country for new destination entries."
          >
            <select
              value={settings.defaultCountry}
              onChange={(event) =>
                updateSetting("defaultCountry", event.target.value)
              }
              className="h-9 w-full rounded-md border border-stone-200 bg-white px-2.5 text-[10px] outline-none focus:border-primary sm:w-56"
            >
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
              <option>Japan</option>
            </select>
          </SettingRow>
          <div className="grid gap-3 sm:grid-cols-2">
            <SettingRow
              title="Language"
              description="Admin interface language."
            >
              <select
                value={settings.language}
                onChange={(event) =>
                  updateSetting("language", event.target.value)
                }
                className="h-9 w-full rounded-md border border-stone-200 bg-white px-2.5 text-[10px] outline-none focus:border-primary sm:w-56"
              >
                <option>English</option>
                <option>French</option>
                <option>Spanish</option>
                <option>Japanese</option>
              </select>
            </SettingRow>
            <SettingRow
              title="Timezone"
              description="Used to display dates and activity."
            >
              <select
                value={settings.timezone}
                onChange={(event) =>
                  updateSetting("timezone", event.target.value)
                }
                className="h-9 w-full rounded-md border border-stone-200 bg-white px-2.5 text-[10px] outline-none focus:border-primary sm:w-56"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Asia/Tokyo">Tokyo</option>
              </select>
            </SettingRow>
          </div>
        </SettingsCard>

        <SettingsCard
          title="Content & moderation"
          description="Choose how reviews and destination submissions are handled."
          icon={ShieldCheck}
        >
          <SettingRow
            title="Auto-publish reviews"
            description="Publish new reviews automatically unless they are flagged."
          >
            <Toggle
              label="Auto-publish reviews"
              checked={settings.autoPublishReviews}
              onChange={(value) => updateSetting("autoPublishReviews", value)}
            />
          </SettingRow>
          <SettingRow
            title="Review flag threshold"
            description="Flag a review after this many traveler reports."
          >
            <label className="flex items-center gap-2 text-[10px] text-stone-600">
              <input
                type="number"
                min="1"
                max="20"
                value={settings.flagReviewThreshold}
                onChange={(event) =>
                  updateSetting(
                    "flagReviewThreshold",
                    Math.min(20, Math.max(1, Number(event.target.value) || 1)),
                  )
                }
                className="h-9 w-20 rounded-md border border-stone-200 px-2.5 text-[10px] outline-none focus:border-primary"
              />
              reports
            </label>
          </SettingRow>
          <SettingRow
            title="Review new destinations"
            description="Require an editor to review a destination before publishing."
          >
            <Toggle
              label="Require destination review"
              checked={settings.requireDestinationReview}
              onChange={(value) =>
                updateSetting("requireDestinationReview", value)
              }
            />
          </SettingRow>
        </SettingsCard>

        <SettingsCard
          title="Notifications"
          description="Select which activity updates are sent to the admin team."
          icon={Bell}
        >
          <SettingRow
            title="New reviews"
            description="Receive an email when a traveler posts a review."
          >
            <Toggle
              label="Email notifications for new reviews"
              checked={settings.emailNewReviews}
              onChange={(value) => updateSetting("emailNewReviews", value)}
            />
          </SettingRow>
          <SettingRow
            title="Flagged reviews"
            description="Get notified when a review needs moderation."
          >
            <Toggle
              label="Email notifications for flagged reviews"
              checked={settings.emailFlaggedReviews}
              onChange={(value) => updateSetting("emailFlaggedReviews", value)}
            />
          </SettingRow>
          <SettingRow
            title="Weekly report"
            description="A summary of platform activity delivered each week."
          >
            <Toggle
              label="Weekly report email"
              checked={settings.emailWeeklyReport}
              onChange={(value) => updateSetting("emailWeeklyReport", value)}
            />
          </SettingRow>
        </SettingsCard>

        <SettingsCard
          title="Security"
          description="Keep your administrator account and sessions protected."
          icon={LockKeyhole}
        >
          <SettingRow
            title="Require two-factor authentication"
            description="Require a second verification step for administrator sign-in."
          >
            <Toggle
              label="Require two-factor authentication"
              checked={settings.twoFactorRequired}
              onChange={(value) => updateSetting("twoFactorRequired", value)}
            />
          </SettingRow>
          <SettingRow
            title="Session timeout"
            description="Automatically end inactive admin sessions."
          >
            <label className="flex items-center gap-2 text-[10px] text-stone-600">
              <select
                value={settings.sessionTimeout}
                onChange={(event) =>
                  updateSetting("sessionTimeout", event.target.value)
                }
                className="h-9 rounded-md border border-stone-200 bg-white px-2.5 text-[10px] outline-none focus:border-primary"
              >
                <option value="1">1 hour</option>
                <option value="4">4 hours</option>
                <option value="8">8 hours</option>
                <option value="12">12 hours</option>
                <option value="24">24 hours</option>
              </select>
            </label>
          </SettingRow>
        </SettingsCard>

        <div className="flex items-center justify-between rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5">
          <p className="flex items-center gap-1.5 text-[9px] text-stone-500">
            <SlidersHorizontal size={12} />
            Settings are stored in this browser only.
          </p>
          <span className="text-[9px] font-medium text-stone-500">
            {isDirty ? "Unsaved changes" : "All changes saved"}
          </span>
        </div>
      </main>
    </div>
  );
}
