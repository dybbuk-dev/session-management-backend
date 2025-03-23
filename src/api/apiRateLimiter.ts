import RateLimit from 'express-rate-limit';

export function createRateLimiter({
  max,
  windowMs,
  message,
}: {
  max: number;
  windowMs: number;
  message: string;
}) {
  return RateLimit({
    max,
    windowMs,
    message,
    skip: req => {
      if (req.method === 'OPTIONS') {
        return true;
      }

      return false;
    },
  });
}
