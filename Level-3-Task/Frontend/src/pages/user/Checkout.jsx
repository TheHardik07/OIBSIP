import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedIngredients, totalPrice } = location.state || {};
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const orderData = {
        items: selectedIngredients.map((ing) => ({
          name: ing.name,
          quantity: 1,
          price: ing.price,
        })),
        totalAmount: totalPrice,
        deliveryAddress,
      };

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Initialize Razorpay
      const options = {
        key: "your_razorpay_key_id", // Replace with actual key
        amount: response.data.amount,
        currency: response.data.currency,
        order_id: response.data.razorpayOrderId,
        name: "Pizza Delivery",
        description: "Pizza Order Payment",
        handler: function (response) {
          // Handle successful payment
          navigate("/order-placed", {
            state: { orderId: response.razorpay_order_id },
          });
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
    setLoading(false);
  };

  if (!selectedIngredients) {
    return <div>No items selected. Please go back to pizza builder.</div>;
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        {selectedIngredients.map((ing) => (
          <p key={ing._id}>
            {ing.name} - ₹{ing.price}
          </p>
        ))}
        <h4>Total: ₹{totalPrice}</h4>
      </div>
      <div className="delivery-address">
        <label>Delivery Address:</label>
        <textarea
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          required
        />
      </div>
      <button onClick={handlePayment} disabled={loading || !deliveryAddress}>
        {loading ? "Processing..." : "Pay with Razorpay"}
      </button>
    </div>
  );
};

export default Checkout;
