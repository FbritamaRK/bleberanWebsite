
export interface AttractionDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  galleryImages: string[]; // Added for photo highlights/carousel
  features: string[];
  bestTime: string;
  category: string;
  price?: string;
  tips: string[];
}

export interface UMKM {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceRange: string;
  whatsapp: string; // Properti baru untuk kontak person
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface CommunityActivity {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  galleryImages: string[];
  date?: string;
}
