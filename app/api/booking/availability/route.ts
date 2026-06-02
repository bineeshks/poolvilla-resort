import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AdapterFactory } from '@/booking/providers/adapter.factory';
import { AuditLog } from '@/booking/models/AuditLog';
import { rateLimiter } from '@/booking/utils/rateLimit';
import { connectToDatabase } from '@/lib/db';

const availabilitySchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be in YYYY-MM-DD format'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be in YYYY-MM-DD format'),
  adults: z.number().int().min(1).max(10),
  children: z.number().int().min(0).max(10)
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown';

  // Apply Rate Limiting: Max 15 lookups per minute per IP to prevent scraper bots
  const rateLimitOk = await rateLimiter(ip, 'AVAILABILITY_LOOKUP', 15, 60);
  if (!rateLimitOk) {
    return NextResponse.json(
      { error: 'Too many availability requests. Please wait a minute and try again.' }, 
      { status: 429 }
    );
  }

  try {
    const rawBody = await req.json();
    const parsed = availabilitySchema.safeParse(rawBody);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid search parameters.', details: parsed.error.format() }, 
        { status: 400 }
      );
    }

    // Connect to MongoDB (fails gracefully if MONGODB_URI is not set)
    let dbConnected = false;
    try {
      await connectToDatabase();
      dbConnected = true;
    } catch (dbErr) {
      console.warn('[Availability API] Database connection failed or bypassed:', dbErr);
    }

    const adapter = AdapterFactory.getAdapter();
    const results = await adapter.checkAvailability(
      { startDate: parsed.data.startDate, endDate: parsed.data.endDate },
      { adults: parsed.data.adults, children: parsed.data.children }
    );

    // Secure Audit Logging (does not crash if DB is not configured)
    if (dbConnected) {
      try {
        await AuditLog.create({
          actor: 'guest_ip',
          action: 'CHECK_AVAILABILITY',
          status: 'SUCCESS',
          ipAddress: ip,
          details: `Checked: ${parsed.data.startDate} to ${parsed.data.endDate} | Adults: ${parsed.data.adults}`
        });
      } catch (logErr) {
        console.error('[Availability API] Failed to write AuditLog:', logErr);
      }
    }

    return NextResponse.json(results, { status: 200 });

  } catch (error: any) {
    console.error('[Availability API] Exception:', error);
    
    // Mask detailed database or third-party error outputs from end users in production
    return NextResponse.json(
      { error: 'An error occurred while fetching real-time room availability. Please contact support.' }, 
      { status: 500 }
    );
  }
}
