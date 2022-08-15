import React, { useState } from "react";

export default function ProductsCard({ product }) {
  return (
    <div>
      <h4>Product: {product.name}</h4>
      <h4>Price:{product.price}$</h4>
      <h4>Description:{product.description}</h4>
    </div>
  );
}
