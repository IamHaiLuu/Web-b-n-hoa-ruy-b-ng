import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { login, logout, showLogin } from '../controllers/authController.js';
import { redirectIfAuthenticated } from '../middleware/authMiddleware.js';
import { loginValidators } from '../validators/authValidators.js';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Bạn thử đăng nhập quá nhiều lần. Vui lòng thử lại sau.'
});

router.get('/login', redirectIfAuthenticated, showLogin);
router.post('/login', redirectIfAuthenticated, loginLimiter, loginValidators, login);
router.post('/logout', logout);

export default router;
