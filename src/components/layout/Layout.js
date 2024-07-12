import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../../App";
import Home from "../../components/Home/Home";
import User from "../../components/User/User";
import Admin from "../../components/Admin/Admin";
import Login from "../../components/Login/Login";
import DashBoard from "../DashBoard/DashBoard";
import ManageUser from "../ManageUser/ManageUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/user" element={<User />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-user" element={<ManageUser />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
};

export default Layout;
