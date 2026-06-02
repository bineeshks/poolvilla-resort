import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Protect admin routes except login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('sitharom_admin_token')?.value;
    
    // Redirect unauthenticated user to login
    if (!token || token !== 'authenticated_sitharom_admin_session') {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // Redirect authenticated user away from login page to dashboard
  if (pathname === '/admin/login') {
    const token = request.cookies.get('sitharom_admin_token')?.value;
    
    if (token === 'authenticated_sitharom_admin_session') {
      const dashboardUrl = new URL('/admin/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
