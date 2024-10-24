import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import SocialIcons from "./SocialIcons";
import Navbar from "./Navbar";

const Footer = () => {
  return (
    <footer className="max-padd-container bg-tertiary py-8">
      <div className="flexCenter flex-col gap-y-4">
        <Link to={"/"} className="flex items-center gap-x-2">
          <img src={logo} alt="" width={31} height={31} />
          <span className="bold-24 hidden xs:flex text-white">JaykibyShop</span>
        </Link>
        <div className="py-4">
          <Navbar
            containerStyles={
              "text-white flex gap-x-5 xl:gap-x-10 medium-15 rounded-full px-2 py-1"
            }
          />
        </div>
        <SocialIcons />
        <hr className="h-[1px] w-2/3 my-3" />
        <div className="text-white">Copy right &copy; JKB | All rights reserved </div>
      </div>
    </footer>
  );
};

export default Footer;
