import { prisma } from "../config/db.js";

export const getAllUsers = async () => {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      email: true,
      role_id: true,
      created_at: true,
      role: {
        select: {
          name: true
        }
      }
    }
  });
  return users;
};

export const getUserById = async (id) => {
  const userId = parseInt(id);
  if (isNaN(userId)) {
    // Kita melempar error agar ditangkap oleh controller
    throw new Error("ID tidak valid");
  }

  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role_id: true,
      created_at: true,
      role: {
        select: { name: true }
      }
    }
  });

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  return user;
};

import bcrypt from "bcrypt";

export const updateUser = async (id, data) => {
  const userId = parseInt(id);
  if (isNaN(userId)) throw new Error("ID tidak valid");

  const { email, password, role_id } = data;
  
  const updateData = {};
  if (email) updateData.email = email;
  if (role_id) updateData.role_id = parseInt(role_id);
  
  // Jika admin menginputkan password baru, hash terlebih dahulu
  if (password) {
    updateData.password = await bcrypt.hash(String(password), 10);
  }

  const user = await prisma.users.update({
    where: { id: userId },
    data: updateData,
    select: { id: true, email: true, role_id: true, created_at: true, role: { select: { name: true } } }
  });

  return user;
};

export const deleteUser = async (id) => {
  const userId = parseInt(id);
  if (isNaN(userId)) throw new Error("ID tidak valid");

  await prisma.users.delete({
    where: { id: userId }
  });
};
