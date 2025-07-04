// src/api/saleApi.js
import axios from "axios";
import { API_URL } from "../config";

export const recordSales = async (sales) => {
  const res = await axios.post(`${API_URL}/sales`, { sales });
  return res.data;
};

export const getSales = async () => {
  const res = await axios.get(`${API_URL}/sales`);
  return res.data;
};
