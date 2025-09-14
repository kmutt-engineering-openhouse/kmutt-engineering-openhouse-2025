interface ScrollAnimateOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
}

class ScrollAnimationManager {
  private observer: IntersectionObserver | null = null;
  private options: ScrollAnimateOptions;
  private animatedElements: Set<Element> = new Set();

  constructor(options: ScrollAnimateOptions = {}) {
    this.options = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
      staggerDelay: 100,
      ...options,
    };
  }

  init(): void {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.showAllElements();
      return;
    }

    this.observer = new IntersectionObserver((entries) => this.handleIntersection(entries), {
      threshold: this.options.threshold,
      rootMargin: this.options.rootMargin,
    });

    this.observeElements();

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        this.observeElements();
      }
    });

    window.addEventListener("popstate", () => {
      setTimeout(() => this.observeElements(), 100);
    });
  }

  private observeElements(): void {
    const elements = document.querySelectorAll(".scroll-animate:not(.in-view)");

    elements.forEach((element) => {
      if (!this.animatedElements.has(element)) {
        this.observer?.observe(element);
      }
    });
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.animateElement(entry.target);
        this.observer?.unobserve(entry.target);
        this.animatedElements.add(entry.target);
      }
    });
  }

  private animateElement(element: Element): void {
    const htmlElement = element as HTMLElement;
    const delayAttr = htmlElement.dataset.delay;
    const delay = delayAttr ? parseInt(delayAttr, 10) * 100 : 0;

    setTimeout(() => {
      htmlElement.classList.add("in-view");
    }, delay);
  }

  private showAllElements(): void {
    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((element) => {
      (element as HTMLElement).classList.add("in-view");
      (element as HTMLElement).style.opacity = "1";
      (element as HTMLElement).style.transform = "none";
    });
  }

  destroy(): void {
    this.observer?.disconnect();
    this.observer = null;
    this.animatedElements.clear();
  }

  addElements(selector: string): void {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      if (!element.classList.contains("scroll-animate")) {
        element.classList.add("scroll-animate", "animate-fade-up");
      }
      if (!this.animatedElements.has(element)) {
        this.observer?.observe(element);
      }
    });
  }

  triggerAnimation(element: Element): void {
    if (!this.animatedElements.has(element)) {
      this.animateElement(element);
      this.animatedElements.add(element);
    }
  }
}

let scrollAnimationManager: ScrollAnimationManager | null = null;

function initScrollAnimations(): void {
  if (scrollAnimationManager) {
    scrollAnimationManager.destroy();
  }

  scrollAnimationManager = new ScrollAnimationManager({
    threshold: 0.1,
    rootMargin: "0px 0px -30px 0px",
    staggerDelay: 100,
  });

  scrollAnimationManager.init();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initScrollAnimations);
} else {
  initScrollAnimations();
}

export { ScrollAnimationManager, initScrollAnimations };
