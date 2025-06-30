// src/components/PurchaseEntry.jsx
import React, { useState, useEffect } from "react";
import "./PurchaseEntry.css";

function PurchaseEntry() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  const handlePurchase = () => {
    if (!selectedItem || !quantity || parseInt(quantity) <= 0) return;

    const updatedItems = [...items];
    const itemIndex = updatedItems.findIndex((item) => item.name === selectedItem);

    if (itemIndex === -1) return;

    const item = updatedItems[itemIndex];

    if (item.quantity < parseInt(quantity)) {
      alert("Not enough quantity in stock.");
      return;
    }

    // Deduct quantity
    item.quantity -= parseInt(quantity);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setItems(updatedItems);

    // Record the sale
    const newSale = {
      itemName: item.name,
      quantity: parseInt(quantity),
      total: item.price * parseInt(quantity),
      date: new Date().toISOString().split("T")[0],
      timestamp: new Date().toISOString(),
    };

    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    sales.push(newSale);
    localStorage.setItem("sales", JSON.stringify(sales));

    // Reset form
    setSelectedItem("");
    setQuantity("");
  };

  return (
    <div className="purchase-entry">
      <h2>Record Customer Purchase</h2>
      <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
        <option value="">Select an item</option>
        {items.map((item, idx) => (
          <option key={idx} value={item.name}>
            {item.name} (In stock: {item.quantity})
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handlePurchase}>Submit Purchase</button>
    </div>
  );
}

export default PurchaseEntry;
