import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { BsHandbagFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import './SearchBasket.css'
import { Link } from "react-router-dom";


const SearchBasket = () => {
  return (
    <div className="topbar-icons">
     <Link> <FaSearch /></Link>
     <Link> <FaHeart /></Link>
     <Link> <BsHandbagFill /></Link>
     <Link> <FaRegUser /></Link>
    </div>
  );
};

export default SearchBasket;
