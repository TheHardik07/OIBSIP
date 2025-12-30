import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect based on role
      if (response.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
            Welcome Back
          </h2>
          <p
            style={{
              margin: "0",
              color: "#2D2D2D",
              fontSize: "16px",
            }}
          >
            Sign in to your account
          </p>
        </div>

        {error && (
          <div
            style={{
              marginBottom: "20px",
              padding: "12px",
              borderRadius: "6px",
              backgroundColor: "rgba(141, 27, 61, 0.12)",
              border: "1px solid rgba(141, 27, 61, 0.4)",
              color: "#8D1B3D",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
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
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
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
                e.target.style.boxShadow = "none";
              }
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <p
            style={{
              margin: "0 0 10px 0",
              color: "#2D2D2D",
              fontSize: "14px",
            }}
          >
            <a
              href="/forgot-password"
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
              Forgot your password?
            </a>
          </p>
          <p
            style={{
              margin: "0",
              color: "#2D2D2D",
              fontSize: "14px",
            }}
          >
            Don't have an account?{" "}
            <a
              href="/register"
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
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
