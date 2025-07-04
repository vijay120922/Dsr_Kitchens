import React, { useState } from "react";
import "./AdminDashboard.css";

const categories = [
  { label: "Noodles", value: "noodles" },
  { label: "Fried Rice", value: "fried_rice" },
  { label: "Burgers", value: "burgers" },
  { label: "Beverages", value: "beverages" },
];

function AdminDashboard() {
  const [selected, setSelected] = useState([]);

  // Placeholder values for demonstration
  const totalOrders = 128;
  const totalAmount = 4520.75;

  const handleCheckbox = (value) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Selected categories: ${selected.join(", ")}`);
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="summary-cards">
        <div className="card">
          <div className="icon orders-icon" />
          <div>
            <div className="card-label">Total Orders</div>
            <div className="card-value">{totalOrders}</div>
          </div>
        </div>
        <div className="card">
          <div className="icon amount-icon" />
          <div>
            <div className="card-label">Total Earned</div>
            <div className="card-value">₹{totalAmount.toLocaleString()}</div>
          </div>
        </div>
      </div>
      <form className="category-form" onSubmit={handleSubmit}>
        <div className="category-checkboxes">
          {categories.map((cat) => (
            <label key={cat.value} className="checkbox-label">
              <input
                type="checkbox"
                checked={selected.includes(cat.value)}
                onChange={() => handleCheckbox(cat.value)}
              />
              {cat.label}
            </label>
          ))}
        </div>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AdminDashboard; 