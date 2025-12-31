import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedIngredients, totalPrice } = location.state || {};
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!selectedIngredients) {
      alert("No items selected. Please go back to pizza builder.");
      navigate("/user/pizza-builder");
    }
  }, [selectedIngredients, navigate]);

  const handlePayment = async () => {
    try {
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      console.log("Amount:", totalPrice);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders/create-payment`,
        { amount: totalPrice },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: res.data.amount,
        currency: "INR",
        order_id: res.data.id,
        name: "Pizza Palace (Test)",
        handler: () => {
          alert("✅ Test payment success");
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Failed to initiate payment");
    }
  };

  if (!selectedIngredients) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #2D2D2D 0%, #8D1B3D 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <div
          style={{
            background: "rgba(250, 247, 242, 0.12)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.55)",
            border: "1px solid rgba(242, 201, 76, 0.35)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#2D2D2D",
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
        background: "linear-gradient(135deg, #2D2D2D 0%, #8D1B3D 100%)",
        padding: "120px 20px 20px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
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
            marginBottom: "40px",
            fontSize: "2.5rem",
            fontWeight: "600",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            letterSpacing: "0.6px",
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
              background: "rgba(250, 247, 242, 0.12)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.45)",
              border: "1px solid rgba(242, 201, 76, 0.35)",
            }}
          >
            <h3
              style={{
                color: "#8D1B3D",
                margin: "0 0 20px 0",
                fontSize: "1.5rem",
                fontWeight: "700",
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
                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  <span
                    style={{
                      color: "#2D2D2D",
                      fontSize: "1rem",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    {ing.name}
                  </span>
                  <span
                    style={{
                      color: "#8D1B3D",
                      fontSize: "1rem",
                      fontWeight: "600",
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
                borderTop: "2px solid rgba(242, 201, 76, 0.5)",
                marginTop: "15px",
              }}
            >
              <span
                style={{
                  color: "#2D2D2D",
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                Total:
              </span>
              <span
                style={{
                  color: "#2D2D2D",
                  fontSize: "1.3rem",
                  fontWeight: "700",
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
              background: "rgba(250, 247, 242, 0.12)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.45)",
              border: "1px solid rgba(242, 201, 76, 0.35)",
            }}
          >
            <h3
              style={{
                color: "#8D1B3D",
                margin: "0 0 20px 0",
                fontSize: "1.5rem",
                fontWeight: "700",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              Delivery Details
            </h3>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  color: "#2D2D2D",
                  marginBottom: "8px",
                  fontSize: "1rem",
                  fontWeight: "600",
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
                  border: "1px solid rgba(0,0,0,0.2)",
                  background: "#FAF7F2",
                  color: "#2D2D2D",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  resize: "vertical",
                  minHeight: "80px",
                  outline: "none",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#F2C94C")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(0,0,0,0.2)")
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
                  : "linear-gradient(135deg, #F2C94C 0%, #8D1B3D 100%)",
              color: "#2D2D2D",
              border: "none",
              padding: "15px 40px",
              borderRadius: "25px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor:
                loading || !deliveryAddress ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow:
                loading || !deliveryAddress
                  ? "none"
                  : "0 6px 20px rgba(141, 27, 61, 0.55)",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              minWidth: "200px",
            }}
            onMouseEnter={(e) => {
              if (!loading && deliveryAddress) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 10px 30px rgba(141, 27, 61, 0.65)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && deliveryAddress) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 6px 20px rgba(141, 27, 61, 0.55)";
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
