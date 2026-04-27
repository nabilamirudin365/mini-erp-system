import * as transactionService from "../services/transactionService.js";

export const createTransaction = async (req, res) => {
  try {
    const { items } = req.body; 

    // Controller bisa melakukan validasi struktur dasar
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Keranjang belanja kosong" });
    }

    // Panggil Service Layer untuk menangani proses database yang rumit
    const result = await transactionService.createNewTransaction(req.user.id, items);

    res.status(201).json({ message: "Transaksi berhasil", total: result.total });

  } catch (err) {
    console.error("Create Transaction Error:", err);
    
    // Tangkap error kustom (seperti stok habis) dan kembalikan 400
    if (err.message.includes("Stok produk tidak mencukupi")) {
      return res.status(400).json({ message: err.message });
    }

    res.status(500).json({ message: "Gagal transaksi: " + err.message });
  }
};