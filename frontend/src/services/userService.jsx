import api from "../utils/api";

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (err) {
    console.error("Error mengambil users:", err);
    throw err;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (err) {
    console.error("Error mengambil detail user:", err);
    throw err;
  }
};

export const createUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};
