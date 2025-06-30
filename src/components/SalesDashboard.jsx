import React, { useEffect, useState } from "react";
import "./SalesDashboard.css";

function SalesDashboard() {
  const [report, setReport] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const today = new Date().toISOString().split("T")[0];
    const todaySales = sales.filter((s) => s.date === today);

    const summary = {};

    todaySales.forEach((purchase) => {
      // Handle both new (items array) and old (single entry) formats
      const items = Array.isArray(purchase.items)
        ? purchase.items
        : [purchase];

      items.forEach((entry) => {
        if (!entry?.itemName || !entry?.quantity || !entry?.total) return;

        if (!summary[entry.itemName]) {
          summary[entry.itemName] = { quantity: 0, revenue: 0 };
        }

        summary[entry.itemName].quantity += entry.quantity;
        summary[entry.itemName].revenue += entry.total;
      });
    });

    const data = Object.entries(summary).map(([name, stats]) => ({
      name,
      quantity: stats.quantity,
      revenue: stats.revenue,
    }));

    setReport(data);
    setTotalRevenue(data.reduce((sum, item) => sum + item.revenue, 0));
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
              <th>Qty Sold</th>
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
