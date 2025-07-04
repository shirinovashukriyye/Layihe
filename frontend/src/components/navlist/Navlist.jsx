import React from "react";
import { Link } from "react-router-dom";
import "./Navlist.css";
import { RxHamburgerMenu } from "react-icons/rx";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


const Navlist = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <ul className="list">
        <li>
          <Link to="/" className="list-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/events" className="list-link">
            Events
          </Link>
        </li>
        <li>
          <Link to="/shop" className="list-link">
            Shop
          </Link>
        </li>
        <li>
          <Link to="/news" className="list-link">
            News
          </Link>
        </li>
        <li>
          <Link to="/createaevent" className="list-link">
            Create A Event
          </Link>
        </li>
        <li>
          <Link to="/contact" className="list-link">
            Contact
          </Link>
        </li>
      </ul>
      <div className="burger">
        
          <Button
            id="basic-burger"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <RxHamburgerMenu />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
          >
            <MenuItem onClick={handleClose}> 
            Home
            </MenuItem>
            <MenuItem onClick={handleClose}>
              Events
            </MenuItem>
             <MenuItem onClick={handleClose}>
              Shop
            </MenuItem>
             <MenuItem onClick={handleClose}>
              News
            </MenuItem>
             <MenuItem onClick={handleClose}>
              Create A Event
            </MenuItem>
             <MenuItem onClick={handleClose}>
              Contact
            </MenuItem>
          </Menu>
        </div>
      </div>
  
  );
};

export default Navlist;
