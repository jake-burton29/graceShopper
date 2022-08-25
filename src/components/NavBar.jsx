import React from "react";
import useAuth from "../hooks/useAuth";
import { logout } from "../axios-services/users";
import { Navbar, Nav, Button, Badge } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";
import logo from "../netTech.png";
import { Cart4, Person } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import useCart from "../hooks/useCart";

export default function NavBar() {
  const { user, setUser } = useAuth();
  const { cart } = useCart();
  const [cartSize, setCartSize] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const getCartSize = () => {
      let count = 0;
      cart.product_orders?.forEach((product_order) => {
        count += product_order.quantity;
      });
      setCartSize(count);
    };
    getCartSize();
  }, [cart]);

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
            marginLeft: "2vw",
            backgroundColor: "#434343",
            border: "#434343",
          }}
        />
        <Nav>
          <Stack
            direction="horizontal"
            gap={4}
            style={{
              marginRight: "2vw",
            }}
          >
            <Button
              onClick={() => navigate("/cart")}
              className=""
              style={{
                fontSize: "20px",
                backgroundColor: "#434343",
                border: "#434343",
              }}
            >
              <Cart4 size={25} />{" "}
              <Badge
                bg="light"
                style={{
                  color: "#434343",
                }}
              >
                {cartSize}
              </Badge>
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
                <Person />
                {user.username}
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
