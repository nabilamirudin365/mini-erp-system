import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password, role_id } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password wajib diisi" });
    }

    // Pastikan password berformat string (karena bcrypt butuh string murni)
    const stringPassword = String(password);
    const hash = await bcrypt.hash(stringPassword, 10);

    await pool.query(
      "INSERT INTO users (email, password, role_id) VALUES ($1, $2, $3)",
      [email, hash, role_id || 2]
    );

    res.json({ message: "Register berhasil" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message || "Terjadi kesalahan pada server saat register" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT users.*, roles.name as role FROM users LEFT JOIN roles ON users.role_id = roles.id WHERE email=$1",
      [email]
    );

    const user = result.rows[0];

    if (!user) return res.status(400).json({ message: "User tidak ada" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role || 'user' },
      process.env.JWT_SECRET
    );

    res.json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message || "Terjadi kesalahan pada server saat login" });
  }
};