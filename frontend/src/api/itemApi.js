// src/api/itemApi.js
import axios from "axios";
import { API_URL } from "../config";

export const getItems = async () => {
  const res = await axios.get(`${API_URL}/items`);
  return res.data;
};

export const addItem = async (item) => {
  const res = await axios.post(`${API_URL}/items`, item);
  return res.data;
};

export const updateItem = async (id, item) => {
  const res = await axios.put(`${API_URL}/items/${id}`, item);
  return res.data;
};

export const deleteItem = async (id) => {
  const res = await axios.delete(`${API_URL}/items/${id}`);
  return res.data;
};
