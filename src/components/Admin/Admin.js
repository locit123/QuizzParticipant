import React, { useState } from "react";
import SliderBar from "./SliderBar";
import "./Admin.scss";
import { ImMenu } from "react-icons/im";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Outlet } from "react-router-dom";
const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin_slider">
        <SliderBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="im-menu ">
          <ImMenu
            className="ic-menu"
            style={{ cursor: "pointer" }}
            size={25}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
        <div className="content">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default Admin;
