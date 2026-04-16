-- ============================================================
-- Portfolio CRM — Full Supabase Setup
-- Paste this entire script into Supabase SQL Editor and Run.
-- Safe to re-run (uses IF NOT EXISTS / IF EXISTS everywhere).
-- ============================================================

-- 1. Enable UUID extension (Supabase usually has this, but just in case)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30) DEFAULT '',
  subject VARCHAR(255) DEFAULT '',
  message TEXT NOT NULL,
  service_type VARCHAR(100) DEFAULT '',
  budget VARCHAR(50) DEFAULT '',
  timeline VARCHAR(50) DEFAULT '',
  lead_tag VARCHAR(50) DEFAULT '',
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_lead_tag ON leads(lead_tag);
CREATE INDEX IF NOT EXISTS idx_leads_service_type ON leads(service_type);

-- 4. Status constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_leads_status'
  ) THEN
    ALTER TABLE leads ADD CONSTRAINT chk_leads_status
      CHECK (status IN ('new', 'in_progress', 'converted', 'closed'));
  END IF;
END
$$;

-- 5. Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_leads_updated_at'
  ) THEN
    CREATE TRIGGER update_leads_updated_at
      BEFORE UPDATE ON leads
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END
$$;

-- ============================================================
-- ✅ Done! The "leads" table is ready.
-- ============================================================
