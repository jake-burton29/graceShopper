import {
  createProductOrder,
  editProductOrder,
} from "../axios-services/product_orders";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

export async function addToCart() {
  const { cart, setCart } = useCart();
  const { user } = useAuth();
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
      const cartCopy = { ...cart };
      cartCopy.product_orders[productOrderIndex].quantity += 1;
      setCart(cartCopy);
    }
    console.log("Adding another to cart!");
  } else {
    if (user) {
      console.log("Creating a new product_order!");
      const newProductOrder = await createProductOrder(product.id, cart.id, 1);
      if (cart.product_orders) {
        setCart({
          ...cart,
          product_orders: [...cart.product_orders, newProductOrder],
        });
      } else {
        setCart({ ...cart, product_orders: [newProductOrder] });
      }
    } else if (cart[product.id]) {
      const cartCopy = { ...cart };
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

export async function incrementQuantity(productId) {
  const { cart, setCart } = useCart();
  const { user } = useAuth();
  let productOrderIndex = -1;
  if (user) {
    productOrderIndex = cart.product_orders?.findIndex(
      (product_order) => product_order.productId === productId
    );
    await editProductOrder(
      cart.product_orders[productOrderIndex].quantity + 1,
      cart.product_orders[productOrderIndex].id
    );
    const cartCopy = { ...cart };
    cartCopy.product_orders[productOrderIndex].quantity += 1;
    setCart(cartCopy);
  } else {
    const cartCopy = { ...cart };
    cartCopy[productId] += 1;
    setCart(cartCopy);
    localStorage.setItem("guestCart", JSON.stringify(cart));
  }
}

export async function decrementQuantity(productId) {
  const { cart, setCart } = useCart();
  const { user } = useAuth();
  let productOrderIndex = -1;
  if (user) {
    productOrderIndex = cart.product_orders?.findIndex(
      (product_order) => product_order.productId === productId
    );
    await editProductOrder(
      cart.product_orders[productOrderIndex].quantity - 1,
      cart.product_orders[productOrderIndex].id
    );
    const cartCopy = { ...cart };
    cartCopy.product_orders[productOrderIndex].quantity -= 1;
    setCart(cartCopy);
  } else {
    const cartCopy = { ...cart };
    cartCopy[productId] -= 1;
    setCart(cartCopy);
    localStorage.setItem("guestCart", JSON.stringify(cart));
  }
}
