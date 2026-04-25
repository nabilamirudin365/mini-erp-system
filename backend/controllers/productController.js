import { pool } from "../config/db.js";

export const getProducts = async (req, res) => {
  const result = await pool.query("SELECT * FROM products");
  res.json(result.rows);
};

export const createProduct = async (req, res) => {
  const { name, price, stock, category_id } = req.body;

  await pool.query(
    "INSERT INTO products (name, price, stock, category_id) VALUES ($1,$2,$3,$4)",
    [name, price, stock, category_id]
  );

  res.json({ message: "Product dibuat" });
};