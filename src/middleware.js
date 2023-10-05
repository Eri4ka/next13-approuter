import { NextResponse } from 'next/server';
import { checkAuth } from '@/utils/helpers/checkAuth';

export async function middleware(request) {
  const isAuthorized = await checkAuth();
  const isAuthRoutes =
    request.nextUrl.pathname.startsWith('/signin') ||
    request.nextUrl.pathname.startsWith('/signup');

  if (isAuthRoutes && isAuthorized) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isAuthRoutes && !isAuthorized) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
