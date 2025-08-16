// Auth routes: register, login, logout, me

import express from 'express';
import { register, login, logout, me } from '../controllers/auth.controller.js';
import { validateBody } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../validations/auth.validation.js';
import { authLimiter } from '../config/rateLimit.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Rate limit authentication endpoints to slow brute force
router.post('/register', authLimiter, validateBody(registerSchema), register);
router.post('/login', authLimiter, validateBody(loginSchema), login);
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, me);

export default router;
