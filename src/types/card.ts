import type { ImageMetadata } from "astro";

// Base card interface
export interface BaseCard {
  title: string;
  alt?: string;
  href?: string;
}

// Contest card interfaces
export interface ContestLocation {
  text: string;
  href: string;
  icon?: ImageMetadata;
}

export interface ContestCardData extends BaseCard {
  description: string;
  points?: string[];
  description2?: string;
  image?: ImageMetadata;
  location?: ContestLocation[];
}

export interface ContestCardProps {
  t: ContestCardData;
}

// Department card interface
export interface DepartmentCardData extends BaseCard {
  image: ImageMetadata;
  icon: ImageMetadata;
  iconAlt?: string;
}

export interface DepartmentCardProps {
  t: DepartmentCardData;
}

// Highlight card interface
export interface HighlightCardProps {
  src: ImageMetadata;
  alt: string;
  title: string;
  description?: string;
  index?: number;
}

export interface WorkshopCardProps {
  src: ImageMetadata;
  alt: string;
  title: string;
  description?: string;
  code?: string;
  lang?: string;
  index?: number;
}

// FAQ card interface
export interface FAQCardProps {
  question: string;
  answer: string;
  open?: boolean;
}

// Transportation card interface
export interface TransportationCardProps {
  title: string;
  description: string;
}

// Generic card wrapper interface
export interface CardWrapperProps {
  children: any;
  href?: string;
  ariaLabel?: string;
  className?: string;
}
