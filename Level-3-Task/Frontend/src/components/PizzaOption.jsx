export default function PizzaOption({ label, selected, onClick, price }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 16px",
        margin: "8px",
        borderRadius: "8px",
        border: selected ? "2px solid #4CAF50" : "1px solid #ddd",
        background: selected ? "#e8f5e9" : "#fff",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: selected ? "bold" : "normal",
        color: selected ? "#2e7d32" : "#333",
        transition: "all 0.2s ease",
        boxShadow: selected
          ? "0 2px 4px rgba(76, 175, 80, 0.2)"
          : "0 1px 2px rgba(0,0,0,0.1)",
        minWidth: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <span>{label}</span>
      {price && (
        <span style={{ fontSize: "0.9rem", color: "#666" }}>₹{price}</span>
      )}
    </button>
  );
}
