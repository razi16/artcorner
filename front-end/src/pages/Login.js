import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../layout/Main";

function Login() {
  const navigate = useNavigate();
  const logincontext = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.message !== "Success") {
          setError(res.data.message);
        } else {
          setError(null);
          localStorage.setItem("x-access-token", res.data.token);
          logincontext.loginDispatch("login");
          navigate("/images");
        }
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("x-access-token");

    if (token) {
      const headers = { token: token };
      console.log(headers);
      axios.get("http://localhost:4000/auth", { headers }).then((res) => {
        console.log(res);
        if (res.data.isLoggedIn === true) {
          logincontext.loginDispatch("login");
          navigate("/images");
        }
      });
    }
  }, []);

  return (
    <main className="d-flex align-items-center justify-content-center">
      <div className="card mt-5 ms-5 me-5 p-5 w-50">
        <form method="POST" onSubmit={login}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control w-75"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control w-75 mb-3"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </form>
        {error ? (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}

export default Login;
