import { body } from 'express-validator';

export const settingsValidators = [
  body('storeName')
    .trim()
    .notEmpty()
    .withMessage('Tên cửa hàng là bắt buộc.'),
  body('googleMapsUrl')
    .optional({ checkFalsy: true })
    .isURL({ require_protocol: true })
    .withMessage('Link Google Maps cần bắt đầu bằng http:// hoặc https://.'),
  body('description')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage('Mô tả cửa hàng không vượt quá 500 ký tự.')
];
