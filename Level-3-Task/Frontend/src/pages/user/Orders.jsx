import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`, {
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
        return "#F2C94C";
      case "In Kitchen":
        return "#8D1B3D";
      case "Out for Delivery":
        return "#2F855A";
      case "Delivered":
        return "#2F855A";
      case "Cancelled":
        return "#2D2D2D";
      default:
        return "#8D1B3D";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2D2D2D 0%, #8D1B3D 100%)",
        padding: "120px 20px 20px 20px", // Increased top padding for better navbar separation
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "rgba(250, 247, 242, 0.08)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.55)",
          border: "1px solid rgba(242, 201, 76, 0.35)",
        }}
      >
        <h2
          style={{
            color: "#F2C94C",
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "2.5rem",
            fontWeight: "600",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            letterSpacing: "0.6px",
          }}
        >
          Your Orders
        </h2>

        {orders.length === 0 ? (
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
              }}
            >
              No orders yet.
            </p>
            <p
              style={{
                color: "#FAF7F2",
                fontSize: "1rem",
                margin: "10px 0 0 0",
                fontWeight: "700",
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
                  background: "rgba(250, 247, 242, 0.12)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.45)",
                  border: "1px solid rgba(242, 201, 76, 0.35)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 22px 55px rgba(0,0,0,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 40px rgba(0,0,0,0.45)";
                }}
              >
                <h3
                  style={{
                    color: "#8D1B3D",
                    margin: "0 0 15px 0",
                    fontSize: "1.4rem",
                    fontWeight: "700",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    letterSpacing: "0.4px",
                  }}
                >
                  Order #{order._id.slice(-8)}
                </h3>

                <div style={{ marginBottom: "15px" }}>
                  <span
                    style={{
                      color: "#8D1B3D",
                      fontSize: "0.9rem",
                      fontWeight: "600",
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
                      background: "rgba(250, 247, 242, 0.7)",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    {order.status}
                  </span>
                </div>

                <p
                  style={{
                    color: "#2D2D2D",
                    margin: "10px 0",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  }}
                >
                  Total: ₹{order.totalAmount}
                </p>

                {order.items && order.items.length > 0 ? (
                  <div style={{ margin: "15px 0" }}>
                    <p
                      style={{
                        color: "#8D1B3D",
                        margin: "0 0 8px 0",
                        fontSize: "0.95rem",
                        fontWeight: "600",
                      }}
                    >
                      Items:
                    </p>
                    <p
                      style={{
                        color: "#2D2D2D",
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
                        color: "#8D1B3D",
                        margin: "0 0 8px 0",
                        fontSize: "0.95rem",
                        fontWeight: "600",
                      }}
                    >
                      Custom Pizza:
                    </p>
                    <div
                      style={{
                        color: "#2D2D2D",
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
                      color: "#2F855A",
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
