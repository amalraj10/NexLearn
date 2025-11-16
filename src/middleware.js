import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('access_token');
  const { pathname } = request.nextUrl;

  // Public routes
  if (pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  // Protected routes
  if (!token && pathname.startsWith('/exam')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/exam/:path*', '/auth/:path*'],
};
