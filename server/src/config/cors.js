// CORS middleware configured to accept requests from the client URL (env).
// Credentials must be true to allow cookies (httpOnly) to be sent.

import cors from 'cors';
import { env } from './env.js';

const allowedOrigins = [
  env.clientUrl,                        // from .env
  "http://localhost:5173",              // local dev
  "https://task-fontend.onrender.com", // deployed frontend
];

// export const corsMiddleware = cors({
//   origin: env.clientUrl,
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
// });

export const corsMiddleware = cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
});
