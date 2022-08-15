import { useContext } from "react";
import { CategoriesContext } from "../CreateContext";

const useCategories = () => {
  const { categories, setCategories } = useContext(CategoriesContext);

  return { categories, setCategories };
};

export default useCategories;
