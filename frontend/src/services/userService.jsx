import api from "../utils/api";

export const getUsers = async () => {
  try {
    // Axios otomatis akan mengambil baseURL (http://localhost:5000) dari utils/api.js
    const response = await api.get('/users');
    // Axios secara otomatis mengubah JSON response menjadi object JS di dalam properti `.data`
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
