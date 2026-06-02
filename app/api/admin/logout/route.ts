import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Clear the cookie by setting it with maxAge = 0
  response.cookies.set({
    name: 'sitharom_admin_token',
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0, // Immediately expires cookie
  });

  return response;
}
