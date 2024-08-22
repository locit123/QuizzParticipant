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
import Register from "../register/Register";
import QuizWithQuestion from "../QuizWithQuestion/QuizWithQuestion";
import ManageQuizzes from "../Admin/contents/manageQuiz/ManageQuizzes";
import ManageQuestion from "../Admin/contents/manageQuestion/ManageQuestion";
import PrivateRouter from "../../routes/PrivateRouter";
const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route
            path="/user"
            element={
              <PrivateRouter>
                <User />
              </PrivateRouter>
            }
          />
        </Route>
        <Route
          path="/admin"
          element={
            <PrivateRouter>
              <Admin />
            </PrivateRouter>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="manage-user" element={<ManageUser />} />
          <Route path="manage-quizzes" element={<ManageQuizzes />} />
          <Route path="manage-questions" element={<ManageQuestion />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz-question/:id" element={<QuizWithQuestion />} />
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
