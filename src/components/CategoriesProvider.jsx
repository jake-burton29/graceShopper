import React, { useState, useEffect } from "react";
import { getCategories } from "../axios-services/categories";
import { CategoriesContext } from "../CreateContext";

export default function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    getAllCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
}
