import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  timestamp: Date;
  actor: string;
  action: string;
  status: 'SUCCESS' | 'FAILED';
  ipAddress: string;
  details: string;
}

const AuditLogSchema = new Schema<IAuditLog>({
  timestamp: { type: Date, default: Date.now, index: true },
  actor: { type: String, required: true },
  action: { type: String, required: true, index: true },
  status: { type: String, enum: ['SUCCESS', 'FAILED'], required: true },
  ipAddress: { type: String, required: true },
  details: { type: String, required: true }
}, { bufferCommands: false });

export const AuditLog = mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
