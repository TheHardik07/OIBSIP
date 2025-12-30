import React from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "120px 20px 20px 20px", // Increased top padding for better navbar separation
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "15px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                marginBottom: "20px",
              }}
            >
              🍕
            </div>
            <h2
              style={{
                margin: "0 0 10px 0",
                color: "#333",
                fontSize: "32px",
                fontWeight: "600",
              }}
            >
              Welcome back, {user.name}!
            </h2>
            <p
              style={{
                margin: "0",
                color: "#666",
                fontSize: "18px",
              }}
            >
              Ready to craft your perfect pizza?
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "40px",
            }}
          >
            <Link to="/user/pizza-builder" style={{ textDecoration: "none" }}>
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  padding: "30px 20px",
                  borderRadius: "12px",
                  textAlign: "center",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                  border: "none",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-5px)";
                  e.target.style.boxShadow =
                    "0 10px 25px rgba(102, 126, 234, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "36px", marginBottom: "10px" }}>🏗️</div>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "20px" }}>
                  Build Your Pizza
                </h3>
                <p style={{ margin: "0", fontSize: "14px", opacity: "0.9" }}>
                  Customize your perfect pizza with our builder
                </p>
              </div>
            </Link>

            <Link to="/user/orders" style={{ textDecoration: "none" }}>
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
                  color: "white",
                  padding: "30px 20px",
                  borderRadius: "12px",
                  textAlign: "center",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                  border: "none",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-5px)";
                  e.target.style.boxShadow =
                    "0 10px 25px rgba(255, 107, 107, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "36px", marginBottom: "10px" }}>📋</div>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "20px" }}>
                  Your Orders
                </h3>
                <p style={{ margin: "0", fontSize: "14px", opacity: "0.9" }}>
                  Track your pizza orders and history
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
