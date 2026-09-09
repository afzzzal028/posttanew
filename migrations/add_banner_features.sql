-- Run this SQL in Supabase SQL Editor to upgrade banners table

-- Add new columns for shapes, features, and product linking
ALTER TABLE banners ADD COLUMN IF NOT EXISTS shape TEXT NOT NULL DEFAULT 'square';
ALTER TABLE banners ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '["badge", "savings", "coupon"]';
ALTER TABLE banners ADD COLUMN IF NOT EXISTS product_ids TEXT[] DEFAULT '{}';
ALTER TABLE banners ADD COLUMN IF NOT EXISTS gradient_from TEXT DEFAULT '';
ALTER TABLE banners ADD COLUMN IF NOT EXISTS gradient_to TEXT DEFAULT '';

-- Update default banners with shape info
UPDATE banners SET shape = 'square' WHERE shape IS NULL;
UPDATE banners SET features = '["badge", "savings", "coupon"]' WHERE features IS NULL;
