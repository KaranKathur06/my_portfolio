import { NextRequest } from 'next/server';
import { createLead, getAllLeads } from '@/lib/db';
import { validateAdminKey, unauthorizedResponse, checkRateLimit, getClientIP } from '@/lib/auth';

// ── POST /api/leads — Public: submit a new lead ───────────────────
export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 submissions per minute per IP
    const ip = getClientIP(request);
    const { allowed } = checkRateLimit(ip, 5, 60000);
    if (!allowed) {
      return Response.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate required fields
    const { name, email, phone, subject, message, service_type, budget, timeline } = body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return Response.json(
        { error: 'Name is required (minimum 2 characters)' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      return Response.json(
        { error: 'A valid email address is required' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return Response.json(
        { error: 'Message is required (minimum 10 characters)' },
        { status: 400 }
      );
    }

    // Sanitize inputs and create lead
    const lead = await createLead({
      name: sanitize(name),
      email: email.trim().toLowerCase(),
      phone: sanitize(phone || ''),
      subject: sanitize(subject || service_type || ''),
      message: sanitize(message),
      service_type: sanitize(service_type || ''),
      budget: sanitize(budget || ''),
      timeline: sanitize(timeline || ''),
    });

    return Response.json(
      {
        success: true,
        message: 'Thank you! Your message has been received.',
        id: lead.id,
        lead_tag: lead.lead_tag,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API] POST /api/leads error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ── GET /api/leads — Admin: list all leads ────────────────────────
export async function GET(request: NextRequest) {
  try {
    // Admin-only access
    if (!validateAdminKey(request)) {
      return unauthorizedResponse();
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    const lead_tag = searchParams.get('lead_tag') || undefined;

    const leads = await getAllLeads({ status, search, lead_tag });

    return Response.json({ leads, total: leads.length });
  } catch (error) {
    console.error('[API] GET /api/leads error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ── Helpers ───────────────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function sanitize(str: string): string {
  return str
    .trim()
    .replace(/<[^>]*>/g, '') // strip HTML tags
    .slice(0, 5000);         // cap length
}
