const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "rahasia_kamu";
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// koneksi database
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,     
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT,
});

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Token tidak ada" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token tidak valid" });
  }
};

app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Akses berhasil",
    user: req.user,
  });
});

// test route
app.get("/", (req, res) => {
  res.send("Backend jalan dengan Express dan PostgreSQL");
});

// 🔥 REGISTER API


app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // cek email sudah ada
    const check = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // simpan ke DB
    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hashedPassword]
    );

    res.json({ message: "Register berhasil" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔥 LOGIN API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User tidak ditemukan" });
    }

    const user = result.rows[0];

    // compare password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Password salah" });
    }

    // 🔥 buat token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login berhasil",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// jalankan server
app.listen(5000, () => {
  console.log("Server jalan di http://localhost:5000");
});