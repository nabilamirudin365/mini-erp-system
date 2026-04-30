import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const registerUser = async (username, email, password, role_id) => {
  if (!email || !password) {
    throw new Error("Email dan password wajib diisi");
  }

  const stringPassword = String(password);
  const hash = await bcrypt.hash(stringPassword, 10);

  const user = await prisma.users.create({
    data: {
      username: username || null,
      email,
      password: hash,
      role_id: role_id || 2,
    },
  });

  return user;
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email dan password wajib diisi");
  }

  const user = await prisma.users.findUnique({
    where: { email },
    include: {
      role: true,
    },
  });

  if (!user || user.is_deleted) {
    throw new Error("User tidak ada atau akun telah dinonaktifkan");
  }

  const valid = await bcrypt.compare(String(password), user.password);
  if (!valid) {
    throw new Error("Password salah");
  }

  // Buat session token unik untuk sesi ini
  const sessionToken = crypto.randomUUID();

  // Simpan session token ke database (menimpa sesi lama = "tendang" perangkat lama)
  await prisma.users.update({
    where: { id: user.id },
    data: { session_token: sessionToken },
  });

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role?.name || 'user',
      sessionToken, // Sematkan session token di dalam JWT
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, user };
};

// Hapus session token saat logout agar akun "bebas" kembali
export const logoutUser = async (userId) => {
  await prisma.users.update({
    where: { id: userId },
    data: { session_token: null },
  });
};
