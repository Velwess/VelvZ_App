/*
  # Initial Schema Setup for Velvès Platform

  1. New Tables
    - `profiles` - Extended user profile information
      - `id` (uuid, references auth.users)
      - `username` (text)
      - `full_name` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `categories` - Deal categories
      - `id` (uuid)
      - `name` (text)
      - `slug` (text)
      - `icon` (text)
      - `created_at` (timestamp)

    - `partners` - Business partners offering deals
      - `id` (uuid)
      - `name` (text)
      - `description` (text)
      - `logo_url` (text)
      - `website` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `deals` - Available deals/offers
      - `id` (uuid)
      - `title` (text)
      - `description` (text)
      - `partner_id` (uuid, references partners)
      - `category_id` (uuid, references categories)
      - `discount_percentage` (integer)
      - `original_price` (decimal)
      - `final_price` (decimal)
      - `image_url` (text)
      - `start_date` (timestamp)
      - `end_date` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `favorites` - User's favorite deals
      - `id` (uuid)
      - `user_id` (uuid, references auth.users)
      - `deal_id` (uuid, references deals)
      - `created_at` (timestamp)

    - `reviews` - Deal reviews
      - `id` (uuid)
      - `user_id` (uuid, references auth.users)
      - `deal_id` (uuid, references deals)
      - `rating` (integer)
      - `comment` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for:
      - Profiles: users can read all profiles but only update their own
      - Categories: public read access
      - Partners: public read access, admin write access
      - Deals: public read access, admin write access
      - Favorites: users can manage their own favorites
      - Reviews: users can read all reviews but only manage their own
*/

-- Create tables with appropriate constraints and indexes

-- Profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  icon text,
  created_at timestamptz DEFAULT now()
);

-- Partners table
CREATE TABLE partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  logo_url text,
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Deals table
CREATE TABLE deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  partner_id uuid REFERENCES partners ON DELETE CASCADE,
  category_id uuid REFERENCES categories ON DELETE SET NULL,
  discount_percentage integer CHECK (discount_percentage > 0 AND discount_percentage <= 100),
  original_price decimal(10,2) CHECK (original_price > 0),
  final_price decimal(10,2) CHECK (final_price > 0),
  image_url text,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL CHECK (end_date > start_date),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for deals search and filtering
CREATE INDEX deals_category_id_idx ON deals(category_id);
CREATE INDEX deals_partner_id_idx ON deals(partner_id);
CREATE INDEX deals_date_range_idx ON deals(start_date, end_date);

-- Favorites table
CREATE TABLE favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  deal_id uuid REFERENCES deals ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, deal_id)
);

-- Reviews table
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  deal_id uuid REFERENCES deals ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

-- Partners policies
CREATE POLICY "Partners are viewable by everyone"
  ON partners FOR SELECT
  USING (true);

-- Deals policies
CREATE POLICY "Deals are viewable by everyone"
  ON deals FOR SELECT
  USING (true);

-- Favorites policies
CREATE POLICY "Users can view their own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);

-- Insert initial categories
INSERT INTO categories (name, slug, icon) VALUES
  ('Beauté', 'beaute', '💄'),
  ('Bien-être', 'bien-etre', '🧘‍♀️'),
  ('Nutrition', 'nutrition', '🥗'),
  ('Sport', 'sport', '🏃‍♀️'),
  ('Culture', 'culture', '🎭');