import { Router } from 'express';
import { login, logout, showLogin } from '../controllers/authController.js';
import { redirectIfAuthenticated } from '../middleware/authMiddleware.js';
import { loginValidators } from '../validators/authValidators.js';

const router = Router();

router.get('/login', redirectIfAuthenticated, showLogin);
router.post('/login', redirectIfAuthenticated, loginValidators, login);
router.post('/logout', logout);

export default router;
