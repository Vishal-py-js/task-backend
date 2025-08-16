// Small seed script to create a demo user and a few tasks for quick testing.
// Run with: npm run seed

import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { Task } from '../models/Task.js';

const run = async () => {
  try {
    await connectDB(env.mongoUri);

    // Remove existing demo user tasks if any
    await Task.deleteMany({});
    await User.deleteMany({ email: 'demo@example.com' });

    const user = await User.create({ name: 'Demo User', email: 'demo@example.com', password: 'password123' });

    const tasks = [
      { user: user._id, title: 'Welcome to Task Manager', description: 'This is a seeded task', status: 'todo' },
      { user: user._id, title: 'Finish README', description: 'Document the project', status: 'in-progress' },
      { user: user._id, title: 'Deploy app', description: 'Deploy to production', status: 'todo' }
    ];

    await Task.insertMany(tasks);

    console.log('Seed complete. Demo user: demo@example.com / password123');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
