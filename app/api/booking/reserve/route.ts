import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AdapterFactory } from '@/booking/providers/adapter.factory';
import { AuditLog } from '@/booking/models/AuditLog';
import { Reservation } from '@/booking/models/Reservation';
import { rateLimiter } from '@/booking/utils/rateLimit';
import { connectToDatabase } from '@/lib/db';

const reserveSchema = z.object({
  roomId: z.string().min(1, 'Room ID is required'),
  dates: z.object({
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD required'),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD required')
  }),
  occupancy: z.object({
    adults: z.number().int().min(1).max(10),
    children: z.number().int().min(0).max(10)
  }),
  guest: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(6, 'Valid contact phone required'),
    specialRequests: z.string().optional()
  }),
  promoCode: z.string().optional()
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown';

  // Strict Rate Limiting: Max 3 reservation creation requests per minute per IP to prevent spam bots
  const rateLimitOk = await rateLimiter(ip, 'RESERVATION_CREATE', 3, 60);
  if (!rateLimitOk) {
    return NextResponse.json(
      { error: 'Too many booking attempts. Please contact reservations desk directly.' },
      { status: 429 }
    );
  }

  try {
    const rawBody = await req.json();
    const parsed = reserveSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid reservation payload.', details: parsed.error.format() },
        { status: 400 }
      );
    }

    let dbConnected = false;
    try {
      await connectToDatabase();
      dbConnected = true;
    } catch (dbErr) {
      console.warn('[Reserve API] Database connection offline or bypassed:', dbErr);
    }

    const adapter = AdapterFactory.getAdapter();
    const result = await adapter.createReservation(parsed.data);

    // Save Reservation locally if database is available
    if (dbConnected) {
      try {
        await Reservation.create({
          bookingId: `SIT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          providerReservationId: result.reservationId,
          provider: result.provider,
          guestName: `${parsed.data.guest.firstName} ${parsed.data.guest.lastName}`,
          guestEmail: parsed.data.guest.email,
          guestPhone: parsed.data.guest.phone,
          roomId: parsed.data.roomId,
          roomName: parsed.data.roomId.includes('ithal') ? 'Ithal Villa' : 'Harsham Villa',
          checkIn: new Date(parsed.data.dates.startDate),
          checkOut: new Date(parsed.data.dates.endDate),
          totalAmount: result.totalPrice,
          currency: result.currency,
          status: result.status
        });

        await AuditLog.create({
          actor: 'guest_ip',
          action: 'CREATE_RESERVATION',
          status: 'SUCCESS',
          ipAddress: ip,
          details: `Confirmed reservation ${result.confirmationCode} (PMS: ${result.reservationId})`
        });
      } catch (dbSaveErr) {
        console.error('[Reserve API] Failed to write Reservation record:', dbSaveErr);
      }
    }

    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    console.error('[Reserve API] Booking submission exception:', error);

    return NextResponse.json(
      { error: 'Reservation booking failed. Please verify dates are still available.' },
      { status: 500 }
    );
  }
}
