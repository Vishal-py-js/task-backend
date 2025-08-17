// Server entrypoint: connect to DB and start listening.


import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(env.port, () => {
      console.log(`🚀 Server listening on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
};

start();
