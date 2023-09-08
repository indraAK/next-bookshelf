import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(dateStr));
}
