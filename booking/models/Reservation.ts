import mongoose, { Schema, Document } from 'mongoose';

export interface IReservation extends Document {
  bookingId: string;
  providerReservationId: string;
  provider: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  roomName: string;
  checkIn: Date;
  checkOut: Date;
  totalAmount: number;
  currency: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED' | 'CANCELLED';
  createdAt: Date;
}

const ReservationSchema = new Schema<IReservation>({
  bookingId: { type: String, required: true, unique: true, index: true },
  providerReservationId: { type: String, required: true, index: true },
  provider: { type: String, required: true },
  guestName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  guestPhone: { type: String, required: true },
  roomId: { type: String, required: true },
  roomName: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['PENDING', 'CONFIRMED', 'FAILED', 'CANCELLED'], default: 'PENDING' },
  createdAt: { type: Date, default: Date.now }
}, { bufferCommands: false });

export const Reservation = mongoose.models.Reservation || mongoose.model<IReservation>('Reservation', ReservationSchema);
