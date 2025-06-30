// src/components/ItemManager.jsx
import React, { useState, useEffect } from "react";
import "./ItemManager.css";

function ItemManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", price: "", index: -1 });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("items"));
    setItems(stored);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = [...items];
    const newItem = {
      name: form.name,
      quantity: parseInt(form.quantity),
      price: parseFloat(form.price),
    };

    if (form.index === -1) {
      updated.push(newItem);
    } else {
      updated[form.index] = newItem;
    }

    localStorage.setItem("items", JSON.stringify(updated));
    setItems(updated);
    setForm({ name: "", quantity: "", price: "", index: -1 });
  };

  const handleEdit = (idx) => {
    const item = items[idx];
    setForm({ ...item, index: idx });
  };

  const handleDelete = (idx) => {
    const updated = [...items];
    updated.splice(idx, 1);
    localStorage.setItem("items", JSON.stringify(updated));
    setItems(updated);
  };

  return (
    <div className="item-manager">
      <h2>Manage Menu Items</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Item Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="number" placeholder="Quantity" required value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        <input type="number" placeholder="Price" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <button type="submit">{form.index === -1 ? "Add Item" : "Update Item"}</button>
      </form>

      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            {item.name} - Qty: {item.quantity} - ₹{item.price}
            <button onClick={() => handleEdit(idx)}>Edit</button>
            <button onClick={() => handleDelete(idx)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemManager;
