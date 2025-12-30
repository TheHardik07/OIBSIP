import React, { useState, useEffect } from "react";
import axios from "axios";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Orders response:", response.data);
      setOrders(
        Array.isArray(response.data)
          ? response.data
          : response.data.orders || []
      );
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    const loadOrders = async () => {
      await fetchOrders();
    };
    loadOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}/status`,
        {
          status: newStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Received":
        return "#F2C94C";
      case "In Kitchen":
        return "#8D1B3D";
      case "Out for Delivery":
        return "#2F855A";
      case "Delivered":
        return "#2D2D2D";
      case "Cancelled":
        return "#8D1B3D";
      default:
        return "#2D2D2D";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2D2D2D 0%, #8D1B3D 100%)",
        padding: "140px 20px 20px 20px", // Increased top padding for better navbar separation
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          background: "rgba(250, 247, 242, 0.08)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
          border: "1px solid rgba(242, 201, 76, 0.35)",
        }}
      >
        <h2
          style={{
            color: "#F2C94C",
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "2.5rem",
            fontWeight: "600",
            letterSpacing: "0.6px",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Orders Management
        </h2>

        <div
          style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          }}
        >
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                background: "rgba(250, 247, 242, 0.12)",
                backdropFilter: "blur(10px)",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(242, 201, 76, 0.35)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 35px rgba(0,0,0,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    color: "#8D1B3D",
                    margin: "0",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  }}
                >
                  Order #{order._id.slice(-8)}
                </h3>
                <span
                  style={{
                    color: "#2D2D2D",
                    fontWeight: "600",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    background: "rgba(250, 247, 242, 0.9)",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  }}
                >
                  {order.status}
                </span>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <p
                  style={{
                    color: "#8D1B3D",
                    margin: "0 0 5px 0",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                  }}
                >
                  Customer:
                </p>
                <p
                  style={{
                    color: "#2D2D2D",
                    margin: "0",
                    fontSize: "1rem",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  }}
                >
                  {order.user?.name || "N/A"} ({order.user?.email || "N/A"})
                </p>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <p
                  style={{
                    color: "#8D1B3D",
                    margin: "0 0 5px 0",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                  }}
                >
                  Total Amount:
                </p>
                <p
                  style={{
                    color: "#2D2D2D",
                    margin: "0",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  }}
                >
                  ₹{order.totalAmount}
                </p>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <p
                  style={{
                    color: "#8D1B3D",
                    margin: "0 0 5px 0",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                  }}
                >
                  Order Details:
                </p>
                {order.items?.length > 0 ? (
                  <p
                    style={{
                      color: "#2D2D2D",
                      margin: "0",
                      fontSize: "0.95rem",
                      lineHeight: "1.4",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    {order.items
                      .map((item) => `${item.name} (${item.quantity})`)
                      .join(", ")}
                  </p>
                ) : order.pizza ? (
                  <div
                    style={{
                      color: "#2D2D2D",
                      fontSize: "0.95rem",
                      lineHeight: "1.4",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    <p style={{ margin: "0 0 3px 0" }}>
                      Base: {order.pizza.base}
                    </p>
                    <p style={{ margin: "0 0 3px 0" }}>
                      Sauce: {order.pizza.sauce}
                    </p>
                    <p style={{ margin: "0 0 3px 0" }}>
                      Cheese: {order.pizza.cheese}
                    </p>
                    <p style={{ margin: "0" }}>
                      Veggies: {order.pizza.veggies?.join(", ")}
                    </p>
                  </div>
                ) : (
                  <p
                    style={{
                      color: "#2D2D2D",
                      margin: "0",
                      fontSize: "0.9rem",
                      fontStyle: "italic",
                    }}
                  >
                    No items found
                  </p>
                )}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <p
                  style={{
                    color: "#8D1B3D",
                    margin: "0 0 5px 0",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                  }}
                >
                  Delivery Address:
                </p>
                <p
                  style={{
                    color: "#2D2D2D",
                    margin: "0",
                    fontSize: "0.95rem",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  }}
                >
                  {order.deliveryAddress}
                </p>
              </div>

              {/* Status Update Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {order.status === "Order Received" && (
                  <button
                    onClick={() => handleStatusUpdate(order._id, "In Kitchen")}
                    style={{
                      background: "linear-gradient(135deg, #F2C94C 0%, #8D1B3D 100%)",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(141, 27, 61, 0.45)",
                      flex: "1",
                      minWidth: "120px",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 6px 15px rgba(141, 27, 61, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 4px 12px rgba(141, 27, 61, 0.45)";
                    }}
                  >
                    Start Preparing
                  </button>
                )}
                {order.status === "In Kitchen" && (
                  <button
                    onClick={() =>
                      handleStatusUpdate(order._id, "Out for Delivery")
                    }
                    style={{
                      background: "linear-gradient(135deg, #2F855A 0%, #2D2D2D 100%)",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(47, 133, 90, 0.45)",
                      flex: "1",
                      minWidth: "120px",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 6px 15px rgba(47, 133, 90, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 4px 12px rgba(47, 133, 90, 0.45)";
                    }}
                  >
                    Send to Delivery
                  </button>
                )}
                {order.status === "Out for Delivery" && (
                  <button
                    onClick={() => handleStatusUpdate(order._id, "Delivered")}
                    style={{
                      background: "linear-gradient(135deg, #2D2D2D 0%, #2D2D2D 100%)",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
                      flex: "1",
                      minWidth: "120px",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 6px 15px rgba(0,0,0,0.8)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 4px 12px rgba(0,0,0,0.6)";
                    }}
                  >
                    Mark Delivered
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "rgba(250, 247, 242, 0.12)",
              borderRadius: "15px",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(242, 201, 76, 0.35)",
            }}
          >
            <p
              style={{
                color: "#2D2D2D",
                fontSize: "1.2rem",
                margin: "0",
                opacity: "0.9",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              No orders found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersManagement;
