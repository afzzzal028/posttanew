CREATE TABLE IF NOT EXISTS sections (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  link TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read sections" ON sections FOR SELECT USING (true);
CREATE POLICY "Admin all sections" ON sections FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_sections_active ON sections(active);
CREATE INDEX IF NOT EXISTS idx_sections_sort ON sections(sort_order);
