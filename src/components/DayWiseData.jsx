// src/components/DayWiseData.jsx
import React, { useEffect, useState } from "react";
import "./DayWiseData.css";

function DayWiseData({ onBack }) {
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    const sales = JSON.parse(localStorage.getItem("sales")) || [];

    const grouped = {};

    sales.forEach((sale) => {
      const date = sale.date;
      if (!grouped[date]) {
        grouped[date] = {};
      }

      if (!grouped[date][sale.itemName]) {
        grouped[date][sale.itemName] = {
          quantity: 0,
          revenue: 0,
        };
      }

      grouped[date][sale.itemName].quantity += sale.quantity;
      grouped[date][sale.itemName].revenue += sale.total;
    });

    setGroupedData(grouped);
  }, []);

  return (
    <div className="daywise-data">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h2>📆 Day-wise Sales Report</h2>

      {Object.keys(groupedData).length === 0 ? (
        <p className="empty-msg">No sales data available.</p>
      ) : (
        Object.entries(groupedData).map(([date, items], idx) => {
          const totalRevenue = Object.values(items).reduce(
            (sum, item) => sum + item.revenue,
            0
          );

          return (
            <div className="day-block" key={idx}>
              <h3>{date}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity Sold</th>
                    <th>Revenue ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(items).map(([name, data], i) => (
                    <tr key={i}>
                      <td>{name}</td>
                      <td>{data.quantity}</td>
                      <td>${data.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td colSpan="2"><strong>Total Revenue</strong></td>
                    <td><strong>${totalRevenue.toFixed(2)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })
      )}
    </div>
  );
}

export default DayWiseData;
