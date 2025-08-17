// Centralized environment config loader. Throws if required env vars missing.
// Use this module across the app to access configuration.

import dotenv from 'dotenv';
dotenv.config();

const required = (name) => {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
};

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  mongoUri: process.env.MONGO_URI,
  jwtSecret: required('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  cookieSecure: process.env.COOKIE_SECURE === 'true',
  clientUrl: required('CLIENT_URL'),
  saltRounds: parseInt(process.env.SALT_ROUNDS || '10', 10)
};
