import React from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="user-dashboard">
      <h2>Welcome, {user.username}!</h2>
      <div className="dashboard-options">
        <Link to="/user/pizza-builder">
          <button>Build Your Pizza</button>
        </Link>
        <Link to="/user/orders">
          <button>View Orders</button>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
