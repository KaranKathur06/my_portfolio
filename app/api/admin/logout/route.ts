import { NextResponse } from 'next/server';
import { getClearCookieOptions } from '@/lib/auth';

// ── POST /api/admin/logout — Clear session cookie ────────────────
export async function POST() {
  try {
    const cookieOptions = getClearCookieOptions();

    const response = NextResponse.json(
      { success: true, message: 'Session cleared' },
      { status: 200 }
    );

    response.cookies.set(cookieOptions.name, '', {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      maxAge: cookieOptions.maxAge,
      path: cookieOptions.path,
    });

    return response;
  } catch (error) {
    console.error('[API] POST /api/admin/logout error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
