import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/my-orders",
        {
          headers: {
            Authorization: token
          }
        }
      );

      setOrders(response.data.orders);

    } catch (error) {

      console.log(error);

    }

  };

  // Empty Orders State

  if (orders.length === 0) {

    return (

      <div style={{ padding: "20px" }}>

        <h2>No Orders Yet</h2>

      </div>

    );

  }

  return (

    <div style={{ padding: "20px" }}>

      <h1>My Orders</h1>

      <br />

      {
        orders.map((order) => (

          <div
            key={order._id}
            style={{

              border: "1px solid gray",

              padding: "20px",

              marginBottom: "20px",

              borderRadius: "10px",

              backgroundColor: "#1f2937"

            }}
          >

            <h2>
              Status:
              {" "}
              {order.status}
            </h2>

            <br />

            <h3>
              Total:
              {" "}
              ₹ {order.totalPrice}
            </h3>

            <br />

            <p>
              Address:
              {" "}
              {order.shippingAddress}
            </p>

            <br />

            <h3>Products:</h3>

            <br />

            {
              order.products.map((item) => (

                <div
                  key={item.productId}
                  style={{
                    marginBottom: "10px"
                  }}
                >

                  <p>

                    {item.title}

                    {" "}
                    ×
                    {" "}

                    {item.quantity}

                  </p>

                </div>

              ))
            }

          </div>

        ))
      }

    </div>

  );

}

export default MyOrders;