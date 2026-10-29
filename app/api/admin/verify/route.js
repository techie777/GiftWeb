import { NextResponse } from 'next/server';
import crypto from 'crypto';

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'sec_giftportal_admin_session_auth_key_2026_super_secure';

function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [header, body, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(`${header}.${body}`).digest('base64url');

  try {
    const isSigValid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig));
    if (!isSigValid) return null;

    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired
    }
    return payload;
  } catch (err) {
    return null;
  }
}

export async function POST(request) {
  try {
    const { token } = await request.json();
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json({ valid: false, error: 'Session expired or invalid signature' }, { status: 401 });
    }

    return NextResponse.json({
      valid: true,
      user: {
        id: payload.id,
        username: payload.username,
        role: payload.role
      }
    });
  } catch (err) {
    return NextResponse.json({ valid: false, error: 'Verification failed' }, { status: 400 });
  }
}

export async function GET(request) {
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const payload = verifyToken(token);

  if (!payload) {
    return NextResponse.json({ valid: false, error: 'Session expired or invalid' }, { status: 401 });
  }

  return NextResponse.json({
    valid: true,
    user: {
      id: payload.id,
      username: payload.username,
      role: payload.role
    }
  });
}

