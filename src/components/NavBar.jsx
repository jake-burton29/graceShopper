import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logout } from "../axios-services/users";

export default function NavBar() {
  const { user, setUser } = useAuth();

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        {user ? <Link to="/profile">{user.username}</Link> : null}
        {user ? (
          <Link
            to="/login"
            onClick={async () => {
              logout();
              setUser(null);
            }}
          >
            Logout
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        {!user ? <Link to="/register"> Register </Link> : null}
      </nav>
    </div>
  );
}
