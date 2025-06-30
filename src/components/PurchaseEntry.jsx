import React, { useState, useEffect } from "react";
import "./PurchaseEntry.css";

function PurchaseEntry() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaseList, setPurchaseList] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  const handleAddItem = () => {
    if (!selectedItem || !quantity || parseInt(quantity) <= 0) return;

    const item = items.find((i) => i.name === selectedItem);
    const already = purchaseList.find((p) => p.itemName === selectedItem);

    if (!item) return;

    if (already) {
      already.quantity += parseInt(quantity);
      already.total += item.price * parseInt(quantity);
      setPurchaseList([...purchaseList]);
    } else {
      setPurchaseList([
        ...purchaseList,
        {
          itemName: item.name,
          quantity: parseInt(quantity),
          total: item.price * parseInt(quantity),
        },
      ]);
    }

    setSelectedItem("");
    setQuantity("");
  };

  const handleRemove = (idx) => {
    const updated = [...purchaseList];
    updated.splice(idx, 1);
    setPurchaseList(updated);
  };

  const handleSubmitPurchase = () => {
    if (purchaseList.length === 0) return;

    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const today = new Date().toISOString().split("T")[0];

    sales.push({
      date: today,
      timestamp: new Date().toISOString(),
      items: purchaseList,
    });

    localStorage.setItem("sales", JSON.stringify(sales));
    setPurchaseList([]);
  };

  return (
    <div className="purchase-entry">
      <h2>Record Customer Purchase</h2>
      <div className="purchase-form">
        <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
          <option value="">Select item</option>
          {items.map((item, idx) => (
            <option key={idx} value={item.name}>
              {item.name} — ₹{item.price}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Qty"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={handleAddItem}>Add</button>
      </div>

      {purchaseList.length > 0 && (
        <div className="purchase-list">
          <h3>Purchase List</h3>
          <ul>
            {purchaseList.map((entry, idx) => (
              <li key={idx}>
                {entry.itemName} — Qty: {entry.quantity} — ₹{entry.total.toFixed(2)}
                <button onClick={() => handleRemove(idx)}>❌</button>
              </li>
            ))}
          </ul>
          <button onClick={handleSubmitPurchase}>Submit Purchase</button>
        </div>
      )}
    </div>
  );
}

export default PurchaseEntry;
