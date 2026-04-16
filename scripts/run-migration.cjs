/**
 * Run funnel migration via Node.js
 * Usage: node scripts/run-migration.cjs
 */
const { Pool } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/portfolio_crm';

async function migrate() {
  const pool = new Pool({ connectionString: DATABASE_URL });

  console.log('[Migration] Connecting to database...');

  try {
    // Add new columns (IF NOT EXISTS is safe to re-run)
    const alterQueries = [
      `ALTER TABLE leads ADD COLUMN IF NOT EXISTS service_type VARCHAR(100) DEFAULT ''`,
      `ALTER TABLE leads ADD COLUMN IF NOT EXISTS budget VARCHAR(50) DEFAULT ''`,
      `ALTER TABLE leads ADD COLUMN IF NOT EXISTS timeline VARCHAR(50) DEFAULT ''`,
      `ALTER TABLE leads ADD COLUMN IF NOT EXISTS phone VARCHAR(30) DEFAULT ''`,
      `ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_tag VARCHAR(50) DEFAULT ''`,
    ];

    for (const sql of alterQueries) {
      await pool.query(sql);
      console.log(`  ✓ ${sql.split('ADD COLUMN')[1]?.trim() || sql}`);
    }

    // Add indexes (IF NOT EXISTS is safe)
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_leads_lead_tag ON leads(lead_tag)`);
    console.log('  ✓ Index: idx_leads_lead_tag');

    await pool.query(`CREATE INDEX IF NOT EXISTS idx_leads_service_type ON leads(service_type)`);
    console.log('  ✓ Index: idx_leads_service_type');

    console.log('\n[Migration] ✅ All funnel columns and indexes added successfully!');
  } catch (err) {
    console.error('[Migration] ❌ Error:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
