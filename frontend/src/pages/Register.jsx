import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("buyer");

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/register",
        {
          name,
          email,
          password,
          role
        }
      );

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");

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
          Register
        </h1>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={{

              marginBottom: "20px",

              fontSize: "18px"

            }}
          />

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

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            style={{

              marginBottom: "20px",

              fontSize: "18px"

            }}
          >

            <option value="buyer">
              Buyer
            </option>

            <option value="seller">
              Seller
            </option>

          </select>

          <button
            type="submit"
            style={{

              width: "100%",

              fontSize: "18px"

            }}
          >
            Register
          </button>

        </form>

      </div>

    </div>

  );

}

export default Register;