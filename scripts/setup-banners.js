const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://vzyvougfgkqkufudurgb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6eXZvdWdmZ2txa3VmdWR1cmdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NTMzOTUsImV4cCI6MjEwNDAyOTM5NX0.mk8oEEb1BpdurJZAoA-vptUV1O2yhBQJW2W0Dn50zaw";

const supabase = createClient(supabaseUrl, supabaseKey);

async function setup() {
  console.log("Checking if banners table exists...");

  const { data, error } = await supabase.from("banners").select("*").limit(1);

  if (error && error.message.includes("does not exist")) {
    console.log("\n❌ banners table does not exist.");
    console.log("\n📋 Please run this SQL in your Supabase SQL Editor:");
    console.log("   Go to https://supabase.com/dashboard → SQL Editor → New query\n");

    const sql = `
-- Banners / Offers table
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

-- RLS policies
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read/write banners" ON banners FOR ALL USING (true) WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_banners_active ON banners(active);
CREATE INDEX IF NOT EXISTS idx_banners_sort ON banners(sort_order);

-- Insert default banners
INSERT INTO banners (title, subtitle, price, original_price, savings, coupon_code, bg_color, text_color, subtitle_color, badge_color, badge_text, speed, sort_order) VALUES
('Buy 2 A3 Posters', 'Get 1 A4 + 2 A6 Cards + 1 Mystery Poster FREE', 358, 497, 139, 'COMBO2A3', '#e11d48', '#ffffff', '#86efac', 'rgba(255,255,255,0.2)', 'SAVE ₹139', 30, 0),
('Buy 3 A4 Posters', 'Get 1 A5 + 3 A6 Cards + 1 Mystery Poster FREE', 387, 574, 187, 'COMBO3A4', '#111827', '#ffffff', '#86efac', 'rgba(255,255,255,0.2)', 'SAVE ₹187', 30, 1),
('Buy 5 A4 Posters', 'Get 2 A5 + 5 A6 Cards + 1 Mystery Poster FREE', 645, 961, 316, 'COMBO5A4', '#d97706', '#ffffff', '#86efac', 'rgba(255,255,255,0.2)', 'SAVE ₹316', 30, 2),
('Buy 3 A3 Posters', 'Get 2 A4 + 5 A6 Cards + 1 Mystery Poster FREE', 537, 811, 274, 'COMBO3A3', '#059669', '#ffffff', '#86efac', 'rgba(255,255,255,0.2)', 'SAVE ₹274', 30, 3);
`;

    console.log(sql);
    console.log("\nAfter running the SQL, run this script again to verify.");
  } else if (error) {
    console.log("Error:", error.message);
  } else {
    console.log("✅ banners table exists with", data.length, "banners (showing first page)");
    console.log("Banners:");
    data.forEach((b) => console.log(`  - ${b.title} (${b.active ? "active" : "inactive"})`));
  }
}

setup();
