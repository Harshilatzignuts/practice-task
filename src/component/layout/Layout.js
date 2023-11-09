import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import "./Layout.css";
function Layout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="main" id="Main">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
