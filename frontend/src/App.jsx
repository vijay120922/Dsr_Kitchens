import React, { useState, useEffect } from "react";
import ItemManager from "./components/ItemManager";
import PurchaseEntry from "./components/PurchaseEntry";
import SalesDashboard from "./components/SalesDashboard";
import DayWiseData from "./components/DayWiseData";
import RecentSales from "./components/RecentSales";
import "./App.css";

function App() {
  const [view, setView] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("items")) {
      localStorage.setItem("items", JSON.stringify([]));
    }
    if (!localStorage.getItem("sales")) {
      localStorage.setItem("sales", JSON.stringify([]));
    }
  }, []);

  return (
    <div className="app-container">
      {!view && (
        <div className="home-grid">
          <h1 className="home-heading">DSR Kitchens</h1>

          <div className="card-grid">
            <div className="card" onClick={() => setView("manage")}>
              <span className="card-icon">📋</span>
              <h3>Manage Items</h3>
              <p>Open Module</p>
            </div>
            <div className="card" onClick={() => setView("purchase")}>
              <span className="card-icon">🛒</span>
              <h3>Record Purchase</h3>
              <p>Open Module</p>
            </div>
            <div className="card" onClick={() => setView("dashboard")}>
              <span className="card-icon">📊</span>
              <h3>Sales Dashboard</h3>
              <p>Open Module</p>
            </div>
            <div className="card" onClick={() => setView("history")}>
              <span className="card-icon">📅</span>
              <h3>Day-wise Reports</h3>
              <p>Open Module</p>
            </div>
          </div>

          {/* Recent Sales below cards */}
          <RecentSales />
        </div>
      )}

      {view === "manage" && <ItemManager onBack={() => setView("")} />}
      {view === "purchase" && <PurchaseEntry onBack={() => setView("")} />}
      {view === "dashboard" && <SalesDashboard setView={setView} />}
      {view === "history" && <DayWiseData setView={setView} />}
    </div>
  );
}

export default App;
