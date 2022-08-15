import { useContext } from "react";
import { ProductsContext } from "../CreateContext";

const useProducts = () => {
  const { products, setProducts } = useContext(ProductsContext);

  return { products, setProducts };
};

export default useProducts;
