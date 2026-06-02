// Simple in-memory rate limiter for server-side route protection.
// In a serverless/production environment, this should connect to Redis (e.g. Upstash).

interface LimitRecord {
  timestamps: number[];
}

const memoryStore = new Map<string, LimitRecord>();

// Clean up stale records periodically (every 5 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    memoryStore.forEach((record, key) => {
      // Keep only timestamps within the last 15 minutes
      const validTimestamps = record.timestamps.filter(ts => now - ts < 15 * 60 * 1000);
      if (validTimestamps.length === 0) {
        memoryStore.delete(key);
      } else {
        record.timestamps = validTimestamps;
      }
    });
  }, 5 * 60 * 1000);
}

/**
 * Standard server rate limiter.
 * @param identifier Unique identifier per client (typically client IP)
 * @param action Name of the action (e.g. "BOOKING_INQUIRY")
 * @param limit Maximum allowed requests within the duration window
 * @param windowSec Window duration in seconds
 * @returns boolean true if the request is allowed, false if rate limit exceeded
 */
export async function rateLimiter(
  identifier: string,
  action: string,
  limit: number,
  windowSec: number
): Promise<boolean> {
  const key = `${identifier}:${action}`;
  const now = Date.now();
  const windowMs = windowSec * 1000;

  let record = memoryStore.get(key);
  if (!record) {
    record = { timestamps: [] };
    memoryStore.set(key, record);
  }

  // Filter timestamps within the current sliding window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= limit) {
    return false;
  }

  record.timestamps.push(now);
  return true;
}
