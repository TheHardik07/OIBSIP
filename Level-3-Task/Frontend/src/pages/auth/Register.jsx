import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData
      );
      setMessage(
        "Registration successful! Please check your email to verify your account."
      );
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
          border: "1px solid rgba(242, 201, 76, 0.35)",
          padding: "40px",
          borderRadius: "15px",
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
            Create Account
          </h2>
          <p
            style={{
              margin: "0",
              color: "#2D2D2D",
              fontSize: "16px",
            }}
          >
            Join us for delicious pizzas!
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
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

          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
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

          <div style={{ marginBottom: "30px" }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
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
                e.target.style.boxShadow = "none";
              }
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {message && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              borderRadius: "6px",
              backgroundColor: message.includes("successful")
                ? "rgba(47, 133, 90, 0.15)"
                : "rgba(141, 27, 61, 0.12)",
              border: `1px solid ${
                message.includes("successful")
                  ? "rgba(47, 133, 90, 0.45)"
                  : "rgba(141, 27, 61, 0.45)"
              }`,
              color: message.includes("successful") ? "#2F855A" : "#8D1B3D",
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
            Already have an account?{" "}
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
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
