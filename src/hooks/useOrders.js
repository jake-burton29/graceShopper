import { useContext } from "react";
import { OrdersContext } from "../CreateContext";

const useOrders = () => {
  const { orders, setOrders } = useContext(OrdersContext);

  return { orders, setOrders };
};

export default useOrders;
