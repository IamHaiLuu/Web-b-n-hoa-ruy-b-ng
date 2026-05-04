import { Router } from 'express';
import { index, update } from '../controllers/adminSettingsController.js';
import { uploadSettingsImages } from '../middleware/uploadMiddleware.js';
import { collectValidationErrors } from '../middleware/validationMiddleware.js';
import { settingsValidators } from '../validators/settingsValidators.js';

const router = Router();

router.get('/', index);
router.post('/', uploadSettingsImages, settingsValidators, collectValidationErrors, update);

export default router;
