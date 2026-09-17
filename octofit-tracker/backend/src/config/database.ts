import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection;

export const connectDatabase = async (): Promise<typeof db> => {
  if (mongoose.connection.readyState === 1) {
    return db;
  }

  await mongoose.connect(connectionString);
  console.log('Connected to octofit_db');
  return db;
};

db.on('error', console.error.bind(console, 'connection error:'));

export default db;
