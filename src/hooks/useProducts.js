import { useContext } from "react";
import { ProductsContext } from "../CreateContext";

const useProducts = () => {
  const { products, setProducts, targetProduct, setTargetProduct } =
    useContext(ProductsContext);

  return { products, setProducts, targetProduct, setTargetProduct };
};

export default useProducts;
