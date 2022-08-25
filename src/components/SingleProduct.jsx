import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../axios-services/products";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import {
  editProductOrder,
  createProductOrder,
} from "../axios-services/product_orders";
import { deleteProduct } from "../axios-services/products";
import { CartPlus, CartCheck } from "react-bootstrap-icons";
import useProducts from "../hooks/useProducts";

export default function SingleProduct() {
  const [product, setProduct] = useState({});
  const { products, setProducts } = useProducts();
  const { id } = useParams();
  const { cart, setCart } = useCart();
  const { user } = useAuth();
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();

  async function addToCart() {
    let productOrderIndex = -1;
    productOrderIndex = cart.product_orders?.findIndex(
      (product_order) => product_order.productId === product.id
    );
    if (productOrderIndex !== undefined && productOrderIndex !== -1) {
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
      if (user) {
        const newProductOrder = await createProductOrder(
          product.id,
          cart.id,
          1
        );
        if (cart.product_orders) {
          setCart({
            ...cart,
            product_orders: [...cart.product_orders, newProductOrder],
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
          let cartCopy = cart;
          cartCopy = {
            ...cart,
            product_orders: [...cart.product_orders, newProductOrder],
          };
          setCart(cartCopy);
          localStorage.setItem("guestCart", JSON.stringify(cartCopy));
        } else {
          let cartCopy = cart;
          cartCopy = { ...cart, product_orders: [newProductOrder] };
          setCart(cartCopy);
          localStorage.setItem("guestCart", JSON.stringify(cartCopy));
        }
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
    <div className="C-div">
      <Card className="singleCard" style={{ width: "70%", marginLeft: "auto" }}>
        <Card.Title className="singleCard">{product.name}</Card.Title>
        <Card.Img src={product.image_url} className="w-25 p-3" />
        <Card.Text className="seperator">Price: ${product.price}.00</Card.Text>
        <Card.Text className="seperator">
          In Stock: {product.inventory}
        </Card.Text>
        <Card.Text className="seperator">
          Description: {product.description}
        </Card.Text>
        {!addedToCart ? (
          <Button
            style={{
              backgroundColor: "#434343",
              border: "#434343",
              marginTop: "20px",
            }}
            onClick={async () => {
              addToCart();
              setAddedToCart(true);
              setTimeout(() => {
                setAddedToCart(false);
              }, 2000);
            }}
          >
            Add to Cart! <CartPlus size={25} />
          </Button>
        ) : (
          <Button variant="success">
            Added to Cart! <CartCheck size={25} />
          </Button>
        )}
        {user?.isAdmin ? (
          <Button
            variant="danger"
            onClick={async () => {
              await deleteProduct(product.id);
              const productsCopy = products;
              const updatedProducts = productsCopy.filter(
                (singleProduct) => singleProduct.id !== product.id
              );
              setProducts(updatedProducts);
              navigate("/");
            }}
          >
            Delete Product
          </Button>
        ) : null}
      </Card>
    </div>
  );
}
