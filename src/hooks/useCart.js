import { useContext } from "react";
import { CartContext } from "../CreateContext";

const useCart = () => {
  const { cart, setCart } = useContext(CartContext);

  return { cart, setCart };
};

export default useCart;
