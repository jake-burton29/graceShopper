import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getProductById } from "../axios-services/products";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
export default function SingleProduct() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { cart, setCart } = useCart();
  const { user } = useAuth();

  async function addToCart() {
    let productOrderIndex = -1;
    if (user) {
      productOrderIndex = cart.product_orders?.findIndex(
        (product_order) => product_order.productId === product.id
      );
    }
    if (cart.product_orders && productOrderIndex !== -1) {
      if (user) {
        await editProductOrder(
          cart.product_orders[productOrderIndex].quantity + 1,
          cart.product_orders[productOrderIndex].id
        );
        const cartCopy = cart;
        cartCopy.product_orders[productOrderIndex].quantity += 1;
        setCart(cartCopy);
      }
      console.log("Adding another to cart!");
    } else {
      if (user) {
        console.log("Creating a new product_order!");
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
      } else if (cart[product.id]) {
        const cartCopy = cart;
        cartCopy[product.id] += 1;
        setCart(cartCopy);
        localStorage.setItem("guestCart", JSON.stringify(cart));
      } else {
        setCart({ ...cart, [product.id]: 1 });
        localStorage.setItem(
          "guestCart",
          JSON.stringify({ ...cart, [product.id]: 1 })
        );
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
            //some func to add to cart
          }}
        >
          Add to Cart!
        </Button>
      </Card>
    </div>
  );
}
