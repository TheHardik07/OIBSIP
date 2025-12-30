import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const featureGradients = [
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  ];

  const features = [
    {
      name: "Custom Pizza Builder",
      image:
        "https://c8.alamy.com/comp/2BHJ0E1/top-view-of-pizza-for-kids-in-a-form-of-funny-face-great-image-for-your-needs-2BHJ0E1.jpg",
      desc: "Design your perfect pizza with our intuitive builder. Choose from premium toppings, sauces, and crusts to create something unique.",
    },
    {
      name: "Lightning Fast Delivery",
      image:
        "https://www.shutterstock.com/image-photo/fast-delivery-service-concept-young-260nw-2028117452.jpg",
      desc: "Hot and fresh pizzas delivered to your doorstep in under 30 minutes. Track your order in real-time from kitchen to door.",
    },
    {
      name: "Premium Ingredients",
      image:
        "data:image/jpeg;base64,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",
      desc: "Only the finest, freshest ingredients make it onto our pizzas. From farm-fresh vegetables to artisanal cheeses and meats.",
    },
  ];

  return (
    <div
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      {/* Hero Section */}
      <section
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #F2C94C 0%, #2F855A 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            zIndex: 1,
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            textAlign: "center",
            color: "white",
            zIndex: 2,
            position: "relative",
          }}
        >
          <div className="emoji-hero">🍕</div>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: "700",
              margin: "0 0 20px 0",
              textShadow: "0 4px 8px rgba(0,0,0,0.3)",
              lineHeight: "1.2",
            }}
          >
            Welcome to <span style={{ color: "#8D1B3D" }}>Pizza Palace</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              margin: "0 0 40px 0",
              opacity: "0.9",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: "1.6",
            }}
          >
            Craft your perfect pizza with our interactive builder. Fresh
            ingredients, fast delivery, and unforgettable flavors await you!
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/register">
              <button
                style={{
                  background:
                    "linear-gradient(135deg, #FF6B6B 0%, #FFA500 100%)",
                  color: "white",
                  border: "none",
                  padding: "15px 40px",
                  borderRadius: "50px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 25px rgba(255, 107, 107, 0.3)",
                  textDecoration: "none",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow =
                    "0 12px 35px rgba(255, 107, 107, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 8px 25px rgba(255, 107, 107, 0.3)";
                }}
              >
                Start Building
              </button>
            </Link>

            <Link to="/login">
              <button
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  padding: "15px 40px",
                  borderRadius: "50px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                  textDecoration: "none",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.2)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
                  e.target.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: "80px 20px",
          background: "white",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#8D1B3D",
              marginBottom: "60px",
            }}
          >
            Why Choose Pizza Palace?
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "40px",
            }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  padding: "40px 20px",
                  borderRadius: "15px",
                  background: featureGradients[index],
                  color: "white",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-10px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <div className="emoji-feature">
                  <img src={feature.image} alt={feature.name} />
                </div>
                <h3 style={{ fontSize: "1.5rem", margin: "0 0 15px 0" }}>
                  {feature.name}
                </h3>
                <p style={{ margin: 0, opacity: 0.9, lineHeight: "1.6" }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Pizzas Preview */}
      <section
        style={{
          padding: "80px 20px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          textAlign: "center",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#8D1B3D",
            }}
          >
            Popular Favorites
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              marginBottom: "60px",
              opacity: 0.9,
            }}
          >
            Try our customer favorites or create your own masterpiece
          </p>

          <div
            style={{
              display: "grid",
              //   gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "30px",
            }}
          >
            {[
              {
                name: "Margherita",
                emoji: (
                  <img
                    src="data:image/jpeg;base64,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"
                    alt=""
                  />
                ),
                desc: "Fresh tomatoes, mozzarella, basil",
              },
              {
                name: "Pepperoni",
                emoji: (
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROHspWXnS9Xi0-ZRmPo0ClM0Wrv1fYWqq9eQ&s"
                    alt=""
                    srcset=""
                  />
                ),
                desc: "Spicy pepperoni, cheese, tomato sauce",
              },
              {
                name: "BBQ Chicken",
                emoji: (
                  <img
                    src="https://www.allrecipes.com/thmb/qZ7LKGV1_RYDCgYGSgfMn40nmks=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-24878-bbq-chicken-pizza-beauty-4x3-39cd80585ad04941914dca4bd82eae3d.jpg"
                    alt=""
                    srcset=""
                  />
                ),
                desc: "Grilled chicken, BBQ sauce, onions",
              },
              {
                name: "Veggie Supreme",
                emoji: (
                  <img
                    src="data:image/jpeg;base64,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"
                    alt=""
                    srcset=""
                  />
                ),
                desc: "Mixed vegetables, cheese, herbs",
              },
            ].map((pizza, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "15px",
                  padding: "30px 20px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <div className="emoji-pizza">{pizza.emoji}</div>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    margin: "0 0 10px 0",
                    fontWeight: "600",
                  }}
                >
                  {pizza.name}
                </h3>
                <p style={{ margin: 0, opacity: 0.8, fontSize: "0.9rem" }}>
                  {pizza.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        style={{
          padding: "80px 20px",
          background: "white",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#8D1B3D",
              marginBottom: "20px",
            }}
          >
            Ready to Experience Pizza Perfection?
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#666",
              marginBottom: "40px",
              lineHeight: "1.6",
            }}
          >
            Join thousands of satisfied customers who have discovered their
            perfect pizza with Pizza Palace.
          </p>

          <Link to="/register">
            <button
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                padding: "18px 50px",
                borderRadius: "50px",
                fontSize: "1.2rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                textDecoration: "none",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow =
                  "0 12px 35px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 8px 25px rgba(102, 126, 234, 0.3)";
              }}
            >
              Create Your Account
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#2F855A",
          color: "white",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF6B6B 0%, #FFA500 100%)",
                display: "flex",
                color: "black",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="emoji-footer">
                <i class="fa-solid fa-pizza-slice"></i>{" "}
              </span>
            </div>
            <h3
              style={{
                margin: 0,
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#8D1B3D",
              }}
            >
              Pizza Palace
            </h3>
          </div>

          <p style={{ margin: "0 0 20px 0", opacity: 0.8 }}>
            © 2025 Pizza Palace. All rights reserved. Made with{" "}
            <span style={{ fontWeight: "700", fontStyle: "italic" }}>love</span>{" "}
            for pizza lovers.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/login"
              style={{ color: "#8D1B3D", textDecoration: "none" }}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              style={{ color: "#8D1B3D", textDecoration: "none" }}
            >
              Sign Up
            </Link>
            <a
              href="#"
              style={{ color: "#8D1B3D", textDecoration: "none" }}
              onClick={(e) => e.preventDefault()}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              style={{ color: "#8D1B3D", textDecoration: "none" }}
              onClick={(e) => e.preventDefault()}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
