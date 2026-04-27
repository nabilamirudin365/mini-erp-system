import * as userService from "../services/userService.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ message: "Gagal mengambil data users" });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    
    res.json(user);
  } catch (error) {
    console.error("Get User By ID Error:", error);
    
    // Penanganan error dari service
    if (error.message === "User tidak ditemukan") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "ID tidak valid") {
      return res.status(400).json({ message: error.message });
    }
    
    res.status(500).json({ message: "Gagal mengambil data user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.updateUser(id, req.body);
    res.json(user);
  } catch (error) {
    console.error("Update User Error:", error);
    // Prisma error code P2025: Record to update not found
    if (error.code === 'P2025') {
       return res.status(404).json({ message: "User tidak ditemukan" });
    }
    res.status(400).json({ message: error.message || "Gagal update user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.json({ message: "User berhasil dihapus" });
  } catch (error) {
    console.error("Delete User Error:", error);
    if (error.code === 'P2025') {
       return res.status(404).json({ message: "User tidak ditemukan" });
    }
    res.status(400).json({ message: error.message || "Gagal menghapus user" });
  }
};