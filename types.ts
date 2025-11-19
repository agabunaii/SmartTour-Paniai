export enum Category {
  ALAM = 'Alam',
  BUDAYA = 'Budaya',
}

export interface Destination {
  id: string;
  name: string;
  category: Category;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  facilities: string[];
  imageUrl: string;
  features: string[]; // Keywords for CBF (e.g., 'danau', 'pegunungan', 'tarian')
}

export interface UserPreference {
  preferredCategories: Category[];
  preferredFacilities: string[];
  keywords: string[]; // Derived from description preferences
}

export type Tab = 'home' | 'map' | 'recommendation' | 'admin' | 'ai-guide';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}