import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderPlaced = () => {
  const location = useLocation();
  const { orderId } = location.state || {};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "120px 20px 20px 20px", // Increased top padding for better navbar separation
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "60px",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
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
            background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 30px auto",
            boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "2.5rem",
              fontWeight: "bold",
            }}
          >
            ✓
          </span>
        </div>

        <h2
          style={{
            color: "white",
            margin: "0 0 20px 0",
            fontSize: "2.2rem",
            fontWeight: "300",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Order Placed Successfully!
        </h2>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "25px",
            margin: "30px 0",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              margin: "0 0 10px 0",
              fontSize: "1rem",
              fontWeight: "500",
            }}
          >
            Order ID:
          </p>
          <p
            style={{
              color: "white",
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
              color: "rgba(255, 255, 255, 0.8)",
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
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              padding: "15px 40px",
              borderRadius: "25px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              minWidth: "200px",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
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
