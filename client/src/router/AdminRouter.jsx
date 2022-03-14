import React from "react";
import { Route,Routes } from "react-router-dom";
import Login from "../pages/Login/Login.page";

export default function AdminRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}
