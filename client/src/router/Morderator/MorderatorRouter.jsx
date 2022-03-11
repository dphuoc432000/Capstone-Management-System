import React from "react";
import { Routes, Route } from "react-router-dom";
// khong doi ten tren nay lay dau ra ???  nay han hien len tu dong sửa rồi đụ má

import StudentManagement from "../../pages/Dashboard/Morderator/StudentManagement/StudentManagement.page";

export default function MorderatorRouter() {
  return (
    <Routes>
        {/* de route la approve student ma go tren tri nht hduyieti u thi  ccla  */}
        {/* hoi nay noi roi ?? dashboard/student/mângement */}
        <Route path="student-management" element={<StudentManagement />} />
    </Routes>
  );
}
