import { createContext } from "react";

const AuthContext = createContext({});
const CartContext = createContext({});
const CategoriesContext = createContext([]);
const ProductsContext = createContext([]);

export { AuthContext, CartContext, CategoriesContext, ProductsContext };
