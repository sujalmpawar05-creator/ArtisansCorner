import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {

  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const products = cart.map((item) => ({
        productId: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      }));

      await axios.post(
        "https://artisans-corner-api.onrender.com/api/orders",
        {
          products,
          shippingAddress: address,
          totalPrice
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Order Placed Successfully");

      localStorage.removeItem("cart");

      navigate("/");

    } catch (error) {

      console.log(error.response.data);

      alert("Failed to Place Order");

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Checkout</h1>

      <h2>Total: ₹ {totalPrice}</h2>

      <textarea
        placeholder="Enter Shipping Address"
        value={address}
        onChange={(e) =>
          setAddress(e.target.value)
        }
      />

      <br /><br />

      <button onClick={placeOrder}>
        Place Order
      </button>

    </div>

  );

}

export default Checkout;