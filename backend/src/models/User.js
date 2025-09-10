import pool from '../config/db.js';

export const findByUsername = async (username) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows;
};

export const findById = async (id) => {
  const [rows] = await pool.execute(
    'SELECT user_id, username, role, created_at FROM users WHERE user_id = ?',
    [id]
  );
  return rows;
};

export const createUser = async ({ username, password, role }) => {
  const [result] = await pool.execute(
    'INSERT INTO users (username, password, role) VALUES (?,?,?)',
    [username, password, role]
  );
  return { user_id: result.insertId, username, role };
};

export const getAllCustomers = async () => {
  const [rows] = await pool.execute(
    "SELECT user_id, username, role, created_at FROM users WHERE role='Customer'"
  );
  return rows;
};

export const deleteUser = async (id) => {
  await pool.execute('DELETE FROM users WHERE user_id = ?', [id]);
};
