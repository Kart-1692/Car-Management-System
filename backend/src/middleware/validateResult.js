import { validationResult } from 'express-validator';

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extracted = errors.array().map((e) => ({ [e.param]: e.msg }));
    return res.status(422).json({ message: 'Validation failed', errors: extracted });
  }
  next();
};