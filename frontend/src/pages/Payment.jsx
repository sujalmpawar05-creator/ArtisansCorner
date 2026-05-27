import { useNavigate } from "react-router-dom";

function Payment() {

  const navigate = useNavigate();

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const handlePayment = () => {

    // Simulated payment success

    alert("Payment Successful");

    navigate("/checkout");

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Stripe Test Payment</h1>

      <h2>Total: ₹ {totalPrice}</h2>

      <br />

      <input
        type="text"
        value="4242 4242 4242 4242"
        readOnly
      />

      <br /><br />

      <input
        type="text"
        value="12/34"
        readOnly
      />

      <br /><br />

      <input
        type="text"
        value="123"
        readOnly
      />

      <br /><br />

      <button onClick={handlePayment}>

        Pay Now

      </button>

    </div>

  );

}

export default Payment;