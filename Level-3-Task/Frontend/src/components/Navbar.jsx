import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!token) {
    return null; // Don't show navbar if not logged in
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link
          to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
        >
          Pizza Delivery
        </Link>
      </div>
      <div className="navbar-links">
        {user.role === "user" && (
          <>
            <Link to="/user/dashboard">Dashboard</Link>
            <Link to="/user/pizza-builder">Build Pizza</Link>
            <Link to="/user/orders">Orders</Link>
          </>
        )}
        {user.role === "admin" && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/inventory">Inventory</Link>
            <Link to="/admin/orders">Orders</Link>
          </>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
