import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'admin_session';

function getJWTSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) return new TextEncoder().encode('');
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Protect CRM page routes ──────────────────────────────────────
  // Allow the auth API through (it handles its own security)
  if (pathname.startsWith('/api/admin/')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/internal-admin-x9k7')) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      // No session — return 404 to hide route existence
      return new NextResponse('Not Found', { status: 404 });
    }

    try {
      await jwtVerify(token, getJWTSecret());
      return NextResponse.next();
    } catch {
      // Invalid/expired session — return 404
      return new NextResponse('Not Found', { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/internal-admin-x9k7/:path*', '/api/admin/:path*'],
};
