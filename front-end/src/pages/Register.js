import React from "react";

function Register() {
  return (
    <main className="d-flex align-items-center justify-content-center">
      <div className="card mt-5 ms-5 me-5 p-5 w-50">
        <form>
          <div className="form-group mb-3">
            <label for="username">Username:</label>
            <input
              type="text"
              className="form-control w-75"
              id="username"
              name="username"
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group  mb-3">
            <label for="email">Email:</label>
            <input
              type="email"
              className="form-control w-75"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              You don't need to use a registered email address.
            </small>
          </div>
          <div className="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              className="form-control w-75 mb-3"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </form>
      </div>
    </main>
  );
}

export default Register;
