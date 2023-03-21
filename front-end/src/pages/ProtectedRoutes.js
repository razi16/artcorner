import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("x-access-token");
    if (!token) {
      navigate("/login");
    } else {
      const headers = {
        token: token,
      };
      axios.get("http://localhost:4000/auth", { headers }).then((res) => {
        if (res.data.isLoggedIn === false) {
          navigate("/login");
        }
      });
    }
  }, []);

  return <Outlet />;
}

export default ProtectedRoutes;
