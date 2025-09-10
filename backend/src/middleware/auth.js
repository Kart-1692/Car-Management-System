import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { findById } from '../models/User.js';
dotenv.config();

export const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) token = authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findById(decoded.id);
    if (!user) throw new Error('User not found');
    req.user = user; // { user_id, username, role }
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};