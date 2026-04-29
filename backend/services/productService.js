import { prisma } from "../config/db.js";

export const getAllProducts = async (page = 1, limit = 100) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.products.findMany({
      where: { is_deleted: false },
      skip,
      take: limit,
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
    }),
    prisma.products.count({
      where: { is_deleted: false }
    })
  ]);

  return {
    items: data, // Return objects inside items
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
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

  await prisma.products.update({
    where: { id: productId },
    data: { is_deleted: true }
  });
};
