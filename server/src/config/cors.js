// CORS middleware configured to accept requests from the client URL (env).
// Credentials must be true to allow cookies (httpOnly) to be sent.

import cors from 'cors';
import { env } from './env.js';

export const corsMiddleware = cors({
  origin: env.clientUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});
