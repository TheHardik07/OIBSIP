import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [lowStockAlerts, setLowStockAlerts] = useState([]);

  useEffect(() => {
    const fetchLowStockAlerts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/inventory/low-stock`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLowStockAlerts(res.data || []);
      } catch (err) {
        console.error("Low stock error:", err);
      }
    };

    fetchLowStockAlerts();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2D2D2D 0%, #8D1B3D 100%)",
        padding: "120px 20px 40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            background: "#FAF7F2",
            padding: "40px",
            margin: "40px",
            borderRadius: "16px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
            border: "1px solid rgba(242,201,76,0.35)",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>🛠️</div>
          <h2
            style={{
              margin: "0 0 10px",
              color: "#8D1B3D",
              fontSize: "32px",
              fontWeight: "700",
            }}
          >
            Admin Dashboard
          </h2>
          <p style={{ margin: 0, color: "#2D2D2D", fontSize: "18px" }}>
            Manage inventory, orders, and operations
          </p>
        </div>

        {/* Admin Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          {[
            {
              title: "Manage Inventory",
              desc: "Stock levels, pricing & alerts",
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMUu6de6LP1VFjsx77JpSmNelIESwzDWZP-w&s",
              link: "/admin/inventory",
              gradient: "linear-gradient(135deg, #F2C94C 0%, #8D1B3D 100%)",
              color: "#FAF7F2",
              shadow: "0 10px 25px rgba(141,27,61,0.35)",
              hover: "0 18px 45px rgba(141,27,61,0.55)",
            },
            {
              title: "Manage Orders",
              desc: "Track & update order status",
              image:
                "https://elluminatimedia.s3.us-west-2.amazonaws.com/wp-content/uploads/2023/oos/pzordsytm/pizzaorderingsystem.png",
              link: "/admin/orders",
              gradient: "linear-gradient(135deg, #2F855A 0%, #2D2D2D 100%)",
              color: "#FAF7F2",
              shadow: "0 10px 25px rgba(0,0,0,0.35)",
              hover: "0 18px 45px rgba(0,0,0,0.55)",
            },
          ].map((card, i) => (
            <Link key={i} to={card.link} style={{ textDecoration: "none" }}>
              <div
                className="dashboard-card"
                style={{
                  background: card.gradient,
                  color: card.color,
                  padding: "30px 20px",
                  borderRadius: "14px",
                  textAlign: "center",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: card.shadow,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = card.hover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = card.shadow;
                }}
              >
                <div className="dashboard-card-img">
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{ borderRadius: "50%" }}
                  />
                </div>

                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ margin: 0, fontSize: "14px", opacity: 0.95 }}>
                  {card.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Low Stock Alerts */}
        {lowStockAlerts.length > 0 && (
          <div
            style={{
              background: "#FAF7F2",
              borderRadius: "14px",
              padding: "25px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.35)",
              border: "1px solid rgba(242,201,76,0.35)",
            }}
          >
            <h3
              style={{
                margin: "0 0 20px",
                color: "#8D1B3D",
                fontSize: "22px",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              ⚠️ Low Stock Alerts
            </h3>

            <div style={{ display: "grid", gap: "14px" }}>
              {lowStockAlerts.map((item) => (
                <div
                  key={item._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "rgba(242,201,76,0.12)",
                    padding: "14px 18px",
                    borderRadius: "10px",
                    border: "1px solid rgba(141,27,61,0.25)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: "700",
                        color: "#2D2D2D",
                        fontSize: "16px",
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#2D2D2D",
                        opacity: 0.7,
                      }}
                    >
                      {item.unit}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        color: "#8D1B3D",
                        fontWeight: "700",
                        fontSize: "16px",
                      }}
                    >
                      {item.quantity} left
                    </div>
                    <div
                      style={{
                        color: "#2F855A",
                        fontSize: "13px",
                      }}
                    >
                      Min: {item.minThreshold}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
