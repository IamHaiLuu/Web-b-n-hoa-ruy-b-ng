import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { connectDB, disconnectDB } from '../config/db.js';
import Admin from '../models/Admin.js';

dotenv.config();

async function seedAdmin() {
  await connectDB();

  const email = (process.env.ADMIN_SEED_EMAIL || 'BanHoa@gmail.com').toLowerCase();
  const password = process.env.ADMIN_SEED_PASSWORD || '1234567890';
  const passwordHash = await bcrypt.hash(password, 12);

  await Admin.findOneAndUpdate(
    { email },
    {
      email,
      passwordHash,
      name: 'Admin',
      role: 'owner',
      isActive: true
    },
    { upsert: true, new: true }
  );

  console.log(`Admin seed ready: ${email}`);
  await disconnectDB();
}

seedAdmin().catch(async (error) => {
  console.error(error);
  await disconnectDB();
  process.exit(1);
});
