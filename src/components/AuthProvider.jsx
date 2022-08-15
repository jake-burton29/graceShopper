import React, { useState, useEffect } from "react";
import { getUser } from "../axios-services/users";
import { AuthContext } from "../CreateContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getMe = async () => {
      const user = await getUser();
      setUser(user);
    };
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
