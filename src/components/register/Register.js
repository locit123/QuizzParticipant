import React, { useState } from "react";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerState } from "../../store/selector";
import { ImSpinner9 } from "react-icons/im";
import { postRegister } from "../../api/apiAuth/fetchApiAuth";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const StatusRegisterState = useSelector(registerState);
  const { isLoadingPostRegister } = StatusRegisterState;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleClickRegister = async (e) => {
    e.preventDefault();
    const data = { username, email, password };
    await postRegister(dispatch, data, setIsLoading, navigate);
  };
  return (
    <div className="container2">
      <section id="content">
        <h1>Register Form</h1>
        <div className="mx-3 mb-3">
          <input
            type="text"
            placeholder="Username"
            required=""
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mx-3">
          <input
            type="text"
            placeholder="Email"
            required=""
            id="email"
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
          <div style={{ flex: "1" }}></div>
          <div style={{ flex: "1" }}>
            <button
              onClick={handleClickRegister}
              className="btn btn-secondary mt-3 mb-3"
              disabled={isLoading}
            >
              {isLoadingPostRegister && (
                <ImSpinner9 className="spinner rotate" />
              )}
              Sign up
            </button>
          </div>
          <Link
            style={{ flex: "1", textDecoration: "underline", color: "#7E7E7E" }}
            href="/forgot-password"
          >
            forgot password?
          </Link>
        </div>
        <div className="mb-3">
          <Link
            style={{ textDecoration: "underline", color: "#7E7E7E" }}
            to={"/"}
          >
            Back to home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Register;
