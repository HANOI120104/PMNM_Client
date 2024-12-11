import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { showErrorToast } from './components/Toast/toast';

function isAuthenticated(req: NextRequest) {
  const token = req.cookies.get('access_token');
  return token ? true : false;
}

export function middleware(req: NextRequest) {
  const url = req.url;
  // console.log("🚀 ~ middleware ~ url:", url)

  if (!isAuthenticated(req)) {
    return NextResponse.redirect(new URL('/signin', url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/donation', '/account'],
};
