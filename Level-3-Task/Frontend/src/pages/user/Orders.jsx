import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/orders", {
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
      case "pending":
        return "yellow";
      case "confirmed":
        return "blue";
      case "preparing":
        return "orange";
      case "ready":
        return "green";
      case "delivered":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="orders">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-item">
              <h3>Order #{order._id}</h3>
              <p>
                Status:{" "}
                <span style={{ color: getStatusColor(order.status) }}>
                  {order.status}
                </span>
              </p>
              <p>Total: ₹{order.totalAmount}</p>
              <p>
                Items:{" "}
                {order.items
                  .map((item) => `${item.name} (${item.quantity})`)
                  .join(", ")}
              </p>
              {order.estimatedDeliveryTime && (
                <p>
                  Estimated Delivery:{" "}
                  {new Date(order.estimatedDeliveryTime).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
