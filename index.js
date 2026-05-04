import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';

import publicRoutes from './routes/publicRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import adminFlowerRoutes from './routes/adminFlowerRoutes.js';
import adminCategoryRoutes from './routes/adminCategoryRoutes.js';
import adminSettingsRoutes from './routes/adminSettingsRoutes.js';

import { attachCurrentAdmin, requireAdmin } from './middleware/authMiddleware.js';
import { configureSecurity, sanitizeInput } from './middleware/securityMiddleware.js';
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';
import { flashMiddleware } from './middleware/flashMiddleware.js';
import { ensureDatabaseConnected } from './middleware/databaseMiddleware.js';

import { formatCurrency } from './utils/formatCurrency.js';
import { buildPageUrl } from './utils/pagination.js';
import { getPrimaryImageUrl, getZaloUrl, phoneUrl } from './services/imageService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug');

configureSecurity(app);

app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
sanitizeInput(app);
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(ensureDatabaseConnected);
app.use(
  session({
    name: 'menuhoa.sid',
    secret: process.env.SESSION_SECRET || 'development_session_secret_change_me',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/menu_hoa',
      collectionName: 'sessions'
    }),
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 8
    }
  })
);
app.use(flashMiddleware);
app.use(attachCurrentAdmin);

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.info = req.flash('info');
  res.locals.formErrors = {};
  res.locals.errors = {};
  res.locals.old = {};
  res.locals.settings = null;
  res.locals.currentPath = req.path;
  res.locals.query = req.query;
  res.locals.formatCurrency = formatCurrency;
  res.locals.buildPageUrl = buildPageUrl;
  res.locals.getPrimaryImageUrl = getPrimaryImageUrl;
  res.locals.getZaloUrl = getZaloUrl;
  res.locals.phoneUrl = phoneUrl;
  next();
});

app.use('/', publicRoutes);
app.use('/admin', authRoutes);
app.use('/admin', requireAdmin, adminRoutes);
app.use('/admin/flowers', requireAdmin, adminFlowerRoutes);
app.use('/admin/categories', requireAdmin, adminCategoryRoutes);
app.use('/admin/settings', requireAdmin, adminSettingsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}

async function bootstrap() {
  const port = process.env.PORT || 3000;

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

const isDirectRun = process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url;

if (isDirectRun) {
  bootstrap();
}
