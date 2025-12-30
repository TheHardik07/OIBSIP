import axios from "axios";

export const startPayment = async (pizza, amount, token, user, navigate) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/orders/create-payment`,
      { amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const options = {
      key: "rzp_test_your_key_here", // Replace with your Razorpay test key
      amount: data.amount,
      currency: "INR",
      name: "Pizza Palace",
      description: "Custom Pizza Order",
      order_id: data.id,
      handler: async function (response) {
        try {
          const confirmResponse = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/orders/confirm`,
            {
              pizza,
              amount,
              deliveryAddress: "From Pizza Builder", // Placeholder address
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          // Navigate to order placed screen with order details
          navigate("/order-placed", {
            state: { orderId: confirmResponse.data.orderId },
          });
        } catch (error) {
          alert(
            "Payment successful but order confirmation failed. Please contact support."
          );
          console.error("Order confirmation error:", error);
        }
      },
      prefill: {
        name: user?.name || "Pizza Lover",
        email: user?.email || "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#8D1B3D", // Wine Red
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    alert("Failed to initiate payment. Please try again.");
    console.error("Payment initiation error:", error);
  }
};
