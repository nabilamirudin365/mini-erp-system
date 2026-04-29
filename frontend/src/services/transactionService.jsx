import api from "../utils/api";

export const getTransactions = async () => {
  const response = await api.get('/transactions');
  return response.data;
};
