import React from "react";
import { Routes, Route } from "react-router-dom";
import Stageboard from "../../pages/Dashboard/Student/Stageboard/Stageboard.page";
import MyTopic from "../../pages/Dashboard/Student/MyTopic/MyTopic.page";
import TaskManagement from "../../pages/Dashboard/Student/TaskManagement/TaskManagement.page";

export default function StudentRouter() {
  return (
    <Routes>
      <Route path="task-management" element={<Stageboard />} />
      <Route path="my-topic" element={<MyTopic />} />
      <Route path="task-management/stage/:stageName%:stageId" element={<TaskManagement />} />
    </Routes>
  );
}
