"use client";

import Link from "next/link";
import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  ImagePlus,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import type { Destination } from "@/types/destination.type";

type PublishStatus = "Published" | "Draft" | "Review";
type SortMode = "Top rated" | "Name A–Z" | "Newest";

interface AdminDestination {
  id: string;
  title: string;
  slug: string;
  city: string;
  country: string;
  category: string;
  rating: number;
  status: PublishStatus;
  image: string;
  dailyCost: number;
  bestTime: string;
  description: string;
  activities: string;
}

interface DestinationForm {
  title: string;
  country: string;
  city: string;
  dailyCost: string;
  bestTime: string;
  category: string;
  description: string;
  activities: string;
  images: string[];
}

interface Props {
  destinations: Destination[];
  categories: string[];
}

const pageSize = 6;

const emptyForm: DestinationForm = {
  title: "",
  country: "",
  city: "",
  dailyCost: "",
  bestTime: "",
  category: "",
  description: "",
  activities: "",
  images: [],
};

function getInitialStatus(index: number): PublishStatus {
  if (index === 3) return "Draft";
  if (index === 4) return "Review";
  return "Published";
}

function toAdminDestination(
  destination: Destination,
  index: number,
): AdminDestination {
  return {
    id: destination.id,
    title: destination.title,
    slug: destination.slug,
    city: destination.location.city,
    country: destination.location.country,
    category: destination.categories[0] ?? "",
    rating: destination.rating,
    status: getInitialStatus(index),
    image: destination.images[0] ?? "",
    dailyCost: destination.price.amount,
    bestTime: "",
    description: destination.shortDescription,
    activities: "",
  };
}

function isImportedDestination(value: unknown): value is Destination {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  const location = candidate.location;
  const price = candidate.price;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.slug === "string" &&
    Array.isArray(candidate.images) &&
    candidate.images.every((image) => typeof image === "string") &&
    Array.isArray(candidate.categories) &&
    candidate.categories.every((category) => typeof category === "string") &&
    typeof candidate.rating === "number" &&
    typeof candidate.totalReviews === "number" &&
    typeof candidate.isFavorite === "boolean" &&
    typeof candidate.shortDescription === "string" &&
    typeof location === "object" &&
    location !== null &&
    typeof (location as Record<string, unknown>).city === "string" &&
    typeof (location as Record<string, unknown>).country === "string" &&
    typeof price === "object" &&
    price !== null &&
    typeof (price as Record<string, unknown>).amount === "number"
  );
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  min,
}: Readonly<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  min?: string;
}>) {
  return (
    <label className="block min-w-0 text-[9px] font-semibold uppercase tracking-wide text-stone-600">
      {label}
      <input
        type={type}
        required={required}
        min={min}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-1.5 h-9 w-full rounded-md border border-stone-200 bg-white px-2.5 text-[10px] font-normal normal-case tracking-normal text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
      />
    </label>
  );
}

