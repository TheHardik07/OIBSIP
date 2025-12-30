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
          background: "rgba(45, 45, 45, 0.75)",
          backdropFilter: "blur(15px)",
          borderRadius: "50px",
          padding: "12px 40px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
          border: "1px solid rgba(242, 201, 76, 0.25)",
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
              background: "linear-gradient(135deg, #F2C94C 0%, #8D1B3D 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 20px rgba(141, 27, 61, 0.45)",
              color: "#2D2D2D",
              fontSize: "1.2rem",
            }}
          >
            <i class="fa-solid fa-pizza-slice"></i>
          </div>
          <Link
            to="/"
            style={{
              color: "#F2C94C",
              letterSpacing: "0.6px",
              textDecoration: "none",
              fontSize: "1.4rem",
              fontWeight: "600",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.textShadow = "0 4px 8px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.textShadow = "0 2px 4px rgba(0,0,0,0.3)";
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
              textDecoration: "none",
              padding: "10px 20px",
              borderRadius: "25px",
              fontSize: "0.95rem",
              fontWeight: "500",
              transition: "all 0.3s ease",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              background: "rgba(250, 247, 242, 0.1)",
              border: "1px solid rgba(242, 201, 76, 0.4)",
              color: "#FAF7F2",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(242, 201, 76, 0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Sign In
          </Link>
          <Link
            to="/register"
            style={{
              background: "linear-gradient(135deg, #F2C94C 0%, #8D1B3D 100%)",
              color: "#2D2D2D",
              boxShadow: "0 6px 20px rgba(141, 27, 61, 0.45)",
              textDecoration: "none",
              padding: "10px 20px",
              borderRadius: "25px",
              fontSize: "0.95rem",
              fontWeight: "600",
              transition: "all 0.3s ease",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(141, 27, 61, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(141, 27, 61, 0.2)";
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
        background: "rgba(45, 45, 45, 0.75)",
        backdropFilter: "blur(15px)",
        borderRadius: "50px",
        padding: "12px 40px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
        border: "1px solid rgba(242, 201, 76, 0.25)",
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
            background: "linear-gradient(135deg, #F2C94C 0%, #8D1B3D 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 20px rgba(141, 27, 61, 0.45)",
            color: "#2D2D2D",
            fontSize: "1.2rem",
          }}
        >
          <i class="fa-solid fa-pizza-slice"></i>
        </div>
        <Link
          to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
          style={{
            color: "#F2C94C",
            letterSpacing: "0.6px",
            textDecoration: "none",
            fontSize: "1.4rem",
            fontWeight: "600",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.textShadow = "0 4px 8px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.textShadow = "0 2px 4px rgba(0,0,0,0.3)";
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
                color: "#FAF7F2",
                textDecoration: "none",
                padding: "10px 18px",
                borderRadius: "25px",
                fontSize: "0.95rem",
                fontWeight: "500",
                transition: "all 0.3s ease",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                background: "rgba(250, 247, 242, 0.08)",
                border: "1px solid rgba(242, 201, 76, 0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(242, 201, 76, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(250, 247, 242, 0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <i class="fa-solid fa-tachometer-alt"></i> Dashboard
            </Link>
            <Link
              to="/user/pizza-builder"
              style={{
                color: "#FAF7F2",
                textDecoration: "none",
                padding: "10px 18px",
                borderRadius: "25px",
                fontSize: "0.95rem",
                fontWeight: "500",
                transition: "all 0.3s ease",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                background: "rgba(250, 247, 242, 0.08)",
                border: "1px solid rgba(242, 201, 76, 0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(242, 201, 76, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(250, 247, 242, 0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <i class="fa-solid fa-pizza-slice"></i> Build
            </Link>
            <Link
              to="/user/orders"
              style={{
                color: "#FAF7F2",
                textDecoration: "none",
                padding: "10px 18px",
                borderRadius: "25px",
                fontSize: "0.95rem",
                fontWeight: "500",
                transition: "all 0.3s ease",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                background: "rgba(250, 247, 242, 0.08)",
                border: "1px solid rgba(242, 201, 76, 0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(242, 201, 76, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(250, 247, 242, 0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
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
                color: "#FAF7F2",
                textDecoration: "none",
                padding: "10px 18px",
                borderRadius: "25px",
                fontSize: "0.95rem",
                fontWeight: "500",
                transition: "all 0.3s ease",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                background: "rgba(250, 247, 242, 0.08)",
                border: "1px solid rgba(242, 201, 76, 0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(242, 201, 76, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(250, 247, 242, 0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <i class="fa-solid fa-chart-line"></i> Dashboard
            </Link>
            <Link
              to="/admin/inventory"
              style={{
                color: "#FAF7F2",
                textDecoration: "none",
                padding: "10px 18px",
                borderRadius: "25px",
                fontSize: "0.95rem",
                fontWeight: "500",
                transition: "all 0.3s ease",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                background: "rgba(250, 247, 242, 0.08)",
                border: "1px solid rgba(242, 201, 76, 0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(242, 201, 76, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(250, 247, 242, 0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <i class="fa-solid fa-inbox"></i>Inventory
            </Link>
            <Link
              to="/admin/orders"
              style={{
                textDecoration: "none",
                padding: "10px 18px",
                borderRadius: "25px",
                fontSize: "0.95rem",
                fontWeight: "500",
                transition: "all 0.3s ease",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                background: "rgba(250, 247, 242, 0.08)",
                border: "1px solid rgba(242, 201, 76, 0.35)",
                color: "#FAF7F2",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(242, 201, 76, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(250, 247, 242, 0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
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
              fontSize: "0.9rem",
              fontWeight: "700",
              color: "#F2C94C",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            Welcome, {user.name || "User"}
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: "linear-gradient(135deg, #8D1B3D 0%, #2D2D2D 100%)",
              color: "#FAF7F2",
              border: "none",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
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
