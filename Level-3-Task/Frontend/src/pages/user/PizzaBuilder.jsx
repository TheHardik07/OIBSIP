import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import PizzaOption from "../../components/PizzaOption";
import StepHeader from "../../components/StepHeader";
import ReviewPizza from "../../components/ReviewPizza";
import {
  getBases,
  getSauces,
  getCheeses,
  getVeggies,
} from "../../services/inventoryService";

export default function PizzaBuilder() {
  const { pizza, setPizza, addToCart } = useContext(CartContext);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [bases, setBases] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [veggies, setVeggies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const [basesRes, saucesRes, cheesesRes, veggiesRes] = await Promise.all(
          [getBases(), getSauces(), getCheeses(), getVeggies()]
        );
        setBases(basesRes.data);
        setSauces(saucesRes.data);
        setCheeses(cheesesRes.data);
        setVeggies(veggiesRes.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIngredients();
  }, []);

  const toggleVeggie = (veg) => {
    setPizza({
      ...pizza,
      veggies: pizza.veggies.includes(veg)
        ? pizza.veggies.filter((v) => v !== veg)
        : [...pizza.veggies, veg],
    });
  };

  const calculateTotal = () => {
    let total = 0;
    if (pizza.base) {
      const base = bases.find((b) => b.name === pizza.base);
      if (base) total += base.price;
    }
    if (pizza.sauce) {
      const sauce = sauces.find((s) => s.name === pizza.sauce);
      if (sauce) total += sauce.price;
    }
    if (pizza.cheese) {
      const cheese = cheeses.find((c) => c.name === pizza.cheese);
      if (cheese) total += cheese.price;
    }
    pizza.veggies.forEach((v) => {
      const veg = veggies.find((veg) => veg.name === v);
      if (veg) total += veg.price;
    });
    return total;
  };

  const handleProceedToPayment = () => {
    const totalPrice = calculateTotal();
    const pizzaItem = {
      id: Date.now(),
      name: "Custom Pizza",
      base: pizza.base,
      sauce: pizza.sauce,
      cheese: pizza.cheese,
      veggies: pizza.veggies,
      price: totalPrice,
    };
    addToCart(pizzaItem);
    navigate("/checkout");
  };

  const renderOptions = (
    options,
    selectedValue,
    onSelect,
    multiSelect = false
  ) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "12px",
        marginTop: "16px",
      }}
    >
      {options.map((option) => (
        <PizzaOption
          key={option.name}
          label={option.name}
          selected={
            multiSelect
              ? selectedValue.includes(option.name)
              : selectedValue === option.name
          }
          onClick={() => onSelect(option.name)}
          price={option.price}
        />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "4px solid rgba(255, 255, 255, 0.3)",
              borderTop: "4px solid white",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px auto",
            }}
          ></div>
          <p
            style={{
              color: "white",
              fontSize: "1.2rem",
              margin: "0",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Loading delicious ingredients...
          </p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "120px 20px 20px 20px", // Increased top padding for better navbar separation
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        {/* Progress Indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          {[
            { num: 1, label: "Base" },
            { num: 2, label: "Sauce" },
            { num: 3, label: "Cheese" },
            { num: 4, label: "Veggies" },
            { num: 5, label: "Review" },
          ].map((stepInfo) => (
            <div
              key={stepInfo.num}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background:
                    step >= stepInfo.num
                      ? "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)"
                      : "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease",
                  boxShadow:
                    step >= stepInfo.num
                      ? "0 4px 15px rgba(76, 175, 80, 0.3)"
                      : "none",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                {stepInfo.num}
              </div>
              <span
                style={{
                  color:
                    step >= stepInfo.num ? "white" : "rgba(255, 255, 255, 0.6)",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                  textAlign: "center",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                {stepInfo.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "30px",
            marginBottom: "30px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            minHeight: "300px",
          }}
        >
          {step === 1 && (
            <>
              <StepHeader title="Choose Your Perfect Base" />
              {renderOptions(bases, pizza.base, (value) =>
                setPizza({ ...pizza, base: value })
              )}
            </>
          )}

          {step === 2 && (
            <>
              <StepHeader title="Select Your Favorite Sauce" />
              {renderOptions(sauces, pizza.sauce, (value) =>
                setPizza({ ...pizza, sauce: value })
              )}
            </>
          )}

          {step === 3 && (
            <>
              <StepHeader title="Pick Your Cheese" />
              {renderOptions(cheeses, pizza.cheese, (value) =>
                setPizza({ ...pizza, cheese: value })
              )}
            </>
          )}

          {step === 4 && (
            <>
              <StepHeader title="Add Some Veggies (Optional)" />
              {renderOptions(veggies, pizza.veggies, toggleVeggie, true)}
            </>
          )}

          {step === 5 && (
            <ReviewPizza
              pizza={pizza}
              totalPrice={calculateTotal()}
              onProceed={handleProceedToPayment}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            style={{
              padding: "12px 25px",
              background:
                step === 1
                  ? "rgba(255, 255, 255, 0.2)"
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "25px",
              cursor: step === 1 ? "not-allowed" : "pointer",
              fontSize: "1rem",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow:
                step === 1 ? "none" : "0 4px 15px rgba(102, 126, 234, 0.3)",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              minWidth: "100px",
            }}
            onMouseEnter={(e) => {
              if (step !== 1) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 6px 20px rgba(102, 126, 234, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (step !== 1) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 4px 15px rgba(102, 126, 234, 0.3)";
              }
            }}
          >
            ← Back
          </button>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              padding: "8px 20px",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: "1rem",
                fontWeight: "600",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              Step {step} of 5
            </span>
          </div>

          <button
            onClick={() => setStep(step + 1)}
            disabled={step === 5}
            style={{
              padding: "12px 25px",
              background:
                step === 5
                  ? "rgba(255, 255, 255, 0.2)"
                  : "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
              color: "white",
              border: "none",
              borderRadius: "25px",
              cursor: step === 5 ? "not-allowed" : "pointer",
              fontSize: "1rem",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow:
                step === 5 ? "none" : "0 4px 15px rgba(76, 175, 80, 0.3)",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              minWidth: "100px",
            }}
            onMouseEnter={(e) => {
              if (step !== 5) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(76, 175, 80, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (step !== 5) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(76, 175, 80, 0.3)";
              }
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
