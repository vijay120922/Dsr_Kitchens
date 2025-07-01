import React, { useState, useEffect } from "react";
import "./PurchaseEntry.css";

function PurchaseEntry({ onBack }) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [purchaseList, setPurchaseList] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  const addToPurchaseList = () => {
    const item = items.find((i) => i.name === selectedItem);
    if (!item || quantity <= 0) return;

    const exists = purchaseList.find((p) => p.name === selectedItem);
    if (exists) {
      const updated = purchaseList.map((p) =>
        p.name === selectedItem
          ? { ...p, quantity: p.quantity + quantity, total: (p.quantity + quantity) * p.price }
          : p
      );
      setPurchaseList(updated);
    } else {
      const entry = {
        name: selectedItem,
        price: item.price,
        quantity,
        total: item.price * quantity,
      };
      setPurchaseList([...purchaseList, entry]);
    }

    setSelectedItem("");
    setQuantity(1);
  };

  const removeFromPurchaseList = (name) => {
    setPurchaseList(purchaseList.filter((p) => p.name !== name));
  };

  const handleSubmit = () => {
    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const timestamp = new Date().toISOString();
    const date = new Date().toISOString().slice(0, 10);  // Only Date for filtering

    const newSales = purchaseList.map((entry) => ({
      itemName: entry.name,
      price: entry.price,
      quantity: entry.quantity,
      total: entry.total,
      timestamp: timestamp,  // Full Date & Time
      date: date             // Only Date (YYYY-MM-DD) for Sales Dashboard
    }));

    const updatedSales = [...sales, ...newSales];
    localStorage.setItem("sales", JSON.stringify(updatedSales));

    setPurchaseList([]);
    alert("Purchase recorded successfully.");
  };

  const subtotal = purchaseList.reduce((sum, i) => sum + i.total, 0);

  const total = subtotal;

  return (
    <div className="purchase-entry">
      <button className="back-btn" onClick={onBack}>← Back</button>

      <div className="purchase-wrapper">
        <div className="purchase-form">
          <h2>Add Items to Purchase</h2>

          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
          >
            <option value="">Select Item</option>
            {items.map((item, i) => (
              <option key={i} value={item.name}>
                {item.name} - Rs.{item.price.toFixed(2)}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <button onClick={addToPurchaseList}>+ Add to Purchase List</button>
        </div>

        <div className="purchase-list">
          <h3>Purchase List</h3>
          {purchaseList.map((item, i) => (
            <div key={i} className="purchase-item">
              <span>{item.name}</span>
              <span>
                Quantity: {item.quantity} × Rs.{item.price.toFixed(2)}
              </span>
              <span>Rs.{item.total.toFixed(2)}</span>
              <button onClick={() => removeFromPurchaseList(item.name)}>🗑️</button>
            </div>
          ))}

          {purchaseList.length > 0 && (
            <div className="totals">
              <div className="total-amount">Total: Rs.{total.toFixed(2)}</div>
              <button onClick={handleSubmit} className="submit-btn">Submit Purchase</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PurchaseEntry;
