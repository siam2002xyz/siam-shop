import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import userImg from "../assets/user.svg";
import Navbar from "./Navbar";
import { MdMenu, MdClose } from "react-icons/md";
import { RiShoppingCart2Line } from "react-icons/ri";
// import { ShopContext } from "../context/ShopContext";
import UserAPI from "../apis/user";
import { toast } from "react-toastify";
import ProductAPI from "../apis/product";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpened, setmenuOpened] = useState(false);
  const [getTotalCartItems, setgetTotalCartItems] = useState(0);
  const toggleMenu = () => {
    setmenuOpened(!menuOpened);
  };

  // const { userHandle } = useContext(ShopContext);

  useEffect(() => {
    const user = localStorage.getItem("user");
    async function fetchData() {
      try {
        const cart = await ProductAPI.getCart(JSON.parse(user).id);
        setgetTotalCartItems(cart.cart.cartData.length);
      } catch (error) {
        return navigate("/");
      }
    }
    const handleScroll = () => {
      if (window.scrollY > 0) {
        if (menuOpened) {
          setmenuOpened(false);
        }
      }
    };
    fetchData();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpened]);

  const logout = async () => {
    const isLogout = window.confirm("Are you want to logout?");
    if (isLogout) {
      try {
        await UserAPI.logout();
        localStorage.clear();
        toast.success("Logout is successful!", {
          autoClose: 2000,
          pauseOnHover: false,
          theme: "dark",
        });
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } catch (error) {
        console.error(error);
        toast.error("Logout is failed!", {
          autoClose: 2000,
          pauseOnHover: false,
          theme: "dark",
        });
      }
    }
  };

  return (
    <header className="fixed inset-x-8 bg-white max-padd-container text-red-500 w-full z-50">
      <div className="flexBetween py-3">
        <Link to={"/"} className={"flex items-center gap-y-2 gap-x-3"}>
          <img src={logo} alt={"Logoalt"} height={31} width={31} />
          <span className="bold-24 hidden xs:flex">Siam Shop</span>
        </Link>
        <div className="flexCenter gap-x-4">
          <div>
            <Navbar
              containerStyles={
                "hidden xl:flex gap-x-5 xl:gap-x-10 medium-15 rounded-full px-2 py-1"
              }
            />
          </div>
          <div>
            <Navbar
              containerStyles={`${
                menuOpened
                  ? "flex items-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50"
                  : "flex items-start flex-col gap-y-12 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50 -right-[100%]"
              }`}
            />
          </div>
          <div className="flexBetween gap-x-3 sm:gap-x-2 bold-16">
            {!menuOpened ? (
              <MdMenu
                className="xl:hidden cursor-pointer text-3xl hover:text-secondary"
                onClick={toggleMenu}
              />
            ) : (
              <MdClose
                className="xl:hidden cursor-pointer text-3xl hover:text-secondary"
                onClick={toggleMenu}
              />
            )}
            <div className="flexBetween sm:gap-x-6">
              {localStorage.getItem("id_user") ? (
                <>
                  <NavLink to={"/cart-page "} className={"flex"}>
                    <RiShoppingCart2Line className="p-2 h-10 w-10 hover:text-secondary" />
                    <span className="relative flexCenter w-5 h-5 rounded-full bg-secondary text-primary medium-14 -top-2 right-3">
                      {getTotalCartItems || 0}
                    </span>
                  </NavLink>
                  <div
                    onClick={logout}
                    className={
                      "btn-secondary flexCenter gap-x-2 medium-16 rounded-xl"
                    }
                  >
                    <img src={userImg} alt="" height={19} width={19} />
                    Logout
                  </div>
                </>
              ) : (
                <NavLink
                  to={"/login"}
                  className={
                    "btn-secondary flexCenter gap-x-2 medium-16 rounded-xl"
                  }
                >
                  <img src={userImg} alt="" height={19} width={19} />
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
