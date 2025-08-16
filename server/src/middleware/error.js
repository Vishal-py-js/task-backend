// Global error handling middleware and 404 handler.
// Returns consistent JSON shape and hides stack in production.

import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

// 404 handler
export const notFound = (_req, res) => {
  res.status(404).json({ success: false, message: 'Not Found' });
};

// central error handler - must be 4-arg middleware
export const errorHandler = (err, _req, res, _next) => {
  console.error(err); // log for debugging - in prod you might send to a logging service

  if (err instanceof ApiError) {
    const body = {
      success: false,
      message: err.message,
      errors: err.errors || []
    };
    return res.status(err.statusCode).json(body);
  }

  // Zod validation errors have a different shape
  if (err?.name === 'ZodError') {
    const zods = err.errors.map((e) => ({ path: e.path.join('.'), message: e.message }));
    return res.status(400).json({ success: false, message: 'Validation failed', errors: zods });
  }

  // Generic fallback
  const status = err.statusCode || 500;
  const response = {
    success: false,
    message: status === 500 ? 'Internal Server Error' : err.message
  };

  // in development include stack
  if (env.nodeEnv === 'development') {
    response.stack = err.stack;
  }

  return res.status(status).json(response);
};
