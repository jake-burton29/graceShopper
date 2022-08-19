import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logout } from "../axios-services/users";
import { Navbar, Nav, Container } from "react-bootstrap";

// use Link or NavLink from react-router-dom

export default function NavBar() {
  const { user, setUser } = useAuth();

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/">Home</Link>
          <Nav className="me-auto">
            <Link to="/cart">🛒Cart</Link>
            {user ? <Link to="/profile">👤{user.username}</Link> : null}
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
            <Link to="/register">Register</Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
