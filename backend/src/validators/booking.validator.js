import { body } from 'express-validator';

export const bookingValidator = [
  body('car_id')
    .isInt({ gt: 0 })
    .withMessage('Car ID must be a positive integer'),
  body('booking_date')
    .isISO8601()
    .toDate()
    .withMessage('Invalid date')
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error('Booking date cannot be in the past');
      }
      return true;
    })
];
