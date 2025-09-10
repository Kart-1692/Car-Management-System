import express from 'express';
import bcrypt from 'bcryptjs';
import { registerValidator, loginValidator } from '../validators/auth.validator.js';
import { validateResult } from '../middleware/validateResult.js';
import { findByUsername, createUser } from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

const router = express.Router();

// REGISTER
router.post('/register', registerValidator, validateResult, async (req, res, next) => {
  try {
    const { username, password, role = 'Customer' } = req.body;
    const existing = await findByUsername(username);
    if (existing) return res.status(409).json({ message: 'Username already taken' });

    const hashed = await bcrypt.hash(password, 12);
    const user = await createUser({ username, password: hashed, role });
    const token = generateToken({ id: user.user_id, role: user.role });

    res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
});

// LOGIN
router.post('/login', loginValidator, validateResult, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await findByUsername(username);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken({ id: user.user_id, role: user.role });
    const safeUser = { user_id: user.user_id, username: user.username, role: user.role };
    res.json({ token, user: safeUser });
  } catch (err) {
    next(err);
  }
});

export default router;
