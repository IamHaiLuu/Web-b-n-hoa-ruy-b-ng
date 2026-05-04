import { Router } from 'express';
import {
  create,
  edit,
  index,
  softDelete,
  toggleVisibility,
  update
} from '../controllers/adminCategoryController.js';
import { collectValidationErrors } from '../middleware/validationMiddleware.js';
import { categoryValidators } from '../validators/categoryValidators.js';

const router = Router();

router.get('/', index);
router.post('/', categoryValidators, collectValidationErrors, create);
router.get('/:id/edit', edit);
router.put('/:id', categoryValidators, collectValidationErrors, update);
router.post('/:id/toggle-visibility', toggleVisibility);
router.post('/:id/delete', softDelete);

export default router;
