const display = document.getElementById("display");
const smallDisplay = document.getElementById("smalldisplay");
const buttons = document.querySelectorAll("button");
const toggle = document.getElementById("themeToggle");

let current = "";
let calculated = false;
const operators = ["+", "-", "X", "/", "%"];

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;

    // Clear
    if (button.classList.contains("btn-clear")) {
      current = "";
      display.innerText = "0";
      smallDisplay.innerText = "";
      return;
    }

    // Delete
    if (button.classList.contains("btn-delete")) {
      current = current.slice(0, -1);
      display.innerText = current || "0";
      return;
    }

    // Equals
    if (button.classList.contains("btn-equals")) {
      try {
        const result = eval(current.replace(/X/g, "*"));
        smallDisplay.innerText = current;
        display.innerText = result;
        current = result.toString();
        calculated = true;
      } catch {
        display.innerText = "Error";
        current = "";
      }
      return;
    }

    // Prevent double operators
    if (operators.includes(value) && operators.includes(current.slice(-1))) {
      return;
    }

    // Reset after calculation
    if (calculated && !operators.includes(value)) {
      current = "";
      calculated = false;
    }

    current += value;
    display.innerText = current;
  });
});

// Theme toggle
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});
