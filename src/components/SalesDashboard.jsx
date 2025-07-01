import React, { useEffect, useState } from "react";
import "./SalesDashboard.css";

function SalesDashboard({ setView }) {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const allSales = JSON.parse(localStorage.getItem("sales")) || [];
    const today = new Date().toISOString().slice(0, 10);
    const todaySales = allSales.filter((s) => s.date === today);

    const result = {};
    todaySales.forEach(({ itemName, quantity, price }) => {
      if (!result[itemName]) result[itemName] = { quantity: 0, revenue: 0 };
      result[itemName].quantity += quantity;
      result[itemName].revenue += price * quantity;
    });

    setSummary(result);
  }, []);

  const downloadCSV = () => {
    const rows = [["Item", "Quantity Sold", "Revenue (₹)"]];
    Object.entries(summary).forEach(([name, data]) => {
      rows.push([name, data.quantity, data.revenue.toFixed(2)]);
    });

    const csvContent =
      "data:text/csv;charset=utf-8," + rows.map((r) => r.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "today_sales.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalRevenue = Object.values(summary).reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  return (
    <div className="dashboard-container">
      <h2>📊 Today's Sales</h2>
      <button onClick={() => setView("")} className="back-btn">← Back</button>
      <button className="download-btn" onClick={downloadCSV}>Download CSV</button>

      <div className="dashboard-summary">
        {Object.entries(summary).length === 0 ? (
          <p>No sales recorded today.</p>
        ) : (
          <>
            {Object.entries(summary).map(([item, data], i) => (
              <div key={i} className="summary-box">
                <h3>{item}</h3>
                <p>Sold: {data.quantity}</p>
                <p>Revenue: ₹{data.revenue.toFixed(2)}</p>
              </div>
            ))}

            <div className="total-revenue-box">
              <h3>💰 Total Revenue</h3>
              <p><strong>₹{totalRevenue.toFixed(2)}</strong></p>
            </div>
            <button
              className="danger-btn"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete all sales data?")) {
                  localStorage.removeItem("sales");
                  window.location.reload();
                }
              }}
            >
              🗑️ Reset Sales Data
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SalesDashboard;
