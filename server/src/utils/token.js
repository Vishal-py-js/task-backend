// JWT helper to sign/verify tokens and provide cookie options.

import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/**
 * Sign a JWT token with payload and default expiry (env.jwtExpiresIn)
 * We'll store user id in `sub` (subject) claim.
 */
export const signToken = (payload, expiresIn = env.jwtExpiresIn) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn });

/**
 * Verify a token; throws if invalid/expired.
 */
export const verifyToken = (token) => jwt.verify(token, env.jwtSecret);

/**
 * Cookie options for storing the JWT as httpOnly cookie.
 * - httpOnly: true prevents JS from reading it (prevents XSS token theft)
 * - sameSite: 'lax' helps with CSRF protections but still supports top-level navigation
 * - secure: true in production (HTTPS)
 * - maxAge: derived from env.jwtExpiresIn
 */
export const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: env.cookieSecure,
  maxAge: (() => {
    // Convert simple forms like "1d" or "12h" to ms, fallback to 1 day.
    const v = env.jwtExpiresIn;
    if (v.endsWith('d')) {
      const days = parseInt(v, 10) || 1;
      return days * 24 * 60 * 60 * 1000;
    }
    if (v.endsWith('h')) {
      const hours = parseInt(v, 10) || 24;
      return hours * 60 * 60 * 1000;
    }
    // default 1 day
    return 24 * 60 * 60 * 1000;
  })()
};
