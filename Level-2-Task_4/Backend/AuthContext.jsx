import { createContext, useState, useEffect, useContext } from "react";
import API from "../services/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Persist user state from token on reload
        // TODO: Update backend to include 'role' in token. Defaulting to 'user' for now.
        setUser({ ...decoded, role: decoded.role || "user" });
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const { data } = await API.post("/login", { username, password });
    localStorage.setItem("token", data.token);

    const decoded = jwtDecode(data.token);
    // Temporary logic: If username has 'admin', treat as admin.
    const role = username.toLowerCase().includes("admin") ? "admin" : "user";
    setUser({ ...decoded, username, role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
