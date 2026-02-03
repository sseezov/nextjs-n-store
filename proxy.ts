// ./middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

const ADMIN_PATH = '/admin';
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this'
);

async function verifyAuth(request: NextRequest) {
  // Проверяем JWT токен из куки
  const token = request.cookies.get('admin-token')?.value;
  
  if (!token) {
    return { isValid: false };
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return { isValid: true };
  } catch {
    return { isValid: false };
  }
}

async function createToken() {
  return await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith(ADMIN_PATH)) {
    return NextResponse.next();
  }

  const { isValid } = await verifyAuth(request);
  
  if (isValid) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Area"',
        'Content-Type': 'text/plain',
      },
    });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  if (username !== process.env.ADMIN_USER || password !== process.env.ADMIN_PASSWORD) {
    return new Response('Invalid credentials', { status: 401 });
  }

  // Создаем JWT токен
  const token = await createToken();
  const response = NextResponse.next();
  
  response.cookies.set('admin-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  });

  return response;
}

export const config = {
  matcher: '/admin/:path*',
};