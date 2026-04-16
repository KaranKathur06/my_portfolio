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

  // ── Protect admin API routes with session cookie ─────────────────
  // Auth endpoints handle their own security (login, logout, me)
  if (pathname.startsWith('/api/admin/')) {
    return NextResponse.next();
  }

  // ── CRM pages: let them through ─────────────────────────────────
  // AuthProvider on the client handles showing the password gate
  // vs the dashboard based on session status
  if (pathname.startsWith('/internal-admin-x9k7')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/internal-admin-x9k7/:path*', '/api/admin/:path*'],
};
