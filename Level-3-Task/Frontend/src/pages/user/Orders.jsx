import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5001/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Received":
        return "yellow";
      case "In Kitchen":
        return "orange";
      case "Out for Delivery":
        return "blue";
      case "Delivered":
        return "green";
      case "Cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
            marginBottom: "30px",
            fontSize: "2.5rem",
            fontWeight: "300",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Your Orders
        </h2>

        {orders.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "15px",
              backdropFilter: "blur(5px)",
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: "1.2rem",
                margin: "0",
                opacity: "0.9",
              }}
            >
              No orders yet.
            </p>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "1rem",
                margin: "10px 0 0 0",
              }}
            >
              Start building your perfect pizza!
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            }}
          >
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
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
                <h3
                  style={{
                    color: "white",
                    margin: "0 0 15px 0",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  }}
                >
                  Order #{order._id.slice(-8)}
                </h3>

                <div style={{ marginBottom: "15px" }}>
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                    }}
                  >
                    Status:
                  </span>
                  <span
                    style={{
                      color: getStatusColor(order.status),
                      fontWeight: "600",
                      marginLeft: "8px",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      background: "rgba(255, 255, 255, 0.2)",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    {order.status}
                  </span>
                </div>

                <p
                  style={{
                    color: "white",
                    margin: "10px 0",
                    fontSize: "1.1rem",
                    fontWeight: "500",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  }}
                >
                  Total: ₹{order.totalAmount}
                </p>

                {order.items && order.items.length > 0 ? (
                  <div style={{ margin: "15px 0" }}>
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 0.8)",
                        margin: "0 0 8px 0",
                        fontSize: "0.95rem",
                        fontWeight: "500",
                      }}
                    >
                      Items:
                    </p>
                    <p
                      style={{
                        color: "white",
                        margin: "0",
                        fontSize: "0.9rem",
                        lineHeight: "1.4",
                        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      }}
                    >
                      {order.items
                        .map((item) => `${item.name} (${item.quantity})`)
                        .join(", ")}
                    </p>
                  </div>
                ) : (
                  <div style={{ margin: "15px 0" }}>
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 0.8)",
                        margin: "0 0 8px 0",
                        fontSize: "0.95rem",
                        fontWeight: "500",
                      }}
                    >
                      Custom Pizza:
                    </p>
                    <div
                      style={{
                        color: "white",
                        fontSize: "0.9rem",
                        lineHeight: "1.4",
                        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      }}
                    >
                      <p style={{ margin: "0 0 5px 0" }}>
                        Base: {order.pizza?.base}
                      </p>
                      <p style={{ margin: "0 0 5px 0" }}>
                        Sauce: {order.pizza?.sauce}
                      </p>
                      <p style={{ margin: "0 0 5px 0" }}>
                        Cheese: {order.pizza?.cheese}
                      </p>
                      <p style={{ margin: "0" }}>
                        Veggies: {order.pizza?.veggies?.join(", ")}
                      </p>
                    </div>
                  </div>
                )}

                {order.estimatedDeliveryTime && (
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.9)",
                      margin: "15px 0 0 0",
                      fontSize: "0.9rem",
                      fontStyle: "italic",
                    }}
                  >
                    Estimated Delivery:{" "}
                    {new Date(order.estimatedDeliveryTime).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
