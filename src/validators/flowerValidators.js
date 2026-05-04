import mongoose from 'mongoose';
import { body } from 'express-validator';

const validId = (value) => mongoose.Types.ObjectId.isValid(value);

export const flowerValidators = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Tên mẫu hoa là bắt buộc.')
    .isLength({ max: 120 })
    .withMessage('Tên mẫu hoa không vượt quá 120 ký tự.'),
  body('category')
    .notEmpty()
    .withMessage('Vui lòng chọn danh mục.')
    .custom(validId)
    .withMessage('Danh mục không hợp lệ.'),
  body('referencePrice')
    .notEmpty()
    .withMessage('Giá tham khảo là bắt buộc.')
    .isFloat({ min: 0 })
    .withMessage('Giá tham khảo phải là số không âm.'),
  body('shortDescription')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 160 })
    .withMessage('Mô tả ngắn không vượt quá 160 ký tự.'),
  body('availabilityStatus')
    .optional()
    .isIn(['available', 'out_of_stock'])
    .withMessage('Trạng thái hàng không hợp lệ.'),
  body('visibilityStatus')
    .optional()
    .isIn(['visible', 'hidden'])
    .withMessage('Trạng thái hiển thị không hợp lệ.')
];
