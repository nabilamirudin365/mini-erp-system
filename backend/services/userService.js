import { prisma } from "../config/db.js";

export const getAllUsers = async () => {
  const users = await prisma.users.findMany({
    where: { is_deleted: false },
    select: {
      id: true,
      username: true,
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

  const user = await prisma.users.findFirst({
    where: { id: userId, is_deleted: false },
    select: {
      id: true,
      username: true,
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

  const { username, email, password, role_id } = data;
  
  const updateData = {};
  if (username !== undefined) updateData.username = username || null;
  if (email) updateData.email = email;
  if (role_id) updateData.role_id = parseInt(role_id);
  
  // Jika admin menginputkan password baru, hash terlebih dahulu
  if (password) {
    updateData.password = await bcrypt.hash(String(password), 10);
  }

  const user = await prisma.users.update({
    where: { id: userId },
    data: updateData,
    select: { id: true, username: true, email: true, role_id: true, created_at: true, role: { select: { name: true } } }
  });

  return user;
};

export const deleteUser = async (id) => {
  const userId = parseInt(id);
  if (isNaN(userId)) throw new Error("ID tidak valid");

  await prisma.users.update({
    where: { id: userId },
    data: { is_deleted: true }
  });
};
