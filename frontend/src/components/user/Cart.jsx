import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../user/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartItems();
    } else {
      navigate("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const fetchCartItems = () => {
    axios
      .get("https://shoe-shack-backend.vercel.app/api/v1/users/cart")
      .then((response) => {
        const cartData = response.data.data.cartItems;
        setCartItems(cartData);
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  const handleRemoveFromCart = (id) => {
    axios
      .patch("https://shoe-shack-backend.vercel.app/api/v1/users/remove-from-cart", { _id: id })
      .then((response) => {
        setCartItems(cartItems.filter((item) => item.product._id !== id));
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  };

  const handleCheckout = () => {
    axios
      .post("https://shoe-shack-backend.vercel.app/api/v1/users/confirm-order")
      .then(() => {
        setCartItems([]);
        alert("Order placed successfully");
        navigate("/users/orders");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!cartItems.length) {
    return <div className="text-center">Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto py-6 px-24 ">
      <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
      {cartItems.map((item) => (
        <div
          key={item._id}
          className="flex items-center mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-200"
        >
          <img
            className="w-20 h-20 object-cover rounded"
            src={item.product.image}
            alt={item.product.name}
          />
          <div className="ml-6 flex-grow">
            <h2 className="text-2xl font-semibold">{item.product.name}</h2>
            <p className="text-xl text-gray-800">
              ₹{item.product.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
          </div>
          <button
            onClick={() => handleRemoveFromCart(item.product._id)}
            className="ml-4 bg-red-500 text-white p-2 rounded hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-end items-center">
        <p className="text-xl font-semibold mr-4">
          Total Price: ₹{totalPrice.toFixed(2)}
        </p>
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
