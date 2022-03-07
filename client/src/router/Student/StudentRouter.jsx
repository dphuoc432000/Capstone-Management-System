import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskManagement from "../../pages/Dashboard/TaskManagement/TaskManagement.page";

export default function StudentRouter() {
  return (
    <Routes>
      <Route path="task-management" element={<TaskManagement />} />
    </Routes>
  );
}
