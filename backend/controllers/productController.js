import * as productService from "../services/productService.js";

export const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Gagal mengambil data produk" });
  }
};

export const createProduct = async (req, res) => {
  try {
    await productService.createNewProduct(req.body);
    res.status(201).json({ message: "Product dibuat" });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(400).json({ message: error.message || "Gagal membuat produk" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.updateProduct(id, req.body);
    res.json(product);
  } catch (error) {
    console.error("Update Product Error:", error);
    if (error.code === 'P2025') {
       return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.status(400).json({ message: error.message || "Gagal mengupdate produk" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    res.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    if (error.code === 'P2025') {
       return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    // Tangani error Foreign Key (jika produk sudah ada di transaksi)
    if (error.code === 'P2003') {
       return res.status(400).json({ message: "Produk tidak dapat dihapus karena sudah memiliki riwayat transaksi" });
    }
    res.status(400).json({ message: error.message || "Gagal menghapus produk" });
  }
};