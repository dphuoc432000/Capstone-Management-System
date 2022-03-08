import React from "react";
import { Routes, Route } from "react-router-dom";
import Stageboard from "../../pages/Dashboard/Stageboard/Stageboard.page";
import TaskManagement from "../../pages/Dashboard/TaskManagement/TaskManagement.page";

export default function StudentRouter() {
  return (
    <Routes>
      <Route path="task-management" element={<Stageboard />} />
      <Route path="task-management/stage/:stageName%:stageId" element={<TaskManagement />} />
    </Routes>
  );
}
