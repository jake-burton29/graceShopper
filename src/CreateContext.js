import { createContext } from "react";

const AuthContext = createContext({});
const OrdersContext = createContext([]);
const CategoriesContext = createContext([]);
const ProductsContext = createContext([]);

export { AuthContext, OrdersContext, CategoriesContext, ProductsContext };
