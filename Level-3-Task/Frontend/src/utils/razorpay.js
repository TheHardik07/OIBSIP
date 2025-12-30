import axios from "axios";

export const startPayment = async (pizza, amount, token) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5002/api/orders/create-payment",
      { amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const options = {
      key: "rzp_test_your_key_here", // Replace with your test key
      amount: data.amount,
      currency: "INR",
      name: "Pizza App",
      description: "Custom Pizza Order",
      order_id: data.id,
      handler: async function () {
        try {
          await axios.post(
            "http://localhost:5002/api/orders/confirm",
            { pizza, amount },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert("Order Placed Successfully! 🍕");
          window.location.href = "/user/orders";
        } catch (error) {
          alert(
            "Payment successful but order confirmation failed. Please contact support.",
            error
          );
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#4CAF50",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    alert("Failed to initiate payment. Please try again.");
    console.error("Payment initiation error:", error);
  }
};
