// src/components/SalesDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SalesDashboard.css";

function SalesDashboard() {
  const [summary, setSummary] = useState({});
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchTodaySales = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const res = await axios.get(
          `http://localhost:5000/api/sales/today?date=${today}`
        );
        setSummary(res.data.summary);
        setTotalRevenue(res.data.totalRevenue);
      } catch (err) {
        console.error("Error fetching sales summary:", err);
      }
    };

    fetchTodaySales();
  }, []);

  const downloadCSV = () => {
    const rows = [["Item", "Quantity Sold", "Revenue (₹)"]];
    Object.entries(summary).forEach(([name, data]) => {
      rows.push([name, data.quantity, data.revenue.toFixed(2)]);
    });
    rows.push(["", "Total", totalRevenue.toFixed(2)]);

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

  return (
    <div className="dashboard-container">
      <h2>📊 Today's Sales</h2>
      <button onClick={() => window.history.back()} className="back-btn">
        ← Back
      </button>
      <button onClick={downloadCSV} className="download-btn">
        Download CSV
      </button>

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
            <div className="summary-total">
              <h3>Total Revenue: ₹{totalRevenue.toFixed(2)}</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SalesDashboard;
