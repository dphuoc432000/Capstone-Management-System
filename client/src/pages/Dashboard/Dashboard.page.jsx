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
      <div className={styles["dashboard_right"] + " ml-auto"}>
        <div className="w-100" style={{ position: "absolute" }}>
          <Navbar></Navbar>
        </div>
        <div style={{minHeight:"100%",background:"#f1f5f9"}} className="pb-5 px-4 w-100">
          {/* <h5 className="py-2 mb-4">{"Dashboard > Task Management"}</h5> */}
          <StudentRouter></StudentRouter>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
