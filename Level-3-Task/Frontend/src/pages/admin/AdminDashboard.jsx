import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [lowStockAlerts, setLowStockAlerts] = useState([]);

  useEffect(() => {
    const fetchLowStockAlerts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/admin/inventory/low-stock",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLowStockAlerts(response.data);
      } catch (error) {
        console.error("Error fetching low stock alerts:", error);
      }
    };

    fetchLowStockAlerts();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-options">
        <Link to="/admin/inventory">
          <button>Manage Inventory</button>
        </Link>
        <Link to="/admin/orders">
          <button>Manage Orders</button>
        </Link>
      </div>
      {lowStockAlerts.length > 0 && (
        <div className="low-stock-alerts">
          <h3>Low Stock Alerts</h3>
          <ul>
            {lowStockAlerts.map((item) => (
              <li key={item._id}>
                {item.name}: {item.quantity} {item.unit} remaining (Min:{" "}
                {item.minThreshold})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
