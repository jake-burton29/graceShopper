import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { loginUser } from "../axios-services/users";
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          height: 445,
          width: 500,
          boxShadow: "0 0 3px 2px #cec7c759",
          padding: 20,
          paddingTop: 20,
          borderRadius: 20,
          marginTop: 50,
        }}
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
        <Form.Label style={{ fontWeight: "bold", fontSize: "larger" }}>
          Log In:
        </Form.Label>
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
        <Button
          style={{ marginTop: 20, marginBottom: 5 }}
          variant="dark"
          type="submit"
        >
          Login!
        </Button>
        <Button
          style={{ marginBottom: 10 }}
          variant="secondary"
          type="submit"
          size="sm"
          disabled
        >
          Forgot Password?
        </Button>
        <Link to="/register">Not registered? Click here</Link>
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
