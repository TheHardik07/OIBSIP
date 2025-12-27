import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderPlaced = () => {
  const location = useLocation();
  const { orderId } = location.state || {};

  return (
    <div className="order-placed">
      <h2>Order Placed Successfully!</h2>
      <p>Your order ID: {orderId}</p>
      <p>You will receive updates on your order status.</p>
      <Link to="/user/orders">
        <button>View Order Status</button>
      </Link>
    </div>
  );
};

export default OrderPlaced;
