import React, { useEffect, useState } from "react";
import "./RecentSales.css";

function RecentSales() {
  const [recentSales, setRecentSales] = useState([]);

  useEffect(() => {
    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const sortedSales = [...sales].reverse();
    const latest10 = sortedSales.slice(0, 10);
    setRecentSales(latest10);
  }, []);

  const formatDateTime = (timestamp, fallbackDate) => {
    const dateObj = new Date(timestamp || fallbackDate);  // Fallback if timestamp missing

    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formatted = new Intl.DateTimeFormat("en-IN", options).format(dateObj);
    const [date, time] = formatted.split(", ");
    return { date, time };
  };

  return (
    <div className="recent-sales-container">
      <h2>🕒 Recent 10 Sales</h2>

      {recentSales.length === 0 ? (
        <p>No sales recorded yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price (₹)</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map((sale, index) => {
              const { date, time } = formatDateTime(sale.timestamp, sale.date);
              return (
                <tr key={index}>
                  <td>{sale.itemName}</td>
                  <td>{sale.quantity}</td>
                  <td>₹{sale.price.toFixed(2)}</td>
                  <td>{date}</td>
                  <td>{time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecentSales;
