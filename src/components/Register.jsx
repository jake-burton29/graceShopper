import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUser } from "../axios-services/users";
import { Button, Form } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          height: 580,
          width: 500,
          boxShadow: "0 0 3px 2px #cec7c759",
          padding: 20,
          paddingTop: 20,
          borderRadius: 20,
          marginTop: 50,
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          if (password !== confirmPassword) {
            setErrorMessage("Your passwords do not match.");
          } else if (password.length < 8) {
            setErrorMessage("Your password must be at least 8 characters.");
          } else {
            const user = await createUser(username, password, userEmail);
            if (user) {
              setUser(user);
              navigate("/");
            }
          }
        }}
      >
        <Form.Label style={{ fontWeight: "bold", fontSize: "larger" }}>
          Create an Account:
        </Form.Label>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>New Username</Form.Label>
          <Form.Control
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={userEmail}
            placeholder="Enter email"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            value={password}
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            value={confirmPassword}
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Check type="checkbox" label="Create lucky account?" />
        <Form.Text className="text-muted">
          You can change this setting later
        </Form.Text>
        <Button
          style={{ marginTop: 20, marginBottom: 10 }}
          variant="dark"
          type="submit"
        >
          Create New Account
        </Button>
        <Link to="/login">Already have an account? Click here</Link>

        {errorMessage ? (
          <Form.Text
            style={{
              color: "red",
              backgroundColor: "#FFD2D2",
            }}
          >
            {errorMessage}
          </Form.Text>
        ) : null}
      </Form>
    </div>
  );
}
