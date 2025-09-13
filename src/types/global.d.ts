// Global type definitions for better performance and type safety

/// <reference types="astro/client" />

declare global {
  // Extend Window interface for performance APIs
  interface Window {
    // Web Vitals and performance monitoring
    webVitals?: {
      getCLS: (callback: (metric: any) => void) => void;
      getFID: (callback: (metric: any) => void) => void;
      getFCP: (callback: (metric: any) => void) => void;
      getLCP: (callback: (metric: any) => void) => void;
      getTTFB: (callback: (metric: any) => void) => void;
    };

    // Intersection Observer for lazy loading
    IntersectionObserver: IntersectionObserver;
    IntersectionObserverEntry: IntersectionObserverEntry;

    // Service Worker
    navigator: Navigator & {
      serviceWorker?: ServiceWorkerContainer;
    };
  }

  // CSS Custom Properties
  interface CSSStyleDeclaration {
    [key: `--${string}`]: string;
  }

  // Module declarations for better tree shaking
  declare module "*.svg" {
    const content: string;
    export default content;
  }

  declare module "*.webp" {
    const src: string;
    export default src;
  }

  declare module "*.avif" {
    const src: string;
    export default src;
  }

  // Environment variables
  interface ImportMetaEnv {
    readonly PUBLIC_SITE_URL: string;
    readonly PUBLIC_GA_ID?: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

// Type augmentation for Astro
declare module "astro:content" {
  interface ContentEntryMap {
    departments: {
      id: string;
      slug: string;
      body: string;
      collection: "departments";
      data: {
        title: string;
        description: string;
        image?: string;
        features?: string[];
        highlights?: string[];
        contact?: {
          email?: string;
          phone?: string;
          website?: string;
        };
      };
    };
  }
}

export {};
