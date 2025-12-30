import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderPlaced = () => {
  const location = useLocation();
  const { orderId } = location.state || {};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2D2D2D 0%, #8D1B3D 100%)",
        padding: "120px 20px 20px 20px", // Increased top padding for better navbar separation
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(250, 247, 242, 0.08)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "60px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.55)",
          border: "1px solid rgba(242, 201, 76, 0.35)",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        {/* Success Icon */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #F2C94C 0%, #8D1B3D 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 30px auto",
            boxShadow: "0 10px 30px rgba(141, 27, 61, 0.55)",
          }}
        >
          <span
            style={{
              color: "#2D2D2D",
              fontSize: "2.5rem",
              fontWeight: "bold",
            }}
          >
            ✓
          </span>
        </div>

        <h2
          style={{
            color: "#F2C94C",
            margin: "0 0 20px 0",
            fontSize: "2.2rem",
            fontWeight: "600",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            letterSpacing: "0.6px",
          }}
        >
          Order Placed Successfully!
        </h2>

        <div
          style={{
            background: "rgba(250, 247, 242, 0.12)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "25px",
            margin: "30px 0",
            boxShadow: "0 15px 40px rgba(0,0,0,0.45)",
            border: "1px solid rgba(242, 201, 76, 0.35)",
          }}
        >
          <p
            style={{
              color: "#8D1B3D",
              margin: "0 0 10px 0",
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            Order ID:
          </p>
          <p
            style={{
              color: "#2D2D2D",
              margin: "0 0 15px 0",
              fontSize: "1.2rem",
              fontWeight: "600",
              fontFamily: "monospace",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            {orderId || "N/A"}
          </p>
          <p
            style={{
              color: "#2D2D2D",
              margin: "0",
              fontSize: "0.95rem",
              lineHeight: "1.4",
            }}
          >
            You will receive updates on your order status via email and can
            track it in your orders page.
          </p>
        </div>

        <Link to="/user/orders" style={{ textDecoration: "none" }}>
          <button
            style={{
              background: "linear-gradient(135deg, #F2C94C 0%, #8D1B3D 100%)",
              color: "#2D2D2D",
              border: "none",
              padding: "15px 40px",
              borderRadius: "25px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 6px 20px rgba(141, 27, 61, 0.55)",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              minWidth: "200px",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 10px 30px rgba(141, 27, 61, 0.7)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 6px 20px rgba(141, 27, 61, 0.55)";
            }}
          >
            View Order Status
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderPlaced;
