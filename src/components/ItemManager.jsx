import React, { useState, useEffect } from "react";
import "./ItemManager.css";

function ItemManager() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  const handleAddItem = () => {
    if (!name || !price || parseFloat(price) <= 0) return;

    const newItem = { name, price: parseFloat(price) };
    const updated = [...items, newItem];
    setItems(updated);
    localStorage.setItem("items", JSON.stringify(updated));
    setName("");
    setPrice("");
  };

  const handleDelete = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
    localStorage.setItem("items", JSON.stringify(updated));
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditName(items[index].name);
    setEditPrice(items[index].price);
  };

  const saveEdit = (index) => {
    if (!editName || !editPrice || parseFloat(editPrice) <= 0) return;

    const updated = [...items];
    updated[index] = { name: editName, price: parseFloat(editPrice) };
    setItems(updated);
    localStorage.setItem("items", JSON.stringify(updated));
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditName("");
    setEditPrice("");
  };

  return (
    <div className="item-manager">
      <h2>Manage Menu Items</h2>
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price ₹"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleAddItem}>Add Item</button>

      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            {editingIndex === idx ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                />
                <button onClick={() => saveEdit(idx)}>✅</button>
                <button onClick={cancelEdit}>❌</button>
              </>
            ) : (
              <>
                {item.name} — ₹{item.price.toFixed(2)}
                <button onClick={() => startEdit(idx)}>✏️</button>
                <button onClick={() => handleDelete(idx)}>🗑️</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemManager;
