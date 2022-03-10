import React, { useState } from "react";
import Sidebar from "../../ui/Menu/Sidebar/Sidebar.component";
import StudentRouter from "../../router/Student/StudentRouter";
import Navbar from "../../ui/Menu/Navbar/Navbar.component";
import styles from "./Dashboard.module.scss";

function Dashboard() {
  const [isShownSidebar, setIsShownSidebar] = useState(true);

  const getHeight = () => {
    let { innerHeight } = window;
    return innerHeight - 64;
  }

  const showSidebar = () => {
    if (isShownSidebar) {
      return (
        <>
          <div onClick={() => setIsShownSidebar(false)} className={styles["dashboard_left_dark-bg"]} />
          <div className={styles["dashboard_left"]}>
            <Sidebar></Sidebar>
          </div>
        </>
      )
    }
    return;
  }

  return (
    <div className={styles["dashboard"] + " w-100 h-100"}>
      {showSidebar()}
      <div className={styles["dashboard_right"] + (isShownSidebar ? " ml-auto" : " w-100")}>
        <div className="w-100" style={{ position: "absolute" }}>
          <Navbar openSidebar={() => setIsShownSidebar(!isShownSidebar)} isShownSidebarIcon={true}></Navbar>
        </div>
        <div className={styles["dashboard_right_body"] + " w-100"}>
          <div style={{ height: "64px" }} className="w-100" />
          <div style={{ height: getHeight() + "px" }}>
            <StudentRouter></StudentRouter>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
