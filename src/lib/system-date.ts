import type { Locale } from "./types";

/** Calendar date from the machine clock, in the active presentation language. */
export function formatSystemDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
