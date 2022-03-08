import React, { useState } from "react";
import Sidebar from "../../ui/Menu/Sidebar/Sidebar.component";
import StudentRouter from "../../router/Student/StudentRouter";
import Navbar from "../../ui/Menu/Navbar/Navbar.component";
import styles from "./Dashboard.module.scss";

function Dashboard() {
  const [isShownSidebar, setIsShownSidebar] = useState(true);

  return (
    <div className={styles["dashboard"] + " w-100 h-100"}>
      {
        isShownSidebar ?
          <>
            <div onClick={() => setIsShownSidebar(false)} className={styles["dashboard_left_dark-bg"]} />
            <div className={styles["dashboard_left"]}>
              <Sidebar></Sidebar>
            </div>
          </>
          : ""
      }
      <div className={styles["dashboard_right"] + (isShownSidebar?" ml-auto":" w-100")}>
        <div className="w-100" style={{ position: "absolute" }}>
          <Navbar openSidebar={()=>setIsShownSidebar(!isShownSidebar)} isShownSidebarIcon={true}></Navbar>
        </div>
        <div style={{minHeight:"100%",background:"#f1f5f9"}} className="w-100">
          {/* document.querySelector(".main-navbar").offsetHeight */}
          <div style={{height:"64px"}} className="w-100"></div>
          <StudentRouter></StudentRouter>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
