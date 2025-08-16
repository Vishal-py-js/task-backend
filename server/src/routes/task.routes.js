// Task routes: all protected by requireAuth middleware

import express from 'express';
import {
  createTask,
  listTasks,
  getTask,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { createTaskSchema, updateTaskSchema } from '../validations/task.validation.js';

const router = express.Router();

// Attach auth middleware to all task routes
router.use(requireAuth);

router.post('/', validateBody(createTaskSchema), createTask);
router.get('/', listTasks);
router.get('/:id', getTask);
router.put('/:id', validateBody(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);

export default router;
