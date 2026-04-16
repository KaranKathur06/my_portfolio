import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // ── Protect CRM routes ──────────────────────────────────────────────
  if (pathname.startsWith('/internal-admin-x9k7')) {
    const key = searchParams.get('key');
    const adminKey = process.env.ADMIN_KEY;

    if (!adminKey || key !== adminKey) {
      // Return generic 404 to hide the route's existence
      return new NextResponse('Not Found', { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/internal-admin-x9k7/:path*'],
};
