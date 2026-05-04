import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

import publicRoutes from './src/routes/publicRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import adminFlowerRoutes from './src/routes/adminFlowerRoutes.js';
import adminCategoryRoutes from './src/routes/adminCategoryRoutes.js';
import adminSettingsRoutes from './src/routes/adminSettingsRoutes.js';

import { attachCurrentAdmin, requireAdmin } from './src/middleware/authMiddleware.js';
import { configureSecurity, sanitizeInput } from './src/middleware/securityMiddleware.js';
import { notFoundHandler, errorHandler } from './src/middleware/errorMiddleware.js';
import { flashMiddleware } from './src/middleware/flashMiddleware.js';

import { formatCurrency } from './src/utils/formatCurrency.js';
import { buildPageUrl } from './src/utils/pagination.js';

import { getPrimaryImageUrl, getZaloUrl, phoneUrl } from './src/services/imageService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

configureSecurity(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
sanitizeInput(app);
app.use(cookieParser());
app.use(methodOverride('_method'));
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

export default app;
