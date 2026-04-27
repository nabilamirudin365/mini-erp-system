import * as dashboardService from "../services/dashboardService.js";

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await dashboardService.getStats();
    res.json(stats);
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Gagal mengambil statistik dashboard" });
  }
};
