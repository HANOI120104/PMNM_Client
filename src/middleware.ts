import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

function isAuthenticated(req: NextRequest) {
  const token = req.cookies.get('access_token');
  return token ? true : false;
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Skip middleware logic if user is already at `/signin` and unauthenticated
  if (url.pathname === "/signin" && !isAuthenticated(req)) {
    return NextResponse.next(); // Allow access to `/signin`
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!isAuthenticated(req)) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // Prevent authenticated users from accessing `/signin`
  if (url.pathname === "/signin" && isAuthenticated(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Proceed with request if all conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: ['/account', '/signin'], // Middleware applies to `/account` and `/signin`
};
