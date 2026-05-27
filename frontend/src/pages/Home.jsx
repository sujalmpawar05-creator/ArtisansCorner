import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Home() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(response.data.products);

      setLoading(false);

    } catch (error) {

      console.log(error);

    }

  };

  if (loading) {

    return (
      <h2 style={{ padding: "20px" }}>
        Loading...
      </h2>
    );

  }

  return (

    <div>

      <div
        style={{
          textAlign: "center",
          padding: "40px"
        }}
      >

        <h1
          style={{
            fontSize: "60px",
            marginBottom: "20px"
          }}
        >
          Artisan's Corner
        </h1>

        <h2>
          Discover Handmade Treasures
        </h2>

        <br />

        <p>
          Support Local Artisans
        </p>

      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "20px"
        }}
      >

        {
          products.map((product) => (

            <ProductCard
              key={product._id}
              product={product}
            />

          ))
        }

      </div>

    </div>

  );

}

export default Home;