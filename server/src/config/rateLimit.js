// Simple rate limiters for general API and auth endpoints (bonus points).

import rateLimit from 'express-rate-limit';

// General API limiter (100 reqs / 15 minutes)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

// Auth specific limiter (tighter)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many auth attempts from this IP, please try again later.'
});
