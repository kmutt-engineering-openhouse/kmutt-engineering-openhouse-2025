import type { Locale } from "@/constants";
import { SUPPORTED_LOCALES, PERFORMANCE } from "@/constants";

// Type-safe locale utilities
/**
 * Type guard to check if a string is a supported locale
 * @param locale - The locale string to check
 * @returns Type predicate for Locale
 */
export function isSupportedLocale(locale: string): locale is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

/**
 * Normalizes a locale string to a supported locale with fallback
 * @param locale - The locale string to normalize
 * @returns Normalized locale or default fallback
 */
export function normalizeLocale(locale?: string): Locale {
  if (!locale) return "th";
  const normalized = locale.split("-")[0]?.toLowerCase();
  return normalized && isSupportedLocale(normalized) ? normalized : "th";
}

// Content utilities
/**
 * Generates a URL-safe slug from filename by removing file extensions
 * @param filename - The filename to convert
 * @returns Clean slug without extension
 */
export function generateSlugFromFilename(filename: string): string {
  return filename.replace(/\.(md|mdx)$/i, "");
}

/**
 * Parses content collection entry ID into components
 * @param id - The entry ID in format "lang/filename"
 * @returns Parsed components with proper typing
 */
export function parseEntryId(id: string): {
  lang: string;
  filename: string;
  slug: string;
} {
  const parts = id.split("/");
  const lang = parts[0] || "";
  const filename = parts[1] || "";
  const slug = generateSlugFromFilename(filename);
  return { lang, filename, slug };
}

/**
 * Creates a URL-safe slug from any text
 * @param text - The text to slugify
 * @returns URL-safe slug
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u0E00-\u0E7F-]/g, "") // Support Thai characters
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// Internationalization utilities
/**
 * Formats date for display with proper locale support
 * @param date - The date to format
 * @param locale - The target locale
 * @returns Formatted date string
 */
export function formatDate(date: Date, locale: Locale = "th"): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const localeCode = locale === "th" ? "th-TH" : "en-US";
  return new Intl.DateTimeFormat(localeCode, options).format(date);
}

/**
 * Formats time for display with proper locale support
 * @param date - The date/time to format
 * @param locale - The target locale
 * @returns Formatted time string
 */
export function formatTime(date: Date, locale: Locale = "th"): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: locale === "en",
  };

  const localeCode = locale === "th" ? "th-TH" : "en-US";
  return new Intl.DateTimeFormat(localeCode, options).format(date);
}

// Navigation utilities
/**
 * Checks if the current page is the home page
 * @param pathname - The current pathname
 * @returns Boolean indicating if it's a home page
 */
export function isHomePage(pathname: string): boolean {
  const cleanPath = pathname.replace(/\/+$/, "");
  return cleanPath === "" || cleanPath === "/th" || cleanPath === "/en";
}

/**
 * Gets the opposite language for language switching
 * @param currentLang - The current language
 * @returns The opposite supported language
 */
export function getOppositeLanguage(currentLang: string): Locale {
  return currentLang === "th" ? "en" : "th";
}

/**
 * Constructs a localized path with proper formatting
 * @param path - The base path
 * @param locale - The target locale
 * @returns Localized path
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  // Remove existing locale prefix
  const cleanPath = path.replace(/^\/[a-z]{2}\//, "/").replace(/^\/+/, "");

  // Construct new localized path
  const localizedPath = `/${locale}/${cleanPath}`.replace(/\/+/g, "/");

  // Ensure proper trailing slash for consistency
  return localizedPath.endsWith("/") ? localizedPath : `${localizedPath}/`;
}

/**
 * Extracts locale from pathname with fallback
 * @param pathname - The current pathname
 * @returns Extracted locale or default
 */
export function extractLocaleFromPath(pathname: string): Locale {
  const match = pathname.match(/^\/([a-z]{2})\//);
  if (match?.[1] && isSupportedLocale(match[1])) {
    return match[1];
  }
  return "th";
}

// Performance utilities
/**
 * Creates a debounced function that delays execution
 * @param func - The function to debounce
 * @param wait - The delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number = PERFORMANCE.debounce.search
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Creates a throttled function that limits execution frequency
 * @param func - The function to throttle
 * @param limit - The execution limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number = PERFORMANCE.debounce.scroll
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// DOM utilities
/**
 * Safely gets an element by ID with proper typing
 * @param id - The element ID
 * @returns Element or null
 */
export function getElementById<T extends HTMLElement = HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

/**
 * Creates an intersection observer with performance optimizations
 * @param callback - The callback function
 * @param options - Observer options
 * @returns Intersection observer instance
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    threshold: PERFORMANCE.observerThreshold,
    rootMargin: PERFORMANCE.observerRootMargin,
  };

  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
}

// Validation utilities
/**
 * Validates an email address format
 * @param email - The email to validate
 * @returns Boolean indicating validity
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates a Thai phone number format
 * @param phone - The phone number to validate
 * @returns Boolean indicating validity
 */
export function isValidThaiPhone(phone: string): boolean {
  const phoneRegex = /^(\+66|0)[0-9]{8,9}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ""));
}

// Accessibility utilities
/**
 * Manages focus for accessibility
 * @param element - The element to focus
 * @param options - Focus options
 */
export function manageFocus(element: HTMLElement | null, options?: FocusOptions): void {
  if (element && typeof element.focus === "function") {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      element.focus(options);
    });
  }
}

/**
 * Generates a unique ID for accessibility attributes
 * @param prefix - Optional prefix for the ID
 * @returns Unique ID string
 */
export function generateUniqueId(prefix = "id"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// URL utilities
/**
 * Safely creates a URL object with error handling
 * @param url - The URL string
 * @param base - Optional base URL
 * @returns URL object or null if invalid
 */
export function safeCreateURL(url: string, base?: string): URL | null {
  try {
    return new URL(url, base);
  } catch {
    return null;
  }
}

/**
 * Checks if a URL is external
 * @param url - The URL to check
 * @param currentOrigin - The current site origin
 * @returns Boolean indicating if URL is external
 */
export function isExternalURL(url: string, currentOrigin?: string): boolean {
  const urlObj = safeCreateURL(url);
  if (!urlObj) return false;

  const origin = currentOrigin || (typeof window !== "undefined" ? window.location.origin : "");
  return urlObj.origin !== origin;
}
