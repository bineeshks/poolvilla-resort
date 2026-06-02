import { BookingProviderAdapter } from '../types';
import { CloudbedsAdapter } from './cloudbeds/adapter';
import { HotelogixAdapter } from './hotelogix/adapter';
import { LittleHotelierAdapter } from './littlehotelier/adapter';
import { SmoobuAdapter } from './smoobu/adapter';

export class AdapterFactory {
  /**
   * Resolves the active booking provider adapter instance.
   * Pulls from process.env.ACTIVE_BOOKING_PROVIDER, defaulting to 'cloudbeds'.
   * @param providerName Optional manual override for testing or multi-tenant setups
   */
  static getAdapter(providerName?: string): BookingProviderAdapter {
    const activeProvider = providerName || process.env.ACTIVE_BOOKING_PROVIDER || 'cloudbeds';

    switch (activeProvider.toLowerCase()) {
      case 'cloudbeds':
        return new CloudbedsAdapter();
      case 'hotelogix':
        return new HotelogixAdapter();
      case 'littlehotelier':
        return new LittleHotelierAdapter();
      case 'smoobu':
        return new SmoobuAdapter();
      default:
        throw new Error(`Unsupported booking provider configuration: "${activeProvider}"`);
    }
  }
}
