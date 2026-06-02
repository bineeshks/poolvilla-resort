export interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode?: string;
  specialRequests?: string;
}

export interface DateRange {
  startDate: string; // ISO date YYYY-MM-DD
  endDate: string; // ISO date YYYY-MM-DD
}

export interface Occupancy {
  adults: number;
  children: number;
}

export interface RoomAvailability {
  roomId: string;
  roomName: string;
  availableCount: number;
  basePrice: number;
  taxAmount: number;
  currency: string;
  maxOccupancy: number;
  images: string[];
  description: string;
  amenities: string[];
}

export interface ReservationParams {
  roomId: string;
  dates: DateRange;
  occupancy: Occupancy;
  guest: GuestInfo;
  promoCode?: string;
  addons?: string[];
  paymentToken?: string;
}

export interface ReservationResult {
  reservationId: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED' | 'CANCELLED';
  totalPrice: number;
  currency: string;
  checkIn: string;
  checkOut: string;
  confirmationCode: string;
  provider: string;
  rawResponse?: any;
}

export interface WebhookPayload {
  provider: string;
  eventType: string;
  signature: string;
  body: any;
}

export interface BookingProviderAdapter {
  checkAvailability(dates: DateRange, occupancy: Occupancy): Promise<RoomAvailability[]>;
  getPricing(roomId: string, dates: DateRange, occupancy: Occupancy, promoCode?: string): Promise<number>;
  createReservation(params: ReservationParams): Promise<ReservationResult>;
  cancelReservation(reservationId: string, reason?: string): Promise<boolean>;
  getPackages(): Promise<any[]>;
  syncInventory(): Promise<boolean>;
  webhookHandler(payload: WebhookPayload): Promise<boolean>;
}
