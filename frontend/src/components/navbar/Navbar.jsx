import React from "react";
import EmailPhone from "../topbar/EmailPhone";
import SearchBasket from "../topbar/SearchBasket";
import Navlist from "../navlist/Navlist";
import Logo from "../logo/Logo";
import './Navbar.css'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="topbar">
        <EmailPhone />
        <SearchBasket />
      </div>
      <div className="navbar">
        <Link className="logo"><Logo /></Link>
        <Navlist />
      </div>
    </div>
  );
};

export default Navbar;
