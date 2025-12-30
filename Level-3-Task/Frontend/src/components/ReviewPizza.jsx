import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ReviewPizza({ pizza, totalPrice }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePayment = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }
    // Import the payment function dynamically to avoid circular imports
    import("../utils/razorpay").then(({ startPayment }) => {
      startPayment(pizza, totalPrice, token, user, navigate);
    });
  };

  return (
    <div
      style={{
        color: "#FAF7F2",
        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
      }}
    >
      <h3
        style={{
          fontSize: "1.8rem",
          fontWeight: "600",
          color: "#F2C94C",
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        Review Your Masterpiece
      </h3>

      <div
        style={{
          background: "rgba(0,0,0,0.2)",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "25px",
        }}
      >
        <p style={{ margin: "8px 0", fontSize: "1.1rem" }}>
          <strong>Base:</strong>{" "}
          <span
            style={{
              color: pizza.base ? "#F2C94C" : "#999",
              fontWeight: "600",
            }}
          >
            {pizza.base || "Not selected"}
          </span>
        </p>
        <p style={{ margin: "8px 0", fontSize: "1.1rem" }}>
          <strong>Sauce:</strong>{" "}
          <span
            style={{
              color: pizza.sauce ? "#F2C94C" : "#999",
              fontWeight: "600",
            }}
          >
            {pizza.sauce || "Not selected"}
          </span>
        </p>
        <p style={{ margin: "8px 0", fontSize: "1.1rem" }}>
          <strong>Cheese:</strong>{" "}
          <span
            style={{
              color: pizza.cheese ? "#F2C94C" : "#999",
              fontWeight: "600",
            }}
          >
            {pizza.cheese || "Not selected"}
          </span>
        </p>
        <p style={{ margin: "8px 0", fontSize: "1.1rem" }}>
          <strong>Veggies:</strong>{" "}
          <span
            style={{
              color: pizza.veggies.length > 0 ? "#F2C94C" : "#999",
              fontWeight: "600",
            }}
          >
            {pizza.veggies.length > 0
              ? pizza.veggies.join(", ")
              : "None selected"}
          </span>
        </p>
      </div>

      <div
        style={{
          borderTop: "2px solid rgba(242, 201, 76, 0.5)",
          paddingTop: "20px",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#FAF7F2",
          }}
        >
          Total Price: ₹{totalPrice}
        </p>
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={handlePayment}
          disabled={!pizza.base || !pizza.sauce || !pizza.cheese}
          style={{
            background:
              !pizza.base || !pizza.sauce || !pizza.cheese
                ? "rgba(255, 255, 255, 0.2)"
                : "linear-gradient(135deg, #F2C94C 0%, #8D1B3D 100%)",
            color: "#2D2D2D",
            border: "none",
            padding: "15px 40px",
            borderRadius: "25px",
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor:
              !pizza.base || !pizza.sauce || !pizza.cheese
                ? "not-allowed"
                : "pointer",
            transition: "all 0.3s ease",
            boxShadow:
              !pizza.base || !pizza.sauce || !pizza.cheese
                ? "none"
                : "0 6px 20px rgba(141, 27, 61, 0.55)",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          Pay & Place Order
        </button>
      </div>
    </div>
  );
}
