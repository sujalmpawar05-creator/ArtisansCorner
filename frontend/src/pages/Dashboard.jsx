import { useEffect, useState } from "react";
import axios from "axios";
import {

  Chart as ChartJS,

  CategoryScale,

  LinearScale,

  BarElement,

  Title,

  Tooltip,

  Legend

} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(

  CategoryScale,

  LinearScale,

  BarElement,

  Title,

  Tooltip,

  Legend

);

function Dashboard() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: ""
  });


  const [totalProducts, setTotalProducts] =
    useState(0);

  const [totalEarnings, setTotalEarnings] =
    useState(0);

  const [totalOrders, setTotalOrders] =
    useState(0);
  const [products, setProducts] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {

    fetchProducts();

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(response.data.products);
      setTotalProducts(
        response.data.products.length
      );

      let earnings = 0;

      response.data.products.forEach((product) => {

        earnings += product.price;

      });

      setTotalEarnings(earnings);

      setTotalOrders(
        response.data.products.length * 2
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      const data =
        new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "price",
        formData.price
      );

      data.append(
        "image",
        formData.image
      );

      if (editingId) {

        await axios.put(
          `http://localhost:5000/api/products/${editingId}`,
          data,
          {
            headers: {
              Authorization: token
            }
          }
        );

        alert("Product Updated");

        setEditingId(null);

      } else {

        await axios.post(
          "http://localhost:5000/api/products",
          data,
          {
            headers: {
              Authorization: token
            }
          }
        );

        alert("Product Added");

      }

      fetchProducts();

      setFormData({
        title: "",
        description: "",
        price: "",
        image: ""
      });

    } catch (error) {

      console.log(error);

      console.log(error.response);

      alert(error.response.data.message);

    }

  };

  const deleteProduct = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Deleted");

      fetchProducts();

    } catch (error) {

      console.log(error);

    }

  };

  const editProduct = (product) => {

    setEditingId(product._id);

    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      image: ""
    });

  };

  const chartData = {

    labels: [

      "Products",

      "Orders",

      "Earnings"

    ],

    datasets: [

      {

        label: "Seller Analytics",

        data: [

          totalProducts,

          totalOrders,

          totalEarnings

        ]

      }

    ]

  };

  return (

    <div
      style={{
        padding: "30px"
      }}
    >

      {/* FORM SECTION */}

      <div
        style={{

          maxWidth: "700px",

          margin: "0 auto",

          backgroundColor: "#1f2937",

          padding: "30px",

          borderRadius: "10px",

          boxShadow:
            "0 0 20px rgba(255,255,255,0.1)"

        }}
      >

        <h1
          style={{

            textAlign: "center",

            marginBottom: "30px",

            fontSize: "45px"

          }}
        >
          Seller Dashboard
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            style={{
              marginBottom: "20px"
            }}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            style={{
              marginBottom: "20px"
            }}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            style={{
              marginBottom: "20px"
            }}
          />

          <input
            type="file"
            onChange={(e) =>
              setFormData({
                ...formData,
                image: e.target.files[0]
              })
            }
            style={{
              marginBottom: "20px"
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%"
            }}
          >

            {
              editingId
                ?
                "Update Product"
                :
                "Add Product"
            }

          </button>

        </form>

      </div>

      {/* ANALYTICS SECTION */}

      <div
        style={{

          marginTop: "50px",

          marginBottom: "50px"

        }}
      >

        <h1
          style={{
            marginBottom: "20px"
          }}
        >
          Analytics
        </h1>

        <div
          style={{

            display: "flex",

            gap: "20px",

            flexWrap: "wrap",

            marginBottom: "40px"

          }}
        >

          <div
            style={{

              backgroundColor: "#1f2937",

              padding: "20px",

              borderRadius: "10px",

              width: "220px"

            }}
          >

            <h2>Total Products</h2>

            <br />

            <h1>{totalProducts}</h1>

          </div>

          <div
            style={{

              backgroundColor: "#1f2937",

              padding: "20px",

              borderRadius: "10px",

              width: "220px"

            }}
          >

            <h2>Total Orders</h2>

            <br />

            <h1>{totalOrders}</h1>

          </div>

          <div
            style={{

              backgroundColor: "#1f2937",

              padding: "20px",

              borderRadius: "10px",

              width: "220px"

            }}
          >

            <h2>Total Earnings</h2>

            <br />

            <h1>
              ₹ {totalEarnings}
            </h1>

          </div>

        </div>

        <div
          style={{

            backgroundColor: "white",

            padding: "20px",

            borderRadius: "10px"

          }}
        >

          <Bar data={chartData} />

        </div>

      </div>

      {/* PRODUCTS SECTION */}

      <div
        style={{
          marginTop: "50px"
        }}
      >

        <h1
          style={{
            marginBottom: "30px"
          }}
        >
          Your Products
        </h1>

        <div
          style={{

            display: "flex",

            gap: "20px",

            flexWrap: "wrap"

          }}
        >

          {
            products.map((product) => (

              <div
                key={product._id}
                style={{

                  width: "300px",

                  backgroundColor: "#1f2937",

                  padding: "15px",

                  borderRadius: "10px"

                }}
              >

                <img
                  src={product.image}
                  alt={product.title}
                  style={{

                    width: "100%",

                    height: "220px",

                    objectFit: "cover",

                    borderRadius: "10px"

                  }}
                />

                <br /><br />

                <h2>{product.title}</h2>

                <p>{product.description}</p>

                <br />

                <h3>₹ {product.price}</h3>

                <br />

                <button
                  onClick={() =>
                    deleteProduct(product._id)
                  }
                >
                  Delete
                </button>

                {" "}

                <button
                  onClick={() =>
                    editProduct(product)
                  }
                >
                  Edit
                </button>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  );

}

export default Dashboard;