import React from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2D2D2D 0%, #8D1B3D 100%)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "120px 20px 20px 20px", // Increased top padding for better navbar separation
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            background: "#FAF7F2",
            padding: "40px",
            borderRadius: "15px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
            border: "1px solid rgba(242, 201, 76, 0.35)",
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
              🍕
            </div>
            <h2
              style={{
                margin: "0 0 10px 0",
                color: "#8D1B3D",
                letterSpacing: "0.5px",
                fontSize: "32px",
                fontWeight: "600",
              }}
            >
              Welcome back, {user.name}!
            </h2>
            <p
              style={{
                margin: "0",
                color: "#2D2D2D",
                fontSize: "18px",
              }}
            >
              Ready to craft your perfect pizza?
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "40px",
            }}
          >
            {[
              {
                name: "Build Your Pizza",
                desc: "Customize your perfect pizza with our builder",
                image:
                  "data:image/jpeg;base64,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",
                link: "/user/pizza-builder",
                gradient: "linear-gradient(135deg, #F2C94C 0%, #8D1B3D 100%)",
                color: "#2D2D2D",
                boxShadow: "0 10px 25px rgba(141, 27, 61, 0.35)",
                hoverShadow: "0 18px 45px rgba(141, 27, 61, 0.55)",
              },
              {
                name: "Your Orders",
                desc: "Track your pizza orders and history",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL6ngeAZmXi7rJjK7E2FV064F9fA3nENECQ&s",
                link: "/user/orders",
                gradient: "linear-gradient(135deg, #2F855A 0%, #2D2D2D 100%)",
                color: "#FAF7F2",
                boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                hoverShadow: "0 18px 45px rgba(0,0,0,0.55)",
              },
            ].map((card, index) => (
              <Link
                key={index}
                to={card.link}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: card.gradient,
                    color: card.color,
                    padding: "30px 20px",
                    borderRadius: "12px",
                    textAlign: "center",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                    border: "none",
                    boxShadow: card.boxShadow,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = card.hoverShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = card.boxShadow;
                  }}
                >
                  <div className="emoji-feature">
                    <img src={card.image} alt={card.name} />
                  </div>
                  <h3
                    style={{
                      margin: "0 0 10px 0",
                      fontSize: "20px",
                      fontWeight: "700",
                      letterSpacing: "0.4px",
                    }}
                  >
                    {card.name}
                  </h3>
                  <p style={{ margin: "0", fontSize: "14px", opacity: "0.95" }}>
                    {card.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
