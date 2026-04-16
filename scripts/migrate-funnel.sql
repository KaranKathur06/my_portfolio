-- Migration: Add funnel fields to leads table
-- Run: psql -U postgres -d portfolio_crm -f scripts/migrate-funnel.sql

-- Add new columns for multi-step funnel data
ALTER TABLE leads ADD COLUMN IF NOT EXISTS service_type VARCHAR(100) DEFAULT '';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS budget VARCHAR(50) DEFAULT '';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS timeline VARCHAR(50) DEFAULT '';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS phone VARCHAR(30) DEFAULT '';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_tag VARCHAR(50) DEFAULT '';

-- Index for lead qualification
CREATE INDEX IF NOT EXISTS idx_leads_lead_tag ON leads(lead_tag);
CREATE INDEX IF NOT EXISTS idx_leads_service_type ON leads(service_type);

-- Update status constraint to include 'high_value' priority
ALTER TABLE leads DROP CONSTRAINT IF EXISTS chk_leads_status;
ALTER TABLE leads ADD CONSTRAINT chk_leads_status
  CHECK (status IN ('new', 'in_progress', 'converted', 'closed'));
