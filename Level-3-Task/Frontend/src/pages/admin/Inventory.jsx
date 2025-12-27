import React, { useState, useEffect } from "react";
import axios from "axios";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/admin/inventory",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleUpdateQuantity = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/inventory/${itemId}`,
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
    <div className="inventory">
      <h2>Inventory Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>
                {editingItem === item._id ? (
                  <input
                    type="number"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                  />
                ) : (
                  item.quantity
                )}
              </td>
              <td>{item.unit}</td>
              <td>₹{item.price}</td>
              <td>
                {editingItem === item._id ? (
                  <>
                    <button onClick={() => handleUpdateQuantity(item._id)}>
                      Save
                    </button>
                    <button onClick={() => setEditingItem(null)}>Cancel</button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setEditingItem(item._id);
                      setNewQuantity(item.quantity);
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
  );
};

export default Inventory;
