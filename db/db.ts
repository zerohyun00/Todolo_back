import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/first_project';

export async function dbConnect(): Promise<void> {
  try {
    console.log('DB URL:', DB_URL);
    await mongoose.connect(DB_URL, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
