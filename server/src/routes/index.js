// Mount top-level routes (/api/v1/auth and /api/v1/tasks)

import express from 'express';
import authRoutes from './auth.routes.js';
import taskRoutes from './task.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);

export default router;
