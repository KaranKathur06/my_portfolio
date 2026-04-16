import { NextRequest } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

// ── Constants ────────────────────────────────────────────────────────
const COOKIE_NAME = 'admin_session';
const SESSION_DURATION = '24h';
const SESSION_MAX_AGE = 24 * 60 * 60; // 24 hours in seconds

/**
 * Get the JWT secret as a Uint8Array (required by jose).
 */
function getJWTSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return new TextEncoder().encode(secret);
}

// ── Session Management ──────────────────────────────────────────────

/**
 * Creates a signed JWT session token.
 */
export async function createSessionToken(): Promise<string> {
  return new SignJWT({ admin: true, iat: Math.floor(Date.now() / 1000) })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getJWTSecret());
}

/**
 * Verifies a session token and returns whether it's valid.
 */
export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getJWTSecret());
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates the admin password against the environment variable.
 */
export function validatePassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    console.error('[AUTH] ADMIN_PASSWORD not configured in environment');
    return false;
  }
  // Constant-time comparison to prevent timing attacks
  if (password.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < password.length; i++) {
    mismatch |= password.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Validates admin session from request cookies.
 * Used by API routes to verify the caller is authenticated.
 */
export async function validateAdminSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

/**
 * Returns cookie options for setting the session cookie.
 */
export function getSessionCookieOptions() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    maxAge: SESSION_MAX_AGE,
    path: '/',
  };
}

/**
 * Returns cookie options for clearing the session cookie.
 */
export function getClearCookieOptions() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    maxAge: 0,
    path: '/',
  };
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

// ── Rate Limiting ───────────────────────────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Simple in-memory rate limiter for API routes.
 * Tracks request counts per IP within a time window.
 */
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
