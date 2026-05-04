import mongoose from 'mongoose';

let listenersRegistered = false;

function maskMongoUri(uri) {
  try {
    const parsed = new URL(uri);
    if (parsed.username || parsed.password) {
      parsed.username = '***';
      parsed.password = '***';
    }
    return parsed.toString();
  } catch {
    return uri.replace(/\/\/([^:@/]+):([^@/]+)@/, '//***:***@');
  }
}

function registerConnectionLogs() {
  if (listenersRegistered) {
    return;
  }

  mongoose.connection.on('connected', () => {
    console.log('[database] MongoDB connection event: connected');
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('[database] MongoDB connection event: disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('[database] MongoDB connection event: reconnected');
  });

  mongoose.connection.on('error', (error) => {
    console.error('[database] MongoDB connection event: error:', error.message);
  });

  listenersRegistered = true;
}

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/menu_hoa';

  mongoose.set('strictQuery', true);
  registerConnectionLogs();

  console.log(`[database] Connecting to MongoDB: ${maskMongoUri(uri)}`);

  try {
    const connection = await mongoose.connect(uri);
    const { host, name, readyState } = connection.connection;
    console.log(
      `[database] MongoDB connected successfully. host=${host} database=${name} readyState=${readyState}`
    );
    return connection;
  } catch (error) {
    console.error(`[database] MongoDB connection failed: ${error.message}`);
    throw error;
  }
}

export async function disconnectDB() {
  await mongoose.disconnect();
  console.log('[database] MongoDB disconnected by app');
}
