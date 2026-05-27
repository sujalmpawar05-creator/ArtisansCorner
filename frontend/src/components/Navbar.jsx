import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {

  const [hovered, setHovered] =
    useState("");

  const linkStyle = (name) => ({

    color: "white",

    textDecoration: "none",

    transition: "0.3s",

    transform:
      hovered === name
        ?
        "scale(1.1)"
        :
        "scale(1)",

    textShadow:
      hovered === name
        ?
        "0 0 10px white"
        :
        "none"

  });

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("cart");

    alert("Logged Out");

    window.location.href = "/";

  };

  return (

    <nav
      style={{

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        padding: "15px 30px",

        backgroundColor: "black",

        flexWrap: "wrap",

        position: "sticky",

        top: 0,

        zIndex: 1000

      }}
    >

      <h2>Artisan's Corner</h2>

      <div
        style={{

          display: "flex",

          gap: "20px",

          flexWrap: "wrap"

        }}
      >

        <Link
          to="/"
          style={linkStyle("home")}
          onMouseEnter={() =>
            setHovered("home")
          }
          onMouseLeave={() =>
            setHovered("")
          }
        >
          Home
        </Link>

        <Link
          to="/dashboard"
          style={linkStyle("dashboard")}
          onMouseEnter={() =>
            setHovered("dashboard")
          }
          onMouseLeave={() =>
            setHovered("")
          }
        >
          Dashboard
        </Link>

        <Link
          to="/login"
          style={linkStyle("login")}
          onMouseEnter={() =>
            setHovered("login")
          }
          onMouseLeave={() =>
            setHovered("")
          }
        >
          Login
        </Link>

        <Link
          to="/register"
          style={linkStyle("register")}
          onMouseEnter={() =>
            setHovered("register")
          }
          onMouseLeave={() =>
            setHovered("")
          }
        >
          Register
        </Link>

        <Link
          to="/cart"
          style={linkStyle("cart")}
          onMouseEnter={() =>
            setHovered("cart")
          }
          onMouseLeave={() =>
            setHovered("")
          }
        >
          Cart
        </Link>

        <Link
          to="/my-orders"
          style={linkStyle("orders")}
          onMouseEnter={() =>
            setHovered("orders")
          }
          onMouseLeave={() =>
            setHovered("")
          }
        >
          My Orders
        </Link>

        <button
          onClick={logout}
          style={{

            backgroundColor: "red",

            color: "white",

            border: "none",

            padding: "8px 15px",

            borderRadius: "5px",

            cursor: "pointer"

          }}
        >
          Logout
        </button>

      </div>

    </nav>

  );

}

export default Navbar;