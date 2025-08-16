// Express application wiring: middlewares, routes, error handlers.
// This file focuses on composition and security middlewares.

import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import { corsMiddleware } from './config/cors.js';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/error.js';
import { apiLimiter } from './config/rateLimit.js';

const app = express();

// Security headers
app.use(helmet());

// Logging - use morgan in development for readable logs
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// Body parsing with a reasonable size limit
app.use(express.json({ limit: '10kb' }));

// Cookie parser to read httpOnly cookie tokens
app.use(cookieParser());

// CORS configured to accept credentials from client origin
app.use(corsMiddleware);

// Apply general rate limiter to API endpoints
app.use('/api', apiLimiter);

// Mount API routes
app.use('/api/v1', routes);

// Healthcheck
app.get('/health', (_req, res) => res.json({ success: true, uptime: process.uptime() }));

// 404 + global error handler
app.use(notFound);
app.use(errorHandler);

export default app;
