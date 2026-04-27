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
