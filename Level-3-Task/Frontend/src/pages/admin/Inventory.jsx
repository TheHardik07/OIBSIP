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
        "http://localhost:5002/api/admin/inventory",
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
        `http://localhost:5002/api/admin/inventory/${itemId}`,
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
        background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
        padding: "120px 20px 20px 20px", // Increased top padding for better navbar separation
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        <h2
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "2.5rem",
            fontWeight: "300",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Inventory Management
        </h2>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "30px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
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
                  background: "rgba(255, 255, 255, 0.1)",
                  borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
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
                      color: "white",
                      fontWeight: "600",
                      fontSize: "1rem",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      borderRight: "1px solid rgba(255, 255, 255, 0.1)",
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
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(255, 255, 255, 0.08)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      index % 2 === 0
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(255, 255, 255, 0.08)";
                  }}
                >
                  <td
                    style={{
                      padding: "15px 20px",
                      color: "white",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      fontWeight: "500",
                    }}
                  >
                    {item.name}
                  </td>
                  <td
                    style={{
                      padding: "15px 20px",
                      color: "rgba(255, 255, 255, 0.9)",
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
                          border: "1px solid rgba(255, 255, 255, 0.3)",
                          background: "rgba(255, 255, 255, 0.1)",
                          color: "white",
                          fontSize: "0.9rem",
                          width: "80px",
                          outline: "none",
                          textAlign: "center",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor =
                            "rgba(255, 255, 255, 0.6)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor =
                            "rgba(255, 255, 255, 0.3)")
                        }
                      />
                    ) : (
                      <span
                        style={{
                          color:
                            item.quantity <= item.minThreshold
                              ? "#e74c3c"
                              : "white",
                          fontWeight:
                            item.quantity <= item.minThreshold
                              ? "600"
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
                      color: "rgba(255, 255, 255, 0.9)",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    {item.unit}
                  </td>
                  <td
                    style={{
                      padding: "15px 20px",
                      color: "white",
                      fontWeight: "500",
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
                              "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
                            color: "white",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: "0 2px 8px rgba(39, 174, 96, 0.3)",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-1px)";
                            e.target.style.boxShadow =
                              "0 4px 12px rgba(39, 174, 96, 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow =
                              "0 2px 8px rgba(39, 174, 96, 0.3)";
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingItem(null)}
                          style={{
                            background:
                              "linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)",
                            color: "white",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: "0 2px 8px rgba(149, 165, 166, 0.3)",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-1px)";
                            e.target.style.boxShadow =
                              "0 4px 12px rgba(149, 165, 166, 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow =
                              "0 2px 8px rgba(149, 165, 166, 0.3)";
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
                            "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
                          color: "white",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontSize: "0.9rem",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          boxShadow: "0 2px 8px rgba(52, 152, 219, 0.3)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "translateY(-1px)";
                          e.target.style.boxShadow =
                            "0 4px 12px rgba(52, 152, 219, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow =
                            "0 2px 8px rgba(52, 152, 219, 0.3)";
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
