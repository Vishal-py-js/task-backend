// Task controllers implementing CRUD operations.
// All routes assume requireAuth middleware has run and req.user.id is available.

import { Task } from '../models/Task.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import mongoose from 'mongoose';

/**
 * Helper to assert ownership of task
 */
const assertOwnership = (task, userId) => {
  if (!task) throw new ApiError(404, 'Task not found');
  if (task.user.toString() !== userId) throw new ApiError(403, 'Forbidden');
};

/**
 * POST /api/v1/tasks
 * Create a task for current user
 */
export const createTask = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { title, description, status, dueDate } = req.body;

  const parsedDue = dueDate ? new Date(dueDate) : undefined;

  const task = await Task.create({
    user: new mongoose.Types.ObjectId(userId),
    title,
    description,
    status,
    dueDate: parsedDue
  });

  res.status(201).json({ success: true, data: task });
});

/**
 * GET /api/v1/tasks
 * List tasks for current user with optional filters: status, search, pagination
 */
export const listTasks = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { status, search, page = 1, limit = 20 } = req.query;

  const query = { user: userId };
  if (status) query.status = status;
  if (search) {
    // simple case-insensitive regex search on title and description
    const re = new RegExp(search, 'i');
    query.$or = [{ title: re }, { description: re }];
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const lim = Math.min(100, parseInt(limit, 10) || 20);
  const skip = (pageNum - 1) * lim;

  const [items, total] = await Promise.all([
    Task.find(query).sort({ createdAt: -1 }).skip(skip).limit(lim),
    Task.countDocuments(query)
  ]);

  res.json({
    success: true,
    data: items,
    meta: { page: pageNum, limit: lim, total }
  });
});

/**
 * GET /api/v1/tasks/:id
 * Retrieve a single task (must belong to user)
 */
export const getTask = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  const task = await Task.findById(id);
  try {
    assertOwnership(task, userId);
  } catch (e) {
    return next(e);
  }
  res.json({ success: true, data: task });
});

/**
 * PUT /api/v1/tasks/:id
 * Update task fields (only owner)
 */
export const updateTask = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  const updates = req.body;

  const task = await Task.findById(id);
  try {
    assertOwnership(task, userId);
  } catch (e) {
    return next(e);
  }

  // apply updates; safe properties only
  if (updates.title !== undefined) task.title = updates.title;
  if (updates.description !== undefined) task.description = updates.description;
  if (updates.status !== undefined) task.status = updates.status;
  if (updates.dueDate !== undefined) {
    task.dueDate = updates.dueDate ? new Date(updates.dueDate) : undefined;
  }

  await task.save();
  res.json({ success: true, data: task });
});

/**
 * DELETE /api/v1/tasks/:id
 * Delete a task (only owner)
 */
export const deleteTask = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;

  const task = await Task.findById(id);
  try {
    assertOwnership(task, userId);
  } catch (e) {
    return next(e);
  }

  await Task.deleteOne({ _id: id });
  res.status(204).send(); // no content
});
