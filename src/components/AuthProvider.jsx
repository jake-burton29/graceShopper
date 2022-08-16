import React, { useState, useEffect } from "react";
import { getUser } from "../axios-services/users";
import { AuthContext } from "../CreateContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  console.log("USER:", user);

  useEffect(() => {
    const getMe = async () => {
      const jwtUser = await getUser();
      setUser(jwtUser);
    };
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
