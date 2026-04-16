import { NextRequest } from 'next/server';
import { validateAdminSession } from '@/lib/auth';

// ── GET /api/admin/me — Verify session is valid ──────────────────
export async function GET(request: NextRequest) {
  try {
    const isValid = await validateAdminSession(request);

    if (!isValid) {
      return Response.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return Response.json(
      { authenticated: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] GET /api/admin/me error:', error);
    return Response.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}
