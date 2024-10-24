import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Product from "./page/Product";
import Home from "./page/Home";
import Category from "./page/Category";
import Footer from "./components/Footer";
import Cart from "./page/Cart";
import Login from "./page/Login";
import clothingbanner from "./assets/clothingbanner.png";
import cosmeticsbanner from "./assets/cosmeticsbanner.png";
import electronicsBanner from "./assets/electronicsbanner.png";
import Checkout from "./page/Checkout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ChangePassword from "./components/ChangePassword";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  // const [count, setCount] = useState(0)
  return (
    <main className="text-tertiary">
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route
            path="/clothing"
            element={<Category category={"clothing"} banner={clothingbanner} />}
          />
          <Route
            path="/cosmetics"
            element={
              <Category category={"cosmetics"} banner={cosmeticsbanner} />
            }
          />
          <Route
            path="/electronics"
            element={
              <Category category={"electronics"} banner={electronicsBanner} />
            }
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart-page" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;
