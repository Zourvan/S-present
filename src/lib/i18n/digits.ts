import type { Locale } from "../types";

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** Convert Western digits in a string/number to locale digits (FA: ۰-۹). */
export function toLocaleDigits(
  value: string | number,
  locale: Locale,
): string {
  const s = String(value);
  if (locale !== "fa") return s;
  return s.replace(/\d/g, (d) => FA_DIGITS[Number(d)] ?? d);
}

/** Normalize FA/Arabic-Indic digits to Western so parseInt works. */
export function fromLocaleDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}
