import { validationResult } from 'express-validator';

export function collectValidationErrors(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    req.validationErrors = result.array().reduce((acc, error) => {
      acc[error.path] = error.msg;
      return acc;
    }, {});
  }
  next();
}
