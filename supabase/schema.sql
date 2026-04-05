-- =============================================
-- SoundCraft — Supabase Schema
-- Run this in your Supabase SQL editor
-- =============================================

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Customer
  customer_email        TEXT NOT NULL,

  -- Song details
  song_title            TEXT NOT NULL,
  genre                 TEXT NOT NULL,
  mood                  TEXT[] NOT NULL DEFAULT '{}',
  lyrics                TEXT NOT NULL DEFAULT '',

  -- Status lifecycle:
  -- pending_payment → pending → generating → completed
  status                TEXT NOT NULL DEFAULT 'pending_payment'
                        CHECK (status IN ('pending_payment', 'pending', 'generating', 'completed')),

  -- Stripe
  stripe_session_id     TEXT UNIQUE,
  stripe_payment_intent TEXT,
  amount_paid_cents     INTEGER,

  -- Delivery
  mp3_storage_path      TEXT,
  download_token        UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,

  -- Admin
  admin_notes           TEXT
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- Row Level Security
-- =============================================

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Service role (used by webhook + API) can do everything — no RLS policy needed,
-- service_role bypasses RLS by default.

-- Anon users can read an order ONLY by exact download_token match (for the download page)
CREATE POLICY "anon_read_by_download_token"
  ON orders FOR SELECT
  TO anon
  USING (download_token = (current_setting('request.jwt.claims', true)::json->>'download_token')::uuid);

-- NOTE: The download page uses the service role key server-side, so the above
-- policy is a belt-and-suspenders measure. The service role bypasses it.

-- =============================================
-- Storage bucket
-- =============================================
-- Run this in Supabase Dashboard → Storage → New Bucket:
--   Name: songs
--   Public: NO (private)
--
-- Or via SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('songs', 'songs', false)
ON CONFLICT (id) DO NOTHING;

-- Only service_role can upload/read (all done server-side)
-- No storage policies needed since we use service_role key
