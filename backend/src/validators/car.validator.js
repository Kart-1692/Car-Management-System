import { body } from 'express-validator';

export const carValidator = [
  body('name').notEmpty().withMessage('Name required'),
  body('model').notEmpty(),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be >0'),
  body('color').notEmpty(),
  body('fuel')
    .isIn(['Petrol', 'Diesel', 'Electric', 'Hybrid'])
    .withMessage('Invalid fuel type'),
  body('transmission')
    .isIn(['Manual', 'Automatic'])
    .withMessage('Invalid transmission'),
  body('availability')
    .isInt({ min: 0 })
    .withMessage('Availability must be a non‑negative integer')
];
