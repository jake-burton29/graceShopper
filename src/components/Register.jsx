import React, { useState } from "react";
import { Button } from "react-bootstrap";
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
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!password === confirmPassword) {
            setErrorMessage("Your passwords do not match.");
          } else if (password.length < 8) {
            setErrorMessage("Your password must be at least 8 characters.");
          } else {
            const user = await createUser(username, password, userEmail);
            if (user) setUser(user);
            setErrorMessage("You have succesfully logged in.");
            navigate("/");
          }
        }}
      >
        <input
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          value={userEmail}
          placeholder="Email"
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          value={password}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          value={confirmPassword}
          placeholder="Confirm Password"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button variant="success" type="submit">
          Login
        </Button>
      </form>
      {errorMessage ? <p>{errorMessage}</p> : null}
      <Link to="/login">Already have an account? Click here</Link>
    </div>
  );
}
