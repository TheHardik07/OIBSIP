import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav
      style={{
        padding: "1rem",
        background: "#eee",
        display: "flex",
        gap: "1rem",
      }}
    >
      <Link to="/">Home</Link>

      {user ? (
        <>
          {user.role === "user" && (
            <Link to="/user/dashboard">User Dashboard</Link>
          )}
          {user.role === "admin" && (
            <Link to="/admin/dashboard">Admin Dashboard</Link>
          )}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
