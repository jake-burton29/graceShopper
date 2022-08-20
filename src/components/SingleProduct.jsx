import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getProductById } from "../axios-services/products";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import {
  editProductOrder,
  createProductOrder,
} from "../axios-services/product_orders";
export default function SingleProduct() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { cart, setCart } = useCart();
  const { user } = useAuth();

  async function addToCart() {
    let productOrderIndex = -1;
    productOrderIndex = cart.product_orders?.findIndex(
      (product_order) => product_order.productId === product.id
    );
    if (productOrderIndex !== -1) {
      console.log("Adding another to cart!");
      const cartCopy = { ...cart };
      cartCopy.product_orders[productOrderIndex].quantity += 1;
      setCart(cartCopy);
      if (user) {
        await editProductOrder(
          cart.product_orders[productOrderIndex].quantity + 1,
          cart.product_orders[productOrderIndex].id
        );
      } else {
        localStorage.setItem("guestCart", JSON.stringify(cart));
      }
    } else {
      console.log("Creating a new product_order!");
      if (user) {
        const newProductOrder = await createProductOrder(
          product.id,
          cart.id,
          1
        );
        if (cart.product_orders) {
          setCart({
            ...cart,
            product_orders: [...product_orders, newProductOrder],
          });
        } else {
          setCart({ ...cart, product_orders: [newProductOrder] });
        }
      } else {
        const newProductOrder = {
          id: product.id,
          productId: product.id,
          products: product,
          quantity: 1,
        };
        if (cart.product_orders) {
          setCart({
            ...cart,
            product_orders: [...product_orders, newProductOrder],
          });
        } else {
          setCart({ ...cart, product_orders: [newProductOrder] });
        }
        localStorage.setItem("guestCart", JSON.stringify(cart));
      }
    }
  }

  useEffect(() => {
    const getSingleProduct = async (id) => {
      const product = await getProductById(id);
      setProduct(product);
    };
    getSingleProduct(id);
  }, []);

  return (
    <div>
      <Card>
        <Card.Title>Product: {product.name}</Card.Title>
        <Card.Img src={product.image_url} className="w-50 p-3" />
        <Card.Body>Price: {product.price}</Card.Body>
        <Card.Text>In Stock: {product.inventory}</Card.Text>
        <Card.Text>Description: {product.description}</Card.Text>
        <Button
          onClick={() => {
            addToCart();
          }}
        >
          Add to Cart!
        </Button>
      </Card>
    </div>
  );
}
