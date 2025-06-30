// src/components/SalesDashboard.jsx
import React, { useEffect, useState } from "react";
import "./SalesDashboard.css";

function SalesDashboard({ onBack }) {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const allSales = JSON.parse(localStorage.getItem("sales")) || [];
    const today = new Date().toISOString().split("T")[0];

    const todaySales = allSales.filter((sale) => sale.date === today);
    setSalesData(todaySales);
  }, []);

  const itemStats = {};

  salesData.forEach((sale) => {
    if (!itemStats[sale.itemName]) {
      itemStats[sale.itemName] = {
        quantity: 0,
        price: sale.price,
        revenue: 0,
      };
    }
    itemStats[sale.itemName].quantity += sale.quantity;
    itemStats[sale.itemName].revenue += sale.total;
  });

  const totalRevenue = salesData.reduce((sum, s) => sum + s.total, 0);
  const totalItemsSold = salesData.reduce((sum, s) => sum + s.quantity, 0);

  return (
    <div className="dashboard">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h2>Daily Sales Summary</h2>

      <div className="dashboard-summary">
        <div className="summary-box">
          <p>Total Items Sold</p>
          <h3>{totalItemsSold}</h3>
        </div>
        <div className="summary-box">
          <p>Total Revenue</p>
          <h3>${totalRevenue.toFixed(2)}</h3>
        </div>
      </div>

      <div className="sales-breakdown">
        <h3>Item Sales Breakdown</h3>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity Sold</th>
              <th>Unit Price</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(itemStats).map(([name, data], index) => (
              <tr key={index}>
                <td>{name}</td>
                <td>{data.quantity}</td>
                <td>${data.price.toFixed(2)}</td>
                <td>${data.revenue.toFixed(2)}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="3"><strong>Total Revenue:</strong></td>
              <td><strong>${totalRevenue.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesDashboard;
