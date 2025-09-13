// Image utility functions to replace OptimizedImage component
import type { ImageProps } from "@/types";

/**
 * Get optimized props for Astro Image component
 */
export const getImageProps = (options: {
  priority?: boolean;
  responsive?: boolean;
  quality?: number;
  format?: "webp" | "avif" | "png" | "jpg" | "jpeg";
}) => {
  const { priority = false, responsive = false, quality = 85, format = "webp" } = options;

  return {
    loading: priority ? ("eager" as const) : ("lazy" as const),
    fetchpriority: priority ? ("high" as const) : ("auto" as const),
    decoding: "async" as const,
    format,
    quality,
    sizes: responsive ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : undefined,
  };
};

/**
 * Get Tailwind CSS class for aspect ratio
 */
export const getAspectRatioClass = (aspectRatio?: string): string => {
  if (!aspectRatio) return "";

  const ratios: Record<string, string> = {
    "1/1": "aspect-square",
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "3/2": "aspect-[3/2]",
    "2/1": "aspect-[2/1]",
    "16/6": "aspect-[16/6]",
  };

  return ratios[aspectRatio] || "";
};

/**
 * Get object-fit class for image
 */
export const getObjectFitClass = (
  objectFit: "cover" | "contain" | "fill" | "none" | "scale-down" = "cover"
): string => {
  return objectFit !== "cover" ? `object-${objectFit}` : "object-cover";
};

/**
 * Combine classes for image element
 */
export const combineImageClasses = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Generate responsive sizes for different breakpoints
 */
export const getResponsiveSizes = (
  sizes?: string,
  breakpoints?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  }
): string | undefined => {
  if (sizes) return sizes;

  if (breakpoints) {
    const { mobile = "100vw", tablet = "50vw", desktop = "33vw" } = breakpoints;
    return `(max-width: 640px) ${mobile}, (max-width: 1024px) ${tablet}, ${desktop}`;
  }

  return undefined;
};

/**
 * Get widths array for responsive images
 */
export const getResponsiveWidths = (baseWidth: number): number[] => {
  return [
    Math.floor(baseWidth * 0.5), // 50% for mobile
    baseWidth, // Base size
    Math.floor(baseWidth * 1.5), // 150% for high-DPI
    Math.floor(baseWidth * 2), // 200% for very high-DPI
  ];
};

/**
 * Image optimization presets for common use cases
 */
export const IMAGE_PRESETS = {
  hero: {
    ...getImageProps({ priority: true, responsive: true, quality: 90 }),
    sizes: "(max-width: 640px) 100vw, 100vw",
  },

  card: {
    ...getImageProps({ responsive: true, quality: 85 }),
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
  },

  thumbnail: {
    ...getImageProps({ quality: 80 }),
    sizes: "150px",
  },

  gallery: {
    ...getImageProps({ responsive: true, quality: 85 }),
    sizes: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  },

  background: {
    ...getImageProps({ priority: true, quality: 90 }),
    sizes: "100vw",
  },
} as const;

/**
 * Type for image preset keys
 */
export type ImagePreset = keyof typeof IMAGE_PRESETS;
