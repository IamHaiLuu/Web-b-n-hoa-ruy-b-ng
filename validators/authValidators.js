import { body } from 'express-validator';

export const loginValidators = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Vui lòng nhập email.')
    .isEmail()
    .withMessage('Email không hợp lệ.')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Vui lòng nhập mật khẩu.')
];
