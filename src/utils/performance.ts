/**
 * Performance monitoring utilities for Astro application
 * Implements Web Vitals and custom performance metrics
 */

// Types for performance metrics
interface PerformanceMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
  entries?: PerformanceEntry[];
}

interface WebVitalsConfig {
  enabled: boolean;
  reportAllChanges?: boolean;
  debug?: boolean;
  endpoint?: string;
}

// Extended performance entry types
interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface LargestContentfulPaintEntry extends PerformanceEntry {
  startTime: number;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

/**
 * Performance observer for monitoring key metrics
 */
class PerformanceMonitor {
  private config: WebVitalsConfig;
  private metrics: Map<string, PerformanceMetric> = new Map();

  constructor(config: WebVitalsConfig = { enabled: true }) {
    this.config = config;
    this.init();
  }

  private init(): void {
    if (!this.config.enabled || typeof window === "undefined") return;

    // Monitor Core Web Vitals
    this.observeCLS();
    this.observeLCP();
    this.observeFID();
    this.observeFCP();
    this.observeTTFB();

    // Monitor custom metrics
    this.observeResourceTiming();
    this.observeNavigationTiming();
  }

  /**
   * Observe Cumulative Layout Shift (CLS)
   */
  private observeCLS(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries() as LayoutShiftEntry[];

        for (const entry of entries) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }

        if (clsValue > 0) {
          this.reportMetric({
            name: "CLS",
            value: clsValue,
            id: "cls",
            delta: clsValue,
            entries: entries,
          });
        }
      });

      observer.observe({ type: "layout-shift", buffered: true });
    } catch (error) {
      console.warn("CLS observation not supported:", error);
    }
  }

  /**
   * Observe Largest Contentful Paint (LCP)
   */
  private observeLCP(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as LargestContentfulPaintEntry;

        this.reportMetric({
          name: "LCP",
          value: lastEntry.startTime,
          id: "lcp",
          delta: lastEntry.startTime,
          entries: [lastEntry],
        });
      });

      observer.observe({ type: "largest-contentful-paint", buffered: true });
    } catch (error) {
      console.warn("LCP observation not supported:", error);
    }
  }

  /**
   * Observe First Input Delay (FID)
   */
  private observeFID(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries() as FirstInputEntry[];
        const firstEntry = entries[0];

        if (firstEntry) {
          const fid = firstEntry.processingStart - firstEntry.startTime;
          this.reportMetric({
            name: "FID",
            value: fid,
            id: "fid",
            delta: fid,
            entries: [firstEntry],
          });
        }
      });

      observer.observe({ type: "first-input", buffered: true });
    } catch (error) {
      console.warn("FID observation not supported:", error);
    }
  }

  /**
   * Observe First Contentful Paint (FCP)
   */
  private observeFCP(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find((entry) => entry.name === "first-contentful-paint");

        if (fcpEntry) {
          this.reportMetric({
            name: "FCP",
            value: fcpEntry.startTime,
            id: "fcp",
            delta: fcpEntry.startTime,
            entries: [fcpEntry],
          });
        }
      });

      observer.observe({ type: "paint", buffered: true });
    } catch (error) {
      console.warn("FCP observation not supported:", error);
    }
  }

  /**
   * Observe Time to First Byte (TTFB)
   */
  private observeTTFB(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceNavigationTiming[];
        const navigationEntry = entries[0];

        if (navigationEntry) {
          const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
          this.reportMetric({
            name: "TTFB",
            value: ttfb,
            id: "ttfb",
            delta: ttfb,
            entries: [navigationEntry],
          });
        }
      });

      observer.observe({ type: "navigation", buffered: true });
    } catch (error) {
      console.warn("TTFB observation not supported:", error);
    }
  }

  /**
   * Monitor resource loading performance
   */
  private observeResourceTiming(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceResourceTiming[];

        entries.forEach((entry) => {
          // Focus on critical resources
          if (this.isCriticalResource(entry.name)) {
            const loadTime = entry.responseEnd - entry.requestStart;

            if (loadTime > 1000) {
              // Report slow resources (>1s)
              this.reportMetric({
                name: "Slow Resource",
                value: loadTime,
                id: `resource-${this.generateId()}`,
                delta: loadTime,
                entries: [entry],
              });
            }
          }
        });
      });

      observer.observe({ type: "resource", buffered: true });
    } catch (error) {
      console.warn("Resource timing observation not supported:", error);
    }
  }

  /**
   * Monitor navigation performance
   */
  private observeNavigationTiming(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceNavigationTiming[];
        const navEntry = entries[0];

        if (navEntry) {
          const domContentLoaded =
            navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart;
          const loadComplete = navEntry.loadEventEnd - navEntry.loadEventStart;

          this.reportMetric({
            name: "DOM Content Loaded",
            value: domContentLoaded,
            id: "dcl",
            delta: domContentLoaded,
            entries: [navEntry],
          });

          this.reportMetric({
            name: "Load Complete",
            value: loadComplete,
            id: "load",
            delta: loadComplete,
            entries: [navEntry],
          });
        }
      });

      observer.observe({ type: "navigation", buffered: true });
    } catch (error) {
      console.warn("Navigation timing observation not supported:", error);
    }
  }

  /**
   * Check if a resource is critical for performance
   */
  private isCriticalResource(url: string): boolean {
    return (
      url.includes(".css") ||
      url.includes(".js") ||
      url.includes("font") ||
      url.includes(".woff") ||
      url.includes("critical")
    );
  }

  /**
   * Generate unique ID for metrics
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  /**
   * Report performance metric
   */
  private reportMetric(metric: PerformanceMetric): void {
    this.metrics.set(metric.id, metric);

    if (this.config.debug) {
      console.log(`[Performance] ${metric.name}:`, metric.value.toFixed(2) + "ms");
    }

    // Send to analytics endpoint if configured
    if (this.config.endpoint) {
      this.sendToAnalytics(metric);
    }

    // Trigger custom event
    this.dispatchMetricEvent(metric);
  }

  /**
   * Send metric to analytics endpoint
   */
  private async sendToAnalytics(metric: PerformanceMetric): Promise<void> {
    if (!this.config.endpoint) return;

    try {
      await fetch(this.config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metric: metric.name,
          value: metric.value,
          id: metric.id,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: Date.now(),
        }),
      });
    } catch (error) {
      console.warn("Failed to send performance metric:", error);
    }
  }

  /**
   * Dispatch custom event for metric
   */
  private dispatchMetricEvent(metric: PerformanceMetric): void {
    window.dispatchEvent(
      new CustomEvent("performance-metric", {
        detail: metric,
      })
    );
  }

  /**
   * Get all collected metrics
   */
  public getMetrics(): Map<string, PerformanceMetric> {
    return new Map(this.metrics);
  }

  /**
   * Get specific metric by ID
   */
  public getMetric(id: string): PerformanceMetric | undefined {
    return this.metrics.get(id);
  }

  /**
   * Clear all metrics
   */
  public clearMetrics(): void {
    this.metrics.clear();
  }
}

