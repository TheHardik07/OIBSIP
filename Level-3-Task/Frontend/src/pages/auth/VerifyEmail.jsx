import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`http://localhost:5002/api/auth/verify/${token}`);
        setMessage("Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } catch {
        setMessage("Verification failed. Please try again.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
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
          <div
            style={{
              fontSize: "48px",
              marginBottom: "20px",
            }}
          >
            {message.includes("Verifying")
              ? "⏳"
              : message.includes("successfully")
              ? "✅"
              : "❌"}
          </div>
          <h2
            style={{
              margin: "0 0 10px 0",
              color: "#333",
              fontSize: "28px",
              fontWeight: "600",
            }}
          >
            Email Verification
          </h2>
          <p
            style={{
              margin: "0",
              color: "#666",
              fontSize: "16px",
              lineHeight: "1.5",
            }}
          >
            {message}
          </p>
        </div>

        {message.includes("Redirecting") && (
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #667eea",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto",
              }}
            ></div>
          </div>
        )}

        <div
          style={{
            marginTop: "30px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0",
              color: "#666",
              fontSize: "14px",
            }}
          >
            <a
              href="/login"
              style={{
                color: "#667eea",
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

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default VerifyEmail;
