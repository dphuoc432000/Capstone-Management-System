import React from "react";
import { Routes, Route } from "react-router-dom";
import Taskboard from "../../pages/Dashboard/TaskManagement/Stageboard/Stageboard.page";
import TaskManagement from "../../pages/Dashboard/TaskManagement/TaskManagement.page";

export default function StudentRouter() {
  return (
    <Routes>
      <Route path="task-management" element={<Taskboard />} />
      <Route path="task-management/stage-:stageId" element={<TaskManagement />} />
    </Routes>
  );
}
