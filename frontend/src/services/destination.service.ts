"use server";
import { Destination } from "@/types/destination.type";

export async function getDestinations() {
  const response = await fetch("http://localhost:3000/json/destinations.json");
  const destinations: Destination[] = await response.json();
  return destinations
}
