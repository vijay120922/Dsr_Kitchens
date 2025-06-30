import React, { useEffect, useState } from "react";
import "./DayWiseData.css";

function DayWiseData() {
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const grouped = {};

    sales.forEach((sale) => {
      const date = sale.date;
      if (!grouped[date]) grouped[date] = {};

      const items = Array.isArray(sale.items) ? sale.items : [sale];

      items.forEach((entry) => {
        if (!entry?.itemName || !entry?.quantity || !entry?.total) return;

        if (!grouped[date][entry.itemName]) {
          grouped[date][entry.itemName] = { quantity: 0, revenue: 0 };
        }

        grouped[date][entry.itemName].quantity += entry.quantity;
        grouped[date][entry.itemName].revenue += entry.total;
      });
    });

    setGroupedData(grouped);
  }, []);

  return (
    <div className="daywise-data">
      <h2>Day-wise Sales Report</h2>
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
