import React from "react";
import { Routes, Route } from "react-router-dom";

function Test()
{
    return <p>detail</p>
}


export default function StudentRouter() {
  return (
    <Routes>
      <Route path="task-:taskId" element={<Test />} />
    </Routes>
  );
}
