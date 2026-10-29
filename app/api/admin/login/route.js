import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getMongoDb } from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'sec_giftportal_admin_session_auth_key_2026_super_secure';
const DB_FILE_PATH = path.join(process.cwd(), 'data', 'server_db.json');

// Helper to get admins & vendors
async function getAuthEntities() {
  try {
    const db = await getMongoDb();
    const state = await db.collection('system_state').findOne({ _id: 'current_state' });
    if (state && (state.admins || state.vendors)) {
      return { admins: state.admins || [], vendors: state.vendors || [] };
    }
  } catch (err) {
    console.warn('MongoDB Atlas read warning in login route:', err.message);
  }

  // Fallback to local server_db.json
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      const data = JSON.parse(raw);
      return { admins: data.admins || [], vendors: data.vendors || [] };
    }
  } catch (e) {}

  return { admins: [], vendors: [] };
}

// Generate signed session token
function generateToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

export async function POST(request) {
  try {
    const { username, pin, role } = await request.json();
    const inputUser = String(username || '').toLowerCase().trim();
    const inputPin = String(pin || '').trim();
    const effectiveRole = role || 'admin';

    if (!inputUser || !inputPin) {
      return NextResponse.json({ success: false, error: 'Username and PIN are required.' }, { status: 400 });
    }

    const { admins, vendors } = await getAuthEntities();

    let matchedUser = null;
    let userRole = effectiveRole;

    if (effectiveRole === 'admin') {
      matchedUser = admins.find(a => 
        (a.role === 'super' || a.role === 'admin') && 
        (a.username?.toLowerCase().trim() === inputUser || a.id?.toLowerCase().trim() === inputUser) && 
        String(a.pin || '').trim() === inputPin
      );
      if (matchedUser) userRole = 'admin';
    } else if (effectiveRole === 'junior') {
      matchedUser = admins.find(a => 
        a.role === 'junior' && 
        (a.username?.toLowerCase().trim() === inputUser || a.id?.toLowerCase().trim() === inputUser) && 
        String(a.pin || '').trim() === inputPin
      );
      if (matchedUser) {
        if (matchedUser.isPaused) {
          return NextResponse.json({ success: false, error: 'Your account is paused. Please contact Super Admin.' }, { status: 403 });
        }
        userRole = 'junior';
      }
    } else if (effectiveRole === 'vendor') {
      matchedUser = vendors.find(v => {
        const uname = (v.username || '').toLowerCase().trim();
        const vid = (v.id || '').toLowerCase().trim();
        const vname = (v.name || '').toLowerCase().trim();
        const bname = (v.businessName || '').toLowerCase().trim();
        const vmob = String(v.mobile || '').trim();
        const vcat = (v.category || '').toLowerCase().trim();

        const userMatches = (
          uname === inputUser || 
          vid === inputUser || 
          vname === inputUser || 
          bname === inputUser || 
          bname.includes(inputUser) || 
          vmob === inputUser ||
          vcat === inputUser
        );

        const pinMatches = String(v.pin || '').trim() === inputPin;
        return userMatches && pinMatches;
      });

      if (matchedUser) {
        if (matchedUser.isPaused) {
          return NextResponse.json({ success: false, error: 'Your vendor account is paused. Please contact Super Admin.' }, { status: 403 });
        }
        userRole = 'vendor';
      }
    }

    if (!matchedUser) {
      // Artificial delay to prevent brute-force attacks
      await new Promise(r => setTimeout(r, 600));
      return NextResponse.json({ 
        success: false, 
        error: `Invalid ${effectiveRole === 'vendor' ? 'Vendor' : effectiveRole === 'junior' ? 'Junior Admin' : 'Admin'} username or PIN.` 
      }, { status: 401 });
    }

    // Sanitize user object (never return plain PIN back to the client)
    const { pin: _removedPin, ...sanitizedUser } = matchedUser;
    sanitizedUser.type = userRole === 'vendor' ? 'vendor' : 'admin';

    // Create session token (Valid for 7 days)
    const token = generateToken({
      id: sanitizedUser.id || sanitizedUser.username,
      username: sanitizedUser.username || sanitizedUser.id,
      role: userRole,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000
    });

    return NextResponse.json({
      success: true,
      user: sanitizedUser,
      role: userRole,
      token
    }, { status: 200 });

  } catch (err) {
    console.error('Admin login API error:', err);
    return NextResponse.json({ success: false, error: 'Server authentication error' }, { status: 500 });
  }
}

