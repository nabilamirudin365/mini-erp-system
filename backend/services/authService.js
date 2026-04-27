import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (email, password, role_id) => {
  if (!email || !password) {
    throw new Error("Email dan password wajib diisi");
  }

  const stringPassword = String(password);
  const hash = await bcrypt.hash(stringPassword, 10);

  const user = await prisma.users.create({
    data: {
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

  if (!user) {
    throw new Error("User tidak ada");
  }

  const valid = await bcrypt.compare(String(password), user.password);
  if (!valid) {
    throw new Error("Password salah");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role?.name || 'user' },
    process.env.JWT_SECRET
  );

  return { token, user };
};
