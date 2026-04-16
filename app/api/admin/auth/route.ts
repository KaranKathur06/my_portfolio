import { NextRequest, NextResponse } from 'next/server';
import {
  validatePassword,
  createSessionToken,
  getSessionCookieOptions,
  checkRateLimit,
  getClientIP,
} from '@/lib/auth';

// ── POST /api/admin/auth — Validate password + create session ─────
export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 attempts per minute per IP
    const ip = getClientIP(request);
    const { allowed } = checkRateLimit(ip, 5, 60000);
    if (!allowed) {
      // Add artificial delay on rate limit to slow brute force
      await new Promise((r) => setTimeout(r, 2000));
      return Response.json(
        { error: 'Too many attempts. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== 'string') {
      return Response.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Validate password
    if (!validatePassword(password)) {
      // Add delay on failed attempt to slow brute force
      await new Promise((r) => setTimeout(r, 1000));
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Create JWT session token
    const token = await createSessionToken();
    const cookieOptions = getSessionCookieOptions();

    // Build response with secure httpOnly cookie
    const response = NextResponse.json(
      { success: true, message: 'Session created' },
      { status: 200 }
    );

    response.cookies.set(cookieOptions.name, token, {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      maxAge: cookieOptions.maxAge,
      path: cookieOptions.path,
    });

    return response;
  } catch (error) {
    console.error('[API] POST /api/admin/auth error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
