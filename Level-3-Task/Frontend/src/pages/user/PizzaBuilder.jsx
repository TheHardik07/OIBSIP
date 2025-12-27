import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PizzaBuilder = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/pizza/ingredients",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIngredients(response.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  const handleIngredientToggle = (ingredient) => {
    setSelectedIngredients((prev) => {
      const isSelected = prev.find((item) => item._id === ingredient._id);
      if (isSelected) {
        setTotalPrice((prevTotal) => prevTotal - ingredient.price);
        return prev.filter((item) => item._id !== ingredient._id);
      } else {
        setTotalPrice((prevTotal) => prevTotal + ingredient.price);
        return [...prev, ingredient];
      }
    });
  };

  const handleCheckout = () => {
    // For now, navigate to a checkout page (to be implemented)
    navigate("/checkout", { state: { selectedIngredients, totalPrice } });
  };

  return (
    <div className="pizza-builder">
      <h2>Build Your Pizza</h2>
      <div className="ingredients-list">
        {ingredients.map((ingredient) => (
          <div key={ingredient._id} className="ingredient-item">
            <input
              type="checkbox"
              id={ingredient._id}
              onChange={() => handleIngredientToggle(ingredient)}
            />
            <label htmlFor={ingredient._id}>
              {ingredient.name} - ₹{ingredient.price}
            </label>
          </div>
        ))}
      </div>
      <div className="total-price">
        <h3>Total: ₹{totalPrice}</h3>
      </div>
      <button
        onClick={handleCheckout}
        disabled={selectedIngredients.length === 0}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default PizzaBuilder;
