import pool from '../config/db.js';

export const getAllCars = async () => {
  const [rows] = await pool.query('SELECT * FROM cars');
  return rows;
};

export const getCarById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM cars WHERE car_id = ?', [id]);
  return rows;
};

export const createCar = async (car) => {
  const { name, model, price, color, fuel, transmission, availability } = car;
  const [result] = await pool.execute(
    `INSERT INTO cars (name, model, price, color, fuel, transmission, availability)
     VALUES (?,?,?,?,?,?,?)`,
    [name, model, price, color, fuel, transmission, availability]
  );
  return { car_id: result.insertId, ...car };
};

export const updateCar = async (id, car) => {
  const fields = Object.keys(car).map((k) => `${k} = ?`).join(', ');
  const values = [...Object.values(car), id];
  await pool.execute(`UPDATE cars SET ${fields} WHERE car_id = ?`, values);
};

export const deleteCar = async (id) => {
  await pool.execute('DELETE FROM cars WHERE car_id = ?', [id]);
};
