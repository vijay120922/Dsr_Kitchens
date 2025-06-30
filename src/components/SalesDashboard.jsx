// src/components/SalesDashboard.jsx
import React, { useEffect, useState } from "react";
import "./SalesDashboard.css";

function SalesDashboard() {
  const [report, setReport] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const today = new Date().toISOString().split("T")[0];

    const todaySales = sales.filter((sale) => sale.date === today);

    const grouped = {};

    todaySales.forEach((sale) => {
      if (!grouped[sale.itemName]) {
        grouped[sale.itemName] = { quantity: 0, total: 0 };
      }
      grouped[sale.itemName].quantity += sale.quantity;
      grouped[sale.itemName].total += sale.total;
    });

    const reportData = Object.entries(grouped).map(([name, data]) => ({
      name,
      quantity: data.quantity,
      revenue: data.total,
    }));

    setReport(reportData);
    setTotalRevenue(reportData.reduce((sum, item) => sum + item.revenue, 0));
  }, []);

  return (
    <div className="sales-dashboard">
      <h2>Today's Sales Summary</h2>
      {report.length === 0 ? (
        <p>No sales recorded today.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity Sold</th>
              <th>Revenue (₹)</th>
            </tr>
          </thead>
          <tbody>
            {report.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.revenue.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2"><strong>Total Revenue</strong></td>
              <td><strong>₹{totalRevenue.toFixed(2)}</strong></td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}

export default SalesDashboard;
