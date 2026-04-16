import { NextRequest } from 'next/server';
import { getLeadById, updateLead } from '@/lib/db';
import { validateAdminSession, unauthorizedResponse } from '@/lib/auth';

// ── GET /api/leads/:id — Admin: get lead detail ──────────────────
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!(await validateAdminSession(request))) {
      return unauthorizedResponse();
    }

    const lead = await getLeadById(params.id);

    if (!lead) {
      return Response.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    return Response.json({ lead });
  } catch (error) {
    console.error(`[API] GET /api/leads/${params.id} error:`, error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ── PATCH /api/leads/:id — Admin: update lead status/notes ───────
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!(await validateAdminSession(request))) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const { status, notes } = body;

    // Validate status if provided
    const validStatuses = ['new', 'in_progress', 'converted', 'closed'];
    if (status && !validStatuses.includes(status)) {
      return Response.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const lead = await updateLead(params.id, { status, notes });

    if (!lead) {
      return Response.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    return Response.json({ lead });
  } catch (error) {
    console.error(`[API] PATCH /api/leads/${params.id} error:`, error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
