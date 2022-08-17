import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getProductById } from "../axios-services/products";

export default function SingleProduct() {
  const [singleProduct, setSingleProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getSingleProduct = async (id) => {
      const product = await getProductById(id);
      setSingleProduct(product);
    };
    getSingleProduct(id);
  }, []);
  // Fetch single product in useEffect instead of context
  // { useParams } from 'react-router-dom'
  // const { id } = useParams()

  return (
    <div>
      <Card>
        <Card.Title>Product: {singleProduct.name}</Card.Title>
        <Card.Img src={singleProduct.image_url} className="w-50 p-3" />
        <Card.Body>Price: {singleProduct.price}</Card.Body>
        <Card.Text>In Stock: {singleProduct.inventory}</Card.Text>
        <Card.Text>Description: {singleProduct.description}</Card.Text>
        <Button
          onClick={() => {
            //some func to add to cart
          }}
        >
          Add to Cart!
        </Button>
      </Card>
    </div>
  );
}
