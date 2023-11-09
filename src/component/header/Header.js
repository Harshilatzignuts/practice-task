import React from "react";
import "./Header.css";
import { Button } from "@mui/material";

const Header = () => {
  const handleLogout = () => {
    alert("Logout successful!");
  };

  return (
    <div className="header_main">
      <h1 className="text-white">Product</h1>
      <Button variant="contained" className="butoon" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Header;
