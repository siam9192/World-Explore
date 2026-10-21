"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { Check, ChevronRight, Pencil, Plus, Trash2, X } from "lucide-react";
import type { Category } from "@/types/category.type";

interface Props {
  categories: Category[];
}

type CategoryForm = Pick<Category, "name" | "count" | "image" | "avg_rating">;

const emptyCategory: CategoryForm = {
  name: "",
  count: "0",
  image: "",
  avg_rating: 0,
};

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CategoriesPageContent({ categories }: Props) {
  const [items, setItems] = useState(categories);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form, setForm] = useState<CategoryForm>(emptyCategory);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const totalDestinations = items.reduce(
    (sum, category) => sum + Number(category.count || 0),
    0,
  );

  function openCreateDialog() {
    setEditingCategory(null);
    setForm(emptyCategory);
    setError("");
    setDialogOpen(true);
  }

  function openEditDialog(category: Category) {
    setEditingCategory(category);
    setForm({
      name: category.name,
      count: category.count,
      image: category.image,
      avg_rating: category.avg_rating,
    });
    setError("");
    setDialogOpen(true);
  }

  function saveCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = form.name.trim();
    const slug = toSlug(name);

    if (!name || !slug || !form.image.trim()) {
      setError("Enter a category name and image URL.");
      return;
    }

    const duplicate = items.some(
      (category) =>
        category.slug === slug && category.id !== editingCategory?.id,
    );
    if (duplicate) {
      setError("A category with this name already exists.");
      return;
    }

    if (editingCategory) {
      setItems((current) =>
        current.map((category) =>
          category.id === editingCategory.id
            ? {
                ...category,
                ...form,
                name,
                image: form.image.trim(),
                slug,
                updated_at: new Date().toISOString(),
              }
            : category,
        ),
      );
    } else {
      const now = new Date().toISOString();
      setItems((current) => [
        ...current,
        {
          ...form,
          id: `category-${Date.now()}`,
          name,
          image: form.image.trim(),
          slug,
          created_at: now,
          updated_at: now,
        },
      ]);
    }

    setDialogOpen(false);
    setEditingCategory(null);
    setForm(emptyCategory);
  }

  function deleteCategory(category: Category) {
    if (!window.confirm(`Delete the “${category.name}” category?`)) return;
    setItems((current) =>
      current.filter((item) => item.id !== category.id),
    );
  }

  return (
    <div className="min-h-screen">
      <header className="flex min-h-[68px] flex-wrap items-center justify-between gap-3 border-b border-[#eae7e3] bg-white px-4 py-3 sm:px-6">
        <div>
          <h1 className="font-heading text-lg font-bold leading-tight">
            Categories
          </h1>
          <p className="mt-0.5 text-[10px] text-stone-500">
            {items.length} collections · {totalDestinations.toLocaleString()}{" "}
            filed destinations
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateDialog}
          className="flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-[10px] font-semibold text-white transition hover:bg-primary-dark"
        >
          <Plus size={14} />
          New category
        </button>
      </header>

      <div className="p-3 sm:p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((category) => (
            <article
              key={category.id}
              className="group overflow-hidden rounded-lg border border-[#eae7e3] bg-white"
            >
              <div className="relative aspect-[1.8/1] overflow-hidden bg-stone-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute right-2 top-2 flex gap-1">
                  <button
                    type="button"
                    aria-label={`Edit ${category.name}`}
                    title="Edit category"
                    onClick={() => openEditDialog(category)}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-white/95 text-stone-700 shadow-sm transition hover:text-primary"
                  >
                    <Pencil size={12} />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${category.name}`}
                    title="Delete category"
                    onClick={() => deleteCategory(category)}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-white/95 text-rose-600 shadow-sm transition hover:bg-rose-50"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 px-3 py-2">
                <div className="min-w-0">
                  <h2 className="font-heading text-sm font-bold">
                    {category.name}
                  </h2>
                  <p className="mt-0.5 text-[9px] text-stone-500">
                    {category.count} places <span className="px-1">·</span>
                    <span aria-label={`${category.avg_rating} average rating`}>
                      ★ {category.avg_rating.toFixed(1)}
                    </span>
                  </p>
                </div>
                <ChevronRight
                  size={14}
                  className="shrink-0 text-stone-500"
                  aria-hidden="true"
                />
              </div>
            </article>
          ))}

          <button
            type="button"
            onClick={openCreateDialog}
            className="flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-stone-200 bg-white text-center transition hover:border-primary hover:bg-teal-50/30"
          >
            <Plus size={19} className="text-stone-500" />
            <span className="mt-2 text-[10px] font-semibold">Create category</span>
            <span className="mt-1 text-[9px] text-stone-500">
              Cover · name · icon
            </span>
          </button>
        </div>
      </div>

      {dialogOpen ? (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setDialogOpen(false);
              setEditingCategory(null);
              setForm(emptyCategory);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-dialog-title"
            className="w-full max-w-md rounded-xl border border-stone-200 bg-white p-5 shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2
                  id="category-dialog-title"
                  className="font-heading text-base font-bold"
                >
                  {editingCategory ? "Edit category" : "Create category"}
                </h2>
                <p className="mt-1 text-[10px] text-stone-500">
                  Set the name, cover image, and category details.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={() => {
                  setDialogOpen(false);
                  setEditingCategory(null);
                  setForm(emptyCategory);
                }}
                className="rounded-md p-1 text-stone-500 hover:bg-stone-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={saveCategory} className="mt-5 space-y-3">
              <label className="block text-[10px] font-medium text-stone-600">
                Category name
                <input
                  autoFocus
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder="e.g. Wildlife"
                  className="mt-1 h-9 w-full rounded-md border border-stone-200 px-2.5 text-xs text-stone-800 outline-none focus:border-primary"
                />
              </label>
              <label className="block text-[10px] font-medium text-stone-600">
                Cover image URL
                <input
                  required
                  type="url"
                  value={form.image}
                  onChange={(event) =>
                    setForm({ ...form, image: event.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  className="mt-1 h-9 w-full rounded-md border border-stone-200 px-2.5 text-xs text-stone-800 outline-none focus:border-primary"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-[10px] font-medium text-stone-600">
                  Places
                  <input
                    type="number"
                    min="0"
                    value={form.count}
                    onChange={(event) =>
                      setForm({ ...form, count: event.target.value })
                    }
                    className="mt-1 h-9 w-full rounded-md border border-stone-200 px-2.5 text-xs text-stone-800 outline-none focus:border-primary"
                  />
                </label>
                <label className="block text-[10px] font-medium text-stone-600">
                  Average rating
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={form.avg_rating}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        avg_rating: Number(event.target.value),
                      })
                    }
                    className="mt-1 h-9 w-full rounded-md border border-stone-200 px-2.5 text-xs text-stone-800 outline-none focus:border-primary"
                  />
                </label>
              </div>
              {error && (
                <p role="alert" className="text-[10px] font-medium text-rose-600">
                  {error}
                </p>
              )}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setDialogOpen(false);
                    setEditingCategory(null);
                    setForm(emptyCategory);
                  }}
                  className="rounded-md border border-stone-200 px-3 py-2 text-[10px] font-semibold text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-[10px] font-semibold text-white hover:bg-primary-dark"
                >
                  <Check size={12} />
                  {editingCategory ? "Save changes" : "Create category"}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </div>
  );
}
