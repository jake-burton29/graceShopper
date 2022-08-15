import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { getUser, loginUser } from "../axios-services/users";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const user = await loginUser(username, password);
          if (user) setUser(user);
        }}
      >
        <input
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          value={password}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="success" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
