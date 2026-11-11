import { NextRequest, NextResponse } from 'next/server';
import { detectLocale, isLocale } from './i18n/locale';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('authToken')?.value;

  const response =
    pathname.startsWith('/dashboard') && !token
      ? NextResponse.redirect(new URL('/login', request.url))
      : NextResponse.next();

  const savedLocale = request.cookies.get('locale')?.value;

  if (!isLocale(savedLocale)) {
    response.cookies.set(
      'locale',
      detectLocale(request.headers.get('accept-language')),
      {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      },
    );
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};