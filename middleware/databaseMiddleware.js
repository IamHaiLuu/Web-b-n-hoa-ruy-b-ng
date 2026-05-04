import { connectDB } from '../config/db.js';

export async function ensureDatabaseConnected(req, res, next) {
  try {
    await connectDB();
    next();
  } catch (error) {
    error.statusCode = 503;
    next(error);
  }
}
