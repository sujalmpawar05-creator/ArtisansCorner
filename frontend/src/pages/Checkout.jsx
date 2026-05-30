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
        "https://artisanscorner.onrender.com/api/orders",
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

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#030b22"
      }}
    >

      <div
        style={{
          width: "500px",
          padding: "30px",
          backgroundColor: "#081229",
          borderRadius: "15px",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          Checkout
        </h1>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          Total: ₹ {totalPrice}
        </h2>

        <textarea
          placeholder="Enter Shipping Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          style={{
            width: "100%",
            height: "120px",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
            backgroundColor: "#1e293b",
            color: "white",
            border: "1px solid #475569",
            resize: "none"
          }}
        />

        <button
          onClick={placeOrder}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "18px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Place Order
        </button>

      </div>

    </div>

  );
}
export default Checkout;