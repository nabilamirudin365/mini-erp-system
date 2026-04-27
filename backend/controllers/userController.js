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