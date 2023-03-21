import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "./Main";
import axios from "axios";

function Navbar() {
  const logincontext = useContext(LoginContext);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("x-access-token");
    logincontext.loginDispatch("logout");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("x-access-token");
    if (!token) {
      logincontext.loginDispatch("logout");
    } else {
      const headers = {
        token: token,
      };
      axios.get("http://localhost:4000/auth", { headers }).then((res) => {
        if (res.data.isLoggedIn === true) {
          logincontext.loginDispatch("login");
        } else {
          logincontext.loginDispatch("logout");
        }
      });
    }
  }, []);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/images">
              Images
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/upload">
              Upload
            </Link>
          </li>
          {logincontext.loginState ? (
            <li className="nav-item">
              <button className="btn btn-danger" onClick={logOut}>
                Logout
              </button>
            </li>
          ) : (
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
