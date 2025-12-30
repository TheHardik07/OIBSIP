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
    return (
      <nav
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "1000",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(15px)",
          borderRadius: "50px",
          padding: "12px 40px",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minWidth: "600px",
          maxWidth: "95vw",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {/* Brand/Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FF6B6B 0%, #FFA500 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
              fontSize: "1.2rem",
            }}
          >
            <i class="fa-solid fa-pizza-slice"></i>
          </div>
          <Link
            to="/"
            style={{
              color: "#8D1B3D",
              textDecoration: "none",
              fontSize: "1.4rem",
              fontWeight: "600",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.textShadow = "0 4px 8px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.textShadow = "0 2px 4px rgba(0,0,0,0.3)";
            }}
          >
            Pizza Palace
          </Link>
        </div>

        {/* Auth Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <Link
            to="/login"
            style={{
              color: "white",
              textDecoration: "none",
              padding: "10px 20px",
              borderRadius: "25px",
              fontSize: "0.95rem",
              fontWeight: "500",
              transition: "all 0.3s ease",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 15px rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.1)";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Sign In
          </Link>
          <Link
            to="/register"
            style={{
              background: "linear-gradient(135deg, #FF6B6B 0%, #FFA500 100%)",
              color: "white",
              textDecoration: "none",
              padding: "10px 20px",
              borderRadius: "25px",
              fontSize: "0.95rem",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(255, 107, 107, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(255, 107, 107, 0.3)";
            }}
          >
            Sign Up
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "1000",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(15px)",
        borderRadius: "50px",
        padding: "12px 40px",
        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: "900px",
        maxWidth: "95vw",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        marginBottom: "30px",
      }}
    >
      {/* Brand/Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FF6B6B 0%, #FFA500 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
            fontSize: "1.2rem",
          }}
        >
          <i class="fa-solid fa-pizza-slice"></i>
        </div>
        <Link
          to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "1.4rem",
            fontWeight: "600",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.textShadow = "0 4px 8px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.textShadow = "0 2px 4px rgba(0,0,0,0.3)";
          }}
        >
          Pizza Palace
        </Link>
      </div>

      {/* Navigation Links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {user.role === "user" && (
          <>
            <Link
              to="/user/dashboard"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "10px 18px",
                borderRadius: "25px",
                fontSize: "0.95rem",
                fontWeight: "500",
                transition: "all 0.3s ease",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 4px 15px rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <i class="fa-solid fa-tachometer-alt"></i> Dashboard
            </Link>
            <Link
              to="/user/pizza-builder"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "10px 18px",
                borderRadius: "25px",
                fontSize: "0.95rem",
                fontWeight: "500",
                transition: "all 0.3s ease",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 4px 15px rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <i class="fa-solid fa-pizza-slice"></i> Build
            </Link>
            <Link
              to="/user/orders"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "10px 18px",
                borderRadius: "25px",
                fontSize: "0.95rem",
                fontWeight: "500",
                transition: "all 0.3s ease",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 4px 15px rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <i class="fa-solid fa-list"></i> Orders
            </Link>
          </>
        )}
        {user.role === "admin" && (
          <>
            <Link
              to="/admin/dashboard"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "10px 18px",
                borderRadius: "25px",
                fontSize: "0.95rem",
                fontWeight: "500",
                transition: "all 0.3s ease",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 4px 15px rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <i class="fa-solid fa-chart-line"></i> Dashboard
            </Link>
            <Link
              to="/admin/inventory"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "10px 18px",
                borderRadius: "25px",
                fontSize: "0.95rem",
                fontWeight: "500",
                transition: "all 0.3s ease",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 4px 15px rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              📦 Inventory
            </Link>
            <Link
              to="/admin/orders"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "10px 18px",
                borderRadius: "25px",
                fontSize: "0.95rem",
                fontWeight: "500",
                transition: "all 0.3s ease",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 4px 15px rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <i class="fa-solid fa-list"></i> Orders
            </Link>
          </>
        )}

        {/* User Info & Logout */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginLeft: "20px",
            paddingLeft: "20px",
            borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "0.9rem",
              fontWeight: "500",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            Welcome, {user.name || "User"}
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
              color: "#8D1B3D",
              border: "none",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(231, 76, 60, 0.3)",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(231, 76, 60, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(231, 76, 60, 0.3)";
            }}
          >
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
