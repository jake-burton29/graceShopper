import { useContext } from "react";
import { AuthContext } from "../CreateContext";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  return {
    user,
    setUser,
  };
};

export default useAuth;
