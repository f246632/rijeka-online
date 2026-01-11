import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to protect admin routes
export function middleware(request: NextRequest) {
  // For now, allow all requests
  // TODO: Implement proper authentication check when NextAuth is fully configured
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
