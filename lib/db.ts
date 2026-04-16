import { Pool, PoolClient } from 'pg';

// Singleton pool instance
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    pool = new Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    // Handle pool errors
    pool.on('error', (err) => {
      console.error('[DB] Unexpected pool error:', err);
    });
  }
  return pool;
}

// Execute a query
export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const client = await getPool().connect();
  try {
    const result = await client.query(text, params);
    return result.rows as T[];
  } finally {
    client.release();
  }
}

// Execute a query and return a single row
export async function queryOne<T = any>(
  text: string,
  params?: any[]
): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows[0] || null;
}

// Get a client for transactions
export async function getClient(): Promise<PoolClient> {
  return getPool().connect();
}

// Health check
export async function checkConnection(): Promise<boolean> {
  try {
    await query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}

// Lead types — extended for multi-step funnel
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  service_type: string;
  budget: string;
  timeline: string;
  lead_tag: string;
  status: 'new' | 'in_progress' | 'converted' | 'closed';
  notes: string;
  created_at: string;
  updated_at: string;
}

export type LeadCreate = Pick<Lead, 'name' | 'email'> & Partial<Pick<Lead, 'phone' | 'subject' | 'message' | 'service_type' | 'budget' | 'timeline' | 'lead_tag'>>;
export type LeadUpdate = Partial<Pick<Lead, 'status' | 'notes'>>;

// ── Lead Qualification Logic ─────────────────────────────────────────
export function qualifyLead(data: { service_type?: string; budget?: string }): string {
  const budget = data.budget || '';
  const service = data.service_type || '';

  // High Value: budget >= ₹25k
  if (budget === '₹25k–₹50k' || budget === '₹50k+') {
    return 'high_value';
  }

  // Core Client: full-stack service
  if (service === 'Full-Stack Application' || service === 'Dashboard / Admin Panel') {
    return 'core_client';
  }

  // Low Budget: budget < ₹10k
  if (budget === '₹5k–₹10k') {
    return 'low_budget';
  }

  return 'standard';
}

// ── Lead Repository ──────────────────────────────────────────────────

export async function createLead(data: LeadCreate): Promise<Lead> {
  // Auto-qualify the lead
  const leadTag = qualifyLead({
    service_type: data.service_type,
    budget: data.budget,
  });

  const rows = await query<Lead>(
    `INSERT INTO leads (name, email, phone, subject, message, service_type, budget, timeline, lead_tag)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      data.name,
      data.email,
      data.phone || '',
      data.subject || '',
      data.message || '',
      data.service_type || '',
      data.budget || '',
      data.timeline || '',
      leadTag,
    ]
  );
  return rows[0];
}

export async function getAllLeads(
  filters?: { status?: string; search?: string; lead_tag?: string }
): Promise<Lead[]> {
  let sql = 'SELECT * FROM leads';
  const params: any[] = [];
  const conditions: string[] = [];

  if (filters?.status) {
    conditions.push(`status = $${params.length + 1}`);
    params.push(filters.status);
  }

  if (filters?.lead_tag) {
    conditions.push(`lead_tag = $${params.length + 1}`);
    params.push(filters.lead_tag);
  }

  if (filters?.search) {
    conditions.push(
      `(name ILIKE $${params.length + 1} OR email ILIKE $${params.length + 1} OR message ILIKE $${params.length + 1})`
    );
    params.push(`%${filters.search}%`);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  sql += ' ORDER BY created_at DESC';

  return query<Lead>(sql, params);
}

export async function getLeadById(id: string): Promise<Lead | null> {
  return queryOne<Lead>('SELECT * FROM leads WHERE id = $1', [id]);
}

export async function updateLead(id: string, data: LeadUpdate): Promise<Lead | null> {
  const setClauses: string[] = [];
  const params: any[] = [];

  if (data.status !== undefined) {
    params.push(data.status);
    setClauses.push(`status = $${params.length}`);
  }

  if (data.notes !== undefined) {
    params.push(data.notes);
    setClauses.push(`notes = $${params.length}`);
  }

  if (setClauses.length === 0) return getLeadById(id);

  params.push(id);
  const sql = `UPDATE leads SET ${setClauses.join(', ')} WHERE id = $${params.length} RETURNING *`;

  return queryOne<Lead>(sql, params);
}

export async function getLeadStats(): Promise<{
  total: number;
  new: number;
  in_progress: number;
  converted: number;
  closed: number;
  high_value: number;
}> {
  const rows = await query<{ status: string; count: string }>(
    `SELECT status, COUNT(*)::text as count FROM leads GROUP BY status`
  );

  const tagRows = await query<{ lead_tag: string; count: string }>(
    `SELECT lead_tag, COUNT(*)::text as count FROM leads WHERE lead_tag = 'high_value' GROUP BY lead_tag`
  );

  const stats = {
    total: 0,
    new: 0,
    in_progress: 0,
    converted: 0,
    closed: 0,
    high_value: 0,
  };

  for (const row of rows) {
    const count = parseInt(row.count, 10);
    stats.total += count;
    if (row.status in stats) {
      (stats as any)[row.status] = count;
    }
  }

  for (const row of tagRows) {
    stats.high_value = parseInt(row.count, 10);
  }

  return stats;
}
