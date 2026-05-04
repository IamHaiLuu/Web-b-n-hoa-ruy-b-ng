import mongoose from 'mongoose';

mongoose.set('strictQuery', true);
mongoose.set('bufferCommands', false);

let listenersRegistered = false;
let connectionPromise = null;

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

  registerConnectionLogs();

  if (mongoose.connection.readyState === 1) {
    const { host, name, readyState } = mongoose.connection;
    console.log(
      `[database] MongoDB already connected. host=${host} database=${name} readyState=${readyState}`
    );
    return mongoose;
  }

  if (mongoose.connection.readyState === 2 && connectionPromise) {
    console.log('[database] MongoDB connection is already in progress');
    return connectionPromise;
  }

  console.log(`[database] Connecting to MongoDB: ${maskMongoUri(uri)}`);

  connectionPromise = mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10
    })
    .catch((error) => {
      connectionPromise = null;
      throw error;
    });

  try {
    const connection = await connectionPromise;
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
  connectionPromise = null;
  console.log('[database] MongoDB disconnected by app');
}
