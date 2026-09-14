/**
 * Minimal i18n layer.
 *
 * All user-facing copy lives in `src/content/<locale>.ts`. Components never
 * hard-code text; they call `getContent(locale)`. Today the site serves
 * English only, but adding German or Arabic is a matter of:
 *   1. creating `src/content/de.ts` / `src/content/ar.ts` (same shape as en.ts)
 *   2. registering it in `dictionaries` below
 *   3. moving `src/app/*` under `src/app/[locale]/*` and adding a middleware
 *      that redirects `/` to the visitor's preferred locale.
 * Arabic is RTL: `dir` is already returned per locale so the root layout can
 * set `<html dir="rtl">` when the time comes.
 */
import { en } from "@/content/en";

export const locales = ["en", "de", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type Dictionary = typeof en;

const dictionaries: Partial<Record<Locale, Dictionary>> = { en };

export function getContent(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? en;
}

export function getDir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}
