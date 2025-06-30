// src/App.jsx
import React, { useState, useEffect } from "react";
import ItemManager from "./components/ItemManager";
import PurchaseEntry from "./components/PurchaseEntry";
import SalesDashboard from "./components/SalesDashboard";
import DayWiseData from "./components/DayWiseData";

function App() {
  const [view, setView] = useState("dashboard");

  // Initialize localStorage on first load
  useEffect(() => {
    if (!localStorage.getItem("items")) {
      localStorage.setItem("items", JSON.stringify([]));
    }
    if (!localStorage.getItem("sales")) {
      localStorage.setItem("sales", JSON.stringify([]));
    }
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🍜 Chinese Restaurant Admin</h1>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setView("manage")}>Manage Items</button>
        <button onClick={() => setView("purchase")}>Record Purchase</button>
        <button onClick={() => setView("dashboard")}>Dashboard</button>
        <button onClick={() => setView("history")}>Day-wise Report</button>
      </div>

      {view === "manage" && <ItemManager />}
      {view === "purchase" && <PurchaseEntry />}
      {view === "dashboard" && <SalesDashboard />}
      {view === "history" && <DayWiseData />}
    </div>
  );
}

export default App;
