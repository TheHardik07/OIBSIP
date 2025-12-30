import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
        email,
      });
      setMessage("Password reset email sent. Check your inbox.");
    } catch {
      setMessage("Failed to send reset email. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #2D2D2D 0%, #8D1B3D 100%)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: "#FAF7F2",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
          border: "1px solid rgba(242, 201, 76, 0.35)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              margin: "0 0 10px 0",
              color: "#8D1B3D",
              letterSpacing: "0.5px",
              fontSize: "28px",
              fontWeight: "600",
            }}
          >
            Reset Password
          </h2>
          <p
            style={{
              margin: "0",
              color: "#2D2D2D",
              fontSize: "16px",
              lineHeight: "1.5",
            }}
          >
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ marginBottom: "30px" }}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "15px",
                border: "2px solid rgba(0,0,0,0.15)",
                borderRadius: "8px",
                fontSize: "16px",
                transition: "border-color 0.3s ease",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#F2C94C")}
              onBlur={(e) => (e.target.style.borderColor = "#e1e5e9")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              background: loading
                ? "#ccc"
                : "linear-gradient(135deg, #F2C94C 0%, #8D1B3D 100%)",
              color: "#2D2D2D",
              boxShadow: "0 10px 30px rgba(141, 27, 61, 0.35)",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              outline: "none",
              marginBottom: "20px",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 15px 40px rgba(141, 27, 61, 0.55)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 10px 30px rgba(141, 27, 61, 0.35)";
              }
            }}
          >
            {loading ? "Sending Reset Link..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              borderRadius: "6px",
              backgroundColor: message.includes("sent")
                ? "rgba(47, 133, 90, 0.15)"
                : "rgba(141, 27, 61, 0.12)",
              border: `1px solid ${
                message.includes("sent")
                  ? "rgba(47, 133, 90, 0.45)"
                  : "rgba(141, 27, 61, 0.45)"
              }`,
              color: message.includes("sent") ? "#2F855A" : "#8D1B3D",
            }}
          >
            {message}
          </div>
        )}

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0",
              color: "#2D2D2D",
              fontSize: "14px",
            }}
          >
            Remember your password?{" "}
            <a
              href="/login"
              style={{
                color: "#8D1B3D",
                textDecoration: "none",
                fontWeight: "500",
              }}
              onMouseEnter={(e) =>
                (e.target.style.textDecoration = "underline")
              }
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Back to Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
