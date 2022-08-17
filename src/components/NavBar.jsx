import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logout } from "../axios-services/users";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function NavBar() {
  const { user, setUser } = useAuth();

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/cart">Cart</Nav.Link>
            {user ? (
              <Nav.Link href="/profile"> {user.username}Profile</Nav.Link>
            ) : null}
            {user ? (
              <Nav.Link
                href="/login"
                onClick={async () => {
                  logout();
                  setUser(null);
                }}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
