import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function NavBar() {
  const { user, setUser } = useAuth();

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/profile">Profile</Link>
        {user ? (
          <Link
            to="/login"
            onClick={() => {
              axios({
                method: "post",
                url: "/users/logout",
              });
              setUser(null);
            }}
          >
            Logout
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </div>
  );
}
