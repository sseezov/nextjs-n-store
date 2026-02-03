import { NextResponse } from 'next/server';

export function proxy(request: Request) {
  const auth = request.headers.get('authorization');
  
  if (!auth || !auth.startsWith('Basic ')) {
    return new Response('Auth required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' },
    });
  }
  
  const credentials = Buffer.from(auth.slice(6), 'base64').toString();
  const [username, password] = credentials.split(':');
  
  // Проверка (храни в переменных окружения)
  if (username !== process.env.ADMIN_USER || 
      password !== process.env.ADMIN_PASSWORD) {
    return new Response('Invalid credentials', { status: 401 });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};