import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getUser, loginUser } from "../axios-services/users";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const user = await loginUser(username, password);
          if (user) {
            setUser(user);
            navigate("/");
          } else {
            setErrorMessage("Incorrect login!");
          }
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            value={password}
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Check type="checkbox" label="Feeling lucky?" />
        <Form.Text className="text-muted">or not..</Form.Text>
        {errorMessage ? <p>{errorMessage}</p> : null}
        <Button variant="dark" type="submit">
          Login!
        </Button>
        <Button variant="secondary" type="submit" size="sm" disabled>
          Forgot Password?
        </Button>
      </Form>
      <Link to="/register">Not registered? Click here</Link>
    </div>
  );
}
