import { prisma } from "../config/db.js";

export const getAllProducts = async () => {
  return await prisma.products.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      category_id: true,
      category: {
        select: { name: true }
      }
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

export const updateProduct = async (id, data) => {
  const productId = parseInt(id);
  if (isNaN(productId)) throw new Error("ID tidak valid");

  const { name, price, stock, category_id } = data;
  
  const updateData = {};
  if (name) updateData.name = name;
  if (price !== undefined && price !== "") updateData.price = parseInt(price);
  if (stock !== undefined && stock !== "") updateData.stock = parseInt(stock);
  if (category_id !== undefined) updateData.category_id = category_id ? parseInt(category_id) : null;

  const product = await prisma.products.update({
    where: { id: productId },
    data: updateData
  });

  return product;
};

export const deleteProduct = async (id) => {
  const productId = parseInt(id);
  if (isNaN(productId)) throw new Error("ID tidak valid");

  await prisma.products.delete({
    where: { id: productId }
  });
};
