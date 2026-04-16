-- Portfolio CRM Database Setup
-- Run: psql -U postgres -f scripts/setup-db.sql

-- Create database
CREATE DATABASE portfolio_crm;

-- Connect to the database
\c portfolio_crm;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Leads table (with funnel fields)
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

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_lead_tag ON leads(lead_tag);
CREATE INDEX IF NOT EXISTS idx_leads_service_type ON leads(service_type);

-- Status constraint
ALTER TABLE leads ADD CONSTRAINT chk_leads_status
  CHECK (status IN ('new', 'in_progress', 'converted', 'closed'));

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Seed some test data (optional — remove in production)
-- INSERT INTO leads (name, email, subject, message, service_type, budget, timeline, lead_tag, status) VALUES
--   ('Test User', 'test@example.com', 'Full-Stack Development', 'I need an e-commerce platform.', 'Full-Stack Application', '₹25k–₹50k', '1 month', 'high_value', 'new');
