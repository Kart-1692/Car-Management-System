import { body } from 'express-validator';

export const registerValidator = [
  body('username')
    .trim()
    .isLength({ min: 4 })
    .withMessage('Username must be at least 4 characters'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['Admin', 'Customer'])
    .withMessage('Invalid role')
];

export const loginValidator = [
  body('username').exists().withMessage('Username required'),
  body('password').exists().withMessage('Password required')
];
