import { Router } from 'express';
import {
  bulk,
  create,
  deleteImage,
  editForm,
  index,
  newForm,
  show,
  softDelete,
  toggleFeatured,
  toggleVisibility,
  update
} from '../controllers/adminFlowerController.js';
import { uploadFlowerImages } from '../middleware/uploadMiddleware.js';
import { collectValidationErrors } from '../middleware/validationMiddleware.js';
import { flowerValidators } from '../validators/flowerValidators.js';

const router = Router();

router.get('/', index);
router.get('/new', newForm);
router.post('/', uploadFlowerImages, flowerValidators, collectValidationErrors, create);
router.post('/bulk', bulk);
router.get('/:id', show);
router.get('/:id/edit', editForm);
router.put('/:id', uploadFlowerImages, flowerValidators, collectValidationErrors, update);
router.post('/:id/toggle-visibility', toggleVisibility);
router.post('/:id/toggle-featured', toggleFeatured);
router.post('/:id/delete', softDelete);
router.post('/:id/images/:imageId/delete', deleteImage);

export default router;
