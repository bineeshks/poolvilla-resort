import mongoose, { Schema, Document } from 'mongoose';

export interface IWebhookLog extends Document {
  receivedAt: Date;
  provider: string;
  eventId: string;
  status: 'PROCESSED' | 'FAILED' | 'DUPLICATE';
  payload: any;
}

const WebhookLogSchema = new Schema<IWebhookLog>({
  receivedAt: { type: Date, default: Date.now, index: true },
  provider: { type: String, required: true },
  eventId: { type: String, required: true, unique: true, index: true },
  status: { type: String, enum: ['PROCESSED', 'FAILED', 'DUPLICATE'], default: 'PROCESSED' },
  payload: { type: Schema.Types.Mixed, required: true }
}, { bufferCommands: false });

export const WebhookLog = mongoose.models.WebhookLog || mongoose.model<IWebhookLog>('WebhookLog', WebhookLogSchema);
