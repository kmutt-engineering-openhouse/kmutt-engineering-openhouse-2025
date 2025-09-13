// Constants for the application - Optimized for tree shaking and performance

// Localization constants
export const SUPPORTED_LOCALES = ["th", "en"] as const;
export const DEFAULT_LOCALE = "th" as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

// Social media types
export const SOCIAL_TYPES = ["facebook", "instagram", "website", "email", "tiktok"] as const;
export type SocialType = (typeof SOCIAL_TYPES)[number];

// Image optimization settings - Enhanced for Astro v5
export const IMAGE_CONFIG = {
  // Modern image formats in priority order
  formats: ["avif", "webp"] as const,
  quality: 85,
  densities: [1, 2] as const,

  // Loading strategies
  loading: {
    eager: "eager" as const,
    lazy: "lazy" as const,
  },

  // Decoding strategies
  decoding: {
    async: "async" as const,
    sync: "sync" as const,
  },

  // Responsive breakpoints for image sizing
  breakpoints: {
    mobile: 640,
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
    wide: 1536,
  },

  // Size presets for common use cases
  sizes: {
    thumbnail: { width: 150, height: 150 },
    card: { width: 400, height: 300 },
    hero: { width: 1200, height: 630 },
    banner: { width: 1920, height: 1080 },
  },
} as const;

// Responsive breakpoints matching Tailwind CSS
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

// Animation system - Optimized for 60fps
export const ANIMATION = {
  duration: {
    instant: "0ms",
    fast: "150ms", // For micro-interactions
    normal: "250ms", // For most transitions
    slow: "400ms", // For complex animations
    slower: "600ms", // For page transitions
  },

  easing: {
    linear: "linear",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)", // Tailwind's ease-in-out
    out: "cubic-bezier(0, 0, 0.2, 1)", // Tailwind's ease-out
    in: "cubic-bezier(0.4, 0, 1, 1)", // Tailwind's ease-in
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    elastic: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },

  // Stagger delays for list animations
  stagger: {
    short: 50,
    medium: 100,
    long: 150,
  },
} as const;

// Department codes - Sorted alphabetically for consistency
export const DEPARTMENT_CODES = [
  "CE", // Civil Engineering
  "CHE", // Chemical Engineering
  "CPE", // Computer Engineering
  "EE", // Electrical Engineering
  "ENE", // Energy Engineering
  "ENV", // Environmental Engineering
  "INC", // Industrial Engineering
  "ME", // Mechanical Engineering
  "PE", // Production Engineering
  "TME", // Tool and Materials Engineering
] as const;

export type DepartmentCode = (typeof DEPARTMENT_CODES)[number];

// Performance constants
export const PERFORMANCE = {
  // Intersection Observer thresholds
  observerThreshold: 0.1,
  observerRootMargin: "50px",

  // Debounce delays
  debounce: {
    search: 300,
    resize: 100,
    scroll: 16, // ~60fps
  },

  // Cache durations (in milliseconds)
  cache: {
    short: 5 * 60 * 1000, // 5 minutes
    medium: 30 * 60 * 1000, // 30 minutes
    long: 24 * 60 * 60 * 1000, // 24 hours
  },
} as const;

// SEO and meta constants
export const SEO = {
  titleTemplate: "%s | KMUTT Engineering Open House 2025",
  defaultDescription: {
    th: "งานเปิดบ้านคณะวิศวกรรมศาสตร์ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี ปี 2025",
    en: "KMUTT Engineering Open House 2025 - Explore the future of engineering",
  },
  openGraph: {
    type: "website",
    siteName: "KMUTT Engineering Open House 2025",
    imageWidth: 1200,
    imageHeight: 630,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@kmutt_official",
  },
} as const;

// API endpoints and external resources
export const ENDPOINTS = {
  api: {
    departments: "/api/departments",
    events: "/api/events",
    contact: "/api/contact",
  },
  external: {
    maps: "https://maps.google.com",
    social: {
      facebook: "https://facebook.com/kmutt.official",
      instagram: "https://instagram.com/kmutt_official",
      tiktok: "https://tiktok.com/@kmutt_official",
    },
  },
} as const;
