import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { loginState } from "../../store/selector";
import { typeActionPostLogin } from "../../store/auth/postLogin/actions";
const Header = () => {
  const navigate = useNavigate();
  const statusLoginState = useSelector(loginState);
  const { dataPostLogin } = statusLoginState;
  const dispatch = useDispatch();
  const handleLogin = () => {
    navigate("/login");
  };

  const handleClickLogout = () => {
    dispatch(typeActionPostLogin.fetchPostLoginSuccess(null));
  };

  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link className="navbar-brand" to={"/"}>
          LocIt
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className={"nav-link"} to="/">
              Home
            </NavLink>
            <NavLink to="/user" className={"nav-link"}>
              User
            </NavLink>
            <NavLink to="/admin" className={"nav-link"}>
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {!dataPostLogin ? (
              <>
                <button className="btn-login" onClick={handleLogin}>
                  Login
                </button>
                <button className="btn-signup" onClick={handleRegister}>
                  Sign up
                </button>
              </>
            ) : (
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item>Login</NavDropdown.Item>
                <NavDropdown.Item onClick={handleClickLogout}>
                  Logout
                </NavDropdown.Item>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
