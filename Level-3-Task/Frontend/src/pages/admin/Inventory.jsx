import React, { useState, useEffect } from "react";
import axios from "axios";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/inventory`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    const loadInventory = async () => {
      await fetchInventory();
    };
    loadInventory();
  }, []);

  const handleUpdateQuantity = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/inventory/${itemId}`,
        {
          quantity: parseInt(newQuantity),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingItem(null);
      setNewQuantity("");
      fetchInventory();
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2D2D2D 0%, #8D1B3D 100%)",
        padding: "140px 20px 20px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          background: "rgba(250, 247, 242, 0.08)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.55)",
          border: "1px solid rgba(242, 201, 76, 0.35)",
        }}
      >
        <h2
          style={{
            color: "#F2C94C",
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "2.5rem",
            fontWeight: "600",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            letterSpacing: "0.6px",
          }}
        >
          Inventory Management
        </h2>

        <div
          style={{
            background: "rgba(250, 247, 242, 0.12)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "30px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.45)",
            border: "1px solid rgba(242, 201, 76, 0.35)",
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.95rem",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "rgba(242, 201, 76, 0.25)",
                  borderBottom: "2px solid rgba(242, 201, 76, 0.3)",
                }}
              >
                {[
                  "Name",
                  "Category",
                  "Quantity",
                  "Unit",
                  "Price",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    style={{
                      padding: "15px 20px",
                      textAlign: "left",
                      color: "#2D2D2D",
                      fontWeight: "700",
                      fontSize: "1rem",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      borderRight: "1px solid rgba(242, 201, 76, 0.1)",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr
                  key={item._id}
                  style={{
                    background:
                      index % 2 === 0
                        ? "rgba(250, 247, 242, 0.05)"
                        : "rgba(250, 247, 242, 0.08)",
                    borderBottom: "1px solid rgba(242, 201, 76, 0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(141, 27, 61, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      index % 2 === 0
                        ? "rgba(250, 247, 242, 0.05)"
                        : "rgba(250, 247, 242, 0.08)";
                  }}
                >
                  <td
                    style={{
                      padding: "15px 20px",
                      color: "black",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      fontWeight: "600",
                    }}
                  >
                    {item.name}
                  </td>
                  <td
                    style={{
                      padding: "15px 20px",
                      color: "black",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    {item.category}
                  </td>
                  <td style={{ padding: "15px 20px" }}>
                    {editingItem === item._id ? (
                      <input
                        type="number"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "6px",
                          border: "1px solid rgba(242, 201, 76, 0.3)",
                          background: "#FAF7F2",
                          color: "#2D2D2D",
                          fontSize: "0.9rem",
                          width: "80px",
                          outline: "none",
                          textAlign: "center",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#F2C94C")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor =
                            "rgba(242, 201, 76, 0.3)")
                        }
                      />
                    ) : (
                      <span
                        style={{
                          color:
                            item.quantity <= item.minThreshold
                              ? "#8D1B3D"
                              : "black",
                          fontWeight:
                            item.quantity <= item.minThreshold
                              ? "700"
                              : "normal",
                          textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                        }}
                      >
                        {item.quantity}
                        {item.quantity <= item.minThreshold && " ⚠️"}
                      </span>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "15px 20px",
                      color: "black",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    {item.unit}
                  </td>
                  <td
                    style={{
                      padding: "15px 20px",
                      color: "black",
                      fontWeight: "600",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    ₹{item.price}
                  </td>
                  <td style={{ padding: "15px 20px" }}>
                    {editingItem === item._id ? (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => handleUpdateQuantity(item._id)}
                          style={{
                            background:
                              "linear-gradient(135deg, #2F855A 0%, #2D2D2D 100%)",
                            color: "#FAF7F2",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: "0 2px 8px rgba(47, 133, 90, 0.3)",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-1px)";
                            e.target.style.boxShadow =
                              "0 4px 12px rgba(47, 133, 90, 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow =
                              "0 2px 8px rgba(47, 133, 90, 0.3)";
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingItem(null)}
                          style={{
                            background: "#2D2D2D",
                            color: "#FAF7F2",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: "0 2px 8px rgba(45, 45, 45, 0.3)",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-1px)";
                            e.target.style.boxShadow =
                              "0 4px 12px rgba(45, 45, 45, 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow =
                              "0 2px 8px rgba(45, 45, 45, 0.3)";
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingItem(item._id);
                          setNewQuantity(item.quantity);
                        }}
                        style={{
                          background:
                            "linear-gradient(135deg, #F2C94C 0%, #8D1B3D 100%)",
                          color: "#2D2D2D",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontSize: "0.9rem",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          boxShadow: "0 2px 8px rgba(141, 27, 61, 0.3)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "translateY(-1px)";
                          e.target.style.boxShadow =
                            "0 4px 12px rgba(141, 27, 61, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow =
                            "0 2px 8px rgba(141, 27, 61, 0.3)";
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
