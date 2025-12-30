export default function ReviewPizza({ pizza, totalPrice, onProceed }) {
  const handlePayment = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to place an order");
      return;
    }
    // Import the payment function dynamically to avoid circular imports
    import("../utils/razorpay").then(({ startPayment }) => {
      startPayment(pizza, totalPrice, token);
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        marginTop: "20px",
      }}
    >
      <h3 style={{ marginBottom: "16px", color: "#333" }}>Review Your Pizza</h3>

      <div style={{ marginBottom: "12px" }}>
        <p style={{ margin: "8px 0", fontSize: "1.1rem" }}>
          <strong>Base:</strong>{" "}
          <span style={{ color: pizza.base ? "#2e7d32" : "#999" }}>
            {pizza.base || "Not selected"}
          </span>
        </p>
        <p style={{ margin: "8px 0", fontSize: "1.1rem" }}>
          <strong>Sauce:</strong>{" "}
          <span style={{ color: pizza.sauce ? "#2e7d32" : "#999" }}>
            {pizza.sauce || "Not selected"}
          </span>
        </p>
        <p style={{ margin: "8px 0", fontSize: "1.1rem" }}>
          <strong>Cheese:</strong>{" "}
          <span style={{ color: pizza.cheese ? "#2e7d32" : "#999" }}>
            {pizza.cheese || "Not selected"}
          </span>
        </p>
        <p style={{ margin: "8px 0", fontSize: "1.1rem" }}>
          <strong>Veggies:</strong>{" "}
          <span
            style={{ color: pizza.veggies.length > 0 ? "#2e7d32" : "#999" }}
          >
            {pizza.veggies.length > 0
              ? pizza.veggies.join(", ")
              : "None selected"}
          </span>
        </p>
      </div>

      {totalPrice && (
        <div
          style={{
            borderTop: "1px solid #ddd",
            paddingTop: "12px",
            marginTop: "16px",
          }}
        >
          <p
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: "#d32f2f",
              textAlign: "center",
            }}
          >
            Total Price: ₹{totalPrice}
          </p>
        </div>
      )}

      {onProceed && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={handlePayment}
            disabled={!pizza.base || !pizza.sauce || !pizza.cheese}
            style={{
              padding: "12px 24px",
              backgroundColor:
                !pizza.base || !pizza.sauce || !pizza.cheese
                  ? "#ccc"
                  : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor:
                !pizza.base || !pizza.sauce || !pizza.cheese
                  ? "not-allowed"
                  : "pointer",
              fontSize: "1.1rem",
              fontWeight: "bold",
              transition: "background-color 0.2s",
            }}
          >
            Pay & Place Order
          </button>
        </div>
      )}
    </div>
  );
}
