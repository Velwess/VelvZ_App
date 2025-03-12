export interface Database {
  categories: Category
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  category_id: string;
  discount_percentage: number;
  original_price: number;
  final_price: number;
  image_url: string;
  start_date: string;
  end_date: string;
  category: Category;
  partner_id: string;
  partner?: Partner;
  created_at: string;
  updated_at: string;
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
