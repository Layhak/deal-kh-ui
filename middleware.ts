import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const authSessionToken = request.cookies.get('authjs.session-token');
  const dealkhSessionToken = request.cookies.get('dealkh-refresh-token');

  // Check if user is trying to access login or register page
  if (
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/register'
  ) {
    if (authSessionToken && dealkhSessionToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Check if user is trying to access profile, wishlist, or cart page
  if (['/profile', '/wishlist', '/cart'].includes(request.nextUrl.pathname)) {
    if (!dealkhSessionToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Define the routes that should trigger this middleware
export const config = {
  matcher: ['/login', '/register', '/profile', '/wishlist', '/cart'],
};
