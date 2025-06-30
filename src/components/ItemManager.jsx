// src/components/ItemManager.jsx
import React, { useState, useEffect } from "react";
import "./ItemManager.css";

function ItemManager({ onBack }) {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("items")) || [];
    setItems(stored);
  }, []);

  const handleAddItem = () => {
    if (!itemName || !price) return;

    const updatedItems = [...items];
    if (editIndex !== null) {
      updatedItems[editIndex] = { name: itemName, price: parseFloat(price) };
    } else {
      updatedItems.push({ name: itemName, price: parseFloat(price) });
    }

    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setItemName("");
    setPrice("");
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setItemName(items[index].name);
    setPrice(items[index].price);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    localStorage.setItem("items", JSON.stringify(updated));
  };

  return (
    <div className="item-manager">
      <button className="back-btn" onClick={onBack}>← Back</button>

      <div className="item-form">
        <h2>Add New Menu Item</h2>
        <input
          type="text"
          placeholder="Enter dish name..."
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={handleAddItem}>
          {editIndex !== null ? "Update Item" : "+ Add Item"}
        </button>
      </div>

      <div className="item-list">
        <h3>Menu Items</h3>
        {items.length === 0 && <p>No items found.</p>}
        {items.map((item, index) => (
          <div className="item-card" key={index}>
            <div className="item-info">
              <div className="item-name">{item.name}</div>
              <div className="item-price">${item.price.toFixed(2)}</div>
            </div>
            <div className="item-actions">
              <button onClick={() => handleEdit(index)}>✏️</button>
              <button onClick={() => handleDelete(index)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemManager;
