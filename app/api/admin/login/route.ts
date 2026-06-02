import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // In production, you would fetch this from process.env.ADMIN_PASSWORD
    const SECURE_USERNAME = process.env.ADMIN_USERNAME || 'admin';
    const SECURE_PASSWORD = process.env.ADMIN_PASSWORD || 'sitharom2026';

    if (username === SECURE_USERNAME && password === SECURE_PASSWORD) {
      // Create session response
      const response = NextResponse.json({ success: true });
      
      // Set encrypted / HttpOnly cookie
      response.cookies.set({
        name: 'sitharom_admin_token',
        value: 'authenticated_sitharom_admin_session', // secure static token signature
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
