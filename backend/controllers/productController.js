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