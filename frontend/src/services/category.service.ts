"use server";
import { Category } from "@/types/category.type";


export async function getCategories() {
  const response = await fetch("http://localhost:3000/json/categories.json");
  const destinations: Category[] = await response.json();
  return destinations
}
