import React from "react";
import useAuth from "../hooks/useAuth";
import { logout } from "../axios-services/users";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";
import logo from "../netTech.png";
import { Cart4 } from "react-bootstrap-icons";
// use Link or NavLink from react-router-dom

export default function NavBar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <Navbar
        variant="dark"
        style={{
          backgroundColor: "#434343",
        }}
      >
        <img
          id="logo"
          src={logo}
          alt="Net Tech Inc Home"
          onClick={() => navigate("/")}
          className="me-auto"
          style={{
            maxHeight: "10vh",
            maxWidth: "10vw",
            backgroundColor: "#434343",
            border: "#434343",
          }}
        />
        <Nav>
          <Stack direction="horizontal" gap={4}>
            <Button
              onClick={() => navigate("/cart")}
              className=""
              style={{
                fontSize: "20px",
                backgroundColor: "#434343",
                border: "#434343",
              }}
            >
              <Cart4 />
              Cart
            </Button>
            {user ? (
              <Button
                onClick={() => navigate("/profile")}
                className=""
                style={{
                  fontSize: "20px",
                  backgroundColor: "#434343",
                  border: "#434343",
                }}
              >
                👤{user.username}
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/register")}
                className=""
                style={{
                  fontSize: "20px",
                  backgroundColor: "#434343",
                  border: "#434343",
                }}
              >
                Register
              </Button>
            )}

            {user ? (
              <Button
                className=""
                style={{
                  fontSize: "20px",
                  backgroundColor: "#434343",
                  border: "#434343",
                }}
                onClick={async () => {
                  logout();
                  setUser(null);
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className=""
                style={{
                  fontSize: "20px",
                  backgroundColor: "#434343",
                  border: "#434343",
                }}
              >
                Login
              </Button>
            )}
          </Stack>
        </Nav>
      </Navbar>
    </div>
  );
}
