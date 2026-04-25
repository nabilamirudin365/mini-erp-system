import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (email, password, role_id) VALUES ($1, $2, 2)",
    [email, hash]
  );

  res.json({ message: "Register berhasil" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT users.*, roles.name as role FROM users JOIN roles ON users.role_id = roles.id WHERE email=$1",
    [email]
  );

  const user = result.rows[0];

  if (!user) return res.status(400).json({ message: "User tidak ada" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Password salah" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({ token });
};