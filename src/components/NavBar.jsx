import React from "react";
import useAuth from "../hooks/useAuth";
import { logout } from "../axios-services/users";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";

// use Link or NavLink from react-router-dom

export default function NavBar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <Navbar bg="dark" variant="dark" className="size">
        <Container>
          <Nav className="me-auto">
            <Stack direction="horizontal" gap={3}>
              <Button onClick={() => navigate("/")} className="">
                Home
              </Button>
              <Button onClick={() => navigate("/cart")} className="ms-auto">
                🛒Cart
              </Button>
              {user ? (
                <Button onClick={() => navigate("/profile")} className="">
                  👤{user.username}
                </Button>
              ) : (
                <Button onClick={() => navigate("/register")} className="">
                  Register
                </Button>
              )}

              {user ? (
                <Button
                  className=""
                  onClick={async () => {
                    logout();
                    setUser(null);
                    navigate("/login");
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button onClick={() => navigate("/login")} className="">
                  Login
                </Button>
              )}
            </Stack>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
