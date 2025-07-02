import React, { useEffect, useRef, useState } from "react";
import { MdMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import "./EmailPhone.css";
import { Link } from "react-router-dom";
import { FaPeopleGroup } from "react-icons/fa6";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const EmailPhone = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="topbar-contact-email">
      <div className="email">
        <Link>
          {" "}
          <MdMailOutline />
        </Link>
        <Link>support@ticketforyou.com</Link>
      </div>
      <div className="phone">
        <Link>
          <FaPhone />
        </Link>
        <Link>+123 456 789</Link>
      </div>
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <FaPeopleGroup />
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
            <MdMailOutline />
            support@ticketforyou.com
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <FaPhone /> +123 456 789
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default EmailPhone;
