import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../../api/apiAuth/fetchApiAuth";
import { loginState } from "../../store/selector";
import { ImSpinner9 } from "react-icons/im";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const statusLoginState = useSelector(loginState);
  const { isLoadingPostLogin } = statusLoginState;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleClickLogin = async (e) => {
    e.preventDefault();

    await postLogin(
      dispatch,
      { email, password, delay: 5000 },
      setIsLoading,
      navigate
    );
  };
  return (
    <div className="container2">
      <section id="content">
        <h1>Login Form</h1>
        <div className="mx-3">
          <input
            type="text"
            placeholder="Email"
            required=""
            id="username"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mx-3">
          <input
            type="password"
            placeholder="Password"
            required=""
            id="password"
            className="form-control mt-3 mb-3 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className="mx-3"
          style={{
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link style={{ textDecoration: "underline" }} to="/register">
            Register
          </Link>
          <Link style={{ textDecoration: "underline" }} href="/forgot-password">
            forgot password?
          </Link>
        </div>
        <button
          onClick={handleClickLogin}
          className="btn btn-secondary mt-3 mb-3"
          disabled={isLoading}
        >
          {isLoadingPostLogin && <ImSpinner9 className="spinner rotate" />}
          Log in
        </button>
        <div className="button">
          <a href="/https://github.com/locit123/QuizzParticipant">
            Download git Loc It
          </a>
        </div>
      </section>
    </div>
  );
};

export default Login;
