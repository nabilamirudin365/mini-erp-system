import api from "../utils/api";

export const getProducts = async (page = 1, limit = 10) => {
  const response = await api.get(`/products?page=${page}&limit=${limit}`);
  return response.data?.data || response.data;
};

export const createProduct = async (data) => {
  const response = await api.post('/products', data);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
