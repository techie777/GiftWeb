import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getMongoDb } from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'sec_giftportal_admin_session_auth_key_2026_super_secure';
const DB_FILE_PATH = path.join(process.cwd(), 'data', 'server_db.json');

function verifyToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(`${header}.${body}`).digest('base64url');
  try {
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch (err) {
    return null;
  }
}

export async function POST(request) {
  try {
    const { token, currentPin, newPin, username } = await request.json();
    const payload = verifyToken(token);

    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized. Super Admin access required.' }, { status: 403 });
    }

    const cleanNewPin = String(newPin || '').trim();
    if (!cleanNewPin || cleanNewPin.length !== 4 || !/^\d{4}$/.test(cleanNewPin)) {
      return NextResponse.json({ success: false, error: 'New PIN must be exactly 4 numeric digits.' }, { status: 400 });
    }

    const targetUser = (username || payload.username || 'admin').toLowerCase();

    // 1. Update in MongoDB Atlas
    try {
      const db = await getMongoDb();
      const state = await db.collection('system_state').findOne({ _id: 'current_state' });
      if (state && Array.isArray(state.admins)) {
        const adminIndex = state.admins.findIndex(a => a.username.toLowerCase() === targetUser);
        if (adminIndex >= 0) {
          // If currentPin was supplied, optionally verify
          if (currentPin && String(state.admins[adminIndex].pin).trim() !== String(currentPin).trim()) {
            return NextResponse.json({ success: false, error: 'Current PIN is incorrect.' }, { status: 400 });
          }
          state.admins[adminIndex].pin = cleanNewPin;
          state.version = (state.version || 0) + 1;
          state.lastUpdated = new Date().toISOString();

          await db.collection('system_state').updateOne(
            { _id: 'current_state' },
            { $set: { admins: state.admins, version: state.version, lastUpdated: state.lastUpdated } }
          );

          await db.collection('admins').updateOne(
            { username: targetUser },
            { $set: { pin: cleanNewPin, updatedAt: new Date().toISOString() } },
            { upsert: true }
          );
        }
      }
    } catch (mongoErr) {
      console.error('Error updating admin PIN in MongoDB:', mongoErr);
    }

    // 2. Update in local server_db.json if it exists
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        const data = JSON.parse(raw);
        if (Array.isArray(data.admins)) {
          const idx = data.admins.findIndex(a => a.username.toLowerCase() === targetUser);
          if (idx >= 0) {
            data.admins[idx].pin = cleanNewPin;
            data.version = (data.version || 0) + 1;
            data.lastUpdated = new Date().toISOString();
            fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
          }
        }
      }
    } catch (fsErr) {}

    return NextResponse.json({ success: true, message: 'Admin PIN updated successfully.' });
  } catch (err) {
    console.error('Change PIN error:', err);
    return NextResponse.json({ success: false, error: 'Failed to update PIN.' }, { status: 500 });
  }
}

