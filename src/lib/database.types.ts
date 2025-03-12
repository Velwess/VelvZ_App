export interface Database {
  categories: Categories
}
export interface Categories {
  id: string;
  name: string;
  slug: string;
  icon: string;
  created_at: number;
}
