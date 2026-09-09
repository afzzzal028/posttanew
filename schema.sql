-- Run this SQL in Supabase SQL Editor

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  tags TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  prices JSONB NOT NULL DEFAULT '{"A6": 29, "A5": 79, "A4": 129, "A3": 179}',
  image_url TEXT,
  badge TEXT,
  in_stock BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  items JSONB NOT NULL,
  total INTEGER NOT NULL,
  discount INTEGER DEFAULT 0,
  shipping INTEGER DEFAULT 0,
  final_total INTEGER NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'cod',
  coupon_code TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  flagged BOOLEAN DEFAULT FALSE,
  flag_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Custom orders table
CREATE TABLE IF NOT EXISTS custom_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  size TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  total INTEGER NOT NULL,
  image_url TEXT,
  image_bucket TEXT,
  payment_method TEXT NOT NULL DEFAULT 'email',
  status TEXT DEFAULT 'pending',
  notes TEXT,
  flagged BOOLEAN DEFAULT FALSE,
  flag_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User tickets / concerns
CREATE TABLE IF NOT EXISTS tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT NOT NULL,
  order_type TEXT NOT NULL DEFAULT 'regular',
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  admin_reply TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Banners / Offers (marquee on homepage)
CREATE TABLE IF NOT EXISTS banners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  price INTEGER NOT NULL DEFAULT 0,
  original_price INTEGER DEFAULT 0,
  savings INTEGER DEFAULT 0,
  coupon_code TEXT DEFAULT '',
  bg_color TEXT NOT NULL DEFAULT '#e11d48',
  text_color TEXT NOT NULL DEFAULT '#ffffff',
  subtitle_color TEXT NOT NULL DEFAULT '#86efac',
  badge_color TEXT NOT NULL DEFAULT 'rgba(255,255,255,0.2)',
  badge_text TEXT NOT NULL DEFAULT '',
  speed INTEGER NOT NULL DEFAULT 30,
  active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Allow public read/write
CREATE POLICY "Public read/write banners" ON banners FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write custom_orders" ON custom_orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write tickets" ON tickets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write admin_users" ON admin_users FOR ALL USING (true) WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_banners_active ON banners(active);
CREATE INDEX IF NOT EXISTS idx_banners_sort ON banners(sort_order);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_flagged ON orders(flagged);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_custom_orders_status ON custom_orders(status);
CREATE INDEX IF NOT EXISTS idx_custom_orders_created ON custom_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_created ON tickets(created_at DESC);
