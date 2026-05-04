import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './src/config/db.js';

dotenv.config();

const port = process.env.PORT || 3000;

async function bootstrap() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Menu Hoa is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start Menu Hoa:', error.message);
    process.exit(1);
  }
}

bootstrap();
