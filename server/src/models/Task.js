// Task model; each Task belongs to a User via `user` ObjectId.
// Simple status enum and timestamps.

import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo',
      index: true
    },
    dueDate: { type: Date }
  },
  { timestamps: true }
);

export const Task = mongoose.model('Task', taskSchema);
