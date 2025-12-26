const API = "http://localhost:5000/api";

async function register(e) {
  e.preventDefault();

  const username = regUser.value.trim();
  const password = regPass.value.trim();

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Registration failed");
    return;
  }

  alert("Registration successful");
  window.location.href = "login.html";
}

async function login(e) {
  e.preventDefault();

  const username = loginUser.value.trim();
  const password = loginPass.value.trim();

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Login failed");
    return;
  }

  localStorage.setItem("token", data.token);
  window.location.href = "dashboard.html";
}

function protectPage() {
  if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
  }
}

async function getDashboard() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/dashboard`, {
    headers: { Authorization: token },
  });

  const data = await res.json();

  document.getElementById("dashboardData").innerText = data.message;
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
