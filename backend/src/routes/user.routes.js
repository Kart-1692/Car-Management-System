import express from 'express';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';
import { getAllCustomers, deleteUser } from '../models/User.js';

const router = express.Router();

router.use(protect);
router.use(authorize('Admin'));

router.get('/', async (req, res, next) => {
  try {
    const customers = await getAllCustomers();
    res.json(customers);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteUser(req.params.id);
    res.json({ message: 'User removed' });
  } catch (err) {
    next(err);
  }
});

export default router;
