type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_TRACKED_KEYS = 5000;

/**
 * Fixed-window, in-memory rate limiter. On serverless platforms each instance
 * keeps its own window, so this is a first line of defence rather than a
 * global guarantee; pair it with the honeypot and timing checks.
 */
export function rateLimit(key: string, limit: number, windowMs: number, now: number) {
  if (buckets.size > MAX_TRACKED_KEYS) {
    for (const [storedKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(storedKey);
    }
  }

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return { allowed: false, retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000) };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}
