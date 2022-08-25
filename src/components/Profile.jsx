import React, { useEffect, useState } from "react";
import { getMyOrders } from "../axios-services/orders";
import useAuth from "../hooks/useAuth";
import { Button } from "react-bootstrap";
import useProducts from "../hooks/useProducts";
import { createProduct } from "../axios-services/products";
import { Card } from "react-bootstrap";

export default function Profile() {
  const { user } = useAuth();
  const { products, setProducts } = useProducts();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImage_url] = useState("");
  const [inventory, setInventory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const getUsersOrders = async () => {
      const orders = await getMyOrders();
      setMyOrders(orders);
    };
    getUsersOrders();
  }, [user]);

  return (
    <div
      id="profile"
      style={{
        alignContent: "center",
        textAlign: "center",
      }}
    >
      {user ? (
        <div
          style={{
            margin: "auto",
            width: "30%",
          }}
        >
          <div
            id="accountInfo"
            style={{
              padding: "40px",
              marginTop: "20px",
              width: "30vw",
              height: "30wh",
            }}
          >
            <Card.Title style={{ fontSize: "30px" }}>Account Info:</Card.Title>
            <Card.Text>Username: {user.username}</Card.Text>
            <Card.Text>Email: {user.email}</Card.Text>
          </div>
        </div>
      ) : null}
      <div
        style={{
          margin: "auto",
          width: "50%",
        }}
      >
        <div
          id="myOrders"
          style={{
            padding: "40px",
            width: "50vw",
            height: "30wh",
          }}
        >
          <h3>My Orders:</h3>
          {myOrders?.map((order) => {
            if (order.complete)
              return (
                <div key={order.id}>
                  <h4>Order #{order.id}</h4>
                  <div>
                    {order?.product_orders &&
                      order.product_orders.map((productOrder) => {
                        return (
                          <div key={productOrder.id}>
                            <p>
                              {productOrder.products.name} x
                              {productOrder.quantity}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                  <p
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Total: ${order.total}
                  </p>
                </div>
              );
          })}
        </div>
        {user.isAdmin ? (
          <div
            id="adminPanel"
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "50vw",
              marginTop: "30px",
              padding: "10px",
            }}
          >
            <h3>ADMIN CONTROL PANEL</h3>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={async (e) => {
                e.preventDefault();
                const newProduct = await createProduct(
                  name,
                  price,
                  description,
                  image_url,
                  inventory,
                  categoryId
                );
                setProducts([...products, newProduct]);
                console.log("PRODUCTS:", [...products, newProduct]);
              }}
            >
              <div>
                <label htmlFor="name">Product Name:</label>
                <input
                  value={name}
                  placeholder="Product Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="price">Product Price:</label>
                <input
                  value={price}
                  placeholder="Product Price"
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description">Product Description:</label>
                <input
                  value={description}
                  placeholder="Product Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="inventory">Product Inventory:</label>
                <input
                  value={inventory}
                  placeholder="Product Inventory"
                  type="number"
                  onChange={(e) => setInventory(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="category">Product Category ID:</label>
                <input
                  value={categoryId}
                  placeholder="Product Category #"
                  type="number"
                  onChange={(e) => setCategoryId(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="image_url">Image URL:</label>
                <input
                  value={image_url}
                  placeholder="Image URL"
                  onChange={(e) => setImage_url(e.target.value)}
                />
              </div>
              <Button
                variant="success"
                type="submit"
                style={{ marginTop: "10px" }}
              >
                Create New Product
              </Button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}
