import React from "react";
import { Drawer, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);

  const handleSubmenuClick = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{
        paper: "sidebar-paper",
      }}
      className="sidebar"
    >
      <div className="logo">
        <h1>Logo</h1>
      </div>
      <List>
        <ListItem button component="button" onClick={handleSubmenuClick}>
          <ListItemText primary="Product" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className="submenu">
            <Link to="/">
              <ListItem button component="button">
                <ListItemText primary="Product List" />
              </ListItem>
            </Link>
            <Link to="/create">
              <ListItem button component="button">
                <ListItemText primary="Create Product" />
              </ListItem>
            </Link>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
