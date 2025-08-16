// Mongoose connection helper.
// Call connectDB(env.mongoUri) from server start script.

import mongoose from 'mongoose';

export const connectDB = async (uri) => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {
    // Use defaults; Mongoose 6+ cleans up many options
  });
  console.log('✅ MongoDB connected');
};
