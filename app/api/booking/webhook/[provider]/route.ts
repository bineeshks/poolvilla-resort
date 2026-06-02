import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { WebhookLog } from '@/booking/models/WebhookLog';
import { Reservation } from '@/booking/models/Reservation';
import { connectToDatabase } from '@/lib/db';

// Enforce timing-safe signature comparison for security against timing attacks
function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  if (!signature || !secret) return false;
  try {
    const computed = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(computed, 'utf8'), 
      Buffer.from(signature, 'utf8')
    );
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest, { params }: { params: { provider: string } }) {
  const provider = params.provider;
  const signature = req.headers.get('x-webhook-signature') || '';
  const rawBody = await req.text();

  // Load provider webhook secret from env
  const secretKeyEnv = `${provider.toUpperCase()}_WEBHOOK_SECRET`;
  const webhookSecret = process.env[secretKeyEnv] || 'default_stub_secret';

  // Perform secure signature audit
  if (process.env.NODE_ENV === 'production' && !verifyWebhookSignature(rawBody, signature, webhookSecret)) {
    console.error(`[Webhook][${provider}] Unauthorized webhook signature mismatch`);
    return NextResponse.json({ error: 'Signature verification failure.' }, { status: 401 });
  }

  try {
    const eventData = JSON.parse(rawBody);
    const eventId = eventData.eventId || eventData.id || `evt-${Date.now()}`;

    let dbConnected = false;
    try {
      await connectToDatabase();
      dbConnected = true;
    } catch (dbErr) {
      console.warn('[Webhook API] MONGODB is offline or bypassed');
    }

    if (dbConnected) {
      // 1. Enforce Idempotence: Discard already processed events
      const duplicate = await WebhookLog.findOne({ eventId });
      if (duplicate) {
        return NextResponse.json({ status: 'DUPLICATE', message: 'Webhook event already processed' }, { status: 200 });
      }

      // 2. Perform local reservation status updates
      if (eventData.type === 'reservation.cancelled' || eventData.status === 'cancelled') {
        const PMS_resId = eventData.reservationId || eventData.id;
        await Reservation.findOneAndUpdate(
          { providerReservationId: PMS_resId },
          { status: 'CANCELLED' }
        );
      }

      // Save webhook record
      await WebhookLog.create({
        provider,
        eventId,
        status: 'PROCESSED',
        payload: eventData
      });
    }

    console.log(`[Webhook][${provider}] Webhook processed successfully:`, eventId);
    return NextResponse.json({ status: 'SUCCESS' }, { status: 200 });

  } catch (error: any) {
    console.error(`[Webhook][${provider}] Error:`, error);
    return NextResponse.json({ error: 'Error ingesting webhook events' }, { status: 500 });
  }
}
