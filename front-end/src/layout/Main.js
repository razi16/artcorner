import React, { useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Images from "../pages/Images";
import Login from "../pages/Login";
import ProtectedRoutes from "../pages/ProtectedRoutes";
import Register from "../pages/Register";
import Undefined from "../pages/Undefined";
import Upload from "../pages/Upload";
import Navbar from "./Navbar";

export const LoginContext = React.createContext();

const initialState = false;

const reducer = (state, action) => {
  switch (action) {
    case "login":
      return true;
    case "logout":
      return false;
    default:
      return state;
  }
};

function Main() {
  const [login, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <LoginContext.Provider
        value={{ loginState: login, loginDispatch: dispatch }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/images" element={<Images />} />
            <Route path="/upload" element={<Upload />} />
          </Route>
          <Route path="*" element={<Undefined />} />
        </Routes>
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default Main;
