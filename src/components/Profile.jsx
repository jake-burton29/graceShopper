import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImage_url] = useState("");
  const [inventory, setInventory] = useState("");
  const [categoryId, setCategoryId] = useState("");

  return (
    <div id="userInfo">
      {user ? (
        <div>
          <h3>Account Info:</h3>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : null}

      <div>
        <h3>My Orders:</h3>
        {user?.orders?.map((order) => {
          return (
            <div key={order.id}>
              <h4>Order #{order.id}</h4>
              <div>
                {order?.product_orders &&
                  order.product_orders.map((productOrder) => {
                    return (
                      <div key={productOrder.id}>
                        <p>
                          {productOrder.products.name} x{productOrder.quantity}
                        </p>
                      </div>
                    );
                  })}
              </div>
              <p>Total: {order.total}</p>
            </div>
          );
        })}
      </div>

      <div id="adminPanel">
        <h3>ADMIN CONTROL PANEL</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const { data: product } = await axios({
              method: "post",
              url: "/api/products/",
              data: {
                name,
                price: +price,
                description,
                image_url,
                inventory: +inventory,
                categoryId: +categoryId,
              },
            });
            console.log(product);
          }}
        >
          <input
            value={name}
            placeholder="Product Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            value={price}
            placeholder="Product Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            value={description}
            placeholder="Product Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            value={inventory}
            placeholder="Product Inventory"
            onChange={(e) => setInventory(e.target.value)}
          />
          <input
            value={categoryId}
            placeholder="Product Category #"
            onChange={(e) => setCategoryId(e.target.value)}
          />
          <input
            value={image_url}
            placeholder="Image URL"
            onChange={(e) => setImage_url(e.target.value)}
          />
          <Button variant="success" type="submit">
            Create New Product
          </Button>
        </form>
      </div>
    </div>
  );
}
