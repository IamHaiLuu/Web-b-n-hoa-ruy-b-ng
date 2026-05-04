import { Router } from 'express';
import { contact, flowerDetail, flowersAlias, home } from '../controllers/publicController.js';

const router = Router();

router.get('/', home);
router.get('/flowers', flowersAlias);
router.get('/flowers/:slug', flowerDetail);
router.get('/contact', contact);

export default router;
