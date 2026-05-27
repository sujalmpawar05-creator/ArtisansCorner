import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import ProductDetails from "./pages/ProductDetails";

import Cart from "./pages/Cart";

import Checkout from "./pages/Checkout";

import MyOrders from "./pages/MyOrders";

import Payment from "./pages/Payment";

function App() {

  return (

  <BrowserRouter>

    <div
      style={{

        minHeight: "100vh",

        display: "flex",

        flexDirection: "column"

      }}
    >

      <Navbar />

      <div style={{ flex: 1 }}>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/payment"
            element={<Payment />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/my-orders"
            element={<MyOrders />}
          />

        </Routes>

      </div>

      <Footer />

    </div>

  </BrowserRouter>

);
}

export default App;