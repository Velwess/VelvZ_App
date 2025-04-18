import type {User} from "@supabase/supabase-js";

export interface Database {
  public: {
    Tables: {
      deals: { Row: Deal, Insert: Partial<Deal>, Update: Partial<Deal> },
      reviews: { Row: Review, Insert: Partial<Review>, Update: Partial<Review> },
      categories: { Row: Category, Insert: Partial<Category>, Update: Partial<Category> },
      favorites: { Row: Favourite, Insert: Partial<Favourite>, Update: Partial<Favourite> },
    }
  }
}

export interface Favourite {
  created_at: string;
  user_id: string;
  deal_id: string;
  users?: User;
  deals?: Deal;
  id: string;
}

export interface Review {
  created_at: string;
  updated_at: string;
  comment: string;
  user_id: string;
  deal_id: string;
  rating: number;
  users?: User;
  deals?: Deal;
  id: string;
}

export interface Deal {
  id: string;
  created_at: string;
  updated_at: string;
  discount_percentage: number;
  original_price: number;
  conditions: string[];
  final_price: number;
  description: string;
  category_id: string;
  partner_id: string;
  start_date: string;
  location?: string;
  image_url: string;
  deal_url: string;
  end_date: string;
  title: string;
  opinion: string|null;
  categories?: Category;
  partners?: Partner;
  reviews?: Review[];
}

export interface Partner {
  id: string;
  deals?: Deal[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  created_at: string;
  deals?: Deal[];
}

export interface ApiResponse<T> {
  meta: {
    links: {
      previous?: string;
      first?: string;
      next?: string;
      last?: string;
      self: string;
    }
  };
  status: ApiStatus;
  paging?: {
    count: number;
  };
  content: T;
}

export type ApiStatus = 'SUCCESS' | 'ERROR';

export const ERRORS: Partial<Record<string, string>> = {
  email_not_confirmed: 'Address e-mail non-confirmee (verifiez votre messagerie).',
  invalid_credentials: 'E-mail ou Mot de passe invalide/s.',
  conflict: 'Il semble que cette address soit deja prise',
  too_short_password: 'Mot de passe trop court: 6+.',
  too_long_password: 'Mot de passe trop long: 72-.',
  different_password: 'Mots de pass differents.',
  too_long_email: 'Address e-mail trop longue.',
  invalid_password: 'Mot de pass invalide.',
};
