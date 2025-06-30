// src/components/DayWiseData.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DayWiseData.css";

function DayWiseData() {
  const [groupedData, setGroupedData] = useState({});
  const navigate = useNavigate();
  

  useEffect(() => {
    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const grouped = {};

    sales.forEach((sale) => {
      const date = sale.date;
      const { itemName, quantity, price } = sale;

      if (!grouped[date]) grouped[date] = {};
      if (!grouped[date][itemName]) {
        grouped[date][itemName] = { quantity: 0, revenue: 0 };
      }

      grouped[date][itemName].quantity += quantity;
      grouped[date][itemName].revenue += price * quantity;
    });

    setGroupedData(grouped);
  }, []);

  const downloadDaywiseCSV = () => {
    const rows = [["Date", "Item", "Quantity Sold", "Revenue (₹)"]];
    Object.entries(groupedData).forEach(([date, items]) => {
      Object.entries(items).forEach(([item, data]) => {
        rows.push([date, item, data.quantity, data.revenue.toFixed(2)]);
      });
    });

    const csvContent =
      "data:text/csv;charset=utf-8," + rows.map((r) => r.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "daywise_sales.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="daywise-data">
      <h2>📅 Day-wise Sales Report</h2>
      <button onClick={() => navigate("/")} className="back-btn">← Back</button>
      <button className="download-btn" onClick={downloadDaywiseCSV}>Download CSV</button>

      {Object.keys(groupedData).length === 0 ? (
        <p>No sales data found.</p>
      ) : (
        Object.entries(groupedData).map(([date, items], idx) => {
          const totalRevenue = Object.values(items).reduce(
            (sum, item) => sum + item.revenue,
            0
          );

          return (
            <div key={idx} className="day-block">
              <h3>{date}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity Sold</th>
                    <th>Revenue (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(items).map(([name, data], i) => (
                    <tr key={i}>
                      <td>{name}</td>
                      <td>{data.quantity}</td>
                      <td>₹{data.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td colSpan="2"><strong>Total Revenue</strong></td>
                    <td><strong>₹{totalRevenue.toFixed(2)}</strong></td>
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
