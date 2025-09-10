import express from 'express';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';
import {
  getAllBookings,
  getBookingsByCustomer,
  createBooking,
  updateBookingStatus,
  deleteBooking,
} from '../models/Booking.js';
import { bookingValidator } from '../validators/booking.validator.js';
import { validateResult } from '../middleware/validateResult.js';

const router = express.Router();
router.use(protect);

// ---- ADMIN ROUTES ----
router.get('/admin', authorize('Admin'), async (req, res, next) => {
  try {
    const bookings = await getAllBookings();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

router.put('/admin/:id/status', authorize('Admin'), async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['Booked', 'Delivered', 'Cancelled'].includes(status))
      return res.status(400).json({ message: 'Invalid status' });
    await updateBookingStatus(req.params.id, status);
    res.json({ message: 'Status updated' });
  } catch (err) {
    next(err);
  }
});

router.delete('/admin/:id', authorize('Admin'), async (req, res, next) => {
  try {
    await deleteBooking(req.params.id);
    res.json({ message: 'Booking removed' });
  } catch (err) {
    next(err);
  }
});

// ---- CUSTOMER ROUTES ----
router.get('/my', authorize('Customer'), async (req, res, next) => {
  try {
    const bookings = await getBookingsByCustomer(req.user.user_id);
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

router.post('/', authorize('Customer'), bookingValidator, validateResult, async (req, res, next) => {
  try {
    const { car_id, booking_date } = req.body;
    await createBooking({
      customer_id: req.user.user_id,
      car_id,
      booking_date,
    });
    res.status(201).json({ message: 'Booking created' });
  } catch (err) {
    next(err);
  }
});

export default router;
