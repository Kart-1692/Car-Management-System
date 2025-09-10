import express from 'express';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';
import {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from '../models/Car.js';
import { carValidator } from '../validators/car.validator.js';
import { validateResult } from '../middleware/validateResult.js';

const router = express.Router();

// PUBLIC – list & view cars
router.get('/', async (req, res, next) => {
  try {
    const cars = await getAllCars();
    res.json(cars);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const car = await getCarById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    next(err);
  }
});

// ADMIN routes – protected
router.use(protect);
router.use(authorize('Admin'));

router.post('/', carValidator, validateResult, async (req, res, next) => {
  try {
    const car = await createCar(req.body);
    res.status(201).json(car);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', carValidator, validateResult, async (req, res, next) => {
  try {
    await updateCar(req.params.id, req.body);
    res.json({ message: 'Car updated' });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteCar(req.params.id);
    res.json({ message: 'Car removed' });
  } catch (err) {
    next(err);
  }
});

export default router;
