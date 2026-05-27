import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://artisanscorner.onrender.com/api/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      alert("Login Successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }

  };

  return (

    <div
      style={{

        minHeight: "80vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center"

      }}
    >

      <div
        style={{

          width: "400px",

          padding: "30px",

          backgroundColor: "#1f2937",

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
          Login
        </h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={{

              marginBottom: "20px",

              fontSize: "18px"

            }}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{

              marginBottom: "20px",

              fontSize: "18px"

            }}
          />

          <button
            type="submit"
            style={{

              width: "100%",

              fontSize: "18px"

            }}
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;