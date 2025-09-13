import type { Locale, SocialType } from "../constants";

// Re-export commonly used types
export type { Locale, SocialType } from "../constants";

// Base types
export interface BaseProps {
  class?: string;
  id?: string;
}

// Internationalization types
export interface LocalizedContent {
  title: string;
  description?: string;
}

export interface NavigationItem {
  title: string;
  href: string;
}

export interface LanguageConfig {
  th: string;
  en: string;
}

// Social media types
export interface SocialLink {
  type: SocialType;
  title: string;
  link: string;
  icon?: any;
}

export interface SocialContact {
  text?: string;
  href?: string;
  icon: any;
}

// Content types
export interface HighlightCard extends LocalizedContent {
  image: any;
  href: string;
}

export interface DepartmentInfo extends LocalizedContent {
  href: string;
  image: any;
  icon: any;
}

export interface ContestInfo extends LocalizedContent {
  image: any;
  href?: string;
  points?: string[];
  location?: SocialContact[];
}

export interface InsightInfo extends LocalizedContent {
  image?: any;
  href?: string;
  points?: string[];
  location?: SocialContact[];
}

// Department content types
export interface DepartmentSection {
  heading: string;
  body?: string;
  list?: string[];
  contract?: SocialLink[];
}

export interface DepartmentContent {
  title: string;
  description: string;
  image?: string;
  sections?: DepartmentSection[];
}

// FAQ types
export interface FAQItem {
  question: string;
  answer: string;
}

// Image optimization types
export interface ImageProps {
  src: any;
  alt: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  decoding?: "async" | "sync";
  format?: string;
  quality?: number;
  sizes?: string;
  class?: string;
}

// Navigation types
export interface NavigationMenu {
  highlight: NavigationItem;
  departments: NavigationItem;
  insight: NavigationItem;
  contests: NavigationItem;
  map: NavigationItem;
  faq: NavigationItem;
}

// Layout types
export interface LayoutProps {
  title?: string;
  description?: string;
  lang?: Locale;
  currentLang?: Locale;
  t?: any; // Dictionary type
}

// Component props types
export interface HeroSectionProps {
  t: {
    hero: {
      date: string;
      place: string;
    };
  };
}

export interface NavbarProps {
  t: {
    nav: {
      menu: NavigationMenu;
      language: LanguageConfig;
    };
  };
  currentLang: Locale;
}

export interface FooterProps {
  t: {
    footer: {
      university: string;
      address: string;
      copyright: string;
      social: {
        facebook: SocialContact;
        instagram: SocialContact;
      };
    };
  };
}

// Animation types
export interface AnimationConfig {
  duration?: string;
  delay?: string;
  easing?: string;
}

export interface FadeAnimationProps extends BaseProps {
  "data-fade"?: boolean;
  style?: string | Record<string, string>;
}
