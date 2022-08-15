import React, { useState } from "react";
import useProducts from "../hooks/useProducts";

export default function ProductsCard({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
    </div>
  );
}
