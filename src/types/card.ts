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

// API Activity interface
export interface ActivityData {
  id: number;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  point: number;
  max_participants: number | "unlimited";
  current_register_participants: number;
  department: {
    id: number;
    name_th: string;
    name_en: string;
    faculty: {
      id: number;
      name_th: string;
      name_en: string;
    };
  };
  faculty: {
    id: number;
    name_th: string;
    name_en: string;
  };
  display: boolean;
}

// Workshop with API data interface
export interface WorkshopWithAPIData {
  // Original workshop data
  title: string;
  description: string;
  image?: string;
  gallery?: Array<{ image: string; alt: string; title: string }>;
  sections?: Array<{
    heading: string;
    body?: string;
    list?: string[];
    chips?: Array<{ title: string; link: string }>;
    contract?: Array<{ type: string; title: string; link: string }>;
  }>;
  
  // API data
  apiData?: {
    timeSlots: Array<{
      date: string;
      start_time: string;
      end_time: string;
      location: string;
      max_participants: number | "unlimited";
      current_register_participants: number;
      isFull: boolean;
      availableSlots: number;
    }>;
    totalParticipants: number;
    totalMaxParticipants: number | "unlimited";
    isFullyBooked: boolean;
    department: string;
  };
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
  images: ImageMetadata[];
  description: string;
}

// Generic card wrapper interface
export interface CardWrapperProps {
  children: any;
  href?: string;
  ariaLabel?: string;
  className?: string;
}
