import type { LucideIcon } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  farmerId: string;
  farmerName: string;
  location: string; // district
  rating: number; // 1-5
  harvestDate: string; // ISO date string
  description: string;
}

export interface Farmer {
  id: string;
  name: string;
  avatarUrl: string;
  isVerified: boolean;
  location: string; // district
  about: string;
  galleryImageUrls: string[];
  cropHistory: CropRecord[];
  rating: number;
}

export interface CropRecord {
  cropName: string;
  season: string;
  year: number;
  quantity: string; // e.g., "100 kg"
}

export interface Category {
  id: string;
  name: string;
  icon?: LucideIcon; // Optional: if using Lucide icons
  imageUrl?: string; // Optional: if using image URLs for icons/images
  description?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string; // e.g., "Loyal Customer", "Partner Farmer"
  authorImageUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'farmer';
  text: string;
  timestamp: number;
}
