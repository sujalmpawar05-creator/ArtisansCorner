import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {

  const [cart, setCart] = useState([]);

  useEffect(() => {

    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);

  }, []);

  const updateQuantity = (id, amount) => {

    const updatedCart = cart.map((item) => {

      if (item._id === id) {

        return {
          ...item,
          quantity: item.quantity + amount
        };

      }

      return item;

    }).filter((item) => item.quantity > 0);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  // Empty Cart State

  if (cart.length === 0) {

    return (

      <div style={{ padding: "20px" }}>

        <h2>Cart is Empty</h2>

      </div>

    );

  }

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (

    <div style={{ padding: "20px" }}>

      <h1>Shopping Cart</h1>

      <br />

      {
        cart.map((item) => (

          <div
            key={item._id}
            style={{

              border: "1px solid gray",

              padding: "15px",

              marginBottom: "15px",

              borderRadius: "10px",

              backgroundColor: "#1f2937"

            }}
          >

            <h2>{item.title}</h2>

            <br />

            <p>₹ {item.price}</p>

            <br />

            <p>
              Quantity:
              {" "}
              {item.quantity}
            </p>

            <br />

            <button
              onClick={() =>
                updateQuantity(item._id, 1)
              }
            >
              +
            </button>

            {" "}

            <button
              onClick={() =>
                updateQuantity(item._id, -1)
              }
            >
              -
            </button>

          </div>

        ))
      }

      <h2>Total: ₹ {totalPrice}</h2>

      <br /><br />

      <Link to="/payment">

        <button>
          Proceed to Payment
        </button>

      </Link>

    </div>

  );

}

export default Cart;