export default function DestinationsPageContent({
  destinations: initialDestinations,
  categories,
}: Props) {
  const [items, setItems] = useState(
    initialDestinations.map(toAdminDestination),
  );
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [sortMode, setSortMode] = useState<SortMode>("Top rated");
  const [page, setPage] = useState(1);
  const [form, setForm] = useState<DestinationForm>(emptyForm);
  const [isPublished, setIsPublished] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = items.filter((destination) => {
      const matchesSearch =
        !query ||
        `${destination.city} ${destination.country} ${destination.title}`
          .toLowerCase()
          .includes(query);
      const matchesCategory =
        categoryFilter === "All categories" ||
        destination.category === categoryFilter;
      const matchesStatus =
        statusFilter === "All statuses" ||
        destination.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });

    return filtered.sort((left, right) => {
      if (sortMode === "Name A–Z") return left.city.localeCompare(right.city);
      if (sortMode === "Newest") {
        return right.id.localeCompare(left.id, undefined, { numeric: true });
      }
      return right.rating - left.rating;
    });
  }, [categoryFilter, items, search, sortMode, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const visibleItems = filteredItems.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );
  const pageStart = filteredItems.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const pageEnd = Math.min(page * pageSize, filteredItems.length);

  function updateForm<K extends keyof DestinationForm>(
    key: K,
    value: DestinationForm[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function startNewDestination() {
    setEditingId(null);
    setForm(emptyForm);
    setIsPublished(true);
    setError("");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function startEditing(destination: AdminDestination) {
    setEditingId(destination.id);
    setForm({
      title: destination.title,
      country: destination.country,
      city: destination.city,
      dailyCost: String(destination.dailyCost),
      bestTime: destination.bestTime,
      category: destination.category,
      description: destination.description,
      activities: destination.activities,
      images: destination.image ? [destination.image] : [],
    });
    setIsPublished(destination.status === "Published");
    setError("");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function saveDestination(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const title = form.title.trim();
    const city = form.city.trim();
    const country = form.country.trim();
    const selectedCategory = form.category.trim();
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const status: PublishStatus =
      submitter instanceof HTMLButtonElement
        ? submitter.value === "publish"
          ? "Published"
          : "Draft"
        : isPublished
          ? "Published"
          : "Draft";

    if (!title || !city || !country || !selectedCategory) {
      setError("Complete the title, country, city, and category fields.");
      return;
    }
    if (!form.images[0]) {
      setError("Add a cover image before saving this destination.");
      return;
    }

    const slug = slugify(`${city}-${country}`);
    const existingSlug = items.find(
      (destination) =>
        destination.slug === slug && destination.id !== editingId,
    );
    if (existingSlug) {
      setError("A destination with this city and country already exists.");
      return;
    }

    const saved: AdminDestination = {
      id: editingId ?? `destination-${Date.now()}`,
      title,
      slug,
      city,
      country,
      category: selectedCategory,
      rating: editingId
        ? (items.find((destination) => destination.id === editingId)?.rating ??
          0)
        : 0,
      status,
      image: form.images[0],
      dailyCost: Number(form.dailyCost) || 0,
      bestTime: form.bestTime.trim(),
      description: form.description.trim(),
      activities: form.activities.trim(),
    };

    setItems((current) =>
      editingId
        ? current.map((destination) =>
            destination.id === editingId ? saved : destination,
          )
        : [saved, ...current],
    );
    setPage(1);
    setEditingId(null);
    setForm(emptyForm);
    setIsPublished(true);
  }

  async function addImages(files: FileList | null) {
    if (!files?.length) return;
    const availableSlots = Math.max(0, 4 - form.images.length);
    const selectedFiles = Array.from(files).slice(0, availableSlots);
    if (selectedFiles.length === 0) {
      setError("A destination can have up to four images.");
      return;
    }

    try {
      const imageData = await Promise.all(
        selectedFiles.map(
          (file) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onerror = () =>
                reject(new Error(`Unable to read ${file.name}.`));
              reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result);
                else reject(new Error(`Unable to read ${file.name}.`));
              };
              reader.readAsDataURL(file);
            }),
        ),
      );
      setForm((current) => ({
        ...current,
        images: [...current.images, ...imageData],
      }));
      setError("");
    } catch (readError) {
      setError(
        readError instanceof Error
          ? readError.message
          : "Unable to read the selected image.",
      );
    } finally {
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  }

  async function importJson(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const parsed: unknown = JSON.parse(await file.text());
      if (!Array.isArray(parsed) || !parsed.every(isImportedDestination)) {
        setError("Import a JSON array of valid WorldExplore destinations.");
        return;
      }
      setItems((current) => [
        ...parsed.map((destination, index) =>
          toAdminDestination(destination, index),
        ),
        ...current,
      ]);
      setPage(1);
      setError("");
    } catch {
      setError("Could not read this JSON file. Check its format and try again.");
    } finally {
      event.target.value = "";
    }
  }

  function deleteDestination(destination: AdminDestination) {
    if (
      !window.confirm(
        `Delete the ${destination.city}, ${destination.country} destination?`,
      )
    ) {
      return;
    }
    setItems((current) =>
      current.filter((item) => item.id !== destination.id),
    );
    setPage(1);
  }

  return (
    <div className="min-h-screen">
      <header className="flex min-h-[68px] flex-wrap items-center justify-between gap-3 border-b border-[#eae7e3] bg-white px-4 py-3 sm:px-6">
        <div>
          <h1 className="font-heading text-lg font-bold leading-tight">
            Destinations
          </h1>
          <p className="mt-0.5 text-[10px] text-stone-500">
            {items.length} destinations ·{" "}
            {items.filter((item) => item.status !== "Published").length} drafts
            awaiting review
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={importInputRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            aria-label="Import destinations JSON"
            onChange={importJson}
          />
          <button
            type="button"
            onClick={() => importInputRef.current?.click()}
            className="flex h-9 items-center gap-1.5 rounded-md border border-stone-200 px-3 text-[10px] font-semibold text-stone-700 transition hover:bg-stone-50"
          >
            <Upload size={13} />
            Import
          </button>
          <button
            type="button"
            onClick={startNewDestination}
            className="flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-[10px] font-semibold text-white transition hover:bg-primary-dark"
          >
            <Plus size={14} />
            Add destination
          </button>
        </div>
      </header>

      <div className="space-y-3 p-3 sm:p-5">
        <section className="overflow-hidden rounded-lg border border-[#eae7e3] bg-white">
          <div className="flex flex-wrap items-center gap-2 border-b border-stone-100 p-3">
            <label className="relative min-w-[190px] flex-1">
              <span className="sr-only">Search destinations</span>
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search by name, city, country..."
                className="h-9 w-full rounded-md border border-stone-200 bg-stone-50 px-3 text-[10px] outline-none transition placeholder:text-stone-500 focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </label>
            <FilterSelect
              label="All categories"
              value={categoryFilter}
              options={["All categories", ...categories]}
              onChange={(value) => {
                setCategoryFilter(value);
                setPage(1);
              }}
            />
            <FilterSelect
              label="All statuses"
              value={statusFilter}
              options={["All statuses", "Published", "Draft", "Review"]}
              onChange={(value) => {
                setStatusFilter(value);
                setPage(1);
              }}
            />
            <FilterSelect
              label="Top rated"
              value={sortMode}
              options={["Top rated", "Name A–Z", "Newest"]}
              onChange={(value) => setSortMode(value as SortMode)}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="border-b border-rose-100 bg-rose-50 px-4 py-2 text-[10px] font-medium text-rose-700"
            >
              {error}
            </p>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-stone-100 text-[9px] text-stone-500">
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    Destination
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    Category
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    Rating
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2.5 text-right font-medium"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleItems.map((destination) => (
                  <tr
                    key={destination.id}
                    className="border-b border-stone-100 last:border-0 hover:bg-stone-50/60"
                  >
                    <td className="px-4 py-1.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="h-9 w-9 shrink-0 rounded-md bg-cover bg-center bg-stone-100"
                          role="img"
                          aria-label={`${destination.city} cover`}
                          style={{
                            backgroundImage: `url("${destination.image}")`,
                          }}
                        />
                        <span className="min-w-0">
                          <span className="block text-[10px] font-semibold text-stone-800">
                            {destination.city}
                          </span>
                          <span className="block truncate text-[9px] text-stone-500">
                            {destination.country}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-1.5">
                      <span className="rounded-sm bg-teal-50 px-1.5 py-1 text-[9px] font-medium text-primary">
                        {destination.category || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 text-[10px]">
                      <span className="font-semibold text-amber-600">
                        ★ {destination.rating.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-3 py-1.5">
                      <span
                        className={`rounded-sm px-1.5 py-1 text-[9px] font-semibold ${
                          destination.status === "Published"
                            ? "bg-emerald-50 text-emerald-700"
                            : destination.status === "Review"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-stone-100 text-stone-600"
                        }`}
                      >
                        {destination.status}
                      </span>
                    </td>
                    <td className="px-4 py-1.5">
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          aria-label={`Edit ${destination.city}`}
                          title="Edit destination"
                          onClick={() => startEditing(destination)}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-stone-200 text-stone-600 transition hover:border-primary hover:text-primary"
                        >
                          <Pencil size={12} />
                        </button>
                        <Link
                          href={`/explore/${destination.slug}`}
                          aria-label={`View ${destination.city}`}
                          title="View destination"
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-stone-200 text-stone-600 transition hover:border-primary hover:text-primary"
                        >
                          <Eye size={12} />
                        </Link>
                        <button
                          type="button"
                          aria-label={`Delete ${destination.city}`}
                          title="Delete destination"
                          onClick={() => deleteDestination(destination)}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-stone-200 text-rose-600 transition hover:border-rose-300 hover:bg-rose-50"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {visibleItems.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-xs text-stone-500"
                    >
                      No destinations match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 px-4 py-2.5">
            <p className="text-[9px] text-stone-500">
              Showing {pageStart}–{pageEnd} of {filteredItems.length}{" "}
              destinations
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous page"
                disabled={page <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-stone-200 text-stone-600 disabled:opacity-40"
              >
                <ChevronLeft size={13} />
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1)
                .slice(0, 3)
                .map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    aria-current={pageNumber === page ? "page" : undefined}
                    onClick={() => setPage(pageNumber)}
                    className={`h-7 min-w-7 rounded-md border px-2 text-[9px] font-semibold ${
                      pageNumber === page
                        ? "border-primary bg-primary text-white"
                        : "border-stone-200 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              <button
                type="button"
                aria-label="Next page"
                disabled={page >= pageCount}
                onClick={() =>
                  setPage((current) => Math.min(pageCount, current + 1))
                }
                className="flex h-7 w-7 items-center justify-center rounded-md border border-stone-200 text-stone-600 disabled:opacity-40"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </footer>
        </section>

        <section
          ref={formRef}
          className="scroll-mt-4 rounded-lg border border-[#eae7e3] bg-white p-3 sm:p-4"
        >
          <div className="mb-3">
            <h2 className="font-heading text-base font-bold">
              {editingId ? "Edit destination" : "Add destination"}
            </h2>
            <p className="mt-0.5 text-[9px] text-stone-500">
              Cover, gallery and publishing status.
            </p>
          </div>

          <form onSubmit={saveDestination}>
            <div className="grid gap-4 lg:grid-cols-[minmax(190px,0.72fr)_minmax(0,1.5fr)]">
              <div>
                <div
                  className={`relative flex min-h-28 flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed ${
                    form.images.length
                      ? "border-primary/30 bg-stone-50"
                      : "border-stone-200 bg-white"
                  }`}
                >
                  {form.images[0] ? (
                    <div
                      role="img"
                      aria-label="Destination cover preview"
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url("${form.images[0]}")`,
                      }}
                    />
                  ) : (
                    <>
                      <ImagePlus size={17} className="text-stone-500" />
                      <span className="mt-2 text-[9px] font-semibold">
                        Drop cover image
                      </span>
                      <span className="mt-1 text-[8px] text-stone-500">
                        or browse files · max 4 images
                      </span>
                    </>
                  )}
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    aria-label="Choose destination images"
                    onChange={(event) => addImages(event.target.files)}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
                <div className="mt-2 flex gap-1.5">
                  {form.images.map((image, index) => (
                    <div
                      key={`${image.slice(0, 24)}-${index}`}
                      className="relative h-8 w-9 overflow-hidden rounded-md border border-stone-200 bg-cover bg-center"
                      role="img"
                      aria-label={`Destination image ${index + 1}`}
                      style={{ backgroundImage: `url("${image}")` }}
                    >
                      <button
                        type="button"
                        aria-label={`Remove image ${index + 1}`}
                        onClick={() =>
                          updateForm(
                            "images",
                            form.images.filter((_, imageIndex) => imageIndex !== index),
                          )
                        }
                        className="absolute right-0 top-0 rounded-bl bg-white/90 p-0.5 text-rose-600"
                      >
                        <X size={9} />
                      </button>
                    </div>
                  ))}
                  {form.images.length < 4 && (
                    <button
                      type="button"
                      aria-label="Add images"
                      onClick={() => imageInputRef.current?.click()}
                      className="flex h-8 w-9 items-center justify-center rounded-md border border-dashed border-stone-300 text-stone-500 hover:border-primary hover:text-primary"
                    >
                      <Plus size={13} />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid content-start gap-2.5 sm:grid-cols-2">
                <Field
                  label="Title"
                  required
                  value={form.title}
                  onChange={(value) => updateForm("title", value)}
                  placeholder="e.g. Santorini"
                />
                <Field
                  label="Country"
                  required
                  value={form.country}
                  onChange={(value) => updateForm("country", value)}
                  placeholder="e.g. Greece"
                />
                <Field
                  label="City"
                  required
                  value={form.city}
                  onChange={(value) => updateForm("city", value)}
                  placeholder="e.g. Oia"
                />
                <Field
                  label="Daily cost ($)"
                  type="number"
                  min="0"
                  value={form.dailyCost}
                  onChange={(value) => updateForm("dailyCost", value)}
                  placeholder="e.g. 145"
                />
                <Field
                  label="Best time to visit"
                  value={form.bestTime}
                  onChange={(value) => updateForm("bestTime", value)}
                  placeholder="e.g. May – Oct"
                />
                <label className="block min-w-0 text-[9px] font-semibold uppercase tracking-wide text-stone-600">
                  Category
                  <span className="relative mt-1.5 block">
                    <select
                      required
                      value={form.category}
                      onChange={(event) =>
                        updateForm("category", event.target.value)
                      }
                      className="h-9 w-full appearance-none rounded-md border border-stone-200 bg-white px-2.5 pr-8 text-[10px] font-normal normal-case tracking-normal text-stone-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={12}
                      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500"
                    />
                  </span>
                </label>
                <label className="block text-[9px] font-semibold uppercase tracking-wide text-stone-600 sm:col-span-2">
                  Description
                  <textarea
                    value={form.description}
                    onChange={(event) =>
                      updateForm("description", event.target.value)
                    }
                    placeholder="A short guide to this destination..."
                    rows={2}
                    className="mt-1.5 w-full resize-y rounded-md border border-stone-200 px-2.5 py-2 text-[10px] font-normal normal-case tracking-normal text-stone-800 outline-none placeholder:text-stone-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </label>
                <label className="block text-[9px] font-semibold uppercase tracking-wide text-stone-600 sm:col-span-2">
                  Popular activities (comma separated)
                  <input
                    value={form.activities}
                    onChange={(event) =>
                      updateForm("activities", event.target.value)
                    }
                    placeholder="e.g. Caldera sailing, Wine tasting, Old town walk"
                    className="mt-1.5 h-9 w-full rounded-md border border-stone-200 px-2.5 text-[10px] font-normal normal-case tracking-normal text-stone-800 outline-none placeholder:text-stone-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </label>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-3">
              <label className="flex items-center gap-2 text-[9px] font-medium text-stone-700">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(event) => setIsPublished(event.target.checked)}
                  className="h-3.5 w-3.5 accent-primary"
                />
                Publish immediately
              </label>
              <div className="flex items-center gap-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setForm(emptyForm);
                      setError("");
                    }}
                    className="rounded-md border border-stone-200 px-3 py-2 text-[9px] font-semibold text-stone-700 hover:bg-stone-50"
                  >
                    Cancel edit
                  </button>
                )}
                <button
                  type="submit"
                  value="draft"
                  className="rounded-md border border-stone-200 px-3 py-2 text-[9px] font-semibold text-stone-700 hover:bg-stone-50"
                >
                  Save draft
                </button>
                <button
                  type="submit"
                  value="publish"
                  className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-[9px] font-semibold text-white hover:bg-primary-dark"
                >
                  <Check size={11} />
                  Publish
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: Readonly<{
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}>) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 appearance-none rounded-md border border-stone-200 bg-white py-0 pl-2.5 pr-7 text-[9px] font-medium text-stone-700 outline-none transition focus:border-primary"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        size={11}
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-stone-500"
      />
    </label>
  );
}
