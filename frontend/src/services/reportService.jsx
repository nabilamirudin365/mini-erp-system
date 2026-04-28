import api from "../utils/api";

export const getSalesTrend = async (days = 7) => {
  const response = await api.get(`/reports/sales-trend?days=${days}`);
  return response.data;
};

export const getTopProducts = async (limit = 5) => {
  const response = await api.get(`/reports/top-products?limit=${limit}`);
  return response.data;
};
