import * as authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const { email, password, role_id } = req.body;

    // Controller hanya meneruskan data ke Service (Tidak ada logika DB/Bcrypt disini)
    await authService.registerUser(email, password, role_id);

    // Controller murni mengurus respons (HTTP status dan JSON)
    res.status(201).json({ message: "Register berhasil" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(400).json({ message: error.message || "Terjadi kesalahan pada server saat register" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Panggil Service
    const result = await authService.loginUser(email, password);

    // Tanamkan token ke dalam HttpOnly Cookie (Brankas Browser)
    res.cookie("token", result.token, {
      httpOnly: true, // Tidak bisa dibaca oleh JavaScript
      secure: process.env.NODE_ENV === "production", // True jika HTTPS
      sameSite: "strict",
      maxAge: 60 * 60 * 1000 // 1 Jam (sesuai masa berlaku JWT)
    });

    // Kembalikan role ke user agar frontend tahu statusnya
    res.json({ 
      role: result.user.role?.name || 'user'
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(400).json({ message: error.message || "Terjadi kesalahan pada server saat login" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token"); // Hapus cookie
  res.json({ message: "Berhasil logout" });
};