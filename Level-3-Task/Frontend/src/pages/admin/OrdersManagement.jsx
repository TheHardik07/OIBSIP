import React, { useState, useEffect } from "react";
import axios from "axios";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/admin/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/orders/${orderId}/status`,
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
    <div className="orders-management">
      <h2>Orders Management</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <h3>Order #{order._id}</h3>
            <p>
              User: {order.user.username} ({order.user.email})
            </p>
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
            <p>Address: {order.deliveryAddress}</p>
            <div className="status-buttons">
              {order.status === "pending" && (
                <button
                  onClick={() => handleStatusUpdate(order._id, "confirmed")}
                >
                  Confirm
                </button>
              )}
              {order.status === "confirmed" && (
                <button
                  onClick={() => handleStatusUpdate(order._id, "preparing")}
                >
                  Start Preparing
                </button>
              )}
              {order.status === "preparing" && (
                <button onClick={() => handleStatusUpdate(order._id, "ready")}>
                  Mark Ready
                </button>
              )}
              {order.status === "ready" && (
                <button
                  onClick={() => handleStatusUpdate(order._id, "delivered")}
                >
                  Mark Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersManagement;
