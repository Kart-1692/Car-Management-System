import pool from '../config/db.js';

export const getAllBookings = async () => {
  const [rows] = await pool.query(`
    SELECT b.*, u.username AS customer_name, c.name AS car_name, c.model
    FROM bookings b
    JOIN users u ON b.customer_id = u.user_id
    JOIN cars c ON b.car_id = c.car_id
    ORDER BY b.created_at DESC
  `);
  return rows;
};

export const getBookingsByCustomer = async (customerId) => {
  const [rows] = await pool.execute(
    `SELECT b.*, c.name AS car_name, c.model
     FROM bookings b
     JOIN cars c ON b.car_id = c.car_id
     WHERE b.customer_id = ?
     ORDER BY b.created_at DESC`,
    [customerId]
  );
  return rows;
};

export const createBooking = async ({ customer_id, car_id, booking_date }) => {
  const [result] = await pool.execute(
    `INSERT INTO bookings (customer_id, car_id, booking_date) VALUES (?,?,?)`,
    [customer_id, car_id, booking_date]
  );
  return { booking_id: result.insertId };
};

export const updateBookingStatus = async (id, status) => {
  await pool.execute('UPDATE bookings SET status = ? WHERE booking_id = ?', [status, id]);
};

export const deleteBooking = async (id) => {
  await pool.execute('DELETE FROM bookings WHERE booking_id = ?', [id]);
};
