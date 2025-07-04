// src/components/ItemManager.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./ItemManager.css";

function ItemManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get("/items");
    setItems(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/items", form);
    setForm({ name: "", price: "" });
    fetchItems();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/items/${id}`);
    fetchItems();
  };

  const handleEdit = async (id) => {
    const item = items.find((i) => i._id === id);
    setForm({ ...item });
  };

  const handleUpdate = async () => {
    await axios.put(`/items/${form._id}`, form);
    setForm({ name: "", price: "" });
    fetchItems();
  };

  return (
    <div className="item-manager">
      <h2>🍜 Item Manager</h2>
      <form onSubmit={form._id ? handleUpdate : handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <button type="submit">{form._id ? "Update" : "Add"}</button>
      </form>

      <div className="item-list">
        {items.map((item) => (
          <div key={item._id} className="item">
            <span>{item.name} - ₹{item.price}</span>
            <div>
              <button onClick={() => handleEdit(item._id)}>✏️</button>
              <button onClick={() => handleDelete(item._id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemManager;
