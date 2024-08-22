import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  email_state,
  refresh_token_state,
  tokenState,
} from "../../store/selector";
import { postLogout } from "../../api/apiAuth/fetchApiAuth";
const Header = () => {
  const navigate = useNavigate();
  const token = useSelector(tokenState);
  const email = useSelector(email_state);
  const refresh_token = useSelector(refresh_token_state);
  console.log(email, refresh_token);

  const dispatch = useDispatch();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleClickLogout = async () => {
    await postLogout(dispatch, email, refresh_token, navigate);
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
            {!token ? (
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
