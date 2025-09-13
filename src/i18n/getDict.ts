import th from "./dict/th";
import en from "./dict/en";
import type { Locale } from "../constants";

// Type for the dictionary structure
export type Dictionary = typeof th;

// Dictionary map for better type safety
const dictionaries = {
  th,
  en,
} as const satisfies Record<Locale, Dictionary>;

/**
 * Get dictionary for the specified locale
 * @param lang - The locale to get dictionary for
 * @returns The dictionary object for the locale
 */
export function getDict(lang: Locale): Dictionary {
  return dictionaries[lang] ?? dictionaries.th;
}
