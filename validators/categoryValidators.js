import { body } from 'express-validator';

export const categoryValidators = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Tên danh mục là bắt buộc.')
    .isLength({ max: 80 })
    .withMessage('Tên danh mục không vượt quá 80 ký tự.'),
  body('description')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 300 })
    .withMessage('Mô tả không vượt quá 300 ký tự.'),
  body('icon')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 32 })
    .withMessage('Tên icon không vượt quá 32 ký tự.'),
  body('sortOrder')
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage('Thứ tự phải là số nguyên.')
];
