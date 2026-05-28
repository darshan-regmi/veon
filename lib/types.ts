export interface App {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  version: string;
  releaseDate: string;
  downloadUrl: string;
  screenshots: string[];
  category: string;
  downloads: number;
  changelog: Record<string, string>;
  featured: boolean;
  developer?: string;
  rating?: number;
  price?: number;
  isFree?: boolean;
  githubRepo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AppInput = Omit<App, "id" | "createdAt" | "updatedAt">;

export interface Book {
  id: string;
  title: string;
  slug: string;
  author: string;
  description: string;
  cover: string;        // Supabase Storage URL
  pdfUrl: string;       // Supabase Storage URL
  genre: string;
  language: string;
  publishedDate: string;
  pages?: number;
  excerpt?: string;
  tags?: string[];
  featured: boolean;
  downloads: number;
  createdAt: Date;
  updatedAt: Date;
}

export type BookInput = Omit<Book, "id" | "createdAt" | "updatedAt">;
