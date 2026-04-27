import { prisma } from "../config/db.js";

export const getAllProducts = async () => {
  return await prisma.products.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      category_id: true,
    }
  });
};

export const createNewProduct = async (data) => {
  const { name, price, stock, category_id } = data;
  
  if (!name || price == null) {
    throw new Error("Nama dan harga produk wajib diisi");
  }

  const product = await prisma.products.create({
    data: {
      name,
      price: parseInt(price),
      stock: parseInt(stock) || 0,
      category_id: category_id ? parseInt(category_id) : null
    }
  });

  return product;
};
