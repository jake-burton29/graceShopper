import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createUser } from "../axios-services/users";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <Form
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
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            value={confirmPassword}
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Check type="checkbox" label="Subscribe to Emails?" />
        <Form.Text className="text-muted">
          You can change this setting later
        </Form.Text>
        <Button variant="dark" type="submit">
          Create New Account
        </Button>
      </Form>
      {errorMessage ? <p>{errorMessage}</p> : null}
      <Link to="/login">Already have an account? Click here</Link>
    </div>
  );
}
