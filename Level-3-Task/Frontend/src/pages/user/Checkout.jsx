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
        "http://localhost:5002/api/orders",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
            padding: "40px",
            boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "white",
              fontSize: "1.2rem",
              margin: "0",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            No items selected. Please go back to pizza builder.
          </p>
        </div>
      </div>
    );
  }

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
          maxWidth: "800px",
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
          Checkout
        </h2>

        <div
          style={{
            display: "grid",
            gap: "30px",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {/* Order Summary */}
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
              }}
            >
              Order Summary
            </h3>
            <div style={{ marginBottom: "20px" }}>
              {selectedIngredients.map((ing) => (
                <div
                  key={ing._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: "1rem",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    {ing.name}
                  </span>
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "1rem",
                      fontWeight: "500",
                    }}
                  >
                    ₹{ing.price}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 0",
                borderTop: "2px solid rgba(255, 255, 255, 0.2)",
                marginTop: "15px",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                Total:
              </span>
              <span
                style={{
                  color: "white",
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                ₹{totalPrice}
              </span>
            </div>
          </div>

          {/* Delivery Address */}
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
              }}
            >
              Delivery Details
            </h3>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  color: "rgba(255, 255, 255, 0.9)",
                  marginBottom: "8px",
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
              >
                Delivery Address:
              </label>
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  resize: "vertical",
                  minHeight: "80px",
                  outline: "none",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(255, 255, 255, 0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255, 255, 255, 0.3)")
                }
                placeholder="Enter your delivery address..."
              />
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={handlePayment}
            disabled={loading || !deliveryAddress}
            style={{
              background:
                loading || !deliveryAddress
                  ? "rgba(255, 255, 255, 0.2)"
                  : "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
              color: "white",
              border: "none",
              padding: "15px 40px",
              borderRadius: "25px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: loading || !deliveryAddress ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow:
                loading || !deliveryAddress
                  ? "none"
                  : "0 4px 15px rgba(76, 175, 80, 0.3)",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              minWidth: "200px",
            }}
            onMouseEnter={(e) => {
              if (!loading && deliveryAddress) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(76, 175, 80, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && deliveryAddress) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(76, 175, 80, 0.3)";
              }
            }}
          >
            {loading ? "Processing..." : "Pay with Razorpay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
