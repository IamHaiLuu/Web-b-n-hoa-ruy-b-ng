import app from '../app.js';
import { connectDB } from '../src/config/db.js';

let dbConnectionPromise;

async function ensureDatabase() {
  if (!dbConnectionPromise) {
    dbConnectionPromise = connectDB().catch((error) => {
      dbConnectionPromise = null;
      throw error;
    });
  }

  return dbConnectionPromise;
}

export default async function handler(req, res) {
  await ensureDatabase();
  return app(req, res);
}
