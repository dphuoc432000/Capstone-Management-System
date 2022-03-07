import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "../pages/About/About.page";
import Dashboard from "../pages/Dashboard/Dashboard.page";
import Login from "../pages/Login/Login.page";
import RegisterCapstone from "../pages/RegisterCapstone/RegisterCapstone.component";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/register-capstone" element={<RegisterCapstone />}></Route>
        <Route path="/dashboard/*" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
}
