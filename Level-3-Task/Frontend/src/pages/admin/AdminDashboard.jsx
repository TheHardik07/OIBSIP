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
          "http://localhost:5002/api/admin/inventory/low-stock",
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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
        padding: "120px 20px 20px 20px", // Increased top padding for better navbar separation
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        <h2
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "2.5rem",
            fontWeight: "300",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Admin Dashboard
        </h2>

        {/* Navigation Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
            marginBottom: "40px",
          }}
        >
          <Link to="/admin/inventory" style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: "15px",
                padding: "30px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 30px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px auto",
                  boxShadow: "0 4px 15px rgba(52, 152, 219, 0.3)",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                  }}
                >
                  📦
                </span>
              </div>
              <h3
                style={{
                  color: "white",
                  margin: "0 0 10px 0",
                  fontSize: "1.4rem",
                  fontWeight: "500",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                Manage Inventory
              </h3>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  margin: "0",
                  fontSize: "0.95rem",
                }}
              >
                Update stock levels, add new items, and monitor inventory
              </p>
            </div>
          </Link>

          <Link to="/admin/orders" style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: "15px",
                padding: "30px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 30px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px auto",
                  boxShadow: "0 4px 15px rgba(231, 76, 60, 0.3)",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                  }}
                >
                  📋
                </span>
              </div>
              <h3
                style={{
                  color: "white",
                  margin: "0 0 10px 0",
                  fontSize: "1.4rem",
                  fontWeight: "500",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                Manage Orders
              </h3>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  margin: "0",
                  fontSize: "0.95rem",
                }}
              >
                View and update order status, track deliveries
              </p>
            </div>
          </Link>
        </div>

        {/* Low Stock Alerts */}
        {lowStockAlerts.length > 0 && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <h3
              style={{
                color: "white",
                margin: "0 0 20px 0",
                fontSize: "1.5rem",
                fontWeight: "500",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px",
                  fontSize: "1.2rem",
                }}
              >
                ⚠️
              </span>
              Low Stock Alerts
            </h3>
            <div style={{ display: "grid", gap: "15px" }}>
              {lowStockAlerts.map((item) => (
                <div
                  key={item._id}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    padding: "15px",
                    border: "1px solid rgba(243, 156, 18, 0.3)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: "white",
                        fontSize: "1.1rem",
                        fontWeight: "500",
                        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      }}
                    >
                      {item.name}
                    </span>
                    <span
                      style={{
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "0.9rem",
                        marginLeft: "10px",
                      }}
                    >
                      ({item.unit})
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        color: "#f39c12",
                        fontSize: "1.2rem",
                        fontWeight: "600",
                      }}
                    >
                      {item.quantity} remaining
                    </div>
                    <div
                      style={{
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: "0.85rem",
                      }}
                    >
                      Min: {item.minThreshold}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
