import { Router } from 'express';
import { dashboard } from '../controllers/adminDashboardController.js';

const router = Router();

router.get(['/', ''], dashboard);

export default router;
