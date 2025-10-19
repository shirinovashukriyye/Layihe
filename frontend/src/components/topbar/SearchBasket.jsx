import React, { useState, useRef, useContext } from "react";
import { FaSearch, FaHeart, FaUser } from "react-icons/fa";
import { BsHandbagFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";

import "./SearchBasket.css";


// const [searchTerm, setSearchTerm] = useState("");
// const navigate = useNavigate();

// const handleSearchSubmit = (e) => {
//   e.preventDefault();
//   if (searchTerm.trim() !== "") {
//     navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
//   }
// };


const SearchBasket = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event?.target)
    ) {
      return;
    }
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab" || event.key === "Escape") {
      setOpen(false);
    }
  };

  const [signDropdown, setSignDropdown] = useState(false);
  return (
    <div className="topbar-icons">
      {/* <form onSubmit={handleSearchSubmit} className="search-container">
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-input"
  />
  <button type="submit" className="search-button">
    <FaSearch />
  </button>
</form> */}

      <Link to="wishlist"><FaHeart /></Link>
      <Link to="basket"><BsHandbagFill /></Link>

      <nav className="bg-white shadow p-4 flex justify-between items-center relative z-50">
        {!user ? (
   <div className="dropdown">
  <button
    className="signin-button"
    onClick={() => setSignDropdown((prev) => !prev)}
  >
    Sign in ▾
  </button>

  {signDropdown && (
    <div className="dropdown-content no-auth">
      <Link to="/login" onClick={() => setSignDropdown(false)}>Login</Link>
      <Link to="/register" onClick={() => setSignDropdown(false)}>Register</Link>
    </div>
  )}
</div>
        ) : (
          <div className="dropdown">
            <Button
              className="dropdown-button"
              ref={anchorRef}
              id="user-menu-button"
              aria-controls={open ? "user-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleToggle}
            >
              <FaUser size={20} style={{color:"white"}} />
            </Button>

            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
              modifiers={[
                {
                  name: "offset",
                  options: {
                    offset: [0, 8],
                  },
                },
              ]}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper className="dropdown-content" elevation={4}>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="user-menu"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My Account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        )}
      </nav>
    </div>
  );
};

export default SearchBasket;
