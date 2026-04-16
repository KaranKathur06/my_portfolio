import { NextRequest } from 'next/server';

/**
 * Validates admin access via x-admin-key header.
 * This is the PRIMARY security gate — always enforced on backend.
 */
export function validateAdminKey(request: NextRequest): boolean {
  const adminKey = request.headers.get('x-admin-key');
  const expectedKey = process.env.ADMIN_KEY;

  if (!expectedKey) {
    console.error('[AUTH] ADMIN_KEY not configured in environment');
    return false;
  }

  return adminKey === expectedKey;
}

/**
 * Returns a 401 Unauthorized JSON response.
 */
export function unauthorizedResponse() {
  return Response.json(
    { error: 'Unauthorized' },
    { status: 401 }
  );
}

/**
 * Simple in-memory rate limiter for API routes.
 * Tracks request counts per IP within a time window.
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  ip: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  entry.count++;

  if (entry.count > maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: maxRequests - entry.count };
}

/**
 * Extract client IP from request headers.
 */
export function getClientIP(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}
