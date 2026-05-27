import { Link } from "react-router-dom";
import { useState } from "react";

function ProductCard({ product }) {

  const [hover, setHover] =
    useState(false);

  const addToCart = () => {

    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct =
      cart.find(
        (item) => item._id === product._id
      );

    if (existingProduct) {

      cart = cart.map((item) => {

        if (item._id === product._id) {

          return {
            ...item,
            quantity: item.quantity + 1
          };

        }

        return item;

      });

    } else {

      cart.push({
        ...product,
        quantity: 1
      });

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Added to Cart");

  };

  return (

    <div

      onMouseEnter={() => setHover(true)}

      onMouseLeave={() => setHover(false)}

      style={{

        border: "1px solid gray",

        padding: "15px",

        width: "300px",

        borderRadius: "10px",

        backgroundColor: "#1f2937",

        transition: "0.3s",

        cursor: "pointer",

        margin: "10px",

        transform:
          hover
          ?
          "scale(1.03)"
          :
          "scale(1)",

        boxShadow:
          hover
          ?
          "0 0 20px rgba(255,255,255,0.2)"
          :
          "none"

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

      <br />

      <p>{product.description}</p>

      <br />

      <h3>₹ {product.price}</h3>

      <br />

      <Link to={`/product/${product._id}`}>

        View Details

      </Link>

      <br /><br />

      <button onClick={addToCart}>

        Add to Cart

      </button>

    </div>

  );

}

export default ProductCard;