import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaTachometerAlt, FaList, FaGithub } from "react-icons/fa";
import { FaReact } from "react-icons/fa6";
import sidebarBg from "../../assets/bg2.jpg";
import { Link, useNavigate } from "react-router-dom";
const SliderBar = ({ collapsed, rtl, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <ProSidebar
      image={sidebarBg}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          onClick={() => navigate("/")}
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <FaReact size={30} color={"#00bfff"} className="mx-2" />
          LOC IT
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}
            suffix={<span className="badge red">New</span>}
          >
            dashboard <Link to={"/admin"} />
          </MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu title={"Quản Lí"} icon={<FaList />}>
            <MenuItem>
              Quản Lí Users <Link to={"/admin/manage-user"} />
            </MenuItem>
            <MenuItem>
              Quản Lí Quiz <Link to={"/admin/manage-quizzes"} />
            </MenuItem>
            <MenuItem>
              Quản Lí Question <Link to={"/admin/manage-questions"} />
            </MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px",
          }}
        >
          <a
            href="https://github.com/locit123/QuizzParticipant"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span
              className={collapsed ? "span" : ""}
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              LocIt
            </span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default SliderBar;
