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
          Stripe Test Payment
        </h1>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px"
          }}
        >
          Total: ₹ {totalPrice}
        </h2>

        <input
          type="text"
          value="4242 4242 4242 4242"
          readOnly
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            backgroundColor: "#1e293b",
            color: "white",
            border: "1px solid #475569"
          }}
        />

        <input
          type="text"
          value="12/34"
          readOnly
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            backgroundColor: "#1e293b",
            color: "white",
            border: "1px solid #475569"
          }}
        />

        <input
          type="text"
          value="123"
          readOnly
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            backgroundColor: "#1e293b",
            color: "white",
            border: "1px solid #475569"
          }}
        />

        <button
          onClick={handlePayment}
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
          Pay Now
        </button>

      </div>

    </div>

  );
}

export default Payment;