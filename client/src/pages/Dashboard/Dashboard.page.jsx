import React from "react";
import DashboardHeader from "../../components/Header/DashboardHeader/DashboardHeader.component";
import Sidebar from "../../ui/Menu/Sidebar/Sidebar.component";
import StudentRouter from "../../router/Student/StudentRouter";


function Dashboard() {
  return (
    <div style={{ background: "#f1f5f9" }} className="w-100">
      <DashboardHeader></DashboardHeader>
      <div className="row w-100 m-0">
        <div className="col-xl-3 pl-0">
          <Sidebar></Sidebar>
        </div>
        <div className="col-xl-9">
          <div style={{ minHeight: "800px" }}>
            <div>Dashboard Introduction</div>
            <StudentRouter></StudentRouter>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
