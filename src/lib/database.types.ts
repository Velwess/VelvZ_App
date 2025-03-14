export interface Database {
  categories: Category;
  favorite: Favourite;
  deal: Deal;
}

export interface Favourite {
  created_at: string;
  user_id: string;
  deal_id: string;
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
  start_date: string;
  location?: string;
  image_url: string;
  deal_url: string;
  end_date: string;
  title: string;

  category_id: string;
  category?: Category;

  partner_id: string;
  partner?: Partner;
}

export interface Partner {
  id: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  created_at: string;
}