/**
 * Create and initialize performance monitor
 */
export function createPerformanceMonitor(config?: WebVitalsConfig): PerformanceMonitor {
  return new PerformanceMonitor(config);
}

/**
 * Measure performance of async functions
 */
export async function measureAsyncFunction<T>(
  name: string,
  fn: () => Promise<T>
): Promise<{ result: T; duration: number }> {
  const startTime = performance.now();
  const result = await fn();
  const duration = performance.now() - startTime;

  console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);

  return { result, duration };
}

/**
 * Mark performance timing points
 */
export function markPerformance(name: string): void {
  if (typeof performance !== "undefined" && performance.mark) {
    performance.mark(name);
  }
}

/**
 * Measure between performance marks
 */
export function measurePerformance(name: string, startMark: string, endMark?: string): number {
  if (typeof performance === "undefined" || !performance.measure) {
    return 0;
  }

  try {
    const measureName = `measure-${name}`;
    performance.measure(measureName, startMark, endMark);

    const measures = performance.getEntriesByName(measureName, "measure");
    const measure = measures[measures.length - 1];

    return measure ? measure.duration : 0;
  } catch (error) {
    console.warn("Performance measurement failed:", error);
    return 0;
  }
}

/**
 * Initialize performance monitoring for Astro app
 */
export function initPerformanceMonitoring(): PerformanceMonitor | undefined {
  if (typeof window === "undefined") return;

  // Initialize performance monitor
  const monitor = createPerformanceMonitor({
    enabled: true,
    debug: import.meta.env.DEV,
    reportAllChanges: false,
  });

  // Mark app initialization
  markPerformance("app-init");

  // Listen for page visibility changes to optimize performance
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      markPerformance("page-visible");
    } else {
      markPerformance("page-hidden");
    }
  });

  // Global error handler for performance issues
  window.addEventListener("error", (event) => {
    console.warn("Performance-related error:", event.error);
  });

  return monitor;
}